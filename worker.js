import puppeteer from "@cloudflare/puppeteer";

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
];

const REPORT_ITEMS = [
  { key: "seekers", summaryLabel: "得道者数", unit: "人" },
  { key: "tenchi", summaryLabel: "この護摩供に向けての天地免劫護摩木", unit: "本" },
  { key: "goma", summaryLabel: "この護摩供に向けての各種護摩木", unit: "本" },
  { key: "nyoi", summaryLabel: "八大明王如意棒", unit: "本" },
  { key: "sanki", summaryLabel: "三期滅劫之霊木", unit: "本" },
  { key: "ryuge", summaryLabel: "三會龍華之御柱", unit: "本" },
  { key: "fuda", summaryLabel: "八大明王札", unit: "体" },
  { key: "zaitama", summaryLabel: "明王招財玉", unit: "組" },
  { key: "symbols", summaryLabel: "各種符", unit: "枚" },
  { key: "water", summaryLabel: "御神水・泉・龍華水等", unit: "箱" },
];

const FELLOWSHIP_NAMES = ["大江戸", "お台場", "羽田", "かながわ", "富士山", "駿天", "埼玉", "千葉", "山梨"];
const CEREMONY_IDS = [
  "hachidai-myo-o",
  "daigen-chiku",
  "jizo-sonno",
  "segaki-kuyo",
  "hokuto-chinatsu",
  "rokuson-hoju",
  "chosei-minami",
  "myozen-enma",
  "chinkon-shikai",
];
const DEFAULT_CEREMONY_ID = CEREMONY_IDS[0];
const STATE_ID = "main";
const SETTINGS_SCHEMA_VERSION = 2;
const MIN_ITEM_COUNT = 1;
const MAX_ITEM_COUNT = DEFAULT_ITEMS.length;
const FINAL_ROW_ID = "__final__";
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DEFAULT_REPORT_BRANCH_CODE = "99300";
const SESSION_COOKIE_NAME = "dailytally_session";
const OIDC_COOKIE_NAME = "dailytally_oidc";
const SESSION_TTL_SECONDS = 8 * 60 * 60;
const TENDO_LOGIN_URL = "https://tendo.net/advanced/login.php?url=/advanced/index.php";
const TENDO_ONLINE_URL = "https://tendo.net/advanced/online.php";
const CEREMONY_DATE_PRESETS = {
  "jizo-sonno": { endMonth: 6, endDay: 20 },
  "segaki-kuyo": { endMonth: 8, endDay: 9 },
  "hokuto-chinatsu": { endMonth: 9, endDay: 13 },
  "rokuson-hoju": { endMonth: 10, endDay: 11 },
  "chosei-minami": { endMonth: 11, endDay: 8 },
  "myozen-enma": { endMonth: 11, endDay: 23 },
};

function todayISO() {
  return new Date(Date.now() + JST_OFFSET_MS).toISOString().slice(0, 10);
}

function addDaysISO(iso, days) {
  const date = new Date(`${iso}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function isValidISODate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) {
    return false;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function getCeremonyDatePreset(ceremonyId) {
  const preset = CEREMONY_DATE_PRESETS[ceremonyId];
  if (!preset) {
    return null;
  }

  const year = Number(todayISO().slice(0, 4));
  const weekEnd = `${year}-${String(preset.endMonth).padStart(2, "0")}-${String(preset.endDay).padStart(2, "0")}`;
  return {
    key: `${year}-${ceremonyId}-${preset.endMonth}-${preset.endDay}`,
    weekStart: addDaysISO(weekEnd, -7),
    weekEnd,
  };
}

function ensureCeremonyDates(ceremonyData, ceremonyId) {
  const today = todayISO();
  const currentYear = Number(today.slice(0, 4));
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

  if (!isValidISODate(ceremonyData.weekStart) || Number(ceremonyData.weekStart.slice(0, 4)) < currentYear) {
    ceremonyData.weekStart = today;
  }

  if (!isValidISODate(ceremonyData.weekEnd) || Number(ceremonyData.weekEnd.slice(0, 4)) < currentYear) {
    ceremonyData.weekEnd = addDaysISO(ceremonyData.weekStart, 7);
  }

  if (ceremonyData.weekEnd < ceremonyData.weekStart) {
    ceremonyData.weekEnd = addDaysISO(ceremonyData.weekStart, 7);
  }
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
      weekStart: todayISO(),
      weekEnd: addDaysISO(todayISO(), 7),
      itemCount: 10,
      activeTab: "admin",
      seekerStart: "2026-04-28",
      ceremonyName: "八大明王護摩供",
      ceremonyId: DEFAULT_CEREMONY_ID,
      schemaVersion: SETTINGS_SCHEMA_VERSION,
    },
    fellowships: Object.fromEntries(FELLOWSHIP_NAMES.map((name) => [name, {}])),
    targets: createEmptyTargets(),
    fellowshipTargets: createEmptyFellowshipTargets(),
    ceremonyData: {},
    users: [],
    reportAutomation: createDefaultReportAutomation(),
  };
}

function normalizeState(rawState) {
  const state = rawState || createDefaultState();

  state.settings = {
    ...createDefaultState().settings,
    ...(state.settings || {}),
  };
  if (!CEREMONY_IDS.includes(state.settings.ceremonyId)) {
    state.settings.ceremonyId = DEFAULT_CEREMONY_ID;
  }
  state.settings.itemCount = normalizeItemCount(state.settings.itemCount, state.settings.schemaVersion);
  if (!state.settings.ceremonyName) {
    state.settings.ceremonyName = "八大明王護摩供";
  }
  if (!state.settings.weekEnd) {
    state.settings.weekEnd = addDaysISO(state.settings.weekStart, 7);
  }
  if (state.settings.weekEnd < state.settings.weekStart) {
    state.settings.weekEnd = addDaysISO(state.settings.weekStart, 7);
  }
  state.settings.schemaVersion = SETTINGS_SCHEMA_VERSION;
  state.users = Array.isArray(state.users) ? state.users.map((user) => ({ ...createEmptyUser(), ...user })) : [];
  state.reportAutomation = {
    ...createDefaultReportAutomation(),
    ...(state.reportAutomation || {}),
  };

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

  if (!state.ceremonyData) {
    state.ceremonyData = {
      [DEFAULT_CEREMONY_ID]: {
        weekStart: state.settings.weekStart,
        weekEnd: state.settings.weekEnd,
        seekerStart: state.settings.seekerStart,
        fellowships: state.fellowships,
        targets: state.targets,
        summaryTargetOverrides: state.summaryTargetOverrides || {},
        fellowshipTargets: state.fellowshipTargets,
      },
    };
  }

  CEREMONY_IDS.forEach((ceremonyId) => {
    if (!state.ceremonyData[ceremonyId]) {
      state.ceremonyData[ceremonyId] = {
        weekStart: todayISO(),
        weekEnd: addDaysISO(todayISO(), 7),
        seekerStart: ceremonyId === DEFAULT_CEREMONY_ID ? "2026-04-28" : "",
        fellowships: Object.fromEntries(FELLOWSHIP_NAMES.map((name) => [name, {}])),
        targets: createEmptyTargets(),
        summaryTargetOverrides: {},
        fellowshipTargets: createEmptyFellowshipTargets(),
      };
    }

    const ceremonyData = state.ceremonyData[ceremonyId];
    ensureCeremonyDates(ceremonyData, ceremonyId);
    ceremonyData.seekerStart = ceremonyData.seekerStart ?? "";
    ceremonyData.fellowships = ceremonyData.fellowships || {};
    ceremonyData.targets = {
      ...createEmptyTargets(),
      ...(ceremonyData.targets || {}),
    };
    ceremonyData.summaryTargetOverrides = {
      ...(ceremonyData.summaryTargetOverrides || {}),
    };
    ceremonyData.fellowshipTargets = ceremonyData.fellowshipTargets || {};

    FELLOWSHIP_NAMES.forEach((name) => {
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

function isOidcConfigured(env) {
  return Boolean(env.AUTHENTIK_ISSUER && env.AUTHENTIK_CLIENT_ID && env.AUTHENTIK_CLIENT_SECRET && env.SESSION_SECRET);
}

function base64UrlEncode(input) {
  const bytes = input instanceof Uint8Array ? input : new TextEncoder().encode(String(input));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function parseCookies(request) {
  return Object.fromEntries(
    (request.headers.get("cookie") || "")
      .split(";")
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map((cookie) => {
        const index = cookie.indexOf("=");
        return index === -1 ? [cookie, ""] : [cookie.slice(0, index), cookie.slice(index + 1)];
      }),
  );
}

async function hmacSignature(secret, payload) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return base64UrlEncode(new Uint8Array(signature));
}

async function createSignedCookieValue(secret, data) {
  const payload = base64UrlEncode(JSON.stringify(data));
  const signature = await hmacSignature(secret, payload);
  return `${payload}.${signature}`;
}

async function readSignedCookieValue(secret, value) {
  if (!value) {
    return null;
  }
  const [payload, signature] = value.split(".");
  if (!payload || !signature) {
    return null;
  }
  const expected = await hmacSignature(secret, payload);
  if (signature !== expected) {
    return null;
  }
  try {
    return JSON.parse(new TextDecoder().decode(base64UrlDecode(payload)));
  } catch (_error) {
    return null;
  }
}

function buildCookie(name, value, options = {}) {
  const parts = [`${name}=${value}`, "Path=/", "HttpOnly", "Secure", "SameSite=Lax"];
  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
  }
  return parts.join("; ");
}

function redirectResponse(location, headers = {}) {
  return new Response(null, {
    status: 302,
    headers: {
      location,
      ...headers,
    },
  });
}

async function getOidcConfig(env) {
  const issuer = env.AUTHENTIK_ISSUER.replace(/\/+$/, "");
  const response = await fetch(`${issuer}/.well-known/openid-configuration`);
  if (!response.ok) {
    throw new Error(`OIDC discovery returned ${response.status}`);
  }
  return response.json();
}

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

async function sha256Base64Url(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return base64UrlEncode(new Uint8Array(digest));
}

function getRedirectUri(request) {
  const url = new URL(request.url);
  return `${url.origin}/auth/callback`;
}

async function handleAuthLogin(request, env) {
  const config = await getOidcConfig(env);
  const url = new URL(request.url);
  const state = randomToken();
  const verifier = randomToken();
  const challenge = await sha256Base64Url(verifier);
  const rd = url.searchParams.get("rd") || "/";
  const oidcCookie = await createSignedCookieValue(env.SESSION_SECRET, {
    state,
    verifier,
    rd,
    exp: Math.floor(Date.now() / 1000) + 10 * 60,
  });
  const authUrl = new URL(config.authorization_endpoint);
  authUrl.searchParams.set("client_id", env.AUTHENTIK_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", getRedirectUri(request));
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid profile email groups");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("code_challenge", challenge);
  authUrl.searchParams.set("code_challenge_method", "S256");
  return redirectResponse(authUrl.toString(), {
    "set-cookie": buildCookie(OIDC_COOKIE_NAME, oidcCookie, { maxAge: 10 * 60 }),
  });
}

async function fetchOidcUser(config, tokenSet) {
  let claims = {};
  if (tokenSet.id_token) {
    claims = decodeJwtPayload(tokenSet.id_token) || {};
  }
  if (config.userinfo_endpoint && tokenSet.access_token) {
    const response = await fetch(config.userinfo_endpoint, {
      headers: { authorization: `Bearer ${tokenSet.access_token}` },
    });
    if (response.ok) {
      claims = {
        ...claims,
        ...(await response.json()),
      };
    }
  }
  return claims;
}

function decodeJwtPayload(token) {
  const parts = String(token || "").split(".");
  if (parts.length < 2) {
    return {};
  }
  try {
    return JSON.parse(new TextDecoder().decode(base64UrlDecode(parts[1])));
  } catch (_error) {
    return {};
  }
}

function normalizeOidcUser(claims) {
  const rawGroups = Array.isArray(claims.groups)
    ? claims.groups
    : Array.isArray(claims.group)
      ? claims.group
      : Array.isArray(claims.ak_groups)
        ? claims.ak_groups
        : typeof claims.groups === "string"
          ? claims.groups.split(/[,\s|]+/)
          : typeof claims.group === "string"
            ? claims.group.split(/[,\s|]+/)
            : typeof claims.ak_groups === "string"
              ? claims.ak_groups.split(/[,\s|]+/)
              : [];
  const groups = rawGroups.map((group) => String(group));
  const fellowship = groups.find((group) => FELLOWSHIP_NAMES.includes(group)) || "";
  const role = groups.some((group) => ["admin", "dailytally-admin", "管理者"].includes(group)) ? "admin" : "";
  return {
    loginId: claims.preferred_username || claims.nickname || claims.email || claims.sub || "",
    fellowship,
    name: claims.name || claims.preferred_username || "",
    email: claims.email || "",
    role,
    groups,
  };
}

async function handleAuthCallback(request, env) {
  const url = new URL(request.url);
  const cookies = parseCookies(request);
  const oidcState = await readSignedCookieValue(env.SESSION_SECRET, cookies[OIDC_COOKIE_NAME]);
  if (!oidcState || oidcState.exp < Math.floor(Date.now() / 1000) || oidcState.state !== url.searchParams.get("state")) {
    return new Response("Invalid login state", { status: 400 });
  }
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("Missing authorization code", { status: 400 });
  }

  const config = await getOidcConfig(env);
  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("client_id", env.AUTHENTIK_CLIENT_ID);
  body.set("client_secret", env.AUTHENTIK_CLIENT_SECRET);
  body.set("code", code);
  body.set("redirect_uri", getRedirectUri(request));
  body.set("code_verifier", oidcState.verifier);

  const tokenResponse = await fetch(config.token_endpoint, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!tokenResponse.ok) {
    return new Response("Token exchange failed", { status: 502 });
  }

  const tokenSet = await tokenResponse.json();
  const claims = await fetchOidcUser(config, tokenSet);
  const user = normalizeOidcUser(claims);
  const session = await createSignedCookieValue(env.SESSION_SECRET, {
    user,
    accessToken: tokenSet.access_token || "",
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  });

  const response = redirectResponse(oidcState.rd || "/");
  response.headers.append("set-cookie", buildCookie(SESSION_COOKIE_NAME, session, { maxAge: SESSION_TTL_SECONDS }));
  response.headers.append("set-cookie", buildCookie(OIDC_COOKIE_NAME, "", { maxAge: 0 }));
  return response;
}

function handleAuthLogout() {
  return redirectResponse("/", {
    "set-cookie": buildCookie(SESSION_COOKIE_NAME, "", { maxAge: 0 }),
  });
}

async function readSession(request, env) {
  const session = await readSignedCookieValue(env.SESSION_SECRET, parseCookies(request)[SESSION_COOKIE_NAME]);
  if (!session || session.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }
  if (isOidcConfigured(env) && !session.accessToken) {
    return null;
  }
  return session;
}

async function readSessionUser(request, env) {
  const session = await readSession(request, env);
  return session?.user || null;
}

async function refreshSessionUser(request, env) {
  const session = await readSession(request, env);
  if (!session) {
    return null;
  }
  if (!isOidcConfigured(env) || !session.accessToken) {
    return { user: session.user || null };
  }

  try {
    const config = await getOidcConfig(env);
    if (!config.userinfo_endpoint) {
      return { user: session.user || null };
    }

    const response = await fetch(config.userinfo_endpoint, {
      headers: { authorization: `Bearer ${session.accessToken}` },
    });
    if (!response.ok) {
      return { user: session.user || null };
    }

    const user = normalizeOidcUser(await response.json());
    const updatedSession = await createSignedCookieValue(env.SESSION_SECRET, {
      ...session,
      user,
      exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    });
    return {
      user,
      cookie: buildCookie(SESSION_COOKIE_NAME, updatedSession, { maxAge: SESSION_TTL_SECONDS }),
    };
  } catch (_error) {
    return { user: session.user || null };
  }
}

function requestWithUserHeaders(request, user) {
  const headers = new Headers(request.headers);
  const encodeHeaderValue = (value) => encodeURIComponent(String(value || ""));
  headers.set("x-dailytally-login-id", encodeHeaderValue(user.loginId));
  headers.set("x-dailytally-fellowship", encodeHeaderValue(user.fellowship));
  headers.set("x-dailytally-name", encodeHeaderValue(user.name));
  headers.set("x-dailytally-email", encodeHeaderValue(user.email));
  headers.set("x-dailytally-role", encodeHeaderValue(user.role));
  return new Request(request, { headers });
}

async function authenticateRequest(request, env) {
  if (!isOidcConfigured(env)) {
    return { request };
  }

  const url = new URL(request.url);
  if (url.pathname.startsWith("/auth/")) {
    return { request };
  }

  const user = await readSessionUser(request, env);
  if (!user) {
    const loginUrl = new URL("/auth/login", url.origin);
    loginUrl.searchParams.set("rd", `${url.pathname}${url.search}`);
    return { response: redirectResponse(loginUrl.toString()) };
  }

  return { request: requestWithUserHeaders(request, user), user };
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

function parseSSOGroups(value) {
  return String(value || "")
    .split(/[,\s|]+/)
    .map((group) => group.trim())
    .filter(Boolean);
}

function getCurrentUser(request) {
  const groups = parseSSOGroups(readSSOHeader(request, "x-authentik-groups"));
  const fellowship = readSSOHeader(request, "x-dailytally-fellowship") || groups.find((group) => FELLOWSHIP_NAMES.includes(group)) || "";
  const role =
    readSSOHeader(request, "x-dailytally-role") ||
    (groups.some((group) => ["admin", "dailytally-admin", "管理者"].includes(group)) ? "admin" : "");
  const email =
    readSSOHeader(request, "x-dailytally-email") ||
    readSSOHeader(request, "x-authentik-email") ||
    readSSOHeader(request, "cf-access-authenticated-user-email");
  const user = {
    loginId: readSSOHeader(request, "x-dailytally-login-id") || readSSOHeader(request, "x-authentik-username") || email,
    fellowship,
    name: readSSOHeader(request, "x-dailytally-name") || readSSOHeader(request, "x-authentik-name"),
    email,
    role,
  };

  return Object.values(user).some((value) => String(value || "").trim() !== "") ? user : createEmptyUser();
}

function hasUserIdentity(user) {
  return ["loginId", "fellowship", "name", "email", "role"].some((key) => String(user?.[key] || "").trim() !== "");
}

function canWriteFellowship(request, fellowship) {
  const user = getCurrentUser(request);
  if (!hasUserIdentity(user)) {
    return true;
  }
  return user.role === "admin" || user.fellowship === fellowship;
}

function canWriteAdmin(request) {
  const user = getCurrentUser(request);
  if (!hasUserIdentity(user)) {
    return true;
  }
  return user.role === "admin";
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

function nowJST(date = new Date()) {
  return new Date(date.getTime() + JST_OFFSET_MS);
}

function formatJSTTimestamp(date = new Date()) {
  return nowJST(date).toISOString().replace("T", " ").slice(0, 16);
}

function formatShortDate(iso) {
  if (!iso) {
    return "";
  }
  const [, month, day] = iso.split("-").map(Number);
  return `${month}/${day}`;
}

function getWeekDates(ceremonyData) {
  if (!ceremonyData.weekStart || !ceremonyData.weekEnd) {
    return [];
  }

  const dates = [];
  let current = ceremonyData.weekStart;
  while (current < ceremonyData.weekEnd && dates.length < 366) {
    dates.push({ id: current, label: formatShortDate(current) });
    current = addDaysISO(current, 1);
  }
  return dates;
}

function getStoredValue(ceremonyData, fellowship, dateId, itemKey) {
  return Number(ceremonyData.fellowships?.[fellowship]?.[dateId]?.[itemKey]) || 0;
}

function getPreviousCumulativeValue(ceremonyData, fellowship, dateId, itemKey) {
  const normalizedDateId = dateId === FINAL_ROW_ID ? ceremonyData.weekEnd : dateId;
  let previousValue = 0;

  getWeekDates(ceremonyData).forEach((date) => {
    if (date.id < normalizedDateId) {
      const value = getStoredValue(ceremonyData, fellowship, date.id, itemKey);
      if (value > 0) {
        previousValue = value;
      }
    }
  });

  return previousValue;
}

function getDayTotals(ceremonyData, dateId) {
  const totals = Object.fromEntries(REPORT_ITEMS.map((item) => [item.key, 0]));
  FELLOWSHIP_NAMES.forEach((fellowship) => {
    REPORT_ITEMS.forEach((item) => {
      totals[item.key] += getStoredValue(ceremonyData, fellowship, dateId, item.key);
    });
  });
  return totals;
}

function getCarriedValue(ceremonyData, fellowship, dateId, itemKey) {
  let carriedValue = 0;
  getWeekDates(ceremonyData).forEach((date) => {
    if (date.id <= dateId) {
      const value = getStoredValue(ceremonyData, fellowship, date.id, itemKey);
      if (value > 0) {
        carriedValue = value;
      }
    }
  });
  return carriedValue;
}

function getCarriedDayTotals(ceremonyData, dateId) {
  const totals = Object.fromEntries(REPORT_ITEMS.map((item) => [item.key, 0]));
  FELLOWSHIP_NAMES.forEach((fellowship) => {
    REPORT_ITEMS.forEach((item) => {
      totals[item.key] += getCarriedValue(ceremonyData, fellowship, dateId, item.key);
    });
  });
  return totals;
}

function getCumulativeDayTotals(ceremonyData, dateId) {
  return dateId <= todayISO() ? getCarriedDayTotals(ceremonyData, dateId) : null;
}

function getFinalTotals(ceremonyData) {
  const totals = Object.fromEntries(REPORT_ITEMS.map((item) => [item.key, 0]));
  FELLOWSHIP_NAMES.forEach((fellowship) => {
    REPORT_ITEMS.forEach((item) => {
      totals[item.key] += getStoredValue(ceremonyData, fellowship, ceremonyData.weekEnd, item.key) || getStoredValue(ceremonyData, fellowship, FINAL_ROW_ID, item.key);
    });
  });
  return totals;
}

function getTargetValue(ceremonyData, fellowship, itemKey) {
  return Number(ceremonyData.fellowshipTargets?.[fellowship]?.[itemKey]) || 0;
}

function getTargetTotals(ceremonyData) {
  const totals = Object.fromEntries(REPORT_ITEMS.map((item) => [item.key, 0]));
  FELLOWSHIP_NAMES.forEach((fellowship) => {
    REPORT_ITEMS.forEach((item) => {
      totals[item.key] += getTargetValue(ceremonyData, fellowship, item.key);
    });
  });
  return totals;
}

function getSummaryTargetValue(ceremonyData, itemKey, fallbackValue) {
  const overrides = ceremonyData.summaryTargetOverrides || {};
  return Object.prototype.hasOwnProperty.call(overrides, itemKey) ? Number(overrides[itemKey]) || 0 : fallbackValue;
}

function getCumulativeFinalTotals(ceremonyData) {
  if (ceremonyData.weekEnd > todayISO()) {
    return null;
  }

  const finalTotals = getFinalTotals(ceremonyData);
  const carriedTotals = getCarriedDayTotals(ceremonyData, ceremonyData.weekEnd);
  const totals = Object.fromEntries(REPORT_ITEMS.map((item) => [item.key, 0]));
  REPORT_ITEMS.forEach((item) => {
    totals[item.key] = finalTotals[item.key] || carriedTotals[item.key];
  });
  return totals;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderSummaryHeaderCell(item, ceremonyData) {
  if (item.key === "seekers") {
    const date = ceremonyData.seekerStart ? `<span class="horizontal-date">(${escapeHtml(formatShortDate(ceremonyData.seekerStart))}～)</span>` : "";
    return `得道者数${date}`;
  }
  if (item.key === "tenchi") {
    return "この護摩供に<br>向けての<br>天地免劫護摩木";
  }
  if (item.key === "goma") {
    return "この護摩供に<br>向けての<br>各種護摩木";
  }
  if (item.key === "water") {
    if (item.summaryLabel === "御神水・命泉・泉・龍華水・禄存五聖杯") {
      return "御神水・命泉・<br>泉・龍華水・<br>禄存五聖杯";
    }
    if (item.summaryLabel === "御神水・泉・龍華水等") {
      return "御神水・泉・<br>龍華水等";
    }
    if (item.summaryLabel === "御神水・命泉・泉・龍華水等") {
      return "御神水・命泉・<br>泉・龍華水等";
    }
    if (item.summaryLabel === "御神水・命泉・泉・龍華水") {
      return "御神水・命泉・<br>泉・龍華水";
    }
  }
  return escapeHtml(item.summaryLabel);
}

function getDueSendKey(state, today) {
  const ceremonyData = getCeremonyData(state, state.settings.ceremonyId);
  return `${state.settings.ceremonyId}:${today || ceremonyData.weekEnd}:${state.reportAutomation.sendTime}`;
}

function addReportHistory(report, entry) {
  report.history = [
    {
      at: formatJSTTimestamp(),
      key: report.lastAttemptKey || "",
      status: "",
      message: "",
      ...entry,
    },
    ...(Array.isArray(report.history) ? report.history : []),
  ].slice(0, 20);
}

function isReportDue(state, date = new Date()) {
  const report = state.reportAutomation;
  if (!report.enabled || !/^\d{2}:\d{2}$/.test(report.sendTime || "")) {
    return false;
  }

  const ceremonyData = getCeremonyData(state, state.settings.ceremonyId);
  const [hour, minute] = report.sendTime.split(":").map(Number);
  const jst = nowJST(date);
  const today = jst.toISOString().slice(0, 10);
  const currentMinutes = jst.getUTCHours() * 60 + jst.getUTCMinutes();
  const targetMinutes = hour * 60 + minute;

  const sendKey = getDueSendKey(state, today);
  return today >= ceremonyData.weekStart && today <= ceremonyData.weekEnd && currentMinutes >= targetMinutes && report.lastSentKey !== sendKey && report.lastAttemptKey !== sendKey;
}

function parseCookieHeaders(headers) {
  const cookies = headers.getSetCookie?.() || [];
  const fallback = headers.get("set-cookie");
  return (cookies.length ? cookies : fallback ? [fallback] : [])
    .map((cookie) => cookie.split(";")[0])
    .join("; ");
}

function extractLoginToken(html) {
  return html.match(/name="token"\s+value="([^"]+)"/)?.[1] || "";
}

function buildSummaryReportHtml(state) {
  const ceremonyData = getCeremonyData(state, state.settings.ceremonyId);
  const rows = [];

  rows.push(`
    <tr class="title-row">
      <th colspan="${REPORT_ITEMS.length + 1}">～第31回八大明王護摩供　集計表～　報告数は累計数です</th>
    </tr>
    <tr class="meta-row">
      <th colspan="3"><span class="meta-label">聖院名:</span><span class="meta-value">聖明王院</span></th>
      <th colspan="3" class="meta-person"><span class="meta-label">ご担当者名:</span><span class="meta-value">尾ノ上裕美</span></th>
      <th colspan="${Math.max(1, REPORT_ITEMS.length - 5)}" class="meta-phone"><span class="meta-label">電話番号:</span><span class="meta-value">09041779036</span></th>
    </tr>
    <tr class="header-row">
      <th></th>
      ${REPORT_ITEMS.map((item) => `<th>${renderSummaryHeaderCell(item, ceremonyData)}</th>`).join("")}
    </tr>
  `);

  const targetTotals = getTargetTotals(ceremonyData);
  rows.push(`
    <tr class="target-row">
      <th>目標</th>
      ${REPORT_ITEMS.map((item) => {
        const value = getSummaryTargetValue(ceremonyData, item.key, targetTotals[item.key]) || "";
        return `<td><span class="value">${escapeHtml(value)}</span><span class="unit">${escapeHtml(item.unit)}</span></td>`;
      }).join("")}
    </tr>
  `);

  getWeekDates(ceremonyData).forEach((date) => {
    const totals = getCumulativeDayTotals(ceremonyData, date.id);
    rows.push(`
      <tr>
        <th>${escapeHtml(date.label)}</th>
        ${REPORT_ITEMS.map((item) => {
          const value = totals?.[item.key] || "";
          return `<td><span class="value">${escapeHtml(value)}</span><span class="unit">${escapeHtml(item.unit)}</span></td>`;
        }).join("")}
      </tr>
    `);
  });

  const finalTotals = getCumulativeFinalTotals(ceremonyData);
  rows.push(`
    <tr class="final-row">
      <th>最終</th>
      ${REPORT_ITEMS.map((item) => {
        const value = finalTotals?.[item.key] || "";
        return `<td><span class="value">${escapeHtml(value)}</span><span class="unit">${escapeHtml(item.unit)}</span></td>`;
      }).join("")}
    </tr>
  `);

  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <style>
    @page { size: A4 landscape; }
    * { box-sizing: border-box; }
    html,
    body {
      width: 100%;
      height: 100%;
      margin: 0;
      color: #000;
      background: #fff;
      font-family: "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif CJK JP", serif;
    }
    .pdf-page {
      width: 100%;
      height: 194mm;
      display: flex;
      flex-direction: column;
    }
    table {
      width: 100%;
      flex: 1 1 auto;
      border-collapse: collapse;
      table-layout: fixed;
    }
    th,
    td {
      position: relative;
      border: 1.5px solid #000;
      background: #fff;
      color: #000;
      height: 38px;
      padding: 3px 4px;
      text-align: center;
      vertical-align: middle;
      font-size: 14px;
      line-height: 1.2;
    }
    .title-row th {
      height: 34px;
      font-size: 22px;
      font-weight: 500;
    }
    .meta-row th {
      position: relative;
      height: 30px;
      padding: 2px 8px;
      text-align: center;
      font-size: 18px;
      font-weight: 400;
    }
    .meta-label {
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      white-space: nowrap;
      z-index: 1;
    }
    .meta-value {
      position: absolute;
      inset: 2px 8px 2px 86px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .meta-person .meta-value {
      left: 126px;
    }
    .meta-phone .meta-value {
      left: 104px;
    }
    .header-row th {
      width: 110px;
      min-width: 84px;
      height: 166px;
      padding: 8px 6px;
      vertical-align: middle;
      white-space: normal;
      font-size: 18px;
      font-weight: 400;
      line-height: 1.25;
      writing-mode: vertical-rl;
      text-orientation: mixed;
    }
    .header-row th:first-child {
      width: 64px;
      min-width: 64px;
      writing-mode: horizontal-tb;
    }
    .horizontal-date {
      display: inline-block;
      writing-mode: horizontal-tb;
      font-size: 14px;
      margin-top: 8px;
    }
    tr:not(.title-row):not(.meta-row):not(.header-row) th {
      width: 64px;
      min-width: 64px;
      height: 52px;
      padding: 4px 6px;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
    }
    td {
      height: 52px;
      padding: 4px 7px;
      font-size: 18px;
      font-weight: 700;
    }
    .unit {
      position: absolute;
      right: 4px;
      bottom: 3px;
      font-size: 11px;
      font-weight: 400;
    }
    .note {
      margin: 0;
      border: 1.5px solid #000;
      border-top: 0;
      padding: 2px 6px;
      font-size: 14px;
      flex: 0 0 auto;
    }
  </style>
</head>
<body>
  <div class="pdf-page">
    <table>${rows.join("")}</table>
    <p class="note">※水は種類を問わず、箱数で記入(1箱20リットルとして計算願います)</p>
  </div>
</body>
</html>`;
}

async function tendoLogin(env) {
  if (!env.TENDO_ACCOUNT || !env.TENDO_PASSWORD) {
    throw new Error("TENDO_ACCOUNT/TENDO_PASSWORD secrets are not configured");
  }

  const loginPage = await fetch(TENDO_LOGIN_URL, { redirect: "follow" });
  const loginHtml = await loginPage.text();
  const token = extractLoginToken(loginHtml);
  const cookie = parseCookieHeaders(loginPage.headers);
  if (!token) {
    throw new Error("Could not find tendo.net login token");
  }

  const body = new URLSearchParams();
  body.set("ses_user", env.TENDO_ACCOUNT);
  body.set("ses_password", env.TENDO_PASSWORD);
  body.set("url", "/advanced/index.php");
  body.set("token", token);
  body.set("ses_login", "ログイン");

  const response = await fetch(TENDO_LOGIN_URL, {
    method: "POST",
    redirect: "follow",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      cookie,
      referer: TENDO_LOGIN_URL,
    },
    body,
  });
  const html = await response.text();
  const nextCookie = [cookie, parseCookieHeaders(response.headers)].filter(Boolean).join("; ");

  if (!html.includes("/advanced/logout.php")) {
    throw new Error("tendo.net login did not reach the advanced page");
  }

  return nextCookie;
}

async function generateSummaryPdf(env, state) {
  if (!env.BROWSER) {
    throw new Error("BROWSER binding is not configured");
  }

  const html = buildSummaryReportHtml(state);
  const browser = await puppeteer.launch(env.BROWSER);
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    return await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: {
        top: "8mm",
        right: "8mm",
        bottom: "8mm",
        left: "8mm",
      },
    });
  } finally {
    await browser.close();
  }
}

async function fetchReportPdf(env, state) {
  return generateSummaryPdf(env, state);
}

async function submitOnlineReport(env, state, cookie, pdfBuffer) {
  if (env.REPORT_REMOTE_SUBMIT !== "true") {
    throw new Error("REPORT_REMOTE_SUBMIT is not true");
  }

  const onlinePage = await fetch(TENDO_ONLINE_URL, {
    headers: { cookie },
    redirect: "follow",
  });
  const onlineHtml = await onlinePage.text();
  if (onlineHtml.includes("申請者登録フォーム")) {
    throw new Error("tendo.net applicant registration is not completed");
  }

  const postUrl = env.REPORT_ONLINE_POST_URL;
  const fileField = env.REPORT_ONLINE_FILE_FIELD || "file";
  if (!postUrl) {
    throw new Error("REPORT_ONLINE_POST_URL is not configured");
  }

  const formData = new FormData();
  formData.set("name", state.reportAutomation.senderName);
  formData.set("branch", state.reportAutomation.branchCode);
  formData.set(fileField, new File([pdfBuffer], "dailytally-report.pdf", { type: "application/pdf" }));

  const response = await fetch(postUrl, {
    method: "POST",
    headers: { cookie },
    body: formData,
    redirect: "follow",
  });
  const text = await response.text();
  if (!response.ok || /エラー|失敗|ログイン/.test(text)) {
    throw new Error(`tendo.net report submit returned ${response.status}`);
  }
}

async function sendNotification(env, report, subject, body) {
  if (!env.RESEND_API_KEY || !report.notifyEmail) {
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.REPORT_NOTIFY_FROM || "Dailytally <onboarding@resend.dev>",
      to: report.notifyEmail,
      subject,
      text: body,
    }),
  });
}

async function runScheduledReport(env) {
  const state = await readState(env.DB);
  const now = new Date();
  if (!isReportDue(state, now)) {
    return;
  }

  const report = state.reportAutomation;
  const sendKey = getDueSendKey(state, nowJST(now).toISOString().slice(0, 10));
  report.lastAttemptAt = formatJSTTimestamp();
  report.lastAttemptKey = sendKey;
  report.lastError = "";
  addReportHistory(report, {
    at: report.lastAttemptAt,
    key: sendKey,
    status: "送信開始",
    message: `${report.sendTime} の自動送信を開始`,
  });
  await writeState(env.DB, state);

  try {
    const cookie = await tendoLogin(env);
    const pdfBuffer = await fetchReportPdf(env, state);
    await submitOnlineReport(env, state, cookie, pdfBuffer);

    report.lastSuccessAt = formatJSTTimestamp();
    report.lastSentKey = sendKey;
    report.lastError = "";
    addReportHistory(report, {
      at: report.lastSuccessAt,
      key: sendKey,
      status: "成功",
      message: "オンライン報告を送信しました",
    });
    await writeState(env.DB, state);
    await sendNotification(env, report, "オンライン報告を送信しました", `送信完了: ${report.lastSuccessAt}`);
  } catch (error) {
    report.lastError = error instanceof Error ? error.message : String(error);
    addReportHistory(report, {
      at: formatJSTTimestamp(),
      key: sendKey,
      status: "失敗",
      message: report.lastError,
    });
    await writeState(env.DB, state);
    await sendNotification(env, report, "オンライン報告の送信に失敗しました", report.lastError);
    throw error;
  }
}

function toNumber(value) {
  return Math.max(0, Number(value) || 0);
}

function getCeremonyData(state, ceremonyId) {
  const normalizedCeremonyId = CEREMONY_IDS.includes(ceremonyId) ? ceremonyId : state.settings.ceremonyId;
  if (!state.ceremonyData[normalizedCeremonyId]) {
    state.ceremonyData[normalizedCeremonyId] = {
      weekStart: todayISO(),
      weekEnd: addDaysISO(todayISO(), 7),
      seekerStart: "",
      fellowships: Object.fromEntries(FELLOWSHIP_NAMES.map((name) => [name, {}])),
      targets: createEmptyTargets(),
      summaryTargetOverrides: {},
      fellowshipTargets: createEmptyFellowshipTargets(),
    };
  }
  ensureCeremonyDates(state.ceremonyData[normalizedCeremonyId], normalizedCeremonyId);
  return state.ceremonyData[normalizedCeremonyId];
}

async function handleStatePatch(request, env) {
  const patch = await request.json();
  const state = await readState(env.DB);

  if (patch.type === "settings") {
    state.settings = {
      ...state.settings,
      ...(patch.settings || {}),
    };
    if (patch.reportAutomation) {
      state.reportAutomation = {
        ...createDefaultReportAutomation(),
        ...state.reportAutomation,
        ...patch.reportAutomation,
      };
    }
    if (patch.ceremonySettings) {
      const ceremonyData = getCeremonyData(state, patch.ceremonyId);
      ceremonyData.weekStart = patch.ceremonySettings.weekStart || "";
      ceremonyData.weekEnd = patch.ceremonySettings.weekEnd || "";
      ceremonyData.seekerStart = patch.ceremonySettings.seekerStart || "";
      const preset = getCeremonyDatePreset(patch.ceremonyId);
      if (preset) {
        ceremonyData.datePresetKey = `custom:${preset.key}`;
      }
      ensureCeremonyDates(ceremonyData, patch.ceremonyId);
    }
  } else if (patch.type === "value") {
    const { fellowship, dateId, itemKey } = patch;
    if (!canWriteFellowship(request, fellowship)) {
      return jsonResponse({ error: "Forbidden" }, { status: 403 });
    }
    const ceremonyData = getCeremonyData(state, patch.ceremonyId);
    if (!ceremonyData.fellowships[fellowship]) {
      ceremonyData.fellowships[fellowship] = {};
    }
    if (!ceremonyData.fellowships[fellowship][dateId]) {
      ceremonyData.fellowships[fellowship][dateId] = createEmptyTargets();
    }
    const normalizedValue = toNumber(patch.value);
    const isClearingValue = String(patch.value ?? "") === "";
    const previousValue = getPreviousCumulativeValue(ceremonyData, fellowship, dateId, itemKey);
    if (!isClearingValue && previousValue > 0 && normalizedValue < previousValue) {
      return jsonResponse(
        { error: `累計数のため、前回入力値（${previousValue}）以上の数字を入力してください。` },
        { status: 400 },
      );
    }
    ceremonyData.fellowships[fellowship][dateId][itemKey] = normalizedValue;
  } else if (patch.type === "target") {
    if (patch.fellowship) {
      if (!canWriteFellowship(request, patch.fellowship)) {
        return jsonResponse({ error: "Forbidden" }, { status: 403 });
      }
      const ceremonyData = getCeremonyData(state, patch.ceremonyId);
      if (!ceremonyData.fellowshipTargets[patch.fellowship]) {
        ceremonyData.fellowshipTargets[patch.fellowship] = createEmptyTargets();
      }
      ceremonyData.fellowshipTargets[patch.fellowship][patch.itemKey] = toNumber(patch.value);
    } else {
      if (!canWriteAdmin(request)) {
        return jsonResponse({ error: "Forbidden" }, { status: 403 });
      }
      const ceremonyData = getCeremonyData(state, patch.ceremonyId);
      ceremonyData.targets[patch.itemKey] = toNumber(patch.value);
    }
  } else if (patch.type === "summaryTarget") {
    if (!canWriteAdmin(request)) {
      return jsonResponse({ error: "Forbidden" }, { status: 403 });
    }
    const ceremonyData = getCeremonyData(state, patch.ceremonyId);
    ceremonyData.summaryTargetOverrides = {
      ...(ceremonyData.summaryTargetOverrides || {}),
      [patch.itemKey]: toNumber(patch.value),
    };
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
    const refreshed = await refreshSessionUser(request, env);
    if (refreshed?.user) {
      const headers = refreshed.cookie ? { "set-cookie": refreshed.cookie } : {};
      return jsonResponse(refreshed.user, { headers });
    }
    return jsonResponse(getCurrentUser(request));
  }

  if (url.pathname === "/api/report-pdf" && request.method === "GET") {
    if (!canWriteAdmin(request)) {
      return jsonResponse({ error: "Forbidden" }, { status: 403 });
    }

    const state = await readState(env.DB);
    const pdf = await generateSummaryPdf(env, state);
    return new Response(pdf, {
      headers: {
        "content-type": "application/pdf",
        "content-disposition": 'inline; filename="dailytally-report.pdf"',
      },
    });
  }

  return jsonResponse({ error: "Not found" }, { status: 404 });
}

export default {
  async fetch(request, env) {
    let url = new URL(request.url);

    if (isOidcConfigured(env)) {
      if (url.pathname === "/auth/login") {
        return handleAuthLogin(request, env);
      }
      if (url.pathname === "/auth/callback") {
        return handleAuthCallback(request, env);
      }
      if (url.pathname === "/auth/logout") {
        return handleAuthLogout();
      }
    }

    const auth = await authenticateRequest(request, env);
    if (auth.response) {
      return auth.response;
    }
    request = auth.request;
    url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return handleApi(request, env);
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(_controller, env, ctx) {
    ctx.waitUntil(runScheduledReport(env));
  },
};
