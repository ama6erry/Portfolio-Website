const header = `
    <header>
        <div id="website-title">
            <a href="index.html">&#xE070;hmad Alberr&#xE0B8; <p id="64"></p></a>
            <div class="logo-flourish" id="theme-flourish">
                <span></span><span></span><span></span><span></span>
            </div>
        </div>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="projects.html">Projects</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="chip8-demo.html">Demo</a></li>
                <li class="nav-actions"><button id="switch-theme">Theme</button><button id="crt-toggle">CRT mode</button></li>
            </ul>
        </nav>
    </header>
`

const query = document.querySelector("#site-header");

if(query){
    query.innerHTML = header;
}

const root = document.documentElement;
let themes = null;
let themeIndex = 0;

function applyTheme(index){
    if (!themes) return;
    if (index < 0 || index > themes.length - 1) index = 0;
    const values = themes[index];

    root.style.setProperty('--bg', values.bg);
    root.style.setProperty('--panel', values.panel);
    root.style.setProperty('--ink', values.ink);
    root.style.setProperty('--muted', values.muted);
    root.style.setProperty('--accent', values.accent);
    root.style.setProperty('--accent-dk', values.accentdk);
    root.style.setProperty('--line', values.line);

    try {
        localStorage.setItem("themeColors", JSON.stringify(values));
    } catch (e) {}

    const flourish = document.querySelector("#theme-flourish");
    if (flourish) {
        if (values.stripes) {
            values.stripes.forEach((color, i) => {
                root.style.setProperty(`--stripe-${i + 1}`, color);
            });
            flourish.classList.add("visible");
        } else {
            flourish.classList.remove("visible");
        }
    }

    const button = document.querySelector("#switch-theme");
    if (button) button.textContent = values.name;
}

async function loadThemes(){
    try{
        const response = await fetch("themes.json");
        if(!response.ok) throw new Error(`HTTP ${response.status}`);
        themes = await response.json();
        themeIndex = Number(localStorage.getItem("theme")) || 0;
        applyTheme(themeIndex);
    } catch (err) {

    }
}

loadThemes();

function cycleTheme(){
    if (!themes) return; // themes.json hasn't loaded yet
    themeIndex += 1;
    if (themeIndex > themes.length - 1) themeIndex = 0;
    applyTheme(themeIndex);
    localStorage.setItem("theme", themeIndex);
}

const themeButton = document.querySelector("#switch-theme");
if (themeButton) {
    themeButton.addEventListener("click", cycleTheme);
}