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
    <div className="sticky left-0 z-20 bg-[#060606]/95 backdrop-blur-md flex items-center justify-between px-4 min-w-[120px] md:min-w-[200px] border-r border-zinc-800">
      <span className="text-[11px] md:text-sm font-semibold text-zinc-100 uppercase tracking-tight truncate mr-2">
        {label}
      </span>
      <button
        onClick={onDelete}
        className="md:opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-500 p-1"
      >
        <Trash2 size={14} />
      </button>
    </div>

    <div className="flex flex-1">
      {days.map((checked, i) => (
        <div
          key={i}
          className="flex-1 min-w-[50px] md:min-w-[60px] border-l border-zinc-800/50 flex items-center justify-center p-2"
        >
          <button
            onClick={() => onToggle(i)}
            className={cn(
              "w-8 h-8 rounded-xl transition-all duration-300 flex items-center justify-center border-2",
              checked
                ? "bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "bg-transparent border-zinc-800 hover:border-zinc-700",
            )}
          >
            {checked && <Check className="w-4 h-4 stroke-[3px]" />}
          </button>
        </div>
      ))}
    </div>
  </div>
);
