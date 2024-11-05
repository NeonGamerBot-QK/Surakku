import { devs } from "../util/devs";
import { CreateUserBadge } from "../util/UserBadge";
import mydevbadge from "../assets/dev.svg";
import { ModifySidebarChannelIcon, ModifySidebarChannelName } from "../api/ChannelPatch";

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
  }, {
    name: "Test channel name", 
    description: "Test channel name",
    async execute() { 
      console.log(`Patching channel name`)
      debugger;
      ModifySidebarChannelName({
        id: "C07LEEB50KD",
        name: (c) => `zeon - ${c.isSelected}`,
        filter: (c) => {
          console.log(c, 'sur-ch');
          return true;
        }
      })
      ModifySidebarChannelIcon({
        id: "C07LEEB50KD",
        icon: mydevbadge
      })
    }
  }
];
