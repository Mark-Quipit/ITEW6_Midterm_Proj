import { useState, useRef, useEffect } from 'react';

interface FilterOption {
  label: string;
  value: string;
}

interface BaseFilter {
  name: string;
  label: string;
  options: FilterOption[];
}

interface SingleFilter extends BaseFilter {
  type?: 'select';
  value: string;
  onChange: (value: string) => void;
}

interface MultiFilter extends BaseFilter {
  type: 'multiselect';
  value: string[];
  onChange: (values: string[]) => void;
}

export type FilterConfig = SingleFilter | MultiFilter;

interface FilterPanelProps {
  filters: FilterConfig[];
  search: string;
  onSearchChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
  activeCount: number;
  searchPlaceholder?: string;
}

function MultiSelectDropdown({ filter }: { filter: MultiFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (val: string) => {
    const next = filter.value.includes(val)
      ? filter.value.filter(v => v !== val)
      : [...filter.value, val];
    filter.onChange(next);
  };

  const displayLabel = filter.value.length === 0
    ? `All ${filter.label}`
    : filter.value.map(v => filter.options.find(o => o.value === v)?.label).join(', ');

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(o => !o)}
        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-left focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-sm bg-white hover:border-gray-400 flex items-center justify-between gap-2"
      >
        <span className={`truncate ${filter.value.length > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
          {displayLabel}
        </span>
        {filter.value.length > 0 && (
          <span className="flex-shrink-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-orange-500 rounded-full">
            {filter.value.length}
          </span>
        )}
        <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-52 overflow-auto">
          {filter.options.map(opt => (
            <label key={opt.value} className="flex items-center px-3 py-2.5 hover:bg-orange-50 cursor-pointer gap-3 border-b border-gray-50 last:border-0">
              <input
                type="checkbox"
                checked={filter.value.includes(opt.value)}
                onChange={() => toggle(opt.value)}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-800">{opt.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilterPanel({
  filters,
  search,
  onSearchChange,
  onApply,
  onReset,
  activeCount,
  searchPlaceholder = 'Search...',
}: FilterPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden backdrop-blur-sm">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-b border-orange-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-sm">
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <div>
            <span className="text-sm font-bold text-gray-800">Advanced Filters</span>
            {activeCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-sm">
                {activeCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="p-6 space-y-6 bg-gradient-to-br from-white to-gray-50/30">
        {/* Search */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
            Search
          </label>
          <div className="relative group">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => onSearchChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onApply()}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-gray-400 shadow-sm hover:border-gray-400"
            />
          </div>
        </div>

        {/* Filter Grid */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
            Filter By
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filters.map((filter) => (
              <div key={filter.name}>
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  {filter.label}
                </label>
                {filter.type === 'multiselect' ? (
                  <MultiSelectDropdown filter={filter} />
                ) : (
                  <select
                    value={filter.value}
                    onChange={(e) => filter.onChange(e.target.value)}
                    className="w-full px-3.5 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white hover:border-gray-400 text-gray-900 shadow-sm font-medium"
                  >
                    <option value="">All {filter.label}</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <button
            type="button"
            onClick={onReset}
            disabled={activeCount === 0 && !search}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-600 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Filters
          </button>
          <button
            type="button"
            onClick={onApply}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-red-600 rounded-xl hover:from-orange-700 hover:to-red-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
