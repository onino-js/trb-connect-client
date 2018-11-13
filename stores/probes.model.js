import { getData } from "./../services/rest.service";
import { formatDate } from "../services/app.service";

export const probesModel = {
  state: {
    probes: false,
    lastReloadTime: "",
    isProbesLoaded: false,
    isConnexionSucess: true,
  },
  reducers: {
    setProbes(state, payload) {
      return { ...state, probes: payload };
    },
    setIsProbesLoaded(state, payload) {
      return { ...state, isProbesLoaded: payload };
    },
    setIsConnexionSucess(state, payload) {
      return { ...state, isConnexionSucess: payload };
    },
    toggleActiveProbe(state, payload) {
      let probes = state.probes.slice();
      let probeIndex = probes.findIndex(probe => probe.id === payload);
      probes[probeIndex].isActive = !probes[probeIndex].isActive;
      return { ...state, probes: probes };
    },
    setLastReloadTime(state, payload) {
      return {
        ...state,
        lastReloadTime: payload,
      };
    },
  },
  effects: dispatch => ({
    async loadProbes(payload, rootState) {
      dispatch.rootModel.setIsLoading(true);
      let probes = await getData("probes/list", rootState.loginModel.token);
      if (probes instanceof Error || probes === undefined) {
        dispatch.rootModel.setIsConnexionSucess(false);
        dispatch.probesModel.setLastReloadTime("Pas de connexion");
      } else if (probes.error) {
        dispatch.probesModel.setLastReloadTime("non autorisé");
      } else if (probes.statusCode && probes.statusCode === 404) {
        dispatch.rootModel.setIsConnexionSucess(false);
        dispatch.probesModel.setLastReloadTime("Pas de connexion");
      } else {
        probes = probes.map(probe => ({ ...probe, isActive: false }));
        dispatch.probesModel.setProbes(probes);
        dispatch.rootModel.setIsConnexionSucess(true);
        dispatch.probesModel.setLastReloadTime(formatDate(new Date()));
        dispatch.probesModel.setIsProbesLoaded(true);
      }
      dispatch.rootModel.setIsLoading(false);
    },
  }),
};
