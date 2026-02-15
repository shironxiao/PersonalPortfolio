function fetchProjects() {
    const container = document.getElementById('projects-container');

    // Fetch specific repositories
    const targetRepos = ['ItemFinderFinal', 'Portfolio', 'FINALS-IM'];

    // Manual Project Data - Add your screenshots and descriptions here
    const manualProjectData = {
        "ItemFinderFinal": {
            description: "A comprehensive item finding application designed to help users locate products in nearby stores efficiently.",
            image: "./assets/itemfinder-screenshot.png" // Replace with actual image path
        },
        "Portfolio": {
            description: "My personal portfolio website showcasing my skills, projects, and professional journey.",
            image: "./assets/portfolio-screenshot.png" // Replace with actual image path
        },
        "FINALS-IM": {
            description: "Inventory Management System developed for final project, featuring stock tracking and reporting.",
            image: "./assets/finals-im-screenshot.png" // Replace with actual image path
        }
    };

    // Fetch all repos and filter (simplest approach for small number of repos)
    fetch('https://api.github.com/users/shironxiao/repos?per_page=100')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(repos => {
            // Filter for specific repos and sort by targetRepos order
            const filteredRepos = repos.filter(repo => targetRepos.includes(repo.name));
            const sortedRepos = filteredRepos.sort((a, b) => {
                return targetRepos.indexOf(a.name) - targetRepos.indexOf(b.name);
            });

            // Clear any existing content
            container.innerHTML = '';

            sortedRepos.forEach(repo => {
                // Get manual data if available
                const manualData = manualProjectData[repo.name] || {};
                const description = manualData.description || repo.description || 'No description available for this project.';
                const imagePath = manualData.image || './assets/project-placeholder.png';

                const projectCard = document.createElement('div');
                projectCard.className = 'project-panel';

                // Determine demo link visibility
                const demoButton = repo.homepage ?
                    `<button class="project-btn" onclick="window.open('${repo.homepage}', '_blank')">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                     </button>` :
                    `<button class="project-btn" style="opacity: 0.5; cursor: not-allowed;" title="No demo link available">
                        <i class="fas fa-external-link-alt"></i> No Demo
                     </button>`;

                // Create HTML structure
                projectCard.innerHTML = `
                    <div class="project-image" onclick="openImageFullscreen(this.querySelector('img'))">
                        <!-- Screenshot Holder -->
                        <img src="${imagePath}" 
                             alt="${repo.name} Screenshot" 
                             onerror="this.src='https://placehold.co/600x400/FFFFFF/1F2937?text=Project+Screenshot'; this.onerror=null;">
                         <div class="image-overlay">
                            <i class="fas fa-expand"></i>
                            <span>Click to enlarge</span>
                        </div>
                    </div>
                    <div class="project-content">
                        <h2 class="project-title">${formatRepoName(repo.name)}</h2>
                        <p class="project-description">
                            ${description}
                        </p>
                        <div class="tech-stack">
                            <div class="tech-item">
                                <i class="fas fa-code"></i>
                                <span>${repo.language || 'Code'}</span>
                            </div>
                        </div>
                        <div class="project-buttons-container">
                            ${demoButton}
                        </div>
                    </div>
                `;

                container.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            container.innerHTML = '<p style="text-align:center; color: var(--muted-text);">Failed to load projects. Please check connection.</p>';
        });
}

// Helper to make repo names nicer (e.g., "my-project" -> "My Project")
function formatRepoName(name) {
    return name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Initialize
document.addEventListener('DOMContentLoaded', fetchProjects);
