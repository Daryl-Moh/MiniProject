CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `givenname` varchar(45) NOT NULL,
  `familyname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(70) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;