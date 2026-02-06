"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Target } from "lucide-react";
import { TrackerHeader } from "@/components/tracker-header";
import { HabitRow } from "@/components/habit-row";

const DAYS_FULL = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export default function Page() {
  const [habits, setHabits] = useState<{ name: string; data: boolean[] }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("my-premium-tracker");
    if (saved) {
      setTimeout(() => {
        setHabits(JSON.parse(saved));
      }, 1000);
    }
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("my-premium-tracker", JSON.stringify(habits));
    }
  }, [habits, isLoaded]);

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setHabits([...habits, { name: inputValue, data: Array(7).fill(false) }]);
    setInputValue("");
  };

  const toggle = (hIdx: number, dIdx: number) => {
    const newHabits = [...habits];
    newHabits[hIdx].data[dIdx] = !newHabits[hIdx].data[dIdx];
    setHabits(newHabits);
  };

  const deleteHabit = (hIdx: number) => {
    if (confirm("Supprimer cette habitude ?")) {
      setHabits(habits.filter((_, i) => i !== hIdx));
    }
  };

  const progress = useMemo(() => {
    if (habits.length === 0) return 0;
    const total = habits.length * 7;
    const checked = habits.flatMap((h) => h.data).filter(Boolean).length;
    return Math.round((checked / total) * 100);
  }, [habits]);

  if (!isLoaded) return <div className="h-screen bg-[#030303]" />;

  return (
    <main className="h-screen w-full bg-[#030303] flex flex-col items-center p-6 md:p-10 font-sans selection:bg-white/10 overflow-hidden">
      <div className="w-full max-w-6xl flex flex-col h-full">
        <TrackerHeader progress={progress} />

        <form onSubmit={addHabit} className="mb-8 flex gap-3">
          <div className="relative flex-1 group">
            <Plus
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors"
              size={18}
            />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ajouter une habitude (ex: Hadith, Sport...)"
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-2xl"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black px-6 rounded-2xl font-bold hover:bg-zinc-200 transition-colors"
          >
            Ajouter
          </button>
        </form>

        <div className="flex-1 bg-zinc-900/10 border border-zinc-800 rounded-3xl flex flex-col overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-[1.5fr_repeat(7,minmax(50px,1fr))] bg-zinc-900/40 border-b border-zinc-800">
            <div className="p-5 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">
              habitudes
            </div>
            {DAYS_FULL.map((d) => (
              <div
                key={d}
                className="flex items-center justify-center text-[10px] font-bold text-zinc-400 border-l border-zinc-800/50 px-2 text-center uppercase tracking-widest leading-tight"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {habits.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 py-32 opacity-50">
                <Target size={48} className="mb-4 stroke-[1px]" />
                <p className="text-sm font-medium uppercase tracking-[0.2em]">
                  Aucune habitude configurée
                </p>
              </div>
            ) : (
              habits.map((h, idx) => (
                <HabitRow
                  key={idx}
                  label={h.name}
                  days={h.data}
                  onToggle={(dIdx) => toggle(idx, dIdx)}
                  onDelete={() => deleteHabit(idx)}
                />
              ))
            )}
          </div>
        </div>

        <footer className="mt-8 flex justify-between text-[10px] text-white uppercase tracking-[0.3em] font-bold px-4">
          <span>{habits.length} Habitudes enregistrées</span>
        </footer>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </main>
  );
}
