async function loadPost(){
    const container = document.querySelector("#post");
    if(!container) return;
    const slug = new URLSearchParams(window.location.search).get("slug");
    if(!slug){
        container.innerHTML = "<p>No post specified</p>";
        return;
    }

    try{
        const [indexRes, mdRes] = await Promise.all([
            fetch("blog/posts.json"),
            fetch(`blog/posts/${slug}.md`),
        ]);
        if(!mdRes.ok) throw new Error("Post not found");
        const posts = await indexRes.json();
        const meta = posts.find((p) => p.slug === slug);
        const markdown = await mdRes.text();

        document.title = meta ? `${meta.title} - Ahmad Alberry` : Blog;
        container.innerHTML = `
            ${meta ? `<h1>${meta.title}</h1><time datetime="${meta.date}">${meta.date}</time>` : ""}
            ${marked.parse(markdown)}
        `;
    } catch (err) {
        container.innerHTML = `<p>Error loading post - ${err.message}</p>`;
    }
}

loadPost();