import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { docsData } from './docsData.js';
import { createSectionId } from './sectionId.js';

export default function DocPage() {
  const { id } = useParams();
  const location = useLocation();
  const doc = docsData.find((d) => d.id === id);

  useEffect(() => {
    if (!location.hash) return;
    const targetId = decodeURIComponent(location.hash.slice(1));
    const handle = window.requestAnimationFrame(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    return () => window.cancelAnimationFrame(handle);
  }, [location.hash, doc?.id]);

  if (!doc) {
    return (
      <div className="max-w-3xl text-slate-800">
        找不到这个文档（id: {id}）。
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">{doc.title}</h1>
        {doc.description && (
          <p className="text-slate-700 text-lg leading-relaxed">{doc.description}</p>
        )}
      </header>
      <div className="space-y-8">
        {doc.sections?.map((section, idx) => {
          const sectionId = createSectionId(doc.id, section.heading, idx);
          return (
            <section
              key={sectionId}
              id={sectionId}
              className="space-y-3 pb-6 border-b border-slate-200 last:border-none last:pb-0 scroll-mt-24"
            >
              {section.heading && (
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                  {section.heading}
                </h2>
              )}
              <p className="text-slate-800 leading-relaxed whitespace-pre-wrap bg-slate-50/80 border border-slate-200 rounded-lg px-4 py-3">
                {section.content}
              </p>
            </section>
          );
        })}
      </div>
    </article>
  );
}
