document.addEventListener('DOMContentLoaded', async () => {
    // await Helper.fetchBackendLink();
    // Đổ danh sách sản phẩm
    _init();
    _showCategories();
})

async function _init() {
    var items = await Helper.fetchData("blog")
    await showDatas(items)
    // Thêm sự kiện lọc giá khi bấm lọc
    console.log(Helper.getParameter('q'));
    if (Helper.getParameter('q')) document.querySelector(".sidebar-search input").value = Helper.getParameter('q')
    filterBy()
    document.querySelector(".sidebar-search form").addEventListener('submit', (evt) => { evt.preventDefault(); filterBy() })
}

async function filterBy() {
    runMain()
    async function runMain() {
        var items = await Helper.fetchData("blog&action=getAllsFK")
        var items = items.filter(item => {
            if (!byName(item.Name)) return false
            if (!byCategories(item.categoriesValue)) return false
            return true
        })
        showDatas(items)
    }

    // Lọc theo tên
    function byName(name) {
        var nameValue = document.querySelector(".sidebar-search input").value
        if (name.toLowerCase().includes(nameValue.toLowerCase())) {
            return true
        } else {
            return false
        }
    }

    function byCategories(name) {
        if (!name) return false
        if (!Helper.getParameter("category")) return true
        var nameValue = Helper.getParameter("category")
        if (name.toLowerCase().includes(nameValue.toLowerCase())) {
            return true
        } else {
            return false
        }
    }

}

async function showDatas(items) {
    var dataList = document.querySelector(".dataList")
    var dataItem = dataList.querySelector(".dataItem").cloneNode(true)
    dataList.innerHTML = ""
    await items.forEach(item => {
        let cloneData = dataItem.cloneNode(true)

        cloneData.querySelector(".title a").textContent = item.Name
        cloneData.querySelectorAll("a[href='./?page=blogDetails']").forEach(i => i.href = `./?page=blogDetails&id=${item.ID}`)
        cloneData.querySelector("img").src = Helper.getLink(item.Img)
        cloneData.querySelector("p").textContent = item.Subtitle

        const date = new Date(item.Date);
        cloneData.querySelector(".date").textContent = date.getDate()
        cloneData.querySelector(".month").textContent = "Th" + (date.getMonth() + 1)

        dataList.appendChild(cloneData)
    });
}

async function _showCategories() {
    var items = await Helper.fetchData("category")
    var dataList = document.querySelector(".sidebar-list")
    dataList.innerHTML = ""
    items.forEach(item => {
        let dataItem = document.createElement("li")
        dataItem.innerHTML = `<a href="#"><i class="fa fa-angle-right"></i>${item.Name}</a>`
        dataItem.addEventListener('click', () => {
            window.location.href = `./?page=blogs&category=${item.Name}`
        })
        dataList.appendChild(dataItem)
    })
}