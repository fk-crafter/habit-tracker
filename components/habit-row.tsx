import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  days: boolean[];
  onToggle: (idx: number) => void;
  onDelete: () => void;
}

export const HabitRow = ({ label, days, onToggle, onDelete }: Props) => (
  <div className="grid grid-cols-[1.5fr_repeat(7,minmax(50px,1fr))] border-b border-zinc-800 group min-h-[60px]">
    <div className="flex items-center justify-between px-4">
      <span className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors uppercase tracking-tight">
        {label}
      </span>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-500 transition-all"
      >
        <Trash2 size={14} />
      </button>
    </div>
    {days.map((checked, i) => (
      <div
        key={i}
        className="border-l border-zinc-800/50 flex items-center justify-center p-2"
      >
        <button
          onClick={() => onToggle(i)}
          className={cn(
            "w-9 h-9 rounded-xl transition-all duration-300 flex items-center justify-center relative border-2",
            checked
              ? "bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              : "bg-transparent border-zinc-700 hover:border-zinc-500",
          )}
        >
          {checked && (
            <Check className="w-5 h-5 stroke-[3px] animate-in zoom-in-50 duration-200" />
          )}
        </button>
      </div>
    ))}
  </div>
);
