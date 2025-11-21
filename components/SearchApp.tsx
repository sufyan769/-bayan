import React, { Component, ReactNode, useMemo } from 'react';
import { liteClient } from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch';
import { CustomSearchBox } from './SearchBox';
import { CustomHits } from './Hits';
import { CustomPagination } from './Pagination';
import { Stats } from './Stats';

const INDEX_NAME = 'algolia_unified';

interface SearchErrorBoundaryProps {
  children?: ReactNode;
}

interface SearchErrorBoundaryState {
  hasError: boolean;
}

// Error Boundary for Search
class SearchErrorBoundary extends Component<SearchErrorBoundaryProps, SearchErrorBoundaryState> {
  state: SearchErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: unknown) {
    console.error("Search Error:", error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center bg-red-50 border border-red-200 rounded text-red-800 text-sm">
          <p>حدث خطأ أثناء تحميل البحث.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export const SearchApp: React.FC = () => {
  // Initialize client with useMemo to ensure stability and avoid cloning issues
  const searchClient = useMemo(() => liteClient(
    '88G4AVERCC',
    '33b0b484f534b2ae2dac948d588345a6'
  ), []);

  return (
    <SearchErrorBoundary>
      <InstantSearch 
        searchClient={searchClient} 
        indexName={INDEX_NAME}
      >
        <Configure 
          hitsPerPage={10} 
          attributesToSnippet={['text_content:80']} 
          snippetEllipsisText="..."
        />
        
        <div className="space-y-6">
          {/* Search Header inside content */}
          <div className="bg-slate-50 p-4 border border-wiki-border rounded-sm">
             <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <CustomSearchBox />
                <Stats />
             </div>
          </div>

          {/* Results Area */}
          <div className="min-h-[200px]">
             <CustomHits />
             <div className="mt-8 flex justify-center border-t border-wiki-border pt-4">
                <CustomPagination />
             </div>
          </div>
        </div>
      </InstantSearch>
    </SearchErrorBoundary>
  );
};