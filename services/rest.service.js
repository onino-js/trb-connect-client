const DEV_URL = "http://192.168.1.9:3000/";
// const DEV_URL = "https://onino-conect.herokuapp.com/";
const PROD_URL = "https://onino-conect.herokuapp.com/";

const getRoutePrefix = () => {
  // eslint-disable-next-line no-undef
  const routePrefix = __DEV__ ? DEV_URL : PROD_URL;
  return routePrefix;
};

export const getData = (route, token) => {
  const formatRoute = getRoutePrefix().concat(route);
  return fetch(formatRoute, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(response => {
      return response.json().then(data => {
        return data;
      });
    })
    .catch(function() {
      return new Error("connexion problem");
    });
};

export const postData = (route, body, token) => {
  const formatRoute = getRoutePrefix().concat(route);
  return fetch(formatRoute, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(response => {
      return response.json().then(data => {
        return data;
      });
    })
    .catch(function() {
      return new Error("connexion problem");
    });
};
