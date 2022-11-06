CREATE DATABASE  IF NOT EXISTS `ceylon_engineering` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ceylon_engineering`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ceylon_engineering
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `activitylog`
--

DROP TABLE IF EXISTS `activitylog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activitylog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dodate` datetime NOT NULL,
  `descriptin` text,
  `users_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_activitylog_users1_idx` (`users_user_id`),
  CONSTRAINT `fk_activitylog_users1` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activitylog`
--

LOCK TABLES `activitylog` WRITE;
/*!40000 ALTER TABLE `activitylog` DISABLE KEYS */;
/*!40000 ALTER TABLE `activitylog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bsr`
--

DROP TABLE IF EXISTS `bsr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bsr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `province_id` int NOT NULL,
  `year` char(4) NOT NULL,
  `bsrcode` char(7) NOT NULL,
  `bsrname` varchar(150) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `addeddate` date NOT NULL,
  `description` text,
  `bsrstatus_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bsrcode_UNIQUE` (`bsrcode`),
  KEY `fk_bsr_province1_idx` (`province_id`),
  KEY `fk_bsr_bsrstatus1_idx` (`bsrstatus_id`),
  KEY `fk_bsr_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_bsr_bsrstatus1` FOREIGN KEY (`bsrstatus_id`) REFERENCES `bsrstatus` (`id`),
  CONSTRAINT `fk_bsr_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_bsr_province1` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsr`
--

LOCK TABLES `bsr` WRITE;
/*!40000 ALTER TABLE `bsr` DISABLE KEYS */;
INSERT INTO `bsr` VALUES (1,9,'2020','WP-2020','BSR-WP-2020','2020-05-10','2021-04-20','2020-04-26','C001 is added',3,1),(2,7,'2020','SP-2020','BSR-SP-2020','2020-04-16','2021-05-18','2020-04-28',NULL,1,1),(3,2,'2020','EP-2020','BSR-EP-2020','2021-07-30','2021-08-17','2021-08-31',NULL,1,1),(4,4,'2020','NP-2020','BSR-NP-2020','2021-08-25','2021-08-26','2021-09-01',NULL,3,1),(5,6,'2020','SG-2020','BSR-SG-2020','2021-04-13','2021-08-22','2021-09-01',NULL,1,1),(6,1,'2020','CP-2020','BSR-CP-2020','2021-09-17','2021-09-24','2021-09-13','Cp-2020 Nuwara BSR is newly',3,1),(8,3,'2020','NC-2020','BSR-NC-2020','2021-07-09','2021-09-25','2021-09-14',NULL,1,1),(9,8,'2021','UP-2021','BSR-UP-2021','2021-10-16','2022-10-16','2021-10-16',NULL,1,1),(10,9,'2022','WP-2022','BSR-WP-2022','2022-01-01','2023-01-01','2022-01-08',NULL,1,1),(11,1,'2022','CP-2022','BSR-CP-2022','2022-04-26','2023-04-26','2022-04-26',NULL,1,4),(12,5,'2022','NW-2022','BSR-NW-2022','2022-05-15','2023-05-22','2022-05-22',NULL,1,4);
/*!40000 ALTER TABLE `bsr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bsr_has_bsrsubcategory`
--

DROP TABLE IF EXISTS `bsr_has_bsrsubcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bsr_has_bsrsubcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bsr_id` int NOT NULL,
  `bsrsubcategory_id` int NOT NULL,
  `itemcode` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `itemunit_id` int NOT NULL,
  `bsrrate` decimal(7,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bsr_has_bsrsubcategory_bsrsubcategory1_idx` (`bsrsubcategory_id`),
  KEY `fk_bsr_has_bsrsubcategory_bsr1_idx` (`bsr_id`),
  KEY `fk_bsr_has_bsrsubcategory_itemunit1_idx` (`itemunit_id`),
  CONSTRAINT `fk_bsr_has_bsrsubcategory_bsr1` FOREIGN KEY (`bsr_id`) REFERENCES `bsr` (`id`),
  CONSTRAINT `fk_bsr_has_bsrsubcategory_bsrsubcategory1` FOREIGN KEY (`bsrsubcategory_id`) REFERENCES `bsrsubcategory` (`id`),
  CONSTRAINT `fk_bsr_has_bsrsubcategory_itemunit1` FOREIGN KEY (`itemunit_id`) REFERENCES `itemunit` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsr_has_bsrsubcategory`
--

LOCK TABLES `bsr_has_bsrsubcategory` WRITE;
/*!40000 ALTER TABLE `bsr_has_bsrsubcategory` DISABLE KEYS */;
INSERT INTO `bsr_has_bsrsubcategory` VALUES (1,1,1,'A001','Demolishing brickwork in  clearing debris away',1,1836.00),(2,2,2,'B001','Roof removing tiles and timber',1,47320.00),(3,4,1,'A001','Demolishing brickwork in cement',1,1838.00),(4,5,6,'E003','Random Rubble Masonry in cement mortar',3,1200.00),(5,5,2,'A029','Roof removing tiles and timber, stacking serviceable materials',2,2223.00),(6,6,1,'A028','Chipping rendering, cement',1,424.00),(7,6,3,'C001','Mixing and Placing of cement concrete',1,47320.00),(9,3,1,'A022','Demolishing brickwork in lime stacking',1,1937.00),(10,6,4,'C016','Lintol, cement concrete 1:2:4(3/4\") 4 1/2\" x 6\"',3,320.00),(11,6,4,'C017','Lintol, cement concrete 1:2:4(3/4\") 9\" x 6\" (Reinforcement paid for separately)',3,396.00),(12,6,1,'A026','Chipping lime plastering and clearing debris away',4,70.00),(13,1,3,'C001','Mixing and Placing of cement concrete',1,46500.00),(14,8,1,'A026','Chipping lime plastering and clearing debris away',2,716.00),(15,5,1,'A026','Chipping lime plastering and clearing debris away',2,715.00),(16,8,2,'A029','Roof removing tiles and timber',2,2286.00),(18,8,3,'C001','Mixing and Placing of cement concrete 1:3:6 with 1\" metal, hand mixing up',1,47320.00),(19,3,2,'A029','Roof removing tiles and timber',2,2223.00),(20,3,3,'C001','Mixing and Placing of cement concrete 1:3:6 with 1\" metal, hand mixing up',1,47323.00),(21,2,3,'C001','Mixing and Placing of cement concrete 1:3:6 with 1\" metal, hand mixing up',1,50000.00),(22,2,4,'C016','Lintol, cement concrete 1:2:4(3/4\") 4 1/2\" x 6\" (Reinforcement paid for separately).',3,320.00),(23,9,3,'C002','bbjk',3,154.00),(24,1,5,'E001','Random Rubble Masonry in cement Mortar 1:5, above 1 cube.',1,38460.00),(25,1,4,'C016','Lintol, cement concrete 1:2:4(3/4\") 4 1/2\" x 6\" (Reinforcement paid for separately)',3,320.00),(26,10,1,'A001','Demolisher unnecessary things and Land Cleaning',1,1400.00),(27,10,2,'B001','Asbestos Roof Removing',2,900.00),(28,10,2,'B002','Slab Roof Removing',2,500.00),(29,10,2,'B003','Timber Roof Removing',2,750.00),(30,10,3,'B004','Brick Wall Removing',1,950.00),(31,10,3,'B005','Block Wall Removing',1,900.00),(32,10,4,'B006','All Categories Tiles',2,450.00),(33,10,5,'C001','Digging Pits for Foundation',1,1120.00),(34,10,6,'C002','Filling Foundations(For All Both DPC-Primary & DPC-Mixed)',1,1700.00),(35,10,28,'K001','Door,1 1/4\" thick plywood ordinary finish (Moisture Resistant) single sash, size 2\'  9\'\'x 6\'',4,7500.00),(36,10,7,'D001','Mixing and Placing of cement concrete 1:3:6 with  in ground floor(foundation)',1,1200.00),(37,10,8,'D002','Drains semi-circular in cement concrete 1:3:6',3,100.00),(38,10,9,'D003','Cement concrete 1:2:4(3/4\") in column',1,20000.00),(39,10,10,'D004','Cement concrete 1:2:4(3/4\") in beams',1,12000.00),(40,10,11,'D005','5\" thick R.C.C. in floors slab using mixer and vibrator',2,20000.00),(41,10,12,'E001','Brick wall binding with(5/8\") thick plastering',1,1000.00),(42,10,12,'E002','Block binding with (5/8\") thick plastering',1,800.00),(43,10,13,'F001','Semi-circular, forming in cement concrete floors with polishing',3,100.00),(44,10,14,'F002','Fixing tiles (16\' x 16\'-Lanka tile) on floors with all specials, including raking plaster and cement mortar',4,80.00),(45,10,15,'F003','Cut cement floor 1/2\" thick,',2,800.00),(46,10,16,'F004','Granite floor tiles 12\" x 12\"x1/2\" (Local) supplying and fixing to floors including with cement mortar',4,1000.00),(47,10,17,'G001','Supply and fixing 4\'\'x2\'\' Ceiling (Timber)',2,200.00),(48,10,18,'G002','Setter roof Supplying and fixing(0.47mm) thick',3,500.00),(49,10,19,'G003','4\" thick in slab using mixer and vibrator( G.I wire as directed,plastered)',2,20000.00),(50,10,20,'G004','Corrugated asbestos  sheet walling on 4\"x2',2,20000.00),(51,10,21,'G005','Lunumidilla sheet thick 9mm and size 2440  x 300mm',3,15000.00),(52,10,22,'H001','Timber handrail height 34\' with circular design',3,1000.00),(53,10,23,'I001','Electric pannel (Orange) with lighting coonductor',5,20000.00),(54,10,24,'I002','Wiring and Installation h 2C,2.5mm2 PVC/PVC/CU with fitting switch/plug points',5,1200.00),(55,10,25,'J001','Supplying and fixing elbow, G.I 1/2\",Pipes G.I 1/2\" include',3,6000.00),(56,10,26,'J002','Rosel commode (20\" 1/4), UNION Nob,Flexible WC,Flush set,',5,40000.00),(57,10,27,'J003','Fixing(Rosel)- shower(any size),Angle Taps(metal),Bath tub tap',5,20000.00),(58,11,1,'A001','Cleaning For land',4,420.00),(59,11,6,'C001','Filling foundationblack stone with soil',1,520.00),(60,12,1,'A001','Demolisher unnecessary things and Land Cleaning',1,1200.00),(61,12,3,'B004','Brick wall Removing',1,800.00),(62,12,3,'B005','Block Wall Removing',1,850.00),(63,12,5,'C001','Digging Pits for Foundation',1,1200.00);
/*!40000 ALTER TABLE `bsr_has_bsrsubcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bsrcategory`
--

DROP TABLE IF EXISTS `bsrcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bsrcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `code` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsrcategory`
--

LOCK TABLES `bsrcategory` WRITE;
/*!40000 ALTER TABLE `bsrcategory` DISABLE KEYS */;
INSERT INTO `bsrcategory` VALUES (1,'DEMOLISHER','A'),(2,'REMOVING','B'),(3,'EXCAVATORING','C'),(4,'CONCRETE','D'),(5,'WALLING','E'),(6,'PAVIOR','F'),(7,'ROOFER','G'),(8,'STAIRE CASE','H'),(9,'WIRING-F','I'),(10,'PLUMBLER','J'),(11,'EXTERNAL FITTING','K');
/*!40000 ALTER TABLE `bsrcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bsrstatus`
--

DROP TABLE IF EXISTS `bsrstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bsrstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsrstatus`
--

LOCK TABLES `bsrstatus` WRITE;
/*!40000 ALTER TABLE `bsrstatus` DISABLE KEYS */;
INSERT INTO `bsrstatus` VALUES (1,'Active'),(2,'In-Active'),(3,'Deleted');
/*!40000 ALTER TABLE `bsrstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bsrsubcategory`
--

DROP TABLE IF EXISTS `bsrsubcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bsrsubcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `bsrcategory_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bsrsubcategory_bsrcategory1_idx` (`bsrcategory_id`),
  CONSTRAINT `fk_bsrsubcategory_bsrcategory1` FOREIGN KEY (`bsrcategory_id`) REFERENCES `bsrcategory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bsrsubcategory`
--

LOCK TABLES `bsrsubcategory` WRITE;
/*!40000 ALTER TABLE `bsrsubcategory` DISABLE KEYS */;
INSERT INTO `bsrsubcategory` VALUES (1,'Cleaning',1),(2,'Roof Removing',2),(3,'Walls Removing',2),(4,'Tiles Removing',2),(5,'Turning Pits',3),(6,'Filling Foundation',3),(7,'Concreting Mass',4),(8,'Concreting Drains',4),(9,'Concreting of Columns',4),(10,'Concreting of Beams',4),(11,'Concreting Slabs',4),(12,'Wall Binding & Plastering',5),(13,'Concrete Floor',6),(14,'Tile Floor',6),(15,'Cut Cement Floor',6),(16,'Granite Floor',6),(17,'Ceiling Roof',7),(18,'Setter Roof',7),(19,'Slab Roof',7),(20,'Asbestos Roof',7),(21,'Lunumidilla Roof',7),(22,'Staire Case Binding',8),(23,'Electric Pannel Fitting',9),(24,'Wiring Points',9),(25,'Pipes G.I with Elbow Fitting',10),(26,'Toilet Fitting',10),(27,'Bathroom Fitting',10),(28,'Door Fiffing',11),(29,'Window Fitting',11);
/*!40000 ALTER TABLE `bsrsubcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `civilstatus`
--

DROP TABLE IF EXISTS `civilstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `civilstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `civilstatus`
--

LOCK TABLES `civilstatus` WRITE;
/*!40000 ALTER TABLE `civilstatus` DISABLE KEYS */;
INSERT INTO `civilstatus` VALUES (1,'Married'),(2,'Unmarried');
/*!40000 ALTER TABLE `civilstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `constructionsubtask_has_floorarea`
--

DROP TABLE IF EXISTS `constructionsubtask_has_floorarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `constructionsubtask_has_floorarea` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int NOT NULL,
  `floorarea_id` int NOT NULL,
  `numberofbedroom` int DEFAULT NULL,
  `numberofbathroom` int DEFAULT NULL,
  `numberofkitchen` int DEFAULT NULL,
  `numberoflivingroom` int DEFAULT NULL,
  `numberofdinningroom` int DEFAULT NULL,
  `numberofpantry` int DEFAULT NULL,
  `numberofguestroom` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_constructionsubtask_has_floorarea_floorarea1_idx` (`floorarea_id`),
  KEY `fk_constructionsubtask_has_floorarea_reservation1_idx` (`reservation_id`),
  CONSTRAINT `fk_constructionsubtask_has_floorarea_floorarea1` FOREIGN KEY (`floorarea_id`) REFERENCES `floorarea` (`id`),
  CONSTRAINT `fk_constructionsubtask_has_floorarea_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `constructionsubtask_has_floorarea`
--

LOCK TABLES `constructionsubtask_has_floorarea` WRITE;
/*!40000 ALTER TABLE `constructionsubtask_has_floorarea` DISABLE KEYS */;
INSERT INTO `constructionsubtask_has_floorarea` VALUES (1,1,1,2,1,1,1,1,1,NULL),(2,4,1,2,1,1,NULL,NULL,NULL,NULL),(3,5,1,2,1,1,1,1,1,NULL),(6,8,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,8,2,2,1,1,NULL,1,NULL,NULL),(8,4,2,2,1,NULL,NULL,NULL,NULL,NULL),(9,4,3,2,1,NULL,NULL,NULL,NULL,NULL),(10,9,1,2,1,1,NULL,NULL,NULL,NULL),(11,9,2,2,1,1,NULL,NULL,NULL,NULL),(12,10,1,2,1,1,NULL,NULL,NULL,NULL),(13,11,1,2,1,1,NULL,NULL,NULL,NULL),(14,14,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,15,1,2,1,1,NULL,NULL,NULL,NULL),(16,16,1,2,1,1,NULL,NULL,NULL,NULL),(17,17,1,2,1,1,NULL,NULL,NULL,NULL),(18,18,1,2,1,1,NULL,NULL,NULL,NULL),(19,19,1,2,1,1,NULL,NULL,NULL,NULL),(20,19,2,2,1,NULL,NULL,NULL,NULL,NULL),(21,20,1,2,1,1,NULL,NULL,NULL,NULL),(22,21,1,2,1,1,NULL,NULL,NULL,NULL),(23,22,1,2,1,1,NULL,NULL,NULL,NULL),(24,23,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,24,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(26,25,1,2,1,1,NULL,NULL,NULL,NULL),(27,26,1,2,1,1,NULL,NULL,NULL,NULL),(28,27,1,2,1,1,NULL,NULL,NULL,NULL),(29,28,1,1,1,1,NULL,NULL,NULL,1),(30,29,1,2,1,1,NULL,NULL,NULL,NULL),(31,30,1,2,1,1,NULL,NULL,NULL,NULL),(32,31,1,2,1,1,NULL,NULL,NULL,NULL),(33,31,2,2,1,1,NULL,NULL,NULL,NULL),(34,32,1,2,NULL,1,NULL,NULL,NULL,NULL),(35,33,1,1,NULL,1,NULL,NULL,NULL,NULL),(36,34,1,2,1,1,NULL,NULL,NULL,NULL),(37,35,1,2,1,1,NULL,NULL,NULL,NULL),(38,36,1,2,1,1,NULL,NULL,NULL,NULL),(39,36,2,2,1,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `constructionsubtask_has_floorarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `constructionsubtask_has_floorarea_has_housesubparts`
--

DROP TABLE IF EXISTS `constructionsubtask_has_floorarea_has_housesubparts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `constructionsubtask_has_floorarea_has_housesubparts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `constructionsubtask_has_floorarea_id` int NOT NULL,
  `housesubparts_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_constructionsubtask_has_floorarea_has_housesubparts_hous_idx` (`housesubparts_id`),
  KEY `fk_constructionsubtask_has_floorarea_has_housesubparts_cons_idx` (`constructionsubtask_has_floorarea_id`),
  CONSTRAINT `fk_constructionsubtask_has_floorarea_has_housesubparts_constr1` FOREIGN KEY (`constructionsubtask_has_floorarea_id`) REFERENCES `constructionsubtask_has_floorarea` (`id`),
  CONSTRAINT `fk_constructionsubtask_has_floorarea_has_housesubparts_houses1` FOREIGN KEY (`housesubparts_id`) REFERENCES `housesubparts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `constructionsubtask_has_floorarea_has_housesubparts`
--

LOCK TABLES `constructionsubtask_has_floorarea_has_housesubparts` WRITE;
/*!40000 ALTER TABLE `constructionsubtask_has_floorarea_has_housesubparts` DISABLE KEYS */;
INSERT INTO `constructionsubtask_has_floorarea_has_housesubparts` VALUES (1,1,10),(2,1,7),(3,1,8),(4,1,11),(5,6,10),(6,6,7),(7,6,11),(8,6,23),(9,6,8),(10,6,18),(11,7,1),(12,7,4),(13,7,6),(14,3,18),(15,3,41),(16,3,13),(17,2,7),(18,2,9),(19,2,10),(20,2,1),(21,2,4),(22,2,6),(23,2,13),(24,2,18),(25,8,1),(26,8,6),(27,9,1),(28,9,6),(29,9,18),(30,3,7),(31,10,10),(32,10,7),(33,10,11),(34,10,8),(35,10,30),(36,10,1),(37,10,4),(38,10,6),(39,10,18),(40,10,13),(41,10,41),(42,11,1),(43,11,4),(44,11,6),(45,11,16),(46,11,13),(47,11,41),(48,10,42),(49,11,24),(50,12,10),(51,12,7),(52,12,8),(53,12,11),(54,12,1),(55,12,4),(56,12,6),(57,12,18),(58,12,13),(59,13,10),(60,13,7),(61,13,9),(62,13,30),(63,13,1),(64,13,4),(65,13,6),(66,13,18),(67,13,13),(68,13,41),(69,14,10),(70,14,7),(71,14,8),(72,14,1),(73,14,6),(74,15,10),(75,15,7),(76,15,30),(77,15,1),(78,15,6),(79,15,4),(80,15,13),(81,15,18),(82,16,10),(83,16,7),(84,16,9),(85,16,30),(86,16,18),(87,16,13),(88,16,1),(89,16,4),(90,16,6),(91,17,10),(92,17,7),(93,17,9),(94,17,11),(95,17,30),(96,17,1),(97,17,4),(98,17,6),(99,17,18),(100,17,13),(101,18,10),(102,18,7),(103,18,9),(104,18,11),(105,18,30),(106,18,1),(107,18,4),(108,18,6),(109,19,7),(110,19,9),(111,19,30),(112,19,11),(113,19,1),(114,19,4),(115,19,6),(116,19,18),(117,19,13),(118,19,28),(119,19,41),(120,20,1),(121,20,6),(122,20,13),(123,20,18),(124,20,41),(125,21,10),(126,21,7),(127,21,8),(128,21,11),(129,21,30),(130,21,18),(131,21,41),(132,21,1),(133,21,4),(134,21,6),(135,22,10),(136,22,7),(137,22,11),(138,22,30),(139,22,8),(140,22,1),(141,22,4),(142,22,6),(143,22,41),(144,22,13),(145,22,18),(146,23,10),(147,23,7),(148,24,7),(149,24,10),(150,25,10),(151,25,7),(152,26,10),(153,26,7),(154,26,11),(155,26,30),(156,26,1),(157,26,6),(158,26,4),(159,27,10),(160,27,7),(161,27,11),(162,27,30),(163,27,1),(164,27,6),(165,27,4),(166,27,18),(167,27,13),(168,28,10),(169,28,7),(170,28,8),(171,28,1),(172,28,6),(173,28,4),(174,29,10),(175,29,7),(176,29,11),(177,29,30),(178,29,1),(179,29,4),(180,29,6),(181,29,44),(182,29,18),(183,29,13),(184,30,10),(185,30,7),(186,30,11),(187,30,30),(188,30,1),(189,30,4),(190,30,6),(191,30,18),(192,30,13),(193,31,10),(194,31,7),(195,31,8),(196,31,11),(197,31,30),(198,31,1),(199,31,4),(200,31,6),(201,31,18),(202,31,13),(203,32,10),(204,32,7),(205,32,11),(206,32,30),(207,32,8),(208,32,18),(209,32,13),(210,32,1),(211,32,4),(212,32,6),(213,33,1),(214,33,4),(215,33,6),(216,33,13),(217,33,18),(218,34,10),(219,34,7),(220,34,11),(221,34,30),(222,34,8),(223,34,1),(224,34,6),(225,34,4),(226,35,7),(227,35,10),(228,35,11),(229,35,1),(230,35,4),(231,36,7),(232,36,10),(233,36,11),(234,36,1),(235,36,4),(236,36,6),(237,37,10),(238,37,7),(239,37,9),(240,37,1),(241,37,4),(242,37,6),(243,38,10),(244,38,7),(245,38,11),(246,38,30),(247,38,1),(248,38,4),(249,38,6),(250,38,9),(251,38,18),(252,38,13),(253,39,1),(254,39,6),(255,39,18),(256,39,13);
/*!40000 ALTER TABLE `constructionsubtask_has_floorarea_has_housesubparts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `constructiontype`
--

DROP TABLE IF EXISTS `constructiontype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `constructiontype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `constructiontype`
--

LOCK TABLES `constructiontype` WRITE;
/*!40000 ALTER TABLE `constructiontype` DISABLE KEYS */;
INSERT INTO `constructiontype` VALUES (1,'New House Build'),(2,'Modify House');
/*!40000 ALTER TABLE `constructiontype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactmedia`
--

DROP TABLE IF EXISTS `contactmedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactmedia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactmedia`
--

LOCK TABLES `contactmedia` WRITE;
/*!40000 ALTER TABLE `contactmedia` DISABLE KEYS */;
INSERT INTO `contactmedia` VALUES (1,'Relatives'),(2,'Facebook'),(3,'News paper');
/*!40000 ALTER TABLE `contactmedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `regno` char(10) NOT NULL,
  `fullname` varchar(225) NOT NULL,
  `callingname` varchar(150) NOT NULL,
  `nic` char(12) NOT NULL,
  `visitcount` int DEFAULT NULL,
  `address` text NOT NULL,
  `description` text,
  `mobile` char(10) NOT NULL,
  `telephone` char(10) NOT NULL,
  `workplacedetails` text,
  `email` varchar(150) NOT NULL,
  `addedate` date NOT NULL,
  `arrearsamount` decimal(12,2) DEFAULT NULL,
  `contactmedia_id` int NOT NULL,
  `customerstatus_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `regno_UNIQUE` (`regno`),
  KEY `fk_customer_contactmedia1_idx` (`contactmedia_id`),
  KEY `fk_customer_customerstatus1_idx` (`customerstatus_id`),
  KEY `fk_customer_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_customer_contactmedia1` FOREIGN KEY (`contactmedia_id`) REFERENCES `contactmedia` (`id`),
  CONSTRAINT `fk_customer_customerstatus1` FOREIGN KEY (`customerstatus_id`) REFERENCES `customerstatus` (`id`),
  CONSTRAINT `fk_customer_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'C000000001','Sunil Perera','Sunil','601245785V',NULL,'24A Nawala Rd,Nugegoda',NULL,'0774841254','0112478966','Officer','sunila120@gmail.com','2021-05-24',1000.00,3,3,1),(2,'C000000002','Rahul Chahar','Rahul ','984152312V',NULL,'52/1A Kohuwala Rd,Colombo 07',NULL,'0777841569','0112654123','Airlines','rahul20@gmail.com','2021-06-21',20000.00,3,3,1),(3,'C000000003','Dasun Perera','Dasun','852952302V',NULL,'16A Delkada Rd, Nugegoda',NULL,'0112856984','0775841237','Officer','dasun150@gmail.com','2021-08-11',12821060.00,2,3,1),(4,'C000000004','Shawn Perera','Shawn','841245789V',NULL,'16A perakum Rd, Nugegoda',NULL,'0774578968','0112484569',NULL,'shawn560@gmail.com','2021-08-12',3451060.00,2,3,1),(5,'C000000005','Pramod Perera','Pramod','861475412V',NULL,'16A Nawala Rd, Nugegoda',NULL,'077841280','0775698452','Seller','pramod150@gmail.com','2021-08-14',10821060.00,2,3,1),(6,'C000000006','Shami Ashwin','Shami','784152632V',NULL,'14A wijeraama Rd, Nugegoda',NULL,'0778954124','0112457480','Seller','Shami150@gmail.com','2021-08-17',0.00,2,3,1),(7,'C000000007','wijenaayake','Shane','866974520V',0,'16A Kohuwala Rd,Nugegoda',NULL,'0778474125','0112745896',NULL,'shane120@gmail.com','2021-08-19',15760.00,2,1,1),(8,'C000000008','Amal Perera','Amal','874157238V',NULL,'14A Mirihaana Rd, Nugegoda',NULL,'0775241698','0778415478',NULL,'amal150@gmail.com','2021-09-12',0.00,2,3,1),(9,'C000000009','Vidhura Ranasinghe','Vidhura','685241265V',NULL,'15A Kandawatta Rd,Nugegoda',NULL,'0778745982','0112845690','Seller','vidhura120@gmail.com','2021-10-05',0.00,3,3,1),(10,'C000000010','Sunil Nishantha Perera','Sunil','784956210V',NULL,'203/5 Densilkobbakaduwa Rd, Battaramulla',NULL,'0112541689','0789648524',NULL,'nishantha150@gmail.com','2021-11-27',0.00,2,3,1),(11,'C000000011','Mr. Ruwan Jayawardhana','Ruwan','813521502V',NULL,'24/2 Rangala Rd,Theldeniya',NULL,'0772541632','0112859652',NULL,'ruwan120@gmail.com','2022-01-27',0.00,2,3,1),(12,'C000000012','Amal Kumar Rathnayake','Amal','882562650V',NULL,'14B Kanndawaththa Rd, Kirulupana',NULL,'0778541562','0112784512',NULL,'amal150@gmail.com','2022-02-08',9000.00,2,3,1),(13,'C000000013','Wishwa Amarasighe','Wishwa','852456321V',NULL,'25/2 Purwaraama Rd, Nugegoda',NULL,'0778954156','0112784596',NULL,'wiswa150@gmail.com','2022-02-13',6000.00,2,3,1),(14,'C000000014','Nirmal Iervin Perera','Nirmal','681285632V',5,'18/6 Kandawaththa Rd,Nugegoda',NULL,'0778596452','0112784152',NULL,'nirmal150@gmail.com','2022-02-18',23927060.00,1,3,1),(15,'C000000015','Kelum Nirmal Nanayakkara','Kelum','892545124V',0,'25/5 Kirulapana Rd, Colombo 05',NULL,'0774896235','0112784512',NULL,'kelum160@gmail.com','2022-02-23',99750.00,2,1,1),(16,'C000000016','Shehan Jayawardhana','Shehan','852562452V',0,'15A Mirihaana Rd, Nugegoda011',NULL,'0775685412','0112748596',NULL,'Shami140@gmail.com','2022-03-02',99838.00,1,1,1),(17,'C000000017','Sagara Niyomal Perera','Sagara','841254563V',0,'25/4 Gangoda wila Rd, Nugegoda',NULL,'0778545693','0778541236',NULL,'sagara123@gmail.com','2022-03-06',8000.00,1,1,12),(18,'C000000018','Kanchana Perera','Kanchana','788545236V',0,'14A wijeraama Rd, Nugegoda',NULL,'0778596456','0112758596',NULL,'Shami150@gmail.com','2022-04-16',19176.00,2,1,2),(19,'C000000019','Bhagya Kumari Perera','Bhaggya','845624521V',0,'15A,Jambugasmulla Rd,Nugegoda',NULL,'0778456982','0112748596',NULL,'sunila120@gmail.com','2022-04-25',36520.00,2,1,12),(20,'C000000020','Disnesh Gunawardhana','Disnesh','451241524V',0,'12A Kajuwatta road Kohuwala',NULL,'0778415412','0112468541',NULL,'dinseh120@gmail.com','2022-05-05',40664.00,2,1,2),(21,'C000000021','Sanka wishwakeerithi','Sanka','981452620V',0,'12A maligawaththa Rd,Colombo 12',NULL,'0778584125','0112745841',NULL,'sanka150@gmail.com','2022-05-19',22460.00,2,1,2),(22,'C000000022','Lakshan Hashendra Wickckramasinghe','Lakshan','951241781V',1,'28A Nikethana Roda Sri Jayawardhanapura Kotte',NULL,'0756273298','0112784152',NULL,'lakshan150@gmail.com','2022-05-19',7586.00,1,1,2),(23,'C000000023','Ashad Shafique','Shafique','942514201V',1,'14A Sampath Rd, Nugegoda',NULL,'0778954123','0112458745',NULL,'shafique120@gmail.com','2022-05-19',306280.00,1,1,2);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerpayment`
--

DROP TABLE IF EXISTS `customerpayment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerpayment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `billcode` char(10) NOT NULL,
  `reservation_id` int NOT NULL,
  `paymentcategory_id` int NOT NULL,
  `reservationprogress_id` int DEFAULT NULL,
  `progressamount` decimal(20,2) DEFAULT NULL,
  `totalamount` decimal(20,2) NOT NULL,
  `lastbalance` decimal(20,2) NOT NULL,
  `paidamount` decimal(20,2) NOT NULL,
  `newbalance` decimal(20,2) NOT NULL,
  `paymentdate` date NOT NULL,
  `paymentmethod_id` int NOT NULL,
  `chequenumber` char(15) DEFAULT NULL,
  `chequedate` date DEFAULT NULL,
  `bankname` varchar(100) DEFAULT NULL,
  `bankaccountno` char(15) DEFAULT NULL,
  `holdername` varchar(150) DEFAULT NULL,
  `depositdatetime` datetime DEFAULT NULL,
  `bankbranchname` varchar(150) DEFAULT NULL,
  `transferid` char(15) DEFAULT NULL,
  `description` text,
  `paymentstatus_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_customerpayment_reservation1_idx` (`reservation_id`),
  KEY `fk_customerpayment_paymentcategory1_idx` (`paymentcategory_id`),
  KEY `fk_customerpayment_reservationprogress1_idx` (`reservationprogress_id`),
  KEY `fk_customerpayment_paymentmethod1_idx` (`paymentmethod_id`),
  KEY `fk_customerpayment_paymentstatus1_idx` (`paymentstatus_id`),
  KEY `fk_customerpayment_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_customerpayment_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_customerpayment_paymentcategory1` FOREIGN KEY (`paymentcategory_id`) REFERENCES `paymentcategory` (`id`),
  CONSTRAINT `fk_customerpayment_paymentmethod1` FOREIGN KEY (`paymentmethod_id`) REFERENCES `paymentmethod` (`id`),
  CONSTRAINT `fk_customerpayment_paymentstatus1` FOREIGN KEY (`paymentstatus_id`) REFERENCES `paymentstatus` (`id`),
  CONSTRAINT `fk_customerpayment_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`),
  CONSTRAINT `fk_customerpayment_reservationprogress1` FOREIGN KEY (`reservationprogress_id`) REFERENCES `reservationprogress` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerpayment`
--

LOCK TABLES `customerpayment` WRITE;
/*!40000 ALTER TABLE `customerpayment` DISABLE KEYS */;
INSERT INTO `customerpayment` VALUES (1,'B000000001',9,1,NULL,0.00,672996.00,672996.00,100000.00,572996.00,'2022-02-06',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,1),(2,'B000000002',10,1,NULL,0.00,1201604.00,1201604.00,1201604.00,1101604.00,'2022-02-13',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(7,'B000000003',17,1,NULL,0.00,436660.00,436660.00,10000.00,426660.00,'2022-02-20',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(10,'B000000004',17,4,3,2869600.00,3316260.00,3106260.00,20000.00,3086260.00,'2022-02-20',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(11,'B000000005',18,1,NULL,0.00,19854540.00,19854540.00,10000.00,19844540.00,'2022-02-20',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(12,'B000000006',18,4,4,19614400.00,19854540.00,19844540.00,10000.00,19834540.00,'2022-02-20',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(13,'B000000007',19,1,NULL,0.00,90750.00,90750.00,10000.00,80750.00,'2022-02-23',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(14,'B000000008',21,1,NULL,0.00,9000.00,9000.00,1000.00,8000.00,'2022-03-11',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(15,'B000000009',27,1,NULL,0.00,18300.00,18300.00,10000.00,8300.00,'2022-04-26',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,2),(16,'B000000010',30,1,5,10080.00,28150.00,28150.00,10000.00,18150.00,'2022-04-27',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,2),(17,'B000000011',30,4,6,4480.00,28150.00,18150.00,1000.00,17150.00,'2022-04-30',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,2),(18,'B000000012',31,1,NULL,0.00,24272.00,24272.00,1000.00,23272.00,'2022-05-05',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,2),(19,'B000000013',32,1,NULL,0.00,9000.00,9000.00,9000.00,0.00,'2022-05-19',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,2);
/*!40000 ALTER TABLE `customerpayment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerstatus`
--

DROP TABLE IF EXISTS `customerstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerstatus`
--

LOCK TABLES `customerstatus` WRITE;
/*!40000 ALTER TABLE `customerstatus` DISABLE KEYS */;
INSERT INTO `customerstatus` VALUES (1,'Active'),(2,'Inactive'),(3,'Deleted');
/*!40000 ALTER TABLE `customerstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` VALUES (1,'Admin'),(2,'Manager'),(3,'Supervisor'),(4,'Designer'),(5,'QS'),(6,'Labor'),(7,'Sales Executive');
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designerassignment`
--

DROP TABLE IF EXISTS `designerassignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designerassignment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int NOT NULL,
  `assigndate` date NOT NULL,
  `completeddate` date DEFAULT NULL,
  `actualcompleteddate` date DEFAULT NULL,
  `desingerstatus_id` int NOT NULL,
  `description` text,
  `employee_id` int NOT NULL,
  `designeremployee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_designerassignment_reservation1_idx` (`reservation_id`),
  KEY `fk_designerassignment_employee2_idx` (`employee_id`),
  KEY `fk_designerassignment_desingerstatus1_idx` (`desingerstatus_id`),
  KEY `fk_designerassignment_employee1_idx` (`designeremployee_id`),
  CONSTRAINT `fk_designerassignment_desingerstatus1` FOREIGN KEY (`desingerstatus_id`) REFERENCES `desingerstatus` (`id`),
  CONSTRAINT `fk_designerassignment_employee1` FOREIGN KEY (`designeremployee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_designerassignment_employee2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_designerassignment_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designerassignment`
--

LOCK TABLES `designerassignment` WRITE;
/*!40000 ALTER TABLE `designerassignment` DISABLE KEYS */;
INSERT INTO `designerassignment` VALUES (1,1,'2021-11-23','2021-11-30','2021-11-29',3,NULL,1,1),(2,2,'2021-12-04','2021-12-11','2021-12-10',1,'New Assign designer',1,1),(3,3,'2021-12-05','2021-12-12','2021-12-10',1,NULL,1,1),(4,1,'2021-12-05','2021-12-12','2021-12-10',1,NULL,1,1),(5,2,'2021-12-22','2021-12-29','2021-12-28',1,NULL,1,1),(6,8,'2022-01-21','2022-01-28','2022-01-20',1,NULL,1,9),(7,9,'2022-01-27','2022-02-03','2022-01-30',1,NULL,1,3),(8,10,'2022-02-08','2022-02-15','2022-03-10',1,NULL,1,3),(9,16,'2022-02-15','2022-02-22','2022-02-16',1,NULL,1,3),(10,17,'2022-02-18','2022-02-25',NULL,1,NULL,1,3),(11,18,'2022-02-20','2022-02-27','2022-02-21',1,NULL,1,3),(12,19,'2022-02-23','2022-03-02','2022-05-05',1,NULL,1,3),(13,20,'2022-03-02','2022-03-09',NULL,1,NULL,1,3),(14,21,'2022-03-06','2022-03-13','2022-03-08',1,NULL,2,3),(15,22,'2022-03-10','2022-03-17','2022-03-10',1,NULL,2,3),(16,23,'2022-03-10','2022-03-17','2022-03-10',1,NULL,2,3),(17,24,'2022-03-10','2022-03-17','2022-03-10',1,NULL,2,3),(18,25,'2022-03-13','2022-03-20','2022-03-13',1,NULL,1,3),(19,26,'2022-03-21','2022-03-28','2022-03-21',1,NULL,2,3),(20,27,'2022-03-21','2022-03-28','2022-03-21',1,NULL,2,3),(21,28,'2022-03-28','2022-04-04','2022-03-28',1,NULL,2,3),(22,29,'2022-04-16','2022-04-23','2022-04-16',1,NULL,2,3),(23,30,'2022-04-25','2022-05-02','2022-04-25',1,NULL,2,3),(24,31,'2022-05-05','2022-05-12','2022-05-05',1,NULL,2,3),(25,32,'2022-05-19','2022-05-26','2022-05-19',1,NULL,2,3),(26,35,'2022-05-19','2022-05-26','2022-05-19',1,NULL,2,3),(27,36,'2022-05-22','2022-05-29','2022-05-22',1,NULL,2,3);
/*!40000 ALTER TABLE `designerassignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desingerstatus`
--

DROP TABLE IF EXISTS `desingerstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `desingerstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desingerstatus`
--

LOCK TABLES `desingerstatus` WRITE;
/*!40000 ALTER TABLE `desingerstatus` DISABLE KEYS */;
INSERT INTO `desingerstatus` VALUES (1,'Active'),(2,'In-Active'),(3,'Deleted');
/*!40000 ALTER TABLE `desingerstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eistatus`
--

DROP TABLE IF EXISTS `eistatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eistatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eistatus`
--

LOCK TABLES `eistatus` WRITE;
/*!40000 ALTER TABLE `eistatus` DISABLE KEYS */;
INSERT INTO `eistatus` VALUES (1,'Available'),(2,'Not-Available'),(3,'Low-Inventory');
/*!40000 ALTER TABLE `eistatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` char(6) NOT NULL,
  `fullname` varchar(225) NOT NULL,
  `callingname` varchar(100) NOT NULL,
  `photo` mediumblob,
  `dobirth` date DEFAULT NULL,
  `nic` char(12) NOT NULL,
  `address` text,
  `mobile` char(10) DEFAULT NULL,
  `land` char(10) DEFAULT NULL,
  `description` text,
  `doassignment` date DEFAULT NULL,
  `employeestatus_id` int NOT NULL,
  `civilstatus_id` int NOT NULL,
  `designation_id` int NOT NULL,
  `gender_id` int NOT NULL,
  `currentreservationcode` char(10) DEFAULT NULL,
  `projecttitle` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number_UNIQUE` (`number`),
  UNIQUE KEY `nic_UNIQUE` (`nic`),
  KEY `fk_employee_employeestatus1_idx` (`employeestatus_id`),
  KEY `fk_employee_civilstatus1_idx` (`civilstatus_id`),
  KEY `fk_employee_designation1_idx` (`designation_id`),
  KEY `fk_employee_gender1_idx` (`gender_id`),
  CONSTRAINT `fk_employee_civilstatus1` FOREIGN KEY (`civilstatus_id`) REFERENCES `civilstatus` (`id`),
  CONSTRAINT `fk_employee_designation1` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`id`),
  CONSTRAINT `fk_employee_employeestatus1` FOREIGN KEY (`employeestatus_id`) REFERENCES `employeestatus` (`id`),
  CONSTRAINT `fk_employee_gender1` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'210001','Bit Project','Admin',NULL,'2021-01-01','000000000V','Gampaha','0710000000',NULL,NULL,'2021-01-01',2,1,1,1,NULL,NULL),(2,'220001','Kamal Nishantha Perera','Nishantha',NULL,'1984-12-17','843521817V','24A Nawala Rd,Nugegoda','0774841252',NULL,NULL,'2022-01-15',2,1,3,1,NULL,NULL),(3,'220002','Upul Wickckramasighe','Upul',NULL,'1988-12-17','883521818V','15/1 Kirulapana Rd, Nugegoda','0778954124','0112784521',NULL,'2022-01-15',1,1,4,1,NULL,NULL),(4,'220003','Aravinda Rathnayake','Aravinda',NULL,'1978-12-18','783521817V','18/5 Purwaraama Rd, Nugegoda','0775241699','0112458745',NULL,'2022-01-15',1,1,5,1,NULL,NULL),(5,'220004','Priyantha Bandaara','Priyantha',NULL,'1986-12-18','863521811V','12/2 Bellanwila Rd,Aththidiya','0778545963',NULL,NULL,'2022-01-15',1,1,6,1,NULL,NULL),(6,'220005','Wishwa Kumara Kulathunga','Kumara',NULL,'1975-12-18','753521813V','20/5 Ambalangoda Rd,Galle','0774841254',NULL,NULL,'2022-01-15',2,1,6,1,'R000000003','Drawing plan and Single Floor making House'),(7,'220006','Namal Priyasantha Silva','Namal',NULL,'1974-09-09','742521817V','14/6 Deewaala Rd, Maharagama','0779648741',NULL,NULL,'2022-01-15',1,1,6,1,NULL,NULL),(8,'220007','Piyal Karunarathne Pallegama','Karunarathne',NULL,'1970-08-30','702421815V','85/6 Rangala Rd,Theldeniya','0758412569',NULL,NULL,'2022-01-15',1,1,6,1,NULL,NULL),(9,'220008','Sugath Piyasantha Wimalaweera','Sugath',NULL,'1982-12-08','823421811V','16/5 Nuwara Rd, Nittambuwa','0764587456','0112458736',NULL,'2022-01-21',1,1,4,1,NULL,NULL),(10,'220009','Vinod Kirshna Kumar','Vinod',NULL,'1989-11-18','893221817V','20/6 Kohuwala Rd, Nugegoda','0774598523','0112758459',NULL,'2022-01-21',1,1,5,1,NULL,NULL),(11,'220010','Wasantha Upul Jayawickram','Wasantha',NULL,'1974-12-18','743521809V','256/26 Raththanapitiya Rd,Wijeeraama','0775641785','0112759412',NULL,'2022-01-27',1,1,3,1,NULL,NULL),(12,'220011','Akila Ariyawansa Perera','Akila',NULL,'1984-05-04','841259623V','18/9 Rupasiri Rd, Mirihana','0778541236',NULL,NULL,'2022-03-06',1,1,7,1,NULL,NULL),(13,'220012','Piyal Hewage Karunadasa','Karunadasa',NULL,'1975-05-04','751245203V','23/8 Deewaala Road, Maharagama','0778514566',NULL,NULL,'2022-05-22',2,1,6,1,'R000000004','Drawing plan and Two Floor making');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeestatus`
--

DROP TABLE IF EXISTS `employeestatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeestatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeestatus`
--

LOCK TABLES `employeestatus` WRITE;
/*!40000 ALTER TABLE `employeestatus` DISABLE KEYS */;
INSERT INTO `employeestatus` VALUES (1,'Available'),(2,'Not-Available'),(3,'Deleted');
/*!40000 ALTER TABLE `employeestatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `epmrtracking`
--

DROP TABLE IF EXISTS `epmrtracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `epmrtracking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `reservation_id` int NOT NULL,
  `assigndatetime` datetime NOT NULL,
  `removedatetime` datetime NOT NULL,
  `nofoworkingdates` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_epmrtracking_employee1_idx` (`employee_id`),
  KEY `fk_epmrtracking_reservation1_idx` (`reservation_id`),
  CONSTRAINT `fk_epmrtracking_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_epmrtracking_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `epmrtracking`
--

LOCK TABLES `epmrtracking` WRITE;
/*!40000 ALTER TABLE `epmrtracking` DISABLE KEYS */;
INSERT INTO `epmrtracking` VALUES (1,6,8,'2022-04-21 13:31:00','2022-04-21 13:42:00',2),(3,6,8,'2022-04-15 13:53:00','2022-04-21 13:54:00',6),(4,6,4,'2022-04-16 13:59:00','2022-04-21 14:00:00',5),(5,6,3,'2022-04-21 14:00:00','2022-04-24 14:00:00',0),(6,13,8,'2022-05-22 15:59:00','2022-05-22 16:01:00',0),(7,13,4,'2022-05-22 16:01:00','2022-05-28 16:03:00',0);
/*!40000 ALTER TABLE `epmrtracking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `equipmentcode` char(10) NOT NULL,
  `equipmentcategory_id` int NOT NULL,
  `equipmentname` varchar(150) NOT NULL,
  `quantity` int NOT NULL,
  `equipmentownby_id` int NOT NULL,
  `addeddate` date NOT NULL,
  `equipmentstatus_id` int NOT NULL,
  `description` text,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `equipmentcode_UNIQUE` (`equipmentcode`),
  UNIQUE KEY `equipmentname_UNIQUE` (`equipmentname`),
  KEY `fk_equipment_equipmentcategory1_idx` (`equipmentcategory_id`),
  KEY `fk_equipment_equipmentstatus1_idx` (`equipmentstatus_id`),
  KEY `fk_equipment_equipmentownby1_idx` (`equipmentownby_id`),
  KEY `fk_equipment_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_equipment_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_equipment_equipmentcategory1` FOREIGN KEY (`equipmentcategory_id`) REFERENCES `equipmentcategory` (`id`),
  CONSTRAINT `fk_equipment_equipmentownby1` FOREIGN KEY (`equipmentownby_id`) REFERENCES `equipmentownby` (`id`),
  CONSTRAINT `fk_equipment_equipmentstatus1` FOREIGN KEY (`equipmentstatus_id`) REFERENCES `equipmentstatus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
INSERT INTO `equipment` VALUES (1,'EQ00000001',2,'Roller Vehicle',2,1,'2021-08-16',1,NULL,1),(2,'EQ00000002',2,'Concrete Mixer-Medium',2,1,'2021-08-10',3,NULL,1),(3,'EQ00000003',2,'Grinder Vehicle-M',2,1,'2021-08-19',3,NULL,1),(4,'EQ00000004',2,'Grinder Vehicle-S',1,1,'2021-09-13',3,NULL,1),(5,'EQ00000005',3,'wheelbarrow',5,1,'2021-10-05',1,NULL,1),(7,'EQ00000006',4,'Steel Scrap Handler',4,1,'2022-01-16',1,NULL,1),(8,'EQ00000007',4,'Extension Ladder',3,1,'2022-03-15',1,NULL,1);
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipmentallocation`
--

DROP TABLE IF EXISTS `equipmentallocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipmentallocation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `escode` char(10) NOT NULL,
  `fromreservation_id` int NOT NULL,
  `estype_id` int NOT NULL,
  `toreservation_id` int DEFAULT NULL,
  `equipment_id` int NOT NULL,
  `assignqty` int DEFAULT NULL,
  `assigndatetime` datetime DEFAULT NULL,
  `removeqty` int DEFAULT NULL,
  `removedatetime` datetime DEFAULT NULL,
  `transferinqty` int DEFAULT NULL,
  `availablefromqty` int DEFAULT NULL,
  `availabletoqty` int DEFAULT NULL,
  `transfertofinalqty` int DEFAULT NULL,
  `transferindatetime` datetime DEFAULT NULL,
  `transferoutqty` int DEFAULT NULL,
  `transferoutdatetime` datetime DEFAULT NULL,
  `finalavqty` int NOT NULL,
  `addeddatetime` datetime NOT NULL,
  `description` text,
  `expectedremovedatetime` datetime DEFAULT NULL,
  `esstatus_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `escode_UNIQUE` (`escode`),
  KEY `fk_equipmentallocation_reservation1_idx` (`fromreservation_id`),
  KEY `fk_equipmentallocation_reservation2_idx` (`toreservation_id`),
  KEY `fk_equipmentallocation_equipment1_idx` (`equipment_id`),
  KEY `fk_equipmentallocation_estype1_idx` (`estype_id`),
  KEY `fk_equipmentallocation_esstatus1_idx` (`esstatus_id`),
  KEY `fk_equipmentallocation_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_equipmentallocation_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_equipmentallocation_equipment1` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`),
  CONSTRAINT `fk_equipmentallocation_esstatus1` FOREIGN KEY (`esstatus_id`) REFERENCES `esstatus` (`id`),
  CONSTRAINT `fk_equipmentallocation_estype1` FOREIGN KEY (`estype_id`) REFERENCES `estype` (`id`),
  CONSTRAINT `fk_equipmentallocation_reservation1` FOREIGN KEY (`fromreservation_id`) REFERENCES `reservation` (`id`),
  CONSTRAINT `fk_equipmentallocation_reservation2` FOREIGN KEY (`toreservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=276 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipmentallocation`
--

LOCK TABLES `equipmentallocation` WRITE;
/*!40000 ALTER TABLE `equipmentallocation` DISABLE KEYS */;
INSERT INTO `equipmentallocation` VALUES (246,'ES00000001',21,1,NULL,2,2,'2022-03-24 11:51:00',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,'2022-03-24 11:51:00',NULL,'2022-03-25 11:52:00',3,1),(250,'ES00000002',15,3,21,2,NULL,NULL,NULL,NULL,2,0,2,0,'2022-03-24 12:44:00',NULL,NULL,2,'2022-03-24 12:44:00',NULL,'2022-03-26 12:45:00',1,1),(251,'ES00000003',21,4,15,2,NULL,NULL,NULL,NULL,NULL,2,0,2,NULL,2,'2022-03-24 12:44:00',0,'2022-03-24 12:44:00',NULL,'2022-03-26 12:45:00',1,1),(252,'ES00000004',15,5,NULL,2,NULL,NULL,2,'2022-03-24 12:46:00',NULL,2,NULL,NULL,NULL,NULL,NULL,0,'2022-03-24 12:45:00',NULL,NULL,1,1),(253,'ES00000005',21,1,NULL,2,2,'2022-03-24 12:47:00',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,'2022-03-24 12:47:00',NULL,'2022-03-25 12:47:00',1,1),(254,'ES00000006',15,3,21,2,NULL,NULL,NULL,NULL,2,0,2,0,'2022-03-24 12:48:00',NULL,NULL,2,'2022-03-24 12:47:00',NULL,'2022-03-26 12:48:00',1,1),(255,'ES00000007',21,4,15,2,NULL,NULL,NULL,NULL,NULL,2,0,2,NULL,2,'2022-03-24 12:48:00',0,'2022-03-24 12:47:00',NULL,'2022-03-26 12:48:00',1,1),(256,'ES00000008',21,3,15,2,NULL,NULL,NULL,NULL,2,0,2,0,'2022-03-24 12:49:00',NULL,NULL,2,'2022-03-24 12:48:00',NULL,'2022-03-25 12:49:00',1,1),(257,'ES00000009',15,4,21,2,NULL,NULL,NULL,NULL,NULL,2,0,2,NULL,2,'2022-03-24 12:49:00',0,'2022-03-24 12:48:00',NULL,'2022-03-25 12:49:00',1,1),(258,'ES00000010',21,5,NULL,2,NULL,NULL,2,'2022-03-24 12:51:00',NULL,2,NULL,NULL,NULL,NULL,NULL,0,'2022-03-24 12:50:00',NULL,NULL,1,1),(259,'ES00000011',21,1,NULL,2,2,'2022-03-24 12:51:00',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,'2022-03-24 12:51:00',NULL,'2022-03-26 12:51:00',1,1),(260,'ES00000012',15,3,21,2,NULL,NULL,NULL,NULL,2,0,2,0,'2022-03-24 12:52:00',NULL,NULL,2,'2022-03-24 12:51:00',NULL,'2022-03-25 12:52:00',1,1),(261,'ES00000013',21,4,15,2,NULL,NULL,NULL,NULL,NULL,2,0,2,NULL,2,'2022-03-24 12:52:00',0,'2022-03-24 12:51:00',NULL,'2022-03-25 12:52:00',1,1),(262,'ES00000014',21,3,15,2,NULL,NULL,NULL,NULL,1,0,2,1,'2022-03-24 13:07:00',NULL,NULL,1,'2022-03-24 13:06:00',NULL,'2022-03-25 13:07:00',1,1),(263,'ES00000015',15,4,21,2,NULL,NULL,NULL,NULL,NULL,2,0,1,NULL,1,'2022-03-24 13:07:00',1,'2022-03-24 13:06:00',NULL,'2022-03-25 13:07:00',1,1),(264,'ES00000016',22,3,15,2,NULL,NULL,NULL,NULL,1,0,1,0,'2022-03-24 13:08:00',NULL,NULL,1,'2022-03-24 13:07:00',NULL,'2022-03-26 13:08:00',1,1),(265,'ES00000017',15,4,22,2,NULL,NULL,NULL,NULL,NULL,1,0,1,NULL,1,'2022-03-24 13:08:00',0,'2022-03-24 13:07:00',NULL,'2022-03-26 13:08:00',1,1),(266,'ES00000018',21,3,22,2,NULL,NULL,NULL,NULL,1,1,1,0,'2022-03-24 13:09:00',NULL,NULL,2,'2022-03-24 13:08:00',NULL,'2022-03-26 13:09:00',1,1),(267,'ES00000019',22,4,21,2,NULL,NULL,NULL,NULL,NULL,1,1,2,NULL,1,'2022-03-24 13:09:00',0,'2022-03-24 13:08:00',NULL,'2022-03-26 13:09:00',1,1),(268,'ES00000020',15,3,21,2,NULL,NULL,NULL,NULL,2,0,2,0,'2022-03-24 13:10:00',NULL,NULL,2,'2022-03-24 13:10:00',NULL,'2022-03-26 13:10:00',1,1),(269,'ES00000021',21,4,15,2,NULL,NULL,NULL,NULL,NULL,2,0,2,NULL,2,'2022-03-24 13:10:00',0,'2022-03-24 13:10:00',NULL,'2022-03-26 13:10:00',1,1),(270,'ES00000022',21,3,15,2,NULL,NULL,NULL,NULL,2,0,2,0,'2022-03-26 20:48:00',NULL,NULL,2,'2022-03-26 20:48:00',NULL,'2022-03-27 20:49:00',1,1),(271,'ES00000023',15,4,21,2,NULL,NULL,NULL,NULL,NULL,2,0,2,NULL,2,'2022-03-26 20:48:00',0,'2022-03-26 20:48:00',NULL,'2022-03-27 20:49:00',1,1),(272,'ES00000024',21,5,NULL,2,NULL,NULL,2,'2022-03-26 20:52:00',NULL,2,NULL,NULL,NULL,NULL,NULL,0,'2022-03-26 20:52:00',NULL,NULL,1,1),(273,'ES00000025',15,1,NULL,2,2,'2022-03-26 20:52:00',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,'2022-03-26 20:52:00',NULL,'2022-03-28 20:52:00',1,1),(274,'ES00000026',21,3,15,2,NULL,NULL,NULL,NULL,2,0,2,0,'2022-04-28 16:48:00',NULL,NULL,2,'2022-04-28 16:48:00',NULL,'2022-04-30 16:49:00',1,2),(275,'ES00000027',15,4,21,2,NULL,NULL,NULL,NULL,NULL,2,0,2,NULL,2,'2022-04-28 16:48:00',0,'2022-04-28 16:48:00',NULL,'2022-04-30 16:49:00',1,2);
/*!40000 ALTER TABLE `equipmentallocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipmentcategory`
--

DROP TABLE IF EXISTS `equipmentcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipmentcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipmentcategory`
--

LOCK TABLES `equipmentcategory` WRITE;
/*!40000 ALTER TABLE `equipmentcategory` DISABLE KEYS */;
INSERT INTO `equipmentcategory` VALUES (1,'Earth Moving Equipment'),(2,'Construction Vehicles'),(3,'Material Handling Equipment'),(4,'Other Construction Equipment');
/*!40000 ALTER TABLE `equipmentcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipmentinventory`
--

DROP TABLE IF EXISTS `equipmentinventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipmentinventory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `equipment_id` int NOT NULL,
  `availableqty` int NOT NULL,
  `totalqty` int NOT NULL,
  `uselessqty` int NOT NULL,
  `currentuseqty` int DEFAULT NULL,
  `eistatus_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_equipmentinventory_equipment1_idx` (`equipment_id`),
  KEY `fk_equipmentinventory_eistatus1_idx` (`eistatus_id`),
  CONSTRAINT `fk_equipmentinventory_eistatus1` FOREIGN KEY (`eistatus_id`) REFERENCES `eistatus` (`id`),
  CONSTRAINT `fk_equipmentinventory_equipment1` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipmentinventory`
--

LOCK TABLES `equipmentinventory` WRITE;
/*!40000 ALTER TABLE `equipmentinventory` DISABLE KEYS */;
INSERT INTO `equipmentinventory` VALUES (1,2,4,6,0,2,1),(2,5,5,5,0,0,1),(3,7,4,4,0,0,1),(4,1,2,2,0,0,1),(5,3,2,2,0,0,1),(6,4,1,1,0,0,1),(7,8,3,3,0,0,1);
/*!40000 ALTER TABLE `equipmentinventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipmentownby`
--

DROP TABLE IF EXISTS `equipmentownby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipmentownby` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipmentownby`
--

LOCK TABLES `equipmentownby` WRITE;
/*!40000 ALTER TABLE `equipmentownby` DISABLE KEYS */;
INSERT INTO `equipmentownby` VALUES (1,'In Source'),(2,'Out Source');
/*!40000 ALTER TABLE `equipmentownby` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipmentstatus`
--

DROP TABLE IF EXISTS `equipmentstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipmentstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipmentstatus`
--

LOCK TABLES `equipmentstatus` WRITE;
/*!40000 ALTER TABLE `equipmentstatus` DISABLE KEYS */;
INSERT INTO `equipmentstatus` VALUES (1,'Active'),(2,'Inactive'),(3,'Deleted');
/*!40000 ALTER TABLE `equipmentstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `esstatus`
--

DROP TABLE IF EXISTS `esstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `esstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `esstatus`
--

LOCK TABLES `esstatus` WRITE;
/*!40000 ALTER TABLE `esstatus` DISABLE KEYS */;
INSERT INTO `esstatus` VALUES (1,'Completed'),(2,'In-Progress'),(3,'Deleted');
/*!40000 ALTER TABLE `esstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estimation`
--

DROP TABLE IF EXISTS `estimation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estimation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estimationcode` char(10) NOT NULL,
  `rnowithprojecttitle` text NOT NULL,
  `bsr_id` int NOT NULL,
  `addeddate` date NOT NULL,
  `description` text,
  `estimationcharge` decimal(20,2) NOT NULL,
  `totalestimationcost` decimal(20,2) NOT NULL,
  `totaldays` int NOT NULL,
  `estimationstatus_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `estimationcode_UNIQUE` (`estimationcode`),
  KEY `fk_estimation_bsr1_idx` (`bsr_id`),
  KEY `fk_estimation_employee1_idx` (`employee_id`),
  KEY `fk_estimation_estimationstatus1_idx` (`estimationstatus_id`),
  CONSTRAINT `fk_estimation_bsr1` FOREIGN KEY (`bsr_id`) REFERENCES `bsr` (`id`),
  CONSTRAINT `fk_estimation_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_estimation_estimationstatus1` FOREIGN KEY (`estimationstatus_id`) REFERENCES `estimationstatus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estimation`
--

LOCK TABLES `estimation` WRITE;
/*!40000 ALTER TABLE `estimation` DISABLE KEYS */;
INSERT INTO `estimation` VALUES (1,'ES00000001','R0001-Re00A',1,'2021-08-24',NULL,6500.00,975200.00,35,3,1),(2,'ES00000002','R0002-Re002',6,'2021-09-24','New Estimation',5000.00,24400.00,3,1,1),(3,'ES00000003','R0003-Re003',2,'2021-09-24',NULL,6000.00,2271360.00,2,1,1),(4,'ES00000004','R0001-Re00A',2,'2021-10-15',NULL,5500.00,851760.00,18,1,1),(5,'ES00000005','R000000002-Drawing plan and Two Floor making',1,'2022-01-04',NULL,5500.00,1348260.00,18,1,1),(6,'ES00000006','R000000006-Drawing plan and Two Floor making',1,'2022-01-07',NULL,6000.00,98205480.00,8,1,1),(7,'ES00000007','R000000003-Drawing plan and Single Floor making House',10,'2022-01-25',NULL,6000.00,456000.00,24,1,1),(8,'ES00000008','R000000008-Planning and estimation single floor house in Kirulapana',10,'2022-02-08',NULL,2000.00,1012800.00,34,1,1),(9,'ES00000009','R000000012-Planning and estimation for single for house Kohuwala',10,'2022-02-15',NULL,120000.00,1012800.00,40,1,1),(10,'ES00000010','R000000013-Planning and estimation for single floor house',10,'2022-02-20',NULL,10000.00,2869600.00,8,1,1),(11,'ES00000011','R000000014-Planning and estimation single floor house',10,'2022-02-20',NULL,6000.00,19614400.00,32,1,1),(12,'ES00000012','R000000021-Planning for sigle floor house purawaraama.',10,'2022-03-13',NULL,1000.00,166720.00,12,1,4),(13,'ES00000013','R000000026-Planning and Estimation for single for house Jambugasmulla Roda',10,'2022-04-25',NULL,6000.00,11780.00,2,1,4),(14,'ES00000014','R000000027-Planning and Estimation for two floor house in kajuwatta',10,'2022-05-05',NULL,1000.00,18880.00,12,1,4),(15,'ES00000015','R000000028-Planning and Estimation for single floor house in Maligawaththa',10,'2022-05-19',NULL,6000.00,12800.00,21,1,4),(16,'ES00000016','R000000032-Planning and Estimation for two floor house in Sampath Road',10,'2022-05-22',NULL,1000.00,36080.00,37,1,4);
/*!40000 ALTER TABLE `estimation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estimation_has_subcategory`
--

DROP TABLE IF EXISTS `estimation_has_subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estimation_has_subcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estimation_id` int NOT NULL,
  `bsr_has_bsrsubcategory_id` int NOT NULL,
  `floorarea_id` int NOT NULL,
  `housesubparts_id` int NOT NULL,
  `itemcode` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `quantity` decimal(12,2) NOT NULL,
  `unit` text NOT NULL,
  `rate` decimal(12,2) NOT NULL,
  `lastprice` decimal(20,2) NOT NULL,
  `totalarea` decimal(20,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_estimation_has_bsr_has_bsrsubcategory_bsr_has_bsrsubcate_idx` (`bsr_has_bsrsubcategory_id`),
  KEY `fk_estimation_has_bsr_has_bsrsubcategory_estimation1_idx` (`estimation_id`),
  KEY `fk_estimation_has_subcategory_floorarea1_idx` (`floorarea_id`),
  KEY `fk_estimation_has_subcategory_housesubparts1_idx` (`housesubparts_id`),
  CONSTRAINT `fk_estimation_has_bsr_has_bsrsubcategory_bsr_has_bsrsubcatego1` FOREIGN KEY (`bsr_has_bsrsubcategory_id`) REFERENCES `bsr_has_bsrsubcategory` (`id`),
  CONSTRAINT `fk_estimation_has_bsr_has_bsrsubcategory_estimation1` FOREIGN KEY (`estimation_id`) REFERENCES `estimation` (`id`),
  CONSTRAINT `fk_estimation_has_subcategory_floorarea1` FOREIGN KEY (`floorarea_id`) REFERENCES `floorarea` (`id`),
  CONSTRAINT `fk_estimation_has_subcategory_housesubparts1` FOREIGN KEY (`housesubparts_id`) REFERENCES `housesubparts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estimation_has_subcategory`
--

LOCK TABLES `estimation_has_subcategory` WRITE;
/*!40000 ALTER TABLE `estimation_has_subcategory` DISABLE KEYS */;
INSERT INTO `estimation_has_subcategory` VALUES (1,1,2,1,1,'A030','Roof removing tiles and timber',20.00,'Cube',424.00,8480.00,240.00),(2,2,1,1,1,'A028','Chipping rendering, cement',50.00,'Cube',424.00,21200.00,240.00),(3,3,2,1,1,'A030','Roof removing tiles and timber',48.00,'Cube',47320.00,2271360.00,240.00),(5,1,1,1,1,'A001','Demolishing brickwork in cement',20.00,'Cube',1836.00,36720.00,240.00),(6,2,10,1,1,'C016','Lintol, cement concrete 1:2:4(3/4\") 4 1/2\" x 6\"',10.00,'L.ft',320.00,3200.00,240.00),(8,1,13,1,1,'C001','Mixing and Placing of cement concrete',20.00,'Cube',46500.00,930000.00,240.00),(9,4,2,1,1,'A030','Roof removing tiles and timber',18.00,'Cube',47320.00,851760.00,240.00),(10,5,1,1,1,'A001','Demolishing brickwork in cement',200.00,'Cube',1836.00,367200.00,240.00),(11,5,13,1,1,'C001','Mixing and Placing of cement concrete',12.00,'Cube',46500.00,558000.00,240.00),(12,5,24,1,1,'E001','Random Rubble Masonry in cement Mortar 1:5, above 1 cube.',11.00,'Cube',38460.00,423060.00,240.00),(13,6,1,1,7,'A001','Demolishing brickwork in cement',9.00,'Cube',1836.00,4461480.00,240.00),(14,6,13,2,10,'C001','Mixing and Placing of cement concrete',7.00,'Cube',46500.00,93744000.00,240.00),(15,7,26,1,10,'A001','Demolisher unnecessary things and Land Cleaning',1.00,'Cube',1400.00,336000.00,240.00),(16,7,28,1,10,'B002','Slab Roof Removing',1.00,'Sqr',500.00,120000.00,240.00),(17,8,26,1,10,'A001','Demolisher unnecessary things and Land Cleaning',1.00,'Cube',1400.00,336000.00,240.00),(18,8,34,1,7,'C002','Filling Foundations(For All Both DPC-Primary & DPC-Mixed)',1.00,'Cube',1700.00,408000.00,240.00),(19,8,33,1,8,'C001','Digging Pits for Foundation',1.00,'Cube',1120.00,268800.00,240.00),(20,9,26,1,10,'A001','Demolisher unnecessary things and Land Cleaning',1.00,'Cube',1400.00,336000.00,240.00),(21,9,33,1,7,'C001','Digging Pits for Foundation',1.00,'Cube',1120.00,268800.00,240.00),(22,9,34,1,9,'C002','Filling Foundations(For All Both DPC-Primary & DPC-Mixed)',1.00,'Cube',1700.00,408000.00,240.00),(23,10,26,1,10,'A001','Demolisher unnecessary things and Land Cleaning',1.00,'Cube',1400.00,952000.00,680.00),(24,10,33,1,7,'C001','Digging Pits for Foundation',1.00,'Cube',1120.00,761600.00,680.00),(25,10,34,1,7,'C002','Filling Foundations(For All Both DPC-Primary & DPC-Mixed)',1.00,'Cube',1700.00,1156000.00,680.00),(26,11,26,1,10,'A001','Demolisher unnecessary things and Land Cleaning',1.00,'Cube',1400.00,280000.00,200.00),(27,11,33,1,7,'C001','Digging Pits for Foundation',1.00,'Cube',1120.00,134400.00,120.00),(28,11,36,1,30,'D001','Mixing and Placing of cement concrete 1:3:6 with  in ground floor',2.00,'Cube',20000.00,19200000.00,480.00),(29,12,26,1,10,'A001','Demolisher unnecessary things and Land Cleaning',1.00,'Cube',1400.00,5600.00,4.00),(30,12,33,1,7,'C001','Digging Pits for Foundation',1.00,'Cube',1120.00,1120.00,1.00),(31,12,38,1,11,'D003','Cement concrete 1:2:4(3/4\") in column',2.00,'Cube',20000.00,160000.00,4.00),(32,13,26,1,10,'A001','Demolisher unnecessary things and Land Cleaning',1.00,'Cube',1400.00,5600.00,4.00),(33,13,33,1,7,'C001','Digging Pits for Foundation',1.00,'Cube',1120.00,4480.00,4.00),(34,13,34,1,8,'C002','Filling Foundations(For All Both DPC-Primary & DPC-Mixed)',1.00,'Cube',1700.00,1700.00,1.00),(35,14,26,1,10,'A001','Demolisher unnecessary things and Land Cleaning',1.00,'Cube',1400.00,5600.00,4.00),(36,14,33,1,7,'C001','Digging Pits for Foundation',1.00,'Cube',1120.00,4480.00,4.00),(37,14,34,1,8,'C002','Filling Foundations(For All Both DPC-Primary & DPC-Mixed)',1.00,'Cube',1700.00,6800.00,4.00),(38,14,41,2,6,'E001','Brick wall binding with(5/8\") thick plastering',2.00,'Cube',1000.00,2000.00,1.00),(39,15,26,1,10,'A001','Demolisher unnecessary things and Land Cleaning',1.00,'Cube',1400.00,2800.00,2.00),(40,15,34,1,8,'C002','Filling Foundations(For All Both DPC-Primary & DPC-Mixed)',1.00,'Cube',1700.00,6800.00,4.00),(41,15,42,1,1,'E002','Block binding with (5/8\") thick plastering',2.00,'Cube',800.00,3200.00,2.00),(42,16,26,1,10,'A001','Demolisher unnecessary things and Land Cleaning',1.00,'Cube',1400.00,5600.00,4.00),(43,16,33,1,7,'C001','Digging Pits for Foundation',1.00,'Cube',1120.00,4480.00,4.00),(44,16,34,1,9,'C002','Filling Foundations(For All Both DPC-Primary & DPC-Mixed)',1.00,'Cube',1700.00,6800.00,4.00),(45,16,41,2,1,'E001','Brick wall binding with(5/8\") thick plastering',2.00,'Cube',1000.00,16000.00,8.00),(46,16,42,2,6,'E002','Block binding with (5/8\") thick plastering',1.00,'Cube',800.00,3200.00,4.00);
/*!40000 ALTER TABLE `estimation_has_subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estimationstatus`
--

DROP TABLE IF EXISTS `estimationstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estimationstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estimationstatus`
--

LOCK TABLES `estimationstatus` WRITE;
/*!40000 ALTER TABLE `estimationstatus` DISABLE KEYS */;
INSERT INTO `estimationstatus` VALUES (1,'Active'),(2,'In-Active'),(3,'Deleted');
/*!40000 ALTER TABLE `estimationstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estype`
--

DROP TABLE IF EXISTS `estype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estype`
--

LOCK TABLES `estype` WRITE;
/*!40000 ALTER TABLE `estype` DISABLE KEYS */;
INSERT INTO `estype` VALUES (1,'EQ-Assign'),(3,'EQ-Transfer In'),(4,'EQ-Transfer Out'),(5,'EQ-Remove Completed'),(6,'EQ-Remove Useless'),(7,'EQ-Remove Damage');
/*!40000 ALTER TABLE `estype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `floorarea`
--

DROP TABLE IF EXISTS `floorarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `floorarea` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `floorarea`
--

LOCK TABLES `floorarea` WRITE;
/*!40000 ALTER TABLE `floorarea` DISABLE KEYS */;
INSERT INTO `floorarea` VALUES (1,'Ground Floor'),(2,'First Floor'),(3,'Second Floor'),(4,'Third Floor');
/*!40000 ALTER TABLE `floorarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gender` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender` DISABLE KEYS */;
INSERT INTO `gender` VALUES (1,'Male'),(2,'Female');
/*!40000 ALTER TABLE `gender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (6),(6);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `housepart`
--

DROP TABLE IF EXISTS `housepart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `housepart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `housepart`
--

LOCK TABLES `housepart` WRITE;
/*!40000 ALTER TABLE `housepart` DISABLE KEYS */;
INSERT INTO `housepart` VALUES (1,'Outside'),(2,'Mini parts'),(3,'DPC Level'),(4,'Wall Design'),(5,'Roof Design'),(6,'Floor Design'),(7,'Wiring'),(8,'Pumbling'),(9,'Doors'),(10,'Windows'),(11,'Stair Case');
/*!40000 ALTER TABLE `housepart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `housesubparts`
--

DROP TABLE IF EXISTS `housesubparts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `housesubparts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `housepart_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_housesubparts_housepart1_idx` (`housepart_id`),
  CONSTRAINT `fk_housesubparts_housepart1` FOREIGN KEY (`housepart_id`) REFERENCES `housepart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `housesubparts`
--

LOCK TABLES `housesubparts` WRITE;
/*!40000 ALTER TABLE `housesubparts` DISABLE KEYS */;
INSERT INTO `housesubparts` VALUES (1,'Bedroom',2),(2,'Dinning',2),(3,'Pantry',2),(4,'Kitchen',2),(5,'Living',2),(6,'Bathroom',2),(7,'Foundation',1),(8,'DPC Level-Mixed',3),(9,'DPC Level-Primary',3),(10,'Site Cleaning',1),(11,'Columns',1),(12,'Concrete Floor',6),(13,'Tile Floor',6),(14,'Cut Cement Floor',6),(15,'Granite Floor',6),(16,'Ceiling Roof',5),(17,'Setter Roof',5),(18,'Slab Roof',5),(19,'Asbestos Roof',5),(20,'Lunumidilla Roof',5),(21,'Plastering Wall',4),(22,'Painting Wall',4),(23,'Parapet Wall',1),(24,'Plywood-Doors ',9),(25,'Plywood-Windows',10),(26,'Alluminium-Doors',9),(27,'Alluminium-Windows',10),(28,'Wood Stair Case',11),(29,'Concrete Stair Case',11),(30,'Concrete Beams',1),(41,'Painting And Plastering',4),(42,'Ground-Floor Wiring',7),(43,'Floor Wiring',7),(44,'Guest Room',2);
/*!40000 ALTER TABLE `housesubparts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemunit`
--

DROP TABLE IF EXISTS `itemunit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemunit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemunit`
--

LOCK TABLES `itemunit` WRITE;
/*!40000 ALTER TABLE `itemunit` DISABLE KEYS */;
INSERT INTO `itemunit` VALUES (1,'Cube'),(2,'Sqr'),(3,'L.ft'),(4,'Sq.ft'),(5,'Nos');
/*!40000 ALTER TABLE `itemunit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laborallocation`
--

DROP TABLE IF EXISTS `laborallocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laborallocation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lacode` char(10) NOT NULL,
  `lafromreservation_id` int NOT NULL,
  `latype_id` int NOT NULL,
  `latoreservation_id` int DEFAULT NULL,
  `laboremployee_id` int NOT NULL,
  `assigndatetime` datetime DEFAULT NULL,
  `removedatetime` datetime DEFAULT NULL,
  `transferindatetime` datetime DEFAULT NULL,
  `transferoutdatetime` datetime DEFAULT NULL,
  `addeddatetime` datetime NOT NULL,
  `description` text,
  `lastatus_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `expectedremovedatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lacode_UNIQUE` (`lacode`),
  KEY `fk_table1_reservation1_idx` (`lafromreservation_id`),
  KEY `fk_laborallocation_latype1_idx` (`latype_id`),
  KEY `fk_laborallocation_reservation1_idx` (`latoreservation_id`),
  KEY `fk_laborallocation_employee1_idx` (`laboremployee_id`),
  KEY `fk_laborallocation_lastatus1_idx` (`lastatus_id`),
  KEY `fk_laborallocation_employee2_idx` (`employee_id`),
  CONSTRAINT `fk_laborallocation_employee1` FOREIGN KEY (`laboremployee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_laborallocation_employee2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_laborallocation_lastatus1` FOREIGN KEY (`lastatus_id`) REFERENCES `lastatus` (`id`),
  CONSTRAINT `fk_laborallocation_latype1` FOREIGN KEY (`latype_id`) REFERENCES `latype` (`id`),
  CONSTRAINT `fk_laborallocation_reservation1` FOREIGN KEY (`latoreservation_id`) REFERENCES `reservation` (`id`),
  CONSTRAINT `fk_table1_reservation1` FOREIGN KEY (`lafromreservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laborallocation`
--

LOCK TABLES `laborallocation` WRITE;
/*!40000 ALTER TABLE `laborallocation` DISABLE KEYS */;
INSERT INTO `laborallocation` VALUES (62,'',8,1,NULL,6,'2022-04-21 13:31:00',NULL,NULL,NULL,'2022-04-21 13:31:00',NULL,1,1,'2022-04-22 13:31:00'),(63,'LS00000001',8,2,NULL,6,NULL,'2022-04-21 13:42:00',NULL,NULL,'2022-04-21 13:42:00',NULL,1,1,NULL),(64,'LS00000002',8,1,NULL,6,'2022-04-21 13:43:00',NULL,NULL,NULL,'2022-04-21 13:42:00',NULL,1,1,'2022-04-25 13:43:00'),(66,'LS00000003',8,1,NULL,6,'2022-04-21 13:53:00',NULL,NULL,NULL,'2022-04-21 13:53:00',NULL,1,1,'2022-04-25 13:53:00'),(67,'LS00000004',8,2,NULL,6,NULL,'2022-04-21 13:54:00',NULL,NULL,'2022-04-21 13:54:00',NULL,1,1,NULL),(68,'LS00000005',4,1,NULL,6,'2022-04-21 13:59:00',NULL,NULL,NULL,'2022-04-21 13:59:00',NULL,1,1,'2022-04-25 13:59:00'),(69,'LS00000006',3,3,4,6,NULL,NULL,'2022-04-21 14:00:00',NULL,'2022-04-21 14:00:00',NULL,1,1,'2022-05-24 14:00:00'),(70,'LS00000007',4,4,3,6,NULL,NULL,NULL,'2022-04-21 14:00:00','2022-04-21 14:00:00',NULL,1,1,'2022-05-24 14:00:00'),(71,'LS00000008',8,1,NULL,13,'2022-05-22 15:59:00',NULL,NULL,NULL,'2022-05-22 15:59:00',NULL,1,2,'2022-05-23 16:00:00'),(72,'LS00000009',4,3,8,13,NULL,NULL,'2022-05-22 16:01:00',NULL,'2022-05-22 16:01:00',NULL,1,2,'2022-05-28 16:03:00'),(73,'LS00000010',8,4,4,13,NULL,NULL,NULL,'2022-05-22 16:01:00','2022-05-22 16:01:00',NULL,1,2,'2022-05-28 16:03:00');
/*!40000 ALTER TABLE `laborallocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lastatus`
--

DROP TABLE IF EXISTS `lastatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lastatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lastatus`
--

LOCK TABLES `lastatus` WRITE;
/*!40000 ALTER TABLE `lastatus` DISABLE KEYS */;
INSERT INTO `lastatus` VALUES (1,'Completed'),(2,'In-Progress'),(3,'Deleted');
/*!40000 ALTER TABLE `lastatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `latype`
--

DROP TABLE IF EXISTS `latype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `latype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `latype`
--

LOCK TABLES `latype` WRITE;
/*!40000 ALTER TABLE `latype` DISABLE KEYS */;
INSERT INTO `latype` VALUES (1,'Emp-Assign'),(2,'Emp-Remove'),(3,'Emp-Transfer In'),(4,'Emp-Transfer Out');
/*!40000 ALTER TABLE `latype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (1,'EMPLOYEE'),(2,'USER'),(3,'PRIVILAGE'),(4,'CUSTOMER'),(5,'EQUIPMENT'),(6,'BSR'),(7,'SERVICE'),(8,'ESTIMATION'),(9,'PLAN'),(10,'RESERVATION'),(11,'DESIGNERASSIGNMENT'),(12,'QSASSIGNMENT'),(13,'EQSHIFTMENT'),(14,'EQINVENTORY'),(15,'EMPSHIFTMENT'),(16,'CUSTOMERPAYMENT'),(17,'RESERVATIONPROGRESS');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentcategory`
--

DROP TABLE IF EXISTS `paymentcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentcategory`
--

LOCK TABLES `paymentcategory` WRITE;
/*!40000 ALTER TABLE `paymentcategory` DISABLE KEYS */;
INSERT INTO `paymentcategory` VALUES (1,'Advance-Payment'),(2,'Full-Payment'),(4,'Balance-Payment');
/*!40000 ALTER TABLE `paymentcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentmethod`
--

DROP TABLE IF EXISTS `paymentmethod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentmethod` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentmethod`
--

LOCK TABLES `paymentmethod` WRITE;
/*!40000 ALTER TABLE `paymentmethod` DISABLE KEYS */;
INSERT INTO `paymentmethod` VALUES (1,'Cash'),(2,'Cheque'),(3,'Deposit'),(4,'Online');
/*!40000 ALTER TABLE `paymentmethod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentstatus`
--

DROP TABLE IF EXISTS `paymentstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paymentstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentstatus`
--

LOCK TABLES `paymentstatus` WRITE;
/*!40000 ALTER TABLE `paymentstatus` DISABLE KEYS */;
INSERT INTO `paymentstatus` VALUES (1,'Active'),(2,'In-Active'),(3,'Deleted');
/*!40000 ALTER TABLE `paymentstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plancode` varchar(10) NOT NULL,
  `rnowithprojecttitle` text NOT NULL,
  `plantype_id` int NOT NULL,
  `planphoto` mediumblob,
  `designer_id` int DEFAULT NULL,
  `persftcharge` decimal(12,2) DEFAULT NULL,
  `totalarea` decimal(20,2) NOT NULL,
  `plancharge` decimal(20,2) DEFAULT NULL,
  `addeddate` date NOT NULL,
  `description` text,
  `planstatus_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `reservation_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `plancode_UNIQUE` (`plancode`),
  KEY `fk_plan_plantype1_idx` (`plantype_id`),
  KEY `fk_plan_planstatus1_idx` (`planstatus_id`),
  KEY `fk_plan_employee1_idx` (`employee_id`),
  KEY `fk_plan_employee2_idx` (`designer_id`),
  KEY `fk_plan_reservation1_idx` (`reservation_id`),
  CONSTRAINT `fk_plan_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_plan_employee2` FOREIGN KEY (`designer_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_plan_planstatus1` FOREIGN KEY (`planstatus_id`) REFERENCES `planstatus` (`id`),
  CONSTRAINT `fk_plan_plantype1` FOREIGN KEY (`plantype_id`) REFERENCES `plantype` (`id`),
  CONSTRAINT `fk_plan_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (1,'P000000001','P000000001-Drawing planning only',2,_binary 'data:image/png;base64,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',1,80.00,2730.36,52704.00,'2021-11-15',NULL,1,1,NULL),(2,'P000000002','P000000002-Estimation only',2,_binary 'data:image/png;base64,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',1,80.00,1244.40,98576.00,'2021-11-16',NULL,3,1,NULL),(3,'P000000003','P000000003-Drawing plan and Single Floor making House',2,NULL,1,80.00,1200.48,96038.40,'2021-12-28',NULL,1,1,NULL),(4,'P000000004','P000000004-Drawing plan and Two Floor making',2,NULL,1,80.00,2928.00,234240.00,'2021-12-31','New In House Planning',1,1,NULL),(5,'P000000005','P000000005-Planning and Estimation for two floor house',2,NULL,1,40.00,5087.40,203496.00,'2022-01-27',NULL,1,1,NULL),(6,'P000000006','P000000006-Planning & estimation single floor house in Kirulapana',2,NULL,3,60.00,3013.40,180804.00,'2022-02-08',NULL,1,3,NULL),(7,'P000000007','P000000007-Planning and estimation for single for house Kohuwala',2,NULL,3,80.00,3611.20,288896.00,'2022-02-14',NULL,1,3,NULL),(8,'P000000008','P000000008-Planning and estimation for single floor house',2,NULL,3,100.00,4306.60,430660.00,'2022-02-17',NULL,1,3,NULL),(9,'P000000009','P000000009-Planning and estimation single floor house',2,NULL,3,100.00,2281.40,228140.00,'2022-02-19',NULL,1,3,NULL),(10,'P000000010','P000000010-Planning and estimation for two floor house in Kirulapana',2,NULL,3,10.00,9075.00,90750.00,'2022-02-23',NULL,1,3,NULL),(11,'P000000011','P000000011-Planning  for single floor house',2,NULL,3,100.00,244.00,24400.00,'2022-03-02',NULL,1,3,NULL),(12,'P000000012','P000000012-Planning and  estimation for Single floor house Gandodawila',2,NULL,NULL,100.00,43.92,4392.00,'2022-03-06',NULL,1,3,NULL),(13,'P000000013','P000000013-Planning and  estimation for Single floor house Gandodawila',2,NULL,NULL,100.00,64.66,6466.00,'2022-03-09',NULL,1,3,NULL),(14,'P000000014','P000000014-Planning only for single for house',2,NULL,NULL,100.00,9.76,976.00,'2022-03-10',NULL,1,3,NULL),(15,'P000000015','P000000015-Planning only for signgle floor house in Ragama',2,NULL,NULL,100.00,35.38,3538.00,'2022-03-10',NULL,1,3,NULL),(16,'P000000016','P000000016-Planning for signle floor house Maradhana 02',2,NULL,NULL,100.00,14.64,1464.00,'2022-03-10',NULL,1,3,NULL),(17,'P000000017','P000000017-Planning for signle floor house Maradhana 02',2,NULL,NULL,100.00,35.38,3538.00,'2022-03-10',NULL,1,3,NULL),(18,'P000000018','P000000018-Planning for signle floor house Maradhana 02',2,NULL,NULL,100.00,9.76,976.00,'2022-03-10',NULL,1,3,NULL),(19,'P000000019','P000000019-Planning for signle floor house Maradhana 02',2,NULL,NULL,100.00,2.44,244.00,'2022-03-10',NULL,1,3,NULL),(20,'P000000020','P000000020-Planning for signle floor house Maradhana 02',2,NULL,NULL,100.00,9.76,976.00,'2022-03-10',NULL,1,3,NULL),(26,'P000000021','P000000021-Planning for signle floor house Maradhana 02',2,NULL,NULL,1000.00,9.76,9760.00,'2022-03-10',NULL,1,3,NULL),(27,'P000000022','P000000022-Planning for sigle floor house purawaraama.',2,NULL,NULL,1000.00,20.74,20740.00,'2022-03-13',NULL,1,3,NULL),(28,'P000000023','P000000023-Plan and estimation for single floor house Thalapathpitiya',2,NULL,NULL,100.00,193.98,19398.00,'2022-03-21',NULL,1,3,NULL),(29,'P000000024','P000000024-Planning for single floor house Kanndawaththa',2,NULL,NULL,1000.00,18.30,18300.00,'2022-03-21',NULL,1,3,NULL),(30,'P000000025','P000000025-Planning and Estimation for single floor house Wijayabawatha',2,NULL,NULL,1000.00,296.46,296460.00,'2022-03-28',NULL,1,3,NULL),(31,'P000000026','P000000026-Planning and estimation for single floor house in Wijayaba road',2,NULL,NULL,100.00,131.76,13176.00,'2022-04-16',NULL,1,3,NULL),(32,'P000000027','P000000027-Planning and Estimation for single for house Jambugasmulla Roda',2,NULL,NULL,100.00,103.70,10370.00,'2022-04-25',NULL,1,3,NULL),(33,'P000000028','P000000028-Planning and estimation for two floor house in Kirulapana',2,NULL,NULL,100.00,142.74,14274.00,'2022-05-05',NULL,1,3,NULL),(34,'P000000029','P000000029-Planning and Estimation for two floor house in kajuwatta',2,NULL,NULL,100.00,43.92,4392.00,'2022-05-05',NULL,1,3,NULL),(35,'P000000030','P000000030-Planning and Estimation for single floor house in Maligawaththa',2,NULL,NULL,100.00,12.20,1220.00,'2022-05-19',NULL,1,3,NULL),(36,'P000000031','P000000031-Planning for Single floor house in Exlab road in Nugegoda',2,NULL,NULL,100.00,15.86,1586.00,'2022-05-19',NULL,1,3,NULL),(37,'P000000032','P000000032-Planning and Estimation for two floor house in Sampath Road',2,NULL,NULL,1000.00,128.10,128100.00,'2022-05-22',NULL,1,3,NULL);
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_has_floorarea`
--

DROP TABLE IF EXISTS `plan_has_floorarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_has_floorarea` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int NOT NULL,
  `floorarea_id` int NOT NULL,
  `totalarea` decimal(20,2) NOT NULL,
  `wallsandcirculationratio` decimal(10,2) NOT NULL,
  `finalfloorarea` decimal(20,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_plan_has_floorarea_floorarea1_idx` (`floorarea_id`),
  KEY `fk_plan_has_floorarea_plan1_idx` (`plan_id`),
  CONSTRAINT `fk_plan_has_floorarea_floorarea1` FOREIGN KEY (`floorarea_id`) REFERENCES `floorarea` (`id`),
  CONSTRAINT `fk_plan_has_floorarea_plan1` FOREIGN KEY (`plan_id`) REFERENCES `plan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_has_floorarea`
--

LOCK TABLES `plan_has_floorarea` WRITE;
/*!40000 ALTER TABLE `plan_has_floorarea` DISABLE KEYS */;
INSERT INTO `plan_has_floorarea` VALUES (3,2,3,540.00,22.00,658.80),(4,2,2,360.00,22.00,439.20),(5,2,1,120.00,22.00,146.40),(6,3,1,984.00,22.00,1200.48),(7,4,1,960.00,22.00,1171.20),(8,4,2,720.00,22.00,878.40),(9,4,3,720.00,22.00,878.40),(10,1,1,2238.00,22.00,2730.36),(11,5,1,3660.00,15.00,4209.00),(12,5,2,720.00,22.00,878.40),(13,6,1,2470.00,22.00,3013.40),(14,7,1,2960.00,22.00,3611.20),(15,8,1,3530.00,22.00,4306.60),(16,9,1,1870.00,22.00,2281.40),(17,10,1,6700.00,10.00,7370.00),(18,10,2,1550.00,10.00,1705.00),(19,11,1,200.00,22.00,244.00),(20,12,1,36.00,22.00,43.92),(21,13,1,53.00,22.00,64.66),(22,14,1,8.00,22.00,9.76),(23,15,1,29.00,22.00,35.38),(24,16,1,12.00,22.00,14.64),(25,17,1,29.00,22.00,35.38),(26,18,1,8.00,22.00,9.76),(27,19,1,2.00,22.00,2.44),(28,20,1,8.00,22.00,9.76),(34,26,1,8.00,22.00,9.76),(35,27,1,17.00,22.00,20.74),(36,28,1,159.00,22.00,193.98),(37,29,1,15.00,22.00,18.30),(38,30,1,243.00,22.00,296.46),(39,31,1,108.00,22.00,131.76),(40,32,1,85.00,22.00,103.70),(41,33,1,117.00,22.00,142.74),(42,34,1,23.00,22.00,28.06),(43,34,2,13.00,22.00,15.86),(44,35,1,10.00,22.00,12.20),(45,36,1,13.00,22.00,15.86),(46,37,1,85.00,22.00,103.70),(47,37,2,20.00,22.00,24.40);
/*!40000 ALTER TABLE `plan_has_floorarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_has_floorarea_has_housesubparts`
--

DROP TABLE IF EXISTS `plan_has_floorarea_has_housesubparts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_has_floorarea_has_housesubparts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_has_floorarea_id` int NOT NULL,
  `housesubparts_id` int NOT NULL,
  `count` int NOT NULL,
  `width` decimal(10,2) NOT NULL,
  `height` decimal(10,2) NOT NULL,
  `area` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_plan_has_floorarea_has_housesubparts_housesubparts1_idx` (`housesubparts_id`),
  KEY `fk_plan_has_floorarea_has_housesubparts_plan_has_floorarea1_idx` (`plan_has_floorarea_id`),
  CONSTRAINT `fk_plan_has_floorarea_has_housesubparts_housesubparts1` FOREIGN KEY (`housesubparts_id`) REFERENCES `housesubparts` (`id`),
  CONSTRAINT `fk_plan_has_floorarea_has_housesubparts_plan_has_floorarea1` FOREIGN KEY (`plan_has_floorarea_id`) REFERENCES `plan_has_floorarea` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_has_floorarea_has_housesubparts`
--

LOCK TABLES `plan_has_floorarea_has_housesubparts` WRITE;
/*!40000 ALTER TABLE `plan_has_floorarea_has_housesubparts` DISABLE KEYS */;
INSERT INTO `plan_has_floorarea_has_housesubparts` VALUES (4,3,1,3,12.00,15.00,540.00),(5,4,6,2,12.00,15.00,360.00),(6,5,4,1,10.00,12.00,120.00),(7,6,10,1,12.00,15.00,180.00),(8,6,7,1,15.00,16.00,240.00),(9,6,11,1,15.00,16.00,240.00),(10,6,18,1,18.00,18.00,324.00),(11,7,7,1,15.00,18.00,270.00),(12,7,10,1,18.00,16.00,288.00),(13,7,18,1,14.00,17.00,238.00),(14,7,13,1,13.00,16.00,208.00),(15,8,1,2,15.00,16.00,480.00),(16,8,6,1,15.00,16.00,240.00),(17,9,1,2,15.00,16.00,480.00),(18,9,18,1,15.00,16.00,240.00),(19,10,10,1,15.00,16.00,240.00),(20,10,8,1,17.00,18.00,306.00),(21,10,7,1,18.00,19.00,342.00),(22,10,11,5,18.00,15.00,1350.00),(23,11,10,1,10.00,12.00,120.00),(24,11,7,1,15.00,12.00,180.00),(25,11,8,1,15.00,16.00,240.00),(26,11,11,4,15.00,16.00,960.00),(27,11,30,3,15.00,16.00,720.00),(28,11,1,2,15.00,16.00,480.00),(29,11,4,1,15.00,16.00,240.00),(30,11,6,1,15.00,16.00,240.00),(31,11,41,1,15.00,16.00,240.00),(32,11,18,1,15.00,16.00,240.00),(33,12,1,1,15.00,16.00,240.00),(34,12,4,1,15.00,16.00,240.00),(35,12,6,1,15.00,16.00,240.00),(36,11,42,0,0.00,0.00,0.00),(37,12,24,0,0.00,0.00,0.00),(38,13,10,1,15.00,16.00,240.00),(39,13,7,1,15.00,16.00,240.00),(40,13,11,5,10.00,14.00,700.00),(41,13,8,1,15.00,16.00,240.00),(42,13,1,1,12.00,14.00,168.00),(43,13,1,1,15.00,18.00,270.00),(44,13,4,1,14.00,18.00,252.00),(45,13,6,1,20.00,18.00,360.00),(46,14,10,1,15.00,16.00,240.00),(47,14,9,1,15.00,16.00,240.00),(48,14,7,1,15.00,16.00,240.00),(49,14,30,4,20.00,16.00,1280.00),(50,14,1,2,15.00,16.00,480.00),(51,14,6,1,15.00,16.00,240.00),(52,14,4,1,15.00,16.00,240.00),(53,15,10,1,17.00,40.00,680.00),(54,15,7,1,17.00,40.00,680.00),(55,15,11,4,14.00,13.00,728.00),(56,15,30,4,12.00,13.00,624.00),(57,15,1,1,14.00,12.00,168.00),(58,15,1,1,15.00,12.00,180.00),(59,15,4,1,14.00,13.00,182.00),(60,15,6,1,16.00,18.00,288.00),(61,16,10,1,10.00,20.00,200.00),(62,16,7,1,12.00,10.00,120.00),(63,16,11,1,15.00,10.00,150.00),(64,16,30,4,12.00,10.00,480.00),(65,16,1,2,15.00,20.00,600.00),(66,16,4,1,12.00,10.00,120.00),(67,16,6,1,20.00,10.00,200.00),(68,17,7,1,10.00,10.00,100.00),(69,17,30,4,20.00,10.00,800.00),(70,17,11,4,20.00,50.00,4000.00),(71,17,9,1,10.00,10.00,100.00),(72,17,1,2,15.00,10.00,300.00),(73,17,4,1,10.00,5.00,50.00),(74,17,6,1,20.00,10.00,200.00),(75,17,41,1,30.00,20.00,600.00),(76,17,18,1,50.00,1.00,50.00),(77,17,13,1,50.00,10.00,500.00),(78,18,1,2,20.00,10.00,400.00),(79,18,6,1,10.00,10.00,100.00),(80,18,18,1,50.00,1.00,50.00),(81,18,41,1,50.00,10.00,500.00),(82,18,13,1,50.00,10.00,500.00),(83,19,10,1,2.00,2.00,4.00),(84,19,7,1,2.00,2.00,4.00),(85,19,11,4,3.00,3.00,36.00),(86,19,30,4,5.00,5.00,100.00),(87,19,1,2,2.00,2.00,8.00),(88,19,6,1,2.00,2.00,4.00),(89,19,8,1,6.00,6.00,36.00),(90,19,18,1,2.00,2.00,4.00),(91,19,41,1,2.00,2.00,4.00),(92,20,10,1,1.00,2.00,2.00),(93,20,7,1,2.00,2.00,4.00),(94,20,8,1,2.00,2.00,4.00),(95,20,11,4,1.00,1.00,4.00),(96,20,30,4,2.00,2.00,16.00),(97,20,1,2,1.00,1.00,2.00),(98,20,4,1,1.00,1.00,1.00),(99,20,6,1,1.00,1.00,1.00),(100,20,18,1,1.00,1.00,1.00),(101,20,13,1,1.00,1.00,1.00),(102,21,10,1,1.00,1.00,1.00),(103,21,7,1,1.00,1.00,1.00),(104,21,11,6,2.00,2.00,24.00),(105,21,30,2,1.00,1.00,2.00),(106,21,8,1,1.00,1.00,1.00),(107,21,1,2,2.00,2.00,8.00),(108,21,4,1,2.00,2.00,4.00),(109,21,6,1,2.00,2.00,4.00),(110,21,18,1,2.00,2.00,4.00),(111,21,13,1,2.00,2.00,4.00),(112,22,10,1,2.00,2.00,4.00),(113,22,7,1,2.00,2.00,4.00),(114,23,7,1,2.00,2.00,4.00),(115,23,10,1,5.00,5.00,25.00),(116,24,10,1,2.00,2.00,4.00),(117,24,7,2,2.00,2.00,8.00),(118,25,7,1,5.00,5.00,25.00),(119,25,10,1,2.00,2.00,4.00),(120,26,10,1,2.00,2.00,4.00),(121,26,7,1,2.00,2.00,4.00),(122,27,7,1,1.00,1.00,1.00),(123,27,10,1,1.00,1.00,1.00),(124,28,10,1,2.00,2.00,4.00),(125,28,7,1,2.00,2.00,4.00),(132,34,10,1,2.00,2.00,4.00),(133,34,7,1,2.00,2.00,4.00),(134,35,10,1,2.00,2.00,4.00),(135,35,7,1,1.00,1.00,1.00),(136,35,11,1,2.00,2.00,4.00),(137,35,30,1,2.00,2.00,4.00),(138,35,1,2,1.00,1.00,2.00),(139,35,6,1,1.00,1.00,1.00),(140,35,4,1,1.00,1.00,1.00),(141,36,10,1,2.00,2.00,4.00),(142,36,7,1,2.00,2.00,4.00),(143,36,11,4,4.00,4.00,64.00),(144,36,30,3,3.00,3.00,27.00),(145,36,1,1,2.00,2.00,4.00),(146,36,1,1,4.00,4.00,16.00),(147,36,6,1,2.00,2.00,4.00),(148,36,4,1,4.00,4.00,16.00),(149,36,18,1,2.00,2.00,4.00),(150,36,13,1,4.00,4.00,16.00),(151,37,10,1,2.00,2.00,4.00),(152,37,7,1,2.00,2.00,4.00),(153,37,8,1,2.00,2.00,4.00),(154,37,1,2,1.00,1.00,2.00),(155,37,4,1,1.00,1.00,1.00),(156,38,10,1,1.00,1.00,1.00),(157,38,7,1,2.00,2.00,4.00),(158,38,11,5,4.00,4.00,80.00),(159,38,30,4,5.00,5.00,100.00),(160,38,44,1,5.00,5.00,25.00),(161,38,1,1,2.00,2.00,4.00),(162,38,6,1,2.00,2.00,4.00),(163,38,18,1,5.00,5.00,25.00),(164,39,10,1,2.00,2.00,4.00),(165,39,7,1,2.00,2.00,4.00),(166,39,11,4,5.00,5.00,100.00),(167,40,10,1,2.00,2.00,4.00),(168,40,7,1,2.00,2.00,4.00),(169,40,11,3,4.00,4.00,48.00),(170,40,30,3,2.00,2.00,12.00),(171,40,1,2,2.00,2.00,8.00),(172,40,4,1,2.00,2.00,4.00),(173,40,6,1,2.00,2.00,4.00),(174,40,8,1,1.00,1.00,1.00),(175,41,7,1,2.00,2.00,4.00),(176,41,30,4,5.00,5.00,100.00),(177,41,9,1,2.00,2.00,4.00),(178,41,1,2,2.00,2.00,8.00),(179,41,4,1,1.00,1.00,1.00),(180,42,10,1,2.00,2.00,4.00),(181,42,7,1,2.00,2.00,4.00),(182,42,11,1,2.00,2.00,4.00),(183,42,30,1,2.00,2.00,4.00),(184,42,8,1,2.00,2.00,4.00),(185,42,1,2,1.00,1.00,2.00),(186,42,6,1,1.00,1.00,1.00),(187,43,1,2,2.00,2.00,8.00),(188,43,6,1,1.00,1.00,1.00),(189,43,18,1,2.00,2.00,4.00),(190,44,10,1,1.00,2.00,2.00),(191,44,7,1,1.00,2.00,2.00),(192,44,8,1,2.00,2.00,4.00),(193,44,1,2,1.00,1.00,2.00),(194,45,10,1,1.00,2.00,2.00),(195,45,7,1,1.00,1.00,1.00),(196,45,1,2,2.00,2.00,8.00),(197,45,4,1,1.00,1.00,1.00),(198,45,6,1,1.00,1.00,1.00),(199,46,10,1,2.00,2.00,4.00),(200,46,7,1,2.00,2.00,4.00),(201,46,11,4,3.00,3.00,36.00),(202,46,30,4,2.00,2.00,16.00),(203,46,9,1,2.00,2.00,4.00),(204,46,1,2,2.00,2.00,8.00),(205,46,4,1,1.00,1.00,1.00),(206,46,6,1,2.00,2.00,4.00),(207,46,18,1,2.00,2.00,4.00),(208,46,13,1,2.00,2.00,4.00),(209,47,1,2,2.00,2.00,8.00),(210,47,6,1,2.00,2.00,4.00),(211,47,18,1,2.00,2.00,4.00),(212,47,13,1,2.00,2.00,4.00);
/*!40000 ALTER TABLE `plan_has_floorarea_has_housesubparts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planstatus`
--

DROP TABLE IF EXISTS `planstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planstatus`
--

LOCK TABLES `planstatus` WRITE;
/*!40000 ALTER TABLE `planstatus` DISABLE KEYS */;
INSERT INTO `planstatus` VALUES (1,'Active'),(2,'Completed'),(3,'Deleted');
/*!40000 ALTER TABLE `planstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plantype`
--

DROP TABLE IF EXISTS `plantype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plantype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `persftcharge` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plantype`
--

LOCK TABLES `plantype` WRITE;
/*!40000 ALTER TABLE `plantype` DISABLE KEYS */;
INSERT INTO `plantype` VALUES (1,'Customer Plan',0.00),(2,'In-House Plan',80.00);
/*!40000 ALTER TABLE `plantype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilage`
--

DROP TABLE IF EXISTS `privilage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privilage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roles_role_id` int NOT NULL,
  `module_id` int NOT NULL,
  `sel` int DEFAULT NULL,
  `ins` int DEFAULT NULL,
  `upd` int DEFAULT NULL,
  `del` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_privilage_module1_idx` (`module_id`),
  KEY `fk_privilage_roles1_idx` (`roles_role_id`),
  CONSTRAINT `fk_privilage_module1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`),
  CONSTRAINT `fk_privilage_roles1` FOREIGN KEY (`roles_role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilage`
--

LOCK TABLES `privilage` WRITE;
/*!40000 ALTER TABLE `privilage` DISABLE KEYS */;
INSERT INTO `privilage` VALUES (1,2,1,1,0,0,0),(2,2,2,0,0,0,0),(3,2,3,0,0,0,0),(4,3,1,1,1,1,1),(5,3,2,1,1,1,1),(6,3,3,1,1,1,1),(69,3,10,1,1,1,1),(70,4,9,1,1,1,1),(71,5,8,1,1,1,1),(72,3,4,1,1,1,1),(73,2,10,1,1,1,1),(74,2,4,1,1,1,1),(75,3,11,1,1,1,1),(76,3,12,1,1,1,1),(77,3,8,1,1,1,1),(78,3,9,1,1,1,1),(79,3,13,1,1,1,1),(80,3,14,1,1,1,1),(81,3,15,1,1,1,1),(82,3,16,1,1,1,1),(83,3,17,1,1,1,1),(84,3,5,1,1,1,1),(85,3,7,1,1,1,1),(86,5,6,1,1,1,1),(87,5,10,1,0,1,0),(88,4,10,1,0,1,0),(89,2,7,1,1,1,1),(90,5,16,0,0,0,0);
/*!40000 ALTER TABLE `privilage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `province`
--

DROP TABLE IF EXISTS `province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `province` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `province`
--

LOCK TABLES `province` WRITE;
/*!40000 ALTER TABLE `province` DISABLE KEYS */;
INSERT INTO `province` VALUES (1,'Central Province','CP'),(2,'Eastern Province','EP'),(3,'North Central Province','NC'),(4,'Northern Province','NP'),(5,'North Western Province','NW'),(6,'Sabaragamuwa Province','SG'),(7,'Southern Province','SP'),(8,'Uva Province','UP'),(9,'Western Province','WP');
/*!40000 ALTER TABLE `province` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prsubtaskstatus`
--

DROP TABLE IF EXISTS `prsubtaskstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prsubtaskstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prsubtaskstatus`
--

LOCK TABLES `prsubtaskstatus` WRITE;
/*!40000 ALTER TABLE `prsubtaskstatus` DISABLE KEYS */;
INSERT INTO `prsubtaskstatus` VALUES (1,'Completed'),(2,'Not-Completed');
/*!40000 ALTER TABLE `prsubtaskstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qsassignment`
--

DROP TABLE IF EXISTS `qsassignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qsassignment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservation_id` int NOT NULL,
  `assigndate` date NOT NULL,
  `completeddate` date DEFAULT NULL,
  `actualcompleteddate` date DEFAULT NULL,
  `description` text,
  `employee_id` int NOT NULL,
  `qsstatus_id` int NOT NULL,
  `qsemployee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_qsassignment_reservation1_idx` (`reservation_id`),
  KEY `fk_qsassignment_employee2_idx` (`employee_id`),
  KEY `fk_qsassignment_qsstatus1_idx` (`qsstatus_id`),
  KEY `fk_qsassignment_employee1_idx` (`qsemployee_id`),
  CONSTRAINT `fk_qsassignment_employee1` FOREIGN KEY (`qsemployee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_qsassignment_employee2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_qsassignment_qsstatus1` FOREIGN KEY (`qsstatus_id`) REFERENCES `qsstatus` (`id`),
  CONSTRAINT `fk_qsassignment_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qsassignment`
--

LOCK TABLES `qsassignment` WRITE;
/*!40000 ALTER TABLE `qsassignment` DISABLE KEYS */;
INSERT INTO `qsassignment` VALUES (1,1,'2021-12-13','2021-12-20','2021-12-19',NULL,1,3,1),(2,2,'2021-12-13','2021-12-20','2021-12-15',NULL,1,1,1),(3,1,'2022-01-21','2022-01-28','2022-01-26',NULL,1,1,4),(4,3,'2022-01-21','2022-01-28','2022-01-26',NULL,1,1,10),(5,4,'2022-01-21','2022-01-28','2022-01-20',NULL,1,1,4),(6,21,'2022-03-10','2022-03-17','2022-03-11',NULL,2,1,4),(7,25,'2022-03-13','2022-03-20','2022-03-13',NULL,2,1,4),(8,26,'2022-03-21','2022-03-28',NULL,NULL,2,1,4),(9,29,'2022-04-16','2022-04-23',NULL,NULL,2,1,4),(10,30,'2022-04-25','2022-05-02','2022-04-25',NULL,2,1,4),(11,31,'2022-05-05','2022-05-12','2022-05-05',NULL,2,1,4),(12,32,'2022-05-19','2022-05-26','2022-05-19',NULL,2,1,4),(13,36,'2022-05-22','2022-05-29','2022-05-22',NULL,2,1,4);
/*!40000 ALTER TABLE `qsassignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qsstatus`
--

DROP TABLE IF EXISTS `qsstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qsstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qsstatus`
--

LOCK TABLES `qsstatus` WRITE;
/*!40000 ALTER TABLE `qsstatus` DISABLE KEYS */;
INSERT INTO `qsstatus` VALUES (1,'Active'),(2,'In-Active'),(3,'Deleted');
/*!40000 ALTER TABLE `qsstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationcode` char(10) NOT NULL,
  `customer_id` int NOT NULL,
  `service_id` int NOT NULL,
  `projecttitle` text NOT NULL,
  `projectlocation` text NOT NULL,
  `province_id` int NOT NULL,
  `servicecharge` decimal(10,2) NOT NULL,
  `supervisor_id` int NOT NULL,
  `plan_id` int DEFAULT NULL,
  `planaddeddate` date DEFAULT NULL,
  `plancharge` decimal(20,2) DEFAULT NULL,
  `totalarea` decimal(20,2) DEFAULT NULL,
  `estimation_id` int DEFAULT NULL,
  `estimationaddeddate` date DEFAULT NULL,
  `estimationcost` decimal(20,2) DEFAULT NULL,
  `totalestimatedcost` decimal(20,2) DEFAULT NULL,
  `totalcharge` decimal(20,2) DEFAULT NULL,
  `discountratio` decimal(10,2) DEFAULT NULL,
  `lastprice` decimal(20,2) DEFAULT NULL,
  `paidamount` decimal(20,2) DEFAULT NULL,
  `advance` decimal(20,2) DEFAULT NULL,
  `balanceamount` decimal(20,2) DEFAULT NULL,
  `employee_id` int NOT NULL,
  `reservationstatus_id` int NOT NULL,
  `addeddate` date NOT NULL,
  `description` text,
  `extplan` tinyint NOT NULL,
  `constructiontype_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reservationcode_UNIQUE` (`reservationcode`),
  KEY `fk_reservation_customer1_idx` (`customer_id`),
  KEY `fk_reservation_service1_idx` (`service_id`),
  KEY `fk_reservation_province1_idx` (`province_id`),
  KEY `fk_reservation_employee1_idx` (`supervisor_id`),
  KEY `fk_reservation_plan1_idx` (`plan_id`),
  KEY `fk_reservation_estimation1_idx` (`estimation_id`),
  KEY `fk_reservation_employee2_idx` (`employee_id`),
  KEY `fk_reservation_reservationstatus1_idx` (`reservationstatus_id`),
  KEY `fk_reservation_constructiontype1_idx` (`constructiontype_id`),
  CONSTRAINT `fk_reservation_constructiontype1` FOREIGN KEY (`constructiontype_id`) REFERENCES `constructiontype` (`id`),
  CONSTRAINT `fk_reservation_customer1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `fk_reservation_employee1` FOREIGN KEY (`supervisor_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_reservation_employee2` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_reservation_estimation1` FOREIGN KEY (`estimation_id`) REFERENCES `estimation` (`id`),
  CONSTRAINT `fk_reservation_plan1` FOREIGN KEY (`plan_id`) REFERENCES `plan` (`id`),
  CONSTRAINT `fk_reservation_province1` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`),
  CONSTRAINT `fk_reservation_reservationstatus1` FOREIGN KEY (`reservationstatus_id`) REFERENCES `reservationstatus` (`id`),
  CONSTRAINT `fk_reservation_service1` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,'R000000001',1,1,'Drawing planning only','Nugegoda',9,5000.00,1,1,'2021-11-15',52704.00,658.80,3,'2021-09-24',6000.00,2271360.00,40000.00,0.00,40000.00,NULL,NULL,NULL,1,3,'2021-11-22',NULL,0,1),(2,'R000000002',2,2,'Estimation only','Maharagama',9,8000.00,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,3,'2021-11-25',NULL,0,1),(3,'R000000003',5,3,'Drawing plan and Single Floor making House','Kirulapana',9,5000.00,1,1,'2021-11-15',52704.00,658.80,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'2021-11-26',NULL,1,1),(4,'R000000004',5,1,'Drawing plan and Two Floor making','Jaffna',4,20000.00,1,4,'2021-12-31',234240.00,2928.00,2,'2021-09-24',5000.00,24400.00,283640.00,NULL,283640.00,NULL,NULL,NULL,1,3,'2021-12-12','New Plan Added',0,1),(5,'R000000005',7,3,'Drawing plan and Single Floor making','Theldeniya',1,6000.00,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,3,'2021-12-16',NULL,0,1),(8,'R000000006',5,5,'Drawing plan and Two Floor making','Dehiwala',9,5000.00,1,4,'2021-12-31',234240.00,2928.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,3,'2021-12-17',NULL,0,1),(9,'R000000007',11,6,'Planning and Estimation for two floor house','Theldeniya',9,7500.00,2,5,'2022-01-27',203496.00,5087.40,7,'2022-01-25',6000.00,456000.00,672996.00,NULL,662996.00,100000.00,10000.00,NULL,1,3,'2022-01-27',NULL,0,1),(10,'R000000008',12,1,'Planning and estimation single floor house in Kirulapana','Kirulapana',9,6000.00,2,6,'2022-02-08',180804.00,3013.40,8,'2022-02-08',2000.00,1012800.00,1201604.00,NULL,1181604.00,NULL,20000.00,NULL,1,3,'2022-02-08',NULL,0,1),(11,'R000000009',13,1,'Planning and estimation for single floor house in Nugegoda','Nugegoda',9,6000.00,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,3,'2022-02-13',NULL,0,1),(14,'R000000010',11,1,'Planning and estimation for single floor house in Dehiwala','Dehiwala',9,6000.00,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,3,'2022-02-13',NULL,0,1),(15,'R000000011',13,1,'Planning for single floor house and estimation','Mirihaana',9,6000.00,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6000.00,0.00,6000.00,NULL,0.00,NULL,1,2,'2022-02-13',NULL,0,1),(16,'R000000012',12,2,'Planning and estimation for single for house Kohuwala','Kohuwala',9,9000.00,2,7,'2022-02-14',288896.00,3611.20,9,'2022-02-15',120000.00,1012800.00,1430696.00,0.00,1430696.00,NULL,143069.60,NULL,1,1,'2022-02-15',NULL,0,1),(17,'R000000013',14,1,'Planning and estimation for single floor house','Nugegoda',9,6000.00,2,8,'2022-02-17',430660.00,4306.60,10,'2022-02-20',10000.00,2869600.00,3316260.00,0.00,3316260.00,230000.00,331626.00,NULL,1,1,'2022-02-18',NULL,0,1),(18,'R000000014',14,1,'Planning and estimation single floor house','Nittambuwa',9,6000.00,2,9,'2022-02-19',228140.00,2281.40,11,'2022-02-20',6000.00,19614400.00,19854540.00,0.00,19854540.00,20000.00,1985454.00,NULL,1,1,'2022-02-20',NULL,0,1),(19,'R000000015',15,5,'Planning and estimation for two floor house in Kirulapana','Kirulapana',9,13000.00,2,10,'2022-02-23',90750.00,9075.00,NULL,NULL,NULL,NULL,90750.00,0.00,90750.00,10000.00,9075.00,NULL,1,1,'2022-02-23',NULL,0,1),(20,'R000000016',16,1,'Planning  for single floor house','Mirihana',9,6000.00,2,11,'2022-03-02',24400.00,244.00,NULL,NULL,NULL,NULL,24400.00,0.00,24400.00,0.00,2440.00,NULL,1,1,'2022-03-02',NULL,0,1),(21,'R000000017',17,2,'Planning and  estimation for Single floor house Gandodawila','Nugegoda',9,9000.00,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,9000.00,0.00,9000.00,1000.00,0.00,NULL,12,2,'2022-03-06',NULL,0,1),(22,'R000000018',14,1,'Planning only for single for house','Rathmalana',9,6000.00,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6000.00,0.00,6000.00,0.00,0.00,NULL,1,2,'2022-03-10',NULL,0,1),(23,'R000000019',15,1,'Planning only for signgle floor house in Ragama','Ragama',9,6000.00,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6000.00,0.00,6000.00,0.00,0.00,NULL,1,2,'2022-03-10',NULL,0,1),(24,'R000000020',7,1,'Planning for signle floor house Maradhana 02','Maradhana',5,6000.00,2,26,'2022-03-10',9760.00,9.76,NULL,NULL,NULL,NULL,9760.00,0.00,9760.00,0.00,976.00,NULL,1,1,'2022-03-10',NULL,0,1),(25,'R000000021',16,1,'Planning for sigle floor house purawaraama.','Nugegoda',9,6000.00,2,27,'2022-03-13',20740.00,20.74,NULL,NULL,NULL,NULL,20740.00,0.00,20740.00,0.00,2074.00,NULL,1,1,'2022-03-13',NULL,0,1),(26,'R000000022',16,2,'Plan and estimation for single floor house Thalapathpitiya','Thalapathpitiya',9,9000.00,2,28,'2022-03-21',19398.00,193.98,NULL,NULL,NULL,NULL,19398.00,0.00,19398.00,0.00,1939.80,NULL,2,1,'2022-03-21',NULL,0,1),(27,'R000000023',16,1,'Planning for single floor house Kanndawaththa','Nugegoda',9,6000.00,2,29,'2022-03-21',18300.00,18.30,NULL,NULL,NULL,NULL,18300.00,0.00,18300.00,10000.00,1830.00,NULL,2,1,'2022-03-21',NULL,0,1),(28,'R000000024',14,2,'Planning and Estimation for single floor house Wijayabawatha','Nugegoda',5,9000.00,2,30,'2022-03-28',296460.00,296.46,NULL,NULL,NULL,NULL,296460.00,0.00,296460.00,0.00,29646.00,NULL,2,1,'2022-03-28',NULL,0,1),(29,'R000000025',18,1,'Planning and estimation for single floor house in Wijayaba road','Nugegoda',9,6000.00,2,31,'2022-04-16',13176.00,131.76,NULL,NULL,NULL,NULL,13176.00,0.00,13176.00,0.00,1317.60,NULL,2,1,'2022-04-16',NULL,0,1),(30,'R000000026',19,2,'Planning and Estimation for single for house Jambugasmulla Roda','Nugegoda',9,9000.00,2,32,'2022-04-25',10370.00,103.70,13,'2022-04-25',6000.00,11780.00,28150.00,0.00,28150.00,11000.00,2815.00,NULL,12,1,'2022-04-25',NULL,0,1),(31,'R000000027',20,5,'Planning and Estimation for two floor house in kajuwatta','Kohuwala',9,13000.00,2,34,'2022-05-05',4392.00,43.92,14,'2022-05-05',1000.00,18880.00,24272.00,0.00,24272.00,1000.00,2427.20,NULL,2,1,'2022-05-05',NULL,0,1),(32,'R000000028',21,2,'Planning and Estimation for single floor house in Maligawaththa','Colombo',9,9000.00,2,35,'2022-05-19',1220.00,12.20,15,'2022-05-19',6000.00,12800.00,20020.00,0.00,20020.00,9000.00,2002.00,NULL,2,1,'2022-05-19',NULL,0,1),(33,'R000000029',7,1,'Planning only for signle floor house araliya road Panadura','Panadura',9,6000.00,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6000.00,0.00,6000.00,0.00,0.00,NULL,2,2,'2022-05-19',NULL,0,1),(34,'R000000030',14,1,'Planning for single floor house in Wickramasighe road Nugegoda','Nugegoda',5,6000.00,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6000.00,0.00,6000.00,0.00,0.00,NULL,2,2,'2022-05-19',NULL,0,1),(35,'R000000031',22,1,'Planning for Single floor house in Exlab road in Nugegoda','Nugegoda',9,6000.00,2,36,'2022-05-19',1586.00,15.86,NULL,NULL,NULL,NULL,1586.00,0.00,1586.00,0.00,158.60,NULL,2,1,'2022-05-19',NULL,0,1),(36,'R000000032',23,5,'Planning and Estimation for two floor house in Sampath Road','Nugegoda',9,13000.00,2,37,'2022-05-22',128100.00,128.10,16,'2022-05-22',1000.00,36080.00,165180.00,0.00,165180.00,0.00,16518.00,NULL,2,1,'2022-05-22',NULL,0,1);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservationprogress`
--

DROP TABLE IF EXISTS `reservationprogress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservationprogress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rpcode` char(10) NOT NULL,
  `reservation_id` int NOT NULL,
  `reservationtotalamount` decimal(20,2) NOT NULL,
  `reservationpaidamount` decimal(20,2) NOT NULL,
  `stratdate` date NOT NULL,
  `enddate` date NOT NULL,
  `progressreportamount` decimal(20,2) NOT NULL,
  `addeddate` date NOT NULL,
  `description` text,
  `employee_id` int NOT NULL,
  `rprstatus_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reservationprogress_reservation1_idx` (`reservation_id`),
  KEY `fk_reservationprogress_employee1_idx` (`employee_id`),
  KEY `fk_reservationprogress_rprstatus1_idx` (`rprstatus_id`),
  CONSTRAINT `fk_reservationprogress_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_reservationprogress_reservation1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`),
  CONSTRAINT `fk_reservationprogress_rprstatus1` FOREIGN KEY (`rprstatus_id`) REFERENCES `rprstatus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservationprogress`
--

LOCK TABLES `reservationprogress` WRITE;
/*!40000 ALTER TABLE `reservationprogress` DISABLE KEYS */;
INSERT INTO `reservationprogress` VALUES (2,'RP00000001',16,1430696.00,0.00,'2022-02-14','2022-02-21',604800.00,'2022-02-16',NULL,1,3),(3,'RP00000002',17,3316260.00,10000.00,'2022-02-19','2022-02-21',2869600.00,'2022-02-20',NULL,1,1),(4,'RP00000003',18,19854540.00,0.00,'2022-02-19','2022-02-27',19614400.00,'2022-02-20',NULL,1,1),(5,'RP00000004',30,28150.00,0.00,'2022-04-26','2022-04-27',10080.00,'2022-04-26',NULL,2,1),(6,'RP00000005',30,28150.00,10000.00,'2022-04-30','2022-05-02',4480.00,'2022-04-30',NULL,2,1);
/*!40000 ALTER TABLE `reservationprogress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservationprogress_has_estimation_has_subcategory`
--

DROP TABLE IF EXISTS `reservationprogress_has_estimation_has_subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservationprogress_has_estimation_has_subcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationprogress_id` int NOT NULL,
  `estimation_has_subcategory_id` int NOT NULL,
  `quantity` decimal(20,2) NOT NULL,
  `completedquantity` decimal(10,2) NOT NULL,
  `planedqty` decimal(10,2) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `lastprice` decimal(20,2) NOT NULL,
  `rate` decimal(20,2) NOT NULL,
  `linetotalamount` decimal(20,2) NOT NULL,
  `prsubtaskstatus_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reservationprogress_has_estimation_has_subcategory_estim_idx` (`estimation_has_subcategory_id`),
  KEY `fk_reservationprogress_has_estimation_has_subcategory_reser_idx` (`reservationprogress_id`),
  KEY `fk_reservationprogress_has_estimation_has_subcategory_prsub_idx` (`prsubtaskstatus_id`),
  CONSTRAINT `fk_reservationprogress_has_estimation_has_subcategory_estimat1` FOREIGN KEY (`estimation_has_subcategory_id`) REFERENCES `estimation_has_subcategory` (`id`),
  CONSTRAINT `fk_reservationprogress_has_estimation_has_subcategory_prsubta1` FOREIGN KEY (`prsubtaskstatus_id`) REFERENCES `prsubtaskstatus` (`id`),
  CONSTRAINT `fk_reservationprogress_has_estimation_has_subcategory_reserva1` FOREIGN KEY (`reservationprogress_id`) REFERENCES `reservationprogress` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservationprogress_has_estimation_has_subcategory`
--

LOCK TABLES `reservationprogress_has_estimation_has_subcategory` WRITE;
/*!40000 ALTER TABLE `reservationprogress_has_estimation_has_subcategory` DISABLE KEYS */;
INSERT INTO `reservationprogress_has_estimation_has_subcategory` VALUES (1,2,20,1.00,1.00,1.00,'Cube',336000.00,1400.00,336000.00,1),(2,2,21,1.00,1.00,1.00,'Cube',268800.00,1120.00,268800.00,1),(3,3,23,1.00,1.00,1.00,'Cube',952000.00,1400.00,952000.00,1),(4,3,24,1.00,1.00,1.00,'Cube',761600.00,1120.00,761600.00,1),(5,3,25,1.00,1.00,1.00,'Cube',1156000.00,1700.00,1156000.00,1),(6,4,26,1.00,1.00,1.00,'Cube',280000.00,1400.00,280000.00,1),(7,4,27,1.00,1.00,1.00,'Cube',134400.00,1120.00,134400.00,1),(8,4,28,2.00,1.00,2.00,'Cube',19200000.00,20000.00,19200000.00,2),(9,5,32,1.00,1.00,1.00,'Cube',5600.00,1400.00,5600.00,1),(10,5,33,1.00,1.00,1.00,'Cube',4480.00,1120.00,4480.00,1),(11,6,33,1.00,1.00,1.00,'Cube',4480.00,1120.00,4480.00,1);
/*!40000 ALTER TABLE `reservationprogress_has_estimation_has_subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservationstatus`
--

DROP TABLE IF EXISTS `reservationstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservationstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservationstatus`
--

LOCK TABLES `reservationstatus` WRITE;
/*!40000 ALTER TABLE `reservationstatus` DISABLE KEYS */;
INSERT INTO `reservationstatus` VALUES (1,'Active'),(2,'In-Progress'),(3,'Deleted');
/*!40000 ALTER TABLE `reservationstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN'),(2,'SALES EXECUTIVE'),(3,'SUPERVISOR'),(4,'DESIGNER'),(5,'QS');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rprstatus`
--

DROP TABLE IF EXISTS `rprstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rprstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rprstatus`
--

LOCK TABLES `rprstatus` WRITE;
/*!40000 ALTER TABLE `rprstatus` DISABLE KEYS */;
INSERT INTO `rprstatus` VALUES (1,'Completed'),(2,'In-Progress'),(3,'Deleted');
/*!40000 ALTER TABLE `rprstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serviceno` char(10) NOT NULL,
  `servicetype_id` int NOT NULL,
  `servicename` varchar(150) NOT NULL,
  `servicecharge` decimal(7,2) NOT NULL,
  `addeddate` date NOT NULL,
  `description` text,
  `servicestatus_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `serviceno_UNIQUE` (`serviceno`),
  KEY `fk_service_servicestatus1_idx` (`servicestatus_id`),
  KEY `fk_service_servicetype1_idx` (`servicetype_id`),
  KEY `fk_service_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_service_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_service_servicestatus1` FOREIGN KEY (`servicestatus_id`) REFERENCES `servicestatus` (`id`),
  CONSTRAINT `fk_service_servicetype1` FOREIGN KEY (`servicetype_id`) REFERENCES `servicetype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'S000000001',1,'Planning for single floor house',6000.00,'2021-08-24',NULL,1,1),(2,'S000000002',3,'Planning & Estimate for single floor house',9000.00,'2021-09-02',NULL,1,1),(3,'S000000003',5,'Planning & estimation with construction for single floor house',12000.00,'2021-09-08','Chage service type Etimate to planning',1,1),(4,'S000000004',1,'Planning for two floor house',7000.00,'2021-09-13',NULL,1,1),(5,'S000000005',3,'Planning & Estimation for two floor house',13000.00,'2021-10-16',NULL,1,1),(6,'S000000006',5,'Planinng and Estimation with construction for two floor house',7500.00,'2022-01-27',NULL,1,1),(7,'S000000007',1,'Plannin only for three floor house',8000.00,'2022-04-16',NULL,1,2);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicestatus`
--

DROP TABLE IF EXISTS `servicestatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicestatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicestatus`
--

LOCK TABLES `servicestatus` WRITE;
/*!40000 ALTER TABLE `servicestatus` DISABLE KEYS */;
INSERT INTO `servicestatus` VALUES (1,'Active'),(2,'In-Active'),(3,'Deleted');
/*!40000 ALTER TABLE `servicestatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicetype`
--

DROP TABLE IF EXISTS `servicetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicetype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicetype`
--

LOCK TABLES `servicetype` WRITE;
/*!40000 ALTER TABLE `servicetype` DISABLE KEYS */;
INSERT INTO `servicetype` VALUES (1,'Planing Only'),(2,'Estimate Only'),(3,'Planing-Estimate'),(4,'Construction Only'),(5,'Full Service');
/*!40000 ALTER TABLE `servicetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKt7e7djp752sqn6w22i6ocqy6q` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1),(5,2),(2,3),(3,4),(4,5);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `employee_id` int DEFAULT NULL,
  `employee_created_id` int DEFAULT NULL,
  `hint` char(4) DEFAULT NULL,
  `docreation` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`),
  KEY `fk_users_employee1_idx` (`employee_id`),
  KEY `fk_users_employee2_idx` (`employee_created_id`),
  CONSTRAINT `fk_users_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_users_employee2` FOREIGN KEY (`employee_created_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,_binary '','admin.gmail.com',NULL,NULL,'$2a$10$DBcSvDu0V0t6hg0tY23V4elcGDwhgCIbehP5gCkNY8eFBOwaR9CHW','Admin',1,1,NULL,'2021-01-01'),(2,_binary '','matislakmal160@gmail.com',NULL,NULL,'$2a$10$b3lkG/Zhnm6JPxJ9pO.g0.yn3ywn6CcngmwCzhum4wzC90wDl.d7K','Nishantha',2,1,NULL,'2022-02-23'),(3,_binary '','matislakmal160@gmail.com',NULL,NULL,'$2a$10$EqJFhX3fEwwM2GTEXlwj1OKPZ3Fyfdx5GFurrbIrSvdlJR3Hxi5ue','Upulw',3,1,NULL,'2022-03-06'),(4,_binary '','matislakmal160@gmail.com',NULL,NULL,'$2a$10$MUQT0yIF0ERX2YPwIvKJ9Ozhb0e1skx4xMPpB/SjWac6Sna7ecoy.','Aravinda',4,1,NULL,'2022-03-06'),(5,_binary '','matislakmal160@gmail.com',NULL,NULL,'$2a$10$weH4X.bxly/knf7zssIhpOV5OT9Q.BwdZBBL04dv2y7dudvH87hvm','Akila',12,1,NULL,'2022-03-06');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-23  8:46:51
