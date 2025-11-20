import React from 'react';
import { Highlight } from 'react-instantsearch';
import type { Hit } from 'instantsearch.js';
import { BookRecord } from '../types';
import { Bookmark, FileText, Layers } from 'lucide-react';

interface Props {
  hit: Hit<BookRecord>;
}

export const SearchResultItem: React.FC<Props> = ({ hit }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-stone-200 hover:border-amber-400 transition-all duration-300 hover:shadow-md overflow-hidden group">
      {/* Header of the card */}
      <div className="bg-stone-50 px-6 py-3 border-b border-stone-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-amber-700 font-semibold">
          <Bookmark className="w-4 h-4" />
          <span className="text-sm md:text-base">
            <Highlight attribute="book_title" hit={hit} />
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
          <span className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-stone-200">
            <Layers className="w-3 h-3" />
            جزء {hit.part_number}
          </span>
          <span className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-stone-200">
            <FileText className="w-3 h-3" />
            صفحة {hit.page_number}
          </span>
        </div>
      </div>

      {/* Body of the card */}
      <div className="p-6">
        <p className="font-amiri text-lg leading-loose text-stone-800">
          <Highlight 
            attribute="text_content" 
            hit={hit} 
            classNames={{
              highlighted: 'bg-amber-200 text-stone-900 rounded px-1 font-bold'
            }}
          />
        </p>
      </div>

      {/* Footer/Action area */}
      <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1">
          قراءة المزيد في السياق &larr;
        </button>
      </div>
    </article>
  );
};