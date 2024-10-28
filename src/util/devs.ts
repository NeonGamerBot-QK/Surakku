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
   * Link to an avatar image (gh avatar)
   */
  avatar?: string;
}
export const devs: {
  [dev: string]: Dev;
} = {
  neon: {
    name: "Neon",
    link: "https://saahild.com",
  },
};
export default devs as { [dev: string]: Dev };
