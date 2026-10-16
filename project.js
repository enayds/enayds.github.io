(function () {
  "use strict";
  var PROJECTS = window.PROJECTS || [];
  var slug = document.body.getAttribute("data-slug");
  var root = document.getElementById("case-study");
  var BASE = "../../";
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  var idx = -1;
  for (var i = 0; i < PROJECTS.length; i++) if (PROJECTS[i].slug === slug) idx = i;
  if (idx < 0) {
    root.innerHTML = '<section class="cs-head dark"><div class="wrap"><a class="back" href="' + BASE + '#work">All work</a><h1>Project not found</h1><p class="cs-summary">Check that the slug in this page matches an entry in assets/js/projects.js.</p></div></section>';
    return;
  }
  var p = PROJECTS[idx];
  var next = PROJECTS[(idx + 1) % PROJECTS.length];
  var AREA_LABEL = { business: "Business analysis", data: "Data analysis", science: "Data science" };

  if (!document.title || document.title === "Project") document.title = p.title + ": " + p.question + " | Chinedu Egbuna";

  var links = "";
  if (p.links && p.links.tableau) links += '<a class="btn btn-primary" href="' + esc(p.links.tableau) + '" target="_blank" rel="noopener">Open the dashboard in Tableau</a>';
  if (p.links && p.links.github) links += '<a class="btn ' + (links ? "btn-ghost" : "btn-primary") + '" href="' + esc(p.links.github) + '" target="_blank" rel="noopener">View the code on GitHub</a>';
  if (p.links && p.links.live) links += '<a class="btn btn-ghost" href="' + esc(p.links.live) + '" target="_blank" rel="noopener">See it live</a>';

  var meta = [["Type", p.type], ["My role", p.role], ["Tools", (p.tools || []).join(", ")], ["Areas", (p.areas || []).map(function (a) { return AREA_LABEL[a]; }).join(", ")]];
  if (p.year) meta.splice(1, 0, ["Year", p.year]);
  meta = meta.slice(0, 4);

  var head =
    '<section class="cs-head dark"><div class="wrap">' +
    '<a class="back" href="' + BASE + '#work"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>All work</a>' +
    '<p class="cs-type">' + esc(p.type) + (p.simulated ? ' <span class="simulated" style="margin-left:8px">Simulated data</span>' : "") + "</p>" +
    "<h1>" + esc(p.title) + "</h1>" +
    '<p class="cs-q">' + esc(p.question) + "</p>" +
    '<p class="cs-summary">' + esc(p.summary) + "</p>" +
    '<dl class="cs-meta">' + meta.map(function (m) { return "<div><dt>" + esc(m[0]) + "</dt><dd>" + esc(m[1]) + "</dd></div>"; }).join("") + "</dl>" +
    (links ? '<div class="cs-links">' + links + "</div>" : "") +
    "</div></section>";

  var findings = (p.findings && p.findings.length)
    ? '<div class="findings">' + p.findings.map(function (f) { return '<div class="finding"><strong>' + esc(f.value) + "</strong><span>" + esc(f.label) + "</span></div>"; }).join("") + "</div>"
    : "";

  var embedSlot = '<div class="embed" id="embed"></div>';
  var secs = p.sections || [];
  var embedIn = !p.tableauEmbed || !secs.length ? null
    : (secs.some(function (x) { return x.id === "dashboard"; }) ? "dashboard" : secs[Math.min(1, secs.length - 1)].id);
  var sections = secs.map(function (s, k) {
    var extra = "";
    if (k === 0 && findings) extra += findings;
    if (s.id === embedIn) extra += embedSlot;
    return '<section id="' + esc(s.id) + '"><h2>' + esc(s.heading) + "</h2>" + s.html + extra + "</section>";
  }).join("");

  var artefacts = (p.artefacts && p.artefacts.length)
    ? '<section id="artefacts"><h2>Project documents</h2><div class="artefacts">' + p.artefacts.map(function (a) {
        var inner = "<div><b>" + esc(a.name) + "</b><small>" + esc(a.note || "") + '</small></div><span class="status">' + (a.url ? "Open" : "Coming soon") + "</span>";
        return a.url ? '<a class="artefact" href="' + esc(/^https?:/.test(a.url) ? a.url : BASE + a.url) + '" target="_blank" rel="noopener">' + inner + "</a>" : '<div class="artefact">' + inner + "</div>";
      }).join("") + "</div></section>"
    : "";

  var tocItems = (p.sections || []).map(function (s) { return { id: s.id, h: s.heading }; });
  if (artefacts) tocItems.push({ id: "artefacts", h: "Project documents" });
  var toc = '<nav class="toc" aria-label="On this page"><p>On this page</p><ol>' + tocItems.map(function (t) { return '<li><a href="#' + esc(t.id) + '">' + esc(t.h) + "</a></li>"; }).join("") + "</ol></nav>";

  var author = '<div class="author"><img src="' + BASE + 'assets/img/chinedu-glasses.jpg" alt="Chinedu Egbuna" width="72" height="72" loading="lazy"><p><b>Chinedu Egbuna</b><br>Business analyst, data analyst and data scientist in Abuja. <a href="' + BASE + '#contact">Get in touch</a>.</p></div>';

  root.innerHTML = head +
    '<div class="light"><div class="wrap cs-body">' + toc + '<article class="prose">' + sections + artefacts + author + "</article></div></div>" +
    (next && next.slug !== p.slug ? '<section class="dark"><div class="wrap"><a class="next-project" href="' + BASE + "projects/" + esc(next.slug) + '/"><span>Next project</span><b>' + esc(next.title) + "</b></a></div></section>" : "");

  /* ---------- Tableau embed: live on wide screens, image link on phones ---------- */
  var slot = document.getElementById("embed");
  if (slot && p.tableauEmbed) {
    var e = p.tableauEmbed;
    var href = (p.links && p.links.tableau) || "#";
    var cover = p.cover ? (/^https?:/.test(p.cover) ? p.cover : BASE + p.cover) : "";
    var caption = '<div class="embed-caption"><span>' + (p.simulated ? "Built on a simulated dataset. " : "") + 'Interactive: use the filters and hover for detail.</span><a class="btn btn-ghost" href="' + esc(href) + '" target="_blank" rel="noopener">Open full screen in Tableau</a></div>';
    if (window.matchMedia("(min-width: 1000px)").matches) {
      var id = "viz-" + p.slug;
      var param = e.path ? "<param name='path' value='" + esc(e.path) + "' />" : "<param name='site_root' value='' /><param name='name' value='" + esc(e.name) + "' /><param name='tabs' value='no' />";
      slot.innerHTML = '<div class="embed-frame"><div class="tableauPlaceholder" id="' + id + '" style="position: relative"><object class="tableauViz" style="display:none;">' +
        "<param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /><param name='embed_code_version' value='3' />" + param +
        "<param name='toolbar' value='yes' /><param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /></object></div></div>" + caption;
      var obj = document.getElementById(id).getElementsByTagName("object")[0];
      obj.style.width = (e.width || 1200) + "px";
      obj.style.height = (e.height || 900) + "px";
      var s = document.createElement("script");
      s.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
      obj.parentNode.insertBefore(s, obj);
    } else {
      slot.innerHTML = '<a class="embed-fallback" href="' + esc(href) + '" target="_blank" rel="noopener">' + (cover ? '<img src="' + esc(cover) + '" alt="Preview of the ' + esc(p.title) + ' dashboard" loading="lazy">' : "") + "<span>Open the interactive dashboard in Tableau</span></a>" + caption.replace('<a class="btn btn-ghost"', '<a class="btn btn-ghost" hidden');
    }
  }

  /* ---------- Let a wide dashboard use the full page width, centred ---------- */
  function widenEmbed() {
    var el = document.getElementById("embed");
    if (!el || !el.querySelector(".tableauPlaceholder")) return;
    el.style.width = ""; el.style.marginLeft = "";
    var vw = document.documentElement.clientWidth;
    var w = Math.min((p.tableauEmbed.width || 1200) + 2, vw - 48);
    var parentLeft = el.parentElement.getBoundingClientRect().left;
    el.style.width = w + "px";
    el.style.marginLeft = ((vw - w) / 2 - parentLeft) + "px";
  }
  widenEmbed();
  window.addEventListener("resize", widenEmbed);

  /* ---------- Contents highlight ---------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  if ("IntersectionObserver" in window && tocLinks.length) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove("active"); });
        if (map[en.target.id]) map[en.target.id].classList.add("active");
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll(".prose section").forEach(function (sec) { io.observe(sec); });
  }
})();
