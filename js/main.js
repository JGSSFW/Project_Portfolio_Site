// --- LÓGICA DA ANIMAÇÃO DE ABERTURA ---
window.addEventListener('load', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const introTextContainer = document.getElementById('intro-text-container');
    const introGreetings = ['Olá', 'Hello', 'こんにちは'];
    let textIndex = 0;
    const animationInterval = 1200; // Intervalo ainda mais rápido

    function showNextGreeting() {
        if (textIndex < introGreetings.length) {
            introTextContainer.innerHTML = `
                <div class="intro-greeting-anim flex items-center justify-center gap-4">
                    <span class="text-5xl md:text-6xl font-bold">${introGreetings[textIndex]}</span>
                    <span class="text-5xl md:text-6xl waving-hand-intro">👋</span>
                </div>`;
            textIndex++;
            setTimeout(showNextGreeting, animationInterval);
        } else {
            introOverlay.classList.add('opacity-0');
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 700);
        }
    }
    if (introOverlay) {
        showNextGreeting();
    }
});


// --- LÓGICA DA ANIMAÇÃO DA SAUDAÇÃO PRINCIPAL ---
const greetingAnimContainer = document.getElementById('greeting-anim-container');
const mainGreetings = [
    'Olá, sou o <span class="name-highlight">Jean</span><span class="waving-hand-main">&nbsp;👋</span>',
    'Hello, I\'m <span class="name-highlight">Jean</span><span class="waving-hand-main">&nbsp;👋</span>',
    'こんにちは、<span class="name-highlight">ジェアン</span>です<span class="waving-hand-main">&nbsp;👋</span>'
];
let mainGreetingIndex = 0;
const mainGreetingInterval = 3000;

function showNextMainGreeting() {
    if (!greetingAnimContainer) return;
    greetingAnimContainer.innerHTML = `
        <div class="intro-greeting-anim" style="animation-duration: ${mainGreetingInterval - 200}ms;">
            ${mainGreetings[mainGreetingIndex]}
        </div>
    `;
    mainGreetingIndex = (mainGreetingIndex + 1) % mainGreetings.length;
}

setInterval(showNextMainGreeting, mainGreetingInterval);
showNextMainGreeting();

// --- LÓGICA DA BARRA DE ROLAGEM PERSONALIZADA ---
const scrollProgressBar = document.getElementById('scrollbar-progress');

const updateScrollProgress = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.scrollY / scrollableHeight) * 100;
    scrollProgressBar.style.height = `${Math.min(scrollPercentage, 100)}%`;
};

window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

// --- LÓGICA DO TEMA (DARK/LIGHT) ---
const themeToggleBtn = document.getElementById('theme-toggle');
const lightIcon = document.getElementById('theme-toggle-light-icon');
const darkIcon = document.getElementById('theme-toggle-dark-icon');

const updateThemeUI = () => {
    if (document.documentElement.classList.contains('dark')) {
        darkIcon.classList.remove('hidden');
        lightIcon.classList.add('hidden');
    } else {
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
    }
};

themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    updateThemeUI();
});

// --- LÓGICA PARA TRADUÇÃO ---
const languageToggleBtn = document.getElementById('language-toggle');
let currentLang = localStorage.getItem('language') || 'pt';

function setLanguage(lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.querySelectorAll('[data-lang-pt]').forEach(el => {
        const key = lang === 'en' ? 'langEn' : 'langPt';
        el.textContent = el.dataset[key];
    });
    languageToggleBtn.textContent = lang === 'pt' ? 'PT-BR' : 'EN-US';
}

languageToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('language', currentLang);
    setLanguage(currentLang);
});


// --- LÓGICA PARA BUSCAR PROJETOS E HABILIDADES DO GITHUB ---
const deviconMap = {
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'SCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
    'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    'Terraform': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
};

function displaySkills(languages) {
    const skillsContainer = document.getElementById('skills-container');
    if(!skillsContainer) return;
    
    const coreSkills = new Set(['AWS', 'Terraform', 'HTML', 'CSS', 'JavaScript']);
    const allSkills = new Set([...coreSkills, ...languages]);

    let skillsHTML = '';
    allSkills.forEach(skill => {
         if (deviconMap[skill]) {
            if (skill === 'AWS') {
                skillsHTML += `
                    <div class="flex flex-col items-center p-4 rounded-lg bg-[var(--surface)]/50 shadow-md hover:shadow-xl transition-shadow">
                        <div class="bg-white rounded-md p-2 flex items-center justify-center w-16 h-16 mb-2">
                            <img src="${deviconMap[skill]}" class="h-10 w-auto" />
                        </div>
                        <span class="font-semibold">${skill}</span>
                    </div>
                `;
            } else {
                 skillsHTML += `
                    <div class="flex flex-col items-center p-4 rounded-lg bg-[var(--surface)]/50 shadow-md hover:shadow-xl transition-shadow">
                        <img src="${deviconMap[skill]}" class="h-16 w-16 mb-2" />
                        <span class="font-semibold">${skill}</span>
                    </div>
                `;
            }
        }
    });
    skillsContainer.innerHTML = skillsHTML;
}

async function fetchGitHubProjects() {
    const username = 'JGSSFW';
    const projectsSlider = document.getElementById('projects-slider');
    const projectsCarousel = document.getElementById('projects-carousel');
    
    const loader = document.createElement('div');
    loader.className = 'loader mx-auto';
    if(projectsCarousel) projectsCarousel.appendChild(loader);

    const manualDemoLinks = {
        'Ping-Pong': 'https://jgssfw.github.io/Ping-Pong/',
        'Desafio_Teste': 'https://jgssfw.github.io/Desafio_Teste/',
        'Project_XMen': 'https://jgssfw.github.io/Project_XMen/',
        'Project_Awax': 'https://jgssfw.github.io/Project_Awax/',
        'Project_Pokedex': 'https://jgssfw.github.io/Project_Pokedex/',
        'Project_Starbucks': 'https://jgssfw.github.io/Project_Starbucks/',
        'Project_Medicenter': 'https://jgssfw.github.io/Project_Medicenter/'
    };
    
    const allLanguages = new Set();

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        let repos = await response.json();
        repos = repos.filter(repo => repo.name !== username);

        if (repos.length === 0) {
            if(projectsSlider) projectsSlider.innerHTML = '<p class="text-center w-full">Nenhum projeto público encontrado.</p>';
            if(loader) loader.remove();
            return;
        }

        let projectsHTML = '';
        for (const repo of repos) {
            const demoLink = manualDemoLinks[repo.name] || repo.homepage;
            if(repo.language) {
                allLanguages.add(repo.language);
            }

            projectsHTML += `
                <div class="project-card flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4">
                    <div class="bg-[var(--surface)] rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
                        <div class="p-6 flex-grow">
                            <h3 class="text-xl font-bold mb-2 truncate">${repo.name}</h3>
                            <p class="text-[var(--text-secondary)] mb-4 h-20 overflow-hidden">${repo.description || 'Sem descrição.'}</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                ${repo.language ? `<span class="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 text-sm font-semibold px-2 py-1 rounded-full">${repo.language}</span>` : ''}
                            </div>
                        </div>
                        <div class="px-6 pb-6 mt-auto flex space-x-4">
                            ${demoLink ? `<a href="${demoLink}" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-purple)] hover:text-[var(--accent-pink)] transition-colors duration-300 font-semibold hover:underline" data-lang-pt="Ver Demo" data-lang-en="View Demo">Ver Demo</a>` : ''}
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-purple)] hover:text-[var(--accent-pink)] transition-colors duration-300 font-semibold hover:underline">GitHub</a>
                        </div>
                    </div>
                </div>
            `;
        }
        if(projectsSlider) projectsSlider.innerHTML = projectsHTML;
        if(loader) loader.remove();
        displaySkills(allLanguages);
        setupCarousel(repos.length);
        setLanguage(currentLang);
    } catch (error) {
        console.error('Erro ao buscar projetos do GitHub:', error);
        if(projectsSlider) projectsSlider.innerHTML = '<p class="text-center text-red-500 w-full">Falha ao carregar projetos.</p>';
        if(loader) loader.remove();
    }
}

function setupCarousel(totalItems) {
    const slider = document.getElementById('projects-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    function getVisibleItems() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    }

    if (!slider || !prevBtn || !nextBtn || totalItems < getVisibleItems()) {
        if(prevBtn) prevBtn.style.display = 'none';
        if(nextBtn) nextBtn.style.display = 'none';
        return;
    };
    
    let currentIndex = 0;

    function updateCarousel() {
        const itemWidth = slider.querySelector('.project-card').offsetWidth;
        slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const visibleItems = getVisibleItems();
        const maxIndex = totalItems - visibleItems;
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop to the beginning
        }
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        const visibleItems = getVisibleItems();
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalItems - visibleItems; // Loop to the end
        }
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel(); // Initial call
}

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects();
    setLanguage(currentLang);
    updateThemeUI();
});
