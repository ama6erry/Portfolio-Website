const header = `
    <header>
        <div id="website-title">
            <a href="index.html">&#xE070;hmad Alberr&#xE0B8;</a>
        </div> 
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="projects.html">Projects</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="chip8-demo.html">Demo</a></li>
                <li><button id="crt-toggle">CRT mode</button></li>
            </ul>
        </nav>
    </header>
`

const query = document.querySelector("#site-header");

if(query){
    query.innerHTML = header;
}