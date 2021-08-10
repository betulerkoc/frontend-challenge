export default class APIService {
  static URL = "http://localhost:3000";

  static async fetchResponses() {
    const url = APIService._constructUrl("responses");
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data[0][0].params;
  }
  static async fetchCampaigns() {
    const url = APIService._constructUrl("campaigns");
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  static _constructUrl(path) {
    return `${this.URL}/${path}`;
  }
}
