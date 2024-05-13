// Hàm dùng chung
class Helper {
    // Lấy dữ liệu từ BackEnd
    static async fetchData(controller) {
        return fetch('../../backEnd/index.php?controller=' + controller)
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                console.log(error);
                return null;
            });
    }

    // Lấy dữ liệu html
    static async fetchHTML(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Fetch HTML error:', response.status);
            }
            return await response.text();
        } catch (error) {
            console.error('Fetch HTML error:', error);
            throw error;
        }
    }

    // Lấy biến get của trình duyệt
    static getParameter(name) {
        // Tạo một đối tượng URLSearchParams từ query string của URL
        var queryParams = new URLSearchParams(window.location.search);

        // Kiểm tra xem có tham số có tên tương ứng không
        if (queryParams.has(name)) {
            // Nếu có, trả về giá trị của tham số đó
            return queryParams.get(name);
        }
        // Trả về null nếu không tìm thấy tham số có tên tương ứng
        return null;
    }

    // Lấy giá trị cokkie
    static getCookie(cookieName) {
        // Tách các cookie thành một mảng
        var cookies = document.cookie.split(';');

        // Lặp qua từng cookie để tìm cookieName
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
            cookie = cookie.trim();
            // Kiểm tra xem cookie có bắt đầu bằng cookieName hay không
            if (cookie.startsWith(cookieName + '=')) {
                // Trích xuất và trả về giá trị của cookie
                return cookie.substring(cookieName.length + 1);
            }
        }
        // Nếu không tìm thấy cookie, trả về null
        return null;
    }

    // Lấy hình ảnh trong backend
    static getLink(link) {
        return window.location.origin + "/backend/www/" + link
    }
}