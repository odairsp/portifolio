
const toggleTheme = document.querySelector("#toggleTheme");
const rooHtml = document.documentElement;

function changeTheme() {
    const currentTheme = rooHtml.getAttribute('data-theme')

    currentTheme === 'dark' ?
        rooHtml.setAttribute('data-theme', 'light') :
        rooHtml.setAttribute('data-theme', 'dark')

    toggleTheme.classList.toggle("bi-sun");
    toggleTheme.classList.toggle("bi-moon");
}

toggleTheme.addEventListener('click', changeTheme);


// carousel

function startCarousel() {
    const slickElement = document.querySelector(".main__content2");
    $('.main__content2').slick({
        dots: false,
        loop: true,
        vertical: false,
        centerMode: false,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        // autoplay: true,
        variableWidth: false,
        autoplaySpeed: 1500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}


function renderProjectsCarousel(projects) {
    const projectsCarousel = document.querySelector(".main__content2")
    projectsCarousel.innerHTML = ""

    projects.forEach((project) => {

        const projectElement = `
        <div class="project__card">
        <a href="${project.urlProject}" target="_blank">
            <span class="project__name">${project.name}</span>
            <img class="project__image" src="${project.urlImageCarousel}" alt srcset>
        </a>
        </div>
        `;
        projectsCarousel.innerHTML += projectElement;
    });

    startCarousel()
}

// render projects
function renderProjects(projects) {
    const projectsList = document.querySelector(".projects__container");
    projectsList.innerHTML = "";

    projects.forEach((project) => {
        
        let skillItens = ""
        
        project.technologies.forEach((tec) => {
          const element =  `
            <li class="skills__item">
                <img class="skills__logo" src="./assets/images/technologies/${tec}.png" alt>
            </li>
            `
            skillItens += element
        })


        const projectElement = `
        <div class="projects__card">
                <img class="card__cover" src="${project.urlImage}" alt>
                <div class="card__body">
                    <h3 class="card__title">
                        ${project.name}
                    </h3>
                    <p class="card__description">${project.description}</p>
                    <ul class="card__list">
                        ${project.behaviors.map(behavior => `<li class="card__item">${behavior}</li>`).join("")}
                    </ul>
                    <ul class="skills__list">
                    ${skillItens}
                    </ul>
                    <div class="card__buttons">
                        <a href="${project.urlProject}" target="_blank">
                            <button class="btn btn--primary">
                                <span>Prévia</span>
                                <i class="bi bi-arrow-up-right"></i>
                            </button>
                        </a>
                        <a href="${project.urlRepository}" target="_blank">
                        <button class="btn">
                            <span>Repositório</span>
                        </button>
                        </a>
                    </div>
                </div>
            </div>`;
        projectsList.innerHTML += projectElement;
    });

}


// Função para carregar o JSON
async function loadProjects() {
    const response = await fetch('assets/data/projects.json');
    const projects = await response.json();
    return projects;
}


const accordionHeaders = document.querySelectorAll(".accordion__header");


accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
        const accordionActive = document.querySelector(".accordion__item.active");
        accordionActive.classList.remove("active");
        const accordionItem = header.parentElement;
        accordionItem.classList.toggle("active");

    });
});

const menuLinks = document.querySelectorAll(".menu__link");

menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menuLinks.forEach((link) => link.classList.remove("active")
        );
        link.classList.add("active");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Usar a função para carregar e renderizar os projetos
    loadProjects().then(projects => {
        renderProjectsCarousel(projects.projects);
        renderProjects(projects.projects);

        const projectos = document.querySelectorAll(".projects__card");

        projectos.forEach((project, index) => {


            if (index % 2 != 0) {
                project.classList.add("invert");
            }
        });
    });
});