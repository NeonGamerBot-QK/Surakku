console.log(chrome, window);
window.addEventListener("message", (e) => {
  console.log(e, `runtime`);
  if (e.data.type && e.data.type == "fetch") {
    console.log(e.data, "fetch??");
    // alert(`Look at the console`)
    fetch(e.data.url, e.data.options || {})
      .then((r) => r.text())
      .then((text) => {
        window.postMessage({
          type: "fetch-result",
          text: text,
        });
      });
  }
  debugger;
});
debugger;
