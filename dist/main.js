'use strict'; {
  const patchDialog = dialog => {
    if (dialog._hfs_patched) return
    dialog._hfs_patched = true

    const isSafeElement = el => {
      return (
        el.closest('button, a, input, textarea, select, [role=button]') ||
        el.closest('.MuiButton-root') ||
        el.closest('.MuiDialogActions-root') ||
        el.isContentEditable
      )
    }

    const preventClose = e => {
      if (isSafeElement(e.target)) return
      if (!dialog.contains(e.target)) {
        e.stopImmediatePropagation()
        e.preventDefault()
      }
    }

    const blockEsc = e => {
      if (e.key === 'Escape') {
        e.stopImmediatePropagation()
        e.preventDefault()
      }
    }

    window.addEventListener('mousedown', preventClose, true)
    window.addEventListener('click', preventClose, true)
    window.addEventListener('keydown', blockEsc, true)

    const cleanup = () => {
      if (!document.body.contains(dialog)) {
        window.removeEventListener('mousedown', preventClose, true)
        window.removeEventListener('click', preventClose, true)
        window.removeEventListener('keydown', blockEsc, true)
        obs.disconnect()
      }
    }

    const obs = new MutationObserver(cleanup)
    obs.observe(document.body, { childList: true, subtree: true })
  }

  const dialogObserver = new MutationObserver(() => {
    document.querySelectorAll('[role="dialog"]').forEach(patchDialog)
  })

  dialogObserver.observe(document.body, { childList: true, subtree: true })
}
