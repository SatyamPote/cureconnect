import React, { useState, useEffect } from 'react';
import { Search, MapPin, Sparkles, Filter, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { searchMedicines } from '../services/mockDatabase';
import { interpretSearchQuery, getAlternativeMedicines, AIAlternativeSuggestion } from '../services/geminiService';
import { PharmacyCard } from '../components/PharmacyCard';
import { SearchResult, StockStatus } from '../types';

export const HomePage = () => {
  const { userLocation, addToCart, isLoadingLocation } = useApp();
  const [query, setQuery] = useState('');
  const [isAiSearch, setIsAiSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filter, setFilter] = useState<'Hub' | 'Local Store' | undefined>(undefined);
  
  // Alternative suggestion modal state
  const [alternativeSuggestion, setAlternativeSuggestion] = useState<AIAlternativeSuggestion | null>(null);
  const [loadingAlt, setLoadingAlt] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setResults([]);
    setAlternativeSuggestion(null);

    let searchTerms = [query];

    if (isAiSearch) {
      // Use Gemini to interpret "headache" -> "paracetamol"
      searchTerms = await interpretSearchQuery(query);
      console.log("AI Interpreted Terms:", searchTerms);
    }

    // Search for all terms
    let allResults: SearchResult[] = [];
    searchTerms.forEach(term => {
      const res = searchMedicines(term, userLocation, filter);
      allResults = [...allResults, ...res];
    });

    // Remove duplicates based on PharmacyId + MedicineId
    const uniqueResults = allResults.filter((v, i, a) => 
      a.findIndex(t => (t.pharmacy.id === v.pharmacy.id && t.medicine.id === v.medicine.id)) === i
    );

    // Sort again by distance or stock
    const sorted = uniqueResults.sort((a, b) => a.distance - b.distance);

    setResults(sorted);
    setIsSearching(false);
  };

  const handleFindAlternative = async (medicineName: string, genericName: string) => {
    setLoadingAlt(true);
    const suggestion = await getAlternativeMedicines(medicineName, genericName);
    setAlternativeSuggestion(suggestion);
    setLoadingAlt(false);

    if (suggestion && suggestion.suggestedSearchTerms.length > 0) {
      // Auto trigger search for the alternative
      const altTerm = suggestion.suggestedSearchTerms[0];
      setQuery(altTerm);
      // We don't auto-execute handleSearch to let user read the suggestion first
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Hero / Search Section */}
      <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-6 md:p-10 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Find medicines near you.</h1>
        <p className="text-teal-100 mb-6 text-sm md:text-base">Real-time stock from pharmacies in your area.</p>

        <div className="flex flex-col gap-3">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={isAiSearch ? "Describe symptoms (e.g., severe headache)..." : "Search medicine (e.g., Dolo 650)..."}
              className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-teal-500/30 font-medium shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAiSearch(!isAiSearch)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isAiSearch ? 'bg-white text-indigo-600 shadow-md' : 'bg-teal-700/50 text-teal-100 hover:bg-teal-700'
                }`}
              >
                <Sparkles size={16} />
                AI Smart Search
              </button>
              
              <div className="flex bg-teal-700/50 rounded-lg p-1">
                <button 
                  onClick={() => setFilter(undefined)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${!filter ? 'bg-white text-teal-700' : 'text-teal-100'}`}
                >All</button>
                 <button 
                  onClick={() => setFilter('Hub')}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${filter === 'Hub' ? 'bg-white text-teal-700' : 'text-teal-100'}`}
                >Hubs</button>
              </div>
            </div>

            {isLoadingLocation ? (
               <span className="text-xs text-teal-200 animate-pulse">Locating...</span>
            ) : (
               <div className="flex items-center gap-1 text-xs text-teal-200">
                 <MapPin size={12} />
                 <span>Using current location</span>
               </div>
            )}
          </div>
          
          <button 
            onClick={handleSearch}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-colors mt-2"
          >
            {isSearching ? 'Searching...' : 'Search Inventory'}
          </button>
        </div>
      </div>

      {/* Alternative Suggestion Panel */}
      {loadingAlt && (
        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center gap-3 animate-pulse">
           <Sparkles className="text-indigo-500" />
           <p className="text-indigo-800 text-sm font-medium">AI is analyzing alternatives...</p>
        </div>
      )}

      {alternativeSuggestion && !loadingAlt && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full shadow-sm text-indigo-600">
               <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-indigo-900">Suggested Alternative: {alternativeSuggestion.genericName}</h3>
              <p className="text-indigo-700 text-sm mt-1">{alternativeSuggestion.reason}</p>
              <div className="mt-3">
                 <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wider mb-2">Try searching for:</p>
                 <div className="flex flex-wrap gap-2">
                   {alternativeSuggestion.suggestedSearchTerms.map(term => (
                     <button 
                       key={term}
                       onClick={() => { setQuery(term); handleSearch(); }}
                       className="bg-white hover:bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium border border-indigo-200 transition-colors"
                     >
                       {term}
                     </button>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results List */}
      <div className="space-y-4">
        {results.length > 0 ? (
          <>
             <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-800">Results near you</h2>
              <span className="text-xs text-slate-500">{results.length} found</span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((result, idx) => (
                <PharmacyCard 
                  key={`${result.pharmacy.id}-${result.medicine.id}-${idx}`} 
                  data={result} 
                  onAddToCart={() => addToCart({
                    ...result.medicine,
                    quantity: 1,
                    pharmacyId: result.pharmacy.id
                  })}
                  onFindAlternative={() => handleFindAlternative(result.medicine.name, result.medicine.genericName)}
                />
              ))}
             </div>
          </>
        ) : (
          !isSearching && query && (
             <div className="text-center py-10 text-slate-500">
               <AlertTriangle className="mx-auto mb-2 opacity-50" size={32} />
               <p>No medicines found for "{query}".</p>
               <p className="text-sm mt-1">Try turning on AI Smart Search for better matches.</p>
             </div>
          )
        )}

        {!query && !isSearching && (
          <div className="text-center py-12">
            <div className="inline-block bg-teal-50 p-4 rounded-full mb-4">
              <MapPin size={32} className="text-teal-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-800">Explore Nearby Pharmacies</h3>
            <p className="text-slate-500 max-w-sm mx-auto mt-2">
              Enter a medicine name to see real-time stock availability in pharmacies around your location.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
