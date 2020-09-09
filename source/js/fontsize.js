if (sessionStorage.getItem("fontsize") === "large") {
  document.querySelector("html").style["font-size"] = "large";
  sessionStorage.setItem('fontsize', 'large');
}

let textIsEnlarged = sessionStorage.getItem("fontsize") === "large" || false;
const fontsizeButton = document.querySelector(".button-fontsize");

fontsizeButton.addEventListener("click", () => {
  textIsEnlarged = !textIsEnlarged;

  if (textIsEnlarged) {
    document.querySelector("html").style["font-size"] = "large";
    sessionStorage.setItem('fontsize', 'large');
  } else {
    document.querySelector("html").style["font-size"] = "initial";
    sessionStorage.setItem('fontsize', 'initial');
  }
})