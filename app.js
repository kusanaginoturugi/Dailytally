const FELLOWSHIP_COUNT = 9;
const ITEMS = [
  { key: "seekers", label: "得道者数" },
  { key: "tenchi", label: "天地免劫護摩木" },
  { key: "goma", label: "各種護摩木" },
  { key: "nyoi", label: "如意棒" },
  { key: "sanki", label: "三期滅劫霊木" },
  { key: "ryuge", label: "三會龍華之御柱" },
  { key: "fuda", label: "八大明王札" },
  { key: "zaitama", label: "明王招財玉" },
  { key: "symbols", label: "各種符" },
];

const STORAGE_KEY = "daily-tally-v2";
const LEGACY_STORAGE_KEYS = ["daily-tally-v1"];

const fellowshipNames = [
  "大江戸",
  "お台場",
  "羽田",
  "かながわ",
  "富士山",
  "駿天",
  "埼玉",
  "千葉",
  "山梨",
];

const tabButtons = document.getElementById("tabButtons");
const pageContainer = document.getElementById("pageContainer");
const weekStartInput = document.getElementById("weekStart");
const itemCountSelect = document.getElementById("itemCount");

let state = loadState();
let activeTab = state.settings.activeTab || fellowshipNames[0];

init();

function init() {
  if (!state.settings.weekStart) {
    state.settings.weekStart = toISODate(new Date());
  }

  weekStartInput.value = state.settings.weekStart;
  itemCountSelect.value = String(state.settings.itemCount);

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

function getInputRows() {
  return [{ id: "__target__", label: "目標数" }, ...getWeekDates()];
}

function getActiveItems() {
  return ITEMS.slice(0, state.settings.itemCount);
}

function createEmptyDay() {
  return Object.fromEntries(ITEMS.map((item) => [item.key, 0]));
}

function ensureStateShape() {
  if (!state.settings) {
    state.settings = { weekStart: toISODate(new Date()), itemCount: 9, activeTab: fellowshipNames[0] };
  }

  if (!state.settings.weekStart) {
    state.settings.weekStart = toISODate(new Date());
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
        settings: { weekStart: toISODate(new Date()), itemCount: 9, activeTab: fellowshipNames[0] },
        fellowships: legacyParsed,
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
      settings: raw.settings || { weekStart: "", itemCount: 9, activeTab: fellowshipNames[0] },
      fellowships: raw.fellowships || {},
    };
    state = loaded;
    ensureStateShape();
    return state;
  } catch (_error) {
    return {
      settings: { weekStart: "", itemCount: 9, activeTab: fellowshipNames[0] },
      fellowships: Object.fromEntries(fellowshipNames.map((name) => [name, {}])),
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

function renderInputPage(name) {
  const template = document.getElementById("inputPageTemplate");
  const content = template.content.cloneNode(true);
  content.querySelector(".page-title").textContent = `${name} 入力ページ`;

  fillHeaderRow(content.querySelector("#inputHeaderRow"));
  const tbody = content.querySelector("tbody");

  getInputRows().forEach((date) => {
    const tr = document.createElement("tr");

    const dateCell = document.createElement("th");
    dateCell.textContent = date.label;
    tr.appendChild(dateCell);

    getActiveItems().forEach((item) => {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.min = "0";
      input.step = "1";
      input.value = String(getValue(name, date.id, item.key));
      input.addEventListener("input", () => {
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

  fillHeaderRow(content.querySelector("#summaryHeaderRow"));

  const tbody = content.querySelector("tbody");
  const weeklyTotals = Object.fromEntries(getActiveItems().map((item) => [item.key, 0]));

  getInputRows().forEach((date) => {
    const dayTotals = getDayTotals(date.id);
    const tr = document.createElement("tr");
    if (date.id === "__target__") {
      tr.className = "target-row";
    }

    const dateCell = document.createElement("th");
    dateCell.textContent = date.label;
    tr.appendChild(dateCell);

    getActiveItems().forEach((item) => {
      const td = document.createElement("td");
      td.textContent = String(dayTotals[item.key]);
      tr.appendChild(td);
      if (date.id !== "__target__") {
        weeklyTotals[item.key] += dayTotals[item.key];
      }
    });

    tbody.appendChild(tr);
  });

  const totalRow = content.querySelector("#weeklyTotalRow");
  const labelCell = document.createElement("th");
  labelCell.textContent = "1週間合計";
  totalRow.appendChild(labelCell);

  getActiveItems().forEach((item) => {
    const td = document.createElement("td");
    td.textContent = String(weeklyTotals[item.key]);
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
