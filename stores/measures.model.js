import { postData } from "./../services/rest.service";
import { formatDate } from "../services/app.service";

export const measuresModel = {
  state: {
    lastReloadTime: "",
    measures: false,
    isMeasuresLoaded: false,
    isConnexionSucess: true,
  },
  reducers: {
    setMeasures(state, payload) {
      return { ...state, measures: payload };
    },
    setIsMeasuresLoaded(state, payload) {
      return { ...state, isMeasuresLoaded: payload };
    },
    setIsConnexionSucess(state, payload) {
      return { ...state, isConnexionSucess: payload };
    },
    setLastReloadTime(state, payload) {
      return { ...state, lastReloadTime: payload };
    },
  },
  effects: dispatch => ({
    async loadMeasures(payload, rootState) {
      dispatch.rootModel.setIsLoading(true);
      let measures = await postData(
        "measures/find-by-site",
        {
          siteId: rootState.sitesModel.selectedSite.id,
        },
        rootState.loginModel.token,
      );
      if (measures instanceof Error || measures === undefined) {
        dispatch.rootModel.setIsConnexionSucess(false);
        dispatch.measuresModel.setLastReloadTime("Pas de connexion");
      } else if (measures.error) {
        dispatch.measuresModel.setLastReloadTime("non autorisé");
      } else if (measures.statusCode && measures.statusCode === 404) {
        dispatch.rootModel.setIsConnexionSucess(false);
        dispatch.measuresModel.setLastReloadTime("Pas de connexion");
      } else {
        dispatch.measuresModel.setMeasures(measures);
        dispatch.measuresModel.setIsMeasuresLoaded(true);
        dispatch.rootModel.setIsConnexionSucess(true);
        dispatch.measuresModel.setLastReloadTime(formatDate(new Date()));
      }
      dispatch.rootModel.setIsLoading(false);
    },
  }),
};
