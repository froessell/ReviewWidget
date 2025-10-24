# Product Requirements Document (PRD)

**Project:** Reusable Checklist Widget for Figma  
**Author:** ChatGPT (hand‑off for Frederik & dev team)  
**Date:** 2025‑04‑30  
**Status:** Draft – ready for engineering kickoff

---

## 1. Purpose

Turn a static design‑system checklist component into an **interactive Figma Widget** so designers can check items off _inside the canvas_ and keep state per file/instance. No prototype mode, no external sheets.

---

## 2. Problem Statement

Designers currently paste a static checklist frame. It looks right but:
* Checkboxes don’t toggle – people track progress elsewhere.
* Updates don’t persist – you lose context when reopening the file.
* Re‑creating the list for every project wastes time and causes drift.

---

## 3. Goals & Success Metrics

| Goal | Metric |
|------|--------|
| Replace static component with widget | ≥ 90 % adoption across new project files within 1 month |
| Allow real‑time checking + persistence | State survives file close/open & duplicate instances |
| Zero new tooling for designers | < 10 min to drop in by a first‑time user |
| Performance | Widget renders < 50 ms on cold load with 100 items |

---

## 4. Non‑Goals

* Cross‑file analytics or team dashboards (future).
* Network sync / account‑level persistence.
* Mobile Figma compatibility (desktop only for v1).

---

## 5. Users & Personas

* **In‑house Product Designers** – want a lightweight, always‑there task list.  
* **Design System Maintainers** – own the widget spec, publish updates.  
* **External Reviewers/PMs** – can tick items without leaving comments.

---

## 6. Functional Requirements

ID | Description | Priority
---|-------------|---------
FR‑1 | Render the six sections & checklist items exactly as in the screenshot. | P0
FR‑2 | Checkbox toggles update instantly on click. | P0
FR‑3 | State is persisted per widget instance using `useSyncedState`. | P0
FR‑4 | Duplicating the widget starts a fresh, independent checklist. | P0
FR‑5 | **Reset** action in the property menu (“Reset all”) to clear checks. | P1
FR‑6 | **Add Item** UI (+ icon) to append a blank row inside any section. | P2
FR‑7 | **Theme props** (text/style tokens) exposed for design‑system colors. | P2

---

## 7. Non‑Functional Requirements

* **Performance:** Render/update under 50 ms on a mid‑spec laptop.  
* **File Size:** Keep the widget bundle < 200 kB uncompressed.  
* **Accessibility:** Checkbox hit area ≥ 24 × 24 px.  
* **Security:** No network calls; avoid eval/dynamic imports.  
* **Coding Standards:** TypeScript, ESLint airbnb config, 100 % typed.

---

## 8. Technical Notes

* **API Surface:** Figma Widget API only – no plugin frames.  
* **Data Model:**  
  ```ts
  type Section = { title: string; items: { label: string; done: boolean }[] }
  ```  
* **Persistence:** `useSyncedState('sections', initial)` handles per‑file storage.  
* **Reset:** `figma.notify("Checklist reset")` after clearing.  
* **Publish Flow:** Org‑private, version bump via GitHub Action → Figma REST `publish`.

---

## 9. Milestones

| Date | Deliverable |
|------|-------------|
| **May 2** | Tech spike & skeleton widget renders placeholder list |
| **May 6** | FR‑1 – FR‑4 complete, ready for dog‑food |
| **May 9** | Reset action (FR‑5) |
| **May 13** | Add Item & theming (FR‑6, FR‑7) |
| **May 15** | Code freeze, QA & accessibility pass |
| **May 17** | Publish v1.0 to org library |

---

## 10. Open Questions

1. Where should the widget live in the design‑system library hierarchy?  
2. Do we need to import text styles or let the widget embed fonts?  
3. Should “Reset” prompt a confirmation dialog?

---

**Next Steps**

* Engineering spikes on widget bundle size & performance.  
* Design system team reviews color/token exposure.

---

_End of PRD_