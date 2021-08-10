import APIService from "./APIService.js";
import Home from "./Home.js"
class App {
  static async run() {
    const defaultIndex = 0;
    const response = await APIService.fetchResponses();
    Home.renderSideBarTitles(response);
    Home.renderProductCards(response, defaultIndex);
  }
}

document.addEventListener("DOMContentLoaded", App.run);
