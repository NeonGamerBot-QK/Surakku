export function patchMessageBar(id: string, cb: () => void) {
    if (!document.querySelector('[aria-describedby*="context_bar_text"]')) return console.debug(`Couldn't find the message bar`, `sur`);
    if (!document.querySelector('[data-qa="texty_send_button"]')) return console.debug(`Couldn't find the send button`, `sur`);
    //@ts-ignore
    if (!document.querySelector('[aria-describedby*="context_bar_text"]')?.getAttribute('touched-' + id)) {
  //@ts-ignore
  document.querySelector('[aria-describedby*="context_bar_text"]')?.setAttribute('touched-' + id, 'true');
  document.querySelector('[aria-describedby*="context_bar_text"]')!.addEventListener('onkeydown', (e: any) => {
      console.debug(`#onkeydown`)
      if(e.key == "Enter" && !e.shiftKey) {
          e.preventDefault();
          cb();
      }
  })
    }
    if (!document.querySelector('[data-qa="texty_send_button"]')?.getAttribute('touched-' + id)) {
        document.querySelector('[data-qa="texty_send_button"]')?.setAttribute('touched-' + id, 'true');
        //@ts-ignore
        document.querySelector('[data-qa="texty_send_button"]')?.addEventListener('click', cb);
    }
}