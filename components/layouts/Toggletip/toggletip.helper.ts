function hideToggle(liveRegion: any, toggletip: any) {
  liveRegion.innerHTML = ''
  toggletip.setAttribute('aria-pressed', 'false')
}

export function handleToggleClick(e: any) {
  const toggletip = e.target

  toggletip.setAttribute('aria-pressed', 'true')
  const message = toggletip.getAttribute('data-toggletip-content')
  const liveRegion = toggletip.nextElementSibling

  liveRegion.innerHTML = ''
  window.setTimeout(function () {
    liveRegion.innerHTML = `
    <span class="toggletip-bubble">${message}</span>
    `
  }, 10)

  // close on outside click
  document.addEventListener('click', function handler(e: any) {
    toggletip.setAttribute('aria-pressed', 'true')
    if (toggletip != e.target) {
      hideToggle(liveRegion, toggletip)
      this.removeEventListener('click', handler)
    }
  })

  // close on blur
  toggletip.addEventListener('blur', function handler() {
    hideToggle(liveRegion, toggletip)
    this.removeEventListener('click', handler)
  })

  // close on ESC click
  toggletip.addEventListener('keydown', function handler(e: any) {
    if ((e.keyCode || e.which) === 27) {
      hideToggle(liveRegion, toggletip)
      this.removeEventListener('click', handler)
    }
  })
}