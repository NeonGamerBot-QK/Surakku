type RawChannel = {
  type: "private" | "public" | "dm" | "group" | "archived" | string;
  id: string;
  name: string;
  userCount: number;
  sectionChannelIndex: number;
  // prob will always be false since live updates can cause lots of problems.
  isSelected: boolean;
  isMuted: boolean;
  sectionId: string;
  isStarred: boolean;
  isMe: boolean;
};
type ChannelPatch = {
  filter?: (channel: RawChannel) => boolean;
  id: string;
};
interface NameChannelPatch extends ChannelPatch {
  name: string | ((channel: RawChannel) => string);
}
interface IconChannelPatch extends ChannelPatch {
  icon: string;
}
export const channelsToModify: ChannelPatch[] = [];
export function ModifySidebarChannelName(ops: NameChannelPatch) {
  channelsToModify.push(ops);
}
export function ModifySidebarChannelIcon(ops: IconChannelPatch) {
  channelsToModify.push(ops);
}
export function watchSideBarChannels() {
  // setInterval(() => {
  const sidebarChannels: RawChannel[] = Array.from(
    document.querySelectorAll("[data-qa-channel-sidebar-channel-id]"),
  ).map((rc) => {
    rc.setAttribute("data-touched-by-surakku", "true");
    return {
      type: rc.getAttribute("data-qa-channel-sidebar-channel-type")!,
      id: rc.getAttribute("data-qa-channel-sidebar-channel-id")!,
      name: rc.getAttribute("data-qa-channel-sidebar-channel-name")!,
      userCount: parseInt(
        rc.getAttribute("data-qa-channel-sidebar-channel-user-count")!,
      ),
      sectionChannelIndex: parseInt(
        rc.getAttribute(
          "data-qa-channel-sidebar-channel-section-channel-index",
        )!,
      ),
      isSelected: Boolean(
        rc.getAttribute("data-qa-channel-sidebar-channel-is-selected")!,
      ),
      isMuted: Boolean(
        rc.getAttribute("data-qa-channel-sidebar-channel-is-muted")!,
      ),
      sectionId: rc.getAttribute("data-qa-channel-sidebar-channel-section-id")!,
      isStarred: Boolean(
        rc.getAttribute("data-qa-channel-sidebar-channel-is-starred")!,
      ),
      isMe: Boolean(rc.getAttribute("data-qa-channel-sidebar-channel-is-me")!),
    };
  });
  for (const channel of channelsToModify) {
    const sidebarChannel = sidebarChannels.find((sc) => sc.id === channel.id);
    if (
      sidebarChannel && channel.filter ? channel.filter(sidebarChannel) : true
    ) {
      if ("name" in channel) {
        const el = document.querySelector(
          `[data-qa-channel-sidebar-channel-id="${channel.id}"]`,
        );
        if (el && typeof channel.name === "string") {
          //@ts-ignore
          el.children[1].children[0].innerText = channel.name;
        } else {
          el.children[1].children[0].innerText = channel.name(sidebarChannel);
        }
      } else if ("icon" in channel) {
        const el = document.querySelector(
          `[data-qa-channel-sidebar-channel-id="${channel.id}"]`,
        );
        if (el) {
          //@ts-ignore
          // el.setAttribute("src", channel.icon)
          const img = document.createElement("img");
          //@ts-ignore
          img.src = channel.icon!;
          img.style.maxWidth = "30px";
          img.style.maxHeight = "30px";
          el.children[0].innerHTML = "";
          el.children[0].appendChild(img);
        }
      }
    }
  }
  // }, 50);
}
