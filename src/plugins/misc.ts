import { devs } from "../util/devs";
import { patchMessageBar } from "../api/ChatInput";
import { Plugin } from "../util";
import { addWatcher } from "../util/DontLeakRam";
import { CreateMessageButton } from "../util/MessageButton";
import { createAlertPopup, createPopup } from "../util/popup";
import { CreateUserNameModification } from "../util/ModifyUsername";
/**
 * all misc plugins
 *
 */
export default [
  {
    name: "Oneko :3",
    description: "A cute little cat that follows your cursor :3",
    author: [devs.neon],
    async execute() {
      // below is the oneko code
      // oneko.js: https://github.com/adryd325/oneko.js/blob/b323d71126726e4487c10f0d75fc47ac37ead11c/oneko.js

      (function oneko() {
        const isReducedMotion =
          //@ts-ignore
          window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
          window.matchMedia(`(prefers-reduced-motion: reduce)`).matches ===
            true;

        if (isReducedMotion) return;

        const nekoEl = document.createElement("div");

        let nekoPosX = 32;
        let nekoPosY = 32;

        let mousePosX = 0;
        let mousePosY = 0;

        let frameCount = 0;
        let idleTime = 0;
        //@ts-ignore
        let idleAnimation = null;
        let idleAnimationFrame = 0;

        const nekoSpeed = 10;
        const spriteSets = {
          idle: [[-3, -3]],
          alert: [[-7, -3]],
          scratchSelf: [
            [-5, 0],
            [-6, 0],
            [-7, 0],
          ],
          scratchWallN: [
            [0, 0],
            [0, -1],
          ],
          scratchWallS: [
            [-7, -1],
            [-6, -2],
          ],
          scratchWallE: [
            [-2, -2],
            [-2, -3],
          ],
          scratchWallW: [
            [-4, 0],
            [-4, -1],
          ],
          tired: [[-3, -2]],
          sleeping: [
            [-2, 0],
            [-2, -1],
          ],
          N: [
            [-1, -2],
            [-1, -3],
          ],
          NE: [
            [0, -2],
            [0, -3],
          ],
          E: [
            [-3, 0],
            [-3, -1],
          ],
          SE: [
            [-5, -1],
            [-5, -2],
          ],
          S: [
            [-6, -3],
            [-7, -2],
          ],
          SW: [
            [-5, -3],
            [-6, -1],
          ],
          W: [
            [-4, -2],
            [-4, -3],
          ],
          NW: [
            [-1, 0],
            [-1, -1],
          ],
        };

        function init() {
          nekoEl.id = "oneko";
          //@ts-ignore
          nekoEl.ariaHidden = true;
          nekoEl.style.width = "32px";
          nekoEl.style.height = "32px";
          nekoEl.style.position = "fixed";
          nekoEl.style.pointerEvents = "none";
          nekoEl.style.imageRendering = "pixelated";
          nekoEl.style.left = `${nekoPosX - 16}px`;
          nekoEl.style.top = `${nekoPosY - 16}px`;
          //@ts-ignore
          nekoEl.style.zIndex = 2147483647;
          // data url cuz cors sucks bruh
          // iswtg if it blocks the data url
          let nekoFile =
            "data:image/gif;base64,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";
          const curScript = document.currentScript;
          if (curScript && curScript.dataset.cat) {
            nekoFile = curScript.dataset.cat;
          }
          nekoEl.style.backgroundImage = `url(${nekoFile})`;

          document.body.appendChild(nekoEl);

          document.addEventListener("mousemove", function (event) {
            mousePosX = event.clientX;
            mousePosY = event.clientY;
          });

          window.requestAnimationFrame(onAnimationFrame);
        }

        //@ts-ignore
        let lastFrameTimestamp;

        //@ts-ignore
        function onAnimationFrame(timestamp) {
          // Stops execution if the neko element is removed from DOM
          if (!nekoEl.isConnected) {
            return;
          }
          //@ts-ignore
          if (!lastFrameTimestamp) {
            lastFrameTimestamp = timestamp;
          }
          if (timestamp - lastFrameTimestamp > 100) {
            lastFrameTimestamp = timestamp;
            frame();
          }
          window.requestAnimationFrame(onAnimationFrame);
        }

        //@ts-ignore
        function setSprite(name, frame) {
          //@ts-ignore
          const sprite = spriteSets[name][frame % spriteSets[name].length];
          nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
        }

        function resetIdleAnimation() {
          idleAnimation = null;
          idleAnimationFrame = 0;
        }

        function idle() {
          idleTime += 1;

          // every ~ 20 seconds
          if (
            idleTime > 10 &&
            Math.floor(Math.random() * 200) == 0 &&
            //@ts-ignore
            idleAnimation == null
          ) {
            let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
            if (nekoPosX < 32) {
              avalibleIdleAnimations.push("scratchWallW");
            }
            if (nekoPosY < 32) {
              avalibleIdleAnimations.push("scratchWallN");
            }
            if (nekoPosX > window.innerWidth - 32) {
              avalibleIdleAnimations.push("scratchWallE");
            }
            if (nekoPosY > window.innerHeight - 32) {
              avalibleIdleAnimations.push("scratchWallS");
            }
            idleAnimation =
              avalibleIdleAnimations[
                Math.floor(Math.random() * avalibleIdleAnimations.length)
              ];
          }

          //@ts-ignore
          switch (idleAnimation) {
            case "sleeping":
              if (idleAnimationFrame < 8) {
                setSprite("tired", 0);
                break;
              }
              setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
              if (idleAnimationFrame > 192) {
                resetIdleAnimation();
              }
              break;
            case "scratchWallN":
            case "scratchWallS":
            case "scratchWallE":
            case "scratchWallW":
            case "scratchSelf":
              //@ts-ignore
              setSprite(idleAnimation, idleAnimationFrame);
              if (idleAnimationFrame > 9) {
                resetIdleAnimation();
              }
              break;
            default:
              setSprite("idle", 0);
              return;
          }
          idleAnimationFrame += 1;
        }

        function frame() {
          frameCount += 1;
          const diffX = nekoPosX - mousePosX;
          const diffY = nekoPosY - mousePosY;
          const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

          if (distance < nekoSpeed || distance < 48) {
            idle();
            return;
          }

          idleAnimation = null;
          idleAnimationFrame = 0;

          if (idleTime > 1) {
            setSprite("alert", 0);
            // count down after being alerted before moving
            idleTime = Math.min(idleTime, 7);
            idleTime -= 1;
            return;
          }

          let direction;
          direction = diffY / distance > 0.5 ? "N" : "";
          direction += diffY / distance < -0.5 ? "S" : "";
          direction += diffX / distance > 0.5 ? "W" : "";
          direction += diffX / distance < -0.5 ? "E" : "";
          setSprite(direction, frameCount);

          nekoPosX -= (diffX / distance) * nekoSpeed;
          nekoPosY -= (diffY / distance) * nekoSpeed;

          nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
          nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

          nekoEl.style.left = `${nekoPosX - 16}px`;
          nekoEl.style.top = `${nekoPosY - 16}px`;
        }

        init();
      })();
    },
  },
  {
    name: "TextReplace",
    description: "Replaces text with other text! (message send only)",
    author: [devs.neon],
    async execute() {
      console.log("TextReplace Plugin Loaded");
      setInterval(() => {
        patchMessageBar(`text-replace`, (str) => {
          console.log(str, "before debug");
          //@ts-ignore
          const t = document
            .querySelector('[aria-describedby*="context_bar_text"]')
            ?.querySelector("p");
          console.log(t?.innerText);
          debugger;
          //@ts-ignore
          if (t?.innerText.includes("text to replace"))
            t.innerText = t.innerText.replace(
              "text to replace",
              "replaced text",
            );
          //@ts-ignore
        });
      }, 50);
    },
  },
  {
    name: "Disable Notifications",
    description: "Disables notifications popup by default",
    author: [devs.neon],
    async execute() {
      document.cookie = "no_growl_banner=1;";
    },
  },
  {
    name: "remove sales force",
    description: "removes sales force from settings",
    author: [devs.neon],
    async execute() {
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (document.getElementById("salesforce")) {
            document.getElementById("salesforce")!.remove();
          }
        });
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    },
  },

  {
    name: "Remove message blur",
    description:
      "Removes the blur effect on messages because u need premium or smthing",
    author: [devs.neon],
    async execute() {
      addWatcher(() => {
        Array.from(
          document.querySelectorAll(".c-message_kit__hidden_message_blur"),
        ).forEach((e) => {
          e.classList.toggle("c-message_kit__hidden_message_blur", false);
        });
      });
    },
  },
  {
    name: "Remove premium AD's",
    description: "Im not upgrading",
    author: [devs.neon],
    async execute() {
      // please feel to add to this, you can add by adding a PR with the selector and proof and how to repoduce it
      const selectors = [
        `[id="limitedHistoryBanner"]`,
        `[data-qa="upgrades-kit-upgrade-button"]`,
        `[data-qa="upgrade-menu-item-wrapper"]`,
      ];
      addWatcher(() => {
        for (const selector of selectors) {
          for (const el of document.querySelectorAll(selector)) {
            //@ts-ignore
            el.style.display = "none";
          }
        }
      });
    },
  },
  {
    name: "Avatar decorations",
    description: "Adds decorations to your avatar",
    author: [devs.neon],
    async execute() {
      addWatcher(() => {
        Array.from(document.querySelectorAll(`[class*="c-base_icon"]`)).forEach(
          (e) => {
            //@ts-ignore
            delete e.srcset;
            //@ts-ignore
            // e.src = `https://ca.slack-edge.com/T053NBD7RDG-U053N7QALHH-g7800332736c-48`
            // TODO: add avatar decorations
          },
        );
      });
    },
  },
  {
    name: "SlackCuddles",
    description: "Why to a huddle when u can do a slack cuddle",
    author: [devs.thetridentguy],
    execute() {
      console.log("Cuddle script injected sucessfully!");
      console.log(`Slack Cuddles Copyright (C) 2024 TheTridentGuy (http://thetridentguy.xyz)
  This program comes with ABSOLUTELY NO WARRANTY;
  This is free software, and you are welcome to redistribute it
  under certain conditions;`);
      var replacements = {
        Huddle: "Cuddle",
        huddle: "cuddle",
      };

      var ignore_classes = ["p-message_pane_input"];

      function has_ancestor_class(node: any, class_name: string) {
        while (node) {
          if (node.classList && node.classList.contains(class_name)) {
            return true;
          }
          node = node.parentElement;
        }
        return false;
      }

      function replace_text(node: any) {
        for (var class_name of ignore_classes) {
          if (has_ancestor_class(node, class_name)) {
            return;
          }
        }
        if (node.nodeType == Node.TEXT_NODE) {
          var text = node.textContent;
          for (var [target_word, replacement_word] of Object.entries(
            replacements,
          )) {
            text = text.replace(target_word, replacement_word);
          }
          node.textContent = text;
        } else {
          node.childNodes.forEach(replace_text);
        }
      }
      var title = document.title;
      for (var [target_word, replacement_word] of Object.entries(
        replacements,
      )) {
        title = title.replace(target_word, replacement_word);
      }
      var observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            replace_text(node);
          });
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    },
  },
  {
    name: "Send Via slack api",
    description: `If u didnt know you can send blocks as you :0`,
    author: [devs.neon],
    async execute() {
      // dont check for token on load;only for when send
      // addWatcher(() => {

      //   // debugger;
      // })
      CreateMessageButton(
        `<svg data-y0c="true" data-qa="send_blocks" aria-hidden="true" viewBox="0 0 20 20" class="is-inline" style="--s: 20px;"><path fill="currentColor" fill-rule="evenodd" d="M5.128 3.213A.75.75 0 0 0 4 3.861v12.277a.75.75 0 0 0 1.128.647l10.523-6.138a.75.75 0 0 0 0-1.296zM2.5 3.861c0-1.737 1.884-2.819 3.384-1.944l10.523 6.139c1.488.868 1.488 3.019 0 3.887L5.884 18.08c-1.5.875-3.384-.207-3.384-1.943z" clip-rule="evenodd"></path></svg>`,
        "Send Blocks",
        async () => {
          //@ts-ignore
          const utoken = window.Surakku.plugins
            .flat()
            .find((e) => e.name == "Use slack app").custom_properties.token;
          if (!utoken) return createAlertPopup(`No user token found!`);

          // use the message as a json payload
          // yes
          // im not lying
          //@ts-ignore
          const contentRR = document.querySelector(".ql-editor")!.innerText;
          if (!contentRR)
            return createAlertPopup(
              `Please have valid json data in your message box`,
            );
          try {
            const data = JSON.parse(contentRR);
            // alert(`Wow i have ${data.length} blocks`);
            //@ts-ignore
            //FIXME: CORS RAAAAA (current error is it no send to channel, and is stuck on "pending")
            await window
              .send_fetch("https://api.saahild.com/api/slack_m/send", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: utoken,
                },
                body: JSON.stringify({
                  //@ts-ignore so its always truthy? yes it is
                  channel: location.pathname.split("/")[3],
                  // text: `testing from send blocks button`,
                  blocks: data,
                }),
              })
              .then((d: any) => console.log(`jsond`, d));
            //@ts-ignore
            document.querySelector(".ql-editor")!.innerText = "";
          } catch (e: any) {
            createAlertPopup(
              e.message! +
                `
              If you need help creating blocks u can try testing them on https://app.slack.com/block-kit-builder !`,
            );
          }
        },
      );
    },
  },
  {
    name: "Pronouns",
    description: `Adds slack users pronouns to there username`,
    author: [devs.neon],
    async execute() {
      const _this = this;
      //@ts-ignore
      const utoken = window.Surakku.plugins
        .flat()
        .find((e) => e.name == "Use slack app").custom_properties.token;
      async function getPronouns(user_id: string) {
        if (!_this.custom_properties!.cache.has(user_id)) {
          //@ts-ignore
          _this.custom_properties!.cache.set(
            user_id,
            await window
              .send_fetch(
                `https://api.saahild.com/api/slack_m/pronouns?user=${user_id}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: utoken,
                  },
                  //@ts-ignore
                },
              )
              .then((r) => JSON.parse(r).pronouns),
          );
        }
        return _this.custom_properties!.cache.get(user_id);
      }
      CreateUserNameModification(
        async (user) => {
          //@ts-ignore
          const pronouns = await getPronouns(user.id);
          // console.log(pronouns, `spr`);
          // debugger;
          if (pronouns) return `${user.display_name} (${pronouns})`;
          return user.display_name;
        },
        () => true,
      );
    },
    custom_properties: {
      // yes im caching them, i am not ddossing my own api
      cache: new Map(),
    },
  },
] satisfies Plugin[];
