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
      {label && (
        <p className="mb-1 font-mono text-xs uppercase tracking-wide text-ink-500 dark:text-ink-300">{label}</p>
      )}
      <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto rounded border border-canvas-400 bg-white p-2 dark:border-ink-700 dark:bg-ink-800">
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          return (
            <button
              type="button"
              key={option.id}
              onClick={() => toggle(option.id)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                isSelected
                  ? "bg-primary-600 text-white"
                  : "bg-canvas-100 text-ink-900 hover:bg-canvas-300 dark:bg-ink-700 dark:text-canvas-100 dark:hover:bg-ink-600"
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
