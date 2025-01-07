// import * as Avatars from "./Avatars";
export interface Dev {
  /**
   * What name you want to show up
   */
  name: string;
  /**
   * Some link to your github or something
   */
  link: string;
  /**
   * Inline data img url, please add your image avatar to ./Avatars.ts
   */
  avatar?: string;
}
export const devs: {
  [dev: string]: Dev;
} = {
  neon: {
    name: "Neon",
    link: "https://saahild.com",
    // avatar: Avatars.NeonsAvatar,
  },
  thetridentguy: {
    name: "TheTridentGuy",
    link: "http://thetridentguy.xyz/",
  },
};
export default devs as { [dev: string]: Dev };
