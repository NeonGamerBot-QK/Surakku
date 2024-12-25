// Declare the global `chrome` object
declare global {
    var chrome: typeof import("chrome");
  }
  
  // Declare the global `browser` object
  declare global {
    var browser: typeof import("webextension-polyfill");
  }
  
  export {}; // Ensure this file is treated as a module
  