document.addEventListener('DOMContentLoaded', async () => {
    if (!Helper.getCookie('user_id')) location.href = "./"
    _selectNav()
    getInfo()
})

async function _selectNav() {
    document.querySelectorAll("main li.navActive").forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll("main li.navActive").forEach(i => i.classList.remove('active'))
            document.querySelectorAll("main div._navList").forEach(i => i.classList.add('overlay'))
            item.classList.add('active')
            document.querySelector("#" + item.getAttribute("data-navActive")).classList.remove('overlay')

        })
    })
}

async function getInfo() {
    let user_id = Helper.getCookie('user_id')
    var userInfo = await Helper.fetchData("user&action=find&id=" + user_id)
    document.querySelector(".hero-ct h1").textContent = userInfo.Name + "’s profile"
    document.querySelector(".user-img img").src = Helper.getLink(userInfo.Img)
    console.log(userInfo);
}
