import NuxtClockify from "..";

export default defineNuxtConfig({
  //@ts-ignore
  modules: [NuxtClockify],
  runtimeConfig: {
    clockifyApi: "",
  },
  clockify: {},
});
