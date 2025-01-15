export function createPopup(el: HTMLElement) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  overlay.style.zIndex = "3050";
  document.body.appendChild(overlay);
  // Create "form"
  const form = document.createElement("div");
  form.style.position = "fixed";
  form.style.color = "var(--dt_color-content-pry) !important";
  form.style.top = "50%";
  form.style.left = "50%";
  form.style.transform = "translate(-50%, -50%)";
  form.style.backgroundColor =
    "rgba(var(--sk_primary_background,255,255,255),1)";
  form.style.padding = "2em";
  form.style.borderRadius = "1em";
  form.style.zIndex = "3100";
  form.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.3)";
  form.style.display = "flex";
  form.style.width = "33em";
  form.style.height = "30em";
  form.style.overflow = "auto";
  form.style.flexDirection = "column";
  document.body.appendChild(form);
  overlay.onclick = function () {
    overlay.remove();
    form.remove();
  };
  // Close button
  const close = document.createElement("button");
  close.innerHTML = "x";
  close.style.color = "red";
  close.style.position = "absolute";
  close.style.top = "1em";
  close.style.right = "1em";
  close.style.border = "none";
  close.style.borderRadius = "50%";
  close.style.width = "2em";
  close.style.height = "2em";
  close.style.cursor = "pointer";
  close.onclick = function () {
    overlay.remove();
    form.remove();
  };
  overlay.onclick = close.onclick;
  form.appendChild(close);
  if (!el.style.color)
    el.style.color = "var(--dt_color-content-pry) !important";
  Array.from(el.querySelectorAll("*")).forEach((d) => {
    //@ts-ignore
    if (!d.style.color)
      d.style.color = "var(--dt_color-content-pry) !important";
    if (d.tagName == "INPUT") {
      //@ts-ignore
      d.style.backgroundColor = "var(--dt_color-base-modal) !important";
    }
  });
  form.append(el);
}

export function createAlertPopup(text: string) {
  const p = document.createElement('p')
  p.innerHTML = text
  return createPopup(p)
}