-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th5 16, 2024 lúc 08:43 AM
-- Phiên bản máy phục vụ: 8.0.30
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `reviewfilm`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `ID` int NOT NULL,
  `Content` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `movieID` int NOT NULL,
  `userID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`ID`, `Content`, `Date`, `movieID`, `userID`) VALUES
(1, 'I like this', '2024-05-15 11:21:32', 1, 3),
(2, 'It\'s so good', '2024-05-15 11:21:32', 1, 3),
(3, '', '2024-05-16 14:45:24', 1, 3),
(4, 'Good!', '2024-05-16 14:45:50', 1, 3),
(5, 'Good2', '2024-05-16 14:46:08', 1, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `genres`
--

CREATE TABLE `genres` (
  `ID` int NOT NULL,
  `Name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `genres`
--

INSERT INTO `genres` (`ID`, `Name`) VALUES
(1, 'Horror'),
(2, 'Action'),
(3, 'Romatic'),
(4, 'Adventure');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `movies`
--

CREATE TABLE `movies` (
  `ID` int NOT NULL,
  `Name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Overview` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Trailer` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Rate` float NOT NULL,
  `Type` enum('TV Shows','Movies') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Img` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ReleaseYear` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `movies`
--

INSERT INTO `movies` (`ID`, `Name`, `Overview`, `Trailer`, `Rate`, `Type`, `Img`, `ReleaseYear`) VALUES
(1, 'oblivion', 'The OverView of this Movies', '', 7.4, 'Movies', 'movies/mv1.jpg', '2013'),
(2, 'into the wild', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv2.jpg', '2013'),
(3, 'Die hard', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-item3.jpg', '2013'),
(4, 'The walk', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-item4.jpg', '2013'),
(5, 'blade runner  ', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv3.jpg', '2013'),
(6, 'Mulholland pride', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv4.jpg', '2013'),
(7, 'skyfall: evil of boss', 'The OverView of this Movies', '', 7, 'Movies', 'movies/mv5.jpg', '2013'),
(8, 'Interstellar', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-item1.jpg', '2013'),
(9, 'The revenant', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-item2.jpg', '2013'),
(10, 'harry potter', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-it10.jpg', '2013'),
(11, 'guardians galaxy', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-it11.jpg', '2013'),
(12, 'the godfather', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-it12.jpg', '2013'),
(13, 'blue velvet', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-item6.jpg', '2013'),
(14, 'gravity', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-item7.jpg', '2013'),
(15, 'southpaw', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-item8.jpg', '2013'),
(16, 'jurassic park', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-it9.jpg', '2013'),
(17, 'the forest', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-item9.jpg', '2013'),
(18, 'spectre', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-item10.jpg', '2013'),
(19, 'strager things', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-item11.jpg', '2013'),
(20, 'la la land', 'The OverView of this Movies', '', 0, 'Movies', 'movies/mv-item12.jpg', '2013');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rating`
--

CREATE TABLE `rating` (
  `ID` int NOT NULL,
  `movieID` int NOT NULL,
  `Point` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `rating`
--

INSERT INTO `rating` (`ID`, `movieID`, `Point`) VALUES
(1, 1, 3),
(2, 1, 4),
(3, 1, 8),
(4, 1, 10),
(5, 1, 9),
(6, 1, 6),
(7, 1, 7),
(8, 1, 9),
(9, 1, 7),
(10, 1, 9),
(11, 1, 9),
(12, 7, 4),
(13, 7, 5),
(14, 7, 9),
(15, 7, 10),
(16, 7, 7);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `syn_movies_genres`
--

CREATE TABLE `syn_movies_genres` (
  `ID` int NOT NULL,
  `genreID` int NOT NULL,
  `movieID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `syn_movies_genres`
--

INSERT INTO `syn_movies_genres` (`ID`, `genreID`, `movieID`) VALUES
(1, 1, 3),
(2, 4, 3),
(3, 3, 3),
(4, 2, 4),
(5, 4, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `ID` int NOT NULL,
  `Name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Username` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Img` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`ID`, `Name`, `Password`, `Username`, `Img`) VALUES
(3, 'Khôi Nguyên', '$2y$10$ATUqD4JZZmOcNlORCZXmdOuFpP/fQ/NUP6hCj0yJ.GSGQIeDFCzQ.', 'khnguyen', 'users/user-img.png');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `comments_users` (`userID`),
  ADD KEY `comments_movies` (`movieID`);

--
-- Chỉ mục cho bảng `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `rating_movies` (`movieID`);

--
-- Chỉ mục cho bảng `syn_movies_genres`
--
ALTER TABLE `syn_movies_genres`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `syn_movies_genres_movies` (`movieID`),
  ADD KEY `syn_movies_genres_genres` (`genreID`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `genres`
--
ALTER TABLE `genres`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `movies`
--
ALTER TABLE `movies`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `rating`
--
ALTER TABLE `rating`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `syn_movies_genres`
--
ALTER TABLE `syn_movies_genres`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_movies` FOREIGN KEY (`movieID`) REFERENCES `movies` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `comments_users` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_movies` FOREIGN KEY (`movieID`) REFERENCES `movies` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `syn_movies_genres`
--
ALTER TABLE `syn_movies_genres`
  ADD CONSTRAINT `syn_movies_genres_genres` FOREIGN KEY (`genreID`) REFERENCES `genres` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `syn_movies_genres_movies` FOREIGN KEY (`movieID`) REFERENCES `movies` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
