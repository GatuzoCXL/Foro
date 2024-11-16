import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForumHome from '../pages/ForumHome';
import ForumCategory from '../components/forum/ForumCategory';
import Navigation from '../components/Navigation';
import NewTopic from '../pages/NewTopic';
import TopicDetail from '../pages/TopicDetail';
import Login from '../pages/Login';
import UserProfile from '../pages/UserProfile';

const AppRoutes = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-dark-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<ForumHome />} />
          <Route path="/category/:id" element={<ForumCategory />} />
          <Route path="/new-topic" element={<NewTopic />} />
          <Route path="/topic/:id" element={<TopicDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;