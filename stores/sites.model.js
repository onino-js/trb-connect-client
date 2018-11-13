import { getData } from "./../services/rest.service";
import { formatDate } from "../services/app.service";

export const sitesModel = {
  state: {
    sites: false,
    selectedSite: false,
    isSitesLoaded: false,
    isSitesLoading: true,
    lastReloadTime: "",
    isHome: true,
  },
  reducers: {
    setSites(state, payload) {
      return { ...state, sites: payload };
    },
    setSelectedSite(state, payload) {
      return { ...state, selectedSite: payload };
    },
    setIsSitesLoaded(state, payload) {
      return { ...state, isSitesLoaded: payload };
    },
    setIsSitesLoading(state, payload) {
      return { ...state, isSitesLoading: payload };
    },
    setLastReloadTime(state, payload) {
      return { ...state, lastReloadTime: payload };
    },
    setIsHome(state, payload) {
      return { ...state, isHome: payload };
    },
  },
  effects: dispatch => ({
    async loadSites(payload, rootState) {
      dispatch.rootModel.setIsLoading(true);
      const sites = await getData("sites/list", rootState.loginModel.token);
      if (sites instanceof Error || sites === undefined) {
        dispatch.rootModel.setIsConnexionSucess(false);
        dispatch.sitesModel.setLastReloadTime("Pas de connexion");
      } else if (sites.error) {
        dispatch.sitesModel.setLastReloadTime("non autorisé");
      } else if (sites.statusCode && sites.statusCode === 404) {
        dispatch.rootModel.setIsConnexionSucess(false);
        dispatch.sitesModel.setLastReloadTime("Pas de connexion");
      } else {
        dispatch.sitesModel.setSites(sites);
        dispatch.sitesModel.setSelectedSite(sites[0]);
        dispatch.rootModel.setIsConnexionSucess(true);
        dispatch.sitesModel.setIsSitesLoaded(true);
        dispatch.sitesModel.setLastReloadTime(formatDate(new Date()));
      }
      dispatch.rootModel.setIsLoading(false);
    },
    selectSite(payload) {
      dispatch.sitesModel.setSelectedSite(payload);
      dispatch.measuresModel.setIsMeasuresLoaded(false);
      dispatch.measuresModel.setMeasures(false);
      dispatch.rootModel.setHeaderTitle(payload.name);
    },
  }),
};
