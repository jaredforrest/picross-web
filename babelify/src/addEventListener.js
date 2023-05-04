export default function addEvent(on, fn, self) {
  return (self = this).attachEvent("on" + on, function (e) {
    var e = e || window.event;
    e.preventDefault =
      e.preventDefault ||
      function () {
        e.returnValue = false;
      };
    e.stopPropagation =
      e.stopPropagation ||
      function () {
        e.cancelBubble = true;
      };
    fn.call(self, e);
  });
}
