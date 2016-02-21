--
-- Create new database for software
--

CREATE DATABASE infoscreen;


--
-- Table structure for table `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `messageId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `message` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `messageType` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`messageId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`messageId`, `title`, `message`, `startDate`, `endDate`, `userId`, `messageType`) VALUES
(1, 'U4 Meet-up', '"It doesn''t always have to be scrum" - Join us Wednesday 2nd March 1pm @ Three Cliffs', NULL, NULL, 1, 'info'),
(2, 'Fun run', 'We''ve successfully raised our target of £1,000 for Ty Hafan!', NULL, NULL, 1, 'success');

-- --------------------------------------------------------

--
-- Table structure for table `slides`
--

CREATE TABLE IF NOT EXISTS `slides` (
  `slideId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `body` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `slideImageId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`slideId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `slides`
--

INSERT INTO `slides` (`slideId`, `title`, `body`, `slideImageId`, `userId`) VALUES
(1, 'U4 Student Management', 'In the continually shifting and competitive higher education landscape, delivering the right strategy for growth is critical for survival. Many institutions find that their legacy student information systems make it harder to adapt to new models, hampering Admissions and Advancement efforts. ', 5, 1),
(2, 'Info screen demo', 'This is a demonstration of Unit4 info screens. This software allows registered and logged in users to manage and create both slides and messages. New slides and messages are automatically added to the info screen within 60 seconds of them being created. This is a proof of concept and may be unstable!', 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `password` char(64) COLLATE utf8_unicode_ci NOT NULL,
  `salt` char(16) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `password`, `salt`, `email`) VALUES
(1, 'ced7d11773ed5d194404b1a677f3c602d950b340f0f7c29d6de53c14c0d7078d', '355ee8485119f478', 'admin@unit4.com');
