import {
  aiTooling,
  capabilities,
  operatingModel,
  proofPoints,
  siteBuild,
  stories,
  viewModes
} from "./data/stories.js";

const elements = {
  operatingModel: document.getElementById("operatingModel"),
  caseSelect: document.getElementById("caseSelect"),
  casePosition: document.getElementById("casePosition"),
  filters: document.getElementById("capabilityFilters"),
  filterSummary: document.getElementById("filterSummary"),
  caseKicker: document.getElementById("caseKicker"),
  title: document.getElementById("activeCaseTitle"),
  summary: document.getElementById("caseSummary"),
  status: document.getElementById("caseStatus"),
  tabs: document.getElementById("viewTabs"),
  inspection: document.getElementById("inspection"),
  proofRecords: document.getElementById("proofRecords"),
  toolList: document.getElementById("toolList"),
  buildLog: document.getElementById("buildLog")
};

let selectedCapability = "all";
let selectedStoryId = stories[0].id;
let selectedView = "system-map";
let selectedSystem = null;

const capabilityById = new Map(capabilities.map((item) => [item.id, item]));

const representativeCaseByCapability = {
  all: "quality-first-prospecting-engine",
  "gtm-systems-orchestration": "quality-first-prospecting-engine",
  "context-engineering": "gtm-context-layer",
  "analytics-revenue-intelligence": "gtm-insights-revenue-intelligence",
  "revenue-operations-governance": "closed-won-review-agent",
  "ai-enabled-operations": "sales-knowledge-agent"
};

function currentStory() {
  return stories.find((story) => story.id === selectedStoryId) ?? null;
}

function storiesForCapability(capabilityId = selectedCapability) {
  return stories.filter((story) => (
    capabilityId === "all" ||
    story.capabilities.includes(capabilityId)
  ));
}

function visibleStories() {
  return storiesForCapability();
}

function renderOperatingModel() {
  elements.operatingModel.innerHTML = `
    <div class="model-label">${operatingModel.label}</div>
    <strong>${operatingModel.title}</strong>
    <p>${operatingModel.summary}</p>
    <ol>${operatingModel.sequence.map((step) => `<li>${step}</li>`).join("")}</ol>
  `;
}

function renderFilters() {
  const options = [{ id: "all", label: "all" }, ...capabilities];
  elements.filters.innerHTML = options.map((item) => `
    <button
      type="button"
      class="filter ${selectedCapability === item.id ? "active" : ""}"
      data-capability="${item.id}"
      aria-pressed="${selectedCapability === item.id}"
    >
      <span class="filter-state" aria-hidden="true">${selectedCapability === item.id ? "✓" : ""}</span>
      <span>${item.label}</span>
      <span class="filter-count">${storiesForCapability(item.id).length}</span>
    </button>
  `).join("");

  const activeLabel = options.find((item) => item.id === selectedCapability)?.label ?? selectedCapability;
  const matchCount = visibleStories().length;
  elements.filterSummary.textContent = `${activeLabel} · ${matchCount} matching ${matchCount === 1 ? "case" : "cases"}`;

  elements.filters.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      selectedCapability = button.dataset.capability;
      const filtered = visibleStories();

      if (filtered.length === 0) {
        selectedStoryId = null;
      } else {
        const representativeId = representativeCaseByCapability[selectedCapability];
        selectedStoryId = filtered.some((story) => story.id === representativeId)
          ? representativeId
          : filtered[0].id;
      }

      selectedView = "system-map";
      selectedSystem = null;
      renderFilters();
      renderCaseNavigator();
      renderCase();
    });
  });
}

function renderCaseNavigator() {
  const filtered = visibleStories();

  if (filtered.length === 0) {
    elements.caseSelect.innerHTML = `<option value="">No matching cases</option>`;
    elements.caseSelect.disabled = true;
    elements.casePosition.textContent = "NO ACTIVE CASE · 00 MATCHES";
    elements.caseSelect.onchange = null;
    return;
  }

  elements.caseSelect.disabled = false;
  elements.caseSelect.innerHTML = filtered.map((story) => `
    <option value="${story.id}" ${story.id === selectedStoryId ? "selected" : ""}>
      ${story.title} · ${story.statusLabel}
    </option>
  `).join("");

  const position = filtered.findIndex((story) => story.id === selectedStoryId) + 1;
  elements.casePosition.textContent = `ACTIVE CASE · ${String(position).padStart(2, "0")} OF ${String(filtered.length).padStart(2, "0")}`;

  elements.caseSelect.onchange = () => {
    selectedStoryId = elements.caseSelect.value;
    selectedView = "system-map";
    selectedSystem = null;
    renderCaseNavigator();
    renderCase();
  };
}

function renderCase() {
  const story = currentStory();

  if (!story) {
    elements.caseKicker.textContent = "FILTER RESULT / EMPTY";
    elements.title.textContent = "No cases match this capability.";
    elements.summary.textContent = "Choose another capability or select All to restore the complete case navigator.";
    elements.status.textContent = "No active case";
    elements.status.className = "status-pill status-empty";
    elements.tabs.innerHTML = "";
    elements.inspection.innerHTML = `
      <div class="filter-empty-state">
        <span>00 MATCHES</span>
        <strong>The previous case has been cleared.</strong>
        <p>No stale inspection is being displayed. Choose another capability to continue.</p>
      </div>
    `;
    return;
  }

  elements.caseKicker.textContent = story.featured ? "FEATURED SYSTEM / LIVE INSPECTION" : "PROOF CASE / LIVE INSPECTION";
  elements.title.textContent = story.title;
  elements.summary.textContent = story.summary;
  elements.status.textContent = story.statusLabel;
  elements.status.className = `status-pill status-${story.status}`;
  renderTabs();
  renderInspection();
}

function renderTabs() {
  elements.tabs.innerHTML = viewModes.map((view) => `
    <button
      type="button"
      id="tab-${view.id}"
      class="view-tab ${selectedView === view.id ? "active" : ""}"
      role="tab"
      aria-selected="${selectedView === view.id}"
      aria-controls="inspection"
      data-view="${view.id}"
      tabindex="${selectedView === view.id ? "0" : "-1"}"
    >${view.label}</button>
  `).join("");

  const tabButtons = [...elements.tabs.querySelectorAll(".view-tab")];
  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      selectedView = button.dataset.view;
      selectedSystem = null;
      renderTabs();
      renderInspection();
    });
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabButtons.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabButtons.length - 1;
      tabButtons[nextIndex].click();
      elements.tabs.querySelector(`[data-view="${selectedView}"]`).focus();
    });
  });
}

function renderInspection() {
  const story = currentStory();
  const renderers = {
    "system-map": renderSystemMap,
    "operator-view": renderOperatorView,
    "rep-experience": renderRepExperience,
    "results": renderResults,
    "honest-read": renderHonestRead
  };
  elements.inspection.innerHTML = renderers[selectedView](story);
  bindInspectorControls(story);
}

function renderSystemMap(story) {
  const operatingLayer = story.systems.find((system) => system.operatingLayer);
  const systems = story.systems.filter((system) => !system.operatingLayer);
  const selected = story.systems.find((system) => system.name === selectedSystem) ?? operatingLayer ?? systems[0];

  return `
    <div class="canvas-head">
      <div>
        <span class="section-label">SYSTEM MAP</span>
        <h3>${story.thesis}</h3>
      </div>
      <span class="canvas-hint">select a system to inspect</span>
    </div>
    <div class="system-canvas ${operatingLayer ? "has-operating-layer" : ""}">
      ${operatingLayer ? `
        <button class="operating-band ${selected?.name === operatingLayer.name ? "selected" : ""}" type="button" data-system="${operatingLayer.name}">
          <span>OPERATING LAYER / ABOVE + ACROSS THE WORKFLOW</span>
          <strong>${operatingLayer.name}</strong>
          <small>pull → build → run → carry → update → document → publish</small>
        </button>
      ` : ""}
      <div class="flow-line" aria-hidden="true"></div>
      <div class="system-nodes">
        ${systems.map((system, index) => `
          <button
            type="button"
            class="system-node group-${system.group} ${selected?.name === system.name ? "selected" : ""}"
            data-system="${system.name}"
            style="--node-index:${index}"
          >
            <span>${system.role}</span>
            <strong>${system.name}</strong>
            <small>${system.responsibilities[0]}</small>
          </button>
        `).join("")}
      </div>
      <aside class="inspector">
        <div class="inspector-label">CONTEXTUAL INSPECTOR</div>
        <h4>${selected.name}</h4>
        <p>${selected.role}</p>
        <ul>${selected.responsibilities.map((item) => `<li>${item}</li>`).join("")}</ul>
      </aside>
    </div>
  `;
}

function renderOperatorView(story) {
  if (!story.operatorSteps.length) {
    return renderUnavailable(
      "OPERATOR VIEW",
      "Sequence not published",
      "This case is still in design. The public-safe structure does not claim an implemented operating sequence."
    );
  }

  return `
    <div class="canvas-head">
      <div>
        <span class="section-label">OPERATOR VIEW</span>
        <h3>${story.featured ? "The sequence performed through Claude Code" : "The operating sequence"}</h3>
      </div>
      <span class="canvas-hint">${story.operatorSteps.length} inspectable steps</span>
    </div>
    <ol class="operator-track">
      ${story.operatorSteps.map((step, index) => `
        <li>
          <button type="button" class="operator-step ${index === 0 ? "selected" : ""}" data-step="${index}">
            <span class="step-index">${String(index + 1).padStart(2, "0")}</span>
            <span class="step-actor">${step.actor}</span>
            <span class="step-action">${step.action}</span>
          </button>
        </li>
      `).join("")}
    </ol>
    <aside class="sequence-inspector" id="sequenceInspector">
      <span>STEP 01 / ${story.operatorSteps[0].actor}</span>
      <strong>${story.operatorSteps[0].action}</strong>
    </aside>
  `;
}

function renderRepExperience(story) {
  return `
    <div class="canvas-head">
      <div>
        <span class="section-label">REP EXPERIENCE</span>
        <h3>What changes at the point of work</h3>
      </div>
    </div>
    <div class="comparison">
      <div class="comparison-column before">
        <div class="comparison-label">BEFORE / INTERPRET</div>
        <ol>${story.repExperience.before.map((item) => `<li>${item}</li>`).join("")}</ol>
      </div>
      <div class="comparison-arrow" aria-hidden="true">→</div>
      <div class="comparison-column after">
        <div class="comparison-label">AFTER / DELIVERED MOTION</div>
        <ol>${story.repExperience.after.map((item) => `<li>${item}</li>`).join("")}</ol>
      </div>
    </div>
  `;
}

function renderResults(story) {
  const categories = [
    { id: "measured", label: "Measured outcomes", items: story.results.measured, empty: "No measured outcome is claimed for this case." },
    { id: "evidence", label: "Operational evidence", items: story.results.evidence, empty: "No additional operational evidence is published." },
    { id: "validating", label: "Still being validated", items: story.results.validating, empty: "No open validation item is published." }
  ];

  return `
    <div class="canvas-head">
      <div>
        <span class="section-label">RESULTS</span>
        <h3>Evidence, with its status attached</h3>
      </div>
    </div>
    <div class="evidence-ledger">
      ${categories.map((category) => `
        <section class="evidence-group evidence-${category.id}">
          <div class="evidence-label"><span></span>${category.label}</div>
          ${category.items.length
            ? `<ul>${category.items.map((item) => `<li>${item}</li>`).join("")}</ul>`
            : `<p>${category.empty}</p>`}
        </section>
      `).join("")}
    </div>
  `;
}

function renderHonestRead(story) {
  return `
    <div class="canvas-head">
      <div>
        <span class="section-label">HONEST READ</span>
        <h3>What the evidence does—and does not—say</h3>
      </div>
    </div>
    <div class="honest-read">
      <div class="honest-mark">!</div>
      <ol>
        ${story.honestRead.map((item) => `<li>${item}</li>`).join("")}
      </ol>
    </div>
  `;
}

function renderUnavailable(label, title, body) {
  return `
    <div class="canvas-head">
      <div><span class="section-label">${label}</span><h3>${title}</h3></div>
    </div>
    <div class="unavailable"><span>STATUS / NOT CLAIMED</span><p>${body}</p></div>
  `;
}

function bindInspectorControls(story) {
  elements.inspection.querySelectorAll("[data-system]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedSystem = button.dataset.system;
      renderInspection();
    });
  });

  elements.inspection.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.step);
      const step = story.operatorSteps[index];
      elements.inspection.querySelectorAll(".operator-step").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      document.getElementById("sequenceInspector").innerHTML = `
        <span>STEP ${String(index + 1).padStart(2, "0")} / ${step.actor}</span>
        <strong>${step.action}</strong>
      `;
    });
  });
}

function renderTooling() {
  elements.toolList.innerHTML = aiTooling.map((tool) => `
    <article class="tool-row ${tool.featured ? "featured" : ""}">
      <span class="tool-prompt">${tool.featured ? "$" : "·"}</span>
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      ${tool.exampleUrl ? `<a href="${tool.exampleUrl}">${tool.exampleLabel} →</a>` : "<span></span>"}
    </article>
  `).join("");
}

function renderProofPoints() {
  elements.proofRecords.innerHTML = proofPoints.map((record) => `
    <article class="proof-record" id="proof-${record.id}">
      <div class="record-id">verified / ${record.id}</div>
      <div>
        <h3>${record.title}</h3>
        <strong>${record.metric}</strong>
      </div>
      <p>${record.context}</p>
      <span>${record.status}</span>
    </article>
  `).join("");
}

function renderBuildLog() {
  elements.buildLog.innerHTML = siteBuild.entries.map((entry) => `
    <div class="commit-row">
      <span class="commit-node"></span>
      <code>${entry.hash}</code>
      <span>${entry.label}</span>
      <strong>${entry.value}</strong>
    </div>
  `).join("");
}

renderOperatingModel();
renderFilters();
renderCaseNavigator();
renderCase();
renderProofPoints();
renderTooling();
renderBuildLog();
