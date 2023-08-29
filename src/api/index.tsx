import axios from "axios";

const apiKey: string = "b7e3fc59ca7844abb4b21bc1014d0e28";
const baseURL: string = "https://newsapi.org/v2/top-headlines";

export function getArticles() {
  return axios({
    method: "get",
    url: `${baseURL}?country=us&apiKey=${apiKey}`,
  });
}
