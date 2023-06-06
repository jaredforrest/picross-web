import { router, clean } from "./routes";

/** @type {NodeListOf<HTMLAnchorElement>} */
const internalLinks = document.querySelectorAll('a[href^="/"]');
internalLinks.forEach((el) => {
  el.addEventListener("click", (evt) => {
    evt.preventDefault();
    clean.then((cleanFn) => {
      cleanFn();

      const url = new URL(el.href);
      const path = url.pathname;
      const params = Object.fromEntries(url.searchParams);
      router.dispatchRoute(path, params);
      history.pushState({}, "", el.href);
    });
  });
});

window.addEventListener("popstate", () => {
  clean.then((cleanFn) => {
    cleanFn();
    const path = window.location.pathname;
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search),
    );
    router.dispatchRoute(path, params);
  });
});

const path = window.location.pathname;
const params = Object.fromEntries(new URLSearchParams(window.location.search));
router.dispatchRoute(path, params);
