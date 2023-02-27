var frontpage = function(e) {
var t = {};
function n(r) {
if (t[r]) return t[r].exports;
var i = t[r] = {
i: r,
l: !1,
exports: {}
};
return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
}
return n.m = e, n.c = t, n.d = function(e, t, r) {
n.o(e, t) || Object.defineProperty(e, t, {
enumerable: !0,
get: r
});
}, n.r = function(e) {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
value: "Module"
}), Object.defineProperty(e, "__esModule", {
value: !0
});
}, n.t = function(e, t) {
if (1 & t && (e = n(e)), 8 & t) return e;
if (4 & t && "object" == typeof e && e && e.__esModule) return e;
var r = Object.create(null);
if (n.r(r), Object.defineProperty(r, "default", {
enumerable: !0,
value: e
}), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function(t) {
return e[t];
}.bind(null, i));
return r;
}, n.n = function(e) {
var t = e && e.__esModule ? function() {
return e.default;
} : function() {
return e;
};
return n.d(t, "a", t), t;
}, n.o = function(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}, n.p = "/pack/", n(n.s = 5);
}([ function(e, t) {
e.exports = {
lang: "id",
localCurrency: "EUR",
shopCurrency: "EUR",
env: "production",
rateShopTo: void 0,
countryCode,
ordersMail: "orders@javascript.info",
providers: [ {
name: "Github",
id: "github"
}, {
name: "Discord",
id: "discord"
}, {
name: "Facebook",
id: "facebook"
}, {
name: "Google",
id: "google"
} ],
stripeKey: "pk_live_51HXm0nFjeNqw1p5a3mjFxSeNHh8OL94IyGcp3PHbZVoNuYUYjlM57YtZMIAM1zrEd1F6WIKfFs67KbTemRdNIySo00KfWS1yhr",
paypalClientId: "Ac86EanyVr7jcO5a_EwTK2vg1MGguuNX27jI4oC120g8xLMuAKmayooEcpc-mODQd4Gsmm7yqA1C7NM-",
lookatCodeUrlBase: "https://lookatcode.com"
};
}, function(e, t, n) {
"use strict";
const r = new (n(12))("en");
let i = console.error;
function a(e) {
return r.hasPhrase(o, e) || i("No such phrase", e), r.t(o, ...arguments);
}
e.exports = a;
const o = n(0).lang;
"en" !== o && r.setFallback(o, "en"), r.add = (...e) => r.addPhrase(o, ...e), a.i18n = r;
}, function(e, t, n) {
"use strict";
n.r(t), n.d(t, "init", (function() {
return a;
})), n.d(t, "Info", (function() {
return s;
})), n.d(t, "Warning", (function() {
return c;
})), n.d(t, "Success", (function() {
return u;
})), n.d(t, "Error", (function() {
return l;
}));
let r = n(10);
class i {
constructor(e = {}) {
this.notifications = [], this.verticalSpace = e.verticalSpace || 8;
}
register(e) {
this.notifications.unshift(e), setTimeout((() => this.recalculate()), 20);
}
unregister(e) {
let t = this.notifications.indexOf(e);
this.notifications.splice(t, 1), this.recalculate();
}
recalculate() {
let e = this.verticalSpace;
this.notifications.forEach((t => {
t.top = e, e += t.height + this.verticalSpace;
}));
}
}
function a(e) {
window.notificationManager || (window.notificationManager = new i(e));
}
class o {
constructor(e, t, n) {
let r = '<div class="notification notification_popup notification_'.concat(t, '">\n    <div class="notification__content">').concat(e, '</div>\n    <button title="Закрыть" class="notification__close"></button></div>');
switch (document.body.insertAdjacentHTML("beforeEnd", r), this.elem = document.body.lastElementChild, 
n) {
case void 0:
this.timeout = this.TIMEOUT_DEFAULT;
break;

case "slow":
this.timeout = this.TIMEOUT_SLOW;
break;

case "fast":
this.timeout = this.TIMEOUT_FAST;
break;

default:
this.timeout = n;
}
window.notificationManager.register(this), this.setupCloseHandler(), this.setupCloseTimeout();
}
get TIMEOUT_DEFAULT() {
return 3e3;
}
get TIMEOUT_SLOW() {
return 5e3;
}
get TIMEOUT_FAST() {
return 1500;
}
close() {
this.elem.parentNode && (this.elem.remove(), window.notificationManager.unregister(this));
}
setupCloseHandler() {
this.delegate(".notification__close", "click", (() => this.close()));
}
setupCloseTimeout() {
this.timeout && setTimeout((() => this.close()), this.timeout);
}
get height() {
return this.elem.offsetHeight;
}
set top(e) {
this.elem.style.transform = "translateY(" + e + "px)";
}
}
r.delegateMixin(o.prototype);
class s extends o {
constructor(e, t) {
super(e, "info", t);
}
}
class c extends o {
constructor(e, t) {
super(e, "warning", t);
}
}
class u extends o {
constructor(e, t) {
super(e, "success", t);
}
}
class l extends o {
constructor(e, t) {
super(e, "error", t);
}
get TIMEOUT_DEFAULT() {
return 5e3;
}
}
}, function(e, t, n) {
let r = n(4);
e.exports = class {
constructor(e) {
this.elem = e, this.renderPromise = new Promise(((e, t) => {
this.renderPromiseResolve = e, this.renderPromiseReject = t;
})), this.render();
}
async render() {
if (!window.RECAPTCHA_ID) return;
if (void 0 !== this.widgetId) return;
await r();
let e = document.createElement("div");
this.elem.append(e), this.widgetId = grecaptcha.render(e, {
sitekey: window.RECAPTCHA_ID,
size: "invisible",
callback: this.renderPromiseResolve
});
}
async execute() {
if (!window.RECAPTCHA_ID) return "";
await this.render();
let e = grecaptcha.getResponse(this.widgetId);
return e || (grecaptcha.execute(this.widgetId), this.renderPromise);
}
async validateForm(e) {
if (!window.RECAPTCHA_ID) return;
let t = await this.execute(), n = e.elements["g-recaptcha-response"];
n || (n = document.createElement("input"), n.name = "g-recaptcha-response", n.type = "hidden", 
e.append(n)), n.value = t;
}
};
}, function(e, t) {
let n;
e.exports = async function() {
if (window.RECAPTCHA_ID) return n || (n = new Promise(((e, t) => {
window.recaptchaCallback = e;
let n = document.createElement("script");
n.src = "https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit", 
n.onerror = t, document.head.appendChild(n);
})), n);
};
}, function(e, t, n) {
n(6), e.exports = n(26);
}, function(e, t, n) {
n(7).initNewsletterForm(), function() {
function e(e, t, n) {
let r = e.length;
for (;--r && window.scrollY + n < e[r].offsetTop; ) ;
t.forEach((e => e.classList.remove("active"))), t[r].classList.add("active");
}
document.addEventListener("click", (e => {
if (e.target.closest(".frontpage-content")) {
let t, n = e.target.closest(".tabs__menu-button");
if (!n) return;
e.preventDefault(), t = document.getElementsByClassName("tabs__menu-button"), document.querySelector(n.getAttribute("href")).scrollIntoView({
behavior: "smooth"
});
}
})), document.addEventListener("DOMContentLoaded", (() => {
const t = document.querySelectorAll(".tabs__content"), n = document.querySelector(".tabs__menu"), r = n.querySelectorAll(".tabs__menu-button");
new IntersectionObserver((e => {
e[0].target.classList.toggle("sticky", !e[0].isIntersecting);
}), {
rootMargin: "-".concat(n.offsetHeight + 1, "px"),
threshold: 0
}).observe(n), e(t, r, n.offsetHeight), window.addEventListener("scroll", (() => e(t, r, n.offsetHeight)));
}));
}();
}, function(e, t, n) {
const r = n(8), i = n(9), a = n(2), o = n(20), {Recaptcha: s} = n(22), c = n(1), u = n(0).lang;
function l(e, t) {
if (!e.elements.email.value) return;
const n = e.elements.slug;
let o, s = [ ...n.querySelectorAll("option:checked") ].map((e => e.value));
if (s.length || (s = n.value), e.elements["subscribe-email"] && (o = !0), !o && !s.length) return void new a.Error(c("newsletter.client.choose_newsletter"));
const u = {
email: e.elements.email.value,
slug: s
};
e.elements["g-recaptcha-response"] && (u["g-recaptcha-response"] = e.elements["g-recaptcha-response"].value), 
o && (u.replace = !0);
const l = i({
method: "POST",
url: e.action,
body: u
}), d = e.querySelector('[type="submit"]'), f = new r({
elem: d,
size: "small",
elemClass: "button_loading"
});
f.start(), d.disabled = !0, l.addEventListener("loadend", (() => {
f.stop(), d.disabled = !1;
})), l.addEventListener("success", (function(n) {
if (200 == this.status) {
new a.Success(n.result.message, "slow");
let r = e.elements.gaEvent && JSON.parse(e.elements.gaEvent.value);
r && window.ga("send", "event", r), t && t();
} else new a.Error(n.result.message);
}));
}
c.i18n.add("newsletter.client", n(24)("./" + u + ".yml")), t.initNewsletterForm = function() {
let e = document.querySelectorAll("[data-newsletter-subscribe-form]");
for (let t of e) {
const e = "hidden" === t.elements.email.type, n = t.querySelector(".multiselect");
if (n) {
const r = new o({
elem: n
}), i = t.querySelector('button[type="submit"]'), a = i.querySelector("span");
t.elements.slug && t.elements.slug.addEventListener("change", (() => {
i.disabled = !r.getValues().length && !e, !r.getValues().length && e ? a.textContent = c("site.subscribe.button_unsubscribe") : a.textContent = c("site.subscribe.button");
}));
}
let r = new s(t);
t.onsubmit = async function(e) {
e.preventDefault(), await r.validateForm(t), l(t);
};
}
}, t.submitSubscribeForm = l;
}, function(e, t) {
function n(e) {
if (e = e || {}, this.elem = e.elem, this.size = e.size || "medium", this.class = e.class ? " " + e.class : "", 
this.elemClass = e.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw new Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
n.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, n.prototype.stop = function() {
let e = this.elem.querySelector(".spinner");
e && (e.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, window.Spinner = n, e.exports = n;
}, function(e, t, n) {
let r = n(2), i = n(11);
const a = n(0).lang, o = n(1);
o.i18n.add("", n(16)("./" + a + ".yml")), o.i18n.add("error.network", n(18)("./" + a + ".yml")), 
document.addEventListener("xhrfail", (function(e) {
new r.Error(e.reason);
})), e.exports = function(e) {
let t = new XMLHttpRequest, n = e.method || "GET", r = e.body, a = e.url;
t.open(n, a, !e.sync), t.method = n;
let s = i();
s && !e.skipCsrf && t.setRequestHeader("X-XSRF-TOKEN", s), e.responseType && (t.responseType = e.responseType), 
"[object Object]" == {}.toString.call(r) && (t.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
r = JSON.stringify(r)), e.noDocumentEvents || (t.addEventListener("loadstart", (e => {
t.timeStart = Date.now();
let n = u("xhrstart", e);
document.dispatchEvent(n);
})), t.addEventListener("loadend", (e => {
let t = u("xhrend", e);
document.dispatchEvent(t);
})), t.addEventListener("success", (e => {
let t = u("xhrsuccess", e);
t.result = e.result, document.dispatchEvent(t);
})), t.addEventListener("fail", (e => {
let t = u("xhrfail", e);
t.reason = e.reason, document.dispatchEvent(t);
}))), e.raw || t.setRequestHeader("Accept", "application/json"), t.setRequestHeader("X-Requested-With", "XMLHttpRequest");
let c = e.normalStatuses || [ 200 ];
function u(e, t) {
let n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function l(e, n) {
let r = u("fail", n);
r.reason = e, t.dispatchEvent(r);
}
return t.addEventListener("error", (e => {
l(o("error.network.server_connection_error"), e);
})), t.addEventListener("timeout", (e => {
l(o("error.network.server_request_timeout"), e);
})), t.addEventListener("abort", (e => {
l(o("error.network.request_aborted"), e);
})), t.addEventListener("load", (n => {
if (!t.status) return void l(o("error.network.no_response"), n);
let r = e.responseType && "text" !== e.responseType ? t.response : t.responseText;
if ((t.getResponseHeader("Content-Type") || "").match(/^application\/json/) || e.json) try {
r = JSON.parse(r);
} catch (n) {
return void l(o("error.network.invalid_format"), n);
}
if (c.includes(t.status)) !function(e, n) {
let r = u("success", n);
r.result = e, t.dispatchEvent(r);
}(r, n); else {
l(r.info ? o("error.network.server_error_info", {
status: t.status,
info: r.info
}) : o("error.network.server_error", {
status: t.status
}), n);
}
})), setTimeout((function() {
t.send(r);
})), t;
};
}, function(e, t) {
function n(e, t, n, r, i) {
e.addEventListener(n, (function(e) {
let n = function(e, t) {
let n = e.target;
for (;n; ) {
if (n.matches(t)) return n;
if (n == e.currentTarget) break;
n = n.parentElement;
}
return null;
}(e, t);
e.delegateTarget = n, n && r.call(i || this, e);
}));
}
n.delegateMixin = function(e) {
e.delegate = function(e, t, r) {
n(this.elem, e, t, r, this);
};
}, e.exports = n;
}, function(e, t) {
e.exports = function() {
let e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
}, function(e, t, n) {
e.exports = n(13);
}, function(e, t, n) {
"use strict";
var r = n(14), i = n(15);
function a(e) {
return Object.prototype.toString.call(e);
}
function o(e) {
return "[object String]" === a(e);
}
function s(e) {
return !isNaN(e) && isFinite(e);
}
function c(e) {
return !0 === e || !1 === e;
}
function u(e) {
return "[object Object]" === a(e);
}
var l = Array.isArray || function(e) {
return "[object Array]" === a(e);
}, d = Array.prototype.forEach;
function f(e, t, n) {
if (null !== e) if (d && e.forEach === d) e.forEach(t, n); else if (e.length === +e.length) for (var r = 0, i = e.length; r < i; r += 1) t.call(n, e[r], r, e); else for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.call(n, e[a], a, e);
}
var p = /%[sdj%]/g;
function h(e) {
var t = 1, n = arguments, r = n.length, i = String(e).replace(p, (function(e) {
if ("%%" === e) return "%";
if (t >= r) return e;
switch (e) {
case "%s":
return String(n[t++]);

case "%d":
return Number(n[t++]);

case "%j":
return JSON.stringify(n[t++]);

default:
return e;
}
}));
return i;
}
function m(e) {
var t = {};
return f(e || {}, (function(e, n) {
e && "object" == typeof e ? f(m(e), (function(e, r) {
t[n + "." + r] = e;
})) : t[n] = e;
})), t;
}
var g = "#@$";
function v(e, t) {
return e + g + t;
}
function _(e, t, n) {
var r = v(t, n), i = e._storage;
if (i.hasOwnProperty(r)) return r;
if (t === e._defaultLocale) return null;
var a = e._fallbacks_cache;
if (a.hasOwnProperty(r)) return a[r];
for (var o, s = e._fallbacks[t] || [ e._defaultLocale ], c = 0, u = s.length; c < u; c++) if (o = v(s[c], n), 
i.hasOwnProperty(o)) return a[r] = o, a[r];
return a[r] = null, null;
}
function b(e, t, n) {
var r = i.indexOf(e, t);
return -1 === r ? h('[pluralizer for "%s" locale not found]', e) : void 0 === n[r] ? h('[plural form %d ("%s") not found in translation]', r, i.forms(e)[r]) : n[r];
}
function y(e) {
if (!(this instanceof y)) return new y(e);
this._defaultLocale = e ? String(e) : "en", this._fallbacks = {}, this._fallbacks_cache = {}, 
this._storage = {}, this._plurals_cache = {};
}
y.prototype.addPhrase = function(e, t, n, r) {
var i, a = this;
if (c(r)) i = r ? 1 / 0 : 0; else if (s(r)) {
if ((i = Math.floor(r)) < 0) throw new TypeError("Invalid flatten level (should be >= 0).");
} else i = 1 / 0;
if (u(n) && i > 0) return f(n, (function(n, r) {
a.addPhrase(e, (t ? t + "." : "") + r, n, i - 1);
})), this;
if (o(n)) this._storage[v(e, t)] = {
translation: n,
locale: e,
raw: !1
}; else {
if (!(l(n) || s(n) || c(n) || 0 === i && u(n))) throw new TypeError("Invalid translation - [String|Object|Array|Number|Boolean] expected.");
this._storage[v(e, t)] = {
translation: n,
locale: e,
raw: !0
};
}
return a._fallbacks_cache = {}, this;
}, y.prototype.setFallback = function(e, t) {
var n = this._defaultLocale;
if (n === e) throw new Error("Default locale can't have fallbacks");
var r = l(t) ? t.slice() : [ t ];
return r[r.length - 1] !== n && r.push(n), this._fallbacks[e] = r, this._fallbacks_cache = {}, 
this;
};
var k = /#\{|\(\(|\\\\/;
y.prototype.translate = function(e, t, n) {
var i, c = _(this, e, t);
return c ? (i = this._storage[c]).raw ? i.translation : (i.hasOwnProperty("compiled") || (i.compiled = function(e, t, n) {
var i, a, o, s, c, u;
return k.test(t) ? 1 === (i = r.parse(t)).length && "literal" === i[0].type ? i[0].text : (e._plurals_cache[n] || (e._plurals_cache[n] = new y(n)), 
u = e._plurals_cache[n], (a = []).push([ 'var str = "", strict, strict_exec, forms, forms_exec, plrl, cache, loc, loc_plzr, anchor;' ]), 
a.push("params = flatten(params);"), f(i, (function(e) {
if ("literal" !== e.type) {
if ("variable" === e.type) return o = e.anchor, void a.push(h('str += ("undefined" === typeof (params[%j])) ? "[missed variable: %s]" : params[%j];', o, o, o));
if ("plural" !== e.type) throw new Error("Unknown node type");
o = e.anchor, s = {}, f(e.strict, (function(t, i) {
var a = r.parse(t);
if (1 === a.length && "literal" === a[0].type) return s[i] = !1, void (e.strict[i] = a[0].text);
s[i] = !0, u.hasPhrase(n, t, !0) || u.addPhrase(n, t, t);
})), c = {}, f(e.forms, (function(t, i) {
var a, o = r.parse(t);
if (1 === o.length && "literal" === o[0].type) return a = o[0].text, e.forms[i] = a, 
void (c[a] = !1);
c[t] = !0, u.hasPhrase(n, t, !0) || u.addPhrase(n, t, t);
})), a.push(h("loc = %j;", n)), a.push(h("loc_plzr = %j;", n.split(/[-_]/)[0])), 
a.push(h("anchor = params[%j];", o)), a.push(h("cache = this._plurals_cache[loc];")), 
a.push(h("strict = %j;", e.strict)), a.push(h("strict_exec = %j;", s)), a.push(h("forms = %j;", e.forms)), 
a.push(h("forms_exec = %j;", c)), a.push("if (+(anchor) != anchor) {"), a.push(h('  str += "[invalid plurals amount: %s(" + anchor + ")]";', o)), 
a.push("} else {"), a.push("  if (strict[anchor] !== undefined) {"), a.push("    plrl = strict[anchor];"), 
a.push("    str += strict_exec[anchor] ? cache.t(loc, plrl, params) : plrl;"), a.push("  } else {"), 
a.push("    plrl = pluralizer(loc_plzr, +anchor, forms);"), a.push("    str += forms_exec[plrl] ? cache.t(loc, plrl, params) : plrl;"), 
a.push("  }"), a.push("}");
} else a.push(h("str += %j;", e.text));
})), a.push("return str;"), new Function("params", "flatten", "pluralizer", a.join("\n"))) : t;
}(this, i.translation, i.locale)), "[object Function]" !== a(i.compiled) ? i.compiled : ((s(n) || o(n)) && (n = {
count: n,
value: n
}), i.compiled.call(this, n, m, b))) : e + ": No translation for [" + t + "]";
}, y.prototype.hasPhrase = function(e, t, n) {
return n ? this._storage.hasOwnProperty(v(e, t)) : !!_(this, e, t);
}, y.prototype.getLocale = function(e, t, n) {
if (n) return this._storage.hasOwnProperty(v(e, t)) ? e : null;
var r = _(this, e, t);
return r ? r.split(g, 2)[0] : null;
}, y.prototype.t = y.prototype.translate, y.prototype.stringify = function(e) {
var t = this, n = {};
f(this._storage, (function(e, t) {
n[t.split(g)[1]] = !0;
}));
var r = {};
f(n, (function(n, i) {
var a = _(t, e, i);
if (a) {
var o = t._storage[a].locale;
r[o] || (r[o] = {}), r[o][i] = t._storage[a].translation;
}
}));
var i = {
fallback: {},
locales: r
}, a = (t._fallbacks[e] || []).slice(0, -1);
return a.length && (i.fallback[e] = a), JSON.stringify(i);
}, y.prototype.load = function(e) {
var t = this;
return o(e) && (e = JSON.parse(e)), f(e.locales, (function(e, n) {
f(e, (function(e, r) {
t.addPhrase(n, r, e, 0);
}));
})), f(e.fallback, (function(e, n) {
t.setFallback(n, e);
})), this;
}, e.exports = y;
}, function(e, t) {
e.exports = function() {
function e(e, t, n, r, i, a) {
this.message = e, this.expected = t, this.found = n, this.offset = r, this.line = i, 
this.column = a, this.name = "SyntaxError";
}
return function(e, t) {
function n() {
this.constructor = e;
}
n.prototype = t.prototype, e.prototype = new n;
}(e, Error), {
SyntaxError: e,
parse: function(t) {
var n, r = arguments.length > 1 ? arguments[1] : {}, i = {}, a = {
start: le
}, o = le, s = i, c = "((", u = {
type: "literal",
value: "((",
description: '"(("'
}, l = "))", d = {
type: "literal",
value: "))",
description: '"))"'
}, f = null, p = function(e, t) {
return {
type: "plural",
forms: ke(e),
strict: we(e),
anchor: t || "count"
};
}, h = "|", m = {
type: "literal",
value: "|",
description: '"|"'
}, g = function(e, t) {
return [ e ].concat(t);
}, v = function(e) {
return [ e ];
}, _ = "=", b = {
type: "literal",
value: "=",
description: '"="'
}, y = /^[0-9]/, k = {
type: "class",
value: "[0-9]",
description: "[0-9]"
}, w = " ", x = {
type: "literal",
value: " ",
description: '" "'
}, F = function(e, t) {
return {
strict: e.join(""),
text: t.join("")
};
}, E = function() {
return {
text: oe()
};
}, j = "\\", C = {
type: "literal",
value: "\\",
description: '"\\\\"'
}, A = /^[\\|)(]/, S = {
type: "class",
value: "[\\\\|)(]",
description: "[\\\\|)(]"
}, T = function(e) {
return e;
}, O = void 0, L = {
type: "any",
description: "any character"
}, P = function() {
return oe();
}, M = ":", q = {
type: "literal",
value: ":",
description: '":"'
}, D = function(e) {
return e;
}, N = "#{", R = {
type: "literal",
value: "#{",
description: '"#{"'
}, I = "}", z = {
type: "literal",
value: "}",
description: '"}"'
}, U = function(e) {
return {
type: "variable",
anchor: e
};
}, H = ".", K = {
type: "literal",
value: ".",
description: '"."'
}, B = function() {
return oe();
}, V = /^[a-zA-Z_$]/, J = {
type: "class",
value: "[a-zA-Z_$]",
description: "[a-zA-Z_$]"
}, $ = /^[a-zA-Z0-9_$]/, G = {
type: "class",
value: "[a-zA-Z0-9_$]",
description: "[a-zA-Z0-9_$]"
}, X = function(e) {
return e;
}, Z = function(e) {
return {
type: "literal",
text: e.join("")
};
}, W = /^[\\#()|]/, Y = {
type: "class",
value: "[\\\\#()|]",
description: "[\\\\#()|]"
}, Q = 0, ee = 0, te = 0, ne = {
line: 1,
column: 1,
seenCR: !1
}, re = 0, ie = [], ae = 0;
if ("startRule" in r) {
if (!(r.startRule in a)) throw new Error("Can't start parsing from rule \"" + r.startRule + '".');
o = a[r.startRule];
}
function oe() {
return t.substring(ee, Q);
}
function se(e) {
return te !== e && (te > e && (te = 0, ne = {
line: 1,
column: 1,
seenCR: !1
}), function(e, n, r) {
var i, a;
for (i = n; i < r; i++) "\n" === (a = t.charAt(i)) ? (e.seenCR || e.line++, e.column = 1, 
e.seenCR = !1) : "\r" === a || "\u2028" === a || "\u2029" === a ? (e.line++, e.column = 1, 
e.seenCR = !0) : (e.column++, e.seenCR = !1);
}(ne, te, e), te = e), ne;
}
function ce(e) {
Q < re || (Q > re && (re = Q, ie = []), ie.push(e));
}
function ue(n, r, i) {
var a = se(i), o = i < t.length ? t.charAt(i) : null;
return null !== r && function(e) {
var t = 1;
for (e.sort((function(e, t) {
return e.description < t.description ? -1 : e.description > t.description ? 1 : 0;
})); t < e.length; ) e[t - 1] === e[t] ? e.splice(t, 1) : t++;
}(r), new e(null !== n ? n : function(e, t) {
var n, r = new Array(e.length);
for (n = 0; n < e.length; n++) r[n] = e[n].description;
return "Expected " + (e.length > 1 ? r.slice(0, -1).join(", ") + " or " + r[e.length - 1] : r[0]) + " but " + (t ? '"' + function(e) {
function t(e) {
return e.charCodeAt(0).toString(16).toUpperCase();
}
return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, (function(e) {
return "\\x0" + t(e);
})).replace(/[\x10-\x1F\x80-\xFF]/g, (function(e) {
return "\\x" + t(e);
})).replace(/[\u0180-\u0FFF]/g, (function(e) {
return "\\u0" + t(e);
})).replace(/[\u1080-\uFFFF]/g, (function(e) {
return "\\u" + t(e);
}));
}(t) + '"' : "end of input") + " found.";
}(r, o), r, o, i, a.line, a.column);
}
function le() {
var e, t;
for (e = [], (t = be()) === i && (t = de()) === i && (t = ge()); t !== i; ) e.push(t), 
(t = be()) === i && (t = de()) === i && (t = ge());
return e;
}
function de() {
var e, n, r, a, o;
return e = Q, t.substr(Q, 2) === c ? (n = c, Q += 2) : (n = i, 0 === ae && ce(u)), 
n !== i && (r = fe()) !== i ? (t.substr(Q, 2) === l ? (a = l, Q += 2) : (a = i, 
0 === ae && ce(d)), a !== i ? ((o = me()) === i && (o = f), o !== i ? (ee = e, e = n = p(r, o)) : (Q = e, 
e = s)) : (Q = e, e = s)) : (Q = e, e = s), e;
}
function fe() {
var e, n, r, a;
return e = Q, (n = pe()) !== i ? (124 === t.charCodeAt(Q) ? (r = h, Q++) : (r = i, 
0 === ae && ce(m)), r !== i && (a = fe()) !== i ? (ee = e, e = n = g(n, a)) : (Q = e, 
e = s)) : (Q = e, e = s), e === i && (e = Q, (n = pe()) !== i && (ee = e, n = v(n)), 
e = n), e;
}
function pe() {
var e, n, r, a, o, c;
if (e = Q, 61 === t.charCodeAt(Q) ? (n = _, Q++) : (n = i, 0 === ae && ce(b)), n !== i) {
if (r = [], y.test(t.charAt(Q)) ? (a = t.charAt(Q), Q++) : (a = i, 0 === ae && ce(k)), 
a !== i) for (;a !== i; ) r.push(a), y.test(t.charAt(Q)) ? (a = t.charAt(Q), Q++) : (a = i, 
0 === ae && ce(k)); else r = s;
if (r !== i) if (32 === t.charCodeAt(Q) ? (a = w, Q++) : (a = i, 0 === ae && ce(x)), 
a === i && (a = f), a !== i) {
if (o = [], (c = he()) !== i) for (;c !== i; ) o.push(c), c = he(); else o = s;
o !== i ? (ee = e, e = n = F(r, o)) : (Q = e, e = s);
} else Q = e, e = s; else Q = e, e = s;
} else Q = e, e = s;
if (e === i) {
if (e = Q, n = [], (r = he()) !== i) for (;r !== i; ) n.push(r), r = he(); else n = s;
n !== i && (ee = e, n = E()), e = n;
}
return e;
}
function he() {
var e, n, r;
return e = Q, 92 === t.charCodeAt(Q) ? (n = j, Q++) : (n = i, 0 === ae && ce(C)), 
n !== i ? (A.test(t.charAt(Q)) ? (r = t.charAt(Q), Q++) : (r = i, 0 === ae && ce(S)), 
r !== i ? (ee = e, e = n = T(r)) : (Q = e, e = s)) : (Q = e, e = s), e === i && (e = Q, 
n = Q, ae++, 124 === t.charCodeAt(Q) ? (r = h, Q++) : (r = i, 0 === ae && ce(m)), 
r === i && (t.substr(Q, 2) === l ? (r = l, Q += 2) : (r = i, 0 === ae && ce(d))), 
ae--, r === i ? n = O : (Q = n, n = s), n !== i ? (t.length > Q ? (r = t.charAt(Q), 
Q++) : (r = i, 0 === ae && ce(L)), r !== i ? (ee = e, e = n = P()) : (Q = e, e = s)) : (Q = e, 
e = s)), e;
}
function me() {
var e, n, r;
return e = Q, 58 === t.charCodeAt(Q) ? (n = M, Q++) : (n = i, 0 === ae && ce(q)), 
n !== i && (r = ve()) !== i ? (ee = e, e = n = D(r)) : (Q = e, e = s), e;
}
function ge() {
var e, n, r, a;
return e = Q, t.substr(Q, 2) === N ? (n = N, Q += 2) : (n = i, 0 === ae && ce(R)), 
n !== i && (r = ve()) !== i ? (125 === t.charCodeAt(Q) ? (a = I, Q++) : (a = i, 
0 === ae && ce(z)), a !== i ? (ee = e, e = n = U(r)) : (Q = e, e = s)) : (Q = e, 
e = s), e;
}
function ve() {
var e, n, r, a;
if (e = Q, _e() !== i) if (46 === t.charCodeAt(Q) ? (n = H, Q++) : (n = i, 0 === ae && ce(K)), 
n !== i) {
if (r = [], (a = ve()) !== i) for (;a !== i; ) r.push(a), a = ve(); else r = s;
r !== i ? (ee = e, e = B()) : (Q = e, e = s);
} else Q = e, e = s; else Q = e, e = s;
return e === i && (e = _e()), e;
}
function _e() {
var e, n, r, a;
if (e = Q, V.test(t.charAt(Q)) ? (n = t.charAt(Q), Q++) : (n = i, 0 === ae && ce(J)), 
n !== i) {
for (r = [], $.test(t.charAt(Q)) ? (a = t.charAt(Q), Q++) : (a = i, 0 === ae && ce(G)); a !== i; ) r.push(a), 
$.test(t.charAt(Q)) ? (a = t.charAt(Q), Q++) : (a = i, 0 === ae && ce(G));
r !== i ? (ee = e, e = n = P()) : (Q = e, e = s);
} else Q = e, e = s;
return e;
}
function be() {
var e, t, n, r, a;
if (e = Q, t = [], n = Q, r = Q, ae++, (a = de()) === i && (a = ge()), ae--, a === i ? r = O : (Q = r, 
r = s), r !== i && (a = ye()) !== i ? (ee = n, n = r = X(a)) : (Q = n, n = s), n !== i) for (;n !== i; ) t.push(n), 
n = Q, r = Q, ae++, (a = de()) === i && (a = ge()), ae--, a === i ? r = O : (Q = r, 
r = s), r !== i && (a = ye()) !== i ? (ee = n, n = r = X(a)) : (Q = n, n = s); else t = s;
return t !== i && (ee = e, t = Z(t)), e = t;
}
function ye() {
var e, n, r;
return e = Q, 92 === t.charCodeAt(Q) ? (n = j, Q++) : (n = i, 0 === ae && ce(C)), 
n !== i ? (W.test(t.charAt(Q)) ? (r = t.charAt(Q), Q++) : (r = i, 0 === ae && ce(Y)), 
r !== i ? (ee = e, e = n = T(r)) : (Q = e, e = s)) : (Q = e, e = s), e === i && (t.length > Q ? (e = t.charAt(Q), 
Q++) : (e = i, 0 === ae && ce(L))), e;
}
function ke(e) {
for (var t = [], n = 0; n < e.length; n++) void 0 === e[n].strict && t.push(e[n].text);
return t;
}
function we(e) {
for (var t = {}, n = 0; n < e.length; n++) void 0 !== e[n].strict && (t[e[n].strict] = e[n].text);
return t;
}
if ((n = o()) !== i && Q === t.length) return n;
throw n !== i && Q < t.length && ce({
type: "end",
description: "end of input"
}), ue(null, ie, re);
}
};
}();
}, function(e, t, n) {
"use strict";
var r = {};
function i(e) {
var t;
return r[e] ? e : (t = e.toLowerCase().replace("_", "-"), r[t] ? t : (t = t.split("-")[0], 
r[t] ? t : null));
}
function a(e, t) {
var n = i(e);
if (!n) return -1;
if (!r[n].cFn) return 0;
var a = String(t), o = a.indexOf(".") < 0 ? "" : a.split(".")[1], s = o.length, c = +t, u = +a.split(".")[0], l = 0 === o.length ? 0 : +o.replace(/0+$/, "");
return r[n].cFn(c, u, s, +o, l);
}
function o(e, t) {
var n = i(e);
if (!n) return -1;
if (!r[n].oFn) return 0;
var a = String(t), o = a.indexOf(".") < 0 ? "" : a.split(".")[1], s = o.length, c = +t, u = +a.split(".")[0], l = 0 === o.length ? 0 : +o.replace(/0+$/, "");
return r[n].oFn(c, u, s, +o, l);
}
e.exports = function(e, t) {
var n = i(e);
return n ? r[n].c[a(n, t)] : null;
}, e.exports.indexOf = a, e.exports.forms = function(e) {
var t = i(e);
return r[t] ? r[t].c : null;
}, e.exports.ordinal = function(e, t) {
var n = i(e);
return r[n] ? r[n].o[o(n, t)] : null;
}, e.exports.ordinal.indexOf = o, e.exports.ordinal.forms = function(e) {
var t = i(e);
return r[t] ? r[t].o : null;
};
var s = [ "zero", "one", "two", "few", "many", "other" ];
function c(e) {
return s[e];
}
function u(e, t) {
var n;
for (t.c = t.c ? t.c.map(c) : [ "other" ], t.o = t.o ? t.o.map(c) : [ "other" ], 
n = 0; n < e.length; n++) r[e[n]] = t;
}
function l(e, t, n) {
return e <= n && n <= t && n % 1 == 0;
}
function d(e, t) {
return e.indexOf(t) >= 0;
}
u([ "af", "asa", "bem", "bez", "bg", "brx", "ce", "cgg", "chr", "ckb", "dv", "ee", "el", "eo", "es", "eu", "fo", "fur", "gsw", "ha", "haw", "jgo", "jmc", "kaj", "kcg", "kkj", "kl", "ks", "ksb", "ku", "ky", "lb", "lg", "mas", "mgo", "ml", "mn", "nah", "nb", "nd", "nn", "nnh", "no", "nr", "ny", "nyn", "om", "or", "os", "pap", "ps", "rm", "rof", "rwk", "saq", "sdh", "seh", "sn", "so", "ss", "ssy", "st", "syr", "ta", "te", "teo", "tig", "tk", "tn", "tr", "ts", "ug", "uz", "ve", "vo", "vun", "wae", "xh", "xog" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "ak", "bh", "guw", "ln", "mg", "nso", "pa", "ti", "wa" ], {
c: [ 1, 5 ],
cFn: function(e) {
return l(0, 1, e) ? 0 : 1;
}
}), u([ "am", "fa", "kn", "zu" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
}
}), u([ "ar", "ars" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(e) {
var t = e % 100;
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : l(3, 10, t) ? 3 : l(11, 99, t) ? 4 : 5;
}
}), u([ "as", "bn" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(e) {
return d([ 1, 5, 7, 8, 9, 10 ], e) ? 0 : d([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 6 === e ? 3 : 4;
}
}), u([ "ast", "de", "et", "fi", "fy", "gl", "ji", "nl", "sw", "ur", "yi" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
}
}), u([ "az" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 3, 4, 5 ],
oFn: function(e, t) {
var n = t % 10, r = t % 100, i = t % 1e3;
return d([ 1, 2, 5, 7, 8 ], n) || d([ 20, 50, 70, 80 ], r) ? 0 : d([ 3, 4 ], n) || d([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], i) ? 1 : 0 === t || 6 === n || d([ 40, 60, 90 ], r) ? 2 : 3;
}
}), u([ "be" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, n = e % 100;
return 1 === t && 11 !== n ? 0 : l(2, 4, t) && !l(12, 14, n) ? 1 : 0 === t || l(5, 9, t) || l(11, 14, n) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
var t = e % 100;
return d([ 2, 3 ], e % 10) && !d([ 12, 13 ], t) ? 0 : 1;
}
}), u([ "bm", "bo", "dz", "id", "ig", "ii", "in", "ja", "jbo", "jv", "jw", "kde", "kea", "km", "ko", "lkt", "my", "nqo", "root", "sah", "ses", "sg", "th", "to", "wo", "yo", "yue", "zh" ], {}), 
u([ "br" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
var t = e % 10, n = e % 100, r = e % 1e6;
return 1 !== t || d([ 11, 71, 91 ], n) ? 2 !== t || d([ 12, 72, 92 ], n) ? !l(3, 4, t) && 9 !== t || l(10, 19, n) || l(70, 79, n) || l(90, 99, n) ? 0 !== e && 0 === r ? 3 : 4 : 2 : 1 : 0;
}
}), u([ "bs", "hr", "sh", "sr" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, n, r) {
var i = t % 10, a = t % 100, o = r % 10, s = r % 100;
return 0 === n && 1 === i && 11 !== a || 1 === o && 11 !== s ? 0 : 0 === n && l(2, 4, i) && !l(12, 14, a) || l(2, 4, o) && !l(12, 14, s) ? 1 : 2;
}
}), u([ "ca" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
return d([ 1, 3 ], e) ? 0 : 2 === e ? 1 : 4 === e ? 2 : 3;
}
}), u([ "cs", "sk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : l(2, 4, t) && 0 === n ? 1 : 0 !== n ? 2 : 3;
}
}), u([ "cy" ], {
c: [ 0, 1, 2, 3, 4, 5 ],
cFn: function(e) {
return 0 === e ? 0 : 1 === e ? 1 : 2 === e ? 2 : 3 === e ? 3 : 6 === e ? 4 : 5;
},
o: [ 0, 1, 2, 3, 4, 5 ],
oFn: function(e) {
return d([ 0, 7, 8, 9 ], e) ? 0 : 1 === e ? 1 : 2 === e ? 2 : d([ 3, 4 ], e) ? 3 : d([ 5, 6 ], e) ? 4 : 5;
}
}), u([ "da" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r, i) {
return 1 === e || 0 !== i && d([ 0, 1 ], t) ? 0 : 1;
}
}), u([ "dsb", "hsb" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, n, r) {
var i = t % 100, a = r % 100;
return 0 === n && 1 === i || 1 === a ? 0 : 0 === n && 2 === i || 2 === a ? 1 : 0 === n && l(3, 4, i) || l(3, 4, a) ? 2 : 3;
}
}), u([ "en" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
var t = e % 10, n = e % 100;
return 1 === t && 11 !== n ? 0 : 2 === t && 12 !== n ? 1 : 3 === t && 13 !== n ? 2 : 3;
}
}), u([ "ff", "kab" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return d([ 0, 1 ], t) ? 0 : 1;
}
}), u([ "fil", "tl" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
var i = t % 10, a = r % 10;
return 0 === n && d([ 1, 2, 3 ], t) || 0 === n && !d([ 4, 6, 9 ], i) || 0 !== n && !d([ 4, 6, 9 ], a) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "fr", "hy" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return d([ 0, 1 ], t) ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "ga" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 2 === e ? 1 : l(3, 6, e) ? 2 : l(7, 10, e) ? 3 : 4;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "gd" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e) {
return d([ 1, 11 ], e) ? 0 : d([ 2, 12 ], e) ? 1 : l(3, 10, e) || l(13, 19, e) ? 2 : 3;
}
}), u([ "gu", "hi" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 4, 5 ],
oFn: function(e) {
return 1 === e ? 0 : d([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 6 === e ? 3 : 4;
}
}), u([ "gv" ], {
c: [ 1, 2, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && d([ 0, 20, 40, 60, 80 ], t % 100) ? 2 : 0 !== n ? 3 : 4;
}
}), u([ "he", "iw" ], {
c: [ 1, 2, 4, 5 ],
cFn: function(e, t, n) {
var r = e % 10;
return 1 === t && 0 === n ? 0 : 2 === t && 0 === n ? 1 : 0 !== n || l(0, 10, e) || 0 !== r ? 3 : 2;
}
}), u([ "hu" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return d([ 1, 5 ], e) ? 0 : 1;
}
}), u([ "is" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r, i) {
return 0 === i && 1 === t % 10 && 11 !== t % 100 || 0 !== i ? 0 : 1;
}
}), u([ "it" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(e) {
return d([ 11, 8, 80, 800 ], e) ? 0 : 1;
}
}), u([ "iu", "kw", "naq", "se", "sma", "smi", "smj", "smn", "sms" ], {
c: [ 1, 2, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 2 === e ? 1 : 2;
}
}), u([ "ka" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(e, t) {
var n = t % 100;
return 1 === t ? 0 : 0 === t || l(2, 20, n) || 40 === n || 60 === n || 80 === n ? 1 : 2;
}
}), u([ "kk" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 4, 5 ],
oFn: function(e) {
var t = e % 10;
return 6 === t || 9 === t || 0 === t && 0 !== e ? 0 : 1;
}
}), u([ "ksh" ], {
c: [ 0, 1, 5 ],
cFn: function(e) {
return 0 === e ? 0 : 1 === e ? 1 : 2;
}
}), u([ "lag" ], {
c: [ 0, 1, 5 ],
cFn: function(e, t) {
return 0 === e ? 0 : d([ 0, 1 ], t) && 0 !== e ? 1 : 2;
}
}), u([ "lo", "ms", "vi" ], {
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "lt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n, r) {
var i = e % 10, a = e % 100;
return 1 !== i || l(11, 19, a) ? l(2, 9, i) && !l(11, 19, a) ? 1 : 0 !== r ? 2 : 3 : 0;
}
}), u([ "lv", "prg" ], {
c: [ 0, 1, 5 ],
cFn: function(e, t, n, r) {
var i = e % 10, a = e % 100, o = r % 100, s = r % 10;
return 0 === i || l(11, 19, a) || 2 === n && l(11, 19, o) ? 0 : 1 === i && 11 !== a || 2 === n && 1 === s && 11 !== o || 2 !== n && 1 === s ? 1 : 2;
}
}), u([ "mk" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
return 0 === n && 1 === t % 10 || 1 === r % 10 ? 0 : 1;
},
o: [ 1, 2, 4, 5 ],
oFn: function(e, t) {
var n = t % 10, r = t % 100;
return 1 === n && 11 !== r ? 0 : 2 === n && 12 !== r ? 1 : d([ 7, 8 ], n) && !d([ 17, 18 ], r) ? 2 : 3;
}
}), u([ "mo", "ro" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 0 !== n || 0 === e || 1 !== e && l(1, 19, e % 100) ? 1 : 2;
},
o: [ 1, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 1;
}
}), u([ "mr" ], {
c: [ 1, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : 1;
},
o: [ 1, 2, 3, 5 ],
oFn: function(e) {
return 1 === e ? 0 : d([ 2, 3 ], e) ? 1 : 4 === e ? 2 : 3;
}
}), u([ "mt" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e) {
var t = e % 100;
return 1 === e ? 0 : 0 === e || l(2, 10, t) ? 1 : l(11, 19, t) ? 2 : 3;
}
}), u([ "ne" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
return l(1, 4, e) ? 0 : 1;
}
}), u([ "pl" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, i = t % 100;
return 1 === t && 0 === n ? 0 : 0 === n && l(2, 4, r) && !l(12, 14, i) ? 1 : 0 === n && 1 !== t && l(0, 1, r) || 0 === n && l(5, 9, r) || 0 === n && l(12, 14, i) ? 2 : 3;
}
}), u([ "pt" ], {
c: [ 1, 5 ],
cFn: function(e) {
return l(0, 2, e) && 2 !== e ? 0 : 1;
}
}), u([ "pt-pt" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === e && 0 === n ? 0 : 1;
}
}), u([ "ru" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, i = t % 100;
return 0 === n && 1 === r && 11 !== i ? 0 : 0 === n && l(2, 4, r) && !l(12, 14, i) ? 1 : 0 === n && 0 === r || 0 === n && l(5, 9, r) || 0 === n && l(11, 14, i) ? 2 : 3;
}
}), u([ "shi" ], {
c: [ 1, 3, 5 ],
cFn: function(e, t) {
return 0 === t || 1 === e ? 0 : l(2, 10, e) ? 1 : 2;
}
}), u([ "si" ], {
c: [ 1, 5 ],
cFn: function(e, t, n, r) {
return d([ 0, 1 ], e) || 0 === t && 1 === r ? 0 : 1;
}
}), u([ "sl" ], {
c: [ 1, 2, 3, 5 ],
cFn: function(e, t, n) {
var r = t % 100;
return 0 === n && 1 === r ? 0 : 0 === n && 2 === r ? 1 : 0 === n && l(3, 4, r) || 0 !== n ? 2 : 3;
}
}), u([ "sq" ], {
c: [ 1, 5 ],
cFn: function(e) {
return 1 === e ? 0 : 1;
},
o: [ 1, 4, 5 ],
oFn: function(e) {
return 1 === e ? 0 : 4 === e % 10 && 14 !== e % 100 ? 1 : 2;
}
}), u([ "sv" ], {
c: [ 1, 5 ],
cFn: function(e, t, n) {
return 1 === t && 0 === n ? 0 : 1;
},
o: [ 1, 5 ],
oFn: function(e) {
var t = e % 100;
return d([ 1, 2 ], e % 10) && !d([ 11, 12 ], t) ? 0 : 1;
}
}), u([ "tzm" ], {
c: [ 1, 5 ],
cFn: function(e) {
return l(0, 1, e) || l(11, 99, e) ? 0 : 1;
}
}), u([ "uk" ], {
c: [ 1, 3, 4, 5 ],
cFn: function(e, t, n) {
var r = t % 10, i = t % 100;
return 0 === n && 1 === r && 11 !== i ? 0 : 0 === n && l(2, 4, r) && !l(12, 14, i) ? 1 : 0 === n && 0 === r || 0 === n && l(5, 9, r) || 0 === n && l(11, 14, i) ? 2 : 3;
},
o: [ 3, 5 ],
oFn: function(e) {
return 3 === e % 10 && 13 !== e % 100 ? 0 : 1;
}
});
}, function(e, t, n) {
var r = {
"./id.yml": 17
};
function i(e) {
var t = a(e);
return n(t);
}
function a(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
i.keys = function() {
return Object.keys(r);
}, i.resolve = a, e.exports = i, i.id = 16;
}, function(e, t) {
e.exports = {
site: {
privacy_policy: "kebijakan privasi",
terms: "ketentuan penggunaan",
banner_bottom: 'Tingkatkan keterampilan Anda dengan mengunjungi <a href="https://frontendmasters.com/learn/javascript/?utm_source=website&utm_medium=jsinfo&utm_campaign=jsinfo">kursus video tentang JavaScript dan Framework terkait</a>.',
action_required: "Diperlukan tindakan",
gdpr_dialog: {
title: "Situs web ini menggunakan cookie",
text: 'Kami menggunakan teknologi browser seperti cookie dan penyimpanan lokal untuk menyimpan preferensi Anda. Anda harus menerima <a href="/privacy">Kebijakan Privasi</a> dan <a href="/terms">Ketentuan Penggunaan</a> kami agar kami dapat melakukannya.',
accept: "Terima",
cancel: "Batal"
},
theme: {
light: "Light theme",
dark: "Dark theme",
change: "Change theme"
},
toolbar: {
lang_switcher: {
cta_text: '<p>Kami ingin membuat proyek open source ini tersedia untuk orang-orang di seluruh dunia.</p>\n <p><a href="https://javascript.info/translate">Bantu untuk menerjemahkan</a> konten tutorial ini ke bahasa Anda!</p>\n',
footer_text: "berapa banyak konten yang diterjemahkan ke bahasa yang sesuai",
old_version: "Versi lama diterbitkan, perlu dukungan."
},
logo: {
normal: {
svg: "sitetoolbar__logo_en.svg",
width: 200
},
"normal-white": {
svg: "sitetoolbar__logo_en-white.svg"
},
small: {
svg: "sitetoolbar__logo_small_en.svg",
width: 70
},
"small-white": {
svg: "sitetoolbar__logo_small_en-white.svg"
}
},
sections: null,
buy_ebook_extra: "Beli",
buy_ebook: "EPUB/PDF",
search_placeholder: "Cari pada Javascript.info",
search_button: "Cari",
public_profile: "Profil publik",
account: "Akun",
notifications: "Notifikasi",
admin: "Admin",
logout: "Logout"
},
sorry_old_browser: "Maaf, Internet Explorer tidak didukung, harap gunakan browser yang lebih baru.",
contact_us: "hubungi kami",
about_the_project: "terkait proyek",
ilya_kantor: "Ilya Kantor",
comments: "komentar",
loading: "Memuat...",
search: "Cari",
share: "Bagikan",
read_before_commenting: "baca ini sebelum berkomentar…",
last_updated_at: "Terakhir diperbarui pada #{date}",
meta: {
description: "Tutorial JavaScript Modern: penjelasan sederhana, namun terperinci dengan contoh dan soal, termasuk: closure, document dan events, pemrograman OOP dan banyak lagi."
},
"tablet-menu": {
choose_section: "Pilih bagian",
search_placeholder: "Cari di tutorial",
search_button: "Cari"
},
comment: {
help: [ 'Jika Anda memiliki saran apa yang harus ditingkatkan - silakan kunjungi <a href="https://github.com/javascript-tutorial/en.javascript.info/issues/new">kirimkan Github issue</a> atau pull request sebagai gantinya berkomentar.', "Jika Anda tidak dapat memahami sesuatu dalam artikel – harap jelaskan.", "Untuk menyisipkan beberapa kata kode, gunakan tag <code>&lt;code&gt;</code>, untuk beberapa baris – bungkus dengan tag <code>&lt;pre&gt;</code>, untuk lebih dari 10 baris – gunakan sandbox (<a href='https://plnkr.co/edit/?p=preview'>plnkr</a>, <a href='https://jsbin.com'>jsbin</a>, < a href='http://codepen.io'>codepen</a>…)" ]
},
edit_on_github: "Sunting di GitHub",
error: "eror",
close: "tutup",
hide_forever: "sembunyikan secara permanen",
hidden_forever: "Informasi ini tidak akan muncul lagi.",
subscribe: {
title: "Perhatikan update pada javascript.info",
text: "Kami tidak mengirim iklan, hanya hal-hal yang relevan. Anda memilih apa yang akan diterima:",
agreement: 'Dengan mendaftar ke buletin, Anda menyetujui <a href="#{link}" target="_blank">persyaratan penggunaan</a>.',
button: "Berlangganan",
button_unsubscribe: "Berhenti berlangganan dari semua",
common_updates: "Pembaruan umum",
common_updates_text: "kursus baru, kelas master, artikel, dan rilis screencast",
your_email: "your@email.here",
newsletters: "buletin, buletin, buletin",
no_selected: "Tidak ada yang dipilih"
},
form: {
value_must_not_be_empty: "Nilai wajib diisi.",
value_is_too_long: "Nilai terlalu panjang.",
value_is_too_short: "Nilai terlalu pendek.",
invalid_email: "Email tidak valid.",
invalid_value: "Nilai tidak valid.",
invalid_autocomplete: "Silakan, pilih dari daftar",
invalid_date: "Tanggal tidak valid, format: dd.mm.yyyy.",
invalid_range: "Tanggal ini tidak valid di sini.",
save: "Simpan",
upload_file: "Upload file",
cancel: "Batal",
server_error: "Kesalahan permintaan, kode status"
}
}
};
}, function(e, t, n) {
var r = {
"./id.yml": 19
};
function i(e) {
var t = a(e);
return n(t);
}
function a(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
i.keys = function() {
return Object.keys(r);
}, i.resolve = a, e.exports = i, i.id = 18;
}, function(e, t) {
e.exports = {
server_connection_error: "Koneksi server eror.",
server_request_timeout: "Server request timeout.",
request_aborted: "Permintaan dibatalkan.",
no_response: "Tidak ada tanggapan dari server.",
server_error: "Server error (kode #{status}), coba lagi nanti.",
invalid_format: "Invalid response format."
};
}, function(e, t, n) {
const r = n(1), i = n(21);
e.exports = class {
constructor(e) {
this.elem = e.elem, this.select = this.elem.querySelector("select"), this.textContainer = this.elem.querySelector(".multiselect__active-button"), 
this.options = [ ...this.select.querySelectorAll("option") ], this.defaultValue = this.textContainer.textContent, 
this.status = "closed", this.elem.querySelector(".multiselect__container").insertAdjacentHTML("beforeend", this.createDropdown()), 
this.setButtonTitle(), this.bindHandlers();
}
createDropdown() {
return "\n      <div class='multiselect__dropdown-container'>\n        <div class='multiselect__dropdown'>\n          ".concat(this.options.map((e => "<div class='multiselect__item".concat(e.selected ? " multiselect__item_checked" : "", "' data-value='").concat(e.value, "'>\n                <span class='multiselect__item-title'>").concat(e.textContent + ("advanced" === e.value ? "<span class='multiselect__greyed-text'>".concat(r("site.subscribe.common_updates_text"), "</span>") : ""), "</span>\n              </div>"))).join(""), "\n        </div>\n      </div>\n    ");
}
bindHandlers() {
this.textContainer.addEventListener("click", this.toggleDropdown.bind(this));
for (let e of this.elem.querySelectorAll(".multiselect__item")) e.addEventListener("click", this.onChange.bind(this));
this.select.addEventListener("change", this.setButtonTitle.bind(this));
}
toggleDropdown(e) {
e.stopPropagation(), this.elem.classList.toggle("multiselect_opened"), this.toggleStatus(), 
"opened" === this.status && (this.boundCloseDropdown = this.closeDropdown.bind(this), 
document.addEventListener("click", this.boundCloseDropdown));
}
toggleStatus() {
"closed" === this.status ? this.status = "opened" : this.status = "closed";
}
closeDropdown(e) {
e.target.closest(".multiselect__dropdown-container") || (this.status = "closed", 
this.elem.classList.remove("multiselect_opened"), document.removeEventListener("click", this.boundCloseDropdown));
}
onChange(e) {
const t = e.target.closest(".multiselect__item");
t.classList.toggle("multiselect__item_checked");
this.options.filter((e => e.value === t.getAttribute("data-value"))).pop().selected = t.classList.contains("multiselect__item_checked"), 
this.select.dispatchEvent(new Event("change"));
}
setButtonTitle() {
const e = this.getValues();
1 === e.length && e.includes("advanced") ? this.textContainer.textContent = this.defaultValue : e.length ? this.textContainer.textContent = e.length + " " + i(e.length, r("site.subscribe.newsletters")) : this.textContainer.textContent = r("site.subscribe.no_selected");
}
getValues() {
return this.options.filter((e => e.selected)).map((e => e.value));
}
};
}, function(e, t) {
e.exports = function(e, t) {
var n, r = (n = e) % 10 == 1 && n % 100 != 11 ? "one" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) && n == Math.floor(n) ? "few" : n % 10 == 0 || n % 10 >= 5 && n % 10 <= 9 || n % 100 >= 11 && n % 100 <= 14 && n == Math.floor(n) ? "many" : "other", i = t.split(",");
switch (r) {
case "one":
return i[0];

case "few":
return i[1];

case "many":
return i[2];

default:
throw new Error("Unsupported count: " + e);
}
};
}, function(e, t, n) {
t.Recaptcha = n(3), t.initForms = n(23);
}, function(e, t, n) {
let r = n(4), i = n(3);
e.exports = async function() {
let e = document.querySelectorAll("[data-recaptcha-submit]");
if (e.length) {
for (let t of e) t.disabled = !0;
await r();
for (let t of e) {
let e = t.form, n = new i(e);
e.onsubmit = async t => {
t.preventDefault(), await n.validateForm(e), e.checkValidity() ? e.submit() : e.reportValidity();
}, t.disabled = !1;
}
}
};
}, function(e, t, n) {
var r = {
"./id.yml": 25
};
function i(e) {
var t = a(e);
return n(t);
}
function a(e) {
var t = r[e];
if (!(t + 1)) {
var n = new Error("Cannot find module '" + e + "'");
throw n.code = "MODULE_NOT_FOUND", n;
}
return t;
}
i.keys = function() {
return Object.keys(r);
}, i.resolve = a, e.exports = i, i.id = 24;
}, function(e, t) {
e.exports = {
choose_newsletter: "Pilih buletin dalam daftar.",
email_please: "Email kamu?"
};
}, function(e, t, n) {} ]);
//# sourceMappingURL=frontpage.1abfd5a647328460d1b0.js.map