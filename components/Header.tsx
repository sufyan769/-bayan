import React from 'react';
import { BookOpen, Search } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-stone-900 text-amber-50 shadow-lg border-b-4 border-amber-600 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" />
              <path d="M0 20 L40 20 M20 0 L20 40" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-amber-600 p-3 rounded-lg shadow-inner">
              <BookOpen className="w-8 h-8 text-stone-900" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-amber-100 leading-tight">
                البداية والنهاية
              </h1>
              <p className="text-amber-200/80 text-sm md:text-base">
                والتاريخ الكبير - محرك البحث الرقمي
              </p>
            </div>
          </div>
          
          <div className="hidden md:block text-amber-50/60 text-sm max-w-md text-left leading-relaxed">
            <p>"تاريخ البشرية منذ خلق السماوات والأرض وقصة آدم عليه السلام حتى القرن الثامن الهجري"</p>
          </div>
        </div>
      </div>
    </header>
  );
};