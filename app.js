// Hàm dùng chung
class Helper {
  static backendLink = null;
  static async fetchBackendLink() {
    try {
      const response = await fetch("./conf/conf.json");
      const data = await response.json();
      this.backendLink = data.backend;
    } catch (error) {
      console.error("Error:", error);
      this.backendLink = null;
    }
  }

  // Lấy dữ liệu từ backend
  static async fetchData(action, sql) {
    const formData = new FormData();
    formData.append('action', action);
    formData.append('sql', sql);

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(this.backendLink, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
}


  // Lấy dữ liệu html
  static async fetchHTML(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Fetch HTML error:", response.status);
      }
      return await response.text();
    } catch (error) {
      console.error("Fetch HTML error:", error);
      throw error;
    }
  }

  // Lấy biến get của trình duyệt
  static getParameter(name) {
    var queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has(name)) {
      return queryParams.get(name);
    }
    return null;
  }

  // Lấy giá trị cokkie
  static getCookie(cookieName) {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      cookie = cookie.trim();
      if (cookie.startsWith(cookieName + "=")) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    return null;
  }

}

