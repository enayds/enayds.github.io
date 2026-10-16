(function () {
  "use strict";
  var PROJECTS = window.PROJECTS || [];
  var ROLES = window.ROLES || [];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var AREA_LABEL = { business: "Business analysis", data: "Data analysis", science: "Data science" };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function bySlug(slug) { for (var i = 0; i < PROJECTS.length; i++) if (PROJECTS[i].slug === slug) return PROJECTS[i]; return null; }

  // Cover: an image if the project has one, otherwise a text cover. Falls back to text if the image fails.
  window.coverHTML = function (p, base) {
    var text = '<div class="cover-text"><i></i><b>' + esc(p.title) + "</b></div>";
    if (!p.cover) return text;
    var src = /^https?:/.test(p.cover) ? p.cover : (base || "") + p.cover;
    return text + '<img src="' + esc(src) + '" alt="" loading="lazy" onerror="this.remove()" style="position:relative">';
  };

  /* ---------- Menu ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  var menu = document.getElementById("mobile-menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { menu.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Copy email ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () { var old = btn.textContent; btn.textContent = "Copied"; setTimeout(function () { btn.textContent = old; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done); else done();
    });
  });

  /* ---------- Work grid ---------- */
  var grid = document.getElementById("work-grid");
  function card(p) {
    var tags = (p.areas || []).map(function (a) { return '<span class="tag">' + esc(AREA_LABEL[a] || a) + "</span>"; }).join("");
    var sim = p.simulated ? '<span class="simulated">Simulated data</span>' : "";
    return '<a class="work-card' + (p.featured ? " featured" : "") + '" href="projects/' + esc(p.slug) + '/" data-areas="' + esc((p.areas || []).join(" ")) + '">' +
      '<div class="cover">' + window.coverHTML(p, "") + "</div>" +
      '<div class="work-body"><span class="work-type">' + esc(p.type) + "</span>" +
      "<h3>" + esc(p.title) + "</h3>" +
      '<p class="work-q">' + esc(p.question) + "</p>" +
      (p.featured ? "<p class=\"work-q\">" + esc(p.summary) + "</p>" : "") +
      sim + '<div class="tags">' + tags + '</div><span class="work-more">Read the case study</span></div></a>';
  }
  if (grid) {
    var ordered = PROJECTS.filter(function (p) { return p.featured; }).concat(PROJECTS.filter(function (p) { return !p.featured; }));
    grid.innerHTML = ordered.map(card).join("");
    document.querySelectorAll(".chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var f = chip.getAttribute("data-filter");
        document.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
        grid.querySelectorAll(".work-card").forEach(function (el) {
          var show = f === "all" || el.getAttribute("data-areas").split(" ").indexOf(f) > -1;
          el.hidden = !show;
          el.classList.toggle("featured", show && f === "all" && el === grid.firstElementChild && ordered[0].featured);
        });
      });
    });
  }

  /* ---------- Role switcher ---------- */
  var panel = document.getElementById("role-panel");
  var track = document.getElementById("role-track");
  var dots = document.getElementById("role-dots");
  var word = document.getElementById("role-word");
  if (!panel || !track || !ROLES.length) return;

  track.innerHTML = ROLES.map(function (r, i) {
    var p = bySlug(r.project) || {};
    return '<div class="role-slide" id="role-slide-' + i + '" role="tabpanel" aria-roledescription="slide" aria-label="' + (i + 1) + " of " + ROLES.length + ": " + esc(r.title) + '"' + (i ? ' aria-hidden="true"' : "") + ">" +
      "<h2>" + esc(r.title) + "</h2><p>" + esc(r.line) + "</p>" +
      '<a class="role-project" href="projects/' + esc(p.slug) + '/"' + (i ? ' tabindex="-1"' : "") + '>' +
      '<div class="cover">' + window.coverHTML(p, "") + "</div>" +
      '<div class="role-project-body"><div class="role-project-kicker">Featured project: ' + esc(p.title) + '</div><div class="role-project-title">' + esc(p.question) + "</div></div></a></div>";
  }).join("");
  dots.innerHTML = ROLES.map(function (r, i) {
    return '<button class="role-dot" type="button" role="tab" aria-controls="role-slide-' + i + '" aria-selected="' + (i ? "false" : "true") + '"' + (i ? ' tabindex="-1"' : "") + ">" + esc(r.title) + "</button>";
  }).join("");

  var current = 0, timer = null, paused = false, DWELL = 6000;
  var progress = panel.querySelector(".role-progress");
  panel.style.setProperty("--dwell", DWELL / 1000 + "s");

  function setWord(text) {
    if (reduceMotion) { word.textContent = text; return; }
    word.classList.add("out");
    setTimeout(function () {
      word.textContent = text;
      word.classList.remove("out"); word.classList.add("in-start");
      void word.offsetWidth;
      word.classList.remove("in-start");
    }, 220);
  }
  function restartProgress() {
    if (!progress) return;
    progress.classList.remove("run"); void progress.offsetWidth;
    if (!reduceMotion) progress.classList.add("run");
  }
  function goTo(i, fromUser) {
    var n = ROLES.length;
    current = (i + n) % n;
    track.style.transform = "translateX(" + (-100 * current) + "%)";
    track.querySelectorAll(".role-slide").forEach(function (s, k) {
      s.setAttribute("aria-hidden", k === current ? "false" : "true");
      var link = s.querySelector("a"); if (link) link.tabIndex = k === current ? 0 : -1;
    });
    dots.querySelectorAll(".role-dot").forEach(function (d, k) {
      d.setAttribute("aria-selected", k === current ? "true" : "false");
      d.tabIndex = k === current ? 0 : -1;
    });
    setWord(ROLES[current].title);
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    restartProgress();
    if (reduceMotion || paused) return;
    timer = setTimeout(function () { goTo(current + 1); }, DWELL);
  }
  function pause() { paused = true; panel.classList.add("paused"); clearTimeout(timer); }
  function resume() { if (!paused) return; paused = false; panel.classList.remove("paused"); schedule(); }

  document.getElementById("role-next").addEventListener("click", function () { goTo(current + 1, true); });
  document.getElementById("role-prev").addEventListener("click", function () { goTo(current - 1, true); });
  dots.querySelectorAll(".role-dot").forEach(function (d, k) {
    d.addEventListener("click", function () { goTo(k, true); });
    d.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(current + (e.key === "ArrowRight" ? 1 : -1), true);
        dots.querySelectorAll(".role-dot")[current].focus();
      }
    });
  });
  panel.addEventListener("mouseenter", pause);
  panel.addEventListener("mouseleave", resume);
  panel.addEventListener("focusin", pause);
  panel.addEventListener("focusout", function (e) { if (!panel.contains(e.relatedTarget)) resume(); });

  // Swipe
  var viewport = panel.querySelector(".role-viewport");
  var startX = null, startY = null;
  viewport.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; startY = e.touches[0].clientY; pause(); }, { passive: true });
  viewport.addEventListener("touchend", function (e) {
    if (startX == null) return;
    var dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) goTo(current + (dx < 0 ? 1 : -1), true);
    startX = null;
    setTimeout(resume, 4000);
  });

  // Pause when the hero is off screen
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) resume(); else pause(); });
    }, { threshold: 0.2 }).observe(panel);
  }
  document.addEventListener("visibilitychange", function () { if (document.hidden) pause(); else resume(); });

  goTo(0);
})();
