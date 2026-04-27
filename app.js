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
];

const STORAGE_KEY = "daily-tally-v2";
const LEGACY_STORAGE_KEYS = ["daily-tally-v1"];

const tabButtons = document.getElementById("tabButtons");
const pageContainer = document.getElementById("pageContainer");
const weekStartInput = document.getElementById("weekStart");
const itemCountSelect = document.getElementById("itemCount");
const seekerStartInput = document.getElementById("seekerStart");
const ceremonyNumberInput = document.getElementById("ceremonyNumber");

let state = loadState();
let activeTab = state.settings.activeTab || fellowshipNames[0];

init();

function init() {
  if (!state.settings.weekStart) {
    state.settings.weekStart = toISODate(new Date());
  }

  weekStartInput.value = state.settings.weekStart;
  itemCountSelect.value = String(state.settings.itemCount);
  seekerStartInput.value = state.settings.seekerStart;
  ceremonyNumberInput.value = String(state.settings.ceremonyNumber);

  weekStartInput.addEventListener("change", () => {
    state.settings.weekStart = weekStartInput.value || toISODate(new Date());
    saveState();
    render();
  });

  itemCountSelect.addEventListener("change", () => {
    state.settings.itemCount = Number(itemCountSelect.value);
    saveState();
    render();
  });

  seekerStartInput.addEventListener("change", () => {
    state.settings.seekerStart = seekerStartInput.value || state.settings.weekStart;
    saveState();
    render();
  });

  ceremonyNumberInput.addEventListener("input", () => {
    ceremonyNumberInput.value = ceremonyNumberInput.value.replace(/\D/g, "");
    state.settings.ceremonyNumber = Number(ceremonyNumberInput.value) || 30;
    saveState();
    render();
  });

  render();
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

function getActiveItems() {
  return ITEMS.slice(0, state.settings.itemCount);
}

function createEmptyDay() {
  return Object.fromEntries(ITEMS.map((item) => [item.key, 0]));
}

function createEmptyTargets() {
  return Object.fromEntries(ITEMS.map((item) => [item.key, 0]));
}

function ensureStateShape() {
  if (!state.settings) {
    state.settings = {
      weekStart: toISODate(new Date()),
      itemCount: 9,
      activeTab: fellowshipNames[0],
      seekerStart: "2026-04-28",
      ceremonyNumber: 30,
    };
  }

  if (!state.settings.weekStart) {
    state.settings.weekStart = toISODate(new Date());
  }

  if (!state.settings.seekerStart) {
    state.settings.seekerStart = "2026-04-28";
  }

  if (!state.settings.ceremonyNumber) {
    state.settings.ceremonyNumber = 30;
  }

  state.settings.itemCount = [7, 8, 9].includes(Number(state.settings.itemCount))
    ? Number(state.settings.itemCount)
    : 9;
  state.settings.activeTab =
    state.settings.activeTab === "summary" || fellowshipNames.includes(state.settings.activeTab)
      ? state.settings.activeTab
      : fellowshipNames[0];

  if (!state.fellowships) {
    state.fellowships = {};
  }

  if (!state.targets) {
    state.targets = createEmptyTargets();
  }

  Array.from({ length: fellowshipNames.length }, (_, i) => `伝道会${i + 1}`).forEach((oldName, index) => {
    const newName = fellowshipNames[index];
    if (state.fellowships[oldName] && !state.fellowships[newName]) {
      state.fellowships[newName] = state.fellowships[oldName];
    }
  });

  fellowshipNames.forEach((name) => {
    if (!state.fellowships[name]) {
      state.fellowships[name] = {};
    }
  });
}

function loadState() {
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
          itemCount: 9,
          activeTab: fellowshipNames[0],
          seekerStart: "2026-04-28",
          ceremonyNumber: 30,
        },
        fellowships: legacyParsed,
        targets: createEmptyTargets(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
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
        itemCount: 9,
        activeTab: fellowshipNames[0],
        seekerStart: "2026-04-28",
        ceremonyNumber: 30,
      },
      fellowships: raw.fellowships || {},
      targets: raw.targets || createEmptyTargets(),
    };
    state = loaded;
    ensureStateShape();
    return state;
  } catch (_error) {
    return {
      settings: {
        weekStart: "",
        itemCount: 9,
        activeTab: fellowshipNames[0],
        seekerStart: "2026-04-28",
        ceremonyNumber: 30,
      },
      fellowships: Object.fromEntries(fellowshipNames.map((name) => [name, {}])),
      targets: createEmptyTargets(),
    };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getValue(name, dateId, itemKey) {
  const day = state.fellowships[name][dateId] || createEmptyDay();
  return Number(day[itemKey]) || 0;
}

function setValue(name, dateId, itemKey, value) {
  if (!state.fellowships[name][dateId]) {
    state.fellowships[name][dateId] = createEmptyDay();
  }
  state.fellowships[name][dateId][itemKey] = Math.max(0, Number(value) || 0);
  saveState();
}

function getTargetValue(itemKey) {
  return Number(state.targets[itemKey]) || 0;
}

function setTargetValue(itemKey, value) {
  state.targets[itemKey] = Math.max(0, Number(value) || 0);
  saveState();
}

function canEditTargets() {
  return toISODate(new Date()) === state.settings.weekStart;
}

function createTargetInput(itemKey, currentValue) {
  const input = document.createElement("input");
  input.className = "target-input";
  input.type = "text";
  input.inputMode = "numeric";
  input.pattern = "[0-9]*";
  input.value = currentValue === 0 ? "" : String(currentValue);
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
    setTargetValue(itemKey, input.value);
  });
  return input;
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
      state.settings.activeTab = activeTab;
      saveState();
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
    state.settings.activeTab = activeTab;
    saveState();
    render();
  });
  tabButtons.appendChild(summaryButton);
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
    th.textContent = item.key === "seekers" ? `得道者数(${formatShortDate(state.settings.seekerStart)}～)` : item.summaryLabel || item.label;
    rowEl.appendChild(th);
  });
}

function renderInputPage(name) {
  const template = document.getElementById("inputPageTemplate");
  const content = template.content.cloneNode(true);
  content.querySelector(".page-title").textContent = `${name} 入力ページ`;

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
    const currentValue = getTargetValue(item.key);

    if (targetsEditable) {
      td.appendChild(createTargetInput(item.key, currentValue));
    } else {
      td.textContent = currentValue === 0 ? "" : String(currentValue);
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
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
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

function renderSummaryPage() {
  const template = document.getElementById("summaryPageTemplate");
  const content = template.content.cloneNode(true);

  content.querySelector("[data-summary-title]").textContent =
    `～第${state.settings.ceremonyNumber}回八大明王護摩供　集計表～　報告数は累計数です`;
  content.querySelectorAll("[data-summary-colspan]").forEach((cell) => {
    cell.colSpan = getActiveItems().length + 1;
  });
  content.querySelector("[data-phone-colspan]").colSpan = Math.max(1, getActiveItems().length - 5);
  fillSummaryHeaderRow(content.querySelector("#summaryHeaderRow"));

  const tbody = content.querySelector("tbody");
  const weeklyTotals = Object.fromEntries(getActiveItems().map((item) => [item.key, 0]));
  const targetRow = document.createElement("tr");
  targetRow.className = "target-row";

  const targetLabelCell = document.createElement("th");
  targetLabelCell.textContent = "目標数";
  targetRow.appendChild(targetLabelCell);

  const targetsEditable = canEditTargets();

  getActiveItems().forEach((item) => {
    const td = document.createElement("td");
    const currentValue = getTargetValue(item.key);

    if (targetsEditable) {
      td.appendChild(createTargetInput(item.key, currentValue));
      const unit = document.createElement("span");
      unit.className = "summary-unit";
      unit.textContent = item.unit;
      td.appendChild(unit);
    } else {
      const value = currentValue || "";
      td.innerHTML = `<span class="summary-value">${value}</span><span class="summary-unit">${item.unit}</span>`;
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
      weeklyTotals[item.key] += dayTotals[item.key];
    });

    tbody.appendChild(tr);
  });

  const totalRow = content.querySelector("#weeklyTotalRow");
  const labelCell = document.createElement("th");
  labelCell.textContent = "最終";
  totalRow.appendChild(labelCell);

  getActiveItems().forEach((item) => {
    const td = document.createElement("td");
    const value = weeklyTotals[item.key] || "";
    td.innerHTML = `<span class="summary-value">${value}</span><span class="summary-unit">${item.unit}</span>`;
    totalRow.appendChild(td);
  });

  pageContainer.innerHTML = "";
  pageContainer.appendChild(content);
}

function render() {
  renderTabs();

  if (activeTab === "summary") {
    renderSummaryPage();
  } else {
    renderInputPage(activeTab);
  }
}
