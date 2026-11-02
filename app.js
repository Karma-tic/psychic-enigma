// SCD 2.0 QA Hub Application Logic

// Tab Switching
function switchTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeContent) activeContent.classList.remove("hidden");

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active", "bg-indigo-600", "text-white");
    btn.classList.add("text-slate-300", "hover:bg-slate-700");
  });

  const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (activeBtn) {
    activeBtn.classList.add("active", "bg-indigo-600", "text-white");
    activeBtn.classList.remove("text-slate-300", "hover:bg-slate-700");
  }
}

// Module Selector & Details Renderer
let activeModuleId = 2; // Default to New Family Registration (Module 2)

function renderModules() {
  const tabsContainer = document.getElementById("module-selector-tabs");
  if (!tabsContainer) return;

  tabsContainer.innerHTML = MODULES_DATA.map(m => {
    const isActive = m.id === activeModuleId;
    return `
      <button onclick="selectModule(${m.id})" class="p-3 text-left rounded-lg border transition ${isActive ? 'bg-indigo-50 border-indigo-500 shadow-sm ring-1 ring-indigo-400' : 'bg-white border-slate-200 hover:border-slate-300'}">
        <div class="flex items-center justify-between mb-1">
          <span class="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Mod ${m.moduleId}</span>
          <span class="text-[9px] px-1.5 py-0.5 rounded font-mono ${m.status.includes('Blocked') ? 'bg-red-100 text-red-700 font-bold' : 'bg-emerald-100 text-emerald-700'}">${m.code}</span>
        </div>
        <div class="font-bold text-xs text-slate-800 truncate">${m.name}</div>
        <div class="text-[10px] text-slate-400 mt-1">Lead: ${m.lead}</div>
      </button>
    `;
  }).join("");

  renderModuleDetail();
}

function selectModule(id) {
  activeModuleId = id;
  renderModules();
}

function renderModuleDetail() {
  const container = document.getElementById("module-detail-card");
  const mod = MODULES_DATA.find(m => m.id === activeModuleId);
  if (!container || !mod) return;

  container.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200">
      <div>
        <div class="flex items-center space-x-2">
          <h3 class="text-base font-bold text-slate-900">Module ${mod.moduleId}: ${mod.name}</h3>
          <span class="text-xs px-2 py-0.5 rounded font-mono font-bold ${mod.status.includes('Blocked') ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-emerald-100 text-emerald-700 border border-emerald-300'}">${mod.status}</span>
        </div>
        <p class="text-xs text-slate-500 mt-1">${mod.description}</p>
      </div>
      <div class="text-xs bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600">
        Lead Tester: <strong>${mod.lead}</strong>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- UI Routes & Front-end -->
      <div class="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
          <i class="fa-solid fa-desktop text-indigo-500"></i>
          <span>UI Routes (Angular SPA)</span>
        </h4>
        <ul class="text-xs font-mono space-y-1 text-indigo-600">
          ${mod.uiRoutes.map(r => `<li class="bg-slate-50 p-1.5 rounded border border-slate-100">${r}</li>`).join("")}
        </ul>
      </div>

      <!-- APIs -->
      <div class="bg-white p-4 rounded-lg border border-slate-200 shadow-xs md:col-span-2">
        <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
          <i class="fa-solid fa-server text-blue-500"></i>
          <span>Backend Web APIs (.NET C#)</span>
        </h4>
        <div class="space-y-2">
          ${mod.apis.map(api => `
            <div class="text-xs bg-slate-50 p-2 rounded border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span class="font-mono font-bold text-blue-700 px-1.5 py-0.5 rounded bg-blue-100 mr-1.5 text-[10px]">${api.method}</span>
                <span class="font-mono text-slate-800 font-semibold">${api.endpoint}</span>
              </div>
              <span class="text-slate-500 text-[11px]">${api.desc}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>

    <!-- Database Tables & Test Scenarios -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div class="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
          <i class="fa-solid fa-database text-amber-500"></i>
          <span>Database Tables Interacted</span>
        </h4>
        <div class="space-y-2">
          ${mod.dbTables.map(t => `
            <div class="text-xs bg-slate-50 p-2 rounded border border-slate-100">
              <div class="font-mono text-[11px] font-bold text-slate-800">${t.schema}.${t.table}</div>
              <div class="text-slate-500 text-[11px] mt-0.5">${t.role}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
          <i class="fa-solid fa-check-double text-emerald-500"></i>
          <span>Core Test Scenarios Covered</span>
        </h4>
        <ul class="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
          ${mod.testScenarios.map(s => `<li>${s}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

// Scenario Matrix Renderer
function renderMatrixTable() {
  const tbody = document.getElementById("scenario-matrix-tbody");
  if (!tbody) return;

  const genderFilter = document.getElementById("matrix-gender-filter").value;
  const allowedFilter = document.getElementById("matrix-allowed-filter").value;
  const searchFilter = document.getElementById("matrix-search").value.toLowerCase();

  const filtered = SCENARIO_MATRIX.filter(row => {
    if (genderFilter !== "ALL" && row.gender.trim() !== genderFilter) return false;
    if (allowedFilter !== "ALL") {
      const isAllowed = row.allowed.toLowerCase().includes("allowed") && !row.allowed.toLowerCase().includes("not");
      if (allowedFilter === "Allowed" && !isAllowed) return false;
      if (allowedFilter === "Not allowed" && isAllowed) return false;
    }
    if (searchFilter) {
      const matchText = `${row.marital_status} ${row.spouse_status} ${row.status_id} ${row.add_member_owner} ${row.new_reg_owner}`.toLowerCase();
      if (!matchText.includes(searchFilter)) return false;
    }
    return true;
  });

  tbody.innerHTML = filtered.map(r => {
    const isAllowed = r.allowed.toLowerCase().includes("allowed") && !r.allowed.toLowerCase().includes("not");
    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="p-3 font-mono font-medium text-slate-500">${r.id || "-"}</td>
        <td class="p-3 font-semibold text-slate-800">${r.gender || "-"}</td>
        <td class="p-3 text-slate-700">${r.marital_status || "-"}</td>
        <td class="p-3 text-slate-700">${r.spouse_status || "-"}</td>
        <td class="p-3 font-mono text-slate-600">${r.status_id || "-"}</td>
        <td class="p-3">
          <span class="px-2 py-0.5 rounded text-[10px] ${isAllowed ? 'badge-allowed' : 'badge-notallowed'}">
            ${r.allowed || "N/A"}
          </span>
        </td>
        <td class="p-3 text-slate-600">${r.add_member_owner || "-"}</td>
        <td class="p-3 text-slate-600 font-medium">${r.new_reg_owner || "-"}</td>
      </tr>
    `;
  }).join("");
}

// Defect Tracker Renderer
function renderBugsTable() {
  const tbody = document.getElementById("bugs-tbody");
  if (!tbody) return;

  const priorityFilter = document.getElementById("bug-priority-filter").value;
  const ownerFilter = document.getElementById("bug-owner-filter").value;

  const filtered = BUGS_DATA.filter(b => {
    if (priorityFilter !== "ALL" && !b.priority.startsWith(priorityFilter)) return false;
    if (ownerFilter !== "ALL" && !b.owner.includes(ownerFilter)) return false;
    return true;
  });

  tbody.innerHTML = filtered.map(b => {
    let badgeClass = "badge-p2";
    if (b.priority.startsWith("P0")) badgeClass = "badge-p0";
    else if (b.priority.startsWith("P1")) badgeClass = "badge-p1";
    else if (b.priority.startsWith("P3")) badgeClass = "badge-p3";

    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="p-3 font-mono font-bold text-slate-800">${b.id}</td>
        <td class="p-3">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold ${badgeClass}">
            ${b.priority}
          </span>
        </td>
        <td class="p-3 text-slate-800 max-w-md">
          <div class="font-bold text-xs mb-1 text-slate-900">${b.title}</div>
          <div class="text-[11px] text-slate-500 leading-snug">${b.description}</div>
        </td>
        <td class="p-3">
          <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${b.status.includes('Open') ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'}">
            ${b.status}
          </span>
        </td>
        <td class="p-3 font-medium text-slate-700">${b.owner}</td>
        <td class="p-3 font-mono text-[10px] text-slate-500 max-w-xs truncate">
          ${b.evidence.filter(Boolean).join(" · ")}
        </td>
      </tr>
    `;
  }).join("");
}

// Database Schemas Renderer
function renderSchemasGrid() {
  const container = document.getElementById("schemas-grid");
  if (!container) return;

  container.innerHTML = SCHEMAS_DATA.map(s => `
    <div class="bg-slate-50/60 p-5 rounded-xl border border-slate-200 shadow-xs">
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-bold text-sm text-slate-900 font-mono flex items-center space-x-2">
          <i class="fa-solid fa-folder-tree text-indigo-500"></i>
          <span>${s.name}</span>
        </h3>
        <span class="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-mono">${s.tables.length} Core Tables</span>
      </div>
      <p class="text-xs text-slate-500 mb-4">${s.desc}</p>
      
      <div class="space-y-2">
        ${s.tables.map(t => `
          <div class="bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
            <div class="font-mono font-bold text-indigo-700 text-[11px]">${t.name}</div>
            <div class="text-slate-500 text-[11px] mt-0.5">${t.desc}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderModules();
  renderMatrixTable();
  renderBugsTable();
  renderSchemasGrid();
});
