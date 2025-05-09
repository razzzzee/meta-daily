var CalendarifyLight = (function () {
  "use strict";
  var ml = Object.defineProperty,
      _l = Object.defineProperties;
  var yl = Object.getOwnPropertyDescriptors;
  var Zt = Object.getOwnPropertySymbols;
  var Jn = Object.prototype.hasOwnProperty,
      Qn = Object.prototype.propertyIsEnumerable;
  var Ls = (P, E, l) => (E in P ? ml(P, E, { enumerable: !0, configurable: !0, writable: !0, value: l }) : (P[E] = l)),
      Q = (P, E) => {
          for (var l in E || (E = {})) Jn.call(E, l) && Ls(P, l, E[l]);
          if (Zt) for (var l of Zt(E)) Qn.call(E, l) && Ls(P, l, E[l]);
          return P;
      },
      Je = (P, E) => _l(P, yl(E));
  var Xn = (P, E) => {
      var l = {};
      for (var B in P) Jn.call(P, B) && E.indexOf(B) < 0 && (l[B] = P[B]);
      if (P != null && Zt) for (var B of Zt(P)) E.indexOf(B) < 0 && Qn.call(P, B) && (l[B] = P[B]);
      return l;
  };
  var p = (P, E, l) => (Ls(P, typeof E != "symbol" ? E + "" : E, l), l);
  var Ce = (P, E, l) =>
      new Promise((B, j) => {
          var ye = (F) => {
                  try {
                      Ee(l.next(F));
                  } catch (q) {
                      j(q);
                  }
              },
              D = (F) => {
                  try {
                      Ee(l.throw(F));
                  } catch (q) {
                      j(q);
                  }
              },
              Ee = (F) => (F.done ? B(F.value) : Promise.resolve(F.value).then(ye, D));
          Ee((l = l.apply(P, E)).next());
      });
  const P = ""; //! moment.js
  //! version : 2.29.4
  //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
  //! license : MIT
  //! momentjs.com
  var E;
  function l() {
      return E.apply(null, arguments);
  }
  function B(e) {
      E = e;
  }
  function j(e) {
      return e instanceof Array || Object.prototype.toString.call(e) === "[object Array]";
  }
  function ye(e) {
      return e != null && Object.prototype.toString.call(e) === "[object Object]";
  }
  function D(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
  }
  function Ee(e) {
      if (Object.getOwnPropertyNames) return Object.getOwnPropertyNames(e).length === 0;
      var t;
      for (t in e) if (D(e, t)) return !1;
      return !0;
  }
  function F(e) {
      return e === void 0;
  }
  function q(e) {
      return typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]";
  }
  function Qe(e) {
      return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
  }
  function Ps(e, t) {
      var s = [],
          n,
          r = e.length;
      for (n = 0; n < r; ++n) s.push(t(e[n], n));
      return s;
  }
  function Se(e, t) {
      for (var s in t) D(t, s) && (e[s] = t[s]);
      return D(t, "toString") && (e.toString = t.toString), D(t, "valueOf") && (e.valueOf = t.valueOf), e;
  }
  function ue(e, t, s, n) {
      return ln(e, t, s, n, !0).utc();
  }
  function Kn() {
      return {
          empty: !1,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: !1,
          invalidEra: null,
          invalidMonth: null,
          invalidFormat: !1,
          userInvalidated: !1,
          iso: !1,
          parsedDateParts: [],
          era: null,
          meridiem: null,
          rfc2822: !1,
          weekdayMismatch: !1,
      };
  }
  function g(e) {
      return e._pf == null && (e._pf = Kn()), e._pf;
  }
  var Jt;
  Array.prototype.some
      ? (Jt = Array.prototype.some)
      : (Jt = function (e) {
            var t = Object(this),
                s = t.length >>> 0,
                n;
            for (n = 0; n < s; n++) if (n in t && e.call(this, t[n], n, t)) return !0;
            return !1;
        });
  function Qt(e) {
      if (e._isValid == null) {
          var t = g(e),
              s = Jt.call(t.parsedDateParts, function (r) {
                  return r != null;
              }),
              n =
                  !isNaN(e._d.getTime()) &&
                  t.overflow < 0 &&
                  !t.empty &&
                  !t.invalidEra &&
                  !t.invalidMonth &&
                  !t.invalidWeekday &&
                  !t.weekdayMismatch &&
                  !t.nullInput &&
                  !t.invalidFormat &&
                  !t.userInvalidated &&
                  (!t.meridiem || (t.meridiem && s));
          if ((e._strict && (n = n && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === void 0), Object.isFrozen == null || !Object.isFrozen(e))) e._isValid = n;
          else return n;
      }
      return e._isValid;
  }
  function pt(e) {
      var t = ue(NaN);
      return e != null ? Se(g(t), e) : (g(t).userInvalidated = !0), t;
  }
  var Fs = (l.momentProperties = []),
      Xt = !1;
  function Kt(e, t) {
      var s,
          n,
          r,
          a = Fs.length;
      if (
          (F(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
          F(t._i) || (e._i = t._i),
          F(t._f) || (e._f = t._f),
          F(t._l) || (e._l = t._l),
          F(t._strict) || (e._strict = t._strict),
          F(t._tzm) || (e._tzm = t._tzm),
          F(t._isUTC) || (e._isUTC = t._isUTC),
          F(t._offset) || (e._offset = t._offset),
          F(t._pf) || (e._pf = g(t)),
          F(t._locale) || (e._locale = t._locale),
          a > 0)
      )
          for (s = 0; s < a; s++) (n = Fs[s]), (r = t[n]), F(r) || (e[n] = r);
      return e;
  }
  function Xe(e) {
      Kt(this, e), (this._d = new Date(e._d != null ? e._d.getTime() : NaN)), this.isValid() || (this._d = new Date(NaN)), Xt === !1 && ((Xt = !0), l.updateOffset(this), (Xt = !1));
  }
  function re(e) {
      return e instanceof Xe || (e != null && e._isAMomentObject != null);
  }
  function Ns(e) {
      l.suppressDeprecationWarnings === !1 && typeof console != "undefined" && console.warn && console.warn("Deprecation warning: " + e);
  }
  function X(e, t) {
      var s = !0;
      return Se(function () {
          if ((l.deprecationHandler != null && l.deprecationHandler(null, e), s)) {
              var n = [],
                  r,
                  a,
                  i,
                  o = arguments.length;
              for (a = 0; a < o; a++) {
                  if (((r = ""), typeof arguments[a] == "object")) {
                      r +=
                          `
[` +
                          a +
                          "] ";
                      for (i in arguments[0]) D(arguments[0], i) && (r += i + ": " + arguments[0][i] + ", ");
                      r = r.slice(0, -2);
                  } else r = arguments[a];
                  n.push(r);
              }
              Ns(
                  e +
                      `
Arguments: ` +
                      Array.prototype.slice.call(n).join("") +
                      `
` +
                      new Error().stack
              ),
                  (s = !1);
          }
          return t.apply(this, arguments);
      }, t);
  }
  var Cs = {};
  function As(e, t) {
      l.deprecationHandler != null && l.deprecationHandler(e, t), Cs[e] || (Ns(t), (Cs[e] = !0));
  }
  (l.suppressDeprecationWarnings = !1), (l.deprecationHandler = null);
  function he(e) {
      return (typeof Function != "undefined" && e instanceof Function) || Object.prototype.toString.call(e) === "[object Function]";
  }
  function er(e) {
      var t, s;
      for (s in e) D(e, s) && ((t = e[s]), he(t) ? (this[s] = t) : (this["_" + s] = t));
      (this._config = e), (this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source));
  }
  function es(e, t) {
      var s = Se({}, e),
          n;
      for (n in t) D(t, n) && (ye(e[n]) && ye(t[n]) ? ((s[n] = {}), Se(s[n], e[n]), Se(s[n], t[n])) : t[n] != null ? (s[n] = t[n]) : delete s[n]);
      for (n in e) D(e, n) && !D(t, n) && ye(e[n]) && (s[n] = Se({}, s[n]));
      return s;
  }
  function ts(e) {
      e != null && this.set(e);
  }
  var ss;
  Object.keys
      ? (ss = Object.keys)
      : (ss = function (e) {
            var t,
                s = [];
            for (t in e) D(e, t) && s.push(t);
            return s;
        });
  var tr = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" };
  function sr(e, t, s) {
      var n = this._calendar[e] || this._calendar.sameElse;
      return he(n) ? n.call(t, s) : n;
  }
  function de(e, t, s) {
      var n = "" + Math.abs(e),
          r = t - n.length,
          a = e >= 0;
      return (a ? (s ? "+" : "") : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + n;
  }
  var ns = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
      wt = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
      rs = {},
      Ae = {};
  function y(e, t, s, n) {
      var r = n;
      typeof n == "string" &&
          (r = function () {
              return this[n]();
          }),
          e && (Ae[e] = r),
          t &&
              (Ae[t[0]] = function () {
                  return de(r.apply(this, arguments), t[1], t[2]);
              }),
          s &&
              (Ae[s] = function () {
                  return this.localeData().ordinal(r.apply(this, arguments), e);
              });
  }
  function nr(e) {
      return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
  }
  function rr(e) {
      var t = e.match(ns),
          s,
          n;
      for (s = 0, n = t.length; s < n; s++) Ae[t[s]] ? (t[s] = Ae[t[s]]) : (t[s] = nr(t[s]));
      return function (r) {
          var a = "",
              i;
          for (i = 0; i < n; i++) a += he(t[i]) ? t[i].call(r, e) : t[i];
          return a;
      };
  }
  function gt(e, t) {
      return e.isValid() ? ((t = Is(t, e.localeData())), (rs[t] = rs[t] || rr(t)), rs[t](e)) : e.localeData().invalidDate();
  }
  function Is(e, t) {
      var s = 5;
      function n(r) {
          return t.longDateFormat(r) || r;
      }
      for (wt.lastIndex = 0; s >= 0 && wt.test(e); ) (e = e.replace(wt, n)), (wt.lastIndex = 0), (s -= 1);
      return e;
  }
  var ar = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
  function ir(e) {
      var t = this._longDateFormat[e],
          s = this._longDateFormat[e.toUpperCase()];
      return t || !s
          ? t
          : ((this._longDateFormat[e] = s
                .match(ns)
                .map(function (n) {
                    return n === "MMMM" || n === "MM" || n === "DD" || n === "dddd" ? n.slice(1) : n;
                })
                .join("")),
            this._longDateFormat[e]);
  }
  var or = "Invalid date";
  function lr() {
      return this._invalidDate;
  }
  var ur = "%d",
      hr = /\d{1,2}/;
  function dr(e) {
      return this._ordinal.replace("%d", e);
  }
  var cr = {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      w: "a week",
      ww: "%d weeks",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
  };
  function fr(e, t, s, n) {
      var r = this._relativeTime[s];
      return he(r) ? r(e, t, s, n) : r.replace(/%d/i, e);
  }
  function mr(e, t) {
      var s = this._relativeTime[e > 0 ? "future" : "past"];
      return he(s) ? s(t) : s.replace(/%s/i, t);
  }
  var Ke = {};
  function H(e, t) {
      var s = e.toLowerCase();
      Ke[s] = Ke[s + "s"] = Ke[t] = e;
  }
  function K(e) {
      return typeof e == "string" ? Ke[e] || Ke[e.toLowerCase()] : void 0;
  }
  function as(e) {
      var t = {},
          s,
          n;
      for (n in e) D(e, n) && ((s = K(n)), s && (t[s] = e[n]));
      return t;
  }
  var Hs = {};
  function U(e, t) {
      Hs[e] = t;
  }
  function _r(e) {
      var t = [],
          s;
      for (s in e) D(e, s) && t.push({ unit: s, priority: Hs[s] });
      return (
          t.sort(function (n, r) {
              return n.priority - r.priority;
          }),
          t
      );
  }
  function vt(e) {
      return (e % 4 === 0 && e % 100 !== 0) || e % 400 === 0;
  }
  function ee(e) {
      return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
  }
  function v(e) {
      var t = +e,
          s = 0;
      return t !== 0 && isFinite(t) && (s = ee(t)), s;
  }
  function Ie(e, t) {
      return function (s) {
          return s != null ? (Us(this, e, s), l.updateOffset(this, t), this) : kt(this, e);
      };
  }
  function kt(e, t) {
      return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
  }
  function Us(e, t, s) {
      e.isValid() &&
          !isNaN(s) &&
          (t === "FullYear" && vt(e.year()) && e.month() === 1 && e.date() === 29 ? ((s = v(s)), e._d["set" + (e._isUTC ? "UTC" : "") + t](s, e.month(), Ot(s, e.month()))) : e._d["set" + (e._isUTC ? "UTC" : "") + t](s));
  }
  function yr(e) {
      return (e = K(e)), he(this[e]) ? this[e]() : this;
  }
  function pr(e, t) {
      if (typeof e == "object") {
          e = as(e);
          var s = _r(e),
              n,
              r = s.length;
          for (n = 0; n < r; n++) this[s[n].unit](e[s[n].unit]);
      } else if (((e = K(e)), he(this[e]))) return this[e](t);
      return this;
  }
  var $s = /\d/,
      z = /\d\d/,
      Vs = /\d{3}/,
      is = /\d{4}/,
      Dt = /[+-]?\d{6}/,
      O = /\d\d?/,
      Gs = /\d\d\d\d?/,
      js = /\d\d\d\d\d\d?/,
      Mt = /\d{1,3}/,
      os = /\d{1,4}/,
      St = /[+-]?\d{1,6}/,
      He = /\d+/,
      Yt = /[+-]?\d+/,
      wr = /Z|[+-]\d\d:?\d\d/gi,
      bt = /Z|[+-]\d\d(?::?\d\d)?/gi,
      gr = /[+-]?\d+(\.\d{1,3})?/,
      et = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
      xt;
  xt = {};
  function f(e, t, s) {
      xt[e] = he(t)
          ? t
          : function (n, r) {
                return n && s ? s : t;
            };
  }
  function vr(e, t) {
      return D(xt, e) ? xt[e](t._strict, t._locale) : new RegExp(kr(e));
  }
  function kr(e) {
      return Z(
          e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, s, n, r, a) {
              return s || n || r || a;
          })
      );
  }
  function Z(e) {
      return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  var ls = {};
  function b(e, t) {
      var s,
          n = t,
          r;
      for (
          typeof e == "string" && (e = [e]),
              q(t) &&
                  (n = function (a, i) {
                      i[t] = v(a);
                  }),
              r = e.length,
              s = 0;
          s < r;
          s++
      )
          ls[e[s]] = n;
  }
  function tt(e, t) {
      b(e, function (s, n, r, a) {
          (r._w = r._w || {}), t(s, r._w, r, a);
      });
  }
  function Dr(e, t, s) {
      t != null && D(ls, e) && ls[e](t, s._a, s, e);
  }
  var $ = 0,
      pe = 1,
      ce = 2,
      A = 3,
      ae = 4,
      we = 5,
      We = 6,
      Mr = 7,
      Sr = 8;
  function Yr(e, t) {
      return ((e % t) + t) % t;
  }
  var C;
  Array.prototype.indexOf
      ? (C = Array.prototype.indexOf)
      : (C = function (e) {
            var t;
            for (t = 0; t < this.length; ++t) if (this[t] === e) return t;
            return -1;
        });
  function Ot(e, t) {
      if (isNaN(e) || isNaN(t)) return NaN;
      var s = Yr(t, 12);
      return (e += (t - s) / 12), s === 1 ? (vt(e) ? 29 : 28) : 31 - ((s % 7) % 2);
  }
  y("M", ["MM", 2], "Mo", function () {
      return this.month() + 1;
  }),
      y("MMM", 0, 0, function (e) {
          return this.localeData().monthsShort(this, e);
      }),
      y("MMMM", 0, 0, function (e) {
          return this.localeData().months(this, e);
      }),
      H("month", "M"),
      U("month", 8),
      f("M", O),
      f("MM", O, z),
      f("MMM", function (e, t) {
          return t.monthsShortRegex(e);
      }),
      f("MMMM", function (e, t) {
          return t.monthsRegex(e);
      }),
      b(["M", "MM"], function (e, t) {
          t[pe] = v(e) - 1;
      }),
      b(["MMM", "MMMM"], function (e, t, s, n) {
          var r = s._locale.monthsParse(e, n, s._strict);
          r != null ? (t[pe] = r) : (g(s).invalidMonth = e);
      });
  var br = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      Bs = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      qs = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
      xr = et,
      Or = et;
  function Tr(e, t) {
      return e ? (j(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || qs).test(t) ? "format" : "standalone"][e.month()]) : j(this._months) ? this._months : this._months.standalone;
  }
  function Rr(e, t) {
      return e ? (j(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[qs.test(t) ? "format" : "standalone"][e.month()]) : j(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
  }
  function Er(e, t, s) {
      var n,
          r,
          a,
          i = e.toLocaleLowerCase();
      if (!this._monthsParse)
          for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n)
              (a = ue([2e3, n])), (this._shortMonthsParse[n] = this.monthsShort(a, "").toLocaleLowerCase()), (this._longMonthsParse[n] = this.months(a, "").toLocaleLowerCase());
      return s
          ? t === "MMM"
              ? ((r = C.call(this._shortMonthsParse, i)), r !== -1 ? r : null)
              : ((r = C.call(this._longMonthsParse, i)), r !== -1 ? r : null)
          : t === "MMM"
          ? ((r = C.call(this._shortMonthsParse, i)), r !== -1 ? r : ((r = C.call(this._longMonthsParse, i)), r !== -1 ? r : null))
          : ((r = C.call(this._longMonthsParse, i)), r !== -1 ? r : ((r = C.call(this._shortMonthsParse, i)), r !== -1 ? r : null));
  }
  function Wr(e, t, s) {
      var n, r, a;
      if (this._monthsParseExact) return Er.call(this, e, t, s);
      for (this._monthsParse || ((this._monthsParse = []), (this._longMonthsParse = []), (this._shortMonthsParse = [])), n = 0; n < 12; n++) {
          if (
              ((r = ue([2e3, n])),
              s &&
                  !this._longMonthsParse[n] &&
                  ((this._longMonthsParse[n] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i")), (this._shortMonthsParse[n] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i"))),
              !s && !this._monthsParse[n] && ((a = "^" + this.months(r, "") + "|^" + this.monthsShort(r, "")), (this._monthsParse[n] = new RegExp(a.replace(".", ""), "i"))),
              s && t === "MMMM" && this._longMonthsParse[n].test(e))
          )
              return n;
          if (s && t === "MMM" && this._shortMonthsParse[n].test(e)) return n;
          if (!s && this._monthsParse[n].test(e)) return n;
      }
  }
  function zs(e, t) {
      var s;
      if (!e.isValid()) return e;
      if (typeof t == "string") {
          if (/^\d+$/.test(t)) t = v(t);
          else if (((t = e.localeData().monthsParse(t)), !q(t))) return e;
      }
      return (s = Math.min(e.date(), Ot(e.year(), t))), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, s), e;
  }
  function Zs(e) {
      return e != null ? (zs(this, e), l.updateOffset(this, !0), this) : kt(this, "Month");
  }
  function Lr() {
      return Ot(this.year(), this.month());
  }
  function Pr(e) {
      return this._monthsParseExact
          ? (D(this, "_monthsRegex") || Js.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex)
          : (D(this, "_monthsShortRegex") || (this._monthsShortRegex = xr), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex);
  }
  function Fr(e) {
      return this._monthsParseExact
          ? (D(this, "_monthsRegex") || Js.call(this), e ? this._monthsStrictRegex : this._monthsRegex)
          : (D(this, "_monthsRegex") || (this._monthsRegex = Or), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex);
  }
  function Js() {
      function e(i, o) {
          return o.length - i.length;
      }
      var t = [],
          s = [],
          n = [],
          r,
          a;
      for (r = 0; r < 12; r++) (a = ue([2e3, r])), t.push(this.monthsShort(a, "")), s.push(this.months(a, "")), n.push(this.months(a, "")), n.push(this.monthsShort(a, ""));
      for (t.sort(e), s.sort(e), n.sort(e), r = 0; r < 12; r++) (t[r] = Z(t[r])), (s[r] = Z(s[r]));
      for (r = 0; r < 24; r++) n[r] = Z(n[r]);
      (this._monthsRegex = new RegExp("^(" + n.join("|") + ")", "i")),
          (this._monthsShortRegex = this._monthsRegex),
          (this._monthsStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")),
          (this._monthsShortStrictRegex = new RegExp("^(" + t.join("|") + ")", "i"));
  }
  y("Y", 0, 0, function () {
      var e = this.year();
      return e <= 9999 ? de(e, 4) : "+" + e;
  }),
      y(0, ["YY", 2], 0, function () {
          return this.year() % 100;
      }),
      y(0, ["YYYY", 4], 0, "year"),
      y(0, ["YYYYY", 5], 0, "year"),
      y(0, ["YYYYYY", 6, !0], 0, "year"),
      H("year", "y"),
      U("year", 1),
      f("Y", Yt),
      f("YY", O, z),
      f("YYYY", os, is),
      f("YYYYY", St, Dt),
      f("YYYYYY", St, Dt),
      b(["YYYYY", "YYYYYY"], $),
      b("YYYY", function (e, t) {
          t[$] = e.length === 2 ? l.parseTwoDigitYear(e) : v(e);
      }),
      b("YY", function (e, t) {
          t[$] = l.parseTwoDigitYear(e);
      }),
      b("Y", function (e, t) {
          t[$] = parseInt(e, 10);
      });
  function st(e) {
      return vt(e) ? 366 : 365;
  }
  l.parseTwoDigitYear = function (e) {
      return v(e) + (v(e) > 68 ? 1900 : 2e3);
  };
  var Qs = Ie("FullYear", !0);
  function Nr() {
      return vt(this.year());
  }
  function Cr(e, t, s, n, r, a, i) {
      var o;
      return e < 100 && e >= 0 ? ((o = new Date(e + 400, t, s, n, r, a, i)), isFinite(o.getFullYear()) && o.setFullYear(e)) : (o = new Date(e, t, s, n, r, a, i)), o;
  }
  function nt(e) {
      var t, s;
      return (
          e < 100 && e >= 0 ? ((s = Array.prototype.slice.call(arguments)), (s[0] = e + 400), (t = new Date(Date.UTC.apply(null, s))), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : (t = new Date(Date.UTC.apply(null, arguments))),
          t
      );
  }
  function Tt(e, t, s) {
      var n = 7 + t - s,
          r = (7 + nt(e, 0, n).getUTCDay() - t) % 7;
      return -r + n - 1;
  }
  function Xs(e, t, s, n, r) {
      var a = (7 + s - n) % 7,
          i = Tt(e, n, r),
          o = 1 + 7 * (t - 1) + a + i,
          u,
          d;
      return o <= 0 ? ((u = e - 1), (d = st(u) + o)) : o > st(e) ? ((u = e + 1), (d = o - st(e))) : ((u = e), (d = o)), { year: u, dayOfYear: d };
  }
  function rt(e, t, s) {
      var n = Tt(e.year(), t, s),
          r = Math.floor((e.dayOfYear() - n - 1) / 7) + 1,
          a,
          i;
      return r < 1 ? ((i = e.year() - 1), (a = r + ge(i, t, s))) : r > ge(e.year(), t, s) ? ((a = r - ge(e.year(), t, s)), (i = e.year() + 1)) : ((i = e.year()), (a = r)), { week: a, year: i };
  }
  function ge(e, t, s) {
      var n = Tt(e, t, s),
          r = Tt(e + 1, t, s);
      return (st(e) - n + r) / 7;
  }
  y("w", ["ww", 2], "wo", "week"),
      y("W", ["WW", 2], "Wo", "isoWeek"),
      H("week", "w"),
      H("isoWeek", "W"),
      U("week", 5),
      U("isoWeek", 5),
      f("w", O),
      f("ww", O, z),
      f("W", O),
      f("WW", O, z),
      tt(["w", "ww", "W", "WW"], function (e, t, s, n) {
          t[n.substr(0, 1)] = v(e);
      });
  function Ar(e) {
      return rt(e, this._week.dow, this._week.doy).week;
  }
  var Ir = { dow: 0, doy: 6 };
  function Hr() {
      return this._week.dow;
  }
  function Ur() {
      return this._week.doy;
  }
  function $r(e) {
      var t = this.localeData().week(this);
      return e == null ? t : this.add((e - t) * 7, "d");
  }
  function Vr(e) {
      var t = rt(this, 1, 4).week;
      return e == null ? t : this.add((e - t) * 7, "d");
  }
  y("d", 0, "do", "day"),
      y("dd", 0, 0, function (e) {
          return this.localeData().weekdaysMin(this, e);
      }),
      y("ddd", 0, 0, function (e) {
          return this.localeData().weekdaysShort(this, e);
      }),
      y("dddd", 0, 0, function (e) {
          return this.localeData().weekdays(this, e);
      }),
      y("e", 0, 0, "weekday"),
      y("E", 0, 0, "isoWeekday"),
      H("day", "d"),
      H("weekday", "e"),
      H("isoWeekday", "E"),
      U("day", 11),
      U("weekday", 11),
      U("isoWeekday", 11),
      f("d", O),
      f("e", O),
      f("E", O),
      f("dd", function (e, t) {
          return t.weekdaysMinRegex(e);
      }),
      f("ddd", function (e, t) {
          return t.weekdaysShortRegex(e);
      }),
      f("dddd", function (e, t) {
          return t.weekdaysRegex(e);
      }),
      tt(["dd", "ddd", "dddd"], function (e, t, s, n) {
          var r = s._locale.weekdaysParse(e, n, s._strict);
          r != null ? (t.d = r) : (g(s).invalidWeekday = e);
      }),
      tt(["d", "e", "E"], function (e, t, s, n) {
          t[n] = v(e);
      });
  function Gr(e, t) {
      return typeof e != "string" ? e : isNaN(e) ? ((e = t.weekdaysParse(e)), typeof e == "number" ? e : null) : parseInt(e, 10);
  }
  function jr(e, t) {
      return typeof e == "string" ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
  }
  function us(e, t) {
      return e.slice(t, 7).concat(e.slice(0, t));
  }
  var Br = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      Ks = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      qr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      zr = et,
      Zr = et,
      Jr = et;
  function Qr(e, t) {
      var s = j(this._weekdays) ? this._weekdays : this._weekdays[e && e !== !0 && this._weekdays.isFormat.test(t) ? "format" : "standalone"];
      return e === !0 ? us(s, this._week.dow) : e ? s[e.day()] : s;
  }
  function Xr(e) {
      return e === !0 ? us(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
  }
  function Kr(e) {
      return e === !0 ? us(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
  }
  function ea(e, t, s) {
      var n,
          r,
          a,
          i = e.toLocaleLowerCase();
      if (!this._weekdaysParse)
          for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n)
              (a = ue([2e3, 1]).day(n)),
                  (this._minWeekdaysParse[n] = this.weekdaysMin(a, "").toLocaleLowerCase()),
                  (this._shortWeekdaysParse[n] = this.weekdaysShort(a, "").toLocaleLowerCase()),
                  (this._weekdaysParse[n] = this.weekdays(a, "").toLocaleLowerCase());
      return s
          ? t === "dddd"
              ? ((r = C.call(this._weekdaysParse, i)), r !== -1 ? r : null)
              : t === "ddd"
              ? ((r = C.call(this._shortWeekdaysParse, i)), r !== -1 ? r : null)
              : ((r = C.call(this._minWeekdaysParse, i)), r !== -1 ? r : null)
          : t === "dddd"
          ? ((r = C.call(this._weekdaysParse, i)), r !== -1 || ((r = C.call(this._shortWeekdaysParse, i)), r !== -1) ? r : ((r = C.call(this._minWeekdaysParse, i)), r !== -1 ? r : null))
          : t === "ddd"
          ? ((r = C.call(this._shortWeekdaysParse, i)), r !== -1 || ((r = C.call(this._weekdaysParse, i)), r !== -1) ? r : ((r = C.call(this._minWeekdaysParse, i)), r !== -1 ? r : null))
          : ((r = C.call(this._minWeekdaysParse, i)), r !== -1 || ((r = C.call(this._weekdaysParse, i)), r !== -1) ? r : ((r = C.call(this._shortWeekdaysParse, i)), r !== -1 ? r : null));
  }
  function ta(e, t, s) {
      var n, r, a;
      if (this._weekdaysParseExact) return ea.call(this, e, t, s);
      for (this._weekdaysParse || ((this._weekdaysParse = []), (this._minWeekdaysParse = []), (this._shortWeekdaysParse = []), (this._fullWeekdaysParse = [])), n = 0; n < 7; n++) {
          if (
              ((r = ue([2e3, 1]).day(n)),
              s &&
                  !this._fullWeekdaysParse[n] &&
                  ((this._fullWeekdaysParse[n] = new RegExp("^" + this.weekdays(r, "").replace(".", "\\.?") + "$", "i")),
                  (this._shortWeekdaysParse[n] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", "\\.?") + "$", "i")),
                  (this._minWeekdaysParse[n] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", "\\.?") + "$", "i"))),
              this._weekdaysParse[n] || ((a = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, "")), (this._weekdaysParse[n] = new RegExp(a.replace(".", ""), "i"))),
              s && t === "dddd" && this._fullWeekdaysParse[n].test(e))
          )
              return n;
          if (s && t === "ddd" && this._shortWeekdaysParse[n].test(e)) return n;
          if (s && t === "dd" && this._minWeekdaysParse[n].test(e)) return n;
          if (!s && this._weekdaysParse[n].test(e)) return n;
      }
  }
  function sa(e) {
      if (!this.isValid()) return e != null ? this : NaN;
      var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
      return e != null ? ((e = Gr(e, this.localeData())), this.add(e - t, "d")) : t;
  }
  function na(e) {
      if (!this.isValid()) return e != null ? this : NaN;
      var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return e == null ? t : this.add(e - t, "d");
  }
  function ra(e) {
      if (!this.isValid()) return e != null ? this : NaN;
      if (e != null) {
          var t = jr(e, this.localeData());
          return this.day(this.day() % 7 ? t : t - 7);
      } else return this.day() || 7;
  }
  function aa(e) {
      return this._weekdaysParseExact
          ? (D(this, "_weekdaysRegex") || hs.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex)
          : (D(this, "_weekdaysRegex") || (this._weekdaysRegex = zr), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex);
  }
  function ia(e) {
      return this._weekdaysParseExact
          ? (D(this, "_weekdaysRegex") || hs.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
          : (D(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Zr), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
  }
  function oa(e) {
      return this._weekdaysParseExact
          ? (D(this, "_weekdaysRegex") || hs.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
          : (D(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Jr), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
  }
  function hs() {
      function e(_, c) {
          return c.length - _.length;
      }
      var t = [],
          s = [],
          n = [],
          r = [],
          a,
          i,
          o,
          u,
          d;
      for (a = 0; a < 7; a++) (i = ue([2e3, 1]).day(a)), (o = Z(this.weekdaysMin(i, ""))), (u = Z(this.weekdaysShort(i, ""))), (d = Z(this.weekdays(i, ""))), t.push(o), s.push(u), n.push(d), r.push(o), r.push(u), r.push(d);
      t.sort(e),
          s.sort(e),
          n.sort(e),
          r.sort(e),
          (this._weekdaysRegex = new RegExp("^(" + r.join("|") + ")", "i")),
          (this._weekdaysShortRegex = this._weekdaysRegex),
          (this._weekdaysMinRegex = this._weekdaysRegex),
          (this._weekdaysStrictRegex = new RegExp("^(" + n.join("|") + ")", "i")),
          (this._weekdaysShortStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")),
          (this._weekdaysMinStrictRegex = new RegExp("^(" + t.join("|") + ")", "i"));
  }
  function ds() {
      return this.hours() % 12 || 12;
  }
  function la() {
      return this.hours() || 24;
  }
  y("H", ["HH", 2], 0, "hour"),
      y("h", ["hh", 2], 0, ds),
      y("k", ["kk", 2], 0, la),
      y("hmm", 0, 0, function () {
          return "" + ds.apply(this) + de(this.minutes(), 2);
      }),
      y("hmmss", 0, 0, function () {
          return "" + ds.apply(this) + de(this.minutes(), 2) + de(this.seconds(), 2);
      }),
      y("Hmm", 0, 0, function () {
          return "" + this.hours() + de(this.minutes(), 2);
      }),
      y("Hmmss", 0, 0, function () {
          return "" + this.hours() + de(this.minutes(), 2) + de(this.seconds(), 2);
      });
  function en(e, t) {
      y(e, 0, 0, function () {
          return this.localeData().meridiem(this.hours(), this.minutes(), t);
      });
  }
  en("a", !0), en("A", !1), H("hour", "h"), U("hour", 13);
  function tn(e, t) {
      return t._meridiemParse;
  }
  f("a", tn),
      f("A", tn),
      f("H", O),
      f("h", O),
      f("k", O),
      f("HH", O, z),
      f("hh", O, z),
      f("kk", O, z),
      f("hmm", Gs),
      f("hmmss", js),
      f("Hmm", Gs),
      f("Hmmss", js),
      b(["H", "HH"], A),
      b(["k", "kk"], function (e, t, s) {
          var n = v(e);
          t[A] = n === 24 ? 0 : n;
      }),
      b(["a", "A"], function (e, t, s) {
          (s._isPm = s._locale.isPM(e)), (s._meridiem = e);
      }),
      b(["h", "hh"], function (e, t, s) {
          (t[A] = v(e)), (g(s).bigHour = !0);
      }),
      b("hmm", function (e, t, s) {
          var n = e.length - 2;
          (t[A] = v(e.substr(0, n))), (t[ae] = v(e.substr(n))), (g(s).bigHour = !0);
      }),
      b("hmmss", function (e, t, s) {
          var n = e.length - 4,
              r = e.length - 2;
          (t[A] = v(e.substr(0, n))), (t[ae] = v(e.substr(n, 2))), (t[we] = v(e.substr(r))), (g(s).bigHour = !0);
      }),
      b("Hmm", function (e, t, s) {
          var n = e.length - 2;
          (t[A] = v(e.substr(0, n))), (t[ae] = v(e.substr(n)));
      }),
      b("Hmmss", function (e, t, s) {
          var n = e.length - 4,
              r = e.length - 2;
          (t[A] = v(e.substr(0, n))), (t[ae] = v(e.substr(n, 2))), (t[we] = v(e.substr(r)));
      });
  function ua(e) {
      return (e + "").toLowerCase().charAt(0) === "p";
  }
  var ha = /[ap]\.?m?\.?/i,
      da = Ie("Hours", !0);
  function ca(e, t, s) {
      return e > 11 ? (s ? "pm" : "PM") : s ? "am" : "AM";
  }
  var sn = { calendar: tr, longDateFormat: ar, invalidDate: or, ordinal: ur, dayOfMonthOrdinalParse: hr, relativeTime: cr, months: br, monthsShort: Bs, week: Ir, weekdays: Br, weekdaysMin: qr, weekdaysShort: Ks, meridiemParse: ha },
      W = {},
      at = {},
      it;
  function fa(e, t) {
      var s,
          n = Math.min(e.length, t.length);
      for (s = 0; s < n; s += 1) if (e[s] !== t[s]) return s;
      return n;
  }
  function nn(e) {
      return e && e.toLowerCase().replace("_", "-");
  }
  function ma(e) {
      for (var t = 0, s, n, r, a; t < e.length; ) {
          for (a = nn(e[t]).split("-"), s = a.length, n = nn(e[t + 1]), n = n ? n.split("-") : null; s > 0; ) {
              if (((r = Rt(a.slice(0, s).join("-"))), r)) return r;
              if (n && n.length >= s && fa(a, n) >= s - 1) break;
              s--;
          }
          t++;
      }
      return it;
  }
  function _a(e) {
      return e.match("^[^/\\\\]*$") != null;
  }
  function Rt(e) {
      var t = null,
          s;
      if (W[e] === void 0 && typeof module != "undefined" && module && module.exports && _a(e))
          try {
              (t = it._abbr), (s = require), s("./locale/" + e), Ye(t);
          } catch (n) {
              W[e] = null;
          }
      return W[e];
  }
  function Ye(e, t) {
      var s;
      return e && (F(t) ? (s = ve(e)) : (s = cs(e, t)), s ? (it = s) : typeof console != "undefined" && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), it._abbr;
  }
  function cs(e, t) {
      if (t !== null) {
          var s,
              n = sn;
          if (((t.abbr = e), W[e] != null))
              As(
                  "defineLocaleOverride",
                  "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
              ),
                  (n = W[e]._config);
          else if (t.parentLocale != null)
              if (W[t.parentLocale] != null) n = W[t.parentLocale]._config;
              else if (((s = Rt(t.parentLocale)), s != null)) n = s._config;
              else return at[t.parentLocale] || (at[t.parentLocale] = []), at[t.parentLocale].push({ name: e, config: t }), null;
          return (
              (W[e] = new ts(es(n, t))),
              at[e] &&
                  at[e].forEach(function (r) {
                      cs(r.name, r.config);
                  }),
              Ye(e),
              W[e]
          );
      } else return delete W[e], null;
  }
  function ya(e, t) {
      if (t != null) {
          var s,
              n,
              r = sn;
          W[e] != null && W[e].parentLocale != null ? W[e].set(es(W[e]._config, t)) : ((n = Rt(e)), n != null && (r = n._config), (t = es(r, t)), n == null && (t.abbr = e), (s = new ts(t)), (s.parentLocale = W[e]), (W[e] = s)), Ye(e);
      } else W[e] != null && (W[e].parentLocale != null ? ((W[e] = W[e].parentLocale), e === Ye() && Ye(e)) : W[e] != null && delete W[e]);
      return W[e];
  }
  function ve(e) {
      var t;
      if ((e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)) return it;
      if (!j(e)) {
          if (((t = Rt(e)), t)) return t;
          e = [e];
      }
      return ma(e);
  }
  function pa() {
      return ss(W);
  }
  function fs(e) {
      var t,
          s = e._a;
      return (
          s &&
              g(e).overflow === -2 &&
              ((t =
                  s[pe] < 0 || s[pe] > 11
                      ? pe
                      : s[ce] < 1 || s[ce] > Ot(s[$], s[pe])
                      ? ce
                      : s[A] < 0 || s[A] > 24 || (s[A] === 24 && (s[ae] !== 0 || s[we] !== 0 || s[We] !== 0))
                      ? A
                      : s[ae] < 0 || s[ae] > 59
                      ? ae
                      : s[we] < 0 || s[we] > 59
                      ? we
                      : s[We] < 0 || s[We] > 999
                      ? We
                      : -1),
              g(e)._overflowDayOfYear && (t < $ || t > ce) && (t = ce),
              g(e)._overflowWeeks && t === -1 && (t = Mr),
              g(e)._overflowWeekday && t === -1 && (t = Sr),
              (g(e).overflow = t)),
          e
      );
  }
  var wa = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      ga = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      va = /Z|[+-]\d\d(?::?\d\d)?/,
      Et = [
          ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
          ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
          ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
          ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
          ["YYYY-DDD", /\d{4}-\d{3}/],
          ["YYYY-MM", /\d{4}-\d\d/, !1],
          ["YYYYYYMMDD", /[+-]\d{10}/],
          ["YYYYMMDD", /\d{8}/],
          ["GGGG[W]WWE", /\d{4}W\d{3}/],
          ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
          ["YYYYDDD", /\d{7}/],
          ["YYYYMM", /\d{6}/, !1],
          ["YYYY", /\d{4}/, !1],
      ],
      ms = [
          ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
          ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
          ["HH:mm:ss", /\d\d:\d\d:\d\d/],
          ["HH:mm", /\d\d:\d\d/],
          ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
          ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
          ["HHmmss", /\d\d\d\d\d\d/],
          ["HHmm", /\d\d\d\d/],
          ["HH", /\d\d/],
      ],
      ka = /^\/?Date\((-?\d+)/i,
      Da = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
      Ma = { UT: 0, GMT: 0, EDT: -4 * 60, EST: -5 * 60, CDT: -5 * 60, CST: -6 * 60, MDT: -6 * 60, MST: -7 * 60, PDT: -7 * 60, PST: -8 * 60 };
  function rn(e) {
      var t,
          s,
          n = e._i,
          r = wa.exec(n) || ga.exec(n),
          a,
          i,
          o,
          u,
          d = Et.length,
          _ = ms.length;
      if (r) {
          for (g(e).iso = !0, t = 0, s = d; t < s; t++)
              if (Et[t][1].exec(r[1])) {
                  (i = Et[t][0]), (a = Et[t][2] !== !1);
                  break;
              }
          if (i == null) {
              e._isValid = !1;
              return;
          }
          if (r[3]) {
              for (t = 0, s = _; t < s; t++)
                  if (ms[t][1].exec(r[3])) {
                      o = (r[2] || " ") + ms[t][0];
                      break;
                  }
              if (o == null) {
                  e._isValid = !1;
                  return;
              }
          }
          if (!a && o != null) {
              e._isValid = !1;
              return;
          }
          if (r[4])
              if (va.exec(r[4])) u = "Z";
              else {
                  e._isValid = !1;
                  return;
              }
          (e._f = i + (o || "") + (u || "")), ys(e);
      } else e._isValid = !1;
  }
  function Sa(e, t, s, n, r, a) {
      var i = [Ya(e), Bs.indexOf(t), parseInt(s, 10), parseInt(n, 10), parseInt(r, 10)];
      return a && i.push(parseInt(a, 10)), i;
  }
  function Ya(e) {
      var t = parseInt(e, 10);
      return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
  }
  function ba(e) {
      return e
          .replace(/\([^()]*\)|[\n\t]/g, " ")
          .replace(/(\s\s+)/g, " ")
          .replace(/^\s\s*/, "")
          .replace(/\s\s*$/, "");
  }
  function xa(e, t, s) {
      if (e) {
          var n = Ks.indexOf(e),
              r = new Date(t[0], t[1], t[2]).getDay();
          if (n !== r) return (g(s).weekdayMismatch = !0), (s._isValid = !1), !1;
      }
      return !0;
  }
  function Oa(e, t, s) {
      if (e) return Ma[e];
      if (t) return 0;
      var n = parseInt(s, 10),
          r = n % 100,
          a = (n - r) / 100;
      return a * 60 + r;
  }
  function an(e) {
      var t = Da.exec(ba(e._i)),
          s;
      if (t) {
          if (((s = Sa(t[4], t[3], t[2], t[5], t[6], t[7])), !xa(t[1], s, e))) return;
          (e._a = s), (e._tzm = Oa(t[8], t[9], t[10])), (e._d = nt.apply(null, e._a)), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), (g(e).rfc2822 = !0);
      } else e._isValid = !1;
  }
  function Ta(e) {
      var t = ka.exec(e._i);
      if (t !== null) {
          e._d = new Date(+t[1]);
          return;
      }
      if ((rn(e), e._isValid === !1)) delete e._isValid;
      else return;
      if ((an(e), e._isValid === !1)) delete e._isValid;
      else return;
      e._strict ? (e._isValid = !1) : l.createFromInputFallback(e);
  }
  l.createFromInputFallback = X(
      "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
      function (e) {
          e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
      }
  );
  function Ue(e, t, s) {
      return e != null ? e : t != null ? t : s;
  }
  function Ra(e) {
      var t = new Date(l.now());
      return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()];
  }
  function _s(e) {
      var t,
          s,
          n = [],
          r,
          a,
          i;
      if (!e._d) {
          for (
              r = Ra(e),
                  e._w && e._a[ce] == null && e._a[pe] == null && Ea(e),
                  e._dayOfYear != null && ((i = Ue(e._a[$], r[$])), (e._dayOfYear > st(i) || e._dayOfYear === 0) && (g(e)._overflowDayOfYear = !0), (s = nt(i, 0, e._dayOfYear)), (e._a[pe] = s.getUTCMonth()), (e._a[ce] = s.getUTCDate())),
                  t = 0;
              t < 3 && e._a[t] == null;
              ++t
          )
              e._a[t] = n[t] = r[t];
          for (; t < 7; t++) e._a[t] = n[t] = e._a[t] == null ? (t === 2 ? 1 : 0) : e._a[t];
          e._a[A] === 24 && e._a[ae] === 0 && e._a[we] === 0 && e._a[We] === 0 && ((e._nextDay = !0), (e._a[A] = 0)),
              (e._d = (e._useUTC ? nt : Cr).apply(null, n)),
              (a = e._useUTC ? e._d.getUTCDay() : e._d.getDay()),
              e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
              e._nextDay && (e._a[A] = 24),
              e._w && typeof e._w.d != "undefined" && e._w.d !== a && (g(e).weekdayMismatch = !0);
      }
  }
  function Ea(e) {
      var t, s, n, r, a, i, o, u, d;
      (t = e._w),
          t.GG != null || t.W != null || t.E != null
              ? ((a = 1), (i = 4), (s = Ue(t.GG, e._a[$], rt(T(), 1, 4).year)), (n = Ue(t.W, 1)), (r = Ue(t.E, 1)), (r < 1 || r > 7) && (u = !0))
              : ((a = e._locale._week.dow),
                (i = e._locale._week.doy),
                (d = rt(T(), a, i)),
                (s = Ue(t.gg, e._a[$], d.year)),
                (n = Ue(t.w, d.week)),
                t.d != null ? ((r = t.d), (r < 0 || r > 6) && (u = !0)) : t.e != null ? ((r = t.e + a), (t.e < 0 || t.e > 6) && (u = !0)) : (r = a)),
          n < 1 || n > ge(s, a, i) ? (g(e)._overflowWeeks = !0) : u != null ? (g(e)._overflowWeekday = !0) : ((o = Xs(s, n, r, a, i)), (e._a[$] = o.year), (e._dayOfYear = o.dayOfYear));
  }
  (l.ISO_8601 = function () {}), (l.RFC_2822 = function () {});
  function ys(e) {
      if (e._f === l.ISO_8601) {
          rn(e);
          return;
      }
      if (e._f === l.RFC_2822) {
          an(e);
          return;
      }
      (e._a = []), (g(e).empty = !0);
      var t = "" + e._i,
          s,
          n,
          r,
          a,
          i,
          o = t.length,
          u = 0,
          d,
          _;
      for (r = Is(e._f, e._locale).match(ns) || [], _ = r.length, s = 0; s < _; s++)
          (a = r[s]),
              (n = (t.match(vr(a, e)) || [])[0]),
              n && ((i = t.substr(0, t.indexOf(n))), i.length > 0 && g(e).unusedInput.push(i), (t = t.slice(t.indexOf(n) + n.length)), (u += n.length)),
              Ae[a] ? (n ? (g(e).empty = !1) : g(e).unusedTokens.push(a), Dr(a, n, e)) : e._strict && !n && g(e).unusedTokens.push(a);
      (g(e).charsLeftOver = o - u),
          t.length > 0 && g(e).unusedInput.push(t),
          e._a[A] <= 12 && g(e).bigHour === !0 && e._a[A] > 0 && (g(e).bigHour = void 0),
          (g(e).parsedDateParts = e._a.slice(0)),
          (g(e).meridiem = e._meridiem),
          (e._a[A] = Wa(e._locale, e._a[A], e._meridiem)),
          (d = g(e).era),
          d !== null && (e._a[$] = e._locale.erasConvertYear(d, e._a[$])),
          _s(e),
          fs(e);
  }
  function Wa(e, t, s) {
      var n;
      return s == null ? t : e.meridiemHour != null ? e.meridiemHour(t, s) : (e.isPM != null && ((n = e.isPM(s)), n && t < 12 && (t += 12), !n && t === 12 && (t = 0)), t);
  }
  function La(e) {
      var t,
          s,
          n,
          r,
          a,
          i,
          o = !1,
          u = e._f.length;
      if (u === 0) {
          (g(e).invalidFormat = !0), (e._d = new Date(NaN));
          return;
      }
      for (r = 0; r < u; r++)
          (a = 0),
              (i = !1),
              (t = Kt({}, e)),
              e._useUTC != null && (t._useUTC = e._useUTC),
              (t._f = e._f[r]),
              ys(t),
              Qt(t) && (i = !0),
              (a += g(t).charsLeftOver),
              (a += g(t).unusedTokens.length * 10),
              (g(t).score = a),
              o ? a < n && ((n = a), (s = t)) : (n == null || a < n || i) && ((n = a), (s = t), i && (o = !0));
      Se(e, s || t);
  }
  function Pa(e) {
      if (!e._d) {
          var t = as(e._i),
              s = t.day === void 0 ? t.date : t.day;
          (e._a = Ps([t.year, t.month, s, t.hour, t.minute, t.second, t.millisecond], function (n) {
              return n && parseInt(n, 10);
          })),
              _s(e);
      }
  }
  function Fa(e) {
      var t = new Xe(fs(on(e)));
      return t._nextDay && (t.add(1, "d"), (t._nextDay = void 0)), t;
  }
  function on(e) {
      var t = e._i,
          s = e._f;
      return (
          (e._locale = e._locale || ve(e._l)),
          t === null || (s === void 0 && t === "")
              ? pt({ nullInput: !0 })
              : (typeof t == "string" && (e._i = t = e._locale.preparse(t)), re(t) ? new Xe(fs(t)) : (Qe(t) ? (e._d = t) : j(s) ? La(e) : s ? ys(e) : Na(e), Qt(e) || (e._d = null), e))
      );
  }
  function Na(e) {
      var t = e._i;
      F(t)
          ? (e._d = new Date(l.now()))
          : Qe(t)
          ? (e._d = new Date(t.valueOf()))
          : typeof t == "string"
          ? Ta(e)
          : j(t)
          ? ((e._a = Ps(t.slice(0), function (s) {
                return parseInt(s, 10);
            })),
            _s(e))
          : ye(t)
          ? Pa(e)
          : q(t)
          ? (e._d = new Date(t))
          : l.createFromInputFallback(e);
  }
  function ln(e, t, s, n, r) {
      var a = {};
      return (
          (t === !0 || t === !1) && ((n = t), (t = void 0)),
          (s === !0 || s === !1) && ((n = s), (s = void 0)),
          ((ye(e) && Ee(e)) || (j(e) && e.length === 0)) && (e = void 0),
          (a._isAMomentObject = !0),
          (a._useUTC = a._isUTC = r),
          (a._l = s),
          (a._i = e),
          (a._f = t),
          (a._strict = n),
          Fa(a)
      );
  }
  function T(e, t, s, n) {
      return ln(e, t, s, n, !1);
  }
  var Ca = X("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
          var e = T.apply(null, arguments);
          return this.isValid() && e.isValid() ? (e < this ? this : e) : pt();
      }),
      Aa = X("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
          var e = T.apply(null, arguments);
          return this.isValid() && e.isValid() ? (e > this ? this : e) : pt();
      });
  function un(e, t) {
      var s, n;
      if ((t.length === 1 && j(t[0]) && (t = t[0]), !t.length)) return T();
      for (s = t[0], n = 1; n < t.length; ++n) (!t[n].isValid() || t[n][e](s)) && (s = t[n]);
      return s;
  }
  function Ia() {
      var e = [].slice.call(arguments, 0);
      return un("isBefore", e);
  }
  function Ha() {
      var e = [].slice.call(arguments, 0);
      return un("isAfter", e);
  }
  var Ua = function () {
          return Date.now ? Date.now() : +new Date();
      },
      ot = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
  function $a(e) {
      var t,
          s = !1,
          n,
          r = ot.length;
      for (t in e) if (D(e, t) && !(C.call(ot, t) !== -1 && (e[t] == null || !isNaN(e[t])))) return !1;
      for (n = 0; n < r; ++n)
          if (e[ot[n]]) {
              if (s) return !1;
              parseFloat(e[ot[n]]) !== v(e[ot[n]]) && (s = !0);
          }
      return !0;
  }
  function Va() {
      return this._isValid;
  }
  function Ga() {
      return ie(NaN);
  }
  function Wt(e) {
      var t = as(e),
          s = t.year || 0,
          n = t.quarter || 0,
          r = t.month || 0,
          a = t.week || t.isoWeek || 0,
          i = t.day || 0,
          o = t.hour || 0,
          u = t.minute || 0,
          d = t.second || 0,
          _ = t.millisecond || 0;
      (this._isValid = $a(t)), (this._milliseconds = +_ + d * 1e3 + u * 6e4 + o * 1e3 * 60 * 60), (this._days = +i + a * 7), (this._months = +r + n * 3 + s * 12), (this._data = {}), (this._locale = ve()), this._bubble();
  }
  function Lt(e) {
      return e instanceof Wt;
  }
  function ps(e) {
      return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
  }
  function ja(e, t, s) {
      var n = Math.min(e.length, t.length),
          r = Math.abs(e.length - t.length),
          a = 0,
          i;
      for (i = 0; i < n; i++) ((s && e[i] !== t[i]) || (!s && v(e[i]) !== v(t[i]))) && a++;
      return a + r;
  }
  function hn(e, t) {
      y(e, 0, 0, function () {
          var s = this.utcOffset(),
              n = "+";
          return s < 0 && ((s = -s), (n = "-")), n + de(~~(s / 60), 2) + t + de(~~s % 60, 2);
      });
  }
  hn("Z", ":"),
      hn("ZZ", ""),
      f("Z", bt),
      f("ZZ", bt),
      b(["Z", "ZZ"], function (e, t, s) {
          (s._useUTC = !0), (s._tzm = ws(bt, e));
      });
  var Ba = /([\+\-]|\d\d)/gi;
  function ws(e, t) {
      var s = (t || "").match(e),
          n,
          r,
          a;
      return s === null ? null : ((n = s[s.length - 1] || []), (r = (n + "").match(Ba) || ["-", 0, 0]), (a = +(r[1] * 60) + v(r[2])), a === 0 ? 0 : r[0] === "+" ? a : -a);
  }
  function gs(e, t) {
      var s, n;
      return t._isUTC ? ((s = t.clone()), (n = (re(e) || Qe(e) ? e.valueOf() : T(e).valueOf()) - s.valueOf()), s._d.setTime(s._d.valueOf() + n), l.updateOffset(s, !1), s) : T(e).local();
  }
  function vs(e) {
      return -Math.round(e._d.getTimezoneOffset());
  }
  l.updateOffset = function () {};
  function qa(e, t, s) {
      var n = this._offset || 0,
          r;
      if (!this.isValid()) return e != null ? this : NaN;
      if (e != null) {
          if (typeof e == "string") {
              if (((e = ws(bt, e)), e === null)) return this;
          } else Math.abs(e) < 16 && !s && (e = e * 60);
          return (
              !this._isUTC && t && (r = vs(this)),
              (this._offset = e),
              (this._isUTC = !0),
              r != null && this.add(r, "m"),
              n !== e && (!t || this._changeInProgress ? mn(this, ie(e - n, "m"), 1, !1) : this._changeInProgress || ((this._changeInProgress = !0), l.updateOffset(this, !0), (this._changeInProgress = null))),
              this
          );
      } else return this._isUTC ? n : vs(this);
  }
  function za(e, t) {
      return e != null ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset();
  }
  function Za(e) {
      return this.utcOffset(0, e);
  }
  function Ja(e) {
      return this._isUTC && (this.utcOffset(0, e), (this._isUTC = !1), e && this.subtract(vs(this), "m")), this;
  }
  function Qa() {
      if (this._tzm != null) this.utcOffset(this._tzm, !1, !0);
      else if (typeof this._i == "string") {
          var e = ws(wr, this._i);
          e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
      }
      return this;
  }
  function Xa(e) {
      return this.isValid() ? ((e = e ? T(e).utcOffset() : 0), (this.utcOffset() - e) % 60 === 0) : !1;
  }
  function Ka() {
      return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }
  function ei() {
      if (!F(this._isDSTShifted)) return this._isDSTShifted;
      var e = {},
          t;
      return Kt(e, this), (e = on(e)), e._a ? ((t = e._isUTC ? ue(e._a) : T(e._a)), (this._isDSTShifted = this.isValid() && ja(e._a, t.toArray()) > 0)) : (this._isDSTShifted = !1), this._isDSTShifted;
  }
  function ti() {
      return this.isValid() ? !this._isUTC : !1;
  }
  function si() {
      return this.isValid() ? this._isUTC : !1;
  }
  function dn() {
      return this.isValid() ? this._isUTC && this._offset === 0 : !1;
  }
  var ni = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
      ri = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  function ie(e, t) {
      var s = e,
          n = null,
          r,
          a,
          i;
      return (
          Lt(e)
              ? (s = { ms: e._milliseconds, d: e._days, M: e._months })
              : q(e) || !isNaN(+e)
              ? ((s = {}), t ? (s[t] = +e) : (s.milliseconds = +e))
              : (n = ni.exec(e))
              ? ((r = n[1] === "-" ? -1 : 1), (s = { y: 0, d: v(n[ce]) * r, h: v(n[A]) * r, m: v(n[ae]) * r, s: v(n[we]) * r, ms: v(ps(n[We] * 1e3)) * r }))
              : (n = ri.exec(e))
              ? ((r = n[1] === "-" ? -1 : 1), (s = { y: Le(n[2], r), M: Le(n[3], r), w: Le(n[4], r), d: Le(n[5], r), h: Le(n[6], r), m: Le(n[7], r), s: Le(n[8], r) }))
              : s == null
              ? (s = {})
              : typeof s == "object" && ("from" in s || "to" in s) && ((i = ai(T(s.from), T(s.to))), (s = {}), (s.ms = i.milliseconds), (s.M = i.months)),
          (a = new Wt(s)),
          Lt(e) && D(e, "_locale") && (a._locale = e._locale),
          Lt(e) && D(e, "_isValid") && (a._isValid = e._isValid),
          a
      );
  }
  (ie.fn = Wt.prototype), (ie.invalid = Ga);
  function Le(e, t) {
      var s = e && parseFloat(e.replace(",", "."));
      return (isNaN(s) ? 0 : s) * t;
  }
  function cn(e, t) {
      var s = {};
      return (s.months = t.month() - e.month() + (t.year() - e.year()) * 12), e.clone().add(s.months, "M").isAfter(t) && --s.months, (s.milliseconds = +t - +e.clone().add(s.months, "M")), s;
  }
  function ai(e, t) {
      var s;
      return e.isValid() && t.isValid() ? ((t = gs(t, e)), e.isBefore(t) ? (s = cn(e, t)) : ((s = cn(t, e)), (s.milliseconds = -s.milliseconds), (s.months = -s.months)), s) : { milliseconds: 0, months: 0 };
  }
  function fn(e, t) {
      return function (s, n) {
          var r, a;
          return (
              n !== null &&
                  !isNaN(+n) &&
                  (As(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), (a = s), (s = n), (n = a)),
              (r = ie(s, n)),
              mn(this, r, e),
              this
          );
      };
  }
  function mn(e, t, s, n) {
      var r = t._milliseconds,
          a = ps(t._days),
          i = ps(t._months);
      e.isValid() && ((n = n == null ? !0 : n), i && zs(e, kt(e, "Month") + i * s), a && Us(e, "Date", kt(e, "Date") + a * s), r && e._d.setTime(e._d.valueOf() + r * s), n && l.updateOffset(e, a || i));
  }
  var ii = fn(1, "add"),
      oi = fn(-1, "subtract");
  function _n(e) {
      return typeof e == "string" || e instanceof String;
  }
  function li(e) {
      return re(e) || Qe(e) || _n(e) || q(e) || hi(e) || ui(e) || e === null || e === void 0;
  }
  function ui(e) {
      var t = ye(e) && !Ee(e),
          s = !1,
          n = ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"],
          r,
          a,
          i = n.length;
      for (r = 0; r < i; r += 1) (a = n[r]), (s = s || D(e, a));
      return t && s;
  }
  function hi(e) {
      var t = j(e),
          s = !1;
      return (
          t &&
              (s =
                  e.filter(function (n) {
                      return !q(n) && _n(e);
                  }).length === 0),
          t && s
      );
  }
  function di(e) {
      var t = ye(e) && !Ee(e),
          s = !1,
          n = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"],
          r,
          a;
      for (r = 0; r < n.length; r += 1) (a = n[r]), (s = s || D(e, a));
      return t && s;
  }
  function ci(e, t) {
      var s = e.diff(t, "days", !0);
      return s < -6 ? "sameElse" : s < -1 ? "lastWeek" : s < 0 ? "lastDay" : s < 1 ? "sameDay" : s < 2 ? "nextDay" : s < 7 ? "nextWeek" : "sameElse";
  }
  function fi(e, t) {
      arguments.length === 1 && (arguments[0] ? (li(arguments[0]) ? ((e = arguments[0]), (t = void 0)) : di(arguments[0]) && ((t = arguments[0]), (e = void 0))) : ((e = void 0), (t = void 0)));
      var s = e || T(),
          n = gs(s, this).startOf("day"),
          r = l.calendarFormat(this, n) || "sameElse",
          a = t && (he(t[r]) ? t[r].call(this, s) : t[r]);
      return this.format(a || this.localeData().calendar(r, this, T(s)));
  }
  function mi() {
      return new Xe(this);
  }
  function _i(e, t) {
      var s = re(e) ? e : T(e);
      return this.isValid() && s.isValid() ? ((t = K(t) || "millisecond"), t === "millisecond" ? this.valueOf() > s.valueOf() : s.valueOf() < this.clone().startOf(t).valueOf()) : !1;
  }
  function yi(e, t) {
      var s = re(e) ? e : T(e);
      return this.isValid() && s.isValid() ? ((t = K(t) || "millisecond"), t === "millisecond" ? this.valueOf() < s.valueOf() : this.clone().endOf(t).valueOf() < s.valueOf()) : !1;
  }
  function pi(e, t, s, n) {
      var r = re(e) ? e : T(e),
          a = re(t) ? t : T(t);
      return this.isValid() && r.isValid() && a.isValid() ? ((n = n || "()"), (n[0] === "(" ? this.isAfter(r, s) : !this.isBefore(r, s)) && (n[1] === ")" ? this.isBefore(a, s) : !this.isAfter(a, s))) : !1;
  }
  function wi(e, t) {
      var s = re(e) ? e : T(e),
          n;
      return this.isValid() && s.isValid() ? ((t = K(t) || "millisecond"), t === "millisecond" ? this.valueOf() === s.valueOf() : ((n = s.valueOf()), this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf())) : !1;
  }
  function gi(e, t) {
      return this.isSame(e, t) || this.isAfter(e, t);
  }
  function vi(e, t) {
      return this.isSame(e, t) || this.isBefore(e, t);
  }
  function ki(e, t, s) {
      var n, r, a;
      if (!this.isValid()) return NaN;
      if (((n = gs(e, this)), !n.isValid())) return NaN;
      switch (((r = (n.utcOffset() - this.utcOffset()) * 6e4), (t = K(t)), t)) {
          case "year":
              a = Pt(this, n) / 12;
              break;
          case "month":
              a = Pt(this, n);
              break;
          case "quarter":
              a = Pt(this, n) / 3;
              break;
          case "second":
              a = (this - n) / 1e3;
              break;
          case "minute":
              a = (this - n) / 6e4;
              break;
          case "hour":
              a = (this - n) / 36e5;
              break;
          case "day":
              a = (this - n - r) / 864e5;
              break;
          case "week":
              a = (this - n - r) / 6048e5;
              break;
          default:
              a = this - n;
      }
      return s ? a : ee(a);
  }
  function Pt(e, t) {
      if (e.date() < t.date()) return -Pt(t, e);
      var s = (t.year() - e.year()) * 12 + (t.month() - e.month()),
          n = e.clone().add(s, "months"),
          r,
          a;
      return t - n < 0 ? ((r = e.clone().add(s - 1, "months")), (a = (t - n) / (n - r))) : ((r = e.clone().add(s + 1, "months")), (a = (t - n) / (r - n))), -(s + a) || 0;
  }
  (l.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"), (l.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]");
  function Di() {
      return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  }
  function Mi(e) {
      if (!this.isValid()) return null;
      var t = e !== !0,
          s = t ? this.clone().utc() : this;
      return s.year() < 0 || s.year() > 9999
          ? gt(s, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ")
          : he(Date.prototype.toISOString)
          ? t
              ? this.toDate().toISOString()
              : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3).toISOString().replace("Z", gt(s, "Z"))
          : gt(s, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
  }
  function Si() {
      if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
      var e = "moment",
          t = "",
          s,
          n,
          r,
          a;
      return (
          this.isLocal() || ((e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone"), (t = "Z")),
          (s = "[" + e + '("]'),
          (n = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"),
          (r = "-MM-DD[T]HH:mm:ss.SSS"),
          (a = t + '[")]'),
          this.format(s + n + r + a)
      );
  }
  function Yi(e) {
      e || (e = this.isUtc() ? l.defaultFormatUtc : l.defaultFormat);
      var t = gt(this, e);
      return this.localeData().postformat(t);
  }
  function bi(e, t) {
      return this.isValid() && ((re(e) && e.isValid()) || T(e).isValid()) ? ie({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
  }
  function xi(e) {
      return this.from(T(), e);
  }
  function Oi(e, t) {
      return this.isValid() && ((re(e) && e.isValid()) || T(e).isValid()) ? ie({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
  }
  function Ti(e) {
      return this.to(T(), e);
  }
  function yn(e) {
      var t;
      return e === void 0 ? this._locale._abbr : ((t = ve(e)), t != null && (this._locale = t), this);
  }
  var pn = X("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (e) {
      return e === void 0 ? this.localeData() : this.locale(e);
  });
  function wn() {
      return this._locale;
  }
  var Ft = 1e3,
      $e = 60 * Ft,
      Nt = 60 * $e,
      gn = (365 * 400 + 97) * 24 * Nt;
  function Ve(e, t) {
      return ((e % t) + t) % t;
  }
  function vn(e, t, s) {
      return e < 100 && e >= 0 ? new Date(e + 400, t, s) - gn : new Date(e, t, s).valueOf();
  }
  function kn(e, t, s) {
      return e < 100 && e >= 0 ? Date.UTC(e + 400, t, s) - gn : Date.UTC(e, t, s);
  }
  function Ri(e) {
      var t, s;
      if (((e = K(e)), e === void 0 || e === "millisecond" || !this.isValid())) return this;
      switch (((s = this._isUTC ? kn : vn), e)) {
          case "year":
              t = s(this.year(), 0, 1);
              break;
          case "quarter":
              t = s(this.year(), this.month() - (this.month() % 3), 1);
              break;
          case "month":
              t = s(this.year(), this.month(), 1);
              break;
          case "week":
              t = s(this.year(), this.month(), this.date() - this.weekday());
              break;
          case "isoWeek":
              t = s(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
              break;
          case "day":
          case "date":
              t = s(this.year(), this.month(), this.date());
              break;
          case "hour":
              (t = this._d.valueOf()), (t -= Ve(t + (this._isUTC ? 0 : this.utcOffset() * $e), Nt));
              break;
          case "minute":
              (t = this._d.valueOf()), (t -= Ve(t, $e));
              break;
          case "second":
              (t = this._d.valueOf()), (t -= Ve(t, Ft));
              break;
      }
      return this._d.setTime(t), l.updateOffset(this, !0), this;
  }
  function Ei(e) {
      var t, s;
      if (((e = K(e)), e === void 0 || e === "millisecond" || !this.isValid())) return this;
      switch (((s = this._isUTC ? kn : vn), e)) {
          case "year":
              t = s(this.year() + 1, 0, 1) - 1;
              break;
          case "quarter":
              t = s(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
              break;
          case "month":
              t = s(this.year(), this.month() + 1, 1) - 1;
              break;
          case "week":
              t = s(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
              break;
          case "isoWeek":
              t = s(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
              break;
          case "day":
          case "date":
              t = s(this.year(), this.month(), this.date() + 1) - 1;
              break;
          case "hour":
              (t = this._d.valueOf()), (t += Nt - Ve(t + (this._isUTC ? 0 : this.utcOffset() * $e), Nt) - 1);
              break;
          case "minute":
              (t = this._d.valueOf()), (t += $e - Ve(t, $e) - 1);
              break;
          case "second":
              (t = this._d.valueOf()), (t += Ft - Ve(t, Ft) - 1);
              break;
      }
      return this._d.setTime(t), l.updateOffset(this, !0), this;
  }
  function Wi() {
      return this._d.valueOf() - (this._offset || 0) * 6e4;
  }
  function Li() {
      return Math.floor(this.valueOf() / 1e3);
  }
  function Pi() {
      return new Date(this.valueOf());
  }
  function Fi() {
      var e = this;
      return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()];
  }
  function Ni() {
      var e = this;
      return { years: e.year(), months: e.month(), date: e.date(), hours: e.hours(), minutes: e.minutes(), seconds: e.seconds(), milliseconds: e.milliseconds() };
  }
  function Ci() {
      return this.isValid() ? this.toISOString() : null;
  }
  function Ai() {
      return Qt(this);
  }
  function Ii() {
      return Se({}, g(this));
  }
  function Hi() {
      return g(this).overflow;
  }
  function Ui() {
      return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict };
  }
  y("N", 0, 0, "eraAbbr"),
      y("NN", 0, 0, "eraAbbr"),
      y("NNN", 0, 0, "eraAbbr"),
      y("NNNN", 0, 0, "eraName"),
      y("NNNNN", 0, 0, "eraNarrow"),
      y("y", ["y", 1], "yo", "eraYear"),
      y("y", ["yy", 2], 0, "eraYear"),
      y("y", ["yyy", 3], 0, "eraYear"),
      y("y", ["yyyy", 4], 0, "eraYear"),
      f("N", ks),
      f("NN", ks),
      f("NNN", ks),
      f("NNNN", Xi),
      f("NNNNN", Ki),
      b(["N", "NN", "NNN", "NNNN", "NNNNN"], function (e, t, s, n) {
          var r = s._locale.erasParse(e, n, s._strict);
          r ? (g(s).era = r) : (g(s).invalidEra = e);
      }),
      f("y", He),
      f("yy", He),
      f("yyy", He),
      f("yyyy", He),
      f("yo", eo),
      b(["y", "yy", "yyy", "yyyy"], $),
      b(["yo"], function (e, t, s, n) {
          var r;
          s._locale._eraYearOrdinalRegex && (r = e.match(s._locale._eraYearOrdinalRegex)), s._locale.eraYearOrdinalParse ? (t[$] = s._locale.eraYearOrdinalParse(e, r)) : (t[$] = parseInt(e, 10));
      });
  function $i(e, t) {
      var s,
          n,
          r,
          a = this._eras || ve("en")._eras;
      for (s = 0, n = a.length; s < n; ++s) {
          switch (typeof a[s].since) {
              case "string":
                  (r = l(a[s].since).startOf("day")), (a[s].since = r.valueOf());
                  break;
          }
          switch (typeof a[s].until) {
              case "undefined":
                  a[s].until = 1 / 0;
                  break;
              case "string":
                  (r = l(a[s].until).startOf("day").valueOf()), (a[s].until = r.valueOf());
                  break;
          }
      }
      return a;
  }
  function Vi(e, t, s) {
      var n,
          r,
          a = this.eras(),
          i,
          o,
          u;
      for (e = e.toUpperCase(), n = 0, r = a.length; n < r; ++n)
          if (((i = a[n].name.toUpperCase()), (o = a[n].abbr.toUpperCase()), (u = a[n].narrow.toUpperCase()), s))
              switch (t) {
                  case "N":
                  case "NN":
                  case "NNN":
                      if (o === e) return a[n];
                      break;
                  case "NNNN":
                      if (i === e) return a[n];
                      break;
                  case "NNNNN":
                      if (u === e) return a[n];
                      break;
              }
          else if ([i, o, u].indexOf(e) >= 0) return a[n];
  }
  function Gi(e, t) {
      var s = e.since <= e.until ? 1 : -1;
      return t === void 0 ? l(e.since).year() : l(e.since).year() + (t - e.offset) * s;
  }
  function ji() {
      var e,
          t,
          s,
          n = this.localeData().eras();
      for (e = 0, t = n.length; e < t; ++e) if (((s = this.clone().startOf("day").valueOf()), (n[e].since <= s && s <= n[e].until) || (n[e].until <= s && s <= n[e].since))) return n[e].name;
      return "";
  }
  function Bi() {
      var e,
          t,
          s,
          n = this.localeData().eras();
      for (e = 0, t = n.length; e < t; ++e) if (((s = this.clone().startOf("day").valueOf()), (n[e].since <= s && s <= n[e].until) || (n[e].until <= s && s <= n[e].since))) return n[e].narrow;
      return "";
  }
  function qi() {
      var e,
          t,
          s,
          n = this.localeData().eras();
      for (e = 0, t = n.length; e < t; ++e) if (((s = this.clone().startOf("day").valueOf()), (n[e].since <= s && s <= n[e].until) || (n[e].until <= s && s <= n[e].since))) return n[e].abbr;
      return "";
  }
  function zi() {
      var e,
          t,
          s,
          n,
          r = this.localeData().eras();
      for (e = 0, t = r.length; e < t; ++e)
          if (((s = r[e].since <= r[e].until ? 1 : -1), (n = this.clone().startOf("day").valueOf()), (r[e].since <= n && n <= r[e].until) || (r[e].until <= n && n <= r[e].since)))
              return (this.year() - l(r[e].since).year()) * s + r[e].offset;
      return this.year();
  }
  function Zi(e) {
      return D(this, "_erasNameRegex") || Ds.call(this), e ? this._erasNameRegex : this._erasRegex;
  }
  function Ji(e) {
      return D(this, "_erasAbbrRegex") || Ds.call(this), e ? this._erasAbbrRegex : this._erasRegex;
  }
  function Qi(e) {
      return D(this, "_erasNarrowRegex") || Ds.call(this), e ? this._erasNarrowRegex : this._erasRegex;
  }
  function ks(e, t) {
      return t.erasAbbrRegex(e);
  }
  function Xi(e, t) {
      return t.erasNameRegex(e);
  }
  function Ki(e, t) {
      return t.erasNarrowRegex(e);
  }
  function eo(e, t) {
      return t._eraYearOrdinalRegex || He;
  }
  function Ds() {
      var e = [],
          t = [],
          s = [],
          n = [],
          r,
          a,
          i = this.eras();
      for (r = 0, a = i.length; r < a; ++r) t.push(Z(i[r].name)), e.push(Z(i[r].abbr)), s.push(Z(i[r].narrow)), n.push(Z(i[r].name)), n.push(Z(i[r].abbr)), n.push(Z(i[r].narrow));
      (this._erasRegex = new RegExp("^(" + n.join("|") + ")", "i")),
          (this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i")),
          (this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i")),
          (this._erasNarrowRegex = new RegExp("^(" + s.join("|") + ")", "i"));
  }
  y(0, ["gg", 2], 0, function () {
      return this.weekYear() % 100;
  }),
      y(0, ["GG", 2], 0, function () {
          return this.isoWeekYear() % 100;
      });
  function Ct(e, t) {
      y(0, [e, e.length], 0, t);
  }
  Ct("gggg", "weekYear"),
      Ct("ggggg", "weekYear"),
      Ct("GGGG", "isoWeekYear"),
      Ct("GGGGG", "isoWeekYear"),
      H("weekYear", "gg"),
      H("isoWeekYear", "GG"),
      U("weekYear", 1),
      U("isoWeekYear", 1),
      f("G", Yt),
      f("g", Yt),
      f("GG", O, z),
      f("gg", O, z),
      f("GGGG", os, is),
      f("gggg", os, is),
      f("GGGGG", St, Dt),
      f("ggggg", St, Dt),
      tt(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, s, n) {
          t[n.substr(0, 2)] = v(e);
      }),
      tt(["gg", "GG"], function (e, t, s, n) {
          t[n] = l.parseTwoDigitYear(e);
      });
  function to(e) {
      return Dn.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }
  function so(e) {
      return Dn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
  }
  function no() {
      return ge(this.year(), 1, 4);
  }
  function ro() {
      return ge(this.isoWeekYear(), 1, 4);
  }
  function ao() {
      var e = this.localeData()._week;
      return ge(this.year(), e.dow, e.doy);
  }
  function io() {
      var e = this.localeData()._week;
      return ge(this.weekYear(), e.dow, e.doy);
  }
  function Dn(e, t, s, n, r) {
      var a;
      return e == null ? rt(this, n, r).year : ((a = ge(e, n, r)), t > a && (t = a), oo.call(this, e, t, s, n, r));
  }
  function oo(e, t, s, n, r) {
      var a = Xs(e, t, s, n, r),
          i = nt(a.year, 0, a.dayOfYear);
      return this.year(i.getUTCFullYear()), this.month(i.getUTCMonth()), this.date(i.getUTCDate()), this;
  }
  y("Q", 0, "Qo", "quarter"),
      H("quarter", "Q"),
      U("quarter", 7),
      f("Q", $s),
      b("Q", function (e, t) {
          t[pe] = (v(e) - 1) * 3;
      });
  function lo(e) {
      return e == null ? Math.ceil((this.month() + 1) / 3) : this.month((e - 1) * 3 + (this.month() % 3));
  }
  y("D", ["DD", 2], "Do", "date"),
      H("date", "D"),
      U("date", 9),
      f("D", O),
      f("DD", O, z),
      f("Do", function (e, t) {
          return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
      }),
      b(["D", "DD"], ce),
      b("Do", function (e, t) {
          t[ce] = v(e.match(O)[0]);
      });
  var Mn = Ie("Date", !0);
  y("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
      H("dayOfYear", "DDD"),
      U("dayOfYear", 4),
      f("DDD", Mt),
      f("DDDD", Vs),
      b(["DDD", "DDDD"], function (e, t, s) {
          s._dayOfYear = v(e);
      });
  function uo(e) {
      var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
      return e == null ? t : this.add(e - t, "d");
  }
  y("m", ["mm", 2], 0, "minute"), H("minute", "m"), U("minute", 14), f("m", O), f("mm", O, z), b(["m", "mm"], ae);
  var ho = Ie("Minutes", !1);
  y("s", ["ss", 2], 0, "second"), H("second", "s"), U("second", 15), f("s", O), f("ss", O, z), b(["s", "ss"], we);
  var co = Ie("Seconds", !1);
  y("S", 0, 0, function () {
      return ~~(this.millisecond() / 100);
  }),
      y(0, ["SS", 2], 0, function () {
          return ~~(this.millisecond() / 10);
      }),
      y(0, ["SSS", 3], 0, "millisecond"),
      y(0, ["SSSS", 4], 0, function () {
          return this.millisecond() * 10;
      }),
      y(0, ["SSSSS", 5], 0, function () {
          return this.millisecond() * 100;
      }),
      y(0, ["SSSSSS", 6], 0, function () {
          return this.millisecond() * 1e3;
      }),
      y(0, ["SSSSSSS", 7], 0, function () {
          return this.millisecond() * 1e4;
      }),
      y(0, ["SSSSSSSS", 8], 0, function () {
          return this.millisecond() * 1e5;
      }),
      y(0, ["SSSSSSSSS", 9], 0, function () {
          return this.millisecond() * 1e6;
      }),
      H("millisecond", "ms"),
      U("millisecond", 16),
      f("S", Mt, $s),
      f("SS", Mt, z),
      f("SSS", Mt, Vs);
  var be, Sn;
  for (be = "SSSS"; be.length <= 9; be += "S") f(be, He);
  function fo(e, t) {
      t[We] = v(("0." + e) * 1e3);
  }
  for (be = "S"; be.length <= 9; be += "S") b(be, fo);
  (Sn = Ie("Milliseconds", !1)), y("z", 0, 0, "zoneAbbr"), y("zz", 0, 0, "zoneName");
  function mo() {
      return this._isUTC ? "UTC" : "";
  }
  function _o() {
      return this._isUTC ? "Coordinated Universal Time" : "";
  }
  var h = Xe.prototype;
  (h.add = ii),
      (h.calendar = fi),
      (h.clone = mi),
      (h.diff = ki),
      (h.endOf = Ei),
      (h.format = Yi),
      (h.from = bi),
      (h.fromNow = xi),
      (h.to = Oi),
      (h.toNow = Ti),
      (h.get = yr),
      (h.invalidAt = Hi),
      (h.isAfter = _i),
      (h.isBefore = yi),
      (h.isBetween = pi),
      (h.isSame = wi),
      (h.isSameOrAfter = gi),
      (h.isSameOrBefore = vi),
      (h.isValid = Ai),
      (h.lang = pn),
      (h.locale = yn),
      (h.localeData = wn),
      (h.max = Aa),
      (h.min = Ca),
      (h.parsingFlags = Ii),
      (h.set = pr),
      (h.startOf = Ri),
      (h.subtract = oi),
      (h.toArray = Fi),
      (h.toObject = Ni),
      (h.toDate = Pi),
      (h.toISOString = Mi),
      (h.inspect = Si),
      typeof Symbol != "undefined" &&
          Symbol.for != null &&
          (h[Symbol.for("nodejs.util.inspect.custom")] = function () {
              return "Moment<" + this.format() + ">";
          }),
      (h.toJSON = Ci),
      (h.toString = Di),
      (h.unix = Li),
      (h.valueOf = Wi),
      (h.creationData = Ui),
      (h.eraName = ji),
      (h.eraNarrow = Bi),
      (h.eraAbbr = qi),
      (h.eraYear = zi),
      (h.year = Qs),
      (h.isLeapYear = Nr),
      (h.weekYear = to),
      (h.isoWeekYear = so),
      (h.quarter = h.quarters = lo),
      (h.month = Zs),
      (h.daysInMonth = Lr),
      (h.week = h.weeks = $r),
      (h.isoWeek = h.isoWeeks = Vr),
      (h.weeksInYear = ao),
      (h.weeksInWeekYear = io),
      (h.isoWeeksInYear = no),
      (h.isoWeeksInISOWeekYear = ro),
      (h.date = Mn),
      (h.day = h.days = sa),
      (h.weekday = na),
      (h.isoWeekday = ra),
      (h.dayOfYear = uo),
      (h.hour = h.hours = da),
      (h.minute = h.minutes = ho),
      (h.second = h.seconds = co),
      (h.millisecond = h.milliseconds = Sn),
      (h.utcOffset = qa),
      (h.utc = Za),
      (h.local = Ja),
      (h.parseZone = Qa),
      (h.hasAlignedHourOffset = Xa),
      (h.isDST = Ka),
      (h.isLocal = ti),
      (h.isUtcOffset = si),
      (h.isUtc = dn),
      (h.isUTC = dn),
      (h.zoneAbbr = mo),
      (h.zoneName = _o),
      (h.dates = X("dates accessor is deprecated. Use date instead.", Mn)),
      (h.months = X("months accessor is deprecated. Use month instead", Zs)),
      (h.years = X("years accessor is deprecated. Use year instead", Qs)),
      (h.zone = X("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", za)),
      (h.isDSTShifted = X("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", ei));
  function yo(e) {
      return T(e * 1e3);
  }
  function po() {
      return T.apply(null, arguments).parseZone();
  }
  function Yn(e) {
      return e;
  }
  var Y = ts.prototype;
  (Y.calendar = sr),
      (Y.longDateFormat = ir),
      (Y.invalidDate = lr),
      (Y.ordinal = dr),
      (Y.preparse = Yn),
      (Y.postformat = Yn),
      (Y.relativeTime = fr),
      (Y.pastFuture = mr),
      (Y.set = er),
      (Y.eras = $i),
      (Y.erasParse = Vi),
      (Y.erasConvertYear = Gi),
      (Y.erasAbbrRegex = Ji),
      (Y.erasNameRegex = Zi),
      (Y.erasNarrowRegex = Qi),
      (Y.months = Tr),
      (Y.monthsShort = Rr),
      (Y.monthsParse = Wr),
      (Y.monthsRegex = Fr),
      (Y.monthsShortRegex = Pr),
      (Y.week = Ar),
      (Y.firstDayOfYear = Ur),
      (Y.firstDayOfWeek = Hr),
      (Y.weekdays = Qr),
      (Y.weekdaysMin = Kr),
      (Y.weekdaysShort = Xr),
      (Y.weekdaysParse = ta),
      (Y.weekdaysRegex = aa),
      (Y.weekdaysShortRegex = ia),
      (Y.weekdaysMinRegex = oa),
      (Y.isPM = ua),
      (Y.meridiem = ca);
  function At(e, t, s, n) {
      var r = ve(),
          a = ue().set(n, t);
      return r[s](a, e);
  }
  function bn(e, t, s) {
      if ((q(e) && ((t = e), (e = void 0)), (e = e || ""), t != null)) return At(e, t, s, "month");
      var n,
          r = [];
      for (n = 0; n < 12; n++) r[n] = At(e, n, s, "month");
      return r;
  }
  function Ms(e, t, s, n) {
      typeof e == "boolean" ? (q(t) && ((s = t), (t = void 0)), (t = t || "")) : ((t = e), (s = t), (e = !1), q(t) && ((s = t), (t = void 0)), (t = t || ""));
      var r = ve(),
          a = e ? r._week.dow : 0,
          i,
          o = [];
      if (s != null) return At(t, (s + a) % 7, n, "day");
      for (i = 0; i < 7; i++) o[i] = At(t, (i + a) % 7, n, "day");
      return o;
  }
  function wo(e, t) {
      return bn(e, t, "months");
  }
  function go(e, t) {
      return bn(e, t, "monthsShort");
  }
  function vo(e, t, s) {
      return Ms(e, t, s, "weekdays");
  }
  function ko(e, t, s) {
      return Ms(e, t, s, "weekdaysShort");
  }
  function Do(e, t, s) {
      return Ms(e, t, s, "weekdaysMin");
  }
  Ye("en", {
      eras: [
          { since: "0001-01-01", until: 1 / 0, offset: 1, name: "Anno Domini", narrow: "AD", abbr: "AD" },
          { since: "0000-12-31", until: -1 / 0, offset: 1, name: "Before Christ", narrow: "BC", abbr: "BC" },
      ],
      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function (e) {
          var t = e % 10,
              s = v((e % 100) / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
          return e + s;
      },
  }),
      (l.lang = X("moment.lang is deprecated. Use moment.locale instead.", Ye)),
      (l.langData = X("moment.langData is deprecated. Use moment.localeData instead.", ve));
  var ke = Math.abs;
  function Mo() {
      var e = this._data;
      return (
          (this._milliseconds = ke(this._milliseconds)),
          (this._days = ke(this._days)),
          (this._months = ke(this._months)),
          (e.milliseconds = ke(e.milliseconds)),
          (e.seconds = ke(e.seconds)),
          (e.minutes = ke(e.minutes)),
          (e.hours = ke(e.hours)),
          (e.months = ke(e.months)),
          (e.years = ke(e.years)),
          this
      );
  }
  function xn(e, t, s, n) {
      var r = ie(t, s);
      return (e._milliseconds += n * r._milliseconds), (e._days += n * r._days), (e._months += n * r._months), e._bubble();
  }
  function So(e, t) {
      return xn(this, e, t, 1);
  }
  function Yo(e, t) {
      return xn(this, e, t, -1);
  }
  function On(e) {
      return e < 0 ? Math.floor(e) : Math.ceil(e);
  }
  function bo() {
      var e = this._milliseconds,
          t = this._days,
          s = this._months,
          n = this._data,
          r,
          a,
          i,
          o,
          u;
      return (
          (e >= 0 && t >= 0 && s >= 0) || (e <= 0 && t <= 0 && s <= 0) || ((e += On(Ss(s) + t) * 864e5), (t = 0), (s = 0)),
          (n.milliseconds = e % 1e3),
          (r = ee(e / 1e3)),
          (n.seconds = r % 60),
          (a = ee(r / 60)),
          (n.minutes = a % 60),
          (i = ee(a / 60)),
          (n.hours = i % 24),
          (t += ee(i / 24)),
          (u = ee(Tn(t))),
          (s += u),
          (t -= On(Ss(u))),
          (o = ee(s / 12)),
          (s %= 12),
          (n.days = t),
          (n.months = s),
          (n.years = o),
          this
      );
  }
  function Tn(e) {
      return (e * 4800) / 146097;
  }
  function Ss(e) {
      return (e * 146097) / 4800;
  }
  function xo(e) {
      if (!this.isValid()) return NaN;
      var t,
          s,
          n = this._milliseconds;
      if (((e = K(e)), e === "month" || e === "quarter" || e === "year"))
          switch (((t = this._days + n / 864e5), (s = this._months + Tn(t)), e)) {
              case "month":
                  return s;
              case "quarter":
                  return s / 3;
              case "year":
                  return s / 12;
          }
      else
          switch (((t = this._days + Math.round(Ss(this._months))), e)) {
              case "week":
                  return t / 7 + n / 6048e5;
              case "day":
                  return t + n / 864e5;
              case "hour":
                  return t * 24 + n / 36e5;
              case "minute":
                  return t * 1440 + n / 6e4;
              case "second":
                  return t * 86400 + n / 1e3;
              case "millisecond":
                  return Math.floor(t * 864e5) + n;
              default:
                  throw new Error("Unknown unit " + e);
          }
  }
  function Oo() {
      return this.isValid() ? this._milliseconds + this._days * 864e5 + (this._months % 12) * 2592e6 + v(this._months / 12) * 31536e6 : NaN;
  }
  function De(e) {
      return function () {
          return this.as(e);
      };
  }
  var To = De("ms"),
      Ro = De("s"),
      Eo = De("m"),
      Wo = De("h"),
      Lo = De("d"),
      Po = De("w"),
      Fo = De("M"),
      No = De("Q"),
      Co = De("y");
  function Ao() {
      return ie(this);
  }
  function Io(e) {
      return (e = K(e)), this.isValid() ? this[e + "s"]() : NaN;
  }
  function Pe(e) {
      return function () {
          return this.isValid() ? this._data[e] : NaN;
      };
  }
  var Ho = Pe("milliseconds"),
      Uo = Pe("seconds"),
      $o = Pe("minutes"),
      Vo = Pe("hours"),
      Go = Pe("days"),
      jo = Pe("months"),
      Bo = Pe("years");
  function qo() {
      return ee(this.days() / 7);
  }
  var Me = Math.round,
      Ge = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
  function zo(e, t, s, n, r) {
      return r.relativeTime(t || 1, !!s, e, n);
  }
  function Zo(e, t, s, n) {
      var r = ie(e).abs(),
          a = Me(r.as("s")),
          i = Me(r.as("m")),
          o = Me(r.as("h")),
          u = Me(r.as("d")),
          d = Me(r.as("M")),
          _ = Me(r.as("w")),
          c = Me(r.as("y")),
          m = (a <= s.ss && ["s", a]) || (a < s.s && ["ss", a]) || (i <= 1 && ["m"]) || (i < s.m && ["mm", i]) || (o <= 1 && ["h"]) || (o < s.h && ["hh", o]) || (u <= 1 && ["d"]) || (u < s.d && ["dd", u]);
      return s.w != null && (m = m || (_ <= 1 && ["w"]) || (_ < s.w && ["ww", _])), (m = m || (d <= 1 && ["M"]) || (d < s.M && ["MM", d]) || (c <= 1 && ["y"]) || ["yy", c]), (m[2] = t), (m[3] = +e > 0), (m[4] = n), zo.apply(null, m);
  }
  function Jo(e) {
      return e === void 0 ? Me : typeof e == "function" ? ((Me = e), !0) : !1;
  }
  function Qo(e, t) {
      return Ge[e] === void 0 ? !1 : t === void 0 ? Ge[e] : ((Ge[e] = t), e === "s" && (Ge.ss = t - 1), !0);
  }
  function Xo(e, t) {
      if (!this.isValid()) return this.localeData().invalidDate();
      var s = !1,
          n = Ge,
          r,
          a;
      return (
          typeof e == "object" && ((t = e), (e = !1)),
          typeof e == "boolean" && (s = e),
          typeof t == "object" && ((n = Object.assign({}, Ge, t)), t.s != null && t.ss == null && (n.ss = t.s - 1)),
          (r = this.localeData()),
          (a = Zo(this, !s, n, r)),
          s && (a = r.pastFuture(+this, a)),
          r.postformat(a)
      );
  }
  var Ys = Math.abs;
  function je(e) {
      return (e > 0) - (e < 0) || +e;
  }
  function It() {
      if (!this.isValid()) return this.localeData().invalidDate();
      var e = Ys(this._milliseconds) / 1e3,
          t = Ys(this._days),
          s = Ys(this._months),
          n,
          r,
          a,
          i,
          o = this.asSeconds(),
          u,
          d,
          _,
          c;
      return o
          ? ((n = ee(e / 60)),
            (r = ee(n / 60)),
            (e %= 60),
            (n %= 60),
            (a = ee(s / 12)),
            (s %= 12),
            (i = e ? e.toFixed(3).replace(/\.?0+$/, "") : ""),
            (u = o < 0 ? "-" : ""),
            (d = je(this._months) !== je(o) ? "-" : ""),
            (_ = je(this._days) !== je(o) ? "-" : ""),
            (c = je(this._milliseconds) !== je(o) ? "-" : ""),
            u + "P" + (a ? d + a + "Y" : "") + (s ? d + s + "M" : "") + (t ? _ + t + "D" : "") + (r || n || e ? "T" : "") + (r ? c + r + "H" : "") + (n ? c + n + "M" : "") + (e ? c + i + "S" : ""))
          : "P0D";
  }
  var M = Wt.prototype;
  (M.isValid = Va),
      (M.abs = Mo),
      (M.add = So),
      (M.subtract = Yo),
      (M.as = xo),
      (M.asMilliseconds = To),
      (M.asSeconds = Ro),
      (M.asMinutes = Eo),
      (M.asHours = Wo),
      (M.asDays = Lo),
      (M.asWeeks = Po),
      (M.asMonths = Fo),
      (M.asQuarters = No),
      (M.asYears = Co),
      (M.valueOf = Oo),
      (M._bubble = bo),
      (M.clone = Ao),
      (M.get = Io),
      (M.milliseconds = Ho),
      (M.seconds = Uo),
      (M.minutes = $o),
      (M.hours = Vo),
      (M.days = Go),
      (M.weeks = qo),
      (M.months = jo),
      (M.years = Bo),
      (M.humanize = Xo),
      (M.toISOString = It),
      (M.toString = It),
      (M.toJSON = It),
      (M.locale = yn),
      (M.localeData = wn),
      (M.toIsoString = X("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", It)),
      (M.lang = pn),
      y("X", 0, 0, "unix"),
      y("x", 0, 0, "valueOf"),
      f("x", Yt),
      f("X", gr),
      b("X", function (e, t, s) {
          s._d = new Date(parseFloat(e) * 1e3);
      }),
      b("x", function (e, t, s) {
          s._d = new Date(v(e));
      }); //! moment.js
  (l.version = "2.29.4"),
      B(T),
      (l.fn = h),
      (l.min = Ia),
      (l.max = Ha),
      (l.now = Ua),
      (l.utc = ue),
      (l.unix = yo),
      (l.months = wo),
      (l.isDate = Qe),
      (l.locale = Ye),
      (l.invalid = pt),
      (l.duration = ie),
      (l.isMoment = re),
      (l.weekdays = vo),
      (l.parseZone = po),
      (l.localeData = ve),
      (l.isDuration = Lt),
      (l.monthsShort = go),
      (l.weekdaysMin = Do),
      (l.defineLocale = cs),
      (l.updateLocale = ya),
      (l.locales = pa),
      (l.weekdaysShort = ko),
      (l.normalizeUnits = K),
      (l.relativeTimeRounding = Jo),
      (l.relativeTimeThreshold = Qo),
      (l.calendarFormat = ci),
      (l.prototype = h),
      (l.HTML5_FMT = {
          DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
          DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
          DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
          DATE: "YYYY-MM-DD",
          TIME: "HH:mm",
          TIME_SECONDS: "HH:mm:ss",
          TIME_MS: "HH:mm:ss.SSS",
          WEEK: "GGGG-[W]WW",
          MONTH: "YYYY-MM",
      });
  function Ht(e) {
      return e.split("-")[1];
  }
  function Rn(e) {
      return e === "y" ? "height" : "width";
  }
  function Be(e) {
      return e.split("-")[0];
  }
  function bs(e) {
      return ["top", "bottom"].includes(Be(e)) ? "x" : "y";
  }
  function En(e, t, s) {
      let { reference: n, floating: r } = e;
      const a = n.x + n.width / 2 - r.width / 2,
          i = n.y + n.height / 2 - r.height / 2,
          o = bs(t),
          u = Rn(o),
          d = n[u] / 2 - r[u] / 2,
          _ = o === "x";
      let c;
      switch (Be(t)) {
          case "top":
              c = { x: a, y: n.y - r.height };
              break;
          case "bottom":
              c = { x: a, y: n.y + n.height };
              break;
          case "right":
              c = { x: n.x + n.width, y: i };
              break;
          case "left":
              c = { x: n.x - r.width, y: i };
              break;
          default:
              c = { x: n.x, y: n.y };
      }
      switch (Ht(t)) {
          case "start":
              c[o] -= d * (s && _ ? -1 : 1);
              break;
          case "end":
              c[o] += d * (s && _ ? -1 : 1);
      }
      return c;
  }
  const Ko = (e, t, s) =>
      Ce(this, null, function* () {
          const { placement: n = "bottom", strategy: r = "absolute", middleware: a = [], platform: i } = s,
              o = a.filter(Boolean),
              u = yield i.isRTL == null ? void 0 : i.isRTL(t);
          let d = yield i.getElementRects({ reference: e, floating: t, strategy: r }),
              { x: _, y: c } = En(d, n, u),
              m = n,
              w = {},
              k = 0;
          for (let S = 0; S < o.length; S++) {
              const { name: x, fn: R } = o[S],
                  { x: L, y: N, data: I, reset: te } = yield R({ x: _, y: c, initialPlacement: n, placement: m, strategy: r, middlewareData: w, rects: d, platform: i, elements: { reference: e, floating: t } });
              (_ = L != null ? L : _),
                  (c = N != null ? N : c),
                  (w = Je(Q({}, w), { [x]: Q(Q({}, w[x]), I) })),
                  te &&
                      k <= 50 &&
                      (k++,
                      typeof te == "object" && (te.placement && (m = te.placement), te.rects && (d = te.rects === !0 ? yield i.getElementRects({ reference: e, floating: t, strategy: r }) : te.rects), ({ x: _, y: c } = En(d, m, u))),
                      (S = -1));
          }
          return { x: _, y: c, placement: m, strategy: r, middlewareData: w };
      });
  function el(e) {
      return typeof e != "number"
          ? (function (t) {
                return Q({ top: 0, right: 0, bottom: 0, left: 0 }, t);
            })(e)
          : { top: e, right: e, bottom: e, left: e };
  }
  function xs(e) {
      return Je(Q({}, e), { top: e.y, left: e.x, right: e.x + e.width, bottom: e.y + e.height });
  }
  function tl(e, t) {
      return Ce(this, null, function* () {
          var s;
          t === void 0 && (t = {});
          const { x: n, y: r, platform: a, rects: i, elements: o, strategy: u } = e,
              { boundary: d = "clippingAncestors", rootBoundary: _ = "viewport", elementContext: c = "floating", altBoundary: m = !1, padding: w = 0 } = t,
              k = el(w),
              S = o[m ? (c === "floating" ? "reference" : "floating") : c],
              x = xs(
                  yield a.getClippingRect({
                      element: (s = yield a.isElement == null ? void 0 : a.isElement(S)) == null || s ? S : S.contextElement || (yield a.getDocumentElement == null ? void 0 : a.getDocumentElement(o.floating)),
                      boundary: d,
                      rootBoundary: _,
                      strategy: u,
                  })
              ),
              R = c === "floating" ? Je(Q({}, i.floating), { x: n, y: r }) : i.reference,
              L = yield a.getOffsetParent == null ? void 0 : a.getOffsetParent(o.floating),
              N = ((yield a.isElement == null ? void 0 : a.isElement(L)) && (yield a.getScale == null ? void 0 : a.getScale(L))) || { x: 1, y: 1 },
              I = xs(a.convertOffsetParentRelativeRectToViewportRelativeRect ? yield a.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: R, offsetParent: L, strategy: u }) : R);
          return { top: (x.top - I.top + k.top) / N.y, bottom: (I.bottom - x.bottom + k.bottom) / N.y, left: (x.left - I.left + k.left) / N.x, right: (I.right - x.right + k.right) / N.x };
      });
  }
  ["top", "right", "bottom", "left"].reduce((e, t) => e.concat(t, t + "-start", t + "-end"), []);
  const sl = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function Ut(e) {
      return e.replace(/left|right|bottom|top/g, (t) => sl[t]);
  }
  function nl(e, t, s) {
      s === void 0 && (s = !1);
      const n = Ht(e),
          r = bs(e),
          a = Rn(r);
      let i = r === "x" ? (n === (s ? "end" : "start") ? "right" : "left") : n === "start" ? "bottom" : "top";
      return t.reference[a] > t.floating[a] && (i = Ut(i)), { main: i, cross: Ut(i) };
  }
  const rl = { start: "end", end: "start" };
  function Os(e) {
      return e.replace(/start|end/g, (t) => rl[t]);
  }
  const al = function (e) {
          return (
              e === void 0 && (e = {}),
              {
                  name: "flip",
                  options: e,
                  fn(s) {
                      return Ce(this, null, function* () {
                          var n;
                          const { placement: r, middlewareData: a, rects: i, initialPlacement: o, platform: u, elements: d } = s,
                              mt = e,
                              { mainAxis: _ = !0, crossAxis: c = !0, fallbackPlacements: m, fallbackStrategy: w = "bestFit", fallbackAxisSideDirection: k = "none", flipAlignment: S = !0 } = mt,
                              x = Xn(mt, ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "fallbackAxisSideDirection", "flipAlignment"]),
                              R = Be(r),
                              L = Be(o) === o,
                              N = yield u.isRTL == null ? void 0 : u.isRTL(d.floating),
                              I =
                                  m ||
                                  (L || !S
                                      ? [Ut(o)]
                                      : (function (V) {
                                            const se = Ut(V);
                                            return [Os(V), se, Os(se)];
                                        })(o));
                          m ||
                              k === "none" ||
                              I.push(
                                  ...(function (V, se, _e, le) {
                                      const ne = Ht(V);
                                      let G = (function (Re, Ze, Bt) {
                                          const _t = ["left", "right"],
                                              yt = ["right", "left"],
                                              qt = ["top", "bottom"],
                                              zt = ["bottom", "top"];
                                          switch (Re) {
                                              case "top":
                                              case "bottom":
                                                  return Bt ? (Ze ? yt : _t) : Ze ? _t : yt;
                                              case "left":
                                              case "right":
                                                  return Ze ? qt : zt;
                                              default:
                                                  return [];
                                          }
                                      })(Be(V), _e === "start", le);
                                      return ne && ((G = G.map((Re) => Re + "-" + ne)), se && (G = G.concat(G.map(Os)))), G;
                                  })(o, S, k, N)
                              );
                          const te = [o, ...I],
                              ze = yield tl(s, x),
                              Ne = [];
                          let Te = ((n = a.flip) == null ? void 0 : n.overflows) || [];
                          if ((_ && Ne.push(ze[R]), c)) {
                              const { main: V, cross: se } = nl(r, i, N);
                              Ne.push(ze[V], ze[se]);
                          }
                          if (((Te = [...Te, { placement: r, overflows: Ne }]), !Ne.every((V) => V <= 0))) {
                              var dt, ct;
                              const V = (((dt = a.flip) == null ? void 0 : dt.index) || 0) + 1,
                                  se = te[V];
                              if (se) return { data: { index: V, overflows: Te }, reset: { placement: se } };
                              let _e = (ct = Te.filter((le) => le.overflows[0] <= 0).sort((le, ne) => le.overflows[1] - ne.overflows[1])[0]) == null ? void 0 : ct.placement;
                              if (!_e)
                                  switch (w) {
                                      case "bestFit": {
                                          var ft;
                                          const le = (ft = Te.map((ne) => [ne.placement, ne.overflows.filter((G) => G > 0).reduce((G, Re) => G + Re, 0)]).sort((ne, G) => ne[1] - G[1])[0]) == null ? void 0 : ft[0];
                                          le && (_e = le);
                                          break;
                                      }
                                      case "initialPlacement":
                                          _e = o;
                                  }
                              if (r !== _e) return { reset: { placement: _e } };
                          }
                          return {};
                      });
                  },
              }
          );
      },
      il = function (e) {
          return (
              e === void 0 && (e = 0),
              {
                  name: "offset",
                  options: e,
                  fn(s) {
                      return Ce(this, null, function* () {
                          const { x: n, y: r } = s,
                              a = yield (function (i, o) {
                                  return Ce(this, null, function* () {
                                      const { placement: u, platform: d, elements: _ } = i,
                                          c = yield d.isRTL == null ? void 0 : d.isRTL(_.floating),
                                          m = Be(u),
                                          w = Ht(u),
                                          k = bs(u) === "x",
                                          S = ["left", "top"].includes(m) ? -1 : 1,
                                          x = c && k ? -1 : 1,
                                          R = typeof o == "function" ? o(i) : o;
                                      let { mainAxis: L, crossAxis: N, alignmentAxis: I } = typeof R == "number" ? { mainAxis: R, crossAxis: 0, alignmentAxis: null } : Q({ mainAxis: 0, crossAxis: 0, alignmentAxis: null }, R);
                                      return w && typeof I == "number" && (N = w === "end" ? -1 * I : I), k ? { x: N * x, y: L * S } : { x: L * S, y: N * x };
                                  });
                              })(s, e);
                          return { x: n + a.x, y: r + a.y, data: a };
                      });
                  },
              }
          );
      };
  function J(e) {
      var t;
      return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
  }
  function fe(e) {
      return J(e).getComputedStyle(e);
  }
  const Wn = Math.min,
      lt = Math.max,
      $t = Math.round;
  function Ln(e) {
      const t = fe(e);
      let s = parseFloat(t.width),
          n = parseFloat(t.height);
      const r = e.offsetWidth,
          a = e.offsetHeight,
          i = $t(s) !== r || $t(n) !== a;
      return i && ((s = r), (n = a)), { width: s, height: n, fallback: i };
  }
  function xe(e) {
      return Fn(e) ? (e.nodeName || "").toLowerCase() : "";
  }
  let Vt;
  function Pn() {
      if (Vt) return Vt;
      const e = navigator.userAgentData;
      return e && Array.isArray(e.brands) ? ((Vt = e.brands.map((t) => t.brand + "/" + t.version).join(" ")), Vt) : navigator.userAgent;
  }
  function me(e) {
      return e instanceof J(e).HTMLElement;
  }
  function oe(e) {
      return e instanceof J(e).Element;
  }
  function Fn(e) {
      return e instanceof J(e).Node;
  }
  function Nn(e) {
      return typeof ShadowRoot == "undefined" ? !1 : e instanceof J(e).ShadowRoot || e instanceof ShadowRoot;
  }
  function Gt(e) {
      const { overflow: t, overflowX: s, overflowY: n, display: r } = fe(e);
      return /auto|scroll|overlay|hidden|clip/.test(t + n + s) && !["inline", "contents"].includes(r);
  }
  function ol(e) {
      return ["table", "td", "th"].includes(xe(e));
  }
  function Ts(e) {
      const t = /firefox/i.test(Pn()),
          s = fe(e),
          n = s.backdropFilter || s.WebkitBackdropFilter;
      return (
          s.transform !== "none" ||
          s.perspective !== "none" ||
          (!!n && n !== "none") ||
          (t && s.willChange === "filter") ||
          (t && !!s.filter && s.filter !== "none") ||
          ["transform", "perspective"].some((r) => s.willChange.includes(r)) ||
          ["paint", "layout", "strict", "content"].some((r) => {
              const a = s.contain;
              return a != null && a.includes(r);
          })
      );
  }
  function Rs() {
      return /^((?!chrome|android).)*safari/i.test(Pn());
  }
  function Es(e) {
      return ["html", "body", "#document"].includes(xe(e));
  }
  function Cn(e) {
      return oe(e) ? e : e.contextElement;
  }
  const An = { x: 1, y: 1 };
  function qe(e) {
      const t = Cn(e);
      if (!me(t)) return An;
      const s = t.getBoundingClientRect(),
          { width: n, height: r, fallback: a } = Ln(t);
      let i = (a ? $t(s.width) : s.width) / n,
          o = (a ? $t(s.height) : s.height) / r;
      return (i && Number.isFinite(i)) || (i = 1), (o && Number.isFinite(o)) || (o = 1), { x: i, y: o };
  }
  function Fe(e, t, s, n) {
      var r, a;
      t === void 0 && (t = !1), s === void 0 && (s = !1);
      const i = e.getBoundingClientRect(),
          o = Cn(e);
      let u = An;
      t && (n ? oe(n) && (u = qe(n)) : (u = qe(e)));
      const d = o ? J(o) : window,
          _ = Rs() && s;
      let c = (i.left + ((_ && ((r = d.visualViewport) == null ? void 0 : r.offsetLeft)) || 0)) / u.x,
          m = (i.top + ((_ && ((a = d.visualViewport) == null ? void 0 : a.offsetTop)) || 0)) / u.y,
          w = i.width / u.x,
          k = i.height / u.y;
      if (o) {
          const S = J(o),
              x = n && oe(n) ? J(n) : n;
          let R = S.frameElement;
          for (; R && n && x !== S; ) {
              const L = qe(R),
                  N = R.getBoundingClientRect(),
                  I = getComputedStyle(R);
              (N.x += (R.clientLeft + parseFloat(I.paddingLeft)) * L.x), (N.y += (R.clientTop + parseFloat(I.paddingTop)) * L.y), (c *= L.x), (m *= L.y), (w *= L.x), (k *= L.y), (c += N.x), (m += N.y), (R = J(R).frameElement);
          }
      }
      return { width: w, height: k, top: m, right: c + w, bottom: m + k, left: c, x: c, y: m };
  }
  function Oe(e) {
      return ((Fn(e) ? e.ownerDocument : e.document) || window.document).documentElement;
  }
  function jt(e) {
      return oe(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
  }
  function In(e) {
      return Fe(Oe(e)).left + jt(e).scrollLeft;
  }
  function ut(e) {
      if (xe(e) === "html") return e;
      const t = e.assignedSlot || e.parentNode || (Nn(e) && e.host) || Oe(e);
      return Nn(t) ? t.host : t;
  }
  function Hn(e) {
      const t = ut(e);
      return Es(t) ? t.ownerDocument.body : me(t) && Gt(t) ? t : Hn(t);
  }
  function ht(e, t) {
      var s;
      t === void 0 && (t = []);
      const n = Hn(e),
          r = n === ((s = e.ownerDocument) == null ? void 0 : s.body),
          a = J(n);
      return r ? t.concat(a, a.visualViewport || [], Gt(n) ? n : []) : t.concat(n, ht(n));
  }
  function Un(e, t, s) {
      let n;
      if (t === "viewport")
          n = (function (i, o) {
              const u = J(i),
                  d = Oe(i),
                  _ = u.visualViewport;
              let c = d.clientWidth,
                  m = d.clientHeight,
                  w = 0,
                  k = 0;
              if (_) {
                  (c = _.width), (m = _.height);
                  const S = Rs();
                  (!S || (S && o === "fixed")) && ((w = _.offsetLeft), (k = _.offsetTop));
              }
              return { width: c, height: m, x: w, y: k };
          })(e, s);
      else if (t === "document")
          n = (function (i) {
              const o = Oe(i),
                  u = jt(i),
                  d = i.ownerDocument.body,
                  _ = lt(o.scrollWidth, o.clientWidth, d.scrollWidth, d.clientWidth),
                  c = lt(o.scrollHeight, o.clientHeight, d.scrollHeight, d.clientHeight);
              let m = -u.scrollLeft + In(i);
              const w = -u.scrollTop;
              return fe(d).direction === "rtl" && (m += lt(o.clientWidth, d.clientWidth) - _), { width: _, height: c, x: m, y: w };
          })(Oe(e));
      else if (oe(t))
          n = (function (i, o) {
              const u = Fe(i, !0, o === "fixed"),
                  d = u.top + i.clientTop,
                  _ = u.left + i.clientLeft,
                  c = me(i) ? qe(i) : { x: 1, y: 1 };
              return { width: i.clientWidth * c.x, height: i.clientHeight * c.y, x: _ * c.x, y: d * c.y };
          })(t, s);
      else {
          const i = Q({}, t);
          if (Rs()) {
              var r, a;
              const o = J(e);
              (i.x -= ((r = o.visualViewport) == null ? void 0 : r.offsetLeft) || 0), (i.y -= ((a = o.visualViewport) == null ? void 0 : a.offsetTop) || 0);
          }
          n = i;
      }
      return xs(n);
  }
  function $n(e, t) {
      return me(e) && fe(e).position !== "fixed" ? (t ? t(e) : e.offsetParent) : null;
  }
  function Vn(e, t) {
      const s = J(e);
      let n = $n(e, t);
      for (; n && ol(n) && fe(n).position === "static"; ) n = $n(n, t);
      return n && (xe(n) === "html" || (xe(n) === "body" && fe(n).position === "static" && !Ts(n)))
          ? s
          : n ||
                (function (r) {
                    let a = ut(r);
                    for (; me(a) && !Es(a); ) {
                        if (Ts(a)) return a;
                        a = ut(a);
                    }
                    return null;
                })(e) ||
                s;
  }
  function ll(e, t, s) {
      const n = me(t),
          r = Oe(t),
          a = Fe(e, !0, s === "fixed", t);
      let i = { scrollLeft: 0, scrollTop: 0 };
      const o = { x: 0, y: 0 };
      if (n || (!n && s !== "fixed"))
          if (((xe(t) !== "body" || Gt(r)) && (i = jt(t)), me(t))) {
              const u = Fe(t, !0);
              (o.x = u.x + t.clientLeft), (o.y = u.y + t.clientTop);
          } else r && (o.x = In(r));
      return { x: a.left + i.scrollLeft - o.x, y: a.top + i.scrollTop - o.y, width: a.width, height: a.height };
  }
  const ul = {
      getClippingRect: function (e) {
          let { element: t, boundary: s, rootBoundary: n, strategy: r } = e;
          const a =
                  s === "clippingAncestors"
                      ? (function (d, _) {
                            const c = _.get(d);
                            if (c) return c;
                            let m = ht(d).filter((x) => oe(x) && xe(x) !== "body"),
                                w = null;
                            const k = fe(d).position === "fixed";
                            let S = k ? ut(d) : d;
                            for (; oe(S) && !Es(S); ) {
                                const x = fe(S),
                                    R = Ts(S);
                                x.position === "fixed" ? (w = null) : (k ? R || w : R || x.position !== "static" || !w || !["absolute", "fixed"].includes(w.position)) ? (w = x) : (m = m.filter((L) => L !== S)), (S = ut(S));
                            }
                            return _.set(d, m), m;
                        })(t, this._c)
                      : [].concat(s),
              i = [...a, n],
              o = i[0],
              u = i.reduce((d, _) => {
                  const c = Un(t, _, r);
                  return (d.top = lt(c.top, d.top)), (d.right = Wn(c.right, d.right)), (d.bottom = Wn(c.bottom, d.bottom)), (d.left = lt(c.left, d.left)), d;
              }, Un(t, o, r));
          return { width: u.right - u.left, height: u.bottom - u.top, x: u.left, y: u.top };
      },
      convertOffsetParentRelativeRectToViewportRelativeRect: function (e) {
          let { rect: t, offsetParent: s, strategy: n } = e;
          const r = me(s),
              a = Oe(s);
          if (s === a) return t;
          let i = { scrollLeft: 0, scrollTop: 0 },
              o = { x: 1, y: 1 };
          const u = { x: 0, y: 0 };
          if ((r || (!r && n !== "fixed")) && ((xe(s) !== "body" || Gt(a)) && (i = jt(s)), me(s))) {
              const d = Fe(s);
              (o = qe(s)), (u.x = d.x + s.clientLeft), (u.y = d.y + s.clientTop);
          }
          return { width: t.width * o.x, height: t.height * o.y, x: t.x * o.x - i.scrollLeft * o.x + u.x, y: t.y * o.y - i.scrollTop * o.y + u.y };
      },
      isElement: oe,
      getDimensions: function (e) {
          return me(e) ? Ln(e) : e.getBoundingClientRect();
      },
      getOffsetParent: Vn,
      getDocumentElement: Oe,
      getScale: qe,
      getElementRects(e) {
          return Ce(this, null, function* () {
              let { reference: t, floating: s, strategy: n } = e;
              const r = this.getOffsetParent || Vn,
                  a = this.getDimensions;
              return { reference: ll(t, yield r(s), n), floating: Q({ x: 0, y: 0 }, yield a(s)) };
          });
      },
      getClientRects: (e) => Array.from(e.getClientRects()),
      isRTL: (e) => fe(e).direction === "rtl",
  };
  function hl(e, t, s, n) {
      n === void 0 && (n = {});
      const { ancestorScroll: r = !0, ancestorResize: a = !0, elementResize: i = !0, animationFrame: o = !1 } = n,
          u = r && !o,
          d = u || a ? [...(oe(e) ? ht(e) : e.contextElement ? ht(e.contextElement) : []), ...ht(t)] : [];
      d.forEach((w) => {
          u && w.addEventListener("scroll", s, { passive: !0 }), a && w.addEventListener("resize", s);
      });
      let _,
          c = null;
      if (i) {
          let w = !0;
          (c = new ResizeObserver(() => {
              w || s(), (w = !1);
          })),
              oe(e) && !o && c.observe(e),
              oe(e) || !e.contextElement || o || c.observe(e.contextElement),
              c.observe(t);
      }
      let m = o ? Fe(e) : null;
      return (
          o &&
              (function w() {
                  const k = Fe(e);
                  !m || (k.x === m.x && k.y === m.y && k.width === m.width && k.height === m.height) || s(), (m = k), (_ = requestAnimationFrame(w));
              })(),
          s(),
          () => {
              var w;
              d.forEach((k) => {
                  u && k.removeEventListener("scroll", s), a && k.removeEventListener("resize", s);
              }),
                  (w = c) == null || w.disconnect(),
                  (c = null),
                  o && cancelAnimationFrame(_);
          }
      );
  }
  const dl = (e, t, s) => {
      const n = new Map(),
          r = Q({ platform: ul }, s),
          a = Je(Q({}, r.platform), { _c: n });
      return Ko(e, t, Je(Q({}, r), { platform: a }));
  };
  class cl {
      constructor(t) {
          p(this, "options");
          p(this, "container");
          p(this, "dates");
          p(this, "months");
          p(this, "years");
          p(this, "nowDay");
          p(this, "nowMonth");
          p(this, "quickActions");
          p(this, "locale");
          (this.options = Object.assign(this, t)),
              (this.container = this.options.container),
              (this.dates = this.options.dates),
              (this.months = this.options.months),
              (this.years = this.options.years),
              (this.nowDay = this.options.nowDay),
              (this.nowMonth = this.options.nowMonth),
              (this.quickActions = this.options.quickActions),
              (this.locale = this.options.locale);
      }
      render() {
          var t, s, n, r, a, i, o, u, d, _, c;
          this.container.innerHTML += `<div class="calendarify">
  <div class="calendarify__quick-actions ${this.quickActions ? "" : "d-none"}">
    <button data-action="today">${(n = (s = (t = this.locale.lang) == null ? void 0 : t.ui) == null ? void 0 : s.quickActions) == null ? void 0 : n.today}</button>
    <button data-action="tomorrow">${(i = (a = (r = this.locale.lang) == null ? void 0 : r.ui) == null ? void 0 : a.quickActions) == null ? void 0 : i.tomorrow}</button>
    <button data-action="in-2-days">${(d = (u = (o = this.locale.lang) == null ? void 0 : o.ui) == null ? void 0 : u.quickActions) == null ? void 0 : d.inTwoDays}</button>
  </div>
  <nav class="calendarify__navigations">
    <ul>
      <li>
        <button data-action="prev" type="button"><i>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="15px" width="15px">
          <path fill="#ffffff" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
        </svg>
        </i></button>
      </li>
      <li>
        <button data-action="expand" type="button">-</button>
        <button data-action="year-range" class="d-none" type="button">-</button>
      </li>
      <li>
        <button data-action="next" type="button"><i>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="15px" width="15px">
            <path fill="#ffffff" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
        </i></button>
      </li>
    </ul>
  </nav>
  <div class="calendarify__calendar">
    <ul class="days-wrapper wrapper">
    ${(c = (_ = this.locale.lang) == null ? void 0 : _.weekdays) == null ? void 0 : c.map((m) => `<li>${m.slice(0, 3)}</li>`).join("")}
    </ul>
    <ul class="dates-wrapper wrapper">
        ${this.dates
            .map(
                (m) =>
                    `<li><button ${m.disabled ? "disabled" : ""} type="button" class="date-button ${this.getHolidayClass({ date: m.date, nowMonth: this.nowMonth })} ${this.nowDay == String(m.date) ? "active" : ""}">${
                        m.date
                    }</button></li>`
            )
            .join("")}
    </ul>
    <ul class="months-wrapper wrapper d-none">
      ${this.months
          .map((m, w) => {
              var x;
              const k = (x = this.locale.lang) == null ? void 0 : x.months[w].slice(0, 3),
                  S = l().format("M");
              return `<li><button class="${m == S ? "active" : ""}" data-date="${m}" type="button">${k}</button></li>`;
          })
          .join("")}
    </ul>
    <ul class="years-wrapper wrapper d-none">
      ${this.years.map((m) => `<li><button data-date="${m}" type="button">${m}</button></li>`).join("")}
    </ul>
  </div>
</div>`;
      }
      getHolidayClass(t) {
          const { nowMonth: s, date: n } = t,
              r = new Date(`${s}-${n}`).getDay(),
              a = r === 0,
              i = r === 6;
          let o = "";
          return a ? (o = "holiday") : i && (o = "pre-holiday"), o;
      }
  }
  class fl_light {
      constructor(t, s) {
          p(this, "options");
          p(this, "locale");
          p(this, "startDate");
          p(this, "accentColor", "#0090FC");
          p(this, "isDark", !1);
          p(this, "zIndex", 1e3);
          p(this, "customClass", []);
          p(this, "quickActions", !0);
          p(this, "onChange");
          p(this, "position", "bottom");
          p(this, "_container");
          p(this, "_calendarWrapper");
          p(this, "_datepickerInput");
          p(this, "_datesWrapperEl");
          p(this, "_monthsWrapperEl");
          p(this, "_yearsWrapperEl");
          p(this, "_months");
          p(this, "_dates");
          p(this, "_nowMonth");
          p(this, "_nowDay");
          p(this, "_nowYear");
          p(this, "_dateButtons");
          p(this, "_expandButton");
          p(this, "_prevButton");
          p(this, "_nextButton");
          p(this, "_date");
          p(this, "_isExpanded", !1);
          p(this, "_expandedMode", "months");
          p(this, "_outputDate");
          p(this, "_quickButtons");
          p(this, "_wrapperEls");
          p(this, "_yearRangeButton");
          p(this, "_systemFormat", "YYYY-MM-DD");
          p(this, "_helpers");
          p(this, "_inputSelector");
          p(this, "_wasExecuted", !1);
          p(this, "_isSetted", !1);
          var r, a, i, o, u, d, _, c, m, w, k, S, x, R, L, N, I, te, ze, Ne, Te, dt, ct, ft, mt, V, se, _e, le, ne, G, Re, Ze, Bt, _t, yt, qt, zt, Gn, jn, Bn, qn, zn, Zn;
          const n = document.documentElement;
          (this.options = Object.assign(this, s)),
              n.style.setProperty("--accentColor", (r = this.options.accentColor) != null ? r : this.accentColor),
              (this.onChange = this.options.onChange),
              (this._inputSelector = t),
              (this.locale = {
                  format: (o = (i = (a = this.options) == null ? void 0 : a.locale) == null ? void 0 : i.format) != null ? o : this._systemFormat,
                  lang: {
                      code: (c = (_ = (d = (u = this.options) == null ? void 0 : u.locale) == null ? void 0 : d.lang) == null ? void 0 : _.code) != null ? c : "en",
                      ui: {
                          quickActions: {
                              today:
                                  (R = (x = (S = (k = (w = (m = this.options) == null ? void 0 : m.locale) == null ? void 0 : w.lang) == null ? void 0 : k.ui) == null ? void 0 : S.quickActions) == null ? void 0 : x.today) != null
                                      ? R
                                      : "Today",
                              tomorrow:
                                  (Ne = (ze = (te = (I = (N = (L = this.options) == null ? void 0 : L.locale) == null ? void 0 : N.lang) == null ? void 0 : I.ui) == null ? void 0 : te.quickActions) == null ? void 0 : ze.tomorrow) != null
                                      ? Ne
                                      : "Tomorrow",
                              inTwoDays:
                                  (V = (mt = (ft = (ct = (dt = (Te = this.options) == null ? void 0 : Te.locale) == null ? void 0 : dt.lang) == null ? void 0 : ct.ui) == null ? void 0 : ft.quickActions) == null ? void 0 : mt.inTwoDays) !=
                                  null
                                      ? V
                                      : "In 2 Days",
                          },
                      },
                      months: (ne = (le = (_e = (se = this.options) == null ? void 0 : se.locale) == null ? void 0 : _e.lang) == null ? void 0 : le.months) != null ? ne : l.months(),
                      weekdays: (Bt = (Ze = (Re = (G = this.options) == null ? void 0 : G.locale) == null ? void 0 : Re.lang) == null ? void 0 : Ze.weekdays) != null ? Bt : l.weekdays(),
                  },
              }),
              (this.startDate = (_t = this.options.startDate) != null ? _t : l().format(this._systemFormat)),
              (this._date = (yt = this.options.startDate) != null ? yt : this.startDate),
              (this._months = []);
          for (let Ws = 0; Ws < 12; Ws++) this._months.push(String(Ws + 1));
          (this._nowMonth = l(this._date).format("YYYY-MM")),
              (this._nowDay = l(this._date).format("D")),
              (this._nowYear = l(this._date).format("YYYY")),
              (this._outputDate = l(this._date).format(this.locale.format)),
              (this._dates = []),
              this.loopDaysMonths(),
              (this._helpers = new cl({
                  container: (qt = document.querySelector(t)) == null ? void 0 : qt.parentElement,
                  dates: this._dates,
                  months: this._months,
                  years: this._years,
                  nowMonth: this._nowMonth,
                  nowDay: this._nowDay,
                  quickActions: this.options.quickActions,
                  locale: this.options.locale,
              })),
              this._helpers.render(),
              l.updateLocale((jn = (Gn = (zt = this.options) == null ? void 0 : zt.locale) == null ? void 0 : Gn.lang) == null ? void 0 : jn.code, {
                  months: (qn = (Bn = this.options.locale) == null ? void 0 : Bn.lang) == null ? void 0 : qn.months,
                  weekdays: (Zn = (zn = this.options.locale) == null ? void 0 : zn.lang) == null ? void 0 : Zn.weekdays,
              }),
              (this._container = document.querySelector(".calendarify")),
              (this._datepickerInput = document.querySelector(t)),
              (this._datesWrapperEl = this._container.querySelector(".dates-wrapper")),
              (this._monthsWrapperEl = this._container.querySelector(".months-wrapper")),
              (this._yearsWrapperEl = this._container.querySelector(".years-wrapper")),
              (this._expandButton = this._container.querySelector('.calendarify__navigations button[data-action="expand"]')),
              (this._dateButtons = this._container.querySelectorAll(".date-button")),
              (this._prevButton = this._container.querySelector('.calendarify__navigations button[data-action="prev"]')),
              (this._nextButton = this._container.querySelector('.calendarify__navigations button[data-action="next"]')),
              (this._calendarWrapper = this._container.querySelector(".calendarify__calendar")),
              (this._quickButtons = this._container.querySelectorAll(".quick-actions button")),
              (this._wrapperEls = this._calendarWrapper.querySelectorAll(".wrapper:not(:last-child, :nth-child(3))")),
              (this._yearRangeButton = this._container.querySelector('.calendarify__navigations button[data-action="year-range"]'));
      }
      init() {
          (l.suppressDeprecationWarnings = !0),
              this.showValue(),
              this._datepickerInput.value = "";
              this.changeState(),
              (this._datepickerInput.spellcheck = !1),
              (this._datepickerInput.autocomplete = "off"),
              this._datepickerInput.addEventListener("input", (t) => {
                  const s = t.target;
                  s.value = this._outputDate;
              }),
              this.stylingContainer(),
              this._prevButton.addEventListener("click", this.prevMonth.bind(this)),
              this._nextButton.addEventListener("click", this.nextMonth.bind(this)),
              this._expandButton.addEventListener("click", this.expand.bind(this)),
              this._datepickerInput.addEventListener("focus", () => {
                  (this._wasExecuted = !0), this._container.classList.add("show");
              }),
              window.addEventListener("click", this.hideOnOutsideClick.bind(this)),
              this._quickButtons.forEach((t) => t.addEventListener("click", this.quickAction.bind(this)));
      }
      stylingContainer() {
          var n, r, a;
          (n = this.options) != null && n.isDark && this._container.setAttribute("data-theme", "dark"),
              (r = this.options) != null && r.zIndex && this._container.style.setProperty("--z-index", String(this.options.zIndex)),
              (a = this.options) != null && a.customClass && this.customClass.forEach((i) => this._container.classList.add(i));
          const { _datepickerInput: t, _container: s } = this;
          hl(t, s, () => {
              dl(t, s, { placement: this.position, middleware: [il(10), al()] }).then(({ x: i, y: o }) => {
                  Object.assign(this._container.style, { top: `${o}px`, left: `${i}px` });
              });
          });
      }
      get _years() {
          const t = [],
              s = l(this._date),
              n = l(this._date).add(11, "y");
          for (; n.diff(s, "years") >= 0; ) t.push(s.format("YYYY")), s.add(1, "year");
          return t;
      }
      quickAction(t) {
          switch (t.target.getAttribute("data-action")) {
              case "today":
                  this._date = this.startDate;
                  break;
              case "tomorrow":
                  this._date = l(this.startDate).add(1, "days").format(this._systemFormat);
                  break;
              default:
                  this._date = l(this.startDate).add(2, "days").format(this._systemFormat);
                  break;
          }
          this.showValue(), this.changeState(), this.resetUI();
      }
      showValue() {
          (this._outputDate = l(this._date).format(this.locale.format)), (this._datepickerInput.value = this._outputDate);
      }
      hideOnOutsideClick(t) {
          const s = t.target;
          !s.closest(this._inputSelector) && !s.closest(".calendarify") && (this._container.classList.remove("show"), this.doneState(), (this._wasExecuted = !1));
      }
      expand() {
          (this._isExpanded = !0), (this._expandButton.textContent = l(this._date).format("YYYY")), this._wrapperEls.forEach((t) => t.classList.add("d-none")), this._monthsWrapperEl.classList.remove("d-none"), this.showMonths();
      }
      showMonths() {
          this._expandButton.classList.add("d-none"), this._yearRangeButton.classList.remove("d-none");
          const t = this._monthsWrapperEl.querySelectorAll("button");
          t.forEach((s) => s.addEventListener("click", (n) => this.changeMonth(n, t))), this._yearRangeButton.addEventListener("click", this.showYears.bind(this));
      }
      showYears() {
          (this._expandedMode = "years"),
              this._monthsWrapperEl.classList.add("d-none"),
              this._yearsWrapperEl.classList.remove("d-none"),
              (this._yearsWrapperEl.innerHTML = `${this._years.map((s) => `<li><button class="${s == this._nowYear ? "active" : ""}" data-date="${s}" type="button">${s}</button></li>`).join("")}`),
              this._yearsWrapperEl.querySelectorAll("button").forEach((s) => s.addEventListener("click", this.changeYear.bind(this))),
              this.changeState();
      }
      changeYear(t) {
          const n = t.target.getAttribute("data-date"),
              r = l(this._nowMonth).format("MM");
          (this._date = l(`${n}-${r}-${this._nowDay}`).format(this._systemFormat)),
              (this._nowYear = n),
              this._yearsWrapperEl.classList.add("d-none"),
              this._monthsWrapperEl.classList.remove("d-none"),
              (this._expandedMode = "months"),
              this.changeState();
      }
      changeMonth(t, s) {
          this._wrapperEls.forEach((o) => o.classList.remove("d-none")), s.forEach((o) => o.classList.remove("active"));
          const n = t.target,
              r = n.getAttribute("data-date"),
              a = l(this._date).format("YYYY"),
              i = l(new Date(`${a} ${r} ${this._nowDay}`));
          (this._date = l(i).format(this._systemFormat)), n.classList.add("active"), (this._isExpanded = !1), (this._expandedMode = "months"), this.changeState(), this.resetUI();
      }
      doneState() {
          this._container.classList.remove("show");
          const t = {
              date: { default: l(this._outputDate).toDate(), iso: l(this._outputDate).toISOString() },
              formatted: { relative: l(this._outputDate).fromNow(), calendar: l(this._outputDate).calendar() },
              unix: { seconds: l(this._outputDate).unix(), milliseconds: +l(this._outputDate) },
              locale: this.locale,
              partials: { day: l(this._outputDate).format("DD"), month: l(this._outputDate).format("MM"), year: l(this._outputDate).format("YYYY") },
          };
          this.resetUI();
          const { onChange: s, _wasExecuted: n, _isSetted: r } = this;
          s && n && r && (s(t), (this._isSetted = !1));
      }
      resetUI() {
          this._monthsWrapperEl.classList.add("d-none"),
              this._yearsWrapperEl.classList.add("d-none"),
              this._wrapperEls.forEach((t) => t.classList.remove("d-none")),
              (this._isExpanded = !1),
              this._monthsWrapperEl.classList.add("d-none"),
              this._yearsWrapperEl.classList.add("d-none"),
              this._expandButton.classList.remove("d-none"),
              this._yearRangeButton.classList.add("d-none"),
              this.changeState();
      }
      changeState() {
          var n, r;
          (this._dates = []), (this._nowMonth = l(this._date).format("YYYY-MM")), (this._nowDay = l(this._date).format("D")), this.loopDaysMonths();
          const t = l(this._nowMonth).format("M"),
              s = l(this._nowMonth).format("YYYY");
          switch (((this._expandButton.textContent = `${(n = this.locale.lang) == null ? void 0 : n.months[+t - 1]} ${s}`), this._expandedMode)) {
              case "years":
                  this._yearRangeButton.textContent = `${this._years[0]} - ${this._years[this._years.length - 1]}`;
                  break;
              default:
                  this._yearRangeButton.textContent = l(this._date).format("YYYY");
                  break;
          }
          if (
              (this.renderDates(),
              (this._dateButtons = this._datesWrapperEl.querySelectorAll(".date-button")),
              this._dateButtons.forEach((a) => a.addEventListener("click", this.setDate.bind(this))),
              this._expandedMode == "months" && this._dates.slice(0, 7).every((i) => i.disabled))
          )
              for (let i = 0; i < 7; i++) (r = this._dateButtons[i].parentElement) == null || r.classList.add("d-none");
      }
      loopDaysMonths() {
          const t = l(this._date).daysInMonth(),
              s = l(new Date(this._nowMonth)).isoWeekday(),
              n = l(this._date).subtract(1, "months").daysInMonth();
          for (let r = 1; r <= s; r++) this._dates.unshift({ disabled: !0, date: String(n + 1 - r) });
          for (let r = 1; r <= t; r++) this._dates.push({ disabled: !1, date: String(r) });
      }
      renderDates() {
          this._datesWrapperEl.innerHTML = `${this._dates
              .map(
                  (t) =>
                      `<li><button ${t.disabled ? "disabled" : ""} type="button" class="date-button ${this._helpers.getHolidayClass({ date: t.date, nowMonth: this._nowMonth })} ${this._nowDay == String(t.date) ? "active" : ""}">${
                          t.date
                      }</button></li>`
              )
              .join("")}`;
      }
      setDate(t) {
          this._isSetted = !0;
          const s = t.target;
          this._dateButtons.forEach((n) => n.classList.remove("active")),
              (this._nowDay = String(s.textContent)),
              (this._date = `${l(`${this._nowMonth}-${this._nowDay}`).format(this._systemFormat)}`),
              this.showValue(),
              s.classList.add("active");
      }
      prevMonth() {
          if (this._isExpanded)
              switch (this._expandedMode) {
                  case "months":
                      this._date = l(`${this._nowMonth}-${this._nowDay}`).subtract(1, "years").format(this._systemFormat);
                      break;
                  default:
                      (this._date = l(`${this._nowMonth}-${this._nowDay}`).subtract(10, "years").format(this._systemFormat)), this.showYears();
                      break;
              }
          else this._date = l(`${this._nowMonth}-${this._nowDay}`).subtract(1, "months").format(this._systemFormat);
          this.changeState();
      }
      nextMonth() {
          if (this._isExpanded)
              switch (this._expandedMode) {
                  case "months":
                      this._date = l(`${this._nowMonth}-${this._nowDay}`).add(1, "years").format(this._systemFormat);
                      break;
                  default:
                      (this._date = l(`${this._nowMonth}-${this._nowDay}`).add(10, "years").format(this._systemFormat)), this.showYears();
                      break;
              }
          else this._date = l(`${this._nowMonth}-${this._nowDay}`).add(1, "months").format(this._systemFormat);
          this.changeState();
      }
  }
  return fl_light;
})();
