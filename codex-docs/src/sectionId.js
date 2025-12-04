export function createSectionId(docId, heading, index) {
  const base = (heading || '')
    .replace(/^Q\d+:\s*/, '')
    .toLowerCase()
    .replace(/[\u3000\s]+/g, '-') // spaces incl. full-width
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, '') // keep alnum, CJK, dash
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  const slug = base || `${docId}-sec-${index}`;
  return `${docId}-${slug}`;
}
