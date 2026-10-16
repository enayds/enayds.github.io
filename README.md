# Chinedu Egbuna: portfolio

Static website for GitHub Pages. No build tools: plain HTML, CSS and JavaScript.

## Put it online (first time, about 10 minutes)

1. Sign in to GitHub as **enayds**.
2. Create a new repository named exactly **`enayds.github.io`**, set it to **Public**, and tick "Add a README file".
3. In the repository, click **Add file → Upload files**. Drag in **everything inside this folder** (index.html, the `assets` and `projects` folders, `.nojekyll`, this README). Keep the folder structure. Click **Commit changes**.
   - `.nojekyll` is a hidden file. If your computer hides it, upload it on its own via Add file → Create new file, name it `.nojekyll`, leave it empty, and commit.
4. Go to **Settings → Pages**. Under "Build and deployment", set Source to **Deploy from a branch**, Branch to **main** and folder **/(root)**, then Save.
5. After 1–3 minutes the site is live at **https://enayds.github.io**.

## Change something

Click the file on GitHub, then the pencil icon, edit, and Commit. The site updates in about a minute.

| To change | Edit |
| --- | --- |
| Headline, about text, experience, contact | `index.html` |
| Project text, findings, links, documents | `assets/js/projects.js` |
| The three roles in the hero switcher | `window.ROLES` at the bottom of `assets/js/projects.js` |
| Colours and fonts | the top of `assets/css/site.css` |
| CV | replace `assets/cv/Chinedu_Egbuna_CV.pdf` (same file name) |

## Add a project

1. **Data:** in `assets/js/projects.js`, copy an existing project block `{ ... },`, paste it inside the list, and change its fields. The `slug` becomes the web address, e.g. `churn-analysis` → `/projects/churn-analysis/`.
2. **Page:** copy the folder `projects/_template` to `projects/<your-slug>`. In its `index.html`, change the title and description lines at the top, and set `data-slug="<your-slug>"`.
3. **Images:** put screenshots in `assets/img/` and set `cover: "assets/img/your-image.jpg"` in the project data. With no cover, the card shows a clean text cover.
4. **Optional:** list the project under a role in `window.ROLES` to feature it in the hero.

The new project appears on the home page, in the filters, and in the "Next project" link automatically.

## Link project documents (Airand)

Export each document to PDF, upload it to `assets/docs/`, then set its `url` in the project's `artefacts` list, e.g. `url: "assets/docs/Airand_BRD.pdf"`. Items without a `url` show "Coming soon".

## Notes

- Live Tableau dashboards load on wide screens; phones see a preview image that opens Tableau.
- Respects "reduce motion": the role switcher stops auto-advancing and transitions become simple fades.
- Fonts: Bricolage Grotesque (headings) and Figtree (text), from Google Fonts.
