jQuery.fn.extend({
  everyTime: function (c, a, d, b) {
    return this.each(function () {
      jQuery.timer.add(this, c, a, d, b);
    });
  },
  oneTime: function (c, a, d) {
    return this.each(function () {
      jQuery.timer.add(this, c, a, d, 1);
    });
  },
  stopTime: function (c, a) {
    return this.each(function () {
      jQuery.timer.remove(this, c, a);
    });
  },
});
jQuery.extend({
  timer: {
    global: [],
    guid: 1,
    dataKey: "jQuery.timer",
    regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
    powers: {
      ms: 1,
      cs: 10,
      ds: 100,
      s: 1e3,
      das: 1e4,
      hs: 1e5,
      ks: 1e6
    },
    timeParse: function (c) {
      if (c == undefined || c == null) return null;
      var a = this.regex.exec(jQuery.trim(c.toString()));
      return a[2] ? parseFloat(a[1]) * (this.powers[a[2]] || 1) : c;
    },
    add: function (c, a, d, b, e) {
      var g = 0;
      if (jQuery.isFunction(d)) {
        e || (e = b);
        b = d;
        d = a;
      }
      a = jQuery.timer.timeParse(a);
      if (!(typeof a != "number" || isNaN(a) || a < 0)) {
        if (typeof e != "number" || isNaN(e) || e < 0) e = 0;
        e = e || 0;
        var f =
          jQuery.data(c, this.dataKey) || jQuery.data(c, this.dataKey, {});
        f[d] || (f[d] = {});
        b.timerID = b.timerID || this.guid++;
        var h = function () {
          if ((++g > e && e !== 0) || b.call(c, g) === false)
            jQuery.timer.remove(c, d, b);
        };
        h.timerID = b.timerID;
        f[d][b.timerID] || (f[d][b.timerID] = window.setInterval(h, a));
        this.global.push(c);
      }
    },
    remove: function (c, a, d) {
      var b = jQuery.data(c, this.dataKey),
        e;
      if (b) {
        if (a) {
          if (b[a]) {
            if (d) {
              if (d.timerID) {
                window.clearInterval(b[a][d.timerID]);
                delete b[a][d.timerID];
              }
            } else
              for (d in b[a]) {
                window.clearInterval(b[a][d]);
                delete b[a][d];
              }
            for (e in b[a]) break;
            if (!e) {
              e = null;
              delete b[a];
            }
          }
        } else
          for (a in b) this.remove(c, a, d);
        for (e in b) break;
        e || jQuery.removeData(c, this.dataKey);
      }
    },
  },
});
jQuery(window).bind("unload", function () {
  jQuery.each(jQuery.timer.global, function (c, a) {
    jQuery.timer.remove(a);
  });
});

/*Network*/
var kNetwork = {};
kNetwork.data = {};
kNetwork.init = function () {
  var b = $("meta");
  for (var a = 0; a < b.length; a++) {
    if ($("meta:eq(" + a + ")").attr("property") == "og:title") {
      kNetwork.data.title = $("meta:eq(" + a + ")").attr("content");
    } else {
      if ($("meta:eq(" + a + ")").attr("property") == "og:description") {
        kNetwork.data.description = $("meta:eq(" + a + ")").attr("content");
      } else {
        if ($("meta:eq(" + a + ")").attr("property") == "og:image") {
          kNetwork.data.image = $("meta:eq(" + a + ")").attr("content");
        } else {
          if ($("meta:eq(" + a + ")").attr("property") == "og:url") {
            kNetwork.data.url = $("meta:eq(" + a + ")").attr("content");
          }
        }
      }
    }
  }
  if (typeof kNetwork.data.url == "undefined") {
    kNetwork.data.url = location.href.replace(location.hash, "");
  }
};

function f(a) {
  var b = "https://www.facebook.com/sharer/sharer.php?u=";
  var c = b + (a ? a : kNetwork.data.url);
  window.open(c);
}

function p(a) {
  var h = kNetwork.data.title;
  var b = kNetwork.data.description;
  var e = a ? a : kNetwork.data.url;
  var d = kNetwork.data.image;
  var c = 145 - e.length - h.length - d.length;
  b = b.substr(0, c) + "...";
  window.open(
    "http://www.plurk.com/?qualifier=shares&status=" +
    encodeURIComponent(e) +
    " (" +
    encodeURIComponent(h) +
    ") " +
    encodeURIComponent(b) +
    " " +
    d
  );
}

function t(a) {
  var e = kNetwork.data.title;
  var b = kNetwork.data.description;
  var d = a ? a : kNetwork.data.url;
  var c = 135 - d.length - e.length;
  b = b.substr(0, c) + "...";
  window.open(
    "http://twitter.com/home/?status=" +
    encodeURIComponent(d + " " + e + " " + b)
  );
}

function m(a) {
  var i = kNetwork.data.title;
  var b = kNetwork.data.description;
  var h = a ? a : kNetwork.data.url;
  var e = kNetwork.data.image;
  var d = 205 - h.length - i.length - e.length;
  b = b.substr(0, d);
  var c =
    encodeURIComponent(h) +
    "&title=" +
    encodeURIComponent(i) +
    "&screenshot=" +
    encodeURIComponent(e) +
    "&description=" +
    encodeURIComponent(b);
  window.open("http://profile.live.com/badge?url=" + c);
}

function g(a) {
  var c = a ? a : kNetwork.data.url;
  var b = "https://plus.google.com/share?url=" + c;
  window.open(
    b,
    "_blank",
    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"
  );
}

function line(a) {
  var c = "http://line.me/R/msg/text/?";
  var b =
    c +
    "BMW%20i%E9%83%BD%E6%9C%83%E7%A7%BB%E5%8B%95%20%E9%AB%94%E7%8F%BE%E6%9C%AA%E4%BE%86" +
    encodeURIComponent(a ? a : kNetwork.data.url);
  window.open(b);
}
var sendEvent = function (b, c, a) {
  if (typeof ga == "undefined") {
    return;
  }
  ga("send", "event", b, c, a);
};
var sendPage = function (a, b) {
  if (typeof ga == "undefined") {
    return;
  }
  ga("send", "pageview", {
    page: a,
    title: b
  });
};
$(kNetwork.init);
/*Root*/
var Root = {};
Root.IPHONE = "iPhone";
Root.IPAD = "iPad";
Root.ANDROID = "Android";
Root.ANDROIDTABLET = "AndroidTablet";
Root.WINDOWSPHONE = "WindowsPhone";
Root.PC = "PC";
Root.IE6 = "IE6";
Root.IE7 = "IE7";
Root.IE8 = "IE8";
Root.IE9 = "IE9";
Root.IE10 = "IE10";
Root.IE11 = "IE11";
Root.MSEDGE = "MSEdge";
Root.CHROME = "Chrome";
Root.FIREFOX = "FF";
Root.SAFARI = "Safari";
Root.OPERA = "Opera";
Root.MICROSOFT = "microsoft";
Root.APPLE = "apple";
Root.GOOGLE = "google";
Root.browser = "";
Root.device = "";
Root.mobile = false;
Root.system = "";
Root.target = window;
Root.pointer = false;
Root.detectBrowser = function () {
  var a = navigator.userAgent;
  if (/iPhone/i.test(a)) {
    Root.browser = Root.SAFARI;
    Root.device = Root.IPHONE;
    Root.system = Root.APPLE;
    Root.mobile = true;
  } else {
    if (/iPad/i.test(a)) {
      Root.browser = Root.SAFARI;
      Root.device = Root.IPAD;
      Root.system = Root.APPLE;
      Root.mobile = true;
    } else {
      if (/Android/i.test(a) && /mobile/i.test(a)) {
        Root.browser = Root.CHROME;
        Root.device = Root.ANDROID;
        Root.system = Root.GOOGLE;
        Root.mobile = true;
      } else {
        if (/Android/i.test(a)) {
          Root.browser = Root.CHROME;
          Root.device = Root.ANDROIDTABLET;
          Root.system = Root.GOOGLE;
          Root.mobile = true;
        } else {
          if (/Windows Phone/i.test(a) && /rv:11/i.test(a)) {
            Root.browser = Root.IE11;
            Root.device = Root.WINDOWSPHONE;
            Root.System = Root.MICROSOFT;
            Root.mobile = true;
          } else {
            if (/Windows Phone/i.test(a) && /MSIE 10/i.test(a)) {
              Root.browser = Root.IE10;
              Root.device = Root.WINDOWSPHONE;
              Root.System = Root.MICROSOFT;
              Root.mobile = true;
            } else {
              if (/Windows Phone/i.test(a) && /MSIE 9/i.test(a)) {
                Root.browser = Root.IE9;
                Root.device = Root.WINDOWSPHONE;
                Root.system = Root.MICROSOFT;
                Root.mobile = false;
              } else {
                if (/MSIE 6/i.test(a)) {
                  Root.browser = Root.IE6;
                  Root.device = Root.PC;
                  Root.system = Root.MICROSOFT;
                  Root.mobile = false;
                } else {
                  if (/MSIE 7/i.test(a)) {
                    Root.browser = Root.IE7;
                    Root.device = Root.PC;
                    Root.system = Root.MICROSOFT;
                    Root.mobile = false;
                  } else {
                    if (/MSIE 8/i.test(a)) {
                      Root.browser = Root.IE8;
                      Root.device = Root.PC;
                      Root.system = Root.MICROSOFT;
                      Root.mobile = false;
                    } else {
                      if (/MSIE 9/i.test(a)) {
                        Root.browser = Root.IE9;
                        Root.device = Root.PC;
                        Root.system = Root.MICROSOFT;
                        Root.mobile = false;
                      } else {
                        if (/MSIE 10/i.test(a)) {
                          Root.browser = Root.IE10;
                          Root.device = Root.PC;
                          Root.system = Root.MICROSOFT;
                          Root.mobile = false;
                        } else {
                          if (/rv:11/i.test(a)) {
                            Root.browser = Root.IE11;
                            Root.device = Root.PC;
                            Root.system = Root.MICROSOFT;
                            Root.mobile = false;
                          } else if (/Edge\/12./i.test(a)) {
                            Root.browser = Root.MSEDGE;
                            Root.device = Root.PC;
                            Root.system = Root.MICROSOFT;
                            Root.mobile = false;
                          } else {
                            if (/Firefox/i.test(a)) {
                              Root.browser = Root.FIREFOX;
                              Root.device = Root.PC;
                              Root.system = Root.PC;
                              Root.mobile = false;
                            } else {
                              if (/Chrome/i.test(a)) {
                                Root.browser = Root.CHROME;
                                Root.device = Root.PC;
                                Root.system = Root.MICROSOFT;
                                Root.mobile = false;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  if (Root.browser == Root.IE10 && a.match(/Touch/i)) {
    Root.pointer = true;
  }
  if (Root.browser == Root.IE11 && a.match(/Touch/i)) {
    Root.pointer = true;
  }
};
Root.detectWindowsTouch = function () {
  if (
    window.PointerEvent &&
    (navigator.msMaxTouchPoints || navigator.maxTouchPoints)
  ) {
    return true;
  } else {
    if (
      window.MSPointerEvent &&
      (navigator.msMaxTouchPoints || navigator.maxTouchPoints)
    ) {
      return true;
    } else {
      return false;
    }
  }
};
Root.cookieData = {};
Root.setCookie = function (c, e, d) {
  if (d) {
    var b = new Date();
    b.setTime(b.getTime() + d * 60 * 1000);
    var a = "";
    a = "" + b.toGMTString();
  } else {
    var a = "";
  }
  document.cookie = c + "=" + encodeURIComponent(e) + "; expires=" + a;
};
Root.getCookie = function (c) {
  var e = document.cookie;
  var g = e.split(";");
  var b = {};
  for (var d = 0; d < g.length; d++) {
    var h = g[d].split("=");
    var a = h[0].replace(/^[\s]*|[\s]*$/g, "");
    var f = h[1];
    b[a] = f;
  }
  Root.cookieData = b;
  return decodeURIComponent(b[c]);
};
Root.deleteCookie = function (a) {
  Root.setCookie(a, "", -60 * 24);
};
Root.titleCase = function (a) {
  return a.replace(/\w\S*/g, function (b) {
    return b.charAt(0).toUpperCase() + b.substr(1).toLowerCase();
  });
};
Root.getParams = function () {
  if (location.search == "") {
    return "";
  }
  var e = {};
  var b = location.search.split("?")[1];
  var c = b;
  var a = c.split("&");
  var g = a.length;
  for (var f = 0; f < g; f++) {
    var d = a[f];
    var j = Root.getKey(d);
    var h = Root.getValue(d);
    e[j] = h;
  }
  return e;
};
Root.getKey = function (a) {
  var b = a.match(/^[^=]+/i)[0];
  return b;
};
Root.getValue = function (a) {
  var b = a.match(/[^=]+$/i)[0];
  return b;
};
Root.verifyPhone = function (a) {
  phoneReg = /(^[0]\d{1}\d{6,8}$)|(^[0]\d{2}\d{6,7}$)|(^[0]\d{3}\d{6}$)|(^09([0-9]){8})$/i;
  return phoneReg.test(a);
};
Root.verifyEmail = function (a) {
  emailReg = /^([a-zA-Z0-9]+)(([a-zA-Z0-9]+)|([_\-\.][a-zA-Z0-9]+))+@((([a-zA-Z0-9]+)|([a-zA-Z0-9]+_[a-zA-Z0-9]+)|[a-zA-Z0-9]+\-[a-zA-Z0-9]+)\.)+([a-zA-Z0-9]{2,4})$/i;
  return emailReg.test(a);
};
Root.verifyTB = function (c) {
  var a = new String("12121241");
  var b = 0;
  re = /^\d{8}$/;
  if (!re.test(c)) {
    return false;
  }
  for (t = 0; t < 8; t++) {
    s1 = parseInt(c.substr(t, 1));
    s2 = parseInt(a.substr(t, 1));
    b += cal(s1 * s2);
  }
  if (!valid(b)) {
    if (c.substr(6, 1) == "7") {
      return valid(b + 1);
    }
  }
  return valid(b);
};

function valid(a) {
  return a % 10 == 0 ? true : false;
}

function cal(b) {
  var a = 0;
  while (b != 0) {
    a += b % 10;
    b = (b - (b % 10)) / 10;
  }
  return a;
}
Root.verifyInvoice = function (a) {
  invoiceReg = /^[a-zA-Z]{2}\d{8}/;
  return invoiceReg.test(a);
};
Root.detectBrowser();

!(function (d) {
  function f(t, a) {
    var n = t.find(".digit");
    if (n.is(":animated")) return !1;
    if (t.data("digit") == a) return !1;
    t.data("digit", a);
    var s = d("<span>", {
      class: "digit",
      css: {
        top: "-2.1em",
        opacity: 0
      },
      html: a,
    });
    n
      .before(s)
      .removeClass("static")
      .animate({
        top: "2.5em",
        opacity: 0
      }, "fast", function () {
        n.remove();
      }),
      s.delay(100).animate({
        top: 0,
        opacity: 1
      }, "fast", function () {
        s.addClass("static");
      });
  }
  d.fn.countdown = function (t) {
    var a,
      n,
      s,
      i,
      o,
      c,
      e = d.extend({
        callback: function () {},
        timestamp: 0
      }, t);

    function p(t, a, n) {
      f(c.eq(t), Math.floor(n / 10) % 10), f(c.eq(a), n % 10);
    }
    return (
      (function (a) {
        a.addClass("countdownHolder"),
          d.each(["Days", "Hours", "Minutes", "Seconds"], function (t) {
            d('<span class="count' + this + '">')
              .html(
                '<span class="position">\t\t\t\t\t<span class="digit static">0</span>\t\t\t\t</span>\t\t\t\t<span class="position">\t\t\t\t\t<span class="digit static">0</span>\t\t\t\t</span>'
              )
              .appendTo(a),
              "Seconds" != this &&
              a.append('<span class="countDiv countDiv' + t + '"></span>');
          });
      })(this),
      (c = this.find(".position")),
      (function t() {
        (a = Math.floor((e.timestamp - new Date()) / 1e3)) < 0 && (a = 0),
          p(0, 1, (n = Math.floor(a / 86400))),
          (a -= 86400 * n),
          p(2, 3, (s = Math.floor(a / 3600))),
          (a -= 3600 * s),
          p(4, 5, (i = Math.floor(a / 60))),
          p(6, 7, (o = a -= 60 * i)),
          e.callback(n, s, i, o),
          setTimeout(t, 1e3);
      })(),
      this
    );
  };
})(jQuery);

$(function () {
  var setTime = 0;
  // 整個活動開始時間
  var openTime = new Date("2021/08/26 10:00:00");
  // 現在時間
  if (Root.getParams().t) {
    setTime = new Date(Root.getParams().t.replace("T", " "));
    //console.log(setTime)
  }
  var currentTime = setTime != 0 ? setTime : new Date();
  //timer關閉時間（即將結束）活動結束時間
  var finalTime = new Date("2021/09/22 09:59:59");
  // 今天活動結束時間
  var endEventTime = new Date("2021/09/22 09:59:59");
  
  // KV倒數計時
  var endEventTime2 = new Date("2021/09/22 09:59:59");

  var eventCountC = $(".timerC");
  var eventCountD = $(".timerD");

  if (Root.getParams().r) {
    var round = Root.getParams().r;
    if (round >= 1) {
      spDone1 = true;
    }
    if (round >= 2) {
      spDone2 = true;
    }
    if (round >= 3) {
      spDone3 = true;
    }
    if (round >= 4) {
      spDone4 = true;
    }
  }

  function setOpenTime(_type) {
    let currentTime = setTime != 0 ? setTime : new Date();
    console.log('日期' + endEventTime);
    if (currentTime < endEventTime) {
      var spantime31 = (endEventTime - currentTime) / 1000;
      var d31 = Math.floor(spantime31 / (24 * 3600));
      var h31 = Math.floor(spantime31 / 3600 - d31 * 24);
      var m31 = Math.floor((spantime31 % 3600) / 60);
      var s31 = Math.floor(spantime31 % 60);
      var ms31 = Math.floor(
        ((endEventTime -
            currentTime -
            d31 * (24 * 60 * 60 * 1000) -
            h31 * (60 * 60 * 1000) -
            m31 * (60 * 1000) -
            s31 * 1000) /
          10) %
        100
      );
      console.log(d31 < 0 ? "0" + d31 : d31);
      eventCountC.find(".days").html(d31 < 0 ? "0" + d31 : d31);
      eventCountC.find(".hours").html(h31 < 10 ? "0" + h31 : h31);
      eventCountC.find(".minutes").html(m31 < 10 ? "0" + m31 : m31);
      eventCountC.find(".seconds").html(s31 < 10 ? "0" + s31 : s31);
      eventCountC.find(".miliseconds").html(ms31 < 10 ? "0" + ms31 : ms31);
		
      var spantime32 = (endEventTime2 - currentTime) / 1000;
      var d32 = Math.floor(spantime32 / (24 * 3600));
      var h32 = Math.floor(spantime32 / 3600 - d32 * 24);
      var m32 = Math.floor((spantime32 % 3600) / 60);
      var s32 = Math.floor(spantime32 % 60);
      var ms32 = Math.floor(
        ((endEventTime2 -
            currentTime -
            d32 * (24 * 60 * 60 * 1000) -
            h32 * (60 * 60 * 1000) -
            m32 * (60 * 1000) -
            s32 * 1000) /
          10) %
        100
      );
      console.log(d31 < 0 ? "0" + d31 : d31);
      eventCountD.find(".days").html(d32 < 0 ? "0" + d32 : d32);
      eventCountD.find(".hours").html(h32 < 10 ? "0" + h32 : h32);
      eventCountD.find(".minutes").html(m32 < 10 ? "0" + m32 : m32);
      eventCountD.find(".seconds").html(s32 < 10 ? "0" + s32 : s32);
      eventCountD.find(".miliseconds").html(ms32 < 10 ? "0" + ms32 : ms32);

      $(window).oneTime(100, function () {
        setOpenTime(false);
      });
    } else {
      eventCountC.hide();
      eventCountD.hide();
    }

    //CTAtop1
    (function () {
      var openCTAtop1 = new Date("2021/09/07 00:00:00");
      var clozCTAtop1 = new Date("2021/09/07 23:59:59");

      var openCTAtop2 = new Date("2021/09/08 00:00:00");
      var clozCTAtop2 = new Date("2021/09/12 23:59:59");

      var openCTAtop3 = new Date("2021/09/13 00:00:00");
      var clozCTAtop3 = new Date("2021/09/30 09:59:59");

      //CTAtop1
      if (currentTime >= openCTAtop1 && currentTime <= clozCTAtop1) {
        $(".CTAtop1").show();
        $(".CTAtop2").hide();
      } else if (currentTime >= openCTAtop2 && currentTime <= clozCTAtop2) {
        $(".CTAtop2").show();
        $(".CTAtop1").hide();
      } else if (currentTime >= openCTAtop3 && currentTime <= clozCTAtop3) {
        $(".CTAtop1").show();
        $(".CTAtop2").hide();
      } else {
        $(".CTAtop1").show();
      }
    })();

    //LIVE
    (function () {
	  var openLive01 = new Date("2021/09/01 00:00:00");
      var clozLive01 = new Date("2021/09/09 19:59:59");
		
	  var openLive02 = new Date("2021/09/09 20:00:00");
      var clozLive02 = new Date("2021/09/22 09:59:59");

      //LIVE
      if (currentTime >= openLive01 && currentTime <= clozLive01) {
        $(".CTAlive01").show();
        $(".CTAlive02").hide();
      }if (currentTime >= openLive02 && currentTime <= clozLive02) {
        $(".CTAlive02").show();
        $(".CTAlive01").hide();
      }else {
        $(".CTAlive01").show();
        $(".CTAlive02").hide();
      }
    })();

    //清空購物車
    (function () {
	  var open001 = new Date("2021/09/09 00:00:00");
      var cloz001 = new Date("2021/09/13 13:59:59");
		
	  var open002 = new Date("2021/09/04 14:00:00");
      var cloz002 = new Date("2021/09/30 23:59:59");

      //LIVE
      if (currentTime >= open001 && currentTime <= cloz001) {
        $(".CTA001").show();
      }if (currentTime >= open002 && currentTime <= cloz002) {
        $(".CTA0001").hide();
      }else {
        $(".CTA001").hide();
      }
    })();

    //KV倒數
    (function () {
      var openKV01 = new Date("2021/09/01 10:00:00");
      var clozKV01 = new Date("2021/09/07 11:59:59");
		
      var openKV02 = new Date("2021/09/07 12:00:00");
      var clozKV02 = new Date("2021/09/12 13:59:59");
		
      var openKV03 = new Date("2021/09/13 12:00:00");
      var clozKV03 = new Date("2021/09/22 09:59:59");
		
      if (currentTime > openTime) {
       if (openKV01 <= currentTime  && currentTime <= clozKV01) {
          endEventTime2 = clozKV01;
          $(".timerD .txt").html("99活動開始剩於");
        } 
       else if (openKV02 <= currentTime  && currentTime <= clozKV02) {
          endEventTime2 = clozKV02;
          $(".timerD .txt").html("99購物節倒數");
        }
       else if (openKV03 <= currentTime  && currentTime <= clozKV03) {
          endEventTime2 = clozKV03;
          $(".timerD .txt").html("返場加碼倒數");
        }
      } 
    })();

    //KV倒數Img
    (function () {
      var openKVimg01 = new Date("2021/09/01 10:00:00");
      var clozKVimg01 = new Date("2021/09/07 11:59:59");
		
      var openKVimg02 = new Date("2021/09/07 12:00:00");
      var clozKVimg02 = new Date("2021/09/12 13:59:59");
		
      var openKVimg03 = new Date("2021/09/13 12:00:00");
      var clozKVimg03 = new Date("2021/09/22 13:59:59");

      //KV倒數Img
      if (currentTime >= openKVimg01 && currentTime <= clozKVimg01) {
          $(".Sale61801").show();
          $(".Sale61802,.Sale61803").hide();
      }
	  else if (currentTime >= openKVimg02 && currentTime <= clozKVimg02) {
          $(".Sale61802").show();
          $(".Sale61801,.Sale61803").hide();
      }
	  else if (currentTime >= openKVimg03 && currentTime <= clozKVimg03) {
          $(".Sale61803").show();
          $(".Sale61801,.Sale61802").hide();
      }else{
          $(".Sale61801").show();
          $(".Sale61802,.Sale61803").hide();
	  }
    })();

    //24hr限定秒殺組
    (function () {
      var openONLYtoday1 = new Date("2021/09/07 12:00:00"); //第一套組開賣
      var clozONLYtoday1 = new Date("2021/09/08 11:59:59"); //第一套組結束時間

      var openONLYtoday2 = new Date("2021/09/08 12:00:00");
      var clozONLYtoday2 = new Date("2021/09/09 11:59:59");

      var openONLYtoday3 = new Date("2021/09/09 12:00:00");
      var clozONLYtoday3 = new Date("2021/09/10 11:59:59");

      var openONLYtoday4 = new Date("2021/09/10 12:00:00");
      var clozONLYtoday4 = new Date("2021/09/11 11:59:59");

      var openONLYtoday5 = new Date("2021/09/11 12:00:00");
      var clozONLYtoday5 = new Date("2021/09/12 11:59:59");

      var openONLYtoday6 = new Date("2021/09/12 12:00:00");
      var clozONLYtoday6 = new Date("2021/09/13 13:59:59");
      
      if (currentTime > openTime) {
        if (openTime <= currentTime && currentTime <= openONLYtoday1) {
          endEventTime = clozONLYtoday1;
          $(".timerC .txt").html("開跑到數");
          $(".onlyToday .today1").show();
          $(
            ".onlyToday .today2,.onlyToday .today3,.onlyToday .today4,.onlyToday .today5,.onlyToday .today6"
          ).hide();
          $(".today01").show();
          $(
            ".today02,.today03,.today04,.today05,.today06"
          ).hide();
        } 
        else if (openONLYtoday1 <= currentTime && currentTime <= clozONLYtoday1) {
          endEventTime = clozONLYtoday1;
          $(".timerC .txt").html("剩餘");
          $(".onlyToday .today1").show();
          $(
            ".onlyToday .today2,.onlyToday .today3,.onlyToday .today4,.onlyToday .today5,.onlyToday .today6"
          ).hide();
          $(".today01").show();
          $(
            ".today02,.today03,.today04,.today05,.today06"
          ).hide();
        } else if (
          openONLYtoday2 <= currentTime &&
          currentTime <= clozONLYtoday2
        ) {
          endEventTime = clozONLYtoday2;

          $(".timerC .txt").html("剩餘");
          $(".onlyToday .today2").show();
          $(
            ".onlyToday .today1,.onlyToday .today3,.onlyToday .today4,.onlyToday .today5,.onlyToday .today6"
          ).hide();
          $(".today02").show();
          $(
            ".today01,.today03,.today04,.today05,.today06"
          ).hide();
        } else if (
          openONLYtoday3 <= currentTime &&
          currentTime <= clozONLYtoday3
        ) {
          endEventTime = clozONLYtoday3;

          $(".timerC .txt").html("剩餘");
          $(".onlyToday .today3").show();
          $(
            ".onlyToday .today1,.onlyToday .today2,.onlyToday .today4,.onlyToday .today5,.onlyToday .today6"
          ).hide();
          $(".today03").show();
          $(
            ".today02,.today01,.today04,.today05,.today06"
          ).hide();
        } 
        else if (openONLYtoday4 <= currentTime && currentTime <= clozONLYtoday4) 
        {
          endEventTime = clozONLYtoday4;

          $(".timerC .txt").html("剩餘");
          $(".onlyToday .today4").show();
          $(
            ".onlyToday .today1,.onlyToday .today2,.onlyToday .today3,.onlyToday .today5,.onlyToday .today6"
          ).hide();
          $(".today04").show();
          $(
            ".today02,.today03,.today01,.today05,.today06"
          ).hide();
        } else if (openONLYtoday5 <= currentTime && currentTime <= clozONLYtoday5) 
        {
          endEventTime = clozONLYtoday5;

          $(".timerC .txt").html("剩餘");
          $(".onlyToday .today5").show();
          $(
            ".onlyToday .today1,.onlyToday .today2,.onlyToday .today3,.onlyToday .today4,.onlyToday .today6"
          ).hide();
          $(
            ".Sale24hr01, .Sale24hr02, .Sale24hr03, .Sale24hr04, .Sale24hr06"
          ).hide();
          $(".today05").show();
          $(
            ".today02,.today03,.today04,.today01,.today06"
          ).hide();
        } 
        else if ( openONLYtoday6 <= currentTime && currentTime <= clozONLYtoday6) 
        {
          endEventTime = clozONLYtoday6;
          $(".onlyToday .today6").show();
          $(
            ".onlyToday .today1,.onlyToday .today2,.onlyToday .today3,.onlyToday .today4,.onlyToday .today5"
          ).hide();
          $(".today06").show();
          $(
            ".today02,.today03,.today04,.today05,.today01"
          ).hide();
        }  
        else {
          endEventTime = finalTime;
          $(
            ".onlyToday .today1, .onlyToday .today2,.onlyToday .today3,.onlyToday .today4,.onlyToday .today5,.onlyToday .today6"
          ).hide();
          $(
            ".Sale24hr01, .Sale24hr02, .Sale24hr03, .Sale24hr04, .Sale24hr05, .Sale24hr06"
          ).hide();
          $(".today06").show();
          $(
            ".today02,.today03,.today04,.today05,.today01"
          ).hide();
        }
      } 
      else {
        $(".Sale24hrbg").hide();
        $(".onlyToday [class^='today']").hide();
        $("[class^='Sale24hr']").hide();
      }
    })();
  }
  setOpenTime(true);
});