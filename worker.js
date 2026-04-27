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
];

const FELLOWSHIP_NAMES = ["大江戸", "お台場", "羽田", "かながわ", "富士山", "駿天", "埼玉", "千葉", "山梨"];
const STATE_ID = "main";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function createEmptyTargets() {
  return Object.fromEntries(DEFAULT_ITEMS.map((item) => [item, 0]));
}

function createDefaultState() {
  return {
    settings: {
      weekStart: todayISO(),
      itemCount: 9,
      activeTab: FELLOWSHIP_NAMES[0],
      seekerStart: "2026-04-28",
    },
    fellowships: Object.fromEntries(FELLOWSHIP_NAMES.map((name) => [name, {}])),
    targets: createEmptyTargets(),
  };
}

function normalizeState(rawState) {
  const state = rawState || createDefaultState();

  state.settings = {
    ...createDefaultState().settings,
    ...(state.settings || {}),
  };

  state.fellowships = state.fellowships || {};
  FELLOWSHIP_NAMES.forEach((name) => {
    if (!state.fellowships[name]) {
      state.fellowships[name] = {};
    }
  });

  state.targets = {
    ...createEmptyTargets(),
    ...(state.targets || {}),
  };

  return state;
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
    if (!state.fellowships[fellowship]) {
      state.fellowships[fellowship] = {};
    }
    if (!state.fellowships[fellowship][dateId]) {
      state.fellowships[fellowship][dateId] = createEmptyTargets();
    }
    state.fellowships[fellowship][dateId][itemKey] = toNumber(patch.value);
  } else if (patch.type === "target") {
    state.targets[patch.itemKey] = toNumber(patch.value);
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
