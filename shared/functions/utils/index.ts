export function redirectToLogin() {
  if (typeof window === "undefined") return;
  const currentUrl = window.location.pathname + window.location.search;
  const redirectParam   = encodeURIComponent(currentUrl);
  window.location.replace(`/panel/login?redirect=${redirectParam}`);
}