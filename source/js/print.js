const printButton = document.querySelector(".print-button");

printButton.addEventListener("click", () => {
  const detailsElements = document.querySelectorAll("details");
  
  detailsElements.forEach(el => {
    el.setAttribute("open", "");
  });
  
  window.print();

  detailsElements.forEach(el => {
    el.removeAttribute("open");
  });
  
})