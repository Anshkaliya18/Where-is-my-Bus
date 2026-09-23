import {
  ArrowRight,
  ArrowUpDown,
  Bell,
  Bus,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  MapPin,
  Menu,
  Search,
  Star,
  X,
} from "lucide-react";
import hero from "../assets/hero-bus.png";
import { RECENTS } from "../data";
import { BellBadge } from "../components/Chrome";

const QUICK = [
  { title: "Bus No.", sub: "Track by number", Icon: Bus, bg: "#E4F3E9", fg: "#1B8A4A" },
  { title: "Bus Stop", sub: "Departure board", Icon: MapPin, bg: "#E4EEFB", fg: "#2C6FD1" },
  { title: "Nearby Stops", sub: "Find around you", Icon: MapPin, bg: "#FDEDE2", fg: "#E2701A" },
  { title: "Favourites", sub: "Quick access", Icon: Star, bg: "#F1EAFB", fg: "#7C4DD1" },
];

export default function Home({
  onFind,
  onRecent,
  from,
  to,
  onSwap,
  onClear,
}: {
  onFind: () => void;
  onRecent: () => void;
  from: { code: string; name: string };
  to: { code: string; name: string };
  onSwap: () => void;
  onClear: (which: "from" | "to") => void;
}) {
  return (
    <div className="anim-screen h-full overflow-y-auto no-scrollbar pb-[max(22px,env(safe-area-inset-bottom))]">
      {/* ── illustrated hero ─────────────────────────────── */}
      <header className="relative h-[318px] overflow-hidden">
        <img
          src={hero}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[50%_62%]"
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/85 via-white/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F2F6F3] to-transparent" />

        <div className="relative flex items-start gap-3 px-4 pt-5">
          <button aria-label="Menu" className="press mt-1 text-[#0F2A1C]">
            <Menu size={26} strokeWidth={2.4} />
          </button>
          <div className="flex-1">
            <h1 className="text-[27px] font-extrabold leading-none tracking-[-0.02em] text-[#123A25]">
              Where is My <span className="text-[#1B8A4A]">Bus</span>
            </h1>
            <p className="mt-1.5 text-[13px] font-bold tracking-[0.01em] text-[#254735]">
              Track Smarter. Travel Better.
            </p>
          </div>
          <button aria-label="Notifications" className="press mt-1">
            <BellBadge />
          </button>
        </div>

        <p className="hand absolute left-5 top-[104px] w-[150px] text-[27px] font-bold leading-[0.98] text-[#14351F]">
          Every
          <br />
          Bus Brings You
          <br />
          Closer
        </p>
        <svg
          className="absolute left-5 top-[196px]"
          width="96"
          height="12"
          viewBox="0 0 96 12"
          fill="none"
          aria-hidden
        >
          <path
            d="M2 8.4C18 4.2 44 2.6 94 4.6"
            stroke="#1B8A4A"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </header>

      {/* ── search card ─────────────────────────────────── */}
      <section className="relative z-10 -mt-[74px] px-3">
        <div className="rounded-[24px] bg-white p-4 shadow-[0_14px_34px_rgba(14,44,28,0.10)]">
          <div className="relative">
            {/* rail */}
            <span className="absolute left-[11px] top-[26px] h-[46px] border-l-2 border-dashed border-[#B9C7BF]" />
            <span className="absolute left-[3px] top-[6px] h-[18px] w-[18px] rounded-full border-[4px] border-[#1B8A4A]" />
            <span className="absolute left-[4px] top-[74px]">
              <MapPin size={20} className="fill-[#0F2A1C] text-[#0F2A1C]" />
            </span>

            {/* swap */}
            <button
              onClick={onSwap}
              aria-label="Swap stations"
              className="press absolute right-[58px] top-[36px] z-10 grid h-11 w-11 place-items-center rounded-full bg-[#E4F3E9] ring-4 ring-white"
            >
              <ArrowUpDown size={19} className="text-[#0F6B37]" strokeWidth={2.6} />
            </button>

            {/* from */}
            <div className="pl-9">
              <p className="text-[12px] font-semibold text-[#6B7C74]">From</p>
              <div className="mt-1 flex items-center gap-2 pb-3">
                <span className="rounded-md bg-[#E8F5EC] px-2 py-1 text-[13px] font-extrabold tracking-[0.03em] text-[#0F6B37]">
                  {from.code}
                </span>
                <span className="min-w-0 flex-1 truncate text-[15.5px] font-semibold text-[#17251E]">
                  {from.name}
                </span>
                <button
                  onClick={() => onClear("from")}
                  aria-label="Clear origin"
                  className="press text-[#9AA8A1]"
                >
                  <X size={19} />
                </button>
              </div>
              <div className="border-t border-[#EDF1EE]" />
              <p className="mt-3 text-[12px] font-semibold text-[#6B7C74]">To</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="rounded-md bg-[#E8F5EC] px-2 py-1 text-[13px] font-extrabold tracking-[0.03em] text-[#0F6B37]">
                  {to.code}
                </span>
                <span className="min-w-0 flex-1 truncate text-[15.5px] font-semibold text-[#17251E]">
                  {to.name}
                </span>
                <button
                  onClick={() => onClear("to")}
                  aria-label="Clear destination"
                  className="press text-[#9AA8A1]"
                >
                  <X size={19} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="press flex h-[52px] items-center gap-2 rounded-xl border border-[#E2E9E4] px-3 text-left">
              <Calendar size={18} className="shrink-0 text-[#254735]" />
              <span className="min-w-0 flex-1 truncate text-[13.5px] font-bold text-[#17251E]">
                Today, 12 Sep
              </span>
              <ChevronDown size={16} className="shrink-0 text-[#7B8B83]" />
            </button>
            <button className="press flex h-[52px] items-center gap-2 rounded-xl border border-[#E2E9E4] px-3 text-left">
              <Clock size={18} className="shrink-0 text-[#254735]" />
              <span className="min-w-0 flex-1 truncate text-[13.5px] font-bold text-[#17251E]">
                Depart Now
              </span>
              <ChevronDown size={16} className="shrink-0 text-[#7B8B83]" />
            </button>
          </div>

          <button
            onClick={onFind}
            className="press relative mt-3 flex h-[56px] w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#0F6B37] to-[#1B8A4A] text-white shadow-[0_12px_24px_rgba(15,107,55,0.28)]"
          >
            <Search size={21} strokeWidth={2.6} />
            <span className="text-[18px] font-extrabold tracking-[-0.01em]">Find Buses</span>
            <ArrowRight size={20} className="absolute right-5" strokeWidth={2.6} />
          </button>
        </div>
      </section>

      {/* ── quick actions ───────────────────────────────── */}
      <section className="mt-4 grid grid-cols-4 gap-2 px-3">
        {QUICK.map(({ title, sub, Icon, bg, fg }) => (
          <button
            key={title}
            className="press flex flex-col items-center rounded-2xl bg-white px-1 py-3 text-center shadow-[0_6px_18px_rgba(14,44,28,0.06)]"
          >
            <span
              className="grid h-10 w-10 place-items-center rounded-full"
              style={{ background: bg }}
            >
              <Icon size={20} style={{ color: fg }} fill={title === "Favourites" ? fg : "none"} />
            </span>
            <span className="mt-2 text-[11.5px] font-extrabold leading-tight text-[#17251E] sm:text-[12.5px]">
              {title}
            </span>
            <span className="mt-0.5 flex items-center gap-0.5 text-[9.5px] font-semibold leading-tight text-[#6B7C74] sm:text-[10.5px]">
              {sub}
              <ChevronRight size={11} className="shrink-0" />
            </span>
          </button>
        ))}
      </section>

      {/* ── recent searches ─────────────────────────────── */}
      <section className="mt-4 px-3">
        <div className="rounded-[20px] bg-white p-4 shadow-[0_6px_18px_rgba(14,44,28,0.06)]">
          <div className="flex items-center justify-between">
            <h2 className="text-[19px] font-extrabold tracking-[-0.01em] text-[#123A25]">
              Recent Searches
            </h2>
            <button className="press flex items-center gap-0.5 text-[13px] font-extrabold text-[#1B8A4A]">
              See All <ChevronRight size={15} />
            </button>
          </div>
          <ul className="mt-1">
            {RECENTS.map((r, i) => (
              <li key={r.no}>
                <button
                  onClick={onRecent}
                  className={`press flex w-full items-center gap-3 py-3 text-left ${
                    i > 0 ? "border-t border-[#EDF1EE]" : ""
                  }`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E4F3E9]">
                    <Bus size={19} className="text-[#1B8A4A]" />
                  </span>
                  <span className="w-[44px] shrink-0 text-[17px] font-extrabold text-[#123A25] tnum">
                    {r.no}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-bold text-[#17251E]">
                      {r.title}
                    </span>
                    <span className="block text-[12px] font-semibold text-[#6B7C74] tnum">
                      {r.codes}
                    </span>
                  </span>
                  <ChevronRight size={18} className="shrink-0 text-[#9AA8A1]" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-[#6B7C74]">
        <Bell size={12} /> Alert on for 411 · ISBT Delhi → Dahina
      </p>
    </div>
  );
}
