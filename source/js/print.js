const printPage = () => {
  const detailsElements = document.querySelectorAll("details");
  
  detailsElements.forEach(el => {
    el.setAttribute("open", "");
  });
  
  window.print();

  detailsElements.forEach(el => {
    el.removeAttribute("open");
  });
}