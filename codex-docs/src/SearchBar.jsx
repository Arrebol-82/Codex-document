import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { docsData } from './docsData.js';
import { createSectionId } from './sectionId.js';

export default function SearchBar({ value, onChange, sticky = false }) {
  const query = value.trim().toLowerCase();

  const handleSelect = () => {
    if (onChange) onChange('');
  };

  const results = useMemo(() => {
    if (!query) return { docs: [], sections: [] };
    const docs = [];
    const sections = [];
    docsData.forEach((doc) => {
      if (doc.title?.toLowerCase().includes(query) || doc.description?.toLowerCase().includes(query)) {
        docs.push({ id: doc.id, title: doc.title, category: doc.category });
      }
      doc.sections?.forEach((section, idx) => {
        const matchHeading = section.heading?.toLowerCase().includes(query);
        const matchContent = section.content?.toLowerCase().includes(query);
        if (matchHeading || matchContent) {
          sections.push({
            docId: doc.id,
            sectionId: createSectionId(doc.id, section.heading, idx),
            heading: section.heading,
            docTitle: doc.title,
          });
        }
      });
    });
    return {
      docs: docs.slice(0, 5),
      sections: sections.slice(0, 8),
    };
  }, [query]);

  const hasResults = results.docs.length > 0 || results.sections.length > 0;

  return (
    <div className="w-full max-w-2xl relative">
      <div
        className={[
          'relative block',
          sticky ? 'sticky top-0 z-30' : '',
        ].join(' ')}
      >
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1011.5 19.5c1.99 0 3.8-.74 5.15-1.85z"
            />
          </svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜索文档..."
          className="w-full rounded-xl border border-slate-200 bg-white/90 px-10 py-2.5 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500/40 transition"
        />
      </div>

      {query && hasResults && (
        <div className="absolute z-30 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg divide-y divide-slate-100 max-h-80 overflow-auto">
          {results.docs.length > 0 && (
            <div className="py-2">
              <div className="px-3 pb-1 text-xs font-semibold text-slate-500 uppercase">文档</div>
              <div className="space-y-1">
                {results.docs.map((item) => (
                  <Link
                    key={item.id}
                    to={`/docs/${item.id}`}
                    onClick={handleSelect}
                    className="block px-3 py-2 text-sm text-slate-800 hover:bg-slate-50 rounded-lg"
                  >
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-slate-500">{item.category}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {results.sections.length > 0 && (
            <div className="py-2">
              <div className="px-3 pb-1 text-xs font-semibold text-slate-500 uppercase">问题</div>
              <div className="space-y-1">
                {results.sections.map((item) => (
                  <Link
                    key={item.sectionId}
                    to={`/docs/${item.docId}#${item.sectionId}`}
                    onClick={handleSelect}
                    className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    <div className="font-semibold text-slate-900">{item.heading}</div>
                    <div className="text-[11px] text-slate-500">{item.docTitle}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
