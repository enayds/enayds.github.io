/*
  PROJECTS — the only file you edit to add or change a project.
  Each entry powers its card on the home page and its case-study page
  at /projects/<slug>/. See README.md, "Add a project".

  Fields
  - slug:        folder name under /projects/ (lowercase, hyphens)
  - title:       project name
  - question:    the one-line question or promise the project answers
  - summary:     2–3 sentences for cards and the page intro
  - areas:       any of "business", "data", "science" (drives filters and the role switcher)
  - year, type:  shown in the page header
  - role:        what you did
  - tools:       list of tools
  - cover:       image path (relative to the site root) or null for a text cover
  - links:       { tableau, github, live } — leave out any you don't have
  - tableauEmbed: { path } or { name } from Tableau's embed code, to show the live dashboard
  - simulated:   true if the data is synthetic
  - findings:    up to 3 { value, label } shown as large numbers
  - sections:    [{ id, heading, html }] — the case study itself, in order
  - artefacts:   [{ name, note, url }] — url null shows "Coming soon"
*/
window.PROJECTS = [
  {
    slug: "airand",
    title: "Airand",
    question: "Can a bicycle delivery zone for small vendors pay for itself?",
    summary: "A business analysis case study taking an unfinished delivery idea in New Owerri from problem to tested solution: research, requirements, process redesign, wireframes, a data model, SQL, a Tableau dashboard and a UAT pack.",
    areas: ["business", "data"],
    featured: true,
    year: "2026",
    type: "Business analysis case study",
    role: "Business analyst and data analyst (solo)",
    tools: ["Requirements (BRD, SRS)", "Wireframes", "SQL", "Python", "Tableau"],
    cover: "https://public.tableau.com/static/images/RG/RG58NCYT6/1.png",
    links: { tableau: "https://public.tableau.com/shared/RG58NCYT6", github: "https://github.com/enayds/Airand" },
    tableauEmbed: { path: "shared/RG58NCYT6", width: 1240, height: 1287 },
    simulated: true,
    findings: [
      { value: "30 July", label: "The 7-day average passed break-even four weeks into the pilot" },
      { value: "96%", label: "of deliveries reached the door within 30 minutes of pickup" },
      { value: "1 in 5", label: "requests waited for a cyclist, almost all when only one shift was on" }
    ],
    sections: [
      { id: "problem", heading: "The problem", html: `
        <p>Small food vendors in New Owerri take orders by phone and WhatsApp, then phone around for a rider. Fees are negotiated per trip, food waits for the rider to arrive, and nobody keeps a record. The original Airand plan proposed bicycle couriers stationed outside eateries, tracked on paper slips.</p>
        <p>I treated that plan as a starting point, not an answer, and asked what specific operational problem Airand could solve better than the options vendors already have.</p>` },
      { id: "research", heading: "Research changed the problem", html: `
        <p>Desk research showed the market had moved since the plan was written: Chowdeck (February 2025) and Bolt Send (August 2026) both now operate in Owerri, and local start-ups already offer upfront pricing and tracking. "Small vendors have no delivery option" was no longer true.</p>
        <p>The defensible gap was narrower: nobody keeps dedicated capacity <em>in the neighbourhood, at a flat price, through the 7–11 PM peak</em>. A unit-economics model set the target: a fixed ₦700–₦1,000 fee, and break-even at about 46 deliveries a day for ten cyclists.</p>` },
      { id: "stakeholders", heading: "Stakeholders and today's process", html: `
        <p>I mapped eleven stakeholders and drew the current process across vendor, rider and receiver. It fails at five points: no rider available, a negotiated fee, food waiting for pickup, riders diverting to better fares, and receivers who can't be reached. Twelve pain points traced back to four root causes: no committed capacity, no record, no pricing rule, and addresses captured by voice.</p>
        <p class="note">Stakeholder interviews in this case study are simulated and labelled as such in every document.</p>` },
      { id: "requirements", heading: "Requirements", html: `
        <p>The Business Requirements Document turns the four root causes into 23 business requirements and 24 business rules: a fixed zone rate paid up front and held until the delivery completes, tiered refunds, automatic assignment to the nearest free cyclist, and a one-time code to prove the right person received the package.</p>
        <p>The Software Requirements Specification breaks those into 53 functional and 14 non-functional requirements and 38 user stories with acceptance criteria, with every requirement traced back to a business need.</p>` },
      { id: "design", heading: "Future process and design", html: `
        <p>The redesigned process gives every delivery an eleven-state lifecycle, so each step is timestamped and attributed. A system admin watches the zone and steps in only on exceptions. I wireframed the four products — admin console, vendor app, cyclist app and receiver status page — and traced each screen back to the requirements it satisfies.</p>` },
      { id: "data", heading: "Data model and SQL", html: `
        <p>Twelve tables, with an append-only event table as the source of truth, so every KPI is computed from facts. I generated a 90-day synthetic dataset with Python to that schema, then wrote SQL views and one query per KPI — 23 in total, each defined once in a KPI document so the numbers can't drift between reports.</p>` },
      { id: "dashboard", heading: "Dashboard", html: `
        <p>Four Tableau dashboards answer four questions: is the zone viable, are we staffed for demand, which vendors need a conversation, and is the cyclist pool the right size and shape. The Story below walks through the findings.</p>` },
      { id: "testing", heading: "Testing", html: `
        <p>The UAT pack has 49 tests: a scenario for each of the 30 Must user stories, 12 exception and boundary tests (payment expiry, a cancellation in the same second as acceptance, a code entered wrongly three times), and six operational checks for requirements with no screen, such as courier licensing and cyclist training.</p>` },
      { id: "results", heading: "What the simulated pilot showed", html: `
        <p>Zone 1 lost ₦374k in its first month, crossed break-even on 30 July and earned ₦706k in September, at ₦558 cost per delivery against a ₦900 fee. Service held up, but one request in five waited for a cyclist — almost all before 15:30 or after 20:00, when only one shift was on.</p>
        <p>The recommendation is a roster change, not more cyclists: test a 14:00–22:00 shift with the same ten people so lunch and the evening peak both overlap.</p>` },
      { id: "lessons", heading: "What I learned", html: `
        <ul>
          <li>Research earned its place: it changed the problem statement, and the case study is stronger for saying so.</li>
          <li>Writing business rules before system requirements saved rework — the sponsor's payment and refund decisions changed four documents at once, and the traceability made that safe.</li>
          <li>Defining each KPI once, in words and then in SQL, is what made the dashboard trustworthy.</li>
        </ul>` }
    ],
    artefacts: [
      { name: "Business Requirements Document", note: "23 requirements, 24 business rules (Word)", url: "https://github.com/enayds/Airand/raw/master/docs/Airand%20%E2%80%94%20Business%20Requirements%20Document%20%28BRD%29.docx" },
      { name: "Software Requirements Specification", note: "53 FRs, 38 user stories, traceability (Word)", url: "https://github.com/enayds/Airand/raw/master/docs/Airand%20%E2%80%94%20Software%20Requirements%20Specification%20%28SRS%29.docx" },
      { name: "Wireframes", note: "9 screens across 4 products (PDF)", url: "https://github.com/enayds/Airand/blob/master/docs/Airand_Wireframes.pdf" },
      { name: "Data model", note: "12 tables, data dictionary, event taxonomy (Word)", url: "https://github.com/enayds/Airand/raw/master/docs/Airand%20%E2%80%94%20Data%20Model%20%26%20Data%20Dictionary.docx" },
      { name: "KPI definitions", note: "23 KPIs, driver tree, thresholds (Word)", url: "https://github.com/enayds/Airand/raw/master/docs/Airand%20%E2%80%94%20KPI%20Definitions.docx" },
      { name: "SQL and synthetic data", note: "Generator, SQLite database, SQL views and KPI queries", url: "https://github.com/enayds/Airand" },
      { name: "UAT pack", note: "49 tests and traceability (Word)", url: "https://github.com/enayds/Airand/raw/master/docs/Airand%20%E2%80%94%20UAT%20Pack.docx" }
    ]
  },
  {
    slug: "splendor-hotel",
    title: "Splendor Hotel Group",
    question: "Where is a hotel group losing revenue, and to whom?",
    summary: "A Tableau analysis of hotel bookings: revenue earned and lost to cancellations by month, average daily rate, length of stay, lead time, and which markets and hotel types drive the business.",
    areas: ["data"],
    year: "",
    type: "Data analysis",
    role: "Data analyst",
    tools: ["Tableau", "Calculated fields", "Parameters"],
    cover: "assets/img/splendor-hotel.jpg",
    links: { tableau: "https://public.tableau.com/app/profile/chinedu.egbuna/viz/SHGAnalysis/Dashboard22" },
    tableauEmbed: { name: "SHGAnalysis/Dashboard22", width: 1500, height: 927 },
    findings: [
      { value: "$29.6M", label: "revenue generated across the period" },
      { value: "$13.1M", label: "lost to cancellations" },
      { value: "44K", label: "of 119K bookings cancelled" }
    ],
    sections: [
      { id: "question", heading: "The question", html: `
        <p>Splendor Hotel Group wanted to understand its bookings: when revenue comes in, how much is lost to cancellations, and which customers and markets matter most.</p>` },
      { id: "approach", heading: "Approach", html: `
        <p>I built a single interactive dashboard in Tableau with filters for year, deposit type and customer type, using calculated fields for revenue lost, average daily rate and lead time in weeks.</p>` },
      { id: "findings", heading: "What the dashboard shows", html: `
        <p>Revenue peaks in July and August ($4.3M and $5.1M) — and so do losses to cancellation ($2.3M and $2.9M). Over a third of bookings (44K of 119K) were cancelled. City hotels carry about twice the bookings of resorts, and Portugal leads the countries by profit, followed by the UK and France.</p>` },
      { id: "next", heading: "What I'd explore next", html: `
        <p>Whether deposit type and lead time predict cancellation well enough to target a deposit policy at the riskiest peak-season bookings.</p>` }
    ],
    artefacts: []
  },
  {
    slug: "sales-analysis",
    title: "Sales analysis dashboard",
    question: "Which categories, segments and shipping modes drive sales over time?",
    summary: "An interactive Tableau dashboard for exploring sales by category, customer segment and shipping mode, and tracking performance over time.",
    areas: ["data"],
    year: "",
    type: "Data analysis",
    role: "Data analyst",
    tools: ["Tableau", "Data preparation"],
    cover: "https://public.tableau.com/static/images/My/MySalesAnalysis/Dashboard2/1.png",
    links: { tableau: "https://public.tableau.com/app/profile/chinedu.egbuna/viz/MySalesAnalysis/Dashboard2" },
    tableauEmbed: { name: "MySalesAnalysis/Dashboard2", width: 1200, height: 900 },
    findings: [],
    sections: [
      { id: "question", heading: "The question", html: `
        <p>A sales team needs to see, in one place, which product categories and customer segments drive revenue, how shipping choices affect it, and how performance moves over time.</p>` },
      { id: "approach", heading: "Approach", html: `
        <p>I prepared the sales data and built an interactive dashboard with views by category, segment and shipping mode, plus a time trend, so a manager can filter to any slice and compare.</p>` }
    ],
    artefacts: []
  },
  {
    slug: "housing-price-prediction",
    title: "Housing price prediction",
    question: "Can listing data scraped from the web predict a property's price?",
    summary: "An end-to-end data science project: scraping a real-estate listing site with Python, cleaning semi-structured HTML into a dataset, and training a model to estimate property prices.",
    areas: ["science"],
    year: "",
    type: "Data science, academic project",
    role: "Data scientist",
    tools: ["Python", "BeautifulSoup", "Pandas"],
    cover: null,
    links: {},
    findings: [],
    sections: [
      { id: "question", heading: "The question", html: `
        <p>Property prices are hard to compare across a city. Could the details already published on listings — location, size, rooms — predict a fair price?</p>` },
      { id: "data", heading: "Getting the data", html: `
        <p>I wrote a Python scraper with BeautifulSoup that walked through multiple listing pages and pulled the details out of semi-structured HTML, then cleaned and structured the results into an analysis-ready dataset.</p>` },
      { id: "model", heading: "The model", html: `
        <p>I explored the data for pricing patterns and trained a predictive model to estimate prices, giving a basis for spotting over- and under-priced listings and trends across areas.</p>` }
    ],
    artefacts: []
  },
  {
    slug: "ai-medcare",
    title: "AI Medcare",
    question: "Can a chatbot help patients get a first assessment before they see a doctor?",
    summary: "A hackathon team project: an AI-powered medical chatbot that asks about symptoms and gives a preliminary assessment. I wrote the Software Requirements Specification that aligned the designer and developers.",
    areas: ["business", "science"],
    year: "2024–25",
    type: "Hackathon, team of 5",
    role: "Business analyst (SRS author) and team member",
    tools: ["SRS", "AI language API", "GitHub"],
    cover: null,
    links: { github: "https://github.com/M-tech1/AI-Healthcare-Diagnosis-system" },
    findings: [],
    sections: [
      { id: "question", heading: "The question", html: `
        <p>Patients often don't know whether a symptom needs a doctor today. The Outsource Global hackathon challenge was to help them get a first assessment quickly.</p>` },
      { id: "role", heading: "My part", html: `
        <p>I authored the Software Requirements Specification for a cross-functional team of five, so the product designer and developers worked to one shared definition of the system — fewer revision rounds and a faster build.</p>` },
      { id: "build", heading: "What we built", html: `
        <p>A chatbot that takes a conversation about symptoms and uses an AI language API to produce a preliminary assessment, designed to support triage rather than replace a clinician.</p>` }
    ],
    artefacts: []
  }
];

/* Role switcher on the home page: one panel per area, each pointing at a project slug. */
window.ROLES = [
  { area: "business", title: "Business Analyst", line: "Requirements, process redesign and traceability, from a business problem to a tested solution.", project: "airand" },
  { area: "data", title: "Data Analyst", line: "Dashboards and analysis that turn operational data into decisions people act on.", project: "splendor-hotel" },
  { area: "science", title: "Data Scientist", line: "Predictive models built end to end, from collecting the data to a working estimate.", project: "housing-price-prediction" }
];
