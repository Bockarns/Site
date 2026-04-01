document.addEventListener("DOMContentLoaded", () => {
  const menuCheckbox = document.getElementById("menu-toggle");
  const menuLinks = document.querySelectorAll(".menu a");
  const portfolioLink = document.querySelector(".has-subnav > a");

  // Toggle submenyn på mobil
  portfolioLink.addEventListener("click", (e) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();
      portfolioLink.closest(".has-subnav").classList.toggle("open");
    }
  });

  // Stäng hamburgermenyn vid klick på länk
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Skippa Portfolio-knappen själv
      if (link.closest(".has-subnav") && !link.closest(".sub-nav")) return;
      menuCheckbox.checked = false;
      // Stäng även submenyn när man valt något
      portfolioLink.closest(".has-subnav").classList.remove("open");
    });
  });
});
