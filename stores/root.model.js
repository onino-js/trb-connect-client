import NavigationService from "../services/nav.service";

export const rootModel = {
  state: {
    selectedPage: 1,
    headerTitle: "Home",
    isLoading: false,
    isConnexionSucess: true,
  },
  reducers: {
    setHeaderTitle(state, payload) {
      return { ...state, headerTitle: payload };
    },
    setIsLoading(state, payload) {
      return { ...state, isLoading: payload };
    },
    setIsConnexionSucess(state, payload) {
      return { ...state, isConnexionSucess: payload };
    },
    goToPage(state, payload) {
      NavigationService.navigate(payload);
      return state;
    },
  },
  effects: dispatch => ({
    goHome() {
      dispatch.rootModel.goToPage(1);
      dispatch.rootModel.setHeaderTitle("Home");
    },
  }),
};
