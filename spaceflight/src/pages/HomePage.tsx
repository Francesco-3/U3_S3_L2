import React, { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import type { Article } from '../types/api';

const HomePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://api.spaceflightnewsapi.net/v4/articles')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch articles');
        return res.json();
      })
      .then(data => {
        setArticles(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 900, margin: '0 auto'}}>
      <h1>Spaceflight News</h1>

      <input
        type="search" placeholder="Search articles..." value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: 12, marginBottom: 24, fontSize: 16, borderRadius: 8, border: '1px solid #ccc'}}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {filteredArticles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default HomePage;