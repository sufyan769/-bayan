import React from 'react';
import { SearchX } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-stone-400">
      <div className="bg-stone-100 p-6 rounded-full mb-4">
        <SearchX className="w-12 h-12 text-stone-300" />
      </div>
      <h3 className="text-xl font-bold text-stone-600 mb-2">لم يتم العثور على نتائج</h3>
      <p className="text-stone-500 text-center max-w-md">
        جرب البحث بكلمات مختلفة أو تأكد من كتابة الكلمات بشكل صحيح.
      </p>
    </div>
  );
};