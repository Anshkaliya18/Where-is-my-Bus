import { useCallback, useRef, useState } from "react";
import Home from "./screens/Home";
import Results from "./screens/Results";
import Live from "./screens/Live";
import { BottomNav, Toast } from "./components/Chrome";

type Screen = "home" | "results" | "live";

const ORIGIN = { code: "ISBT", name: "Delhi (ISBT Kashmiri Gate)" };
const DEST = { code: "DZN", name: "Dahina (Zainabad)" };

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [tab, setTab] = useState("home");
  const [from, setFrom] = useState(ORIGIN);
  const [to, setTo] = useState(DEST);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToastMsg(null), 2200);
  }, []);

  const go = (next: Screen) => {
    setScreen(next);
    if (next === "home") setTab("home");
    if (next === "live") setTab("map");
  };

  const onTab = (key: string) => {
    if (key === "home") return go("home");
    if (key === "map") return go("live");
    toast(
      key === "tickets"
        ? "No booked tickets yet — pick a bus first"
        : "Profile is not part of this prototype",
    );
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-[#0B130F] sm:py-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_46%_at_50%_38%,rgba(27,138,74,0.22),transparent_70%)]"
      />

      <div className="relative h-[100dvh] w-full max-w-[430px] overflow-hidden bg-[#F2F6F3] sm:h-[min(884px,86vh)] sm:rounded-[44px] sm:ring-[9px] sm:ring-[#151D19] sm:shadow-[0_40px_90px_rgba(0,0,0,0.55)]">
        <div className="relative h-full overflow-hidden">
          {screen === "home" && (
            <Home
              onFind={() => go("results")}
              onRecent={() => go("results")}
              from={from}
              to={to}
              onSwap={() => {
                setFrom(to);
                setTo(from);
                toast("Origin and destination swapped");
              }}
              onClear={(which) =>
                which === "from"
                  ? toast("Pick a new boarding point")
                  : toast("Pick a new drop point")
              }
            />
          )}

          {screen === "results" && (
            <Results onBack={() => go("home")} onTrack={() => go("live")} toast={toast} />
          )}

          {screen === "live" && <Live onBack={() => go("results")} toast={toast} />}

          {screen === "home" && <BottomNav tab={tab} onTab={onTab} />}
          <Toast msg={toastMsg} />
        </div>
      </div>

      <p className="relative hidden text-[12.5px] font-semibold tracking-[0.06em] text-white/45 sm:block">
        WHERE IS MY BUS · Home → Find Buses → Live tracking
      </p>
    </div>
  );
}
