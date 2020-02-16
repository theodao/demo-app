import Api from "./api";
import { API_ENDPOINT as baseUri } from "../constant";

export default {
  getProgressBarData: () => {
    return new Api({ baseUri }).getData({})
  }
};
