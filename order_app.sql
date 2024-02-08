-- MySQL dump 10.13  Distrib 8.0.33, for macos13.3 (x86_64)
--
-- Host: localhost    Database: order_app
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order-category`
--

DROP TABLE IF EXISTS `order-category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order-category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_category_name` varchar(255) NOT NULL,
  `order_category_description` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order-category`
--

LOCK TABLES `order-category` WRITE;
/*!40000 ALTER TABLE `order-category` DISABLE KEYS */;
INSERT INTO `order-category` VALUES (1,'Course Work','A brief overview about a certain topic','2024-02-07 19:41:44.060187','2024-02-07 19:41:44.060187'),(2,'Essay','A brief overview about a certain topic','2024-02-07 19:41:52.450951','2024-02-07 19:41:52.450951'),(3,'Case Study','A brief overview about a certain topic','2024-02-07 19:42:00.057059','2024-02-07 19:42:00.057059');
/*!40000 ALTER TABLE `order-category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_academic-level`
--

DROP TABLE IF EXISTS `order_academic-level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_academic-level` (
  `academic_level_id` int NOT NULL AUTO_INCREMENT,
  `academic_level_name` varchar(255) NOT NULL,
  `academic_level_description` varchar(255) DEFAULT NULL,
  `academic_level_code` varchar(255) DEFAULT NULL,
  `level_order` int DEFAULT NULL,
  `IsActive` tinyint NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`academic_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_academic-level`
--

LOCK TABLES `order_academic-level` WRITE;
/*!40000 ALTER TABLE `order_academic-level` DISABLE KEYS */;
INSERT INTO `order_academic-level` VALUES (1,'Phd','A student out of college or university college','POSTGRADUATE',NULL,1,'2024-02-07 19:43:50.004610','2024-02-07 19:43:50.004610'),(2,'Masters','A student out of college or university college','POSTGRADUATE',NULL,1,'2024-02-07 19:43:59.483332','2024-02-07 19:43:59.483332'),(3,'Post graduate','A student out of college or university college','POSTGRADUATE',NULL,1,'2024-02-07 19:44:04.007632','2024-02-07 19:44:04.007632'),(4,'Undergraduate','A student in college or university college','UNDERGRADUATE',NULL,1,'2024-02-07 19:44:12.818503','2024-02-07 19:44:12.818503'),(5,'High School','A high school student','GRADUATE',NULL,1,'2024-02-07 19:44:23.172112','2024-02-07 19:44:23.172112');
/*!40000 ALTER TABLE `order_academic-level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_files`
--

DROP TABLE IF EXISTS `order_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_files` (
  `file_id` int NOT NULL AUTO_INCREMENT,
  `file_url` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `order` int NOT NULL,
  PRIMARY KEY (`file_id`),
  KEY `FK_b1a3639ecc6c08b9e91d555a6b2` (`order`),
  CONSTRAINT `FK_b1a3639ecc6c08b9e91d555a6b2` FOREIGN KEY (`order`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_files`
--

LOCK TABLES `order_files` WRITE;
/*!40000 ALTER TABLE `order_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_messages`
--

DROP TABLE IF EXISTS `order_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `message_content` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `order_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `FK_01e1cb89abad3329a9fe957a9e3` (`order_id`),
  KEY `FK_3e333da79e85dcb7352c684719a` (`user_id`),
  CONSTRAINT `FK_01e1cb89abad3329a9fe957a9e3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `FK_3e333da79e85dcb7352c684719a` FOREIGN KEY (`user_id`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_messages`
--

LOCK TABLES `order_messages` WRITE;
/*!40000 ALTER TABLE `order_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_pages`
--

DROP TABLE IF EXISTS `order_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_pages` (
  `pages_id` int NOT NULL AUTO_INCREMENT,
  `number_of_pages` int NOT NULL,
  `word_count` int NOT NULL,
  `pages_description` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`pages_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_pages`
--

LOCK TABLES `order_pages` WRITE;
/*!40000 ALTER TABLE `order_pages` DISABLE KEYS */;
INSERT INTO `order_pages` VALUES (1,6,1650,'1650 words / 6 pages','2024-02-07 19:42:46.469004','2024-02-07 19:42:46.469004'),(2,5,1375,'1375 words / 5 pages','2024-02-07 19:42:58.969487','2024-02-07 19:42:58.969487'),(3,4,1100,'1100 words / 4 pages','2024-02-07 19:43:05.423040','2024-02-07 19:43:05.423040'),(4,3,825,'825 words / 3 pages','2024-02-07 19:43:11.909429','2024-02-07 19:43:11.909429'),(5,1,275,'275 words / 1 pages','2024-02-07 19:43:17.903312','2024-02-07 19:43:17.903312');
/*!40000 ALTER TABLE `order_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_references`
--

DROP TABLE IF EXISTS `order_references`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_references` (
  `reference_id` int NOT NULL AUTO_INCREMENT,
  `reference_name` varchar(255) NOT NULL,
  `reference_description` varchar(500) NOT NULL,
  `number_of_references` int NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`reference_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_references`
--

LOCK TABLES `order_references` WRITE;
/*!40000 ALTER TABLE `order_references` DISABLE KEYS */;
INSERT INTO `order_references` VALUES (1,'many sources','12 sources',12,'2024-02-07 19:46:18.570242','2024-02-07 19:46:18.570242'),(2,'more sources','8 sources',8,'2024-02-07 19:46:26.984641','2024-02-07 19:46:26.984641'),(3,'medium sources','5 sources',5,'2024-02-07 19:46:33.170939','2024-02-07 19:46:33.170939'),(4,'few sources','3 sources',3,'2024-02-07 19:46:39.109825','2024-02-07 19:46:39.109825');
/*!40000 ALTER TABLE `order_references` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_revision`
--

DROP TABLE IF EXISTS `order_revision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_revision` (
  `revision_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `revision_title` varchar(255) NOT NULL,
  `revision_instructions` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createdByUserId` int NOT NULL,
  PRIMARY KEY (`revision_id`),
  KEY `FK_47885e1741d6ecd94f69c8b14be` (`createdByUserId`),
  KEY `FK_0c3e724f5f97030a2dcf96cb23d` (`order_id`),
  CONSTRAINT `FK_0c3e724f5f97030a2dcf96cb23d` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `FK_47885e1741d6ecd94f69c8b14be` FOREIGN KEY (`createdByUserId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_revision`
--

LOCK TABLES `order_revision` WRITE;
/*!40000 ALTER TABLE `order_revision` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_revision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_styles`
--

DROP TABLE IF EXISTS `order_styles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_styles` (
  `style_id` int NOT NULL AUTO_INCREMENT,
  `style_name` varchar(255) NOT NULL,
  `style_description` varchar(1000) NOT NULL,
  `style_code` varchar(255) NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `createdBy` varchar(255) NOT NULL,
  `updatedBy` varchar(255) NOT NULL,
  `additionalInfo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`style_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_styles`
--

LOCK TABLES `order_styles` WRITE;
/*!40000 ALTER TABLE `order_styles` DISABLE KEYS */;
INSERT INTO `order_styles` VALUES (1,'American Psychological Association','APA style (also known as APA format) is a writing style and format for academic documents such as scholarly journal articles and books. It is commonly used for citing sources within the field of behavioral and social sciences, including sociology, education, nursing, criminal justice, and anthropology, as well as psychology.','APA',1,'2024-02-07 16:43:29','2024-02-07 19:43:29.407301','2024-02-07 19:43:29.407301','Alfred','Alfred',NULL),(2,'Modern Language Association','MLA style is a referencing method developed by the Modern Language Association. It consists of two parts: a brief in-text citation in the body of your essay and a detailed list of the “Works Cited” at the end of the work.','MLA',1,'2024-02-07 16:43:42','2024-02-07 19:43:42.207387','2024-02-07 19:43:42.207387','Alfred','Alfred',NULL);
/*!40000 ALTER TABLE `order_styles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_subject`
--

DROP TABLE IF EXISTS `order_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_subject` (
  `order_subject_id` int NOT NULL AUTO_INCREMENT,
  `order_subject_name` varchar(255) NOT NULL,
  `order_subject_description` varchar(500) DEFAULT NULL,
  `IsActive` tinyint NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`order_subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_subject`
--

LOCK TABLES `order_subject` WRITE;
/*!40000 ALTER TABLE `order_subject` DISABLE KEYS */;
INSERT INTO `order_subject` VALUES (1,'Biology and Science','Science',1,'2024-02-07 19:45:49.408329','2024-02-07 19:45:49.408329'),(2,'IT and Programming','Computer Science',1,'2024-02-07 19:45:55.562305','2024-02-07 19:45:55.562305'),(3,'Human Resource Management','HRM',1,'2024-02-07 19:46:00.835730','2024-02-07 19:46:00.835730'),(4,'Accounting','Accounting is the process of keeping track of all financial transactions within a business, such as any money coming in and money going out. It\'s not only important for businesses in terms of record keeping and general business management, but also for legal reasons and tax purposes.',1,'2024-02-07 19:46:08.958594','2024-02-07 19:46:08.958594');
/*!40000 ALTER TABLE `order_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_type`
--

DROP TABLE IF EXISTS `order_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_type` (
  `order_type_id` int NOT NULL AUTO_INCREMENT,
  `order_type_name` varchar(255) NOT NULL,
  `order_type_code` varchar(255) NOT NULL,
  `order_type_description` varchar(255) NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `order_type_pricing` decimal(10,2) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`order_type_id`),
  UNIQUE KEY `IDX_be670f187226f481f10f9c3743` (`order_type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_type`
--

LOCK TABLES `order_type` WRITE;
/*!40000 ALTER TABLE `order_type` DISABLE KEYS */;
INSERT INTO `order_type` VALUES (1,'Rewriting','RR','Shorten a peice of wriiten text',1,6.00,'2024-02-07 19:41:06.916343','2024-02-07 19:41:06.916343'),(2,'Paraphrasing','PR','Shorten a peice of wriiten text',1,7.00,'2024-02-07 19:41:21.609627','2024-02-07 19:41:21.609627'),(3,'Writing','WR','Shorten a peice of wriiten text',1,7.00,'2024-02-07 19:41:33.559514','2024-02-07 19:41:33.559514');
/*!40000 ALTER TABLE `order_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_urgency`
--

DROP TABLE IF EXISTS `order_urgency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_urgency` (
  `urgency_id` int NOT NULL AUTO_INCREMENT,
  `order_urgency_name` varchar(255) NOT NULL,
  `order_urgency_duration` int NOT NULL,
  `order_urgency_description` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`urgency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_urgency`
--

LOCK TABLES `order_urgency` WRITE;
/*!40000 ALTER TABLE `order_urgency` DISABLE KEYS */;
INSERT INTO `order_urgency` VALUES (1,'10 day',14400,'An urgent assignment','2024-02-07 19:44:50.086206','2024-02-07 19:44:50.086206'),(2,'5 day',7200,'An urgent assignment','2024-02-07 19:44:56.278050','2024-02-07 19:44:56.278050'),(3,'3 day',4320,'An urgent assignment','2024-02-07 19:45:00.522003','2024-02-07 19:45:00.522003'),(4,'2 day',2880,'An urgent assignment','2024-02-07 19:45:05.137190','2024-02-07 19:45:05.137190'),(5,'1 day',1440,'An urgent assignment','2024-02-07 19:45:09.731556','2024-02-07 19:45:09.731556'),(6,'10 hour',600,'An urgent assignment','2024-02-07 19:45:22.607166','2024-02-07 19:45:22.607166'),(7,'5 hour',300,'An urgent assignment','2024-02-07 19:45:28.107399','2024-02-07 19:45:28.107399'),(8,'3 hour',180,'An urgent assignment','2024-02-07 19:45:32.557987','2024-02-07 19:45:32.557987'),(9,'1 hour',60,'An urgent assignment','2024-02-07 19:45:36.908042','2024-02-07 19:45:36.908042');
/*!40000 ALTER TABLE `order_urgency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_topic` varchar(500) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `order_language` varchar(255) NOT NULL,
  `public_id` varchar(255) NOT NULL,
  `order_status` varchar(255) NOT NULL,
  `order_spacing` varchar(255) NOT NULL,
  `order_amount` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userUserId` int NOT NULL,
  `orderTypeOrderTypeId` int NOT NULL,
  `orderCategoryId` int NOT NULL,
  `academicLevelAcademicLevelId` int NOT NULL,
  `orderDeadlineUrgencyId` int NOT NULL,
  `orderStyleStyleId` int NOT NULL,
  `orderSubjectOrderSubjectId` int NOT NULL,
  `orderReferencesReferenceId` int NOT NULL,
  `orderPagesPagesId` int NOT NULL,
  `order_additional_information` text NOT NULL,
  `order_instructions` text,
  PRIMARY KEY (`order_id`),
  KEY `FK_07e7e7e338abc2f7bc519c7dba9` (`orderTypeOrderTypeId`),
  KEY `FK_8ab34f8df069bd7b9d0dd645c2c` (`orderCategoryId`),
  KEY `FK_16a882f9ee78f61f11a098eadaf` (`academicLevelAcademicLevelId`),
  KEY `FK_5df199f379e55ac0fd2bb32f107` (`orderDeadlineUrgencyId`),
  KEY `FK_d9c42aed3925f1712e07de87de8` (`orderStyleStyleId`),
  KEY `FK_b04a441929280b365e079688346` (`orderSubjectOrderSubjectId`),
  KEY `FK_f5d709535692a43177741aff674` (`orderReferencesReferenceId`),
  KEY `FK_05099c93742855e7ac62e5b506b` (`orderPagesPagesId`),
  KEY `FK_6a4ebad71685a4ed11e89b3e834` (`userUserId`),
  CONSTRAINT `FK_05099c93742855e7ac62e5b506b` FOREIGN KEY (`orderPagesPagesId`) REFERENCES `order_pages` (`pages_id`),
  CONSTRAINT `FK_07e7e7e338abc2f7bc519c7dba9` FOREIGN KEY (`orderTypeOrderTypeId`) REFERENCES `order_type` (`order_type_id`),
  CONSTRAINT `FK_16a882f9ee78f61f11a098eadaf` FOREIGN KEY (`academicLevelAcademicLevelId`) REFERENCES `order_academic-level` (`academic_level_id`),
  CONSTRAINT `FK_5df199f379e55ac0fd2bb32f107` FOREIGN KEY (`orderDeadlineUrgencyId`) REFERENCES `order_urgency` (`urgency_id`),
  CONSTRAINT `FK_6a4ebad71685a4ed11e89b3e834` FOREIGN KEY (`userUserId`) REFERENCES `user` (`userId`),
  CONSTRAINT `FK_8ab34f8df069bd7b9d0dd645c2c` FOREIGN KEY (`orderCategoryId`) REFERENCES `order-category` (`id`),
  CONSTRAINT `FK_b04a441929280b365e079688346` FOREIGN KEY (`orderSubjectOrderSubjectId`) REFERENCES `order_subject` (`order_subject_id`),
  CONSTRAINT `FK_d9c42aed3925f1712e07de87de8` FOREIGN KEY (`orderStyleStyleId`) REFERENCES `order_styles` (`style_id`),
  CONSTRAINT `FK_f5d709535692a43177741aff674` FOREIGN KEY (`orderReferencesReferenceId`) REFERENCES `order_references` (`reference_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (3,'Create a login page','0769404436','english','OD-20240207185918105-2346','Active','double','24','2024-02-07 21:59:18.117982','2024-02-07 21:59:18.117982',1,3,2,3,3,2,2,2,2,'',NULL),(4,'Workforce management','0769404436','english','OD-20240207194054664-2348','Active','double','24.00','2024-02-07 22:40:54.667939','2024-02-07 22:40:54.667939',2,2,1,2,5,1,3,1,1,'',NULL),(5,'History of HRM','0708456186','english','OD-20240208082149802-2346','Active','single','24.00','2024-02-08 11:21:49.815594','2024-02-08 11:21:49.815594',2,3,2,1,1,1,3,1,2,'A training and development manager, who may also be called a training coordinator, oversees employment training and implements training initiatives to build employee competence. Other responsibilities of this role may include communicating an organization\'s mission statement or company values and creating training programs. Training coordinators typically hold a bachelor’s degree and relevant certifications, and have experience in HR.','<h2 id=\"3-careers-in-human-resource-management-hrm\">Careers in human resource management (HRM)</h2>\n<p>You can find many different careers in HRM, with varying points of entry into this field. Most positions in HRM require at least a bachelor&rsquo;s degree in human resources or a related field. You can also earn certifications to help you find the best position within the vast field of HRM. HRM professionals have important jobs that can be both rewarding and fulfilling. According to the US Bureau of Labor Statistics (BLS), the human resources management field is expected to grow 7 percent from 2021-2031, or about 12,600 new jobs, on par with the national average [<a href=\"https://www.bls.gov/ooh/management/human-resources-managers.htm\" target=\"_blank\" rel=\"noopener noreferrer\">1</a>]. The BLS cites an average annual US salary of $126,230 as of 2021. Read on to explore specific roles, salaries, and job descriptions.&nbsp;&nbsp;&nbsp;</p>\n<p>&nbsp;</p>\n<p><em>*All US salary averages are sourced from Glassdoor, July 2023, and include base pay and additional compensation.</em></p>'),(6,'Create a navigation bar','0724122252','english','OD-20240208103032483-2347','Active','single','24.00','2024-02-08 13:30:32.492891','2024-02-08 13:30:32.492891',2,3,2,5,1,2,2,2,1,'Approach to create Responsive Navbar\nThis approach to designing a responsive nav bar includes the use of React-router-dom for defining the routes and styling the navbar using the styled-components UI library. We will define and link the page components to respective web addresses using routes','<p>Whether you\'re preparing for your first job interview or aiming to upskill in this ever-evolving tech landscape,&nbsp;<a href=\"https://www.geeksforgeeks.org/courses?utm_source=geeksforgeeks&amp;utm_medium=article_bottom_text&amp;utm_campaign=courses\" target=\"_blank\" rel=\"noopener\">GeeksforGeeks Courses</a>&nbsp;are your key to success. We provide top-quality content at affordable prices, all geared towards accelerating your growth in a time-bound manner. Join the millions we\'ve already empowered, and we\'re here to do the same for you. Don\'t miss out -&nbsp;<a href=\"https://www.geeksforgeeks.org/courses?utm_source=geeksforgeeks&amp;utm_medium=article_bottom_text&amp;utm_campaign=courses\" target=\"_blank\" rel=\"noopener\">check it out now</a>!</p>\n<p>Looking for a place to share your ideas, learn, and connect? Our&nbsp;<a href=\"https://www.geeksforgeeks.org/community/?ref=bottom_text\">Community</a>&nbsp;portal is just the spot! Come&nbsp;<a href=\"https://www.geeksforgeeks.org/community/?ref=bottom_text\">join us</a> and see what all the buzz is about!</p>'),(7,'Login','074386843563487','english','OD-20240208152445885-2346','Active','single','24.00','2024-02-08 18:24:45.964738','2024-02-08 18:24:45.964738',2,1,2,2,2,1,2,1,1,'jhZFGiajzxghaesfhesddf','<p data-sourcepos=\"1:1-1:171\">I\'d be glad to provide the code for PayPal service, controller, and module in NestJS, incorporating best practices, addressing feedback from experts, and ensuring clarity:</p>\n<p data-sourcepos=\"3:1-3:18\"><strong>Prerequisites:</strong></p>\n<ul data-sourcepos=\"5:1-7:95\">\n<li data-sourcepos=\"5:1-5:23\">NestJS project set up</li>\n<li data-sourcepos=\"6:1-6:103\">PayPal developer account (<a class=\"traceable-link\" href=\"https://developer.paypal.com/signup\" target=\"_blank\" rel=\"noopener noreferrer\">https://developer.paypal.com/signup</a>)</li>\n<li data-sourcepos=\"7:1-7:95\">Environment variables with your&nbsp;<code class=\"\">PAYPAL_CLIENT_ID</code>,&nbsp;<code class=\"\">PAYPAL_CLIENT_SECRET</code>,&nbsp;and&nbsp;<code class=\"\">PAYPAL_MODE</code>&nbsp;(optional)</li>\n</ul>\n<p data-sourcepos=\"9:1-9:20\"><strong>1. Dependencies:</strong></p>\n<p data-sourcepos=\"11:1-11:72\">Install the required package based on your desired PayPal functionality:</p>\n<ul data-sourcepos=\"13:1-13:4\">\n<li data-sourcepos=\"13:1-13:4\"><strong>Standard Payments:</strong>&nbsp;<code class=\"\">npm install paypal-rest-sdk @nestjs/common @nestjs/config</code></li>\n<li data-sourcepos=\"14:1-14:80\"><strong>Payouts:</strong>&nbsp;<code class=\"\">npm install nestjs-paypal-payouts @nestjs/common @nestjs/config</code></li>\n<li data-sourcepos=\"15:1-16:0\"><strong>Custom Checkout Integration:</strong>&nbsp;<code class=\"\">npm install paypal-express-checkout @nestjs/common @nestjs/config</code></li>\n</ul>');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phoneNumber` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `academicLevel` varchar(255) NOT NULL,
  `bio` varchar(255) NOT NULL,
  `profilePicture` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userUserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_c645941c0a12a9e9934026e018` (`userUserId`),
  CONSTRAINT `FK_c645941c0a12a9e9934026e0189` FOREIGN KEY (`userUserId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revision_files`
--

DROP TABLE IF EXISTS `revision_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revision_files` (
  `file_id` int NOT NULL AUTO_INCREMENT,
  `file_url` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `order` int NOT NULL,
  PRIMARY KEY (`file_id`),
  KEY `FK_55161262a6b0bfd3c503ec7ef1b` (`order`),
  CONSTRAINT `FK_55161262a6b0bfd3c503ec7ef1b` FOREIGN KEY (`order`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revision_files`
--

LOCK TABLES `revision_files` WRITE;
/*!40000 ALTER TABLE `revision_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `revision_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `role` enum('admin','client','writer') NOT NULL DEFAULT 'client',
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `profileId` int DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  UNIQUE KEY `REL_9466682df91534dd95e4dbaa61` (`profileId`),
  CONSTRAINT `FK_9466682df91534dd95e4dbaa616` FOREIGN KEY (`profileId`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'writer','maggy','lynne@gmail.com','$2b$10$vGjU63/5nNcrNzJtGxDxXuQN5pVEnfnt4L.nIQrkkrb0M1mfgw9S6','0717164624','2024-02-07 19:40:46.626572','2024-02-07 19:40:46.626572',NULL),(2,'client','Alfred Kariuki Gitau','alfygitau@gmail.com','$2b$10$vKh43IHRB00jNPsYrXjvduggmIgZDQkPUYkD90ELY36YJEJNKlX1u','0769404436','2024-02-07 22:35:18.129686','2024-02-07 22:35:18.129686',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-08 21:07:27
