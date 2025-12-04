import { docsData } from './docsData.js';

export const navItems = docsData.map(({ id, title, category }) => ({
  id,
  title,
  path: `/docs/${id}`,
  category,
}));
