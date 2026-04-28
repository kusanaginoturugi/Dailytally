const DEFAULT_ITEMS = [
  "seekers",
  "tenchi",
  "goma",
  "nyoi",
  "sanki",
  "ryuge",
  "fuda",
  "zaitama",
  "symbols",
  "water",
  "extra1",
];

const FELLOWSHIP_NAMES = ["大江戸", "お台場", "羽田", "かながわ", "富士山", "駿天", "埼玉", "千葉", "山梨"];
const STATE_ID = "main";
const SETTINGS_SCHEMA_VERSION = 2;
const MIN_ITEM_COUNT = 1;
const MAX_ITEM_COUNT = DEFAULT_ITEMS.length;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function addDaysISO(iso, days) {
  const date = new Date(`${iso}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function createEmptyTargets() {
  return Object.fromEntries(DEFAULT_ITEMS.map((item) => [item, 0]));
}

function createEmptyFellowshipTargets() {
  return Object.fromEntries(FELLOWSHIP_NAMES.map((name) => [name, createEmptyTargets()]));
}

function createEmptyUser() {
  return {
    loginId: "",
    fellowship: "",
    name: "",
    email: "",
  };
}

function createDefaultState() {
  return {
    settings: {
      weekStart: todayISO(),
      weekEnd: addDaysISO(todayISO(), 6),
      itemCount: 10,
      activeTab: "admin",
      seekerStart: "2026-04-28",
      ceremonyName: "八大明王護摩供",
      schemaVersion: SETTINGS_SCHEMA_VERSION,
    },
    fellowships: Object.fromEntries(FELLOWSHIP_NAMES.map((name) => [name, {}])),
    targets: createEmptyTargets(),
    fellowshipTargets: createEmptyFellowshipTargets(),
    users: [],
  };
}

function normalizeState(rawState) {
  const state = rawState || createDefaultState();

  state.settings = {
    ...createDefaultState().settings,
    ...(state.settings || {}),
  };
  state.settings.itemCount = normalizeItemCount(state.settings.itemCount, state.settings.schemaVersion);
  if (!state.settings.ceremonyName) {
    state.settings.ceremonyName = "八大明王護摩供";
  }
  if (!state.settings.weekEnd) {
    state.settings.weekEnd = addDaysISO(state.settings.weekStart, 6);
  }
  if (state.settings.weekEnd < state.settings.weekStart) {
    state.settings.weekEnd = state.settings.weekStart;
  }
  state.settings.schemaVersion = SETTINGS_SCHEMA_VERSION;
  state.users = Array.isArray(state.users) ? state.users.map((user) => ({ ...createEmptyUser(), ...user })) : [];

  state.fellowships = state.fellowships || {};
  state.fellowshipTargets = state.fellowshipTargets || {};
  FELLOWSHIP_NAMES.forEach((name) => {
    if (!state.fellowships[name]) {
      state.fellowships[name] = {};
    }
    if (!state.fellowshipTargets[name]) {
      state.fellowshipTargets[name] = { ...(state.targets || createEmptyTargets()) };
    }
    state.fellowshipTargets[name] = {
      ...createEmptyTargets(),
      ...state.fellowshipTargets[name],
    };
  });

  state.targets = {
    ...createEmptyTargets(),
    ...(state.targets || {}),
  };

  return state;
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

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  });
}

function readSSOHeader(request, name) {
  const value = request.headers.get(name);
  if (!value) {
    return "";
  }
  try {
    return decodeURIComponent(value);
  } catch (_error) {
    return value;
  }
}

function getCurrentUser(request) {
  const email = readSSOHeader(request, "x-dailytally-email") || readSSOHeader(request, "cf-access-authenticated-user-email");
  const user = {
    loginId: readSSOHeader(request, "x-dailytally-login-id") || email,
    fellowship: readSSOHeader(request, "x-dailytally-fellowship"),
    name: readSSOHeader(request, "x-dailytally-name"),
    email,
  };

  return Object.values(user).some((value) => String(value || "").trim() !== "") ? user : createEmptyUser();
}

function canWriteFellowship(request, fellowship) {
  const user = getCurrentUser(request);
  return !user.fellowship || user.fellowship === fellowship;
}

async function readState(db) {
  const row = await db.prepare("SELECT data FROM app_state WHERE id = ?").bind(STATE_ID).first();
  return normalizeState(row ? JSON.parse(row.data) : null);
}

async function writeState(db, state) {
  await db
    .prepare(
      "INSERT INTO app_state (id, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) " +
        "ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP",
    )
    .bind(STATE_ID, JSON.stringify(normalizeState(state)))
    .run();
}

function toNumber(value) {
  return Math.max(0, Number(value) || 0);
}

async function handleStatePatch(request, env) {
  const patch = await request.json();
  const state = await readState(env.DB);

  if (patch.type === "settings") {
    state.settings = {
      ...state.settings,
      ...(patch.settings || {}),
    };
  } else if (patch.type === "value") {
    const { fellowship, dateId, itemKey } = patch;
    if (!canWriteFellowship(request, fellowship)) {
      return jsonResponse({ error: "Forbidden" }, { status: 403 });
    }
    if (!state.fellowships[fellowship]) {
      state.fellowships[fellowship] = {};
    }
    if (!state.fellowships[fellowship][dateId]) {
      state.fellowships[fellowship][dateId] = createEmptyTargets();
    }
    state.fellowships[fellowship][dateId][itemKey] = toNumber(patch.value);
  } else if (patch.type === "target") {
    if (patch.fellowship) {
      if (!canWriteFellowship(request, patch.fellowship)) {
        return jsonResponse({ error: "Forbidden" }, { status: 403 });
      }
      if (!state.fellowshipTargets[patch.fellowship]) {
        state.fellowshipTargets[patch.fellowship] = createEmptyTargets();
      }
      state.fellowshipTargets[patch.fellowship][patch.itemKey] = toNumber(patch.value);
    } else {
      state.targets[patch.itemKey] = toNumber(patch.value);
    }
  } else if (patch.type === "users") {
    state.users = Array.isArray(patch.users) ? patch.users.map((user) => ({ ...createEmptyUser(), ...user })) : [];
  } else if (patch.type === "replace") {
    await writeState(env.DB, patch.state);
    return jsonResponse({ ok: true, state: normalizeState(patch.state) });
  } else {
    return jsonResponse({ error: "Unsupported patch type" }, { status: 400 });
  }

  await writeState(env.DB, state);
  return jsonResponse({ ok: true, state });
}

async function handleApi(request, env) {
  const url = new URL(request.url);

  if (url.pathname === "/api/state" && request.method === "GET") {
    return jsonResponse(await readState(env.DB));
  }

  if (url.pathname === "/api/state" && request.method === "PATCH") {
    return handleStatePatch(request, env);
  }

  if (url.pathname === "/api/me" && request.method === "GET") {
    return jsonResponse(getCurrentUser(request));
  }

  return jsonResponse({ error: "Not found" }, { status: 404 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return handleApi(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
