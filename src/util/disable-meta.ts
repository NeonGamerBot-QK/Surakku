// run asap (root)
const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
if (cspMeta) {
    cspMeta.remove();
}
