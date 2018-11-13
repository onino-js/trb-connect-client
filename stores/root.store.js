import { init } from "@rematch/core";
import { rootModel } from "./root.model";
import { loginModel } from "./login.model";
import { probesModel } from "./probes.model";
import { sitesModel } from "./sites.model";
import { measuresModel } from "./measures.model";

const rootStore = init({
  models: {
    rootModel,
    loginModel,
    probesModel,
    sitesModel,
    measuresModel,
  },
});

export default rootStore;
