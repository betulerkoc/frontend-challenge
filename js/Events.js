import Home from "./Home.js"

export default class Events {
  static bindCategoryListener(response) {
    const categoryLinks = document.querySelectorAll("[category-link-id]");
    categoryLinks.forEach((link, index) => {
      link.addEventListener("click", function (e) {
        Home.renderProductCards(response, index);
      });
    });
  }

  static bindShowPopUp() {
    const popup = document.querySelectorAll("[btn-id]");
    popup.forEach((button, index) => {
      button.addEventListener("click", function (e) {
        console.log("yeyy");
        Home.renderPopUp();
      });
    });
  }
}
