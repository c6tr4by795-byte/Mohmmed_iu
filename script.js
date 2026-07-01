/* ==========================================================
   IRAQ GREEN
   Global Script v2.0
========================================================== */

const App = {

    state: {
        user: null,
        trees: [],
        campaigns: [],
        notifications: []
    },

    init() {

        this.cache();

        this.bind();

        this.load();

        this.animate();

        console.log("IRAQ GREEN READY");

    },

    cache() {

        this.buttons = document.querySelectorAll("button");

        this.cards = document.querySelectorAll(".card");

        this.navItems = document.querySelectorAll(".nav-item");

        this.fab = document.querySelector(".fab");

    },

    bind() {

        this.buttons.forEach(btn => {

            btn.addEventListener("click", () => {

                btn.animate([
                    {transform:"scale(1)"},
                    {transform:"scale(.96)"},
                    {transform:"scale(1)"}
                ],{

                    duration:180

                });

            });

        });

        this.navItems.forEach(item=>{

            item.addEventListener("click",()=>{

                this.navItems.forEach(i=>i.classList.remove("active"));

                item.classList.add("active");

            });

        });

        if(this.fab){

            this.fab.addEventListener("click",()=>{

                alert("إضافة شجرة قريباً 🌳");

            });

        }

    },

    save(){

        localStorage.setItem(

            "iraq-green",

            JSON.stringify(this.state)

        );

    },

    load(){

        const data=localStorage.getItem("iraq-green");

        if(data){

            this.state=JSON.parse(data);

        }

    },

    notify(message){

        console.log(message);

    },

    animate(){

        this.cards.forEach((card,index)=>{

            card.style.opacity="0";

            card.style.transform="translateY(25px)";

            setTimeout(()=>{

                card.style.transition=".45s";

                card.style.opacity="1";

                card.style.transform="translateY(0)";

            },index*120);

        });

    }

};

document.addEventListener(

"DOMContentLoaded",

()=>{

App.init();

}

);
