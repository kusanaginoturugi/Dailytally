const fellowshipNames = ["大江戸", "お台場", "羽田", "かながわ", "富士山", "駿天", "埼玉", "千葉", "山梨"];
const CEREMONY_CONFIGS = [
  {
    id: "hachidai-myo-o",
    name: "八大明王護摩供",
    nextNumber: 31,
    seekerStart: "2026-04-28",
    items: [
      { key: "seekers", label: "得道者数", summaryLabel: "得道者数", unit: "人" },
      { key: "tenchi", label: "天地免劫護摩木", summaryLabel: "この護摩供に向けての天地免劫護摩木", unit: "本" },
      { key: "goma", label: "各種護摩木", summaryLabel: "この護摩供に向けての各種護摩木", unit: "本" },
      { key: "nyoi", label: "如意棒", summaryLabel: "八大明王如意棒", unit: "本" },
      { key: "sanki", label: "三期滅劫霊木", summaryLabel: "三期滅劫之霊木", unit: "本" },
      { key: "ryuge", label: "三會龍華之御柱", summaryLabel: "三會龍華之御柱", unit: "本" },
      { key: "fuda", label: "八大明王札", summaryLabel: "八大明王札", unit: "体" },
      { key: "zaitama", label: "明王招財玉", summaryLabel: "明王招財玉", unit: "組" },
      { key: "symbols", label: "各種符", summaryLabel: "各種符", unit: "枚" },
      { key: "water", label: "御神水・泉・龍華水等", summaryLabel: "御神水・泉・龍華水等", unit: "箱" },
    ],
  },
  {
    id: "daigen-chiku",
    name: "大元地空護摩供",
    nextNumber: 25,
    seekerStart: "",
    items: [
      { key: "seekers", label: "得道者数", summaryLabel: "得道者数", unit: "人" },
      { key: "tenchi", label: "天地免劫護摩木", summaryLabel: "この護摩供に向けての天地免劫護摩木", unit: "本" },
      { key: "goma", label: "各種護摩木", summaryLabel: "この護摩供に向けての各種護摩木", unit: "本" },
      { key: "sanki_proxy", label: "三期滅劫之霊木代理奉納", summaryLabel: "三期滅劫之霊木代理奉納", unit: "本" },
      { key: "ryuge_proxy", label: "三會龍華之御柱代理奉納", summaryLabel: "三會龍華之御柱代理奉納", unit: "本" },
      { key: "senju", label: "千手の御手", summaryLabel: "千手の御手", unit: "枚" },
      { key: "daigen_fuda", label: "大元地空札", summaryLabel: "大元地空札", unit: "体" },
      { key: "symbols", label: "各種符", summaryLabel: "各種符", unit: "枚" },
      { key: "water", label: "御神水他・龍華水", summaryLabel: "御神水他・龍華水", unit: "箱" },
    ],
  },
  {
    id: "jizo-sonno",
    name: "地蔵尊王護摩供",
    nextNumber: 30,
    seekerStart: "",
    items: [
      { key: "seekers", label: "得道者数", summaryLabel: "得道者数", unit: "人" },
      { key: "tenchi", label: "天地免劫護摩木", summaryLabel: "この護摩供に向けての天地免劫護摩木", unit: "本" },
      { key: "goma", label: "各種護摩木", summaryLabel: "この護摩供に向けての各種護摩木", unit: "本" },
      { key: "sanki", label: "三期滅劫之霊木", summaryLabel: "三期滅劫之霊木", unit: "本" },
      { key: "ryuge", label: "三會龍華之御柱", summaryLabel: "三會龍華之御柱", unit: "本" },
      { key: "mizuko", label: "水子萬灯會", summaryLabel: "水子萬灯會", unit: "本" },
      { key: "jizo_fuda", label: "地蔵古佛札", summaryLabel: "地蔵古佛札", unit: "体" },
      { key: "mayudama", label: "まゆ玉", summaryLabel: "まゆ玉", unit: "個" },
      { key: "symbols", label: "各種符", summaryLabel: "各種符", unit: "枚" },
      { key: "water", label: "御神水・命泉・泉・龍華水", summaryLabel: "御神水・命泉・泉・龍華水", unit: "箱" },
    ],
  },
  {
    id: "segaki-kuyo",
    name: "施餓鬼供養護摩供",
    nextNumber: 31,
    seekerStart: "",
    items: [
      { key: "seekers", label: "得道者数", summaryLabel: "得道者数", unit: "人" },
      { key: "tenchi", label: "天地免劫護摩木", summaryLabel: "この護摩供に向けての天地免劫護摩木", unit: "本" },
      { key: "goma", label: "各種護摩木", summaryLabel: "この護摩供に向けての各種護摩木", unit: "本" },
      { key: "hokuto_segaki", label: "北斗施餓鬼供養護摩木代理奉納", summaryLabel: "北斗施餓鬼供養護摩木代理奉納", unit: "本" },
      { key: "sanki_proxy", label: "三期滅劫之霊木代理奉納", summaryLabel: "三期滅劫之霊木代理奉納", unit: "本" },
      { key: "ryuge_proxy", label: "三會龍華之御柱代理奉納", summaryLabel: "三會龍華之御柱代理奉納", unit: "本" },
      { key: "segaki_ita", label: "施餓鬼板", summaryLabel: "施餓鬼板", unit: "枚" },
      { key: "symbols", label: "各種符", summaryLabel: "各種符", unit: "枚" },
      { key: "water", label: "御神水・命泉・泉・龍華水", summaryLabel: "御神水・命泉・泉・龍華水", unit: "箱" },
    ],
  },
  {
    id: "hokuto-chinatsu",
    name: "北斗鎮圧護摩供",
    nextNumber: 30,
    seekerStart: "",
    items: [
      { key: "seekers", label: "得道者数", summaryLabel: "得道者数", unit: "人" },
      { key: "tenchi", label: "天地免劫護摩木", summaryLabel: "この護摩供に向けての天地免劫護摩木", unit: "本" },
      { key: "goma", label: "各種護摩木", summaryLabel: "この護摩供に向けての各種護摩木", unit: "本" },
      { key: "sanki_proxy", label: "三期滅劫之霊木代理奉納", summaryLabel: "三期滅劫之霊木代理奉納", unit: "本" },
      { key: "ryuge_proxy", label: "三會龍華之御柱代理奉納", summaryLabel: "三會龍華之御柱代理奉納", unit: "本" },
      { key: "inau", label: "イナウ・なで玄武・北斗鎮圧札", summaryLabel: "イナウ・なで玄武・北斗鎮圧札", unit: "ケ" },
      { key: "symbols", label: "各種符", summaryLabel: "各種符", unit: "枚" },
      { key: "water", label: "御神水・命泉・泉・龍華水", summaryLabel: "御神水・命泉・泉・龍華水", unit: "箱" },
    ],
  },
  {
    id: "rokuson-hoju",
    name: "禄存宝珠護摩供",
    nextNumber: 41,
    seekerStart: "",
    items: [
      { key: "seekers", label: "得道者数", summaryLabel: "得道者数", unit: "人" },
      { key: "tenchi", label: "天地免劫護摩木", summaryLabel: "この護摩供に向けての天地免劫護摩木", unit: "本" },
      { key: "goma", label: "各種護摩木", summaryLabel: "この護摩供に向けての各種護摩木", unit: "本" },
      { key: "sanki_proxy", label: "三期滅劫之霊木代理奉納", summaryLabel: "三期滅劫之霊木代理奉納", unit: "本" },
      { key: "ryuge_proxy", label: "三會龍華之御柱代理奉納", summaryLabel: "三會龍華之御柱代理奉納", unit: "本" },
      { key: "senju", label: "千手の御手", summaryLabel: "千手の御手", unit: "枚" },
      { key: "junishinsho", label: "十二神将板・龍樹滅業棒", summaryLabel: "十二神将板・龍樹滅業棒", unit: "本" },
      { key: "symbols", label: "各種符", summaryLabel: "各種符", unit: "枚" },
      { key: "water", label: "御神水・命泉・泉・龍華水・禄存五聖杯", summaryLabel: "御神水・命泉・泉・龍華水・禄存五聖杯", unit: "箱" },
    ],
  },
  {
    id: "chosei-minami",
    name: "長生南十字星護摩供",
    nextNumber: 30,
    seekerStart: "",
    items: [
      { key: "seekers", label: "得道者数", summaryLabel: "得道者数", unit: "人" },
      { key: "tenchi", label: "天地免劫護摩木", summaryLabel: "この護摩供に向けての天地免劫護摩木", unit: "本" },
      { key: "goma", label: "各種護摩木", summaryLabel: "この護摩供に向けての各種護摩木", unit: "本" },
      { key: "sanki_proxy", label: "三期滅劫之霊木代理奉納", summaryLabel: "三期滅劫之霊木代理奉納", unit: "本" },
      { key: "ryuge_proxy", label: "三會龍華之御柱代理奉納", summaryLabel: "三會龍華之御柱代理奉納", unit: "本" },
      { key: "shisho", label: "四生解消十字", summaryLabel: "四生解消十字", unit: "枚" },
      { key: "nankyoku", label: "南極寿星札", summaryLabel: "南極寿星札", unit: "枚" },
      { key: "symbols", label: "各種符", summaryLabel: "各種符", unit: "枚" },
      { key: "water", label: "御神水他・龍華水", summaryLabel: "御神水他・龍華水", unit: "箱" },
    ],
  },
  {
    id: "myozen-enma",
    name: "妙善閻魔天王護摩供",
    nextNumber: 24,
    seekerStart: "",
    items: [
      { key: "seekers", label: "得道者数", summaryLabel: "得道者数", unit: "人" },
      { key: "tenchi", label: "天地免劫護摩木", summaryLabel: "この護摩供に向けての天地免劫護摩木", unit: "本" },
      { key: "goma", label: "各種護摩木", summaryLabel: "この護摩供に向けての各種護摩木", unit: "本" },
      { key: "jigoku", label: "地獄曼荼羅會代理奉納", summaryLabel: "地獄曼荼羅會代理奉納", unit: "本" },
      { key: "kokujyo", label: "黒縄供養紐・水子萬灯會代理奉納", summaryLabel: "黒縄供養紐・水子萬灯會代理奉納", unit: "本" },
      { key: "sanki_proxy", label: "三期滅劫之霊木代理奉納", summaryLabel: "三期滅劫之霊木代理奉納", unit: "本" },
      { key: "ryuge_proxy", label: "三會龍華之御柱代理奉納", summaryLabel: "三會龍華之御柱代理奉納", unit: "本" },
      { key: "kagami", label: "鏡符・五雷懺悔鏡代理奉納", summaryLabel: "鏡符・五雷懺悔鏡代理奉納", unit: "枚" },
      { key: "myozen_fuda", label: "妙善閻魔天王札", summaryLabel: "妙善閻魔天王札", unit: "体" },
      { key: "symbols", label: "各種符", summaryLabel: "各種符", unit: "枚" },
      { key: "water", label: "御神水・命泉・泉・龍華水等", summaryLabel: "御神水・命泉・泉・龍華水等", unit: "箱" },
    ],
  },
  {
    id: "chinkon-shikai",
    name: "鎮魂四海龍王護摩供",
    nextNumber: 30,
    seekerStart: "",
    items: [
      { key: "seekers", label: "得道者数", summaryLabel: "得道者数", unit: "人" },
      { key: "tenchi", label: "天地免劫護摩木", summaryLabel: "この護摩供に向けての天地免劫護摩木", unit: "本" },
      { key: "goma", label: "各種護摩木", summaryLabel: "この護摩供に向けての各種護摩木(媽祖救航灯代理奉納を除く)", unit: "本" },
      { key: "maso", label: "媽祖救航灯代理奉納", summaryLabel: "媽祖救航灯代理奉納", unit: "本" },
      { key: "zenigata", label: "銭型代理奉納", summaryLabel: "銭型代理奉納", unit: "組" },
      { key: "ryuge_proxy", label: "三會龍華之御柱代理奉納", summaryLabel: "三會龍華之御柱代理奉納", unit: "本" },
      { key: "shikai_fuda", label: "四海龍王札", summaryLabel: "四海龍王札", unit: "枚" },
      { key: "symbols", label: "各種符", summaryLabel: "各種符", unit: "枚" },
      { key: "water", label: "御神水・命泉・泉・龍華水", summaryLabel: "御神水・命泉・泉・龍華水", unit: "箱" },
    ],
  },
];
const DEFAULT_CEREMONY_ID = CEREMONY_CONFIGS[0].id;
const ITEMS = Array.from(new Map(CEREMONY_CONFIGS.flatMap((ceremony) => ceremony.items).map((item) => [item.key, item])).values());
const MIN_ITEM_COUNT = 1;
const MAX_ITEM_COUNT = ITEMS.length;

const STORAGE_KEY = "daily-tally-v2";
const LEGACY_STORAGE_KEYS = ["daily-tally-v1"];
const ACTIVE_TAB_KEY = "daily-tally-active-tab";
const API_STATE_URL = "/api/state";
const API_ME_URL = "/api/me";
const REFRESH_INTERVAL_MS = 15000;
const SETTINGS_SCHEMA_VERSION = 2;
const FINAL_ROW_ID = "__final__";
const DEFAULT_REPORT_BRANCH_CODE = "99300";
const CEREMONY_DATE_PRESETS = {
  "jizo-sonno": { endMonth: 6, endDay: 20 },
  "segaki-kuyo": { endMonth: 8, endDay: 9 },
  "hokuto-chinatsu": { endMonth: 9, endDay: 13 },
  "rokuson-hoju": { endMonth: 10, endDay: 11 },
  "chosei-minami": { endMonth: 11, endDay: 8 },
  "myozen-enma": { endMonth: 11, endDay: 23 },
};

const appTitle = document.getElementById("appTitle");
const userStatus = document.getElementById("userStatus");
const tabButtons = document.getElementById("tabButtons");
const pageContainer = document.getElementById("pageContainer");

let state = createDefaultState();
let activeTab = "admin";
let currentUser = null;

init();

function redirectToLogin() {
  const rd = `${window.location.pathname}${window.location.search}`;
  window.location.href = `/auth/login?rd=${encodeURIComponent(rd)}`;
}

async function apiFetch(url, options = {}) {
  const response = await fetch(url, { ...options, redirect: "manual" });
  if (response.type === "opaqueredirect" || (response.status >= 300 && response.status < 400)) {
    redirectToLogin();
    throw new Error("Authentication required");
  }
  if (response.headers.get("content-type")?.includes("text/html")) {
    redirectToLogin();
    throw new Error("Authentication required");
  }
  return response;
}

async function init() {
  [state, currentUser] = await Promise.all([loadState(), loadCurrentUser()]);
  activeTab = getSavedActiveTab();

  setInterval(refreshStateFromDatabase, REFRESH_INTERVAL_MS);
  render();
}

async function loadCurrentUser() {
  if (window.DAILY_TALLY_USER) {
    return normalizeCurrentUser(window.DAILY_TALLY_USER);
  }

  try {
    const response = await apiFetch(API_ME_URL);
    if (!response.ok) {
      throw new Error(`User API returned ${response.status}`);
    }
    return normalizeCurrentUser(await response.json());
  } catch (error) {
    console.error("ログインユーザー情報を読み込めませんでした。", error);
    return null;
  }
}

function normalizeCurrentUser(user) {
  const normalized = { ...createEmptyUser(), ...(user || {}) };
  return Object.values(normalized).some((value) => String(value || "").trim() !== "") ? normalized : null;
}

function getCurrentUserLabel() {
  if (!hasAuthenticatedUser()) {
    return "未ログイン";
  }

  const username = currentUser.loginId || currentUser.email || currentUser.name || "ユーザー";
  const fellowship = currentUser.fellowship || "伝道会未設定";
  const role = currentUser.role === "admin" ? " / 権限: 管理者" : "";
  return `ユーザー: ${username} / 伝道会: ${fellowship}${role}`;
}

function getSavedActiveTab() {
  const requestedTab = new URLSearchParams(window.location.search).get("tab");
  if (isKnownTab(requestedTab)) {
    return requestedTab;
  }

  const savedTab = localStorage.getItem(ACTIVE_TAB_KEY);
  if (isKnownTab(savedTab)) {
    return savedTab;
  }
  return canAccessAdmin() ? "admin" : (currentUser?.fellowship || fellowshipNames[0]);
}

function isKnownTab(tabName) {
  if (tabName === "admin") {
    return canAccessAdmin();
  }
  return tabName === "summary" || fellowshipNames.includes(tabName);
}

function hasAuthenticatedUser() {
  return Boolean(
    currentUser &&
      ["loginId", "fellowship", "name", "email", "role"].some((key) => String(currentUser[key] || "").trim() !== ""),
  );
}

function canAccessAdmin() {
  // SSO未連携の場合は、便宜上管理者として扱う（移行期間用）
  if (!hasAuthenticatedUser()) {
    return true;
  }
  return currentUser.role === "admin";
}

function toISODate(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function parseISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function addDaysISO(iso, days) {
  const date = parseISODate(iso);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

function todayISOJST() {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function currentYearJST() {
  return Number(todayISOJST().slice(0, 4));
}

function getWeekDates() {
  const ceremonyData = getActiveCeremonyData();
  if (!ceremonyData.weekStart || !ceremonyData.weekEnd) {
    return [];
  }

  const start = parseISODate(ceremonyData.weekStart);
  const end = parseISODate(ceremonyData.weekEnd);
  const dates = [];
  const current = new Date(start);
  const maxDays = 366;

  while (current < end && dates.length < maxDays) {
    const date = new Date(start);
    date.setDate(start.getDate() + dates.length);
    const label = `${date.getMonth() + 1}/${date.getDate()}`;
    dates.push({ id: toISODate(date), label });
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function formatShortDate(iso) {
  if (!iso) {
    return "";
  }
  const date = parseISODate(iso);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function isValidISODate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) {
    return false;
  }
  const date = parseISODate(value);
  return !Number.isNaN(date.getTime()) && toISODate(date) === value;
}

function parseAdminDateInput(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) {
    return "";
  }

  const normalized = trimmed.replace(/[.／]/g, "/").replace(/-/g, "/");
  const fullDate = normalized.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  const shortDate = normalized.match(/^(\d{1,2})\/(\d{1,2})$/);
  const year = fullDate ? Number(fullDate[1]) : currentYearJST();
  const month = Number(fullDate ? fullDate[2] : shortDate?.[1]);
  const day = Number(fullDate ? fullDate[3] : shortDate?.[2]);

  if (!month || !day) {
    return "";
  }

  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return "";
  }

  return toISODate(date);
}

function getCeremonyDatePreset(ceremonyId) {
  const preset = CEREMONY_DATE_PRESETS[ceremonyId];
  if (!preset) {
    return null;
  }

  const year = currentYearJST();
  const weekEnd = toISODate(new Date(year, preset.endMonth - 1, preset.endDay));
  return {
    key: `${year}-${ceremonyId}-${preset.endMonth}-${preset.endDay}`,
    weekStart: addDaysISO(weekEnd, -7),
    weekEnd,
  };
}

function ensureCeremonyDates(ceremonyData, ceremonyId = getActiveCeremonyConfig().id) {
  const today = todayISOJST();
  const currentYear = currentYearJST();
  const preset = getCeremonyDatePreset(ceremonyId);

  if (
    preset &&
    ceremonyData.datePresetKey !== `custom:${preset.key}` &&
    (ceremonyData.datePresetKey !== preset.key || ceremonyData.weekStart !== preset.weekStart || ceremonyData.weekEnd !== preset.weekEnd)
  ) {
    ceremonyData.weekStart = preset.weekStart;
    ceremonyData.weekEnd = preset.weekEnd;
    ceremonyData.datePresetKey = preset.key;
    return;
  }

  if (!isValidISODate(ceremonyData.weekStart) || parseISODate(ceremonyData.weekStart).getFullYear() < currentYear) {
    ceremonyData.weekStart = today;
  }

  if (!isValidISODate(ceremonyData.weekEnd) || parseISODate(ceremonyData.weekEnd).getFullYear() < currentYear) {
    ceremonyData.weekEnd = addDaysISO(ceremonyData.weekStart, 7);
  }

  if (ceremonyData.weekEnd < ceremonyData.weekStart) {
    ceremonyData.weekEnd = addDaysISO(ceremonyData.weekStart, 7);
  }
}

function getCeremonyNumber() {
  return getActiveCeremonyConfig().nextNumber;
}

function getActiveItems() {
  return getActiveCeremonyConfig().items;
}

function getActiveCeremonyConfig() {
  return CEREMONY_CONFIGS.find((ceremony) => ceremony.id === state.settings.ceremonyId) || CEREMONY_CONFIGS[0];
}

function getCeremonyConfig(ceremonyId) {
  return CEREMONY_CONFIGS.find((ceremony) => ceremony.id === ceremonyId) || CEREMONY_CONFIGS[0];
}

function createEmptyCeremonyData(ceremonyConfig = getActiveCeremonyConfig()) {
  const today = todayISOJST();
  const data = {
    weekStart: today,
    weekEnd: addDaysISO(today, 7),
    seekerStart: ceremonyConfig.seekerStart || "",
    fellowships: Object.fromEntries(fellowshipNames.map((name) => [name, {}])),
    targets: createEmptyTargets(),
    summaryTargetOverrides: {},
    fellowshipTargets: createEmptyFellowshipTargets(),
  };
  ensureCeremonyDates(data, ceremonyConfig.id);
  return data;
}

function getActiveCeremonyData() {
  if (!state.ceremonyData) {
    state.ceremonyData = {};
  }
  const ceremonyId = getActiveCeremonyConfig().id;
  if (!state.ceremonyData[ceremonyId]) {
    state.ceremonyData[ceremonyId] = createEmptyCeremonyData(getActiveCeremonyConfig());
  }
  return state.ceremonyData[ceremonyId];
}

function createEmptyDay() {
  return Object.fromEntries(ITEMS.map((item) => [item.key, 0]));
}

function createEmptyTargets() {
  return Object.fromEntries(ITEMS.map((item) => [item.key, 0]));
}

function createEmptyFellowshipTargets() {
  return Object.fromEntries(fellowshipNames.map((name) => [name, createEmptyTargets()]));
}

function createEmptyUser() {
  return {
    loginId: "",
    fellowship: "",
    name: "",
    email: "",
    role: "",
  };
}

function createDefaultReportAutomation() {
  return {
    enabled: false,
    sendTime: "22:00",
    senderName: "聖明王院事務局",
    branchName: "聖明王院",
    branchCode: DEFAULT_REPORT_BRANCH_CODE,
    notifyEmail: "jimmyouou@gmail.com",
    lastAttemptAt: "",
    lastAttemptKey: "",
    lastSuccessAt: "",
    lastError: "",
    lastSentKey: "",
    history: [],
  };
}

function createDefaultState() {
  return {
    settings: {
      weekStart: "",
      weekEnd: "",
      itemCount: 10,
      activeTab: "admin",
      seekerStart: "2026-04-28",
      ceremonyName: "八大明王護摩供",
      ceremonyId: DEFAULT_CEREMONY_ID,
      schemaVersion: SETTINGS_SCHEMA_VERSION,
    },
    fellowships: Object.fromEntries(fellowshipNames.map((name) => [name, {}])),
    targets: createEmptyTargets(),
    fellowshipTargets: createEmptyFellowshipTargets(),
    ceremonyData: {},
    users: [],
    reportAutomation: createDefaultReportAutomation(),
  };
}

function normalizeStateShape(targetState) {
  if (!targetState.settings) {
    const today = todayISOJST();
    targetState.settings = {
      weekStart: today,
      weekEnd: addDaysISO(today, 6),
      itemCount: 10,
      activeTab: "admin",
      seekerStart: "2026-04-28",
      ceremonyName: "八大明王護摩供",
      ceremonyId: DEFAULT_CEREMONY_ID,
      schemaVersion: SETTINGS_SCHEMA_VERSION,
    };
  }

  if (!CEREMONY_CONFIGS.some((ceremony) => ceremony.id === targetState.settings.ceremonyId)) {
    targetState.settings.ceremonyId = DEFAULT_CEREMONY_ID;
  }

  if (!targetState.settings.weekStart) {
    targetState.settings.weekStart = todayISOJST();
  }

  if (!targetState.settings.weekEnd) {
    targetState.settings.weekEnd = addDaysISO(targetState.settings.weekStart, 6);
  }

  if (targetState.settings.weekEnd < targetState.settings.weekStart) {
    targetState.settings.weekEnd = targetState.settings.weekStart;
  }

  if (!targetState.settings.seekerStart) {
    targetState.settings.seekerStart = "2026-04-28";
  }

  if (!targetState.settings.ceremonyName) {
    targetState.settings.ceremonyName = "八大明王護摩供";
  }

  targetState.settings.itemCount = normalizeItemCount(targetState.settings.itemCount, targetState.settings.schemaVersion);
  targetState.settings.schemaVersion = SETTINGS_SCHEMA_VERSION;
  targetState.settings.activeTab = "admin";
  targetState.users = Array.isArray(targetState.users)
    ? targetState.users.map((user) => ({ ...createEmptyUser(), ...user }))
    : [];
  targetState.reportAutomation = {
    ...createDefaultReportAutomation(),
    ...(targetState.reportAutomation || {}),
  };

  if (!targetState.ceremonyData) {
    targetState.ceremonyData = {
      [DEFAULT_CEREMONY_ID]: {
        weekStart: targetState.settings.weekStart,
        weekEnd: targetState.settings.weekEnd,
        seekerStart: targetState.settings.seekerStart,
        fellowships: targetState.fellowships || {},
        targets: targetState.targets || createEmptyTargets(),
        summaryTargetOverrides: targetState.summaryTargetOverrides || {},
        fellowshipTargets: targetState.fellowshipTargets || {},
      },
    };
  }

  if (!targetState.fellowships) {
    targetState.fellowships = {};
  }

  if (!targetState.targets) {
    targetState.targets = createEmptyTargets();
  }

  if (!targetState.fellowshipTargets) {
    targetState.fellowshipTargets = {};
  }

  Array.from({ length: fellowshipNames.length }, (_, i) => `伝道会${i + 1}`).forEach((oldName, index) => {
    const newName = fellowshipNames[index];
    if (targetState.fellowships[oldName] && !targetState.fellowships[newName]) {
      targetState.fellowships[newName] = targetState.fellowships[oldName];
    }
  });

  fellowshipNames.forEach((name) => {
    if (!targetState.fellowships[name]) {
      targetState.fellowships[name] = {};
    }
    if (!targetState.fellowshipTargets[name]) {
      targetState.fellowshipTargets[name] = { ...targetState.targets };
    }
    targetState.fellowshipTargets[name] = {
      ...createEmptyTargets(),
      ...targetState.fellowshipTargets[name],
    };
  });

  targetState.targets = {
    ...createEmptyTargets(),
    ...targetState.targets,
  };

  CEREMONY_CONFIGS.forEach((ceremony) => {
    if (!targetState.ceremonyData[ceremony.id]) {
      targetState.ceremonyData[ceremony.id] = createEmptyCeremonyData(ceremony);
    }

    const ceremonyData = targetState.ceremonyData[ceremony.id];
    ensureCeremonyDates(ceremonyData, ceremony.id);
    ceremonyData.seekerStart = ceremonyData.seekerStart ?? (ceremony.seekerStart || "");
    ceremonyData.fellowships = ceremonyData.fellowships || {};
    ceremonyData.targets = {
      ...createEmptyTargets(),
      ...(ceremonyData.targets || {}),
    };
    ceremonyData.summaryTargetOverrides = {
      ...(ceremonyData.summaryTargetOverrides || {}),
    };
    ceremonyData.fellowshipTargets = ceremonyData.fellowshipTargets || {};

    fellowshipNames.forEach((name) => {
      if (!ceremonyData.fellowships[name]) {
        ceremonyData.fellowships[name] = {};
      }
      if (!ceremonyData.fellowshipTargets[name]) {
        ceremonyData.fellowshipTargets[name] = { ...ceremonyData.targets };
      }
      ceremonyData.fellowshipTargets[name] = {
        ...createEmptyTargets(),
        ...ceremonyData.fellowshipTargets[name],
      };
    });
  });

  return targetState;
}

function ensureStateShape() {
  state = normalizeStateShape(state);
}

function normalizeItemCount(value, schemaVersion) {
  const itemCount = Number(value);
  if (!schemaVersion && itemCount === 9) {
    return 10;
  }
  if (!Number.isInteger(itemCount)) {
    return 10;
  }
  return Math.min(MAX_ITEM_COUNT, Math.max(MIN_ITEM_COUNT, itemCount));
}

function loadLocalState() {
  const migrateLegacyState = () => {
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEYS[0]);
    if (!legacyRaw) {
      return null;
    }
    try {
      const legacyParsed = JSON.parse(legacyRaw);
      const today = todayISOJST();
      const migrated = {
        settings: {
          weekStart: today,
          weekEnd: addDaysISO(today, 6),
          itemCount: 10,
          activeTab: "admin",
          seekerStart: "2026-04-28",
          ceremonyName: "八大明王護摩供",
          ceremonyId: DEFAULT_CEREMONY_ID,
          schemaVersion: SETTINGS_SCHEMA_VERSION,
        },
        fellowships: legacyParsed,
        targets: createEmptyTargets(),
        fellowshipTargets: createEmptyFellowshipTargets(),
        ceremonyData: {},
        users: [],
        reportAutomation: createDefaultReportAutomation(),
      };
      return migrated;
    } catch (_error) {
      return null;
    }
  };

  try {
    const persisted = localStorage.getItem(STORAGE_KEY);
    const raw = JSON.parse(persisted || "null") || migrateLegacyState() || {};
    const loaded = {
      settings: raw.settings || {
        weekStart: "",
        weekEnd: "",
        itemCount: 10,
        activeTab: "admin",
        seekerStart: "2026-04-28",
        ceremonyName: "八大明王護摩供",
        ceremonyId: DEFAULT_CEREMONY_ID,
        schemaVersion: SETTINGS_SCHEMA_VERSION,
      },
      fellowships: raw.fellowships || {},
      targets: raw.targets || createEmptyTargets(),
      fellowshipTargets: raw.fellowshipTargets || createEmptyFellowshipTargets(),
      ceremonyData: raw.ceremonyData || null,
      users: raw.users || [],
      reportAutomation: raw.reportAutomation || createDefaultReportAutomation(),
    };
    return normalizeStateShape(loaded);
  } catch (_error) {
    return createDefaultState();
  }
}

async function loadState() {
  try {
    const response = await apiFetch(API_STATE_URL);
    if (!response.ok) {
      throw new Error(`State API returned ${response.status}`);
    }

    const remoteState = await response.json();
    state = remoteState;
    ensureStateShape();

    const localState = loadLocalState();
    if (hasLocalData(localState) && !hasRemoteData(state)) {
      state = localState;
      ensureStateShape();
      await saveState();
    }

    return state;
  } catch (error) {
    console.error("データベースから読み込めませんでした。ローカルの保存データを表示します。", error);
    state = loadLocalState();
    ensureStateShape();
    return state;
  }
}

function hasRemoteData(currentState) {
  return hasSavedValues(currentState) || hasTargetValues(currentState) || hasUserValues(currentState);
}

function hasLocalData(localState) {
  return hasSavedValues(localState) || hasTargetValues(localState) || hasUserValues(localState);
}

function hasSavedValues(currentState) {
  const hasLegacyValues = Object.values(currentState.fellowships || {}).some((days) =>
    Object.values(days || {}).some((day) => Object.values(day || {}).some((value) => Number(value) > 0)),
  );
  const hasCeremonyValues = Object.values(currentState.ceremonyData || {}).some((ceremonyData) =>
    Object.values(ceremonyData?.fellowships || {}).some((days) =>
      Object.values(days || {}).some((day) => Object.values(day || {}).some((value) => Number(value) > 0)),
    ),
  );
  return hasLegacyValues || hasCeremonyValues;
}

function hasTargetValues(currentState) {
  const hasLegacyTargets =
    Object.values(currentState.targets || {}).some((value) => Number(value) > 0) ||
    Object.values(currentState.fellowshipTargets || {}).some((targets) =>
      Object.values(targets || {}).some((value) => Number(value) > 0),
    );
  const hasCeremonyTargets = Object.values(currentState.ceremonyData || {}).some((ceremonyData) =>
    Object.values(ceremonyData?.targets || {}).some((value) => Number(value) > 0) ||
    Object.values(ceremonyData?.summaryTargetOverrides || {}).some((value) => Number(value) > 0) ||
    Object.values(ceremonyData?.fellowshipTargets || {}).some((targets) =>
      Object.values(targets || {}).some((value) => Number(value) > 0),
    ),
  );
  return hasLegacyTargets || hasCeremonyTargets;
}

function hasUserValues(currentState) {
  return (currentState.users || []).some((user) =>
    ["loginId", "fellowship", "name", "email"].some((key) => String(user?.[key] || "").trim() !== ""),
  );
}

async function patchState(patch) {
  try {
    const response = await apiFetch(API_STATE_URL, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!response.ok) {
      throw new Error(`State API returned ${response.status}`);
    }
  } catch (error) {
    console.error("データベースに保存できませんでした。", error);
  }
}

function saveState() {
  return patchState({ type: "replace", state });
}

function saveSettings() {
  return patchState({
    type: "settings",
    settings: { ceremonyId: state.settings.ceremonyId, schemaVersion: SETTINGS_SCHEMA_VERSION },
    reportAutomation: state.reportAutomation,
    ceremonyId: getActiveCeremonyConfig().id,
    ceremonySettings: {
      weekStart: getActiveCeremonyData().weekStart,
      weekEnd: getActiveCeremonyData().weekEnd,
      seekerStart: getActiveCeremonyData().seekerStart,
    },
  });
}

async function refreshStateFromDatabase() {
  if (document.activeElement && ["INPUT", "SELECT"].includes(document.activeElement.tagName)) {
    return;
  }

  try {
    const response = await apiFetch(API_STATE_URL);
    if (!response.ok) {
      throw new Error(`State API returned ${response.status}`);
    }

    state = normalizeStateShape(await response.json());
    render();
  } catch (error) {
    console.error("データベースから最新データを読み込めませんでした。", error);
  }
}

function getValue(name, dateId, itemKey) {
  const day = getActiveCeremonyData().fellowships[name][dateId] || createEmptyDay();
  return Number(day[itemKey]) || 0;
}

function getFinalValue(name, itemKey) {
  return getValue(name, getActiveCeremonyData().weekEnd, itemKey) || getValue(name, FINAL_ROW_ID, itemKey);
}

function setValue(name, dateId, itemKey, value) {
  const ceremonyData = getActiveCeremonyData();
  if (!ceremonyData.fellowships[name][dateId]) {
    ceremonyData.fellowships[name][dateId] = createEmptyDay();
  }
  const normalizedValue = Math.max(0, Number(value) || 0);
  ceremonyData.fellowships[name][dateId][itemKey] = normalizedValue;
  patchState({ type: "value", ceremonyId: getActiveCeremonyConfig().id, fellowship: name, dateId, itemKey, value });
}

function getTargetValue(name, itemKey) {
  return Number(getActiveCeremonyData().fellowshipTargets[name]?.[itemKey]) || 0;
}

function setTargetValue(name, itemKey, value) {
  const normalizedValue = Math.max(0, Number(value) || 0);
  const ceremonyData = getActiveCeremonyData();
  if (!ceremonyData.fellowshipTargets[name]) {
    ceremonyData.fellowshipTargets[name] = createEmptyTargets();
  }
  ceremonyData.fellowshipTargets[name][itemKey] = normalizedValue;
  patchState({ type: "target", ceremonyId: getActiveCeremonyConfig().id, fellowship: name, itemKey, value: normalizedValue });
}

function getSummaryTargetValue(itemKey, fallbackValue) {
  const overrides = getActiveCeremonyData().summaryTargetOverrides || {};
  return Object.prototype.hasOwnProperty.call(overrides, itemKey) ? Number(overrides[itemKey]) || 0 : fallbackValue;
}

function setSummaryTargetValue(itemKey, value) {
  const normalizedValue = Math.max(0, Number(value) || 0);
  const ceremonyData = getActiveCeremonyData();
  ceremonyData.summaryTargetOverrides = {
    ...(ceremonyData.summaryTargetOverrides || {}),
    [itemKey]: normalizedValue,
  };
  patchState({ type: "summaryTarget", ceremonyId: getActiveCeremonyConfig().id, itemKey, value: normalizedValue });
}

function canEditTargets() {
  return true;
}

function canEditDate(dateId) {
  return dateId >= todayISOJST();
}

function getCurrentFellowship() {
  return fellowshipNames.includes(currentUser?.fellowship) ? currentUser.fellowship : "";
}

function canEditFellowship(name) {
  if (!hasAuthenticatedUser()) {
    return true;
  }
  if (canAccessAdmin()) {
    return true;
  }
  const fellowship = getCurrentFellowship();
  return fellowship === name;
}

function canEditTargetRow(name) {
  return canEditFellowship(name) && canEditTargets();
}

function canEditDateForFellowship(name, dateId) {
  return canEditFellowship(name) && canEditDate(dateId);
}

function selectOnFocus(input) {
  input.addEventListener("focus", () => {
    input.select();
  });
}

function updateNumberInputSize(input) {
  input.classList.toggle("compact-number", input.value.length >= 4);
}

function setInputWarning(container, message) {
  const warning = container?.querySelector(".input-warning");
  if (!warning) {
    return;
  }

  warning.textContent = message || "";
  warning.hidden = !message;
}

function setInputInvalid(input, message) {
  input.classList.toggle("invalid-number", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
  input.title = message || "";
}

function createNumberInput(currentValue, onChange, className = "", options = {}) {
  const input = document.createElement("input");
  input.className = className;
  input.type = "text";
  input.inputMode = "numeric";
  input.pattern = "[0-9]*";
  input.value = currentValue === 0 ? "" : String(currentValue);
  updateNumberInputSize(input);
  selectOnFocus(input);
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
    updateNumberInputSize(input);

    const validationMessage = options.validate ? options.validate(input.value) : "";
    setInputInvalid(input, validationMessage);
    setInputWarning(options.warningContainer, validationMessage);
    if (validationMessage) {
      return;
    }

    onChange(input.value);
  });
  return input;
}

function createTargetInput(name, itemKey, currentValue) {
  return createNumberInput(currentValue, (value) => setTargetValue(name, itemKey, value), "target-input");
}

function createSummaryTargetInput(itemKey, currentValue) {
  return createNumberInput(currentValue, (value) => setSummaryTargetValue(itemKey, value), "target-input");
}

function getPreviousCumulativeValue(name, dateId, itemKey) {
  let previousValue = 0;

  getWeekDates().forEach((date) => {
    if (date.id < dateId) {
      const value = getValue(name, date.id, itemKey);
      if (value > 0) {
        previousValue = value;
      }
    }
  });

  return previousValue;
}

function validateCumulativeInput(name, dateId, itemKey, value) {
  if (String(value ?? "") === "") {
    return "";
  }

  const previousValue = getPreviousCumulativeValue(name, dateId, itemKey);
  const nextValue = Number(value) || 0;

  if (previousValue > 0 && nextValue < previousValue) {
    return `累計数のため、前回入力値（${previousValue}）以上の数字を入力してください。`;
  }

  return "";
}

function appendUnit(cell, unit) {
  if (!unit) {
    return;
  }

  const unitEl = document.createElement("span");
  unitEl.className = "input-unit";
  unitEl.textContent = unit;
  cell.appendChild(unitEl);
}

function appendReadonlyValue(cell, value, unit) {
  const valueEl = document.createElement("span");
  valueEl.className = "input-value";
  valueEl.textContent = value === 0 ? "" : String(value);
  cell.appendChild(valueEl);
  appendUnit(cell, unit);
}

function renderTabs() {
  tabButtons.innerHTML = "";

  fellowshipNames.forEach((name) => {
    const button = document.createElement("button");
    button.className = `tab-button ${activeTab === name ? "active" : ""}`;
    button.textContent = name;
    button.type = "button";
    button.addEventListener("click", () => {
      activeTab = name;
      localStorage.setItem(ACTIVE_TAB_KEY, activeTab);
      render();
    });
    tabButtons.appendChild(button);
  });

  const summaryButton = document.createElement("button");
  summaryButton.className = `tab-button ${activeTab === "summary" ? "active" : ""}`;
  summaryButton.textContent = "合計ページ";
  summaryButton.type = "button";
  summaryButton.addEventListener("click", () => {
    activeTab = "summary";
    localStorage.setItem(ACTIVE_TAB_KEY, activeTab);
    render();
  });
  tabButtons.appendChild(summaryButton);

  if (canAccessAdmin()) {
    const adminButton = document.createElement("button");
    adminButton.className = `tab-button ${activeTab === "admin" ? "active" : ""}`;
    adminButton.textContent = "管理ページ";
    adminButton.type = "button";
    adminButton.addEventListener("click", () => {
      activeTab = "admin";
      localStorage.setItem(ACTIVE_TAB_KEY, activeTab);
      render();
    });
    tabButtons.appendChild(adminButton);
  }
}

function fillHeaderRow(rowEl) {
  rowEl.innerHTML = "";
  const first = document.createElement("th");
  first.textContent = "日付";
  rowEl.appendChild(first);

  getActiveItems().forEach((item) => {
    const th = document.createElement("th");
    if (item.key === "seekers") {
      const seekerStart = getActiveCeremonyData().seekerStart;
      th.append("得道者数", document.createElement("br"), seekerStart ? `(${formatShortDate(seekerStart)}～)` : "");
    } else if (item.key === "tenchi") {
      th.append("天地免劫", document.createElement("br"), "護摩木");
    } else if (item.key === "ryuge") {
      th.append("三會龍華", document.createElement("br"), "之御柱");
    } else if (item.key === "sanki_proxy") {
      th.append("三期滅劫之霊木", document.createElement("br"), "代理奉納");
    } else if (item.key === "ryuge_proxy") {
      th.append("三會龍華之御柱", document.createElement("br"), "代理奉納");
    } else if (item.key === "maso") {
      th.append("媽祖救航灯", document.createElement("br"), "代理奉納");
    } else {
      th.textContent = item.label;
    }
    rowEl.appendChild(th);
  });
}

function fillSummaryHeaderRow(rowEl) {
  rowEl.innerHTML = "";
  rowEl.appendChild(document.createElement("th"));

  getActiveItems().forEach((item) => {
    const th = document.createElement("th");
    if (item.key === "seekers") {
      const seekerStart = getActiveCeremonyData().seekerStart;
      if (seekerStart) {
        th.textContent = "得道者数";
        const dateSpan = document.createElement("span");
        dateSpan.className = "horizontal-date";
        dateSpan.textContent = `(${formatShortDate(seekerStart)}～)`;
        th.appendChild(dateSpan);
      } else {
        th.textContent = "得道者数";
      }
    } else if (item.key === "tenchi") {
      th.append("この護摩供に", document.createElement("br"), "向けての", document.createElement("br"), "天地免劫護摩木");
    } else if (item.key === "goma") {
      th.append("この護摩供に", document.createElement("br"), "向けての", document.createElement("br"), "各種護摩木");
    } else if (item.key === "ryuge") {
      th.textContent = "三會龍華之御柱";
    } else if (item.key === "ryuge_proxy") {
      th.append("三會龍華之御柱", document.createElement("br"), "代理奉納");
    } else if (item.key === "sanki_proxy") {
      th.append("三期滅劫之霊木", document.createElement("br"), "代理奉納");
    } else if (item.key === "jigoku") {
      th.append("地獄曼荼羅會", document.createElement("br"), "代理奉納");
    } else if (item.key === "kokujyo") {
      th.append("黒縄供養紐・", document.createElement("br"), "水子萬灯會", document.createElement("br"), "代理奉納");
    } else if (item.key === "maso") {
      th.append("媽祖救航灯", document.createElement("br"), "代理奉納");
    } else if (item.key === "hokuto_segaki") {
      th.append("北斗施餓鬼供養", document.createElement("br"), "護摩木代理奉納");
    } else if (item.key === "inau") {
      th.append("イナウ・", document.createElement("br"), "なで玄武・", document.createElement("br"), "北斗鎮圧札");
    } else if (item.key === "junishinsho") {
      th.append("十二神将板・", document.createElement("br"), "龍樹滅業棒");
    } else if (item.key === "water") {
      if (item.summaryLabel === "御神水・命泉・泉・龍華水・禄存五聖杯") {
        th.append("御神水・命泉・", document.createElement("br"), "泉・龍華水・", document.createElement("br"), "禄存五聖杯");
      } else if (item.summaryLabel === "御神水・泉・龍華水等") {
        th.append("御神水・泉・", document.createElement("br"), "龍華水等");
      } else if (item.summaryLabel === "御神水・命泉・泉・龍華水等") {
        th.append("御神水・命泉・", document.createElement("br"), "泉・龍華水等");
      } else if (item.summaryLabel === "御神水・命泉・泉・龍華水") {
        th.append("御神水・命泉・", document.createElement("br"), "泉・龍華水");
      } else {
        th.textContent = item.summaryLabel || item.label;
      }
    } else {
      th.textContent = item.summaryLabel || item.label;
    }
    rowEl.appendChild(th);
  });
}

function renderInputPage(name) {
  const template = document.getElementById("inputPageTemplate");
  const content = template.content.cloneNode(true);
  content.querySelector(".page-title").textContent = `第${getCeremonyNumber()}回${getActiveCeremonyConfig().name}　${name}`;
  const inputSection = content.querySelector(".input-page");

  fillHeaderRow(content.querySelector("#inputHeaderRow"));
  const tbody = content.querySelector("tbody");
  const targetRow = document.createElement("tr");
  targetRow.className = "target-row";

  const targetLabelCell = document.createElement("th");
  targetLabelCell.textContent = "目標";
  targetRow.appendChild(targetLabelCell);

  const targetsEditable = canEditTargetRow(name);

  getActiveItems().forEach((item) => {
    const td = document.createElement("td");
    const currentValue = getTargetValue(name, item.key);

    if (targetsEditable) {
      td.appendChild(createTargetInput(name, item.key, currentValue));
      appendUnit(td, item.unit);
    } else {
      appendReadonlyValue(td, currentValue, item.unit);
    }

    targetRow.appendChild(td);
  });

  tbody.appendChild(targetRow);

  getWeekDates().forEach((date) => {
    const tr = document.createElement("tr");

    const dateCell = document.createElement("th");
    dateCell.textContent = date.label;
    tr.appendChild(dateCell);

    getActiveItems().forEach((item) => {
      const td = document.createElement("td");
      const currentValue = getValue(name, date.id, item.key);

      if (canEditDateForFellowship(name, date.id)) {
        const input = createNumberInput(currentValue, (value) => setValue(name, date.id, item.key, value), "", {
          validate: (value) => validateCumulativeInput(name, date.id, item.key, value),
          warningContainer: inputSection,
        });
        td.appendChild(input);
        appendUnit(td, item.unit);
      } else {
        appendReadonlyValue(td, currentValue, item.unit);
      }

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  const totalRow = content.querySelector("#inputWeeklyTotalRow");
  const labelCell = document.createElement("th");
  labelCell.textContent = "最終";
  totalRow.appendChild(labelCell);

  getActiveItems().forEach((item) => {
    const td = document.createElement("td");
    const currentValue = getFinalValue(name, item.key);

    if (canEditDateForFellowship(name, getActiveCeremonyData().weekEnd)) {
      const input = createNumberInput(currentValue, (value) => setValue(name, getActiveCeremonyData().weekEnd, item.key, value), "", {
        validate: (value) => validateCumulativeInput(name, getActiveCeremonyData().weekEnd, item.key, value),
        warningContainer: inputSection,
      });
      td.appendChild(input);
      appendUnit(td, item.unit);
    } else {
      appendReadonlyValue(td, currentValue, item.unit);
    }

    totalRow.appendChild(td);
  });

  pageContainer.innerHTML = "";
  pageContainer.appendChild(content);
}

function getReportStatusText() {
  const report = {
    ...createDefaultReportAutomation(),
    ...(state.reportAutomation || {}),
  };
  const status = report.enabled ? "有効" : "無効";
  const lastSuccess = report.lastSuccessAt ? ` 最終成功: ${report.lastSuccessAt}` : "";
  const lastError = report.lastError ? ` 最終エラー: ${report.lastError}` : "";
  return `状態: ${status} / 期間中は毎日 ${report.sendTime} に送信${lastSuccess}${lastError}`;
}

function renderReportHistory(listEl) {
  const history = Array.isArray(state.reportAutomation?.history) ? state.reportAutomation.history : [];
  listEl.innerHTML = "";

  if (!history.length) {
    const item = document.createElement("li");
    item.textContent = "履歴はまだありません";
    listEl.appendChild(item);
    return;
  }

  history.slice(0, 10).forEach((entry) => {
    const item = document.createElement("li");
    const status = entry.status || "記録";
    const message = entry.message ? ` / ${entry.message}` : "";
    item.textContent = `${entry.at || ""} ${status}${message}`;
    listEl.appendChild(item);
  });
}

async function sendManualReport(button, unlockInput, reportStatus, reportHistoryList, manualReportResult) {
  const originalText = button.textContent;
  button.disabled = true;
  unlockInput.disabled = true;
  button.textContent = "送信中...";
  manualReportResult.textContent = "手動送信中...";

  try {
    const response = await apiFetch("/api/report-send", { method: "POST" });
    if (!response.ok) {
      throw new Error(`Report send API returned ${response.status}`);
    }
    const result = await response.json();
    state.reportAutomation = {
      ...createDefaultReportAutomation(),
      ...(state.reportAutomation || {}),
      ...(result.reportAutomation || {}),
    };
    const latest = Array.isArray(state.reportAutomation.history) ? state.reportAutomation.history[0] : null;
    reportStatus.textContent = getReportStatusText();
    renderReportHistory(reportHistoryList);
    manualReportResult.textContent = latest
      ? `手動送信完了: ${latest.status || "記録"} / ${latest.at || ""}`
      : "手動送信完了";
  } catch (error) {
    console.error("オンライン報告を手動送信できませんでした。", error);
    manualReportResult.textContent = `手動送信エラー: ${error.message || error}`;
    reportStatus.textContent = `${getReportStatusText()} 手動送信エラー: ${error.message || error}`;
  } finally {
    unlockInput.checked = false;
    unlockInput.disabled = false;
    button.textContent = originalText;
    button.disabled = true;
  }
}

function renderAdminPage() {
  const template = document.getElementById("adminPageTemplate");
  const content = template.content.cloneNode(true);
  const ceremonySelect = content.querySelector("#ceremonySelect");
  const weekStartInput = content.querySelector("#weekStart");
  const weekEndInput = content.querySelector("#weekEnd");
  const seekerStartInput = content.querySelector("#seekerStart");
  const reportEnabledInput = content.querySelector("#reportEnabled");
  const reportSendTimeInput = content.querySelector("#reportSendTime");
  const reportSenderNameInput = content.querySelector("#reportSenderName");
  const reportBranchNameInput = content.querySelector("#reportBranchName");
  const reportBranchCodeInput = content.querySelector("#reportBranchCode");
  const reportNotifyEmailInput = content.querySelector("#reportNotifyEmail");
  const reportStatus = content.querySelector("#reportStatus");
  const reportHistoryList = content.querySelector("#reportHistoryList");
  const manualReportUnlock = content.querySelector("#manualReportUnlock");
  const manualReportButton = content.querySelector("#manualReportButton");
  const manualReportResult = content.querySelector("#manualReportResult");
  const ceremonyData = getActiveCeremonyData();
  ensureCeremonyDates(ceremonyData);
  state.reportAutomation = {
    ...createDefaultReportAutomation(),
    ...(state.reportAutomation || {}),
  };

  CEREMONY_CONFIGS.forEach((ceremony) => {
    const option = document.createElement("option");
    option.value = ceremony.id;
    option.textContent = ceremony.name;
    ceremonySelect.appendChild(option);
  });

  ceremonySelect.value = getActiveCeremonyConfig().id;
  weekStartInput.value = formatShortDate(ceremonyData.weekStart);
  weekEndInput.value = formatShortDate(ceremonyData.weekEnd);
  seekerStartInput.value = formatShortDate(ceremonyData.seekerStart);
  reportEnabledInput.checked = Boolean(state.reportAutomation.enabled);
  reportSendTimeInput.value = state.reportAutomation.sendTime || "22:00";
  reportSenderNameInput.value = state.reportAutomation.senderName || "";
  reportBranchNameInput.value = state.reportAutomation.branchName || "";
  reportBranchCodeInput.value = state.reportAutomation.branchCode || DEFAULT_REPORT_BRANCH_CODE;
  reportNotifyEmailInput.value = state.reportAutomation.notifyEmail || "";
  reportStatus.textContent = getReportStatusText();
  renderReportHistory(reportHistoryList);

  ceremonySelect.addEventListener("change", () => {
    state.settings.ceremonyId = ceremonySelect.value;
    saveSettings();
    render();
  });

  weekStartInput.addEventListener("change", () => {
    const activeData = getActiveCeremonyData();
    const preset = getCeremonyDatePreset(getActiveCeremonyConfig().id);
    const nextWeekStart = parseAdminDateInput(weekStartInput.value) || todayISOJST();
    activeData.weekStart = nextWeekStart;
    activeData.weekEnd = addDaysISO(nextWeekStart, 7);
    if (preset) {
      activeData.datePresetKey = `custom:${preset.key}`;
    }
    weekStartInput.value = formatShortDate(activeData.weekStart);
    weekEndInput.value = formatShortDate(activeData.weekEnd);
    if (activeData.seekerStart) {
      seekerStartInput.value = formatShortDate(activeData.seekerStart);
    }
    saveSettings();
  });

  weekEndInput.addEventListener("change", () => {
    const activeData = getActiveCeremonyData();
    const preset = getCeremonyDatePreset(getActiveCeremonyConfig().id);
    activeData.weekEnd = parseAdminDateInput(weekEndInput.value) || addDaysISO(activeData.weekStart, 7);
    if (activeData.weekStart && activeData.weekEnd && activeData.weekEnd < activeData.weekStart) {
      activeData.weekEnd = addDaysISO(activeData.weekStart, 7);
    }
    if (preset) {
      activeData.datePresetKey = `custom:${preset.key}`;
    }
    weekEndInput.value = formatShortDate(activeData.weekEnd);
    saveSettings();
  });

  seekerStartInput.addEventListener("change", () => {
    const activeData = getActiveCeremonyData();
    activeData.seekerStart = parseAdminDateInput(seekerStartInput.value);
    seekerStartInput.value = formatShortDate(activeData.seekerStart);
    saveSettings();
  });

  const saveReportAutomation = () => {
    state.reportAutomation = {
      ...createDefaultReportAutomation(),
      ...(state.reportAutomation || {}),
      enabled: reportEnabledInput.checked,
      sendTime: reportSendTimeInput.value || "22:00",
      senderName: reportSenderNameInput.value.trim(),
      branchName: reportBranchNameInput.value.trim(),
      branchCode: reportBranchCodeInput.value.trim() || DEFAULT_REPORT_BRANCH_CODE,
      notifyEmail: reportNotifyEmailInput.value.trim(),
    };
    reportStatus.textContent = getReportStatusText();
    renderReportHistory(reportHistoryList);
    saveSettings();
  };

  [reportEnabledInput, reportSendTimeInput, reportSenderNameInput, reportBranchNameInput, reportBranchCodeInput, reportNotifyEmailInput].forEach((input) => {
    input.addEventListener("change", saveReportAutomation);
  });

  manualReportUnlock.addEventListener("change", () => {
    manualReportButton.disabled = !manualReportUnlock.checked;
  });
  manualReportButton.addEventListener("click", () => {
    if (manualReportButton.disabled || !manualReportUnlock.checked) {
      return;
    }
    sendManualReport(manualReportButton, manualReportUnlock, reportStatus, reportHistoryList, manualReportResult);
  });

  renderUserList(content);

  pageContainer.innerHTML = "";
  pageContainer.appendChild(content);
}

function getDayTotals(dateId) {
  const totals = Object.fromEntries(getActiveItems().map((item) => [item.key, 0]));

  fellowshipNames.forEach((name) => {
    getActiveItems().forEach((item) => {
      totals[item.key] += getValue(name, dateId, item.key);
    });
  });

  return totals;
}

function getCarriedValue(name, dateId, itemKey) {
  let carriedValue = 0;

  getWeekDates().forEach((date) => {
    if (date.id <= dateId) {
      const value = getValue(name, date.id, itemKey);
      if (value > 0) {
        carriedValue = value;
      }
    }
  });

  return carriedValue;
}

function getCarriedDayTotals(dateId) {
  const totals = Object.fromEntries(getActiveItems().map((item) => [item.key, 0]));

  fellowshipNames.forEach((name) => {
    getActiveItems().forEach((item) => {
      totals[item.key] += getCarriedValue(name, dateId, item.key);
    });
  });

  return totals;
}

function getCumulativeDayTotals(dateId) {
  return dateId <= todayISOJST() ? getCarriedDayTotals(dateId) : null;
}

function getFinalTotals() {
  const totals = Object.fromEntries(getActiveItems().map((item) => [item.key, 0]));

  fellowshipNames.forEach((name) => {
    getActiveItems().forEach((item) => {
      totals[item.key] += getFinalValue(name, item.key);
    });
  });

  return totals;
}

function getCumulativeFinalTotals() {
  if (getActiveCeremonyData().weekEnd > todayISOJST()) {
    return null;
  }

  const finalTotals = getFinalTotals();
  const carriedTotals = getCarriedDayTotals(getActiveCeremonyData().weekEnd);
  const totals = Object.fromEntries(getActiveItems().map((item) => [item.key, 0]));

  getActiveItems().forEach((item) => {
    totals[item.key] = finalTotals[item.key] || carriedTotals[item.key];
  });

  return totals;
}

function createUserText(value) {
  const span = document.createElement("span");
  span.textContent = value || "";
  return span;
}

function renderUserList(content) {
  const tbody = content.querySelector("#userTableBody");
  tbody.innerHTML = "";

  state.users.forEach((user, index) => {
    const normalizedUser = { ...createEmptyUser(), ...user };
    const tr = document.createElement("tr");
    const cells = [
      createUserText(normalizedUser.loginId),
      createUserText(normalizedUser.fellowship),
      createUserText(normalizedUser.name),
      createUserText(normalizedUser.email),
    ];

    cells.forEach((field) => {
      const td = document.createElement("td");
      td.appendChild(field);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

function getTargetTotals() {
  const totals = Object.fromEntries(getActiveItems().map((item) => [item.key, 0]));

  fellowshipNames.forEach((name) => {
    getActiveItems().forEach((item) => {
      totals[item.key] += getTargetValue(name, item.key);
    });
  });

  return totals;
}

function getSummaryPdfFileName() {
  const ceremony = getActiveCeremonyConfig().name.replace(/[\\/:*?"<>|]/g, "");
  return `第${getCeremonyNumber()}回${ceremony}_集計表.pdf`;
}

function getDownloadFileName(response) {
  const disposition = response.headers.get("content-disposition") || "";
  const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match) {
    return decodeURIComponent(utf8Match[1]);
  }

  const asciiMatch = disposition.match(/filename="([^"]+)"/i);
  if (asciiMatch) {
    return asciiMatch[1];
  }

  return getSummaryPdfFileName();
}

async function saveSummaryPdf(button) {
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "保存中...";

  try {
    const response = await apiFetch("/api/report-pdf");
    if (!response.ok) {
      throw new Error(`PDF download failed: ${response.status}`);
    }

    const pdfBlob = await response.blob();
    const downloadUrl = URL.createObjectURL(pdfBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.download = getDownloadFileName(response);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("PDFを保存できませんでした。", error);
    alert("PDFを保存できませんでした。もう一度お試しください。");
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}

function renderSummaryPage() {
  const template = document.getElementById("summaryPageTemplate");
  const content = template.content.cloneNode(true);
  content.querySelector("#summaryPdfButton").addEventListener("click", (event) => {
    saveSummaryPdf(event.currentTarget);
  });

  content.querySelector("[data-summary-title]").textContent =
    `～第${getCeremonyNumber()}回${getActiveCeremonyConfig().name}　集計表～　報告数は累計数です`;
  content.querySelectorAll("[data-summary-colspan]").forEach((cell) => {
    cell.colSpan = getActiveItems().length + 1;
  });
  content.querySelector("[data-phone-colspan]").colSpan = Math.max(1, getActiveItems().length - 5);
  fillSummaryHeaderRow(content.querySelector("#summaryHeaderRow"));

  const tbody = content.querySelector("tbody");
  const targetRow = document.createElement("tr");
  targetRow.className = "target-row";

  const targetLabelCell = document.createElement("th");
  targetLabelCell.textContent = "目標";
  targetRow.appendChild(targetLabelCell);

  const targetTotals = getTargetTotals();

  getActiveItems().forEach((item) => {
    const td = document.createElement("td");
    const value = getSummaryTargetValue(item.key, targetTotals[item.key]);

    if (canAccessAdmin()) {
      td.appendChild(createSummaryTargetInput(item.key, value));
      const unitEl = document.createElement("span");
      unitEl.className = "summary-unit";
      unitEl.textContent = item.unit;
      td.appendChild(unitEl);
    } else {
      td.innerHTML = `<span class="summary-value">${value || ""}</span><span class="summary-unit">${item.unit}</span>`;
    }

    targetRow.appendChild(td);
  });

  tbody.appendChild(targetRow);

  getWeekDates().forEach((date) => {
    const dayTotals = getCumulativeDayTotals(date.id);
    const tr = document.createElement("tr");

    const dateCell = document.createElement("th");
    dateCell.textContent = date.label;
    tr.appendChild(dateCell);

    getActiveItems().forEach((item) => {
      const td = document.createElement("td");
      const value = dayTotals?.[item.key] || "";
      td.innerHTML = `<span class="summary-value">${value}</span><span class="summary-unit">${item.unit}</span>`;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  const totalRow = content.querySelector("#weeklyTotalRow");
  const finalTotals = getCumulativeFinalTotals();
  const labelCell = document.createElement("th");
  labelCell.textContent = "最終";
  totalRow.appendChild(labelCell);

  getActiveItems().forEach((item) => {
    const td = document.createElement("td");
    const value = finalTotals?.[item.key] || "";
    td.innerHTML = `<span class="summary-value">${value}</span><span class="summary-unit">${item.unit}</span>`;
    totalRow.appendChild(td);
  });

  pageContainer.innerHTML = "";
  pageContainer.appendChild(content);
}

function render() {
  renderTabs();
  appTitle.textContent = `${getActiveCeremonyConfig().name}毎日集計`;
  userStatus.textContent = getCurrentUserLabel();

  if (activeTab === "summary") {
    renderSummaryPage();
  } else if (activeTab === "admin") {
    renderAdminPage();
  } else {
    renderInputPage(activeTab);
  }
}
