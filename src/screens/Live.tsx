import { useEffect, useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bell,
  Bus,
  Check,
  ChevronRight,
  Clock,
  Crosshair,
  Layers,
  MapPin,
  MoreVertical,
  Navigation,
  Share2,
  Star,
} from "lucide-react";
import mapTex from "../assets/map-texture.png";
import { STOPS, type Bus as BusType } from "../data";

export default function Live({
  bus,
  onBack,
  toast,
}: {
  bus: BusType;
  onBack: () => void;
  toast: (m: string) => void;
}) {
  const [secs, setSecs] = useState(10);
  const [speed, setSpeed] = useState(42);
  const [faved, setFaved] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSecs((s) => (s >= 59 ? 1 : s + 1));
      setSpeed(() => 40 + Math.floor(Math.random() * 6));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="anim-screen h-full overflow-y-auto no-scrollbar bg-[#F2F6F3]">
      {/* ── header ──────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-[linear-gradient(104deg,#0A552B_0%,#0F6B37_46%,#1E8B49_100%)] px-4 pt-5 pb-5">
        <span className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-white/5" />
        <div className="relative flex items-start gap-3">
          <button onClick={onBack} aria-label="Back" className="press mt-0.5 text-white">
            <ArrowLeft size={25} strokeWidth={2.5} />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-white">
              {bus.operator} {bus.code}
            </h1>
            <p className="truncate text-[13px] font-semibold text-white/85">
              ISBT Delhi → Dahina (Zainabad)
            </p>
          </div>
          <button onClick={() => toast("Trip shared with 3 contacts")} aria-label="Share" className="press mt-1 text-white">
            <Share2 size={21} />
          </button>
          <button aria-label="More options" className="press mt-1 text-white">
            <MoreVertical size={21} />
          </button>
        </div>
      </header>

      {/* ── live map ────────────────────────────────────── */}
      <div className="relative h-[420px] overflow-hidden bg-[#EDF1EE]">
        <img src={mapTex} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#F4F7F4]/25" />

        <svg
          className="absolute inset-0"
          width="100%"
          height="100%"
          viewBox="0 0 430 420"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          <path
            d="M216 56 C206 80 200 96 206 116 C212 138 208 150 214 166 C222 190 226 214 234 234 C240 252 242 270 244 286"
            stroke="#0F6B37"
            strokeOpacity="0.22"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M216 56 C206 80 200 96 206 116 C212 138 208 150 214 166 C222 190 226 214 234 234 C240 252 242 270 244 286"
            stroke="#12884A"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeDasharray="14 10"
            className="route-dash"
          />
          <circle cx="216" cy="56" r="7" fill="#fff" stroke="#12884A" strokeWidth="4" />
          <circle cx="206" cy="116" r="7" fill="#fff" stroke="#12884A" strokeWidth="4" />
          <circle cx="234" cy="234" r="7" fill="#fff" stroke="#12884A" strokeWidth="4" />
          <circle cx="244" cy="286" r="12" fill="#fff" stroke="#12884A" strokeWidth="5" />
          <circle cx="244" cy="286" r="4.5" fill="#12884A" />
        </svg>

        {/* labels */}
        <span className="absolute left-[41%] top-[7%] text-[13px] font-semibold text-[#41524A]">
          Pirthal
        </span>
        <span className="absolute left-[37%] top-[26%] text-[13px] font-semibold text-[#41524A]">
          Sonipat
        </span>
        <span className="absolute left-[70%] top-[38%] text-[13px] font-semibold text-[#41524A]">
          Sonipat
        </span>
        <span className="absolute left-[57%] top-[53%] text-[13px] font-semibold text-[#41524A]">
          Rai
        </span>
        <span className="absolute left-[62%] top-[65%] text-[15px] font-extrabold text-[#17251E]">
          Dahina
        </span>
        <span className="absolute left-[5%] top-[48%] text-[13px] font-semibold text-[#41524A]">
          Rohtak
        </span>
        <span className="absolute left-[24%] top-[77%] text-[13px] font-semibold text-[#41524A]">
          Bahadurgarh
        </span>
        <span className="absolute left-[53%] top-[89%] text-[15px] font-extrabold text-[#17251E]">
          Delhi
        </span>
        <span className="absolute left-[38%] top-[51%] rounded bg-[#F5C542] px-1.5 py-0.5 text-[10px] font-extrabold text-[#4A3A05] shadow-sm tnum">
          NH 44
        </span>

        {/* next-stop callout */}
        <div className="absolute left-[52%] top-[7.5%] rounded-lg bg-white px-2 py-1.5 text-center shadow-[0_6px_16px_rgba(14,44,28,0.18)]">
          <p className="rounded bg-[#0F6B37] px-2 py-[2px] text-[10px] font-extrabold uppercase tracking-[0.06em] text-white">
            Next Stop
          </p>
          <p className="mt-1 text-[14px] font-extrabold leading-none text-[#123A25]">Murthal</p>
        </div>

        {/* bus marker */}
        <div className="absolute left-[49.5%] top-[35.5%] -translate-x-1/2 -translate-y-1/2">
          <span className="radar absolute left-1/2 top-1/2 -ml-[26px] -mt-[26px] block h-[52px] w-[52px] rounded-full bg-[#12884A]" />
          <span className="relative grid h-[42px] w-[42px] place-items-center rounded-[13px] bg-[#0F6B37] text-white shadow-[0_8px_18px_rgba(15,107,55,0.45)] ring-4 ring-white">
            <Bus size={22} />
          </span>
        </div>

        {/* live chip */}
        <div className="absolute left-3 top-3 rounded-xl bg-white px-3 py-2 shadow-[0_8px_20px_rgba(14,44,28,0.14)]">
          <p className="flex items-center gap-2 text-[15px] font-extrabold tracking-[0.04em] text-[#123A25]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#12A05A]" />
            LIVE
          </p>
          <p className="text-[11px] font-semibold text-[#5B6E64] tnum">
            Last updated {secs} sec ago
          </p>
        </div>

        {/* map controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-3">
          {[
            { Icon: Crosshair, label: "Recentre" },
            { Icon: Layers, label: "Map layers" },
            { Icon: Navigation, label: "Navigate" },
          ].map(({ Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              className="press grid h-11 w-11 place-items-center rounded-full bg-white text-[#17251E] shadow-[0_6px_16px_rgba(14,44,28,0.16)]"
            >
              <Icon size={19} strokeWidth={2.3} />
            </button>
          ))}
        </div>

        {/* eta chip */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_8px_20px_rgba(14,44,28,0.14)]">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#E4F3E9]">
            <Clock size={17} className="text-[#0F6B37]" />
          </span>
          <span className="leading-none">
            <span className="block text-[11px] font-semibold text-[#5B6E64]">ETA</span>
            <span className="block text-[17px] font-extrabold text-[#0F6B37] tnum">8 min</span>
          </span>
        </div>
      </div>

      {/* ── detail sheet ────────────────────────────────── */}
      <section className="relative z-10 -mt-5 rounded-t-[26px] bg-white px-4 pt-3 pb-6 shadow-[0_-12px_30px_rgba(14,44,28,0.10)]">
        <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-[#DDE5E0]" />

        <div className="flex items-center gap-3">
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px]"
            style={{ background: bus.tint }}
          >
            <Bus size={25} style={{ color: bus.glyph }} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 truncate text-[19px] font-extrabold tracking-[-0.01em] text-[#123A25]">
              {bus.operator}
              <span className="rounded-md bg-[#E8F5EC] px-1.5 py-0.5 text-[11.5px] font-extrabold text-[#0F6B37] tnum">
                {bus.code}
              </span>
            </p>
            <p className="truncate text-[12.5px] font-semibold text-[#6B7C74]">
              ISBT Delhi → Dahina (Zainabad)
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#E4F3E9] px-2.5 py-1.5 text-[12.5px] font-extrabold text-[#0F6B37]">
            <Activity size={14} /> On Time
          </span>
        </div>

        <div className="mt-4 grid grid-cols-4 divide-x divide-[#EDF1EE]">
          {[
            { k: "Distance Left", v: "12 km", s: "" },
            { k: "Estimated Arrival", v: "8 min", s: "10:42 AM", green: true },
            { k: "Current Speed", v: `${speed} km/h`, s: "" },
            { k: "Trip Duration", v: bus.dur, s: "" },
          ].map((c) => (
            <div key={c.k} className="px-1.5 first:pl-0 last:pr-0">
              <p className="text-[10.5px] font-semibold leading-tight text-[#6B7C74]">{c.k}</p>
              <p
                className={`mt-1 text-[16.5px] font-extrabold leading-tight tnum ${
                  c.green ? "text-[#0F6B37]" : "text-[#123A25]"
                }`}
              >
                {c.v}
              </p>
              {c.s && <p className="text-[11px] font-semibold text-[#6B7C74] tnum">{c.s}</p>}
            </div>
          ))}
        </div>

        <div className="relative mt-4 overflow-hidden rounded-[18px] bg-[#EAF6EE] px-4 py-3.5">
          <svg
            className="pointer-events-none absolute bottom-0 right-0"
            width="170"
            height="72"
            viewBox="0 0 170 72"
            fill="none"
            aria-hidden
          >
            <path d="M96 66h68v6H96z" fill="#CBE9D6" />
            <path d="M104 40h52l6 8h-64l6-8z" fill="#BFE3CC" />
            <rect x="112" y="48" width="5" height="18" fill="#BFE3CC" />
            <rect x="145" y="48" width="5" height="18" fill="#BFE3CC" />
            <rect x="122" y="54" width="24" height="5" rx="2.5" fill="#A9DCC0" />
            <path d="M44 66c0-8 4-12 4-17s-5-8-5-12 3-8 8-8 7 4 7 8-4 8-4 12 4 9 4 17H44z" fill="#C7E7D3" />
            <circle cx="24" cy="56" r="11" fill="#CBE9D6" />
          </svg>
          <div className="relative flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white">
              <MapPin size={21} className="fill-[#0F6B37] text-[#0F6B37]" />
            </span>
            <span>
              <span className="block text-[12px] font-semibold text-[#5B6E64]">Next stop</span>
              <span className="block text-[19px] font-extrabold leading-tight text-[#123A25]">
                Murthal
              </span>
              <span className="block text-[12.5px] font-semibold text-[#5B6E64] tnum">
                12 km away
              </span>
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => toast("Reminder set for 10:32 AM")}
            className="press flex h-[50px] flex-[1.4] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F6B37] to-[#1B8A4A] text-[13.5px] font-extrabold text-white shadow-[0_8px_18px_rgba(15,107,55,0.26)]"
          >
            <Bell size={17} /> Set Alert
          </button>
          <button
            onClick={() => {
              setFaved((f) => !f);
              toast(faved ? "Removed from favourites" : "Added to favourites");
            }}
            className={`press flex h-[50px] flex-1 items-center justify-center gap-1.5 rounded-xl border text-[13px] font-extrabold ${
              faved
                ? "border-[#0F6B37] bg-[#E4F3E9] text-[#0F6B37]"
                : "border-[#E2E9E4] bg-white text-[#17251E]"
            }`}
          >
            <Star size={16} fill={faved ? "#0F6B37" : "none"} /> Favourites
          </button>
          <button
            onClick={() => toast("Live trip link copied")}
            className="press flex h-[50px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E2E9E4] bg-white text-[13px] font-extrabold text-[#17251E]"
          >
            <Share2 size={16} /> Share
          </button>
        </div>

        {/* stops timeline */}
        <div className="mt-4 rounded-[18px] border border-[#EDF1EE] bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[19px] font-extrabold tracking-[-0.01em] text-[#123A25]">Stops</h2>
            <button
              onClick={() => toast("Full route · 9 stops, 168 km")}
              className="press flex items-center gap-0.5 text-[13px] font-extrabold text-[#1B8A4A]"
            >
              View Full Route <ChevronRight size={15} />
            </button>
          </div>

          <ul className="mt-2">
            {STOPS.map((s, i) => {
              const first = i === 0;
              const last = i === STOPS.length - 1;
              const lineTop = s.state === "todo" && i > 0 ? "#12324A" : "#12884A";
              const nodeCls =
                s.state === "done"
                  ? "bg-[#0F6B37] ring-[#0F6B37]/25"
                  : s.state === "passed"
                    ? "bg-white ring-[#12884A]"
                    : s.state === "next"
                      ? "bg-white ring-[#12884A] ring-4"
                      : "bg-white ring-[#12324A]";
              return (
                <li
                  key={s.name}
                  className={`relative grid grid-cols-[42px_22px_minmax(0,1fr)] items-start gap-x-2 rounded-lg px-1 py-2.5 ${
                    s.state === "next" ? "bg-[#F1F9F3]" : ""
                  }`}
                >
                  <span className="pt-1 text-right text-[11.5px] font-semibold text-[#6B7C74] tnum">
                    {s.dist}
                  </span>

                  <span className="relative flex justify-center">
                    {!first && (
                      <span
                        className="absolute bottom-[14px] left-1/2 w-[3px] -translate-x-1/2"
                        style={{ top: 0, background: lineTop }}
                      />
                    )}
                    {!last && (
                      <span
                        className="absolute top-[14px] left-1/2 w-[3px] -translate-x-1/2"
                        style={{
                          bottom: 0,
                          background: s.state === "todo" ? "#12324A" : "#12884A",
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 mt-1 grid place-items-center rounded-full ring-[3px] ${nodeCls} ${
                        s.state === "done" ? "h-[19px] w-[19px]" : s.state === "next" ? "h-[17px] w-[17px]" : "h-[13px] w-[13px]"
                      }`}
                    >
                      {s.state === "done" && <Check size={12} className="text-white" strokeWidth={4} />}
                    </span>
                  </span>

                  <span className="flex min-w-0 flex-wrap items-center gap-x-3">
                    <span
                      className={`min-w-0 flex-1 text-[13.5px] leading-snug ${
                        s.state === "next" || s.state === "done"
                          ? "font-extrabold text-[#123A25]"
                          : "font-semibold text-[#254735]"
                      }`}
                    >
                      {s.name}
                    </span>
                    <span className="w-[54px] shrink-0 text-[12.5px] font-semibold text-[#6B7C74] tnum">
                      {s.time}
                    </span>
                    <span className="w-[74px] shrink-0 text-right text-[11.5px] font-extrabold">
                      {s.state === "done" ? (
                        <span className="text-[#1B8A4A]">{s.status}</span>
                      ) : s.state === "next" ? (
                        <span className="rounded-full bg-[#E4F3E9] px-2 py-1 text-[#0F6B37]">
                          {s.status}
                        </span>
                      ) : (
                        <span className="text-[#9AA8A1]">
                          <ArrowRight size={14} className="ml-auto" />
                        </span>
                      )}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
