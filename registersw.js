if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("https://mustermaxs.github.io/FH-Trainer2/sw.js")
      .then(() => {});
  });
}
