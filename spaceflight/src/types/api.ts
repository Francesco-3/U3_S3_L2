export interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  launches: { id: string; provider: string }[];
  events: { id: string; provider: string }[];
}