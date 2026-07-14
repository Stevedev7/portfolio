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
        <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-text-faint">{label}</p>
      )}
      <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto rounded-md border border-border bg-surface-alt p-2">
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          return (
            <button
              type="button"
              key={option.id}
              onClick={() => toggle(option.id)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                isSelected ? "bg-primary-600 text-white" : "bg-border text-text-muted hover:bg-border-subtle"
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
