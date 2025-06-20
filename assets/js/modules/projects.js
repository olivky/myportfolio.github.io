export default class Projects {
    constructor() {
        this.grid = document.getElementById('projects-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projects = [];
        this.init();
    }

    async init() {
        await this.loadProjects();
        this.renderProjects();
        this.setupFiltering();
    }

    async loadProjects() {
        try {
            // В реальном проекте можно загружать из JSON файла
            const response = await fetch('./projects/projects-data.js');
            this.projects = [
                {
                    id: 1,
                    title: "Корпоративный сайт",
                    description: "Современный лендинг для IT компании с анимациями",
                    image: "./assets/images/projects/project1.jpg",
                    tags: ["web", "design"],
                    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
                    demoUrl: "#",
                    codeUrl: "#"
                },
                {
                    id: 2,
                    title: "Мобильное приложение",
                    description: "Приложение для трекинга задач с Firebase бэкендом",
                    image: "./assets/images/projects/project2.jpg",
                    tags: ["mobile"],
                    technologies: ["React Native", "Firebase", "Redux"],
                    demoUrl: "#",
                    codeUrl: "#"
                },
                // Добавьте остальные проекты
            ];
        } catch (error) {
            console.error("Error loading projects:", error);
        }
    }

    renderProjects(filter = 'all') {
        this.grid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? this.projects 
            : this.projects.filter(project => project.tags.includes(filter));
        
        filteredProjects.forEach(project => {
            const projectEl = document.createElement('div');
            projectEl.className = 'project-card animate-on-scroll';
            projectEl.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="project-overlay">
                    <h3>${project.title}</h3>
                    <div class="project-links">
                        <a href="${project.demoUrl}" class="live-demo" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Демо
                        </a>
                        <a href="${project.codeUrl}" class="view-code" target="_blank">
                            <i class="fab fa-github"></i> Код
                        </a>
                    </div>
                </div>
            `;
            this.grid.appendChild(projectEl);
        });
    }

    setupFiltering() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.dataset.filter;
                this.renderProjects(filter);
            });
        });
    }
}