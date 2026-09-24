import { useCallback, useRef, useState } from "react";
import Home from "./screens/Home";
import Results from "./screens/Results";
import Live from "./screens/Live";
import { Toast } from "./components/Chrome";
import { BUSES, type Bus } from "./data";

type Screen = "home" | "results" | "live";

const ORIGIN = { code: "ISBT", name: "Delhi (ISBT Kashmiri Gate)" };
const DEST = { code: "DZN", name: "Dahina (Zainabad)" };

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [from, setFrom] = useState(ORIGIN);
  const [to, setTo] = useState(DEST);
  const [selectedBus, setSelectedBus] = useState<Bus>(BUSES[1]); // default to Haryana Roadways 721A
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToastMsg(null), 2200);
  }, []);

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
              onFind={() => setScreen("results")}
              onRecent={() => setScreen("results")}
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
            <Results
              onBack={() => setScreen("home")}
              onTrack={(b) => {
                setSelectedBus(b);
                setScreen("live");
              }}
              toast={toast}
            />
          )}

          {screen === "live" && (
            <Live bus={selectedBus} onBack={() => setScreen("results")} toast={toast} />
          )}

          <Toast msg={toastMsg} />
        </div>
      </div>

      <p className="relative hidden text-[12.5px] font-semibold tracking-[0.06em] text-white/45 sm:block">
        WHERE IS MY BUS · Home → Find Buses → Live tracking
      </p>
    </div>
  );
}
