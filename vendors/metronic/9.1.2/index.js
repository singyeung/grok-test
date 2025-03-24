import "./dist/assets/js/core.bundle.js";

export const getTailwindConfig = () =>
    import("./tailwind.config.js").then((module) => module.default);

export const KTComponents = window.KTComponents;

export const KTDom = window.KTDom;

window.KTModal.prototype.destroy = function () {
    this.dispose();
    this._targetElement = null;
    if (this._backdropElement !== null) {
        this._backdropElement.remove();
        this._backdropElement = null;
    }
    this._element = null;
};
export const KTModal = window.KTModal;

window.KTTogglePassword.prototype.destroy = function () {
    this.dispose();
    if (this._inputElement) {
        this._inputElement.outerHTML = "";
        this._inputElement = null;
    }
    if (this._triggerElement) {
        this._triggerElement.outerHTML = "";
        this._triggerElement = null;
    }
    this._element.innerHTML = "";
    this._element = null;
};
export const KTTogglePassword = window.KTTogglePassword;

window.KTToggle.prototype.destroy = function () {
    this.dispose();
    this._element = null;
    this._targetElement = null;
};
export const KTToggle = window.KTToggle;

window.KTTooltip.prototype.destroy = function () {
    this.dispose();
    this._element = null;
    this._targetElement = null;
};
export const KTTooltip = window.KTTooltip;
