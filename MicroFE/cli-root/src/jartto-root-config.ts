import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";

registerApplication({
  name: "@jartto/navbar",
  app: () => System.import("@jartto/navbar"),
  activeWhen: isActive.navbar
});

start();
