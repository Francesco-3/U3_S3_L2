import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Article } from '../types/api';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Article not found');
        return res.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!article) return <p>Article not available</p>;

  const publishedDate =
    article.publishedAt && !isNaN(Date.parse(article.publishedAt))
      ? new Date(article.publishedAt).toLocaleString()
      : 'Date not available';

  return (
    <div style={{ maxWidth: 900, margin: '0 auto'}}>
      <Link to="/" className='back-link'>
        ← Back
      </Link>

      <h1>{article.title}</h1>

      <p>
        <strong>Published on:</strong> {publishedDate}
      </p>

      <img
        src={article.image_url}
        alt={article.title}
        style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 8 }}
      />

      <p style={{ marginTop: 16 }}>{article.summary}</p>

      <p>
        <strong>Source:</strong> {article.newsSite}

        <a href={article.url} target="_blank" rel="noopener noreferrer" className='visit-link'>
          Link to original article
        </a>
      </p>

      {article.launches.length > 0 && (
        <div>
          <h3>Associated Launches</h3>

          <ul>
            {article.launches.map(launch => (
              <li key={launch.id}>{launch.provider}</li>
            ))}
          </ul>
        </div>
      )}

      {article.events.length > 0 && (
        <div>
          <h3>Associated Events</h3>

          <ul>
            {article.events.map(event => (
              <li key={event.id}>{event.provider}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;