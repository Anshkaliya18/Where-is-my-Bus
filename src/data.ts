export type Bus = {
  id: string;
  operator: string;
  code: string;
  dep: string;
  arr: string;
  dur: string;
  chips: [string, string, string];
  price: number;
  tint: string;
  glyph: string;
};

export const BUSES: Bus[] = [
  {
    id: "upsrtc-544",
    operator: "UPSRTC",
    code: "544",
    dep: "05:30 AM",
    arr: "08:50 AM",
    dur: "3hr 20min",
    chips: ["Ordinary", "Non AC", "52 Seats"],
    price: 250,
    tint: "#E7F6EC",
    glyph: "#1B8A4A",
  },
  {
    id: "hr-721a",
    operator: "Haryana Roadways",
    code: "721A",
    dep: "06:15 AM",
    arr: "09:25 AM",
    dur: "3hr 10min",
    chips: ["Express", "AC", "40 Seats"],
    price: 420,
    tint: "#E4EEFB",
    glyph: "#2C6FD1",
  },
  {
    id: "rj-312",
    operator: "Rajasthan RTC",
    code: "312",
    dep: "07:00 AM",
    arr: "10:45 AM",
    dur: "3hr 45min",
    chips: ["Ordinary", "Non AC", "50 Seats"],
    price: 280,
    tint: "#FDF0DC",
    glyph: "#D98324",
  },
  {
    id: "pz-dz01",
    operator: "Private Travels",
    code: "DZ01",
    dep: "08:30 AM",
    arr: "11:45 AM",
    dur: "3hr 15min",
    chips: ["Volvo", "AC", "36 Seats"],
    price: 650,
    tint: "#F1EAFB",
    glyph: "#7C4DD1",
  },
  {
    id: "hr-905",
    operator: "Haryana Roadways",
    code: "905",
    dep: "11:00 AM",
    arr: "02:20 PM",
    dur: "3hr 20min",
    chips: ["Ordinary", "Non AC", "50 Seats"],
    price: 260,
    tint: "#E7F6EC",
    glyph: "#1B8A4A",
  },
];

export const RECENTS = [
  { no: "411", title: "ISBT Delhi - Dahina", codes: "ISBT → DZN" },
  { no: "513", title: "Anand Vihar - Zainabad", codes: "ANV → DZN" },
  { no: "724", title: "Delhi (ISBT) - Hapur", codes: "ISBT → HAP" },
  { no: "905", title: "Noida Sec-62 - Dahina", codes: "ND → DZN" },
];

export const STOPS = [
  {
    name: "ISBT Delhi (Kashmiri Gate)",
    time: "05:30 AM",
    dist: "",
    state: "done" as const,
    status: "Departed",
  },
  { name: "Alipur", time: "06:05 AM", dist: "32 km", state: "passed" as const, status: "" },
  { name: "Murthal", time: "10:42 AM", dist: "12 km", state: "next" as const, status: "Next Stop" },
  { name: "Sonipat", time: "10:58 AM", dist: "28 km", state: "todo" as const, status: "" },
  { name: "Rai Industrial Area", time: "11:14 AM", dist: "18 km", state: "todo" as const, status: "" },
  { name: "Dahina (Zainabad)", time: "11:35 AM", dist: "9 km", state: "todo" as const, status: "" },
];

/* deterministic seat map: 8 rows x 4 seats (2 + aisle + 2) */
const OCCUPIED = new Set([1, 4, 6, 7, 11, 14, 17, 18, 22, 25, 29]);
export const SEATS: { n: number; taken: boolean }[] = Array.from({ length: 32 }, (_, i) => ({
  n: i + 1,
  taken: OCCUPIED.has(i + 1),
}));
