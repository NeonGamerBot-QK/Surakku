// this plugin was pretty much tested on the hackclub slack workspace
// so some plugins will be related to it
import { ModifySidebarChannelIcon } from "../api/ChannelPatch";
import mydevbadge from "../assets/dev.svg";
import kittyfaceemoji from '../assets/3c.png'
export default [
    {
        name: "Custom Channel Icons", 
        description: "My prefered pick of channel icons",
        async execute() { 
          console.log(`Patching channel Icons/Names`)

            ModifySidebarChannelIcon({
            id: "C07LEEB50KD",
            icon: mydevbadge
            })
            ModifySidebarChannelIcon({
                id: "C07UEGSTQJJ",
                icon: kittyfaceemoji
            })
        }
      }
]