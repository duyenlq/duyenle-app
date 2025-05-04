export function scrollUp() {
  if (process.client) {
    window.document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}