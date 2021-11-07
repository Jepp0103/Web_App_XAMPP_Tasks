DROP DATABASE IF EXISTS films;

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT
= 0;
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movies`
--
CREATE DATABASE
IF NOT EXISTS `films` DEFAULT CHARACTER
SET latin1
COLLATE latin1_swedish_ci;
USE `films`;

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE
IF NOT EXISTS `movies`
(
  `movie_id` int
(10) NOT NULL AUTO_INCREMENT,
  `title` varchar
(80) NOT NULL,
  `overview` varchar
(1000),
  `release_date` date,
  `runtime` int
(5),
PRIMARY KEY
(`movie_id`)
);

DROP TABLE IF EXISTS `persons`;
CREATE TABLE
IF NOT EXISTS `persons`
(
  `person_id` int
(10) NOT NULL AUTO_INCREMENT,
  `person_name` varchar
(500) NOT NULL,
  PRIMARY KEY
(`person_id`)
);

DROP TABLE IF EXISTS `movie_casts`;
CREATE TABLE
IF NOT EXISTS `movie_casts`
(
  `movie_id` int
(10) NOT NULL,
  `person_id` int
(10) NOT NULL,
  `cast_order` int
(5),
FOREIGN KEY
(`movie_id`) REFERENCES `movies`
(`movie_id`),
FOREIGN KEY
(`person_id`) REFERENCES `persons`
(`person_id`)
);

DROP TABLE IF EXISTS `movie_directors`;
CREATE TABLE
IF NOT EXISTS `movie_directors`
(
  `movie_id` int
(10) NOT NULL,
  `person_id` int
(10) NOT NULL,
  FOREIGN KEY
(`movie_id`) REFERENCES `movies`
(`movie_id`),
  FOREIGN KEY
(`person_id`) REFERENCES `persons`
(`person_id`)
);


--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (
`
title`,
`overview
`, `release_date`, `runtime`) VALUES
('Birdman', 'Nice movie', '1992-01-03', 4),
('Casino', 'Cool movie', '1996-01-03', 3),
('Do the Right Thing', 'Happy movie', '1991-01-03', 2),
('Manhattan', 'Lovely movie', '1999-01-03',  1),
('Star Trek: Beyond', 'Great movie', '1995-01-03', 2),
('Star Wars: A New Hope', 'Awesome movie', '1996-01-03', 3),
('The Avengers', 'Handsome movie', '1994-01-03', 3),
('The Godfather', 'Cold movie', '1991-01-03', 1),
('The Shape of Water', 'Warm movie', '1992-01-03', 1);
COMMIT;

#select * from movies;
