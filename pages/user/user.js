async function runMain() {
    _selectNav()

}

async function _selectNav() {
    document.querySelectorAll("main li.navActive").forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll("main li.navActive").forEach(i => i.classList.remove('active'))
            document.querySelectorAll("main div._navList").forEach(i => i.classList.add('overlay'))
            item.classList.add('active')
            document.querySelector("#"+item.getAttribute("data-navActive")).classList.remove('overlay')

        })
    })
}

runMain()