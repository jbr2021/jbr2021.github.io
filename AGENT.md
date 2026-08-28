# AGENT.md — Project Guide for AI Agents

> Read this file **completely** before making any changes to this repository.
> It contains everything a new agent needs to understand the codebase, its
> conventions, and the rules that must not be broken.

---

## 1. What this project is

This is the **personal portfolio website of Jaibir Singh** ("JBR"), a Senior
Technical Specialist / Forward Deployed AI Engineer. It is a **static,
single-page React application** that showcases his profile, skills, work
experience, and an interactive "Live AI Agent Workflow Visualizer".

- **Live site:** https://jbr2021.github.io
- **Deployment target:** GitHub Pages (built with Vite, served from `dist/`)

The site is fully **client-side** — there is no backend, database, or API. All
content is static data.

---

## 2. Tech stack

| Layer | Technology |
|---|---|
| UI framework | React 18 (`react`, `react-dom`) |
| Build tool | Vite 5 |
| Styling | Bootstrap 5.3 + custom CSS in `src/index.css` |
| Icons | Bootstrap Icons (`bootstrap-icons`) |
| Fonts | Inter + JetBrains Mono (Google Fonts, imported in `index.css`) |
| Routing | **None** — single-page app with anchor (`#id`) scrolling |

> ⚠️ `react-router-dom` is listed in `package.json` but is **not used**.
> Navigation is done entirely with `<a href="#section-id">` + a smooth-scroll
> helper. Do **not** introduce a router unless explicitly asked.

---

## 3. Repository layout

```
jbr2021.github.io/
├── index.html                  # Vite entry HTML (meta tags, title, #root)
├── vite.config.js              # Vite config — IMPORTANT: base: './'
├── package.json                # Scripts + dependencies
├── .github/workflows/main.yml  # GitHub Actions deploy to GitHub Pages
├── components.yaml             # Backstage "Component" catalog example data
├── org.yaml                    # Backstage "Group" catalog example data
├── public/                     # Static assets copied verbatim to dist/
│   ├── Jaibir-Singh-Resume.pdf # GENERATED resume (see §7 — do not hand-edit)
│   ├── favicon.svg / favicon.png / apple-touch-icon.png
│   └── assets/img/             # Photos: Jaibir-Singh-03/07, backgroud-clouds-1
├── scripts/
│   └── generate_resume.py      # Generates the resume PDF from profile.json
└── src/
    ├── main.jsx                # React entry point (renders <App/> in #root)
    ├── App.jsx                 # Root component — composes all sections
    ├── index.css               # ALL custom styles + CSS variables + themes
    ├── data/profile.json       # SINGLE SOURCE OF TRUTH for all content
    ├── services/profileService.js  # Async data-service abstraction
    ├── hooks/useProfile.js     # React hook exposing { profile, loading, error }
    ├── utils/experience.js     # Computes "years of experience" label
    └── components/             # All UI components (see §6)
```

---

## 4. Data flow (IMPORTANT)

Content is **data-driven**. The flow is:

```
src/data/profile.json
        │  (static JSON)
        ▼
src/services/profileService.js   → getProfileData() returns a Promise
        ▼
src/hooks/useProfile.js          → useProfile() → { profile, loading, error }
        ▼
src/App.jsx                      → passes `profile` down as props
        ▼
each section component            → renders from profile data
```

**Rules:**
- `profile.json` is the **single source of truth**. To change name, title,
  tagline, skills, experience, education, social links, or photos, edit
  `profile.json` — do **not** hard-code content in components.
- `profileService.js` is deliberately async (simulated 10 ms delay) so it can
  later be swapped for a real API/DB **without touching any component**.
- Components receive `profile` as a prop and use safe fallbacks
  (e.g. `personal.name || 'Jaibir Singh'`).
- `AIBackground.jsx` is also profile-driven: its labels, agent names, and
  workflow terminology should be derived from `profile.json` (experience,
  projects, skills, tech pills, etc.), not hard-coded to unrelated sample text.

---

## 5. Key conventions & gotchas

### Styling / theming
- Dark/light theme is controlled via `data-theme` **and** `data-bs-theme`
  attributes on `<html>`, persisted in `localStorage` under key `"theme"`.
  Default is `"dark"`.
- All theme colors are **CSS variables** defined in `:root` and overridden in
  `[data-theme="dark"]` at the top of `src/index.css`. Use the variables
  (`var(--primary)`, `var(--cyan)`, `var(--surface-glass)`, etc.), not raw hex
  values, when adding styles.
- Reusable custom classes: `.glass-card`, `.gradient-text`, `.section-title`,
  `.badge-pill`, `.tech-pill`, `.pulse-dot`, `.console-window`, `.x-small`,
  `.fw-extrabold`, etc. — all defined in `src/index.css`.
- Many dark-mode overrides use `!important` (e.g. `.text-muted`). Respect them;
  do not remove them casually — they fix contrast in dark mode.
- `AIBackground.jsx` uses a fixed `<canvas id="ai-bg-canvas">` with
  theme-sensitive blending (`mix-blend-mode` changes between dark/light themes).
  If you adjust its colors, opacity, or blend settings, test both themes.

### Anchor navigation
- Sections are identified by `id`: `hero`, `about`, `experience`,
  `ai-pipeline`, `skills`, `education`, `contact`, `resume`.
- The `Navbar` uses a `scrollTo(id)` helper that **offsets ~135px** to account
  for the fixed navbar. Keep that offset in mind if you change navbar height.

### Fixed navbar
- `.navbar-header` is `position: fixed`. `index.css` contains explicit
  `!important` rules to prevent hero-content overlap. Be cautious when
  changing navbar height or hero layout — test on desktop **and** mobile.

### AI background graph (`AIBackground.jsx`)
- The background is a **custom hierarchical Agentic AI workflow canvas** for
  this portfolio site. Treat it as first-party project UI, not as an imported
  concept from another app.
- The component is intentionally **re-creatable from this file alone**. Its
  architecture is:
  1. `buildWorkflowSpec(profile)` derives a `{ nodes, edges }` graph from
     `profile.json` content.
  2. `nodes` are descriptor objects with fields like
     `key`, `label`, `tier`, `row`, `type`, `alwaysLabel`, `mobileHidden`.
  3. `edges` define directed connections between node keys.
  4. `getTierX()` maps `tier` values into visual columns, while `row` (0..1)
     controls the vertical position inside each column.
- It should read left-to-right as an architecture flow such as:
  `User Query → Copilot/AI Agent → Intent Router / Task Planner → LLM /
  Guardrails / Tool Runner → RAG / Search / API → Storage / Platform / Trace`.
- Prefer **short technical labels** (`Azure OpenAI`, `LangGraph`, `FastAPI`,
  `Vector Index`, `Svc Bus`, `Eval + Trace`) over long prose. The goal is that
  a viewer can immediately associate the graph with a real Agentic AI workflow.
- Agent/project labels should be based on real portfolio content where possible
  (e.g. `Doc Review Agent`, `Procurement Bot`, `Portfolio Agent`). If profile data changes,
  update the workflow labels via profile-derived logic before hard-coding new
  names.
- Node color semantics are meaningful and should stay consistent unless the
  whole visual language is intentionally redesigned:
  - `query` → green
  - `mcp` / orchestrator / agent nodes → blue
  - `symbol` / planning / guardrail / trace nodes → purple
  - `file` / data / retrieval / runtime nodes → cyan
- Motion model:
  - nodes drift around `homeX/homeY` using spring + damping
  - connection lines are always visible at low opacity
  - query waves periodically radiate from upstream nodes
  - particles travel **along graph edges** to imply tool/data flow
  - shooting stars are decorative ambient accents only
  - hierarchy rings are optional visual structure for tablet/desktop
- The component intentionally supports **desktop and mobile** with different
  visible-node densities. On mobile, some lower-priority nodes may be hidden,
  but the main workflow must still remain readable and visibly animated.
- It supports `prefers-reduced-motion`, pauses when the tab is hidden, and uses
  theme-sensitive `mix-blend-mode`; preserve those behaviors when modifying it.

### Vite config
- `base: './'` is set so asset paths are relative — this is **required** for
  GitHub Pages subpath hosting. Do not remove it.
- Static files referenced by URL (e.g. `/assets/img/...`, `/favicon.svg`) live
  in `public/` and are served from the site root.

### Do NOT commit
- `dist/`, `node_modules/`, `.env*` — all gitignored. Never commit build output
  or dependencies.

### Client confidentiality (IMPORTANT)
- This portfolio is **public**. Client engagements must be described **without
  naming the client or its internal project codes.**
- Refer to clients by **sector**, not name — e.g. `Multilateral Development
  Institution`. Use **descriptive-generic** project titles (e.g. `Document
  Compliance Review Agent`, `Procurement Policy Assistant`, `Portfolio
  Monitoring & Results Agent`) instead of the client's internal product names
  or acronyms.
- Keep summaries **technical** (architecture, stack, outcome) and drop
  client-specific business rules, document-type names, and internal volume
  limits.
- When you rename a project in `profile.json`, you must also update
  `shortProjectName()` in `AIBackground.jsx` (its matchers key off the title
  string), `AIPipelineVisualizer.jsx` if the project has a pipeline, and
  `scripts/generate_resume.py` output — then **regenerate the PDF** (§7).
- Do **not** add client names back in comments, commit messages, `AGENT.md`,
  `org.yaml`, or `components.yaml`.

---

## 6. Components (`src/components/`)

| Component | Role |
|---|---|
| `App.jsx` | Root; handles theme state, profile loading, project modal selection; composes all sections in order |
| `AIBackground.jsx` | Fixed animated hierarchical Agentic AI workflow canvas background (`#ai-bg-canvas`), built specifically for this portfolio and populated from profile data |
| `Navbar.jsx` | Fixed header: logo, desktop links, theme toggle, "Get In Touch", mobile drawer (contains the **Download Resume** link) |
| `Hero.jsx` | Name, tagline, tech pills, CTAs, and photo ⇄ RAG-diagram switcher |
| `About.jsx` | Summary + highlights |
| `Experience.jsx` | Timeline of roles/projects; opens `ProjectModal` on selection |
| `AIPipelineVisualizer.jsx` | **"Live AI Agent Workflow Visualizer"** — interactive step/console simulator |
| `Skills.jsx` | Skill bars grouped by category |
| `EducationCertifications.jsx` | Education & certifications |
| `Contact.jsx` | Contact info & channels |
| `Footer.jsx` | Footer |
| `JBRLogo.jsx` | SVG logo component |
| `LiveClock.jsx` | Live clock |
| `ProjectModal.jsx` | Modal showing project details |
| `RAGResourceSetupDiagram.jsx` | Azure RAG topology diagram (used in Hero switcher) |
| `RAGWorkflowDiagram.jsx` | RAG workflow diagram |

---

## 7. The resume PDF (`public/Jaibir-Singh-Resume.pdf`)

- This file is **generated**, not hand-authored. Its generator is
  `scripts/generate_resume.py`.
- It reads content from `src/data/profile.json` and writes the PDF using
  **ReportLab**.
- **Always regenerate** (never hand-edit the binary PDF):

  ```bash
  python3 -m venv /tmp/resume-pdf-venv
  /tmp/resume-pdf-venv/bin/pip install reportlab
  /tmp/resume-pdf-venv/bin/python scripts/generate_resume.py
  ```

- The resume contact line includes the **clickable profile website link**
  `https://jbr2021.github.io`, labeled `Profile Website:`. If you change the
  domain, update `profile.json` → `personal.website` and regenerate.
- The "Download Resume" action is wired in:
  - `Navbar.jsx` mobile drawer (`./Jaibir-Singh-Resume.pdf` with `download`), and
  - `Hero.jsx` CTA row.
  Keep these paths consistent if the PDF is renamed.

---

## 8. The "Live AI Agent Workflow Visualizer" (`AIPipelineVisualizer.jsx`)

This is the most stateful component. It was refactored to fix step-counter bugs.
Understand the invariants **before** touching it:

- There are three pipelines (`PIPELINES`): `docReviewAgent`, `procurementAssistant`,
  `portfolioAgent`, each with exactly **4 steps**.
- The step index is driven by a **single source of truth** — the `activeStep`
  state — which is **bounded** by `total` (steps length). `[STEP n/N]` can
  never exceed `N/N`.
- Steps advance via a **self-cleaning `setTimeout` chain in a `useEffect`**
  (NOT a raw `setInterval`). This prevents leaked timers and stale-pipeline
  bugs.
- **Pipeline tabs are disabled while `isRunning`** — switching mid-run is not
  allowed (it previously caused skipped/jumping steps).
- The console resets at the start of every run so it always begins at
  `STEP 1/N`.
- `.console-body` has a **fixed height of 180px** (`height: '180px'`,
  `overflowY: 'auto'`) — do NOT revert to `maxHeight`, which caused layout
  fluctuation — and **auto-scrolls to the bottom** as logs stream in (via a
  `useEffect` watching `logs`).
- Stepper highlight logic: current step = cyan glow while running; completed =
  `idx < activeStep` (strict `<`, not `<=`, to avoid the off-by-one bug).

---

## 9. Common commands

```bash
npm install          # install dependencies
npm run dev          # start Vite dev server (http://localhost:3000)
npm run build        # production build → dist/
npm run preview      # preview the production build
npm run deploy       # gh-pages -d dist (manual deploy)
```

---

## 10. CI/CD & deployment

- `.github/workflows/main.yml` builds and deploys to GitHub Pages
  **on every push to `main`** (and manual `workflow_dispatch`).
- The workflow runs `npm ci`, `npm run build`, then deploys the `dist/`
  directory. You do **not** need to commit `dist/` — CI builds it.
- Because deployment is trigger-based on `main`, local changes are not live
  until merged/deployed.

---

## 11. Backstage catalog files (currently unrendered)

- The **"Backstage IDP Platform"** section (`BackstageCatalog.jsx`, section id
  `backstage`, nav label "Platform Mesh") has been **removed** from the site,
  together with its desktop and mobile `Navbar` links. Do **not** re-add it
  unless explicitly asked.
- `org.yaml`, `components.yaml`, and `profile.json` → `backstageCatalog` are
  now **orphaned** — nothing imports or renders them. They mirror a client's
  internal org structure, so treat them as sensitive (see "Client
  confidentiality" in §5); prefer deleting them over extending them.
- Other Backstage **mentions** are intentionally kept — the `Backstage IDP`
  tech pill, the `Backstage IDP (Catalog, Scaffolder, TechDocs)` skill bar, the
  "Internal Developer Portal (Backstage)" experience entry, and the
  `platformLabel` in `AIBackground.jsx`. Those describe skills and experience,
  not the removed section.

---

## 12. Definition of done (checklist)

Before finishing any change, verify:

- [ ] `npm run build` completes without errors.
- [ ] The change reads from `profile.json` rather than hard-coding content.
- [ ] No `dist/`, `node_modules/`, or env files are staged in git.
- [ ] Dark **and** light themes both render correctly.
- [ ] Mobile (drawer nav) and desktop layouts still work.
- [ ] If `AIBackground.jsx` changed, the workflow hierarchy still reads clearly,
      labels remain short and profile-relevant, and the animation is visible on
      both desktop and mobile.
- [ ] If the resume PDF changed, it was regenerated via
      `scripts/generate_resume.py` (and `public/Jaibir-Singh-Resume.pdf` updated).
- [ ] If you touched `AIPipelineVisualizer`, step numbers stay within `1..4`
      and the console auto-scrolls with a fixed 180px height.