document.addEventListener('DOMContentLoaded', async () => {
    // Khởi tạo trang
    _init();
    // Đặt bình luận
    _getComments();
    _sendComment();
})

async function _init() {
    var item = await Helper.fetchData(`product&action=find&id=${Helper.getParameterByName("id")}`)
    document.querySelector(".product-info h3").textContent = item.Name
    document.querySelector(".product-info ._Subtitle").textContent = item.Subtitle
    document.querySelector(".product_description_wrap .product_desc").innerHTML = item.Description
    document.querySelector("._imgProduct img").src = Helper.getLink(item.Img)
    document.querySelector("._imgProduct a").href = Helper.getLink(item.Img)
    document.querySelector("._productPrice .new-price").textContent = (item.Price * 1000).toLocaleString("vi-VN") + "₫"
    document.querySelector(".add-to-cart").addEventListener("click", (evt) => {
        evt.preventDefault()
        CartManager.setItem(
            item.Name,
            {
                Price: item.Price,
                Img: item.Img,
                Quantity: document.querySelector(".cart-plus-minus input").value,
                ID: item.ID
            })
        alert("Thêm giỏ hàng thành công")
        CartManager.show()
    })
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
                if (data==true) {
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

