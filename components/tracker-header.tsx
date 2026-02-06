import { Target, Flame } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  progress: number;
}

export const TrackerHeader = ({ progress }: Props) => (
  <header className="flex flex-col gap-6 mb-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
          <Target className="text-black w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
            Tracker d&apos;habitudes
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
            Progression de la semaine
          </p>
          <p className="text-2xl font-mono text-white leading-none">
            {progress}%
          </p>
        </div>
        <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/50">
          <Flame
            className={`w-5 h-5 ${progress > 50 ? "text-orange-500" : "text-zinc-700"}`}
          />
        </div>
      </div>
    </div>
    <div className="h-px w-full bg-zinc-800 relative">
      <motion.div
        className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "circOut" }}
      />
    </div>
  </header>
);
