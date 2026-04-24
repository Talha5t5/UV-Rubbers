"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";

type CompareSliderProps = {
  beforeAlt: string;
  beforeImage: string;
  afterAlt: string;
  afterImage: string;
};

const CompareSlider = ({ beforeAlt, beforeImage, afterAlt, afterImage }: CompareSliderProps) => {
  const [position, setPosition] = useState(50);

  const clipPath = useMemo(() => `inset(0 ${100 - position}% 0 0)`, [position]);

  return (
    <div className="relative overflow-hidden group">
      <div className="relative aspect-[16/9] w-full select-none overflow-hidden bg-muted">
        {/* After Image (Background) */}
        <img src={afterImage} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover grayscale opacity-50" loading="lazy" />

        {/* Before Image (Overlay) */}
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          style={{ clipPath }}
        />

        {/* Floating Divider Line */}
        <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${position}%`, transform: "translateX(-50%)" }}>
          <div className="relative h-full w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)]">
            <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-white shadow-brand border-4 border-white transition-transform group-hover:scale-110">
              <ArrowLeftRight className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="pointer-events-none absolute left-8 top-8 z-20 flex flex-col items-start gap-1">
          <div className="bg-brand text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-brand border border-white/20">
            UV Rubbers
          </div>
          <span className="text-[10px] font-bold text-white/60 tracking-wider shadow-sm ml-4">PRO FINISH</span>
        </div>

        <div className="pointer-events-none absolute right-8 top-8 z-20 flex flex-col items-end gap-1">
          <div className="bg-dark/80 backdrop-blur-md text-white/50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10">
            Traditional
          </div>
          <span className="text-[10px] font-bold text-white/40 tracking-wider shadow-sm mr-4">MESSY SILICONE</span>
        </div>

        {/* Bottom Shade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Controller Bar */}
      <div className="bg-white px-8 py-6 flex items-center gap-6">
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground w-20">Traditional</span>
        <input
          aria-label="Compare UV Rubbers with others"
          className="h-1.5 flex-1 cursor-ew-resize appearance-none rounded-full bg-muted accent-brand hover:accent-brand-dark transition-all"
          max={100}
          min={0}
          onChange={(event) => setPosition(Number(event.target.value))}
          type="range"
          value={position}
        />
        <span className="text-[10px] font-black uppercase tracking-widest text-brand w-20 text-right">Elephant Kit</span>
      </div>
    </div>
  );
};

export default CompareSlider;