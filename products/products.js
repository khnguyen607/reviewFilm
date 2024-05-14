document.addEventListener('DOMContentLoaded', async () => {
    // Đổ danh sách sản phẩm
    _init();
})

async function _init() {
    var items = await Helper.fetchData("product")
    showProducts(items)
    // Thêm sự kiện lọc giá khi bấm lọc
    // document.querySelector(".price-range-area .text-uppercase").addEventListener('click', () => filterBy())
    // document.querySelector(".shop_sidebar_searchbar i").addEventListener('click', () => filterBy())
}

async function filterBy() {
    document.querySelectorAll("#grid .col-lg-3").forEach(item => {
        if (
            byName(item.querySelector(".product-name a").textContent)
        ) {
            item.classList.remove("d-none")
        } else {
            item.classList.add("d-none")
        }
    })

    // Lọc theo tên
    function byName(name) {
        var nameValue = Helper.getParameterByName('q')
        if (name.toLowerCase().includes(nameValue.toLowerCase())) {
            return true
        } else {
            return false
        }
    }

}

async function showProducts(items) {
    var dataList = document.querySelector("#grid .row")
    var data = document.querySelector("#grid .row .col-lg-3").cloneNode(true)
    dataList.innerHTML = ""
    await items.forEach(item => {
        let cloneData = data.cloneNode(true)
        cloneData.querySelector(".product-caption a").textContent = item.Name
        cloneData.querySelector(".price-box .new-price").textContent = (item.Price * 1000).toLocaleString('vi-VN') + "₫"
        cloneData.querySelector(".product-thumb a").href = `./?page=productDetail&id=${item.ID}`
        cloneData.querySelector(".product-name a").href = `./?page=productDetail&id=${item.ID}`
        console.log(Helper.getLink(item.Img));
        cloneData.querySelector(".product-thumb img").src = Helper.getLink(item.Img)
        cloneData.querySelector(".action-links a").addEventListener('click', (evt) => {
            evt.preventDefault()
            CartManager.setItem(
                item.Name,
                {
                    Price: item.Price,
                    Img: item.Img,
                    Quantity: 1,
                    ID: item.ID
                })
            alert("Thêm giỏ hàng thành công")
            CartManager.show()
        })
        dataList.appendChild(cloneData)
    });
    // document.querySelector(".shop_sidebar_searchbar input").value = Helper.getParameterByName("search")
    filterBy()
}