(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,n){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===e(i)?i:String(i)),o)}var i}var n=function(){function e(t){var n=t.link,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._link=n,this._headers=r}var n,r;return n=e,(r=[{key:"_serverResponceProcessing",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"addNewCard",value:function(e){var t=this,n=e.name,r=e.link;return fetch("".concat(this._link,"cards"),{headers:this._headers,method:"POST",body:JSON.stringify({name:n,link:r})}).then((function(e){return t._serverResponceProcessing(e)}))}},{key:"getInitialCards",value:function(){var e=this;return fetch("".concat(this._link,"cards"),{headers:this._headers}).then((function(t){return e._serverResponceProcessing(t)}))}},{key:"deleteCard",value:function(e){var t=this;return fetch("".concat(this._link,"cards/").concat(e),{headers:this._headers,method:"DELETE"}).then((function(e){return t._serverResponceProcessing(e)}))}},{key:"getUserData",value:function(){var e=this;return fetch("".concat(this._link,"users/me"),{headers:this._headers}).then((function(t){return e._serverResponceProcessing(t)}))}},{key:"sendUserData",value:function(e){var t=this;return fetch("".concat(this._link,"users/me"),{headers:this._headers,method:"PATCH",body:JSON.stringify({name:e.name,about:e.job})}).then((function(e){return t._serverResponceProcessing(e)}))}},{key:"sendAvatarData",value:function(e){var t=this;return fetch("".concat(this._link,"users/me/avatar"),{headers:this._headers,method:"PATCH",body:JSON.stringify({avatar:e.avatar})}).then((function(e){return t._serverResponceProcessing(e)}))}},{key:"sendCardLike",value:function(e){var t=this;return fetch("".concat(this._link,"cards/").concat(e,"/likes"),{headers:this._headers,method:"PUT"}).then((function(e){return t._serverResponceProcessing(e)}))}},{key:"deleteCardLike",value:function(e){var t=this;return fetch("".concat(this._link,"cards/").concat(e,"/likes"),{headers:this._headers,method:"DELETE"}).then((function(e){return t._serverResponceProcessing(e)}))}}])&&t(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==r(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var i=function(){function e(t,n,r,o,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._card=t,this._name=this._card.name,this._link=this._card.link,this._templateSelector=n,this._cardLikes=[],this._userId=r,this._cardId=o.cardId,this._ownerId=o.ownerId,this._handleCardClick=i.handleCardClick,this._handleCardDelete=i.handleCardDelete,this._handleCardLike=i.handleCardLike,this._handleCardDeleteLike=i.handleCardDeleteLike,this.renderCardLike=this.renderCardLike.bind(this)}var t,n;return t=e,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(!0)}},{key:"renderCardLike",value:function(e){console.log(this),this._cardLikes=e.likes,0===this._cardLikes.length?this.likeSelector.textContent="0":this.likeSelector.textContent=this._cardLikes.length,this._checkLikeCard()?this._like.classList.add("element__button_active"):this._like.classList.remove("element__button_active")}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._cardImg=this._element.querySelector(".element__image"),this._like=this._element.querySelector(".element__button"),this.likeSelector=this._element.querySelector(".card__heart-counter"),this._trash=this._element.querySelector(".element__trash"),this._cardImg.src=this._link,this._cardImg.alt=this._name,this._element.querySelector(".element__title").textContent=this._name,this.renderCardLike(this._card),this._setEventListeners(),this._element}},{key:"deleteCard",value:function(){this._element.remove(),this._element=null}},{key:"_checkLikeCard",value:function(){var e=this;return this._cardLikes.find((function(t){return t._id===e._userId}))}},{key:"_setEventListeners",value:function(){var e=this;this._like.addEventListener("click",(function(){e._handleLikeButton()})),this._cardImg.addEventListener("click",(function(){e._handleCardClick({name:e._name,link:e._link})})),this._userId===this._ownerId?this._trash.addEventListener("click",(function(){e._handleCardDelete(e,e._cardId,e._card)})):this._trash.remove()}},{key:"_handleLikeButton",value:function(){this._checkLikeCard()?this._handleCardDeleteLike(this._card._id,this.renderCardLike):this._handleCardLike(this._card._id,this.renderCardLike)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==u(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==u(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===u(o)?o:String(o)),r)}var o}var c=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formElement=n,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._inputSelector=t.inputSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputList=Array.from(n.querySelectorAll(t.inputSelector)),this._submitButton=this._formElement.querySelector(t.submitButtonSelector)}var t,n;return t=e,(n=[{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector("#".concat(e.id)).nextElementSibling;e.classList.add(this._inputErrorClass),n.textContent=t,n.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector("#".concat(e.id)).nextElementSibling;e.classList.remove(this._inputErrorClass),t.classList.remove(this._errorClass),t.textContent=""}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_checkInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._isValid(t),e._toggleButtonState()}))}))}},{key:"_toggleButtonState",value:function(){this._checkInvalidInput()?this.disableSubmitButton():this._enableSubmitButton()}},{key:"disableSubmitButton",value:function(){this._submitButton.setAttribute("disabled","true"),this._submitButton.classList.add(this._inactiveButtonClass)}},{key:"_enableSubmitButton",value:function(){this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.removeAttribute("disabled")}},{key:"resetValidation",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==l(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===l(o)?o:String(o)),r)}var o}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t),this._handleEscCloseBind=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscCloseBind)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscCloseBind)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popupElement.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&e.close(),t.target.classList.contains("popup__closed")&&e.close()}))}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==p(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==p(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===p(o)?o:String(o)),r)}var o}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=m(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},d.apply(this,arguments)}function h(e,t){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},h(e,t)}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}var v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&h(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=m(r);if(o){var n=m(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===p(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._submitButton=n._popupElement.querySelector(".popup__form"),n._callbackConfirmation=t,n}return t=u,(n=[{key:"open",value:function(e,t){this._cardObject=e,this._cardId=t,d(m(u.prototype),"open",this).call(this)}},{key:"setEventListeners",value:function(){var e=this;this._submitButton.addEventListener("submit",(function(t){t.preventDefault(),e._callbackConfirmation(e._cardObject,e._cardId)})),d(m(u.prototype),"setEventListeners",this).call(this)}}])&&y(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(f);function _(e){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==_(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==_(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===_(o)?o:String(o)),r)}var o}function S(){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},S.apply(this,arguments)}function g(e,t){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},g(e,t)}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}var w=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(r);if(o){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===_(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._submitFormHandler=t,n._form=n._popupElement.querySelector(".popup__form"),n._inputList=n._popupElement.querySelectorAll(".popup__input"),n._submitButton=n._popupElement.querySelector(".popup__submit"),n._submitButtonText=n._submitButton.textContent,n}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){t.value=e[t.name]}))}},{key:"close",value:function(){this._form.reset(),S(k(u.prototype),"close",this).call(this)}},{key:"setSavingProcessText",value:function(){this._submitButton.textContent="Сохранение..."}},{key:"returnSavingProcessText",value:function(){this._submitButton.textContent=this._submitButtonText}},{key:"setEventListeners",value:function(){var e=this;this._form.addEventListener("submit",(function(t){t.preventDefault(),e._submitFormHandler(e._getInputValues()),e.close()})),S(k(u.prototype),"setEventListeners",this).call(this)}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(f);function E(e){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},E(e)}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==E(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==E(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===E(o)?o:String(o)),r)}var o}function C(){return C="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=O(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},C.apply(this,arguments)}function P(e,t){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},P(e,t)}function O(e){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},O(e)}var L=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&P(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=O(r);if(o){var n=O(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===E(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._image=t._popupElement.querySelector(".image__opened"),t._title=t._popupElement.querySelector(".image__name"),t}return t=u,(n=[{key:"open",value:function(e){this._image.src=e.link,this._image.alt=e.name,this._title.textContent=e.name,C(O(u.prototype),"open",this).call(this)}}])&&j(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(f);function q(e){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q(e)}function I(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==q(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==q(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===q(o)?o:String(o)),r)}var o}var T=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){e.forEach(this._renderer)}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&I(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function B(e){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},B(e)}function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==B(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==B(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===B(o)?o:String(o)),r)}var o}var x=function(){function e(t){var n=t.titleSelector,r=t.jobSelector,o=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._titleSelector=document.querySelector(n),this._jobSelector=document.querySelector(r),this._avatarSelector=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._titleSelector.textContent,job:this._jobSelector.textContent}}},{key:"setUserInfo",value:function(e){this._titleSelector.textContent=e.name,this._jobSelector.textContent=e.job}},{key:"setUserAvatar",value:function(e){this._avatarSelector.src=e}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var A,U=document.querySelector(".main"),V=U.querySelector(".profile__button"),N=(document.querySelector(".popup__closed"),U.querySelector(".popup_profile").querySelector(".popup__form_profile"),document.querySelector(".popup__input_name")),H=document.querySelector(".popup__input_job"),J=(U.querySelector(".profile__title"),U.querySelector(".profile__subtitle"),document.querySelector(".popup_new-card")),F=document.querySelector(".profile__add-card"),M=(J.querySelector(".popup__submit"),document.querySelector(".profile__avatar-edit")),z=(document.querySelector(".elements"),document.querySelector("#element").content.querySelector(".element"),document.querySelector(".popup__form_card"),document.querySelector(".popup__input_image"),document.querySelector(".popup__input_link"),document.querySelector(".popup_image-open")),$=(z.querySelector(".image__opened"),z.querySelector(".image__name"),document.querySelectorAll(".popup"),new n({link:"https://mesto.nomoreparties.co/v1/cohort-63/",headers:{authorization:"94aa74ad-5308-499e-afc4-7f416a23dd02","Content-Type":"application/json"}})),G=new w("#popup_profile",(function(){G.setSavingProcessText(),$.sendUserData({name:N.value,job:H.value}).then((function(e){console.log(e),W.setUserInfo({name:e.name,job:e.about}),G.close()})).catch((function(e){console.log("При редактировании профиля произошла ошибка: ".concat(e))})).finally((function(){G.returnSavingProcessText()}))}));G.setEventListeners();var K=new L("#popup_image-open");K.setEventListeners();var Q=new w("#popup_new-card",(function(e){Q.setSavingProcessText(),$.addNewCard(e).then((function(e){Z.addItem(ne(e)),Q.close()})).catch((function(e){console.log("При добавлении новой карточки возникла ошибка: ".concat(e))})).finally((function(){Q.returnSavingProcessText()}))}));Q.setEventListeners();var W=new x({titleSelector:".profile__title",jobSelector:".profile__subtitle",avatarSelector:".profile__avatar_img"}),X=new w(".popup__avatar",(function(e){X.setSavingProcessText(),$.sendAvatarData(e).then((function(e){console.log(e),W.setUserAvatar(e.avatar),X.close()})).catch((function(e){console.log("Ошибка обновления аватара: ".concat(e))})).finally((function(){X.returnSavingProcessText()}))}));X.setEventListeners();var Y=new v(".popup__confirm",(function(e,t){$.deleteCard(t,e).then((function(){e.deleteCard(),Y.close()})).catch((function(e){console.log("Ошибка при удалении карточки: ".concat(e))}))}));Y.setEventListeners();var Z=new T({renderer:function(e){var t=ne(e);Z.addItem(t)}},".elements");Promise.all([$.getUserData(),$.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,u,a=[],c=!0,l=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(a.push(r.value),a.length!==t);c=!0);}catch(e){l=!0,o=e}finally{try{if(!c&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return D(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];A=o._id,W.setUserInfo({name:o.name,job:o.about}),W.setUserAvatar(o.avatar),Z.renderItems(i.reverse())})).catch((function(e){console.log("Возникла глобальная ошибка: ".concat(e))}));var ee,te={};ee={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_disabled",inputErrorClass:"input__error",errorClass:"popup__input-error_active"},Array.from(document.querySelectorAll(ee.formSelector)).forEach((function(e){var t=new c(ee,e),n=e.getAttribute("name");te[n]=t,t.enableValidation()})),V.addEventListener("click",(function(){te["edit-form"].resetValidation();var e=W.getUserInfo(),t=e.name,n=e.job;N.value=t,H.value=n,G.open()})),F.addEventListener("click",(function(){te["add-form"].resetValidation(),Q.open()})),M.addEventListener("click",(function(){X.open(),te["avatar-edit-form"].resetValidation()}));var ne=function(e){return new i(e,".template_element",A,{cardId:e._id,ownerId:e.owner._id},{handleCardClick:function(e){K.open(e)},handleCardDelete:function(e,t){Y.open(e,t)},handleCardLike:function(e,t){$.sendCardLike(e).then((function(e){t(e)})).catch((function(e){console.log("При лайке карточки возникла ошибка: ".concat(e))}))},handleCardDeleteLike:function(e,t){$.deleteCardLike(e).then((function(e){t(e)})).catch((function(e){console.log("При дизлайке карточки возникла ошибка: ".concat(e))}))}}).generateCard()}})();