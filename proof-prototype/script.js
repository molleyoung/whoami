document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  });
});

const detailToggles = [...document.querySelectorAll(".detail-toggle")];
const detailPanels = [...document.querySelectorAll(".flagship-detail-panel")];

function closeDetail(panel, restoreFocus = false) {
  const trigger = detailToggles.find((button) => button.getAttribute("aria-controls") === panel.id);
  panel.hidden = true;
  trigger?.setAttribute("aria-expanded", "false");
  trigger?.closest(".flagship-card")?.classList.remove("is-open");
  if (trigger) trigger.setAttribute("aria-label", trigger.getAttribute("aria-label").replace(/^Collapse proof:/, "Open proof:"));
  if (restoreFocus) trigger?.focus();
}

function openDetail(trigger) {
  const panel = document.getElementById(trigger.getAttribute("aria-controls"));
  if (!panel) return;

  const wasOpen = trigger.getAttribute("aria-expanded") === "true";
  detailPanels.forEach((item) => closeDetail(item));
  if (wasOpen) return;

  panel.hidden = false;
  trigger.setAttribute("aria-expanded", "true");
  trigger.closest(".flagship-card")?.classList.add("is-open");
  trigger.setAttribute("aria-label", trigger.getAttribute("aria-label").replace(/^Open proof:/, "Collapse proof:"));
  panel.focus({ preventScroll: true });
  panel.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "nearest"
  });
}

detailToggles.forEach((trigger) => {
  trigger.addEventListener("click", () => openDetail(trigger));
  trigger.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openDetail(trigger);
  });
});

document.querySelectorAll(".detail-close").forEach((button) => {
  button.addEventListener("click", () => closeDetail(button.closest(".flagship-detail-panel"), true));
  button.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    closeDetail(button.closest(".flagship-detail-panel"), true);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const openPanel = detailPanels.find((panel) => !panel.hidden);
  if (openPanel) closeDetail(openPanel, true);
});
