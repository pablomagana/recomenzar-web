import { cn } from '@/lib/utils';
import type { Categoria } from '@/types/catalogo';
import { CATEGORIAS } from '@/types/catalogo';

interface CategoryFilterProps {
  selected: Categoria | null;
  onChange: (cat: Categoria | null) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={cn(
          'px-4 py-1.5 rounded-full text-sm font-medium transition',
          !selected
            ? 'bg-green-800 text-white'
            : 'bg-white border border-gray-200 text-gray-600 hover:border-green-800 hover:text-green-800'
        )}
      >
        Todas
      </button>
      {CATEGORIAS.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-medium transition',
            selected === cat.value
              ? 'bg-green-800 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-green-800 hover:text-green-800'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
