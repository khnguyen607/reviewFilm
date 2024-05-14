_setEffect();
Helper.fetchBackendLink()
document.addEventListener('DOMContentLoaded', async () => {
    await _getLayouts();
})

async function _getLayouts() {
    try {
        // Get components
        var components = document.createElement("div")
        components.innerHTML = await Helper.fetchHTML("./shared/components/layout.html");
        document.querySelector("header.ht-header").innerHTML = components.querySelector("header.ht-header").innerHTML;
        document.querySelector("footer.ht-footer").innerHTML = components.querySelector("footer.ht-footer").innerHTML;
        document.querySelector("#login-content").innerHTML = components.querySelector("#login-content").innerHTML;
        document.querySelector("#signup-content").innerHTML = components.querySelector("#signup-content").innerHTML;
        
        addScript("assets/js/custom.js")

        var page = Helper.getParameter('page')
        if (page && page != "home") {
            document.querySelector(`#bs-example-navbar-collapse-1 a[href='./?page=movies']`).parentNode.classList.add('active')
        } else {
            document.querySelector(`#bs-example-navbar-collapse-1 a[href='./']`).parentNode.classList.add('active')
        }
    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}

async function _setEffect() {
    var style = document.createElement('style')
    style.innerHTML = `        
    main {
        opacity: 0;
        /* Apply transition effect to opacity property */
        transition: opacity 0.5s ease-in-out;
    }
    main.show {
        opacity: 1;
    }
    `
    document.head.appendChild(style)
    document.addEventListener("DOMContentLoaded", function () {
        var main = document.querySelector("main");
        main.classList.add("show"); // Add the "show" class to trigger the animation
    });
}

async function addScript(script) {
    var scriptElement = document.createElement("script")
    scriptElement.src = script
    document.body.appendChild(scriptElement)
}

