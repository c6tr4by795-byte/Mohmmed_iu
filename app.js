/* ==========================================
   IQ SCAN
   App v1.0
========================================== */

const App = {

    version: "1.0.0",

    init() {
        console.log("IQ SCAN READY");
    },

    saveHistory(code) {

        let history = JSON.parse(localStorage.getItem("history")) || [];

        history.unshift({

            code: code,

            date: new Date().toLocaleDateString("ar-IQ"),

            time: new Date().toLocaleTimeString("ar-IQ")

        });

        localStorage.setItem(

            "history",

            JSON.stringify(history)

        );

    },

    getHistory() {

        return JSON.parse(

            localStorage.getItem("history")

        ) || [];

    }

};

App.init();
