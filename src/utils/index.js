import {
  CDN_URL,
  LOGO_URL,
  POPULAR_CUISINES,
  DISH_BY_CATEGORY,
  SORT_BY,
  SEARCH_BY_NAME,
  MENU_API,
  RESTAURANT_INFO,
  SUGGESTION,
} from "./constants";

export {
  CDN_URL,
  LOGO_URL,
  POPULAR_CUISINES,
  DISH_BY_CATEGORY,
  SORT_BY,
  SEARCH_BY_NAME,
  MENU_API,
  RESTAURANT_INFO,
  SUGGESTION,
};

export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&");
};
