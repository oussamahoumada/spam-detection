CREATE TABLE `person` (
  `idPers` integer PRIMARY KEY,
  `name` varchar(255),
  `dateNaissance` timestamp
);

CREATE TABLE `account` (
  `mailAdress` varchar(255) PRIMARY KEY,
  `passWord` varchar(255),
  `pers_id` integer
);

CREATE TABLE `mail` (
  `idMail` integer PRIMARY KEY,
  `sujet` varchar(255),
  `content` varchar(255),
  `type` varchar(255),
  `created_at` timestamp,
  `sender` varchar(255),
  `reciever` varhcar
);

ALTER TABLE `account` ADD FOREIGN KEY (`pers_id`) REFERENCES `person` (`idPers`);

ALTER TABLE `mail` ADD FOREIGN KEY (`sender`) REFERENCES `account` (`mailAdress`);

ALTER TABLE `mail` ADD FOREIGN KEY (`reciever`) REFERENCES `account` (`mailAdress`);
