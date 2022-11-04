-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2022 at 06:17 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contactlistdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `contactlist`
--

CREATE TABLE `contactlist` (
  `c_id` text NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone_no` varchar(20) NOT NULL,
  `email_address` varchar(100) NOT NULL,
  `image_path` text NOT NULL,
  `contact_address` text NOT NULL,
  `image_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contactlist`
--

INSERT INTO `contactlist` (`c_id`, `first_name`, `last_name`, `phone_no`, `email_address`, `image_path`, `contact_address`, `image_name`) VALUES
('1', 'Maqsood', 'Makenik', '090078601', 'maqsood@mycontacts.com', 'https://cdn.britannica.com/97/194197-050-5BD88874/Vin-Diesel-The-Fast-and-the-Furious.jpg', 'Machar kaloni', 'https://cdn.britannica.com/97/194197-050-5BD88874/Vin-Diesel-The-Fast-and-the-Furious.jpg'),
('2', 'Muneeb', 'Munshee', '090078603', 'muneeb@mycontacts.com', 'https://imgix.ranker.com/user_node_img/50071/1001409102/original/it_s-nice-i-guess-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375', 'Sohrab Goth mundi', 'https://imgix.ranker.com/user_node_img/50071/1001409102/original/it_s-nice-i-guess-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375'),
('9079a2ee-cfbd-45b7-988f-5ae753783c8e', 'Nawaz', 'Naai', '090078604', 'nawaz@mycontacts.com', 'https://i.dailymail.co.uk/i/pix/2017/09/07/13/4400676300000578-4861550-image-m-64_1504786274054.jpg', 'anda moor', 'https://i.dailymail.co.uk/i/pix/2017/09/07/13/4400676300000578-4861550-image-m-64_1504786274054.jpg'),
('ee0cf611-74ab-4f5e-a85d-ebae5750b968', 'Kamran', 'Qasai', '090078605', 'kamran@mycontacts.com', 'https://i.pinimg.com/originals/17/0f/00/170f004b148843d793f8795c9721e2f8.jpg', 'paradise bakeri', 'https://i.pinimg.com/originals/17/0f/00/170f004b148843d793f8795c9721e2f8.jpg'),
('5c453f15-4ee0-48b5-b76b-1e885ba4d87b', 'Daniyal', 'Dhobi', '090078606', 'daniyal@mycontacts.com', 'https://i0.wp.com/mumbai7.com/wp-content/uploads/2021/10/dreamstime_s_16057526.jpg', 'Al asif dhobi ghaat', 'https://i0.wp.com/mumbai7.com/wp-content/uploads/2021/10/dreamstime_s_16057526.jpg'),
('f9b3ff19-ede7-467d-b3f6-544c93287365', 'Max', 'Well', '090078608', 'max@mycontacts.com', 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRyBwmUSiEhxqz0j_J6lk5lWQ1U3xbnYPEKuc63v0fkGwrd9y93t5y0XpAXQ2--fPLb', 'abc street', 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRyBwmUSiEhxqz0j_J6lk5lWQ1U3xbnYPEKuc63v0fkGwrd9y93t5y0XpAXQ2--fPLb'),
('4f8b1f89-e8b4-4451-a85d-7623f04846a4', 'Babar', 'Azam', '090078607', 'babar@mycontacts.coM', '../backend/images/8c6a9c40-8c82-467a-8eca-baf90a3a0564.jpg', 'Karanchi', '8c6a9c40-8c82-467a-8eca-baf90a3a0564.jpg'),
('c56a66f6-2e62-4d7c-aaa2-3c9c28323be6', 'Billi', 'Meow', '0900', 'babar@mycontacts.com', '../api/images/4ac9f835-95f3-4b4f-bd59-27569d8fb212.jpg', 'asa', '4ac9f835-95f3-4b4f-bd59-27569d8fb212.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
