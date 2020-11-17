const serviceWithSubservices = document.querySelectorAll(
  ".service-overview a:not([href])"
);

const serviceGroups = Array.from(serviceWithSubservices).map((card) =>
  card.getAttribute("data-service-group")
);

let activeServiceGroup = "";

serviceWithSubservices.forEach((card) => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-service-group");

    if (activeServiceGroup === id) {
      const allGroupElements = document.querySelectorAll(
        `.service-overview .subservices-wrapper`
      );
      allGroupElements.forEach((el) => {
        el.style.display = "none";
      });

      const deactivatedCardElement = document.querySelector(
        `.service-overview a[data-service-group="${id}"] .card`
      );
      deactivatedCardElement.classList.remove("is-active");

      activeServiceGroup = "";
    } else {
      const activeGroupElement = document.querySelector(`#subservices-${id}`);
      activeGroupElement.style.display = "block";

      const activeCardElement = document.querySelector(
        `.service-overview a[data-service-group="${id}"] .card`
      );
      activeCardElement.classList.add("is-active");

      const inactiveGroupElements = document.querySelectorAll(
        `.service-overview .subservices-wrapper:not(#subservices-${id})`
      );
      inactiveGroupElements.forEach((el) => {
        el.style.display = "none";
      });

      const deactivatedCardElements = document.querySelectorAll(
        `.service-overview a:not([data-service-group="${id}"]) .card`
      );
      deactivatedCardElements.forEach((el) => {
        el.classList.remove("is-active");
      });

      activeServiceGroup = id;
    }
  });
});
