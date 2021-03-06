// TOGGLE INFO SECTIONS
const toggleButtons = document.querySelectorAll(
  ".service .section-title-wrapper i"
);

let sectionIsOpened = false;

toggleButtons.forEach((toggleButton) => {
  toggleButton.addEventListener("click", () => {
    const sectionId = toggleButton.getAttribute("data-section-id");
    const detailsElements = document.querySelectorAll(
      `.service #${sectionId} details`
    );

    if (!sectionIsOpened) {
      detailsElements.forEach((el) => {
        el.setAttribute("open", "");
      });
      toggleButton.textContent = "Alle Infos schließen";
    } else {
      detailsElements.forEach((el) => {
        el.removeAttribute("open");
      });
      toggleButton.textContent = "Alle Infos öffnen";
    }
    sectionIsOpened = !sectionIsOpened;
  });
});

// PRINT PAGE
const printButton = document.querySelector(".print-button");
const printPDFButton = document.querySelector(".print-pdf-button");

const handlePrint = () => {
  const detailsElements = document.querySelectorAll("details");

  detailsElements.forEach((el) => {
    el.setAttribute("open", "");
  });

  window.print();

  detailsElements.forEach((el) => {
    el.removeAttribute("open");
  });
};

printButton.addEventListener("click", handlePrint);
printPDFButton.addEventListener("click", handlePrint);

// SCROLL TO TOP
const scrollButton = document.querySelector(".scroll-up-button");

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

scrollButton.addEventListener("click", handleScrollToTop);
