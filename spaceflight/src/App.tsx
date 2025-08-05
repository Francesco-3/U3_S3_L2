import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticleDetail from './pages/ArticleDetail';
import './App.css';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
    </Routes>
  </BrowserRouter>
);

export default App;