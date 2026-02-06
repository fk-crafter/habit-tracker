// app/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Target } from "lucide-react";
import { TrackerHeader } from "@/components/tracker-header";
import { HabitRow } from "@/components/habit-row";

const DAYS_SHORT = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function Page() {
  const [habits, setHabits] = useState<{ name: string; data: boolean[] }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("my-premium-tracker");
    if (saved) {
      setTimeout(() => {
        setHabits(JSON.parse(saved));
        setIsLoaded(true);
      }, 1000);
    }
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
    setHabits([...newHabits]);
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
    <main className="h-dvh w-full bg-[#030303] flex flex-col items-center p-4 md:p-10 font-sans selection:bg-white/10">
      <div className="w-full max-w-5xl flex flex-col h-full gap-6">
        <TrackerHeader progress={progress} />
        <form onSubmit={addHabit} className="flex gap-2">
          <div className="relative flex-1 group">
            <Plus
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
            />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Habitude..."
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-3 md:py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-zinc-500 transition-all"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black px-5 md:px-8 rounded-2xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95"
          >
            Ajouter
          </button>
        </form>
        <div className="flex-1 bg-zinc-900/10 border border-zinc-800 rounded-3xl flex flex-col overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
            <div className="min-w-[600px] md:min-w-full">
              <div className="flex bg-zinc-900/40 border-b border-zinc-800 sticky top-0 z-30">
                <div className="sticky left-0 z-40 bg-[#060606] px-4 py-4 min-w-[120px] md:min-w-[200px] text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic border-r border-zinc-800">
                  Habitudes
                </div>
                <div className="flex flex-1">
                  {DAYS_SHORT.map((d) => (
                    <div
                      key={d}
                      className="flex-1 min-w-[50px] md:min-w-[60px] flex items-center justify-center text-[10px] font-bold text-zinc-400 border-l border-zinc-800/50 uppercase tracking-widest py-4"
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                {habits.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-white py-20 opacity-50">
                    <Target size={40} className="mb-4 stroke-[1px]" />
                    <p className="text-[10px] uppercase tracking-widest font-bold">
                      Créez votre première habitude
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
          </div>
        </div>
        <footer className="flex justify-between text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold px-2 mb-2">
          <span>{habits.length} habitudes créées</span>
        </footer>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
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
