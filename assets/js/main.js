import Animations from './modules/animations.js';
import Projects from './modules/projects.js';

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация модулей
    new Animations();
    new Projects();
    
    // Меню для мобильных устройств
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
});

// Инициализация навыков
function initSkills() {
    const skillsData = {
        frontend: [
            { name: "HTML5", icon: "fab fa-html5", level: 95, color: "#e34f26" },
            { name: "CSS3", icon: "fab fa-css3-alt", level: 90, color: "#2965f1" },
            { name: "JavaScript", icon: "fab fa-js", level: 85, color: "#f7df1e" },
            { name: "React", icon: "fab fa-react", level: 80, color: "#61dafb" },
            { name: "Vue.js", icon: "fab fa-vuejs", level: 75, color: "#4fc08d" },
            { name: "Sass", icon: "fab fa-sass", level: 85, color: "#cc6699" }
        ],
        backend: [
            { name: "Node.js", icon: "fab fa-node-js", level: 80, color: "#68a063" },
            { name: "Python", icon: "fab fa-python", level: 75, color: "#3776ab" },
            { name: "PHP", icon: "fab fa-php", level: 70, color: "#777bb4" },
            { name: "MySQL", icon: "fas fa-database", level: 75, color: "#4479a1" },
            { name: "MongoDB", icon: "devicon-mongodb-plain", level: 70, color: "#47a248" }
        ],
        tools: [
            { name: "Git", icon: "fab fa-git-alt", level: 85, color: "#f05032" },
            { name: "Docker", icon: "fab fa-docker", level: 75, color: "#2496ed" },
            { name: "VS Code", icon: "fas fa-code", level: 90, color: "#007acc" },
            { name: "Figma", icon: "fab fa-figma", level: 80, color: "#f24e1e" },
            { name: "Webpack", icon: "devicon-webpack-plain", level: 75, color: "#8dd6f9" }
        ]
    };

    const skillsGrid = document.querySelector('.skills-grid');
    const categoryButtons = document.querySelectorAll('.category-btn');

    function renderSkills(category) {
        skillsGrid.innerHTML = '';
        skillsData[category].forEach(skill => {
            const skillEl = document.createElement('div');
            skillEl.className = 'skill-item';
            skillEl.innerHTML = `
                <div class="skill-icon ${skill.icon.includes('devicon') ? 'devicon' : ''}" 
                     style="color: ${skill.color}">
                    <i class="${skill.icon}"></i>
                </div>
                <span class="skill-name">${skill.name}</span>
                <div class="skill-level">
                    <div class="skill-level-fill" style="width: ${skill.level}%"></div>
                </div>
            `;
            skillsGrid.appendChild(skillEl);
        });
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            renderSkills(category);
        });
    });

    // По умолчанию показываем frontend
    renderSkills('frontend');
}

document.addEventListener('DOMContentLoaded', () => {
    initSkills();
});