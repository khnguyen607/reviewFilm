document.addEventListener('DOMContentLoaded', async () => {
    await Helper.fetchBackendLink()
    // Khởi tạo trang
    _init();
    _getGenres();
    // Đặt bình luận
    _getComments();
    _sendComment();

    document.querySelector("#_addFavorite").addEventListener('click', async () => {
        Helper.fetchData(`user&action=addMovieFavorite&movieID=${Helper.getParameter("id")}&userID=${Helper.getCookie("user_id")}`)
        alert('Movie added to your favorite list successfully')
    })
})

async function _init() {
    await Helper.fetchData(`movie&action=addView&id=${Helper.getParameter("id")}`)
    var item = await Helper.fetchData(`movie&action=find&id=${Helper.getParameter("id")}`)
    document.querySelector(".bd-hd").innerHTML = capitalizeFirst(item.Name) + ` <span>${item.ReleaseYear}</span>`
    document.querySelector("#reviews .rv-hd h2").innerHTML = capitalizeFirst(item.Name)
    // document.querySelector("#moviesrelated h2").innerHTML = capitalizeFirst(item.Name)
    document.querySelector(".movie-img img").src = Helper.getLink(item.Img)
    document.querySelector("#overview .col-md-8 p").textContent = item.Overview
    document.querySelector("._ratePoint").textContent = item.Rate

    var countRate = await Helper.fetchData(`comment&action=totalRating&id=${Helper.getParameter("id")}`)
    document.querySelector(".rate .rv").textContent = countRate.total + " reviews"
}

async function _getGenres() {
    var items = await Helper.fetchData(`movie&action=getGenres&id=${Helper.getParameter("id")}`)
    var genres = "";
    items.forEach(item => {
        genres += (item.Name + ', ')
    })
    if (genres) {
        genres = genres.slice(0, -2)
    }
    console.log(genres);
    document.querySelector("._movieGenres").textContent = genres
}

async function _getComments() {
    var items = await Helper.fetchData(`movie&action=getComments&id=${Helper.getParameter("id")}`)
    document.querySelector("#reviews .topbar-filter span").textContent = items.length + " comments"
    var reviews = document.querySelector("._reviewsList")
    var cloneReview = reviews.querySelector("._reviewsItem").cloneNode(true)
    reviews.innerHTML = ""
    items.forEach(item => {
        var review = cloneReview.cloneNode(true)
        review.querySelector("h3").textContent = item.userName
        review.querySelector(".time").textContent = item.Date
        review.querySelector("._content").textContent = item.Content
        review.querySelector("img").src = Helper.getLink(item.userImg)
        reviews.appendChild(review);
    });
}

async function _sendComment() {
    document.querySelector('#reviews form').addEventListener('submit', function (event) {
        event.preventDefault();
        // Get form data
        const formData = new FormData(this);
        formData.append("userID", Helper.getCookie("user_id"))
        formData.append("movieID", Helper.getParameter("id"))
        // Send form data using fetch
        fetch(Helper.backendLink + '?controller=comment&action=insert', {
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
                alert('Please login to continue');
            });
    });
}
function capitalizeFirst(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
