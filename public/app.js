const githubUsername = "horvathleventee";
const profileUrl = `https://api.github.com/users/${githubUsername}`;
const reposUrl = `https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=pushed`;

const summaryEl = document.getElementById("github-summary");
const commitListEl = document.getElementById("commit-list");
const githubProfileLinkEl = document.getElementById("github-profile-link");
const langButtons = document.querySelectorAll(".lang-btn");
const themeToggleEl = document.getElementById("theme-toggle");
const body = document.body;
const ambientGlyphsEl = document.getElementById("ambient-glyphs");

const translations = {
  hu: {
    navAbout: "rólam",
    navProjects: "projektek",
    navExperience: "tapasztalat",
    navCommits: "commitok",
    navContact: "elérhetőség",
    navCv: "cv",
    themeToggleDark: "Sötét mód",
    themeToggleLight: "Világos mód",
    heroKicker: "junior software developer",
    heroText:
      "Junior szoftverfejlesztő vagyok, frissen befejezett Programtervező informatikus BSc diplomával. Januártól májusig blockchain fókuszú fejlesztői gyakorlattal foglalkoztam.",
    heroNote: "Node.js, webes felületek, blockchain szemlélet és tiszta fejlesztői workflow.",
    cvCta: "CV megnyitása",
    heroCardLabel: "profil",
    heroCardBadge: "junior",
    skillOneLabel: "backend",
    skillOneValue: "Node.js",
    skillTwoLabel: "frontend",
    skillTwoValue: "JavaScript UI",
    skillThreeLabel: "blockchain",
    skillThreeValue: "Web3 / dApps",
    skillFourLabel: "workflow",
    skillFourValue: "GitHub",
    aboutLabel: "rólam",
    aboutText:
      "A Szegedi Tudományegyetemen befejeztem tanulmányaim Programtervező informatikusként, a Szoftverfejlesztő Tanszéknél pedig 2026 januárjától májusig blockchain alapú weboldalakon dolgoztam gyakornokként.",
    location: "Budapest, Magyarország",
    focusLabel: "fókusz",
    focusOne: "Node.js alapú alkalmazásfejlesztés",
    focusTwo: "Modern JavaScript és webes felületek",
    focusThree: "Blockchain / web3 projekttapasztalat",
    focusFour: "GitHub alapú fejlesztői workflow",
    projectsTitle: "Kiemelt repository-k",
    projectsHint: "GitHub projektek",
    openSource: "[ open source ]",
    projectOneTitle: "Kebpro",
    projectOneText:
      "GitHub repository a Kebpro projekthez, technikai megoldásokkal és fejlesztési előzményekkel.",
    projectTwoTitle: "Szakdolgozat",
    projectTwoText:
      "A szakdolgozatomhoz kapcsolódó repository, kutatási és fejlesztési anyagokkal.",
    projectThreeTitle: "Okinawa Public Transport",
    projectThreeText:
      "GitHub repository az okinawai projekthez, a fejlesztési folyamat és verziók követésére.",
    experienceTitle: "Tapasztalat",
    experienceHint: "szakmai út",
    expOneType: "gyakornokság",
    expOneRole: "Szoftverfejlesztő gyakornok",
    expOneCompany: "Szoftverfejlesztő Tanszék",
    expOneDate: "2026. január - május",
    expOneLocation: "Szeged, Magyarország",
    expOneBulletOne: "Blockchain alapú weboldalak fejlesztése és továbbfejlesztése.",
    expOneBulletTwo: "Frontend és webes funkcionalitások építésében való részvétel.",
    expOneBulletThree: "Önálló feladatvégzés GitHub alapú fejlesztői workflow-ban.",
    expTwoType: "végzettség",
    expTwoRole: "Programtervező informatikus BSc",
    expTwoCompany: "Szegedi Tudományegyetem",
    expTwoDate: "befejezve",
    expTwoLocation: "Szeged, Magyarország",
    expTwoBulletOne: "Szoftverfejlesztési, algoritmikus és rendszertervezési alapok.",
    expTwoBulletTwo: "Webes és modern szoftveres projektekhez kapcsolódó gyakorlatok.",
    expTwoBulletThree: "Stabil alapok backend, frontend és rendszerszemlélet területen.",
    commitsTitle: "Friss commitok",
    liveLabel: "live",
    viewGithub: "Megnyitás GitHubon",
    contactTitle: "Elérhetőségek",
    contactHint: "írj bátran",
    contactIntro:
      "Junior szoftverfejlesztői lehetőségek, webes projektek vagy szakmai együttműködés kapcsán keress bátran.",
    footerCopyText: "2026 Horváth Levente",
    footerStatus: "nyitott junior szoftverfejlesztői lehetőségekre",
    loading: "Betöltés...",
    summary: (repos, followers, commits) =>
      `${repos} publikus repository, ${followers} követő, ${commits} megjelenített friss commit a publikus projektjeidből.`,
    emptyTitle: "Még nincs megjeleníthető commit a publikus projektjeidből.",
    emptyText: "Amint elérhető publikus repository commit, itt automatikusan megjelenik.",
    error:
      "A GitHub commitok most nem tölthetők be. Ellenőrizd a kapcsolatot vagy a publikus profil elérhetőségét."
  },
  en: {
    navAbout: "about",
    navProjects: "projects",
    navExperience: "experience",
    navCommits: "commits",
    navContact: "contact",
    navCv: "cv",
    themeToggleDark: "Dark mode",
    themeToggleLight: "Light mode",
    heroKicker: "junior software developer",
    heroText:
      "I am a junior software developer with a recently completed Computer Science BSc degree. From January to May, I worked on blockchain-focused development during my internship.",
    heroNote: "Node.js, web interfaces, blockchain mindset, and a clean development workflow.",
    cvCta: "Open CV",
    heroCardLabel: "profile",
    heroCardBadge: "junior",
    skillOneLabel: "backend",
    skillOneValue: "Node.js",
    skillTwoLabel: "frontend",
    skillTwoValue: "JavaScript UI",
    skillThreeLabel: "blockchain",
    skillThreeValue: "Web3 / dApps",
    skillFourLabel: "workflow",
    skillFourValue: "GitHub",
    aboutLabel: "about",
    aboutText:
      "I completed my Computer Science studies at the University of Szeged, and from January to May 2026 I worked as an intern on blockchain-based web applications at the Department of Software Engineering.",
    location: "Budapest, Hungary",
    focusLabel: "focus",
    focusOne: "Node.js based application development",
    focusTwo: "Modern JavaScript and web interfaces",
    focusThree: "Blockchain / web3 project experience",
    focusFour: "GitHub-based development workflow",
    projectsTitle: "Featured repositories",
    projectsHint: "GitHub projects",
    openSource: "[ open source ]",
    projectOneTitle: "Kebpro",
    projectOneText:
      "GitHub repository for the Kebpro project with technical solutions and development history.",
    projectTwoTitle: "Thesis",
    projectTwoText:
      "Repository connected to the thesis project with research and development materials.",
    projectThreeTitle: "Okinawa Public Transport",
    projectThreeText:
      "GitHub repository for the Okinawai project to track versions and development progress.",
    experienceTitle: "Experience",
    experienceHint: "professional path",
    expOneType: "internship",
    expOneRole: "Software Developer Intern",
    expOneCompany: "Department of Software Engineering",
    expOneDate: "January - May 2026",
    expOneLocation: "Szeged, Hungary",
    expOneBulletOne: "Building and improving blockchain-based websites.",
    expOneBulletTwo: "Contributing to frontend and web functionality development.",
    expOneBulletThree: "Working independently in a GitHub-based development workflow.",
    expTwoType: "degree",
    expTwoRole: "Computer Science BSc",
    expTwoCompany: "University of Szeged",
    expTwoDate: "completed",
    expTwoLocation: "Szeged, Hungary",
    expTwoBulletOne: "Core studies in software development, algorithms, and systems thinking.",
    expTwoBulletTwo: "Hands-on practices connected to web and modern software projects.",
    expTwoBulletThree: "Solid foundations across backend, frontend, and systems thinking.",
    commitsTitle: "Recent Commits",
    liveLabel: "live",
    viewGithub: "View on GitHub",
    contactTitle: "Contact",
    contactHint: "feel free to reach out",
    contactIntro:
      "For junior software developer opportunities, web projects, or professional collaboration, feel free to reach out.",
    footerCopyText: "2026 Horváth Levente",
    footerStatus: "open to junior software developer opportunities",
    loading: "Loading...",
    summary: (repos, followers, commits) =>
      `${repos} public repositories, ${followers} followers, ${commits} recent commits shown from your public projects.`,
    emptyTitle: "No commits from your public projects are available yet.",
    emptyText: "As soon as public repository commits are available, they will appear here automatically.",
    error:
      "GitHub commits are unavailable right now. Please check the connection or public profile visibility."
  }
};

let currentLang = "hu";
let currentTheme = localStorage.getItem("theme") || "light";
let githubState = {
  repos: 0,
  followers: 0,
  commits: []
};

githubProfileLinkEl.href = `https://github.com/${githubUsername}`;

function formatDate(dateString) {
  return new Intl.DateTimeFormat(currentLang === "hu" ? "hu-HU" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(dateString));
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1)}...`;
}

function extractCommits(repoCommits) {
  return repoCommits
    .flat()
    .filter((commit) => commit && commit.createdAt)
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
    .slice(0, 7);
}

async function loadRepoCommits(repo) {
  const commitsResponse = await fetch(
    `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=3`
  );

  if (!commitsResponse.ok) {
    return [];
  }

  const commits = await commitsResponse.json();

  return commits.map((commit) => ({
    repo: repo.name,
    message: commit.commit?.message || "Commit",
    url: commit.html_url,
    createdAt: commit.commit?.author?.date || commit.commit?.committer?.date || repo.pushed_at
  }));
}

function setupAmbientGlyphs() {
  if (!ambientGlyphsEl) {
    return;
  }

  const glyphs = ["0x", "{}", "[]", "<>", "tx", "01", "//", "#", "=>", "/", "\u039E", "\u20BF", "\u27E0", "web3", "rpc", "defi"];
  const positions = [
    { x: "5vw", y: "10vh" },
    { x: "8vw", y: "18vh" },
    { x: "11vw", y: "26vh" },
    { x: "9vw", y: "34vh" },
    { x: "14vw", y: "42vh" },
    { x: "10vw", y: "50vh" },
    { x: "13vw", y: "58vh" },
    { x: "8vw", y: "68vh" },
    { x: "15vw", y: "78vh" },
    { x: "11vw", y: "88vh" },
    { x: "21vw", y: "12vh" },
    { x: "26vw", y: "22vh" },
    { x: "30vw", y: "34vh" },
    { x: "34vw", y: "46vh" },
    { x: "39vw", y: "58vh" },
    { x: "44vw", y: "16vh" },
    { x: "48vw", y: "28vh" },
    { x: "52vw", y: "40vh" },
    { x: "56vw", y: "54vh" },
    { x: "60vw", y: "68vh" },
    { x: "64vw", y: "82vh" },
    { x: "70vw", y: "14vh" },
    { x: "75vw", y: "26vh" },
    { x: "80vw", y: "38vh" },
    { x: "85vw", y: "16vh" },
    { x: "89vw", y: "24vh" },
    { x: "84vw", y: "34vh" },
    { x: "90vw", y: "46vh" },
    { x: "86vw", y: "58vh" },
    { x: "82vw", y: "70vh" },
    { x: "88vw", y: "82vh" },
    { x: "74vw", y: "88vh" },
    { x: "24vw", y: "84vh" },
    { x: "50vw", y: "86vh" }
  ];

  const accentGlyphs = new Set(["\u039E", "\u20BF", "\u27E0"]);

  ambientGlyphsEl.innerHTML = positions
    .map((position, index) => {
      const glyph = glyphs[index % glyphs.length];
      const duration = 11 + (index % 6) * 2;
      const delay = index * -0.9;
      const floatX = (index % 2 === 0 ? 1 : -1) * (8 + (index % 5) * 3);
      const floatY = (index % 3 === 0 ? -1 : 1) * (5 + (index % 4) * 2);
      const tilt = `${(index % 2 === 0 ? 1 : -1) * (2 + (index % 4))}deg`;
      const extraClass = accentGlyphs.has(glyph) ? " ambient-glyph-mark" : "";

      return `<span class="ambient-glyph${extraClass}" style="left:${position.x};top:${position.y};--duration:${duration}s;--delay:${delay}s;--float-x:${floatX}px;--float-y:${floatY}px;--tilt:${tilt};">${glyph}</span>`;
    })
    .join("");
}

function updateThemeToggleLabel() {
  if (!themeToggleEl) {
    return;
  }

  const t = translations[currentLang];
  const label = currentTheme === "light" ? t.themeToggleDark : t.themeToggleLight;
  themeToggleEl.setAttribute("aria-label", label);
  themeToggleEl.setAttribute("title", label);
}

function applyTheme(theme) {
  currentTheme = theme;
  body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  updateThemeToggleLabel();
}

function renderTexts() {
  const t = translations[currentLang];
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t[key];
  });

  langButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLang);
  });

  updateThemeToggleLabel();
}

function renderCommits() {
  const t = translations[currentLang];

  if (!githubState.commits.length) {
    commitListEl.innerHTML = `
      <div class="commit-line">
        <div class="commit-main">
          <div class="commit-repo">${t.emptyTitle}</div>
          <div class="commit-message">${t.emptyText}</div>
        </div>
      </div>
    `;
    return;
  }

  commitListEl.innerHTML = githubState.commits
    .map(
      (commit) => `
        <a class="commit-line" href="${commit.url}" target="_blank" rel="noreferrer">
          <div class="commit-main">
            <div class="commit-repo">${commit.repo}</div>
            <div class="commit-message">${truncate(commit.message, 92)}</div>
          </div>
          <div class="commit-date">${formatDate(commit.createdAt)}</div>
        </a>
      `
    )
    .join("");
}

function renderSummary() {
  const t = translations[currentLang];
  summaryEl.textContent = t.summary(
    githubState.repos,
    githubState.followers,
    githubState.commits.length
  );
}

async function loadGithubActivity() {
  summaryEl.textContent = translations[currentLang].loading;

  try {
    const response = await fetch("/api/github-activity");

    if (!response.ok) {
      throw new Error("Activity API error");
    }

    const activity = await response.json();

    githubState = {
      repos: activity.repos || 0,
      followers: activity.followers || 0,
      commits: Array.isArray(activity.commits) ? activity.commits : []
    };

    renderSummary();
    renderCommits();
    return;
  } catch (error) {
    try {
      const [profileResponse, reposResponse] = await Promise.all([
        fetch(profileUrl),
        fetch(reposUrl)
      ]);

      if (!profileResponse.ok || !reposResponse.ok) {
        throw new Error("GitHub API error");
      }

      const profile = await profileResponse.json();
      const repos = await reposResponse.json();
      const publicRepos = repos.filter(
        (repo) => !repo.fork && repo.owner?.login?.toLowerCase() === githubUsername.toLowerCase()
      );
      const repoCommits = await Promise.all(publicRepos.map((repo) => loadRepoCommits(repo)));

      githubState = {
        repos: publicRepos.length || profile.public_repos || 0,
        followers: profile.followers || 0,
        commits: extractCommits(repoCommits)
      };

      renderSummary();
      renderCommits();
    } catch (fallbackError) {
      summaryEl.textContent = translations[currentLang].error;
      githubState.commits = [];
      renderCommits();
    }
  }
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentLang = button.dataset.lang;
    renderTexts();
    renderSummary();
    renderCommits();
  });
});

if (themeToggleEl) {
  themeToggleEl.addEventListener("click", () => {
    applyTheme(currentTheme === "light" ? "dark" : "light");
  });
}

setupAmbientGlyphs();
applyTheme(currentTheme);
renderTexts();
loadGithubActivity();


