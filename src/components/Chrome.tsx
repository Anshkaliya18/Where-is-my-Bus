import { useState } from "react";
import {
  ArrowRight,
  Bell,
  Bus,
  Check,
  Home,
  Map,
  Ticket,
  User,
  X,
} from "lucide-react";
import type { Bus as BusType } from "../data";
import { SEATS } from "../data";

const TABS = [
  { key: "home", label: "Home", Icon: Home },
  { key: "map", label: "Live Map", Icon: Map },
  { key: "tickets", label: "Tickets", Icon: Ticket },
  { key: "profile", label: "Profile", Icon: User },
] as const;

export function BottomNav({
  tab,
  onTab,
}: {
  tab: string;
  onTab: (k: string) => void;
}) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-30 border-t border-[#E7EDE9] bg-white/95 px-3 pt-2 pb-[max(10px,env(safe-area-inset-bottom))] backdrop-blur-md">
      <ul className="grid grid-cols-4">
        {TABS.map(({ key, label, Icon }) => {
          const active = tab === key;
          return (
            <li key={key} className="flex justify-center">
              <button
                onClick={() => onTab(key)}
                aria-current={active ? "page" : undefined}
                className={`press flex flex-col items-center gap-1 rounded-2xl px-4 py-1.5 ${
                  active ? "bg-[#E4F3E9]" : "hover:bg-[#F2F6F3]"
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.6 : 2}
                  className={active ? "text-[#0F6B37]" : "text-[#7B8B83]"}
                />
                <span
                  className={`text-[12px] leading-none ${
                    active ? "font-extrabold text-[#0F6B37]" : "font-semibold text-[#7B8B83]"
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Toast({ msg }: { msg: string | null }) {
  if (!msg) return null;
  return (
    <div className="anim-fade pointer-events-none absolute inset-x-0 bottom-[96px] z-50 flex justify-center px-6">
      <div className="flex items-center gap-2 rounded-full bg-[#0F2A1C] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_rgba(6,26,16,0.35)]">
        <Check size={15} className="text-[#7BE0A4]" />
        {msg}
      </div>
    </div>
  );
}

export function SeatSheet({
  bus,
  onClose,
  onConfirm,
}: {
  bus: BusType;
  onClose: () => void;
  onConfirm: (count: number) => void;
}) {
  const [picked, setPicked] = useState<number[]>([]);
  const rows = 8;

  const toggle = (n: number, taken: boolean) => {
    if (taken) return;
    setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : p.length >= 4 ? p : [...p, n]));
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <button
        aria-label="Close seat selection"
        onClick={onClose}
        className="anim-fade absolute inset-0 bg-[#07170F]/50"
      />
      <div className="anim-sheet relative rounded-t-[26px] bg-white pb-[max(14px,env(safe-area-inset-bottom))] shadow-[0_-16px_40px_rgba(8,30,18,0.25)]">
        <div className="flex items-start gap-3 border-b border-[#EDF1EE] px-4 pt-4 pb-3">
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
            style={{ background: bus.tint }}
          >
            <Bus size={22} style={{ color: bus.glyph }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[16px] font-extrabold text-[#0F2A1C]">
              {bus.operator}{" "}
              <span className="ml-1 rounded-md bg-[#E8F5EC] px-1.5 py-0.5 text-[11px] font-bold text-[#0F6B37] tnum">
                {bus.code}
              </span>
            </p>
            <p className="text-[12.5px] font-medium text-[#6B7C74]">
              {bus.dep} → {bus.arr} · Today, 12 Sep
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" className="press -mr-1 p-1 text-[#7B8B83]">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[46vh] overflow-y-auto px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex gap-3 text-[11.5px] font-semibold text-[#6B7C74]">
              <span className="flex items-center gap-1.5">
                <i className="h-3 w-3 rounded-[3px] border border-[#C9D3CD] bg-white" /> Available
              </span>
              <span className="flex items-center gap-1.5">
                <i className="h-3 w-3 rounded-[3px] bg-[#0F6B37]" /> Selected
              </span>
              <span className="flex items-center gap-1.5">
                <i className="h-3 w-3 rounded-[3px] bg-[#DDE3DF]" /> Taken
              </span>
            </div>
            <span className="text-[11.5px] font-bold text-[#0F6B37]">
              {32 - OCCUPANCY} seats left
            </span>
          </div>

          <div className="rounded-2xl border border-[#EDF1EE] bg-[#FAFCFB] p-3">
            <div className="mb-2 flex justify-between px-1 text-[10.5px] font-bold tracking-[0.14em] text-[#9AA8A1]">
              <span>FRONT</span>
              <span>DRIVER</span>
            </div>
            {Array.from({ length: rows }).map((_, r) => (
              <div key={r} className="mb-1.5 flex items-center justify-center gap-2 last:mb-0">
                {[0, 1].map((c) => {
                  const seat = SEATS[r * 2 + c];
                  return <Seat key={c} seat={seat} picked={picked} toggle={toggle} />;
                })}
                <span className="h-7 w-4" />
                {[0, 1].map((c) => {
                  const seat = SEATS[r * 2 + c + 2];
                  return <Seat key={c} seat={seat} picked={picked} toggle={toggle} />;
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-[#EDF1EE] px-4 pt-3">
          <div className="min-w-0">
            <p className="text-[11.5px] font-semibold text-[#6B7C74]">
              {picked.length ? `Seat ${picked.slice(0, 2).join(", ")}${picked.length > 2 ? "…" : ""}` : "Select up to 4 seats"}
            </p>
            <p className="text-[19px] font-extrabold leading-tight text-[#0F2A1C] tnum">
              ₹{bus.price * Math.max(picked.length, 1)}
            </p>
          </div>
          <button
            disabled={picked.length === 0}
            onClick={() => onConfirm(picked.length)}
            className="press ml-auto flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F6B37] to-[#1B8A4A] text-[15px] font-bold text-white disabled:from-[#CBD5CF] disabled:to-[#D9E1DC] disabled:text-[#8B9992]"
          >
            {picked.length ? "Continue" : "Pick a seat"} <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

const OCCUPANCY = 11;

function Seat({
  seat,
  picked,
  toggle,
}: {
  seat: { n: number; taken: boolean };
  picked: number[];
  toggle: (n: number, taken: boolean) => void;
}) {
  const isPicked = picked.includes(seat.n);
  return (
    <button
      onClick={() => toggle(seat.n, seat.taken)}
      disabled={seat.taken}
      aria-label={`Seat ${seat.n}${seat.taken ? " taken" : ""}`}
      className={`press h-8 w-8 rounded-[7px] text-[11px] font-bold tnum ${
        seat.taken
          ? "cursor-not-allowed bg-[#DDE3DF] text-[#98A49E] line-through"
          : isPicked
            ? "bg-[#0F6B37] text-white shadow-[0_4px_10px_rgba(15,107,55,0.3)]"
            : "border border-[#C9D3CD] bg-white text-[#42564C] hover:border-[#0F6B37]"
      }`}
    >
      {seat.n}
    </button>
  );
}

export function BellBadge() {
  return (
    <span className="relative">
      <Bell size={24} className="text-[#0F2A1C]" />
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#1B8A4A] ring-2 ring-white" />
    </span>
  );
}
