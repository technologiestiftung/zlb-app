const cardsWithSubservices = document.querySelectorAll(
  ".service-overview a:not([href])"
);

const serviceGroups = Array.from(cardsWithSubservices).map((card) =>
  card.getAttribute("data-service-group")
);

let activeServiceGroup = "";

cardsWithSubservices.forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-service-group");

    if (activeServiceGroup === id) {
      const allGroupElements = document.querySelectorAll(
        `.service-overview .subservices-wrapper`
      );
      allGroupElements.forEach((el) => {
        el.style.display = "none";
      });

      activeServiceGroup = "";
    } else {
      const activeGroupElement = document.querySelector(`#subservices-${id}`);
      activeGroupElement.style.display = "block";

      const inactiveGroupElements = document.querySelectorAll(
        `.service-overview .subservices-wrapper:not(#subservices-${id})`
      );
      inactiveGroupElements.forEach((el) => {
        el.style.display = "none";
      });

      activeServiceGroup = id;
    }
  });
});
