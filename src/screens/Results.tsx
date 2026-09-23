import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Bus,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  MapPin,
  MoreVertical,
  Share2,
} from "lucide-react";
import { BUSES, type Bus as BusType } from "../data";
import { SeatSheet } from "../components/Chrome";

export default function Results({
  onBack,
  onTrack,
  toast,
}: {
  onBack: () => void;
  onTrack: (b: BusType) => void;
  toast: (m: string) => void;
}) {
  const [sheet, setSheet] = useState<BusType | null>(null);

  return (
    <div className="anim-screen relative h-full bg-[#F2F6F3]">
    <div className="no-scrollbar h-full overflow-y-auto bg-[#F2F6F3]">
      {/* ── header ──────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-[linear-gradient(104deg,#0A552B_0%,#0F6B37_46%,#1E8B49_100%)] px-4 pt-5 pb-5">
        <span className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-white/5" />
        <span className="absolute right-16 top-24 h-32 w-32 rounded-full bg-white/5" />
        <div className="relative flex items-start gap-3">
          <button onClick={onBack} aria-label="Back" className="press mt-0.5 text-white">
            <ArrowLeft size={25} strokeWidth={2.5} />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-[23px] font-extrabold leading-tight tracking-[-0.02em] text-white">
              Search Results
            </h1>
            <p className="truncate text-[13px] font-semibold text-white/85">
              ISBT Delhi → Dahina (Zainabad) • 12 Sep, 2025
            </p>
          </div>
          <button onClick={() => toast("Link copied to clipboard")} aria-label="Share" className="press mt-1 text-white">
            <Share2 size={21} />
          </button>
          <button aria-label="More options" className="press mt-1 text-white">
            <MoreVertical size={21} />
          </button>
        </div>
      </header>

      {/* ── filters ─────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 px-3 pt-3">
        <button className="press flex h-[46px] items-center gap-1.5 rounded-xl border border-[#E7EDE9] bg-white px-2 shadow-[0_4px_12px_rgba(14,44,28,0.06)]">
          <Calendar size={15} className="shrink-0 text-[#254735]" />
          <span className="min-w-0 flex-1 truncate text-left text-[12px] font-bold text-[#17251E]">
            Today, 12 Sep
          </span>
          <ChevronDown size={14} className="shrink-0 text-[#7B8B83]" />
        </button>
        <button className="press flex h-[46px] items-center gap-1.5 rounded-xl border border-[#E7EDE9] bg-white px-2 shadow-[0_4px_12px_rgba(14,44,28,0.06)]">
          <Bus size={15} className="shrink-0 text-[#254735]" />
          <span className="min-w-0 flex-1 truncate text-left text-[12px] font-bold text-[#17251E]">
            All Bus Types
          </span>
          <ChevronDown size={14} className="shrink-0 text-[#7B8B83]" />
        </button>
        <button className="press flex h-[46px] items-center gap-1.5 rounded-xl border border-[#E7EDE9] bg-white px-2 shadow-[0_4px_12px_rgba(14,44,28,0.06)]">
          <ArrowUpDown size={15} className="shrink-0 text-[#254735]" />
          <span className="min-w-0 flex-1 truncate text-left text-[12px] font-bold text-[#17251E]">
            Sort by
          </span>
          <ChevronDown size={14} className="shrink-0 text-[#7B8B83]" />
        </button>
      </div>

      {/* ── route strip ─────────────────────────────────── */}
      <section className="relative mx-3 mt-3 overflow-hidden rounded-[18px] bg-[linear-gradient(100deg,#E4F3E9_0%,#EDF8F1_60%,#E8F6EE_100%)] px-4 pt-4 pb-4">
        <svg
          className="pointer-events-none absolute bottom-0 right-0"
          width="230"
          height="86"
          viewBox="0 0 230 86"
          fill="none"
          aria-hidden
        >
          <path d="M0 74h230v12H0z" fill="#CBE9D6" />
          <path
            d="M40 74c0-9 5-14 5-20s-6-9-6-14 4-9 9-9 8 4 8 9-5 9-5 14 4 11 4 20H40z"
            fill="#BFE3CC"
          />
          <circle cx="22" cy="60" r="12" fill="#C7E7D3" />
          <rect x="126" y="34" width="96" height="34" rx="8" fill="#BFE3CC" />
          <rect x="134" y="40" width="16" height="12" rx="3" fill="#E4F3E9" />
          <rect x="156" y="40" width="16" height="12" rx="3" fill="#E4F3E9" />
          <rect x="178" y="40" width="16" height="12" rx="3" fill="#E4F3E9" />
          <rect x="200" y="40" width="14" height="12" rx="3" fill="#E4F3E9" />
          <circle cx="146" cy="70" r="7" fill="#8FCFA9" />
          <circle cx="204" cy="70" r="7" fill="#8FCFA9" />
        </svg>

        <div className="relative z-10 mb-2 flex justify-end">
          <button className="press flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-[11.5px] font-extrabold text-[#123A25] shadow-sm">
            <MapPin size={13} className="text-[#1B8A4A]" />
            View on map <ChevronRight size={13} className="text-[#7B8B83]" />
          </button>
        </div>

        <div className="relative z-10 flex items-start">
          <div className="min-w-0">
            <p className="text-[27px] font-extrabold leading-none tracking-[-0.03em] text-[#123A25] tnum">
              ISBT
            </p>
            <p className="mt-1 text-[17px] font-bold leading-tight text-[#17251E]">Delhi</p>
            <p className="text-[13px] font-semibold text-[#5B6E64]">(Kashmiri Gate)</p>
          </div>
          <ArrowRight size={26} strokeWidth={2.6} className="mx-3 mt-3 shrink-0 text-[#17251E]" />
          <div className="min-w-0">
            <p className="text-[27px] font-extrabold leading-none tracking-[-0.03em] text-[#123A25] tnum">
              DZN
            </p>
            <p className="mt-1 text-[17px] font-bold leading-tight text-[#17251E]">Dahina</p>
            <p className="text-[13px] font-semibold text-[#5B6E64]">(Zainabad)</p>
          </div>
        </div>
      </section>

      {/* ── count + sort ────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 pt-4 pb-1">
        <p className="text-[17px] font-extrabold text-[#123A25]">
          24 buses found
        </p>
        <button className="press flex items-center gap-1.5 rounded-full border border-[#E7EDE9] bg-white px-3 py-2 text-[12.5px] font-extrabold text-[#17251E] shadow-sm">
          <ArrowUpDown size={14} className="text-[#1B8A4A]" />
          Earliest first <ChevronRight size={14} className="text-[#7B8B83]" />
        </button>
      </div>

      {/* ── bus cards ───────────────────────────────────── */}
      <ul className="px-3 pt-2">
        {BUSES.map((b) => (
          <li key={b.id} className="mb-3">
            <article
              onClick={() => onTrack(b)}
              className="press cursor-pointer rounded-[18px] border border-[#EDF1EE] bg-white p-3.5 shadow-[0_6px_18px_rgba(14,44,28,0.06)]"
            >
              <div className="flex gap-3">
                <div
                  className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[14px]"
                  style={{ background: b.tint }}
                >
                  <Bus size={26} style={{ color: b.glyph }} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-[15.5px] font-extrabold tracking-[-0.01em] text-[#123A25] sm:text-[16.5px]">
                      {b.operator}
                    </h3>
                    <span className="shrink-0 rounded-md bg-[#E8F5EC] px-1.5 py-0.5 text-[11.5px] font-extrabold text-[#0F6B37] tnum">
                      {b.code}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[13px] font-semibold text-[#6B7C74]">
                    ISBT Delhi → Dahina
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 sm:gap-x-2">
                    <span className="text-[14.5px] font-extrabold text-[#123A25] tnum sm:text-[16.5px]">
                      {b.dep}
                    </span>
                    <span className="h-px w-4 bg-[#C9D3CD] sm:w-6" />
                    <span className="text-[14.5px] font-extrabold text-[#123A25] tnum sm:text-[16.5px]">
                      {b.arr}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12.5px] font-semibold text-[#6B7C74] tnum">{b.dur}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {b.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-md bg-[#EEF1F4] px-2 py-[3px] text-[11px] font-bold text-[#48586A] tnum"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex w-[104px] shrink-0 flex-col items-end justify-between border-l border-[#EDF1EE] pl-2.5 sm:w-[110px] sm:pl-3">
                  <p className="text-[21px] font-extrabold leading-none text-[#123A25] tnum">
                    ₹{b.price}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSheet(b);
                    }}
                    className="press my-2 flex items-center gap-1 rounded-xl bg-gradient-to-r from-[#0F6B37] to-[#1B8A4A] px-2 py-2.5 text-[11.5px] font-extrabold text-white shadow-[0_6px_14px_rgba(15,107,55,0.26)] sm:px-2.5 sm:text-[12.5px]"
                  >
                    View Seats <ArrowRight size={13} strokeWidth={3} className="sm:hidden" />
                    <ArrowRight size={14} strokeWidth={3} className="hidden sm:block" />
                  </button>
                  <p className="text-[12px] font-extrabold text-[#1B8A4A]">Runs Daily</p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <button
        onClick={() => toast("Alert set · we'll ping you when seats open")}
        className="press mx-3 mb-5 flex w-[calc(100%-24px)] items-center gap-3 rounded-[18px] bg-[#E4F3E9] px-4 py-4 text-left"
      >
        <Clock size={21} className="text-[#0F6B37]" />
        <span className="text-[15px] font-extrabold text-[#123A25]">Set availability alert</span>
        <ChevronRight size={19} className="ml-auto text-[#4B6B57]" />
      </button>
    </div>

      {sheet && (
        <SeatSheet
          bus={sheet}
          onClose={() => setSheet(null)}
          onConfirm={(n) => {
            setSheet(null);
            toast(`${n} seat${n > 1 ? "s" : ""} held for 10 minutes`);
          }}
        />
      )}
    </div>
  );
}
