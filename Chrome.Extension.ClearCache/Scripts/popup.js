var Chrome;
(function (Chrome) {
    var Extensions;
    (function (Extensions) {
        "use strict";
        var PopupController = (function () {
            function PopupController() {
                this._button = jQuery("#button");
                this._inprogress = jQuery("#in-progress");
                this._success = jQuery("#success");
                this._timeframe = jQuery("#timeframe");
                this._button.click(this.OnClick.bind(this));
                //chrome.runtime.onMessage.addListener(this.OnMessage.bind(this));
            }
            PopupController.prototype.OnClick = function () {
                this.ClearCache();
            };
            //private OnMessage(req, sender, callback): void {
            //    this.ClearCache();
            //}
            PopupController.prototype.ClearCache = function () {
                var since = this.ParseMilliseconds(this._timeframe.val());
                this._button.attr("disabled", "disabled");
                this._inprogress.removeClass("hidden");
                chrome.browsingData.remove({
                    since: since
                }, {
                    appcache: true,
                    cache: true,
                    localStorage: true
                }, this.RemoveCallback.bind(this));
            };
            PopupController.prototype.RemoveCallback = function () {
                var _this = this;
                setTimeout(function () {
                    _this._inprogress.addClass("hidden");
                    _this._success.removeClass("hidden");
                    _this._button.removeAttr("disabled");
                }, 500);
                setTimeout(function () {
                    if (!close) {
                        _this._success.removeClass("hidden");
                    }
                    else {
                        window.close();
                    }
                }, 4000);
            };
            PopupController.prototype.ParseMilliseconds = function (timeframe) {
                var now = new Date().getTime();
                var milliseconds = {
                    "hour": 60 * 60 * 1000,
                    "day": 24 * 60 * 60 * 1000,
                    "week": 7 * 24 * 60 * 60 * 1000,
                    "4weeks": 4 * 7 * 24 * 60 * 60 * 1000
                };
                if (milliseconds[timeframe]) {
                    return now - milliseconds[timeframe];
                }
                if (timeframe === "forever") {
                    return 0;
                }
                return null;
            };
            return PopupController;
        }());
        document.addEventListener("DOMContentLoaded", function () {
            window.popup = new PopupController();
        });
    })(Extensions = Chrome.Extensions || (Chrome.Extensions = {}));
})(Chrome || (Chrome = {}));
