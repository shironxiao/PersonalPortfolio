document.addEventListener('DOMContentLoaded', () => {
    fetchBlogPosts();
});

async function fetchBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    const username = 'ronsev';
    const apiUrl = `https://dev.to/api/articles?username=${username}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const articles = await response.json();
        
        blogContainer.innerHTML = '';

        if (articles.length === 0) {
            blogContainer.innerHTML = '<p class="no-articles">No articles found.</p>';
            return;
        }

        for (const article of articles) {
            
            if (!article.cover_image) {
                try {
                    const detailsResponse = await fetch(`https://dev.to/api/articles/${article.id}`);
                    if (detailsResponse.ok) {
                        const details = await detailsResponse.json();
                        
                        const imageMatch = details.body_markdown && details.body_markdown.match(/!\[.*?\]\((.*?)\)/);
                        if (imageMatch && imageMatch[1]) {
                            article.cover_image = imageMatch[1];
                        }
                    }
                } catch (err) {
                    console.warn(`Failed to fetch details for article ${article.id}`, err);
                }
            }

            const articleCard = createBlogCard(article);
            blogContainer.appendChild(articleCard);
        }

    } catch (error) {
        console.error('Error fetching blog posts:', error);
        blogContainer.innerHTML = `
            <div class="error-message">
                <p>Failed to load articles. Please check your connection or try again later.</p>
                <button onclick="fetchBlogPosts()" class="btn btn-color-2">Retry</button>
            </div>
        `;
    }
}

function createBlogCard(article) {
    const card = document.createElement('div');
    card.className = 'blog-card';

    const coverImage = article.cover_image || article.social_image || 'https://placehold.co/600x400?text=No+Image+Available';

    const date = new Date(article.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    card.innerHTML = `
        <div class="blog-card-image">
            <img src="${coverImage}" alt="${article.title}" loading="lazy">
        </div>
        <div class="blog-card-content">
            <div class="blog-card-meta">
                <span class="blog-date">${date}</span>
                <span class="blog-tags">${article.tag_list.map(tag => `#${tag}`).slice(0, 3).join(' ')}</span>
            </div>
            <h3 class="blog-title">${article.title}</h3>
            <p class="blog-description">${article.description || ''}</p>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="read-more-btn">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;

    return card;
}
