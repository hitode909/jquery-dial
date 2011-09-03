( ($) ->
  throttle = (fn, delay) ->
    timer = null
    ->
      return if timer
      context = this
      args = arguments
      timer = setTimeout ->
        timer = null
        fn.apply context, args
      ,delay

  $.fn.dial = (callback) ->
    last = null
    container = this
    $(container).mousemove throttle((event) ->
      center =
        left: $(container).position().left + $(container).width() / 2
        top:  $(container).position().top  + $(container).height() / 2
      x = event.pageX - center.left
      y = event.pageY - center.top
      distance = Math.sqrt(x * x + y * y)
      rad = Math.atan(y / x)
      rad += Math.PI if x < 0
      last ?= rad
      diff = rad - last
      diff += Math.PI * 2 if diff < -Math.PI
      diff -= Math.PI * 2 if diff > Math.PI
      callback.apply(container, [diff, distance])
      last = rad
    ,100)
)(jQuery)

