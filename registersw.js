if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("http://localhost:8080/fh/sw.js")
      .then(() => {});
  });
}
