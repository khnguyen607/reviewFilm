document.addEventListener('DOMContentLoaded', async () => {
    if (!Helper.getCookie('user_id')) location.href = "./"
    _selectNav()
    _getInfo()
    _updateInfo()
    _getReviewMovie()
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

async function _getInfo() {
    let user_id = Helper.getCookie('user_id')
    var userInfo = await Helper.fetchData("user&action=find&id=" + user_id)
    document.querySelector(".hero-ct h1").textContent = userInfo.Name + "’s profile"
    document.querySelector(".user-img img").src = Helper.getLink(userInfo.Img)
    console.log(userInfo);

    document.querySelector("#_userProfile input[name=Name]").value = userInfo.Name
    document.querySelector("#_userProfile input[name=Username]").value = userInfo.Username
}

async function _updateInfo() {
    document.querySelector("#_userProfile form").addEventListener('submit', async (evt) => {
        evt.preventDefault()
        var formData = new FormData(document.querySelector("#_userProfile form"))
        fetch(Helper.backendLink + '?controller=user&action=update&id=' + Helper.getCookie('user_id'), {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data == true) {
                    location.reload()
                    alert('Successfull!')
                }
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
                alert('There was a problem');
            });
    })

    document.querySelector("#_userChangePass form").addEventListener('submit', async (evt) => {
        evt.preventDefault()
        var formData = new FormData(document.querySelector("#_userChangePass form"))
        formData.append('Username', document.querySelector("#_userProfile input[name=Username]").value)
        fetch(Helper.backendLink + '?controller=user&action=update&id=' + Helper.getCookie('user_id'), {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                if (data == 'true') {
                    location.reload()
                    alert('Successfull!')
                } else if (data == "Password is wrong") {
                    alert('Password is wrong!')
                }
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
                alert('Please login to continue');
            });
    })
}

async function _getReviewMovie() {
    var items = await Helper.fetchData("user&action=movieComment&id=" + Helper.getCookie('user_id'))
    var dataList = document.querySelector("#_userRate .dataList")
    var dataItem = dataList.querySelector(".dataItem").cloneNode(true)
    dataList.innerHTML = ""
    items.forEach(item => {
        console.log(item);
        let cloneData = dataItem.cloneNode(true)

        cloneData.querySelector("h6 a").innerHTML = `${item.movieName} <span>(${item.movieYear})</span>`
        cloneData.querySelector("h6 a").href = `./?page=movieDetails&id=${item.movieID}`
        cloneData.querySelector("img").src = Helper.getLink(item.movieImg)
        cloneData.querySelector("._commentContent").textContent = item.Content

        var commentDate = new Date(item.Date)
        cloneData.querySelector(".time.sm").textContent = `${commentDate.getDate()}-${commentDate.getMonth()+1}-${commentDate.getFullYear()}, ${commentDate.getHours()}:${commentDate.getMinutes()}`
        dataList.appendChild(cloneData)
    });
}