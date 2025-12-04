import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { docsData } from "./docsData.js";
import { createSectionId } from "./sectionId.js";

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
        el.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <article className="max-w-4xl mx-auto px-4 md:px-0 mt-6 md:mt-8 space-y-6">
      <header className="space-y-2">
        {doc.category && (
          <p className="text-xs font-semibold tracking-wide uppercase text-slate-500">
            {doc.category}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{doc.title}</h1>
        {doc.description && (
          <p className="text-slate-700 text-lg leading-relaxed">{doc.description}</p>
        )}
      </header>

      <div className="space-y-6 md:space-y-8 pb-6">
        {doc.sections?.map((section, idx) => {
          const sectionId = createSectionId(doc.id, section.heading, idx);
          return (
            <section key={sectionId} id={sectionId} className="mb-6 md:mb-8 scroll-mt-24">
              <div className="bg-white shadow-sm rounded-xl border border-slate-200 px-4 py-4 md:px-6 md:py-5 space-y-3">
                {section.heading && (
                  <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-1">
                    {section.heading}
                  </h2>
                )}
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="prose prose-slate max-w-none break-words text-sm md:text-base leading-relaxed"
                >
                  {section.content}
                </ReactMarkdown>
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
}
