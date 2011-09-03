(function($) {
  var throttle;
  throttle = function(fn, delay) {
    var timer;
    timer = null;
    return function() {
      var args, context;
      if (timer) {
        return;
      }
      context = this;
      args = arguments;
      return timer = setTimeout(function() {
        timer = null;
        return fn.apply(context, args);
      }, delay);
    };
  };
  return $.fn.dial = function(callback) {
    var container, last;
    last = null;
    container = this;
    return $(container).mousemove(throttle(function(event) {
      var center, diff, distance, rad, x, y;
      center = {
        left: $(container).position().left + $(container).width() / 2,
        top: $(container).position().top + $(container).height() / 2
      };
      x = event.pageX - center.left;
      y = event.pageY - center.top;
      distance = Math.sqrt(x * x + y * y);
      rad = Math.atan(y / x);
      if (x < 0) {
        rad += Math.PI;
      }
      if (last == null) {
        last = rad;
      }
      diff = rad - last;
      if (diff < -Math.PI) {
        diff += Math.PI * 2;
      }
      if (diff > Math.PI) {
        diff -= Math.PI * 2;
      }
      callback.apply(container, [diff, distance]);
      return last = rad;
    }, 100));
  };
})(jQuery);