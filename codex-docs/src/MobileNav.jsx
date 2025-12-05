import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { docsData } from './docsData.js';
import { createSectionId } from './sectionId.js';

export default function MobileNav({ open, onClose }) {
  const { pathname } = useLocation();
  const [expandedDocId, setExpandedDocId] = useState(null);
  const activeDocId = pathname.startsWith('/docs/')
    ? pathname.replace(/^\/docs\//, '').split('/')[0]
    : null;

  const grouped = useMemo(
    () =>
      docsData.reduce((acc, doc) => {
        acc[doc.category] = acc[doc.category] || [];
        acc[doc.category].push(doc);
        return acc;
      }, {}),
    []
  );

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleDocClick = (docId) => {
    setExpandedDocId(docId);
  };

  const shouldShowSections = (doc) => {
    if (expandedDocId) return expandedDocId === doc.id;
    return doc.id === activeDocId;
  };

  useEffect(() => {
    if (open) {
      setExpandedDocId(activeDocId || null);
    }
  }, [open, activeDocId]);

  if (!open) return null;

  return (
    <div className="lg:hidden">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
        onClick={handleClose}
      />
      <div className="fixed inset-x-0 top-0 z-50 p-4">
        <div className="bg-white shadow-xl ring-1 ring-slate-200 rounded-2xl overflow-hidden max-h-[80vh]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <div className="space-y-0.5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                Codex FAQ
              </div>
              <div className="text-sm font-bold text-slate-900 leading-tight">
                浏览全部主题
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[0.97] transition"
              aria-label="关闭目录"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-3 space-y-4 overflow-y-auto max-h-[70vh]">
            {Object.entries(grouped).map(([category, docs]) => (
              <div key={category} className="space-y-2">
                <div className="px-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {category}
                </div>
                <div className="space-y-2">
                  {docs.map((doc) => {
                    const isActiveDoc = doc.id === activeDocId;
                    return (
                      <div
                        key={doc.id}
                        className="rounded-xl border border-slate-200/80 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]"
                      >
                        <NavLink
                          to={`/docs/${doc.id}`}
                          onClick={() => handleDocClick(doc.id)}
                          className={({ isActive }) =>
                            [
                              'flex items-center justify-between gap-3 px-3 py-3 rounded-xl transition-colors',
                              isActive
                                ? 'bg-slate-900 text-slate-50'
                                : 'text-slate-900 hover:bg-slate-50',
                            ].join(' ')
                          }
                        >
                          <div className="text-sm font-semibold leading-snug">{doc.title}</div>
                          <span
                            className={[
                              'text-[11px] font-semibold uppercase tracking-wide',
                              isActiveDoc ? 'text-slate-200' : 'text-slate-500',
                            ].join(' ')}
                          >
                            {doc.category}
                          </span>
                        </NavLink>

                        {doc.sections?.length > 0 && (
                          <div
                            className={[
                              'border-t border-slate-200/80 bg-slate-50 px-3 py-2 space-y-1 transition-all duration-300 ease-out origin-top',
                              shouldShowSections(doc)
                                ? 'opacity-100 max-h-96 scale-y-100'
                                : 'opacity-0 max-h-0 scale-y-95 pointer-events-none overflow-hidden',
                            ].join(' ')}
                            aria-hidden={!shouldShowSections(doc)}
                          >
                            {doc.sections.slice(0, 8).map((section, idx) => {
                              const sectionId = createSectionId(doc.id, section.heading, idx);
                              return (
                                <Link
                                  key={sectionId}
                                  to={`/docs/${doc.id}#${sectionId}`}
                                  onClick={handleClose}
                                  className="block text-xs text-slate-700 hover:text-slate-900 truncate py-1 transition-colors"
                                >
                                  {section.heading || '未命名章节'}
                                </Link>
                              );
                            })}
                            {doc.sections.length > 8 && (
                              <div className="text-[11px] text-slate-500 pb-1">
                                更多内容请在文档中查看
                              </div>
                            )}
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
      </div>
    </div>
  );
}
