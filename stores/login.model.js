import { postData } from "./../services/rest.service";

export const loginModel = {
  state: {
    token: false,
    email: "",
    password: "",
    message: "",
  },
  reducers: {
    setToken(state, payload) {
      return { ...state, token: payload };
    },
    setEmail(state, payload) {
      return { ...state, email: payload };
    },
    setPassword(state, payload) {
      return { ...state, password: payload };
    },
    logout(state) {
      return { ...state, token: false };
    },
    setMessage(state, payload) {
      return { ...state, message: payload };
    },
  },
  effects: dispatch => ({
    async login(payload, rootState) {
      const cred = {
        email: rootState.loginModel.email.trim(),
        password: rootState.loginModel.password.trim(),
      };
      // const response = {};
      // response.accessToken = true;
      // dispatch.loginModel.setToken(response.accessToken);
      const response = await postData("auth/login", cred);
      if (response instanceof Error) {
        dispatch.loginModel.setMessage("impossible de se connecter au serveur");
      } else if (response.statusCode && response.statusCode === 404) {
        dispatch.loginModel.setMessage("Utilisateur non trouvé");
      } else if (response.statusCode && response.statusCode === 406) {
        dispatch.loginModel.setMessage("Mauvais mot de passe");
        return;
      } else {
        dispatch.loginModel.setToken(response.accessToken);
        dispatch.rootModel.setIsConnexionSucess(true);
      }
    },
  }),
};
