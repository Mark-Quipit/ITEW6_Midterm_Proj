interface FilterOption {
  label: string;
  value: string;
}

interface FilterPanelProps {
  filters: {
    name: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
  }[];
}

export default function FilterPanel({ filters }: FilterPanelProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      {filters.map((filter) => (
        <div key={filter.name}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {filter.label}
          </label>
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
