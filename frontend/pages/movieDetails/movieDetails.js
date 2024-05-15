document.addEventListener('DOMContentLoaded', async () => {
    // Khởi tạo trang
    _init();
    _getGenres();
    // Đặt bình luận
    _getComments();
    // _sendComment();
})

async function _init() {
    var item = await Helper.fetchData(`movie&action=find&id=${Helper.getParameter("id")}`)
    document.querySelector(".bd-hd").innerHTML = capitalizeFirst(item.Name) + ` <span>${item.ReleaseYear}</span>`
    document.querySelector(".movie-img img").src = Helper.getLink(item.Img)
    document.querySelector("#overview .col-md-8 p").textContent = item.Overview
    document.querySelector("._ratePoint").textContent = item.Rate
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
    var items = await Helper.fetchData(`product&action=getComments&id=${Helper.getParameterByName("id")}`)
    console.log(items);
    var reviews = document.querySelector(".review_address_inner")
    var cloneReview = document.querySelector(".review_address_inner .pro_review").cloneNode(true)
    reviews.innerHTML = ""
    items.forEach(item => {
        var review = cloneReview.cloneNode(true)
        review.querySelector(".review_details h5").innerHTML = `<h5>${item.userName} - <span> ${item.DateTime}</span></h5>`
        review.querySelector(".review_details p").textContent = item.Content
        reviews.appendChild(review);
    });
}

async function _sendComment() {
    document.querySelector('.comments-area form').addEventListener('submit', function (event) {
        event.preventDefault();
        // Get form data
        const formData = new FormData(this);
        formData.append("userID", Helper.getCookie("user_id"))
        formData.append("productID", Helper.getParameterByName("id"))
        // Send form data using fetch
        fetch('../../backend/?controller=comment&action=insert', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Assuming response is JSON
            })
            .then(data => {
                if (data == true) {
                    location.reload()
                    alert('Bình luận thành công')
                }
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
            });
    });
}
function capitalizeFirst(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
