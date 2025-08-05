import React from 'react';
import type { Article } from '../types/api';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const publishedDate =
    article.publishedAt && !isNaN(Date.parse(article.publishedAt))
      ? new Date(article.publishedAt).toLocaleDateString()
      : 'Date not available';

  return (
    <Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          border: '1px solid #ddd', borderRadius: 8, padding: 16,
          marginBottom: 16, cursor: 'pointer', maxWidth: '100%',
          backgroundImage: `url(${article.image_url})`,
          backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          minHeight: 200, position: 'relative', overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)'}}/>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2>{article.title}</h2>

          <p style={{ fontSize: 12 }}>{publishedDate}</p>

          <p>{article.summary}</p>

          <p style={{ fontWeight: 'bold', color: '#ffcc00'}} className='read-more'>Read more →</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;