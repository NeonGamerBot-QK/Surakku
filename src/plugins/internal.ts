import { devs } from "../util/devs";
import { CreateUserBadge } from "../util/UserBadge";
import mydevbadge from "../assets/dev.svg";
import zeonAvatar from "./assets/zeon.png";

import { patchInSettingsElement, SettingsTab } from "../api/Settings";

/**
 * All plugins exported here are internal plugins.
 * When building on your own you can configure them here.
 * For default build, these will all be FORCED turned on and cant be turned off.
 */
export default [
  {
    name: "Owner Badges",
    description: "Adds a little cool badge to the owner of this plugin :P",
    author: [devs.neon],
    async execute() {
      // what Actually code should look like
      /**
       * CreateAdditonalUserBadge(':crown:', 'Owner', 'This plugin is owned by the owner of this plugin :P', (e) => e.user.displayName ==  )
       */
      console.log("Owner Badges Plugin Loaded");
      CreateUserBadge(mydevbadge, `Owner`, `test`, (e) => {
        return e.id == "U07L45W79E1";
      });
    },
  },
  {
    name: "Settings Patch",
    description: "The settings for surakku",
    author: [devs.neon],
    async execute() {
      patchInSettingsElement({
        name: "Surakku",
        id: "surakku",
        icon: zeonAvatar,
        onOpen() {
          const div = document.createElement("div");
          div.innerHTML = "todo";
          return div;
        },
      } satisfies SettingsTab);
    },
  },
];
