if (sessionStorage.getItem("fontsize") === "22px") {
  document.querySelector("html").style["font-size"] = "22px";
  sessionStorage.setItem("fontsize", "22px");
}

let textIsEnlarged = sessionStorage.getItem("fontsize") === "22px" || false;
const fontsizeButton = document.querySelector(".button-fontsize");

fontsizeButton.addEventListener("click", () => {
  textIsEnlarged = !textIsEnlarged;

  if (textIsEnlarged) {
    document.querySelector("html").style["font-size"] = "22px";
    sessionStorage.setItem("fontsize", "22px");
  } else {
    document.querySelector("html").style["font-size"] = "18px";
    sessionStorage.setItem("fontsize", "18px");
  }
})