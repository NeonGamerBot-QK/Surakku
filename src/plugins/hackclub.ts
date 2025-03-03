// this plugin was pretty much tested on the hackclub slack workspace
// so some plugins will be related to it
import { ModifySidebarChannelIcon } from "../api/ChannelPatch";
import mydevbadge from "../assets/dev.svg";
import kittyfaceemoji from "../assets/3c.png";
import zeon from "../assets/zeon.png";
import icon_tiny from "../assets/icon_tiny.png";
import { devs } from "../util/devs";
import { addWatcher } from "../util/DontLeakRam";
// all of zeon's channels currently
const zeon_channels = ["C07LEEB50KD", "C07RW1666UV"];
export default [
  {
    name: "Custom Channel Icons",
    description: "My prefered pick of channel icons",
    author: [devs.neon],
    async execute() {
      console.log(`Patching channel Icons/Names`);
      zeon_channels.forEach((channel) => {
        ModifySidebarChannelIcon({
          id: channel,
          icon: zeon,
        });
      });

      ModifySidebarChannelIcon({
        id: "C07UEGSTQJJ",
        icon: kittyfaceemoji,
      });
      ModifySidebarChannelIcon({
        id: `C07TKPC0ZNZ`,
        icon: icon_tiny,
      });
      // TODO: add your own:3
    },
  },
  {
    name: "Ban #meta",
    description: "this is mostly a joke but sometimes dont open #meta",
    author: [devs.neon],
    async execute() {
      addWatcher(() => {
        const el = document.querySelector(
          `[data-qa-channel-sidebar-channel-id="C0188CY57PZ"]`,
        );
        //@ts-ignore
        if (el) el.style.display = "none";
        if (window.location.href.includes("C0188CY57PZ")) {
          window.history.back();
        }
      });
    },
  },
];
