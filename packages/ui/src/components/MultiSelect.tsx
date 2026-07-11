import React from 'react';

interface Option {
  id: number;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  label?: string;
}

export const MultiSelect = ({ options, selectedIds, onChange, label }: MultiSelectProps) => {
  const toggle = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((existing) => existing !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div>
      {label && <p className="mb-1 text-sm font-medium text-gray-700">{label}</p>}
      <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto rounded border p-2">
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          return (
            <button
              type="button"
              key={option.id}
              onClick={() => toggle(option.id)}
              className={`rounded-full px-3 py-1 text-xs ${
                isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
