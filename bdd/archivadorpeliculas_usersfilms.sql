-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: archivadorpeliculas
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usersfilms`
--

DROP TABLE IF EXISTS `usersfilms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usersfilms` (
  `filmId` int NOT NULL AUTO_INCREMENT,
  `filmUrl` varchar(255) NOT NULL,
  `listOwner` int NOT NULL,
  `filmName` varchar(100) DEFAULT NULL,
  `filmPhoto` varchar(100) DEFAULT NULL,
  `idMd` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`filmId`),
  KEY `listOwner` (`listOwner`),
  CONSTRAINT `usersfilms_ibfk_1` FOREIGN KEY (`listOwner`) REFERENCES `userslist` (`listId`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersfilms`
--

LOCK TABLES `usersfilms` WRITE;
/*!40000 ALTER TABLE `usersfilms` DISABLE KEYS */;
INSERT INTO `usersfilms` VALUES (55,'https://www.themoviedb.org/movie/823625',1,'Blacklight','https://image.tmdb.org/t/p/w500/iDeWAGnmloZ5Oz3bocDp4rSbUXd.jpg','823625'),(56,'https://www.themoviedb.org/movie/696806',1,'The Adam Project','https://image.tmdb.org/t/p/w500/ewUqXnwiRLhgmGhuksOdLgh49Ch.jpg','696806'),(57,'https://www.themoviedb.org/movie/833425',1,'No Exit','https://image.tmdb.org/t/p/w500/33wnBK5NxvuKQv0Cxo3wMv0eR7F.jpg','833425'),(108,'https://www.themoviedb.org/movie/606402',4,'야차','https://image.tmdb.org/t/p/w500/hXTWVJMsI9BkxMLliqL1j0FT55t.jpg','606402'),(109,'https://www.themoviedb.org/movie/414906',4,'The Batman','https://image.tmdb.org/t/p/w500/5P8SmMzSNYikXpxil6BYzJ16611.jpg','414906'),(110,'https://www.themoviedb.org/movie/414906',52,'The Batman','https://image.tmdb.org/t/p/w500/5P8SmMzSNYikXpxil6BYzJ16611.jpg','414906'),(114,'https://www.themoviedb.org/movie/414906',56,'The Batman','https://image.tmdb.org/t/p/w500/5P8SmMzSNYikXpxil6BYzJ16611.jpg','414906'),(131,'https://www.themoviedb.org/movie/634649',4,'Spider-Man: No Way Home','https://image.tmdb.org/t/p/w500/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg','634649');
/*!40000 ALTER TABLE `usersfilms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-28 15:43:56
