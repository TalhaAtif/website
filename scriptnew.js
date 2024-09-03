let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("nav ul li a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.getBoundingClientRect().top;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    // Calculate the trigger point when the section occupies at least half of the viewport height
    if (offset <= window.innerHeight / 2 && offset + height >= window.innerHeight / 2) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("nav ul li a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};
