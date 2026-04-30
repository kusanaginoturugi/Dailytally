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

const appTitle = document.getElementById("appTitle");
const tabButtons = document.getElementById("tabButtons");
const pageContainer = document.getElementById("pageContainer");

let state = createDefaultState();
let activeTab = "admin";
let currentUser = null;

init();

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
    const response = await fetch(API_ME_URL);
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

function getSavedActiveTab() {
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

function canAccessAdmin() {
  // SSO未連携（currentUserがnullまたはfellowshipが空）の場合は、便宜上管理者として扱う（移行期間用）
  if (!currentUser || !currentUser.fellowship) {
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
  const year = fullDate ? Number(fullDate[1]) : new Date().getFullYear();
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

function ensureCeremonyDates(ceremonyData) {
  const today = toISODate(new Date());
  const currentYear = new Date().getFullYear();

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
  const today = toISODate(new Date());
  return {
    weekStart: today,
    weekEnd: addDaysISO(today, 7),
    seekerStart: ceremonyConfig.seekerStart || "",
    fellowships: Object.fromEntries(fellowshipNames.map((name) => [name, {}])),
    targets: createEmptyTargets(),
    fellowshipTargets: createEmptyFellowshipTargets(),
  };
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
  };
}

function normalizeStateShape(targetState) {
  if (!targetState.settings) {
    targetState.settings = {
      weekStart: toISODate(new Date()),
      weekEnd: addDaysISO(toISODate(new Date()), 6),
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
    targetState.settings.weekStart = toISODate(new Date());
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

  if (!targetState.ceremonyData) {
    targetState.ceremonyData = {
      [DEFAULT_CEREMONY_ID]: {
        weekStart: targetState.settings.weekStart,
        weekEnd: targetState.settings.weekEnd,
        seekerStart: targetState.settings.seekerStart,
        fellowships: targetState.fellowships || {},
        targets: targetState.targets || createEmptyTargets(),
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
    ensureCeremonyDates(ceremonyData);
    ceremonyData.seekerStart = ceremonyData.seekerStart ?? (ceremony.seekerStart || "");
    ceremonyData.fellowships = ceremonyData.fellowships || {};
    ceremonyData.targets = {
      ...createEmptyTargets(),
      ...(ceremonyData.targets || {}),
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
      const migrated = {
        settings: {
          weekStart: toISODate(new Date()),
          weekEnd: addDaysISO(toISODate(new Date()), 6),
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
    };
    return normalizeStateShape(loaded);
  } catch (_error) {
    return createDefaultState();
  }
}

async function loadState() {
  try {
    const response = await fetch(API_STATE_URL);
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
    const response = await fetch(API_STATE_URL, {
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
    const response = await fetch(API_STATE_URL);
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
  patchState({ type: "value", ceremonyId: getActiveCeremonyConfig().id, fellowship: name, dateId, itemKey, value: normalizedValue });
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

function usesSummaryTargets() {
  return getActiveCeremonyConfig().id === DEFAULT_CEREMONY_ID;
}

function getSummaryTargetValue(itemKey) {
  return Number(getActiveCeremonyData().targets?.[itemKey]) || 0;
}

function setSummaryTargetValue(itemKey, value) {
  const normalizedValue = Math.max(0, Number(value) || 0);
  getActiveCeremonyData().targets[itemKey] = normalizedValue;
  patchState({ type: "target", ceremonyId: getActiveCeremonyConfig().id, itemKey, value: normalizedValue });
}

function canEditTargets() {
  return true;
}

function canEditDate(dateId) {
  return dateId >= toISODate(new Date());
}

function getCurrentFellowship() {
  return fellowshipNames.includes(currentUser?.fellowship) ? currentUser.fellowship : "";
}

function canEditFellowship(name) {
  const fellowship = getCurrentFellowship();
  return !fellowship || fellowship === name;
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

function createTargetInput(name, itemKey, currentValue) {
  const input = document.createElement("input");
  input.className = "target-input";
  input.type = "text";
  input.inputMode = "numeric";
  input.pattern = "[0-9]*";
  input.value = currentValue === 0 ? "" : String(currentValue);
  selectOnFocus(input);
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
    setTargetValue(name, itemKey, input.value);
  });
  return input;
}

function createSummaryTargetInput(itemKey, currentValue) {
  const input = document.createElement("input");
  input.className = "target-input";
  input.type = "text";
  input.inputMode = "numeric";
  input.pattern = "[0-9]*";
  input.value = currentValue === 0 ? "" : String(currentValue);
  selectOnFocus(input);
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
    setSummaryTargetValue(itemKey, input.value);
  });
  return input;
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

  fillHeaderRow(content.querySelector("#inputHeaderRow"));
  const tbody = content.querySelector("tbody");
  if (!usesSummaryTargets()) {
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
  }

  getWeekDates().forEach((date) => {
    const tr = document.createElement("tr");

    const dateCell = document.createElement("th");
    dateCell.textContent = date.label;
    tr.appendChild(dateCell);

    getActiveItems().forEach((item) => {
      const td = document.createElement("td");
      const currentValue = getValue(name, date.id, item.key);

      if (canEditDateForFellowship(name, date.id)) {
        const input = document.createElement("input");
        input.type = "text";
        input.inputMode = "numeric";
        input.pattern = "[0-9]*";
        input.value = currentValue === 0 ? "" : String(currentValue);
        selectOnFocus(input);
        input.addEventListener("input", () => {
          input.value = input.value.replace(/\D/g, "");
          setValue(name, date.id, item.key, input.value);
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
      const input = document.createElement("input");
      input.type = "text";
      input.inputMode = "numeric";
      input.pattern = "[0-9]*";
      input.value = currentValue === 0 ? "" : String(currentValue);
      selectOnFocus(input);
      input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "");
        setValue(name, getActiveCeremonyData().weekEnd, item.key, input.value);
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

function renderAdminPage() {
  const template = document.getElementById("adminPageTemplate");
  const content = template.content.cloneNode(true);
  const ceremonySelect = content.querySelector("#ceremonySelect");
  const weekStartInput = content.querySelector("#weekStart");
  const weekEndInput = content.querySelector("#weekEnd");
  const seekerStartInput = content.querySelector("#seekerStart");
  const ceremonyData = getActiveCeremonyData();
  ensureCeremonyDates(ceremonyData);

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

  ceremonySelect.addEventListener("change", () => {
    state.settings.ceremonyId = ceremonySelect.value;
    saveSettings();
    render();
  });

  weekStartInput.addEventListener("change", () => {
    const activeData = getActiveCeremonyData();
    const nextWeekStart = parseAdminDateInput(weekStartInput.value) || toISODate(new Date());
    activeData.weekStart = nextWeekStart;
    activeData.weekEnd = addDaysISO(nextWeekStart, 7);
    weekStartInput.value = formatShortDate(activeData.weekStart);
    weekEndInput.value = formatShortDate(activeData.weekEnd);
    if (activeData.seekerStart) {
      seekerStartInput.value = formatShortDate(activeData.seekerStart);
    }
    saveSettings();
  });

  weekEndInput.addEventListener("change", () => {
    const activeData = getActiveCeremonyData();
    activeData.weekEnd = parseAdminDateInput(weekEndInput.value) || addDaysISO(activeData.weekStart, 7);
    if (activeData.weekStart && activeData.weekEnd && activeData.weekEnd < activeData.weekStart) {
      activeData.weekEnd = addDaysISO(activeData.weekStart, 7);
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

function getFinalTotals() {
  const totals = Object.fromEntries(getActiveItems().map((item) => [item.key, 0]));

  fellowshipNames.forEach((name) => {
    getActiveItems().forEach((item) => {
      totals[item.key] += getFinalValue(name, item.key);
    });
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

function getHeaderSegmentsForPdf(cell) {
  const segments = [];
  let current = "";
  let dateText = "";

  cell.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "BR") {
      if (current) {
        segments.push(current);
        current = "";
      }
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains("horizontal-date")) {
      dateText = node.textContent.trim();
      return;
    }

    current += node.textContent || "";
  });

  if (current) {
    segments.push(current);
  }

  return { segments: segments.map((segment) => segment.trim()).filter(Boolean), dateText };
}

function prepareSummaryPdfClone(clonedDocument) {
  const clonedPrintArea = clonedDocument.getElementById("summaryPrintArea");
  if (!clonedPrintArea) {
    return;
  }

  clonedPrintArea.classList.add("summary-pdf-capture");
  clonedPrintArea.querySelectorAll("input.target-input").forEach((input) => {
    const value = clonedDocument.createElement("span");
    value.className = "summary-value pdf-target-value";
    value.textContent = input.value || "";
    input.replaceWith(value);
  });

  clonedPrintArea.querySelectorAll(".summary-table thead tr:last-child th:not(:first-child)").forEach((cell) => {
    const { segments, dateText } = getHeaderSegmentsForPdf(cell);
    const wrapper = clonedDocument.createElement("span");
    wrapper.className = "pdf-vertical-cell";
    if (segments.join("").includes("御神水")) {
      wrapper.classList.add("pdf-water-cell");
    }

    segments.forEach((segment) => {
      const line = clonedDocument.createElement("span");
      line.className = "pdf-vertical-line";
      Array.from(segment).forEach((character) => {
        const char = clonedDocument.createElement("span");
        char.className = "pdf-vertical-char";
        char.textContent = character;
        line.appendChild(char);
      });
      wrapper.appendChild(line);
    });

    if (dateText) {
      const date = clonedDocument.createElement("span");
      date.className = "horizontal-date pdf-horizontal-date";
      date.textContent = dateText;
      wrapper.appendChild(date);
    }

    cell.replaceChildren(wrapper);
  });
}

async function saveSummaryPdf(button) {
  const printArea = document.getElementById("summaryPrintArea");
  if (!printArea || !window.html2canvas || !window.jspdf?.jsPDF) {
    alert("PDF保存の準備ができていません。画面を再読み込みしてからもう一度お試しください。");
    return;
  }

  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "保存中...";

  try {
    const canvas = await window.html2canvas(printArea, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      onclone: prepareSummaryPdfClone,
    });
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const margin = 15;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2;
    const ratio = Math.min(maxWidth / canvas.width, maxHeight / canvas.height);
    const imageWidth = canvas.width * ratio;
    const imageHeight = canvas.height * ratio;
    const x = (pageWidth - imageWidth) / 2;
    const y = margin;

    pdf.addImage(canvas.toDataURL("image/png"), "PNG", x, y, imageWidth, imageHeight);
    pdf.save(getSummaryPdfFileName());
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
    const value = usesSummaryTargets() ? getSummaryTargetValue(item.key) : targetTotals[item.key];

    if (usesSummaryTargets() && canAccessAdmin()) {
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
    const dayTotals = getDayTotals(date.id);
    const tr = document.createElement("tr");

    const dateCell = document.createElement("th");
    dateCell.textContent = date.label;
    tr.appendChild(dateCell);

    getActiveItems().forEach((item) => {
      const td = document.createElement("td");
      const value = dayTotals[item.key] || "";
      td.innerHTML = `<span class="summary-value">${value}</span><span class="summary-unit">${item.unit}</span>`;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  const totalRow = content.querySelector("#weeklyTotalRow");
  const finalTotals = getFinalTotals();
  const labelCell = document.createElement("th");
  labelCell.textContent = "最終";
  totalRow.appendChild(labelCell);

  getActiveItems().forEach((item) => {
    const td = document.createElement("td");
    const value = finalTotals[item.key] || "";
    td.innerHTML = `<span class="summary-value">${value}</span><span class="summary-unit">${item.unit}</span>`;
    totalRow.appendChild(td);
  });

  pageContainer.innerHTML = "";
  pageContainer.appendChild(content);
}

function render() {
  renderTabs();
  appTitle.textContent = `${getActiveCeremonyConfig().name}毎日集計`;

  if (activeTab === "summary") {
    renderSummaryPage();
  } else if (activeTab === "admin") {
    renderAdminPage();
  } else {
    renderInputPage(activeTab);
  }
}
