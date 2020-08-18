/*
 * @Descripttion:
 * @version:
 * @Author: tina.cai
 * @Date: 2020-07-23 20:26:11
 * @LastEditors: tina.cai
 * @LastEditTime: 2020-07-28 23:35:46
 */

export function enableGesture(element) {
  let contexts = Object.create(null);

  let MOUSE_SYMBOL = Symbol("mouse");

  if (document.ontouchstart !== null) {
    element.addEventListener("mousedown", () => {
      contexts[MOUSE_SYMBOL] = Object.create(null);
      start(event, contexts[MOUSE_SYMBOL]);
      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL]);
      };

      let mouseend = (event) => {
        end(event, contexts[MOUSE_SYMBOL]);
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseend);
      };

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseend);
    });
  }

  element.addEventListener("touchstart", (event) => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  });

  element.addEventListener("touchmove", (event) => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      move(touch, contexts[touch.identifier]);
    }
  });

  element.addEventListener("touchend", (event) => {
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });

  element.addEventListener("touchcancel", (event) => {
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });

  // tap
  // pan - panstart panmove panend
  // flick
  // press - pressstart pressend

  let start = (point, context) => {
    let e = new CustomEvent("start");
    Object.assign(e, {
      startY: point.clientX,
      startX: point.clientY,
      clientX: point.clientX,
      clientY: point.clientY,
    });
    element.dispatchEvent(e);
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.moves = [];
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.timoutHandler = setTimeout(() => {
      if (context.isPan) return;

      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      element.dispatchEvent(Object.assign(new CustomEvent("pressstart", {})));
    }, 500);
    // console.log('start', point.clientX, point.clientY)
  };

  let move = (point, context) => {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;
    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress)
        element.dispatchEvent(
          Object.assign(new CustomEvent("presscancel", {}))
        );

      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      let e = new CustomEvent("panstart");
      Object.assign(e, {
        startY: context.startY,
        startX: context.startX,
        clientX: point.clientX,
        clientY: point.clientY,
      });
      element.dispatchEvent(e);
    }

    if (context.isPan) {
      context.moves.push({
        dx,
        dy,
        t: Date.now(),
      });
      context.moves = context.moves.filter(
        (record) => Date.now() - record.t < 300
      );
      let e = new CustomEvent("pan");
      Object.assign(e, {
        startY: context.startY,
        startX: context.startX,
        clientX: point.clientX,
        clientY: point.clientY,
      });
      element.dispatchEvent(e);
    }
    // console.log('move', dx, dy)
  };

  let end = (point, context) => {
    // console.log('end', point.clientX, point.clientY)
    if (context.isPan) {
      let dx = point.clientX - context.startX,
        dy = point.clientY - context.startY;
      let record = context.moves[0];
      let speed =
        Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) /
        (Date.now() - record.t);

      let isflick = speed > 2.5;
      if (isflick) {
        let e = new CustomEvent("flick");
        Object.assign(e, {
          startY: context.startY,
          startX: context.startX,
          clientX: point.clientX,
          clientY: point.clientY,
          speed: speed,
        });

        element.dispatchEvent(e);
      }

      let e = new CustomEvent("panend");
      Object.assign(e, {
        startY: context.startY,
        startX: context.startX,
        clientX: point.clientX,
        clientY: point.clientY,
        speed: speed,
        isflick: isflick,
      });
      element.dispatchEvent(e);
    }
    if (context.isTap) {
      element.dispatchEvent(Object.assign(new CustomEvent("tap", {})));
    }
    if (context.isPress) {
      element.dispatchEvent(Object.assign(new CustomEvent("pressend", {})));
    }

    clearTimeout(context.timoutHandler);
  };

  let cancel = (point, context) => {
    element.dispatchEvent(Object.assign(new CustomEvent("cancel", {})));

    clearTimeout(context.timoutHandler);
  };
}
