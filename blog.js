async function loadPostList(){
    const list = document.querySelector("#post-list");
    if(!list) return;

    try{
        const response = await fetch("blog/posts.json");
        if(!response.ok) throw new Error(`HTTP ${response.status}`);
        const posts = await response.json();

        list.innerHTML = posts.map((p) => `
            <li>
                <a href="post.html?slug=${p.slug}">${p.title}</a>
                <time datetime="${p.date}">${p.date}</time>
            </li>
        `).join("");
    } catch (err) {
        list.innerHTML = `<li>Could not load post: ${err.message}</li>`;
    }
}

loadPostList();