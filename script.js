const allProjects = [
    {
        category: "Emulator",
        title: "CHIP8 Emulator",
        description: "Simple introductory emulator.",
        demo: "chip8-demo.html",
        featured: true
    },
    {
        category: "Emulator",
        title: "Gameboy Emulator",
        description: "Emulator that supports games with MBCs 0-2.",
        demo: "#",
        featured: true
    },
    {
        category: "Graphics",
        title: "Orbit Simulator",
        description: "A 2D orbital simulator rendered in OpenGL.",
        demo: "#",
        featured: true
    },
    {
        category: "Android Apps",
        title: "Athan App",
        description: "Track prayer times.",
        demo: "#",
    },
    {
        category: "Android Apps",
        title: "Habit Tracker",
        description: "Track how much time you've spent doing soemthing during the day.",
        demo: "#",
    },
]

const featured = allProjects.filter((p) => p.featured);

function renderCards(items){
    return items.map((p) => `
        <article>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <a href="${p.demo}">View demo</a>
        </article>
    `).join("")
}

const button = document.querySelector("#crt-toggle");

if(button){
    if(localStorage.getItem("crt") === "true"){
        document.body.classList.add("crt")
    }
    button.addEventListener("click", () => 
    {
        const isOn = document.body.classList.toggle("crt");
        localStorage.setItem("crt", isOn)
    });
}




const list = document.querySelector("#project-list");

if(list) {
    const html = renderCards(featured);
    list.innerHTML = html;
}

const grouped = document.querySelector("#all-projects");
if (grouped) {
    const categories = [...new Set(allProjects.map((p) => p.category))];

    grouped.innerHTML = categories.map((cat) => {
        const inCategory = allProjects.filter((p) => p.category === cat);
        return `
            <section>
                <h2>${cat}</h2>
                ${renderCards(inCategory)}
            </section>
        `
    }).join("");
}
