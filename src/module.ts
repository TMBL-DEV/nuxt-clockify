import { fileURLToPath } from "url";
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addTemplate,
} from "@nuxt/kit";
import defu from "defu";

export interface ModuleOptions {
  addPlugin: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-clockify",
    configKey: "clockify",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {
    addPlugin: false,
  },
  setup(options, nuxt) {
    if (options.addPlugin) {
      const { resolve } = createResolver(import.meta.url);
      const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
      nuxt.options.build.transpile.push(runtimeDir);
      addPlugin(resolve(runtimeDir, "plugin"));
    }

    const { resolve } = createResolver(import.meta.url);

    nuxt.hook("nitro:config", (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {};

      nitroConfig.alias["#clockify"] = resolve("./runtime/server/services");
    });

    addTemplate({
      filename: "types/clockify.d.ts",
      getContents: () =>
        [
          "declare module '#clockify' {",
          `  const useClockify: typeof import('${resolve(
            "./runtime/server/services"
          )}').useClockify`,
          `  const useClockifyDurationToHours: typeof import('${resolve(
            "./runtime/server/services"
          )}').useClockifyDurationToHours`,
          "}",
        ].join("\n"),
    });

    nuxt.hook("prepare:types", (options) => {
      options.references.push({
        path: resolve(nuxt.options.buildDir, "types/clockify.d.ts"),
      });
    });
  },
});
