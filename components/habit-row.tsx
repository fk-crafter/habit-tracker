import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  days: boolean[];
  onToggle: (idx: number) => void;
  onDelete: () => void;
}

export const HabitRow = ({ label, days, onToggle, onDelete }: Props) => (
  <div className="flex border-b border-zinc-800 group min-h-[60px] w-full">
    <div className="sticky left-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm flex items-center justify-between px-4 min-w-[140px] md:min-w-[200px] border-r border-zinc-800">
      <span className="text-xs md:text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors uppercase tracking-tight truncate mr-2">
        {label}
      </span>
      <button
        onClick={onDelete}
        className="md:opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-500 transition-all p-1"
      >
        <Trash2 size={14} />
      </button>
    </div>

    <div className="flex flex-1">
      {days.map((checked, i) => (
        <div
          key={i}
          className="shrink-0 w-[50px] md:flex-1 md:min-w-[60px] border-l border-zinc-800/50 flex items-center justify-center p-2"
        >
          <button
            onClick={() => onToggle(i)}
            className={cn(
              "w-8 h-8 md:w-9 md:h-9 rounded-xl transition-all duration-300 flex items-center justify-center relative border-2",
              checked
                ? "bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "bg-transparent border-zinc-800 hover:border-zinc-500",
            )}
          >
            {checked && (
              <Check className="w-4 h-4 md:w-5 md:h-5 stroke-[3px] animate-in zoom-in-50 duration-200" />
            )}
          </button>
        </div>
      ))}
    </div>
  </div>
);
