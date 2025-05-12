Prevents closing dialogs by tapping outside or pressing ESC. This is especially useful for mobile users where accidental gestures may trigger unwanted dialog closure. Only the close button (X) is allowed to dismiss dialogs.


It doesn't seem to be very useful, but it solves the problem of accidentally closing the file when renaming or adding comment on my phone. It feels like a fifth wheel, but at least it is still hanging on the back like an off-road vehicle, so it will be useful sometimes.

Another best solution:（Thanks again）

By rejetto ：
hey, don't need a plugin, just this script in admin-panel / custom-html / script

document.body.addEventListener('click', ev => {
  if (!ev.target.classList.contains('dialog-backdrop')) return
  ev.preventDefault()
  ev.stopPropagation()
}, true)
