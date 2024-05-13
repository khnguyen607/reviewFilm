<!DOCTYPE html>
<html lang="en" class="no-js">

<head>
    <!-- Basic need -->
    <title>Open Pediatrics</title>
    <meta charset="UTF-8">

    <!--Google Font-->
    <link rel="stylesheet" href='http://fonts.googleapis.com/css?family=Dosis:400,700,500|Nunito:300,400,600' />
    <!-- Mobile specific meta -->
    <meta name=viewport content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone-no">

    <!-- CSS files -->
    <link rel="stylesheet" href="assets/css/plugins.css">
    <link rel="stylesheet" href="assets/css/style.css">

    <script src="shared/scripts/app.js"></script>
    <script src="shared/scripts/init.js"></script>
</head>

<body>
    <!--preloading-->
    <div id="preloader">
        <img class="logo" src="assets/images/logo1.png" alt="" width="119" height="58">
        <div id="status">
            <span></span>
            <span></span>
        </div>
    </div>
    <!--end of preloading-->
    <!--login form popup-->
    <div class="login-wrapper" id="login-content"></div>
    <!--end of login form popup-->
    <!--signup form popup-->
    <div class="login-wrapper" id="signup-content"></div>
    <!--end of signup form popup-->

    <header class="ht-header"></header>

    <!-- main body start -->
    <?php
    $page = isset($_GET['page']) ? $_GET['page'] : 'home';
    $page_path = "pages/$page/$page";
    if (file_exists("$page_path.html")) {
        include_once("$page_path.html");
    } else {
        header("Location: shared/components/404.html");
    }
    ?>
    <!-- main body end -->

    <!-- footer section-->
    <footer class="ht-footer"></footer>
    <!-- end of footer section-->

    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/plugins2.js"></script>
    <script src="assets/js/init.js"></script>
    <!-- <script src="assets/js/custom.js"></script> -->
</body>

</html>