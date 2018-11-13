import { postData } from "./rest.service";

let token = false;

export const isAuth = () => {
  let res = token ? true : false;
  return res;
};

export const getAutorizationHeader = () => ({
  Authorization: `Bearer ${token}`,
});

export const login = async cred => {
  const token = await postData("login", cred);
  return token;
};

export const signup = cred => {
  return fetch("./auth/signup", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cred),
  })
    .then(response => {
      return response.json().then(data => {
        token = data.accessToken;
        return data;
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
};

export const logout = () => {
  token = false;
  // eslint-disable-next-line no-undef
  return Promise.resolve(true);
};
