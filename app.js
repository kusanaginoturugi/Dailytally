const fellowshipNames = ["大江戸", "お台場", "羽田", "かながわ", "富士山", "駿天", "埼玉", "千葉", "山梨"];
const ITEMS = [
  { key: "seekers", label: "得道者数", summaryLabel: "得道者数(4/28～)", unit: "人" },
  { key: "tenchi", label: "天地免劫護摩木", summaryLabel: "この護摩供に向けての天地免劫護摩木", unit: "本" },
  { key: "goma", label: "各種護摩木", summaryLabel: "この護摩供に向けて各種護摩木", unit: "本" },
  { key: "nyoi", label: "如意棒", summaryLabel: "八大明王如意棒", unit: "本" },
  { key: "sanki", label: "三期滅劫霊木", summaryLabel: "三期滅劫之霊木", unit: "本" },
  { key: "ryuge", label: "三會龍華之御柱", summaryLabel: "三會龍華之御柱", unit: "本" },
  { key: "fuda", label: "八大明王札", summaryLabel: "八大明王札", unit: "体" },
  { key: "zaitama", label: "明王招財玉", summaryLabel: "明王招財玉", unit: "組" },
  { key: "symbols", label: "各種符", summaryLabel: "各種符", unit: "枚" },
  { key: "water", label: "御神水・泉・龍華水等", summaryLabel: "御神水・泉・龍華水等", unit: "ケース" },
  { key: "extra1", label: "追加項目", summaryLabel: "追加項目", unit: "" },
];
const MIN_ITEM_COUNT = 1;
const MAX_ITEM_COUNT = ITEMS.length;

const STORAGE_KEY = "daily-tally-v2";
const LEGACY_STORAGE_KEYS = ["daily-tally-v1"];
const ACTIVE_TAB_KEY = "daily-tally-active-tab";
const API_STATE_URL = "/api/state";
const REFRESH_INTERVAL_MS = 15000;
const SETTINGS_SCHEMA_VERSION = 2;
const FINAL_ROW_ID = "__final__";

const appTitle = document.getElementById("appTitle");
const tabButtons = document.getElementById("tabButtons");
const pageContainer = document.getElementById("pageContainer");

let state = createDefaultState();
let activeTab = "admin";

init();

async function init() {
  state = await loadState();
  activeTab = getSavedActiveTab();

  if (!state.settings.weekStart) {
    state.settings.weekStart = toISODate(new Date());
  }

  setInterval(refreshStateFromDatabase, REFRESH_INTERVAL_MS);
  render();
}

function getSavedActiveTab() {
  const savedTab = localStorage.getItem(ACTIVE_TAB_KEY);
  return isKnownTab(savedTab) ? savedTab : "admin";
}

function isKnownTab(tabName) {
  return tabName === "admin" || tabName === "summary" || fellowshipNames.includes(tabName);
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

function getWeekDates() {
  const start = parseISODate(state.settings.weekStart);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const label = `${date.getMonth() + 1}/${date.getDate()}`;
    return { id: toISODate(date), label };
  });
}

function formatShortDate(iso) {
  const date = parseISODate(iso);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function getCeremonyNumber() {
  const year = parseISODate(state.settings.weekStart || toISODate(new Date())).getFullYear();
  return year - 1995;
}

function getActiveItems() {
  return ITEMS.slice(0, state.settings.itemCount);
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

function createDefaultState() {
  return {
    settings: {
      weekStart: "",
      itemCount: 10,
      activeTab: "admin",
      seekerStart: "2026-04-28",
      ceremonyName: "八大明王護摩供",
      schemaVersion: SETTINGS_SCHEMA_VERSION,
    },
    fellowships: Object.fromEntries(fellowshipNames.map((name) => [name, {}])),
    targets: createEmptyTargets(),
    fellowshipTargets: createEmptyFellowshipTargets(),
  };
}

function normalizeStateShape(targetState) {
  if (!targetState.settings) {
    targetState.settings = {
      weekStart: toISODate(new Date()),
      itemCount: 10,
      activeTab: "admin",
      seekerStart: "2026-04-28",
      ceremonyName: "八大明王護摩供",
      schemaVersion: SETTINGS_SCHEMA_VERSION,
    };
  }

  if (!targetState.settings.weekStart) {
    targetState.settings.weekStart = toISODate(new Date());
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
          itemCount: 10,
          activeTab: "admin",
          seekerStart: "2026-04-28",
          ceremonyName: "八大明王護摩供",
          schemaVersion: SETTINGS_SCHEMA_VERSION,
        },
        fellowships: legacyParsed,
        targets: createEmptyTargets(),
        fellowshipTargets: createEmptyFellowshipTargets(),
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
        itemCount: 10,
        activeTab: "admin",
        seekerStart: "2026-04-28",
        ceremonyName: "八大明王護摩供",
        schemaVersion: SETTINGS_SCHEMA_VERSION,
      },
      fellowships: raw.fellowships || {},
      targets: raw.targets || createEmptyTargets(),
      fellowshipTargets: raw.fellowshipTargets || createEmptyFellowshipTargets(),
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
  return hasSavedValues(currentState) || hasTargetValues(currentState);
}

function hasLocalData(localState) {
  return hasSavedValues(localState) || hasTargetValues(localState);
}

function hasSavedValues(currentState) {
  return Object.values(currentState.fellowships || {}).some((days) =>
    Object.values(days || {}).some((day) => Object.values(day || {}).some((value) => Number(value) > 0)),
  );
}

function hasTargetValues(currentState) {
  return (
    Object.values(currentState.targets || {}).some((value) => Number(value) > 0) ||
    Object.values(currentState.fellowshipTargets || {}).some((targets) =>
      Object.values(targets || {}).some((value) => Number(value) > 0),
    )
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
  const { weekStart, itemCount, seekerStart, ceremonyName, schemaVersion } = state.settings;
  return patchState({ type: "settings", settings: { weekStart, itemCount, seekerStart, ceremonyName, schemaVersion } });
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
  const day = state.fellowships[name][dateId] || createEmptyDay();
  return Number(day[itemKey]) || 0;
}

function setValue(name, dateId, itemKey, value) {
  if (!state.fellowships[name][dateId]) {
    state.fellowships[name][dateId] = createEmptyDay();
  }
  const normalizedValue = Math.max(0, Number(value) || 0);
  state.fellowships[name][dateId][itemKey] = normalizedValue;
  patchState({ type: "value", fellowship: name, dateId, itemKey, value: normalizedValue });
}

function getTargetValue(name, itemKey) {
  return Number(state.fellowshipTargets[name]?.[itemKey]) || 0;
}

function setTargetValue(name, itemKey, value) {
  const normalizedValue = Math.max(0, Number(value) || 0);
  if (!state.fellowshipTargets[name]) {
    state.fellowshipTargets[name] = createEmptyTargets();
  }
  state.fellowshipTargets[name][itemKey] = normalizedValue;
  patchState({ type: "target", fellowship: name, itemKey, value: normalizedValue });
}

function canEditTargets() {
  return toISODate(new Date()) === state.settings.weekStart;
}

function createTargetInput(name, itemKey, currentValue) {
  const input = document.createElement("input");
  input.className = "target-input";
  input.type = "text";
  input.inputMode = "numeric";
  input.pattern = "[0-9]*";
  input.value = currentValue === 0 ? "" : String(currentValue);
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
    setTargetValue(name, itemKey, input.value);
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

function fillHeaderRow(rowEl) {
  rowEl.innerHTML = "";
  const first = document.createElement("th");
  first.textContent = "日付";
  rowEl.appendChild(first);

  getActiveItems().forEach((item) => {
    const th = document.createElement("th");
    th.textContent = item.label;
    rowEl.appendChild(th);
  });
}

function fillSummaryHeaderRow(rowEl) {
  rowEl.innerHTML = "";
  rowEl.appendChild(document.createElement("th"));

  getActiveItems().forEach((item) => {
    const th = document.createElement("th");
    if (item.key === "seekers") {
      th.textContent = `得道者数(${formatShortDate(state.settings.seekerStart)}～)`;
    } else if (item.key === "water") {
      th.append("御神水・泉・", document.createElement("br"), "龍華水等");
    } else {
      th.textContent = item.summaryLabel || item.label;
    }
    rowEl.appendChild(th);
  });
}

function renderInputPage(name) {
  const template = document.getElementById("inputPageTemplate");
  const content = template.content.cloneNode(true);
  content.querySelector(".page-title").textContent = `第${getCeremonyNumber()}回八大明王護摩供　${name}`;

  fillHeaderRow(content.querySelector("#inputHeaderRow"));
  const tbody = content.querySelector("tbody");
  const targetRow = document.createElement("tr");
  targetRow.className = "target-row";

  const targetLabelCell = document.createElement("th");
  targetLabelCell.textContent = "目標数";
  targetRow.appendChild(targetLabelCell);

  const targetsEditable = canEditTargets();

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
      const input = document.createElement("input");
      const currentValue = getValue(name, date.id, item.key);
      input.type = "text";
      input.inputMode = "numeric";
      input.pattern = "[0-9]*";
      input.value = currentValue === 0 ? "" : String(currentValue);
      input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "");
        setValue(name, date.id, item.key, input.value);
      });
      td.appendChild(input);
      appendUnit(td, item.unit);
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
    const input = document.createElement("input");
    const currentValue = getValue(name, FINAL_ROW_ID, item.key);
    input.type = "text";
    input.inputMode = "numeric";
    input.pattern = "[0-9]*";
    input.value = currentValue === 0 ? "" : String(currentValue);
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "");
      setValue(name, FINAL_ROW_ID, item.key, input.value);
    });
    td.appendChild(input);
    appendUnit(td, item.unit);
    totalRow.appendChild(td);
  });

  pageContainer.innerHTML = "";
  pageContainer.appendChild(content);
}

function renderAdminPage() {
  const template = document.getElementById("adminPageTemplate");
  const content = template.content.cloneNode(true);
  const weekStartInput = content.querySelector("#weekStart");
  const itemCountInput = content.querySelector("#itemCount");
  const seekerStartInput = content.querySelector("#seekerStart");
  const ceremonyNumberInput = content.querySelector("#ceremonyNumber");

  weekStartInput.value = state.settings.weekStart;
  itemCountInput.value = String(state.settings.itemCount);
  seekerStartInput.value = state.settings.seekerStart;
  ceremonyNumberInput.value = String(getCeremonyNumber());

  weekStartInput.addEventListener("change", () => {
    state.settings.weekStart = weekStartInput.value || toISODate(new Date());
    ceremonyNumberInput.value = String(getCeremonyNumber());
    saveSettings();
  });

  itemCountInput.addEventListener("change", () => {
    state.settings.itemCount = normalizeItemCount(itemCountInput.value, state.settings.schemaVersion);
    itemCountInput.value = String(state.settings.itemCount);
    saveSettings();
  });

  seekerStartInput.addEventListener("change", () => {
    state.settings.seekerStart = seekerStartInput.value || state.settings.weekStart;
    saveSettings();
  });

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

function getTargetTotals() {
  const totals = Object.fromEntries(getActiveItems().map((item) => [item.key, 0]));

  fellowshipNames.forEach((name) => {
    getActiveItems().forEach((item) => {
      totals[item.key] += getTargetValue(name, item.key);
    });
  });

  return totals;
}

function renderSummaryPage() {
  const template = document.getElementById("summaryPageTemplate");
  const content = template.content.cloneNode(true);

  content.querySelector("[data-summary-title]").textContent =
    `～第${getCeremonyNumber()}回八大明王護摩供　集計表～　報告数は累計数です`;
  content.querySelectorAll("[data-summary-colspan]").forEach((cell) => {
    cell.colSpan = getActiveItems().length + 1;
  });
  content.querySelector("[data-phone-colspan]").colSpan = Math.max(1, getActiveItems().length - 5);
  fillSummaryHeaderRow(content.querySelector("#summaryHeaderRow"));

  const tbody = content.querySelector("tbody");
  const targetRow = document.createElement("tr");
  targetRow.className = "target-row";

  const targetLabelCell = document.createElement("th");
  targetLabelCell.textContent = "目標数";
  targetRow.appendChild(targetLabelCell);

  const targetTotals = getTargetTotals();

  getActiveItems().forEach((item) => {
    const td = document.createElement("td");
    const value = targetTotals[item.key] || "";
    td.innerHTML = `<span class="summary-value">${value}</span><span class="summary-unit">${item.unit}</span>`;
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
  const finalTotals = getDayTotals(FINAL_ROW_ID);
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
  appTitle.textContent = `${state.settings.ceremonyName}毎日集計`;

  if (activeTab === "summary") {
    renderSummaryPage();
  } else if (activeTab === "admin") {
    renderAdminPage();
  } else {
    renderInputPage(activeTab);
  }
}
