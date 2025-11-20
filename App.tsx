import React, { useState, useRef, useEffect } from 'react';
import { 
  InstantSearch, 
  Hits, 
  Pagination, 
  Stats, 
  Configure,
  useInstantSearch,
  useSearchBox
} from 'react-instantsearch';
import { searchClient, INDEX_NAME } from './services/algoliaClient';
import { Header } from './components/Header';
import { SearchResultItem } from './components/SearchResultItem';
import { EmptyState } from './components/EmptyState';
import { Search, Loader2, X } from 'lucide-react';

// Custom SearchBox to prevent search-as-you-type
const CustomSearchBox = (props: any) => {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync local state if query changes from outside (e.g. URL or clear)
  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.blur();
    }
    // Only search when explicitly requested
    refine(inputValue);
  };

  const handleReset = () => {
    setInputValue('');
    refine('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative w-full flex items-center gap-2"
    >
      <div className="relative flex-grow">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="ابحث في التاريخ... (مثال: فتح القسطنطينية)"
          className="w-full pl-4 pr-12 py-4 bg-stone-50 border-2 border-stone-200 rounded-xl text-lg focus:outline-none focus:border-amber-500 focus:bg-white transition-colors shadow-inner placeholder:text-stone-400"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleReset}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className="h-5 w-5 text-stone-400" />
        </div>
      </div>
      
      <button
        type="submit"
        className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-md flex items-center gap-2 whitespace-nowrap"
      >
        <Search className="w-5 h-5" />
        بحث
      </button>
    </form>
  );
};

// Wrapper to handle empty results properly using hook
const Results = () => {
  const { results, status } = useInstantSearch();

  if (status === 'loading' || status === 'stalled') {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  // Show something else if there is no search yet, or handle empty hits
  if (results.nbHits === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <Hits 
        hitComponent={SearchResultItem} 
        classNames={{
          list: 'space-y-6',
          item: 'bg-transparent'
        }}
      />
      <div className="flex justify-center py-8 dir-ltr">
        <Pagination 
          classNames={{
            list: 'flex gap-2 flex-wrap justify-center',
            item: 'hidden md:block group',
            selectedItem: 'font-bold pagination-selected',
            link: 'px-4 py-2 rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-amber-50 hover:border-amber-300 transition-colors group-[.pagination-selected]:!bg-amber-600 group-[.pagination-selected]:!text-white group-[.pagination-selected]:!border-amber-600',
            disabledItem: 'opacity-50 cursor-not-allowed'
          }}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <InstantSearch searchClient={searchClient} indexName={INDEX_NAME} future={{ preserveSharedStateOnUnmount: true }}>
          {/* Update: Hits per page set to 20 */}
          <Configure hitsPerPage={20} />

          {/* Search Area */}
          <div className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-30">
            <div className="container mx-auto px-4 py-6">
              <div className="relative max-w-4xl mx-auto">
                {/* Using CustomSearchBox instead of default SearchBox */}
                <CustomSearchBox />
              </div>
              
              <div className="max-w-4xl mx-auto mt-2 flex justify-between items-center text-xs text-stone-500 px-2">
                <Stats 
                  translations={{
                    rootElementText({ nbHits, processingTimeMS }) {
                      return `تم العثور على ${nbHits.toLocaleString('ar-EG')} نتيجة في ${processingTimeMS} جزء من الثانية`;
                    },
                  }}
                />
                <span>بحث يدوي (توفير البيانات)</span>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="container mx-auto px-4 py-8 max-w-4xl">
             <Results />
          </div>
        </InstantSearch>
      </main>

      <footer className="bg-stone-900 text-stone-400 py-8 mt-auto border-t border-stone-800">
        <div className="container mx-auto px-4 text-center">
          <p className="font-amiri text-lg mb-2">البداية والنهاية</p>
          <p className="text-sm opacity-60">&copy; {new Date().getFullYear()} جميع الحقوق محفوظة. مشروع التاريخ الكبير.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;