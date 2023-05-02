import globalThis from "./global";

if ("Location" in globalThis) {
  if (Object.defineProperty) {
    Object.defineProperty(Location.prototype, "origin", {
      get: function () {
        return (
          this.protocol +
          "//" +
          this.hostname +
          (this.port ? ":" + this.port : "")
        );
      },
    });
  } else if (Object.prototype.__defineGetter__) {
    try {
      Location.prototype.__defineGetter__("origin", function () {
        return (
          this.protocol +
          "//" +
          this.hostname +
          (this.port ? ":" + this.port : "")
        );
      });
    } catch (e) {
      window.location.__defineGetter__("origin", function () {
        return (
          this.protocol +
          "//" +
          this.hostname +
          (this.port ? ":" + this.port : "")
        );
      });
    }
  }
} else {
  location.origin =
    location.protocol +
    "//" +
    location.hostname +
    (location.port ? ":" + location.port : "");
}
