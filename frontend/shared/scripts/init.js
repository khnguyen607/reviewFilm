_setEffect();
document.addEventListener('DOMContentLoaded', async () => {
    await _getLayouts();
    _authentication()
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
        // addScript(`pages/${page}/${page}.js`)
        if (page && page != "home") {
            document.querySelector(`#bs-example-navbar-collapse-1 a[href='./?page=movies']`).parentNode.classList.add('active')
        } else {
            document.querySelector(`#bs-example-navbar-collapse-1 a[href='./']`).parentNode.classList.add('active')
        }
    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}

async function _authentication() {
    document.querySelector("#signup-content form").addEventListener('submit', async (evt) => {
        evt.preventDefault();
        // Tạo một đối tượng FormData và thêm dữ liệu vào đó
        const formData = new FormData(document.querySelector("#signup-content form"));

        // Tạo một yêu cầu fetch với phương thức POST và dữ liệu FormData trong phần thân
        fetch(Helper.backendLink + "?controller=user&action=insert", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('Successfully')
                    location.reload()
                } else {
                    alert('Username already exists!')
                }
            })
            .catch(error => {
                alert('Account creation failed!')
                console.error(error);
            });
    })

    document.querySelector("#login-content form").addEventListener('submit', async (evt) => {
        evt.preventDefault();
        // Tạo một đối tượng FormData và thêm dữ liệu vào đó
        const formData = new FormData(document.querySelector("#login-content form"));

        // Tạo một yêu cầu fetch với phương thức POST và dữ liệu FormData trong phần thân
        fetch(Helper.backendLink + "?controller=user&action=login", {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('Successfully')
                    location.reload()
                } else {
                    alert('Invalid username or password!')
                }
            })
            .catch(error => {
                alert('Login failed!')
                console.error(error);
            });
    })
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

