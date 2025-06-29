//CHANGE NAVBAR STYLES ON SCROLL

window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle
    ('window-scroll', window.scrollY > 0)
})

//SHOW OR HIDE FAQS

const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('open');

        //change icon

        const icon = faq.querySelector('.faq__icon i');

        if(icon.className === 'fa-solid fa-plus'){
            icon.className = 'fa-solid fa-minus';
        } else{
            icon.className = 'fa-solid fa-plus';
        }
    })
})

const menu = document.querySelector(".nav__menu");
const menuBtn = document.querySelector("#open-menu-button");
const closeBtn = document.querySelector("#close-menu-button");

// Function to handle window resize
const handleResize = () => {
    if (window.innerWidth >= 1024) {
        menu.style.display = "flex";
        menuBtn.style.display = "none";
        closeBtn.style.display = "none";
    } else {
        menu.style.display = "none";
        menuBtn.style.display = "inline-block";
    }
};

// Initial check when the script runs
handleResize();

// Event listener for window resize
window.addEventListener('resize', handleResize);

menuBtn.addEventListener('click', () => {
    menu.style.display = "flex";
    closeBtn.style.display = "inline-block";
    menuBtn.style.display = "none";
});

closeBtn.addEventListener('click', () => {
    menu.style.display = "none";
    closeBtn.style.display = "none";
    menuBtn.style.display = "inline-block";
});

