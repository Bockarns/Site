document.addEventListener("DOMContentLoaded", () => {
  // 1. Hämta referens till checkboxen som styr menyn
  const menuCheckbox = document.getElementById("menu-toggle");

  // 2. Hämta alla länkar som finns inuti .menu-listan
  const menuLinks = document.querySelectorAll(".menu a");

  // 3. Loopa igenom varje länk och lägg till en "klick-lyssnare"
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // När en länk klickas, sätt checkboxens status till false (okryssad)
      // Detta gör att CSS:en stänger menyn igen
      menuCheckbox.checked = false;
    });
  });
});
