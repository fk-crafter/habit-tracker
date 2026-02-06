import { Target, Flame } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  progress: number;
}

export const TrackerHeader = ({ progress }: Props) => (
  <header className="flex flex-col gap-6 mb-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.25)]">
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
        <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center bg-zinc-900/50 relative overflow-hidden group">
          <Flame
            className={`w-5 h-5 transition-colors duration-500 ${
              progress > 50
                ? "text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]"
                : "text-zinc-700"
            }`}
          />
        </div>
      </div>
    </div>
    <div className="h-1 w-full bg-zinc-900 rounded-full relative overflow-visible">
      <motion.div
        className="absolute top-0 left-0 h-full bg-white blur-[6px] opacity-40 rounded-full"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.2, ease: "circOut" }}
      />

      <motion.div
        className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] rounded-full z-10"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "circOut" }}
      />

      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-white rounded-full blur-sm z-20"
        animate={{ left: `${progress}%` }}
        transition={{ duration: 1, ease: "circOut" }}
        style={{ opacity: progress > 0 ? 1 : 0 }}
      />
    </div>
  </header>
);
