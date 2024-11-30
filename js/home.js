const list = document.querySelectorAll(".nav-menu .nav-item");

function activeLink(event) {
    list.forEach((item) => {
        item.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
}

function deactivateLink (event) {
    event.currentTarget.classList.remove("active");
    list[0].classList.add("active");
}

list.forEach((item) => {
    item.addEventListener("mouseenter", activeLink);
    item.addEventListener("mouseleave", deactivateLink);
});