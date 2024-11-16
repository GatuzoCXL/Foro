import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { useAuth } from '../hooks/useAuth';

interface Category {
  id: number;
  title: string;
  description: string;
  topics: number;
  posts: number;
}

interface Topic {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  author: string;
  createdAt: Date;
  comments: Comment[];
  likes: number;
  dislikes: number;
  [key: string]: any; // Agregar índice de firma
  poll?: Poll;
  mentions: string[];
  reactions: Reaction[];
}

interface Comment {
  id: number;
  topicId: number;
  content: string;
  author: string;
  createdAt: Date;
}

interface TopicReport {
  id: number;
  topicId: number;
  reportedBy: string;
  reason: string;
  status: 'pending' | 'resolved' | 'rejected';
}

interface Poll {
  id: number;
  question: string;
  options: { id: number; text: string; votes: number[] }[];
  endDate: Date;
}

interface Reaction {
  id: number;
  emoji: string;
  userId: number;
}

interface ForumContextType {
  categories: Category[];
  topics: Topic[];
  comments: Comment[];
  setPosts: Dispatch<SetStateAction<Topic[]>>;
  setTopics: Dispatch<SetStateAction<Topic[]>>;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  handleVote: (topicId: number, voteType: 'like' | 'dislike') => void;
  searchTopics: (query: string) => Topic[];
  favoriteTopics: number[];
  reports: TopicReport[];
  toggleFavorite: (topicId: number) => void;
  reportTopic: (topicId: number, reason: string) => void;
  addPoll: (topicId: number, poll: Omit<Poll, 'id'>) => void;
  votePoll: (topicId: number, optionId: number) => void;
  addReaction: (topicId: number, emoji: string) => void;
  advancedSearch: (params: {
    query: string;
    category?: number;
    author?: string;
    dateFrom?: Date;
    dateTo?: Date;
    hasPoll?: boolean;
  }) => Topic[];
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export const ForumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [categories] = useState<Category[]>([
    {
      id: 1,
      title: "General",
      description: "Discusiones generales sobre el curso",
      topics: 10,
      posts: 50
    },
    {
      id: 2,
      title: "Ayuda",
      description: "Solicita ayuda con tus dudas",
      topics: 5,
      posts: 20
    }
  ]);
  const [topics, setTopics] = useState<Topic[]>([{
    id: 1,
    title: "Bienvenidos al foro",
    content: "Este es el primer tema del foro.",
    categoryId: 1,
    author: "Admin",
    createdAt: new Date(),
    comments: [],
    likes: 0,
    dislikes: 0,
    mentions: [],
    reactions: []
  }]);
  const [posts, setPosts] = useState<Topic[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [favoriteTopics, setFavoriteTopics] = useState<number[]>([]);
  const [reports, setReports] = useState<TopicReport[]>([]);

  const handleVote = (topicId: number, voteType: 'like' | 'dislike') => {
    setTopics(prev => prev.map(topic => {
      if (topic.id === topicId) {
        const key = `${voteType}s` as keyof Topic;
        return {
          ...topic,
          [key]: (topic[key] as number) + 1
        };
      }
      return topic;
    }));
  };

  const searchTopics = (query: string) => {
    return topics.filter(topic => 
      topic.title.toLowerCase().includes(query.toLowerCase()) ||
      topic.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  const toggleFavorite = (topicId: number) => {
    setFavoriteTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const reportTopic = (topicId: number, reason: string) => {
    setReports(prev => [...prev, {
      id: Date.now(),
      topicId,
      reportedBy: 'anonymous',
      reason,
      status: 'pending'
    }]);
  };

  const addPoll = (topicId: number, pollData: Omit<Poll, 'id'>) => {
    setTopics(prev => prev.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          poll: { ...pollData, id: Date.now() }
        };
      }
      return topic;
    }));
  };

  const votePoll = (topicId: number, optionId: number) => {
    setTopics(prev => prev.map(topic => {
      if (topic.id === topicId && topic.poll) {
        return {
          ...topic,
          poll: {
            ...topic.poll,
            options: topic.poll.options.map(opt => 
              opt.id === optionId 
                ? { ...opt, votes: [...opt.votes, user?.id || 0] }
                : opt
            )
          }
        };
      }
      return topic;
    }));
  };

  const addReaction = (topicId: number, emoji: string) => {
    setTopics(prev => prev.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          reactions: [...topic.reactions, {
            id: Date.now(),
            emoji,
            userId: user?.id || 0
          }]
        };
      }
      return topic;
    }));
  };

  const advancedSearch = (params: any) => {
    return topics.filter(topic => {
      const matchesQuery = params.query 
        ? topic.title.toLowerCase().includes(params.query.toLowerCase())
        : true;
      const matchesCategory = params.category 
        ? topic.categoryId === params.category
        : true;
      const matchesAuthor = params.author 
        ? topic.author === params.author
        : true;
      const matchesDateRange = (!params.dateFrom || topic.createdAt >= params.dateFrom) &&
        (!params.dateTo || topic.createdAt <= params.dateTo);
      const matchesPoll = params.hasPoll !== undefined 
        ? (!!topic.poll === params.hasPoll)
        : true;

      return matchesQuery && matchesCategory && matchesAuthor && 
             matchesDateRange && matchesPoll;
    });
  };

  return (
    <ForumContext.Provider value={{ 
      categories, 
      topics, 
      comments,
      setPosts, 
      setTopics,
      setComments,
      handleVote,
      searchTopics,
      favoriteTopics,
      reports,
      toggleFavorite,
      reportTopic,
      addPoll,
      votePoll,
      addReaction,
      advancedSearch,
    }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForumContext = () => {
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error('useForumContext must be used within a ForumProvider');
  }
  return context;
};