// https://stackoverflow.com/questions/48048957/react-long-press-event

export default function longPressEvents(callback, ms = 500) {
  let timeout = null;

  const start = () => (timeout = setTimeout(callback, ms));
  const stop = () => timeout && window.clearTimeout(timeout);

  return callback
    ? {
        onTouchStart: start,
        onTouchMove: stop,
        onTouchEnd: stop,
        onMouseDown: start,
        onMouseUp: stop,
        onMouseLeave: stop,
      }
    : {};
}
