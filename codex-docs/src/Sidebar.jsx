import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { docsData } from './docsData.js';
import { createSectionId } from './sectionId.js';
import SearchBar from './SearchBar.jsx';

const shortenHeading = (heading, maxLen = 18) => {
  const base = (heading || '').replace(/^Q\d+:\s*/, '');
  if (base.length <= maxLen) return base;
  return `${base.slice(0, maxLen)}...`;
};

export default function Sidebar({ searchQuery, onSearchChange }) {
  const { pathname } = useLocation();
  const activeDocId = pathname.startsWith('/docs/')
    ? pathname.replace(/^\/docs\//, '').split('/')[0]
    : null;

  const grouped = docsData.reduce((acc, doc) => {
    acc[doc.category] = acc[doc.category] || [];
    acc[doc.category].push(doc);
    return acc;
  }, {});

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-6 bg-white/90 backdrop-blur shadow-sm ring-1 ring-slate-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 space-y-3 border-b border-slate-200">
          <div className="flex items-center text-sm font-semibold text-slate-900">
            Codex FAQ 文档
          </div>
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
        <div className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-5rem)]">
          {Object.entries(grouped).map(([category, docs]) => (
            <div key={category} className="space-y-2">
              <div className="px-4 pt-4 pb-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                {category}
              </div>
              <div className="space-y-1">
                {docs.map((doc) => {
                  const isActiveDoc = doc.id === activeDocId;
                  return (
                    <div key={doc.id} className="space-y-1">
                      <NavLink
                        to={`/docs/${doc.id}`}
                        className={({ isActive }) =>
                          [
                            'flex items-center px-2 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 pl-4',
                            isActive
                              ? 'bg-slate-900 text-slate-50'
                              : 'text-slate-800 hover:bg-slate-100',
                          ].join(' ')
                        }
                      >
                        {doc.title}
                      </NavLink>
                      {isActiveDoc && (
                        <div className="space-y-1 pl-8">
                          {doc.sections?.map((section, idx) => {
                            const sectionId = createSectionId(doc.id, section.heading, idx);
                            const displayHeading = shortenHeading(section.heading, 18);
                            return (
                              <Link
                                key={sectionId}
                                to={`/docs/${doc.id}#${sectionId}`}
                                className="block px-2 py-1 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors duration-150"
                              >
                                {displayHeading}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

