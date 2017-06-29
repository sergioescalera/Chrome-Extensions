module Chrome.Extensions {

    "use strict";

    class PopupController {

        private _button: JQuery;
        private _inprogress: JQuery;
        private _success: JQuery;
        private _timeframe: JQuery;

        constructor() {

            this._button = jQuery("#button");
            this._inprogress = jQuery("#in-progress");
            this._success = jQuery("#success");
            this._timeframe = jQuery("#timeframe");

            this._button.click(this.OnClick.bind(this));

            //chrome.runtime.onMessage.addListener(this.OnMessage.bind(this));
        }

        private OnClick(): void {
            this.ClearCache();
        }

        //private OnMessage(req, sender, callback): void {
        //    this.ClearCache();
        //}

        private ClearCache(): void {
            
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
        }

        private RemoveCallback(): void {

            setTimeout(() => {
                this._inprogress.addClass("hidden");
                this._success.removeClass("hidden");
                this._button.removeAttr("disabled");
            }, 500);

            setTimeout(() => {
                if (!close) {
                    this._success.removeClass("hidden");
                }
                else {
                    window.close();
                }
            }, 4000);
        }

        private ParseMilliseconds(timeframe: string): number {

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
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        (<any>window).popup = new PopupController();
    });
}