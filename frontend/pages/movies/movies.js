document.addEventListener('DOMContentLoaded', async () => {
    // await Helper.fetchBackendLink();
    // Đổ danh sách sản phẩm
    _init();
    _showGenres();
})

async function _init() {
    // var items = await Helper.fetchData("movie")
    // await showDatas(items)
    // Thêm sự kiện lọc giá khi bấm lọc
    filterBy()
    document.querySelector("#filterForm").addEventListener('submit', (evt) => { evt.preventDefault(); filterBy() })
    document.querySelector("#_sortBy").addEventListener('change', () => filterBy())
    if (Helper.getParameter('q')) document.querySelector("#filterForm input[name='Name']").value = Helper.getParameter('q')
    if (Helper.getParameter('movieType')) document.querySelector("#filterForm select[name='movieType']").value = Helper.getParameter('movieType')
}

async function filterBy() {
    runMain()
    async function runMain() {
        var items = await Helper.fetchData("movie&action=allsFK")
        var items = items.filter(item => {
            if (!byName(item.Name)) return false
            if (!byGenres(item.genresValue)) return false
            if (!byMovieType(item.Type)) return false
            return true
        })
        showDatas(sortBy(items))
    }

    // Lọc theo tên
    function byName(name) {
        var nameValue = document.querySelector("#filterForm input[name='Name']").value
        if (name.toLowerCase().includes(nameValue.toLowerCase())) {
            return true
        } else {
            return false
        }
    }

    function byGenres(name) {
        var nameValue = document.querySelector("#filterForm select[name='genre']").value
        if (nameValue == 'all') return true
        if (!name) return false
        if (name.toLowerCase().includes(nameValue.toLowerCase())) {
            return true
        } else {
            return false
        }
    }
    function byMovieType(name) {
        var nameValue = document.querySelector("#filterForm select[name='movieType']").value
        if (nameValue == 'all') return true
        if (nameValue == name) {
            return true
        } else {
            return false
        }
    }

    function sortBy(items) {
        var value = document.querySelector("#_sortBy").value
        switch (value) {
            case "popularityDesc":
                return items.sort((a, b) => b.View - a.View)
            case "popularityAsc":
                return items.sort((a, b) => a.View - b.View)
            case "ratingDesc":
                return items.sort((a, b) => b.Rate - a.Rate)
            case "ratingAsc":
                return items.sort((a, b) => a.Rate - b.Rate)
            case "dateDesc":
                return items.sort((a, b) => b.ReleaseYear - a.ReleaseYear)
            case "dateAsc":
                return items.sort((a, b) => a.ReleaseYear - b.ReleaseYear)
            default:
                break;
        }
    }
}

async function showDatas(items) {
    document.querySelector(".topbar-filter span").textContent = items.length + " movies"
    var dataList = document.querySelector(".dataList")
    var dataItem = dataList.querySelector(".dataItem").cloneNode(true)
    dataList.innerHTML = ""
    await items.forEach(item => {
        let cloneData = dataItem.cloneNode(true)

        cloneData.querySelector("h6 a").textContent = item.Name
        cloneData.querySelector(".rate span").textContent = item.Rate
        cloneData.querySelector(".hvr-inner a").href = `./?page=movieDetails&id=${item.ID}`
        cloneData.querySelector("img").src = Helper.getLink(item.Img)

        dataList.appendChild(cloneData)
    });
}

async function _showGenres() {
    var items = await Helper.fetchData("genre")
    var dataList = document.querySelector("#filterForm select[name='genre']")
    items.forEach(item => {
        let dataItem = document.createElement("option")
        dataItem.value = item.Name
        dataItem.textContent = item.Name
        dataList.appendChild(dataItem)
    })
}