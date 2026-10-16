# Chinedu Egbuna: portfolio website

**Live site: [enayds.github.io](https://enayds.github.io)**

I'm a business analyst, data analyst and data scientist based in Abuja, Nigeria. This repository is the source of my portfolio: a small, fast, static website that presents my case studies, from business problem to requirements, data, dashboards and testing.

---

## What you'll find on the site

| Section | What it shows |
| --- | --- |
| **Home** | Who I am, with a hero that switches between my three areas of work (Business Analyst, Data Analyst, Data Scientist), each with a featured project |
| **Selected work** | Every project, filterable by business analysis, data analysis or data science |
| **Case studies** | One page per project: the question, my role and tools, key findings, the live Tableau dashboard where there is one, and downloadable project documents |
| **Expertise** | Strengths and tools in each discipline |
| **How I work** | The five steps I follow on every project |
| **About** | Experience, education, certifications and my CV |
| **Contact** | Email, LinkedIn and GitHub |

### Projects

| Project | Area | What it is |
| --- | --- | --- |
| [Airand](https://enayds.github.io/projects/airand/) | Business analysis, data analysis | Full case study of a bicycle delivery service for small vendors: research, BRD, SRS, wireframes, data model, SQL, Tableau dashboard and UAT. Built on a simulated dataset. |
| [Splendor Hotel Group](https://enayds.github.io/projects/splendor-hotel/) | Data analysis | Tableau analysis of hotel revenue and revenue lost to cancellations |
| [Sales analysis dashboard](https://enayds.github.io/projects/sales-analysis/) | Data analysis | Interactive Tableau dashboard of sales by category, segment and shipping mode |
| [Housing price prediction](https://enayds.github.io/projects/housing-price-prediction/) | Data science | Web scraping with Python and a model to estimate property prices |
| [AI Medcare](https://enayds.github.io/projects/ai-medcare/) | Business analysis, data science | Hackathon medical chatbot; I wrote the Software Requirements Specification |

---

## How it's built

- **Plain HTML, CSS and JavaScript.** No framework, no build step: what's in this repository is exactly what the browser loads.
- **Hosted on GitHub Pages** from the `master` branch, root folder.
- **One data file drives every project.** `assets/js/projects.js` holds each project's text, findings, links and documents. The home page cards and every case-study page are generated from it, so adding a project doesn't mean redesigning anything.
- **Responsive and accessible.** Works on phones and desktops; keyboard-friendly; respects the "reduce motion" setting (the hero stops auto-advancing).
- **Live dashboards.** Tableau Public dashboards are embedded on wide screens; phones get a preview image that opens Tableau.
- **Design:** graphite and off-white with a single lime accent; headings in Bricolage Grotesque, text in Figtree (Google Fonts).

---

## Repository structure

```
.
├── index.html                  Home page
├── projects/
│   ├── _template/index.html    Copy this to create a new project page
│   ├── airand/index.html
│   ├── splendor-hotel/index.html
│   ├── sales-analysis/index.html
│   ├── housing-price-prediction/index.html
│   └── ai-medcare/index.html
├── assets/
│   ├── css/site.css            All styles (colours and fonts at the top)
│   ├── js/projects.js          Project data and hero roles  ← edit this to add or change projects
│   ├── js/site.js              Home page: menu, role switcher, project cards, filters
│   ├── js/project.js           Builds each case-study page from projects.js
│   ├── img/                    Photos and project screenshots
│   ├── docs/                   Downloadable project documents (PDF, ZIP)
│   └── cv/                     CV (PDF)
├── .nojekyll                   Tells GitHub Pages to serve files as-is
└── README.md
```

---

## Add a new project

1. **Describe it.** In `assets/js/projects.js`, copy an existing project block and change its fields: `slug`, `title`, `question`, `summary`, `areas`, `role`, `tools`, `cover`, `links`, `findings`, `sections` and `artefacts`. The comment at the top of the file explains each field.
2. **Give it a page.** Copy `projects/_template/` to `projects/<slug>/`. In its `index.html`, set `data-slug="<slug>"` and update the title and description lines in the `<head>` (they control the browser tab and the LinkedIn link preview).
3. **Add images and documents.** Screenshots go in `assets/img/`, documents in `assets/docs/`. Reference them from the project's `cover` and `artefacts` entries.
4. **Optionally feature it** in the hero by pointing a role in `window.ROLES` (bottom of `projects.js`) at the new slug.

The project then appears on the home page, in the filters and in the "Next project" links automatically.

---

## Run it locally

Any static file server works. From the repository folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` directly also works, but a local server is closer to how GitHub Pages behaves.)

---

## Deploy

Push to `master`. GitHub Pages rebuilds automatically; check progress under the **Actions** tab ("pages build and deployment"). Changes are usually live within a minute or two.

---

## Contact

- **Email:** [egbunachineduvictor@gmail.com](mailto:egbunachineduvictor@gmail.com)
- **LinkedIn:** [linkedin.com/in/enayds](https://www.linkedin.com/in/enayds/)
- **GitHub:** [github.com/enayds](https://github.com/enayds)
- **Tableau Public:** [public.tableau.com/app/profile/chinedu.egbuna](https://public.tableau.com/app/profile/chinedu.egbuna)

---

*Content, photos and project material © Chinedu Egbuna. Figures in the Airand case study come from a simulated dataset created for the portfolio and are labelled as such on the site.*
