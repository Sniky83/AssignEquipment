USE master;

ALTER DATABASE AssignEquipment SET SINGLE_USER WITH ROLLBACK IMMEDIATE --Dans le cas ou la BDD est bloquée

DROP DATABASE IF EXISTS AssignEquipment;

CREATE DATABASE AssignEquipment;
GO --Le GO nous permet d'executer en 2 temps le code pour éviter qu'il y ait une erreur lors du "USE AssignEquipment"

USE AssignEquipment;
GO

--Table de référence des fonctions (Développeur, administratif, Rh, Commercial)
--A terme on pourrait avoir un écran qui nous permet de rajouter des fonctions dans la liste pour l'attribuer à un Collaborateur
CREATE TABLE Fonctions
(
	id_fonction INT IDENTITY PRIMARY KEY NOT NULL,
	libelle VARCHAR(25) NOT NULL
);

--Dans le cas ou l'utilisateur pourrait avoir des droits différents en fonction de son group user pour le site (vision long terme)
CREATE TABLE Groups
(
	id_group INT IDENTITY PRIMARY KEY NOT NULL,
	libelle VARCHAR(25) NOT NULL, --ALL_ACCESS, ONLY_EQUIPMENTS, ONLY_VIEW OR READ_ONLY, READ_WRITE
);

--Un APSIDIEN
CREATE TABLE Collaborateurs
(
	id_collaborateur INT IDENTITY PRIMARY KEY NOT NULL,
	id_fonction INT NOT NULL,
	id_group INT NOT NULL,
	is_actif BIT NOT NULL,
	nom VARCHAR(25) NOT NULL,
	prenom VARCHAR(25) NOT NULL,
	uname VARCHAR(50) NOT NULL,
	pwd VARCHAR(64) NOT NULL, --Pour la fonction de hashage en SHA256
	date_creation datetime NOT NULL,
	FOREIGN KEY (id_fonction) REFERENCES Fonctions(id_fonction),
	FOREIGN KEY (id_group) REFERENCES Groups(id_group),
	UNIQUE(uname)
);

--Table de référence des types d'équipements (clavier, souris, écran)
CREATE TABLE TypeEquipements
(
	id_type_equipement INT IDENTITY PRIMARY KEY NOT NULL,
	is_actif BIT NOT NULL,
	libelle VARCHAR(25) NOT NULL,
	UNIQUE(libelle)
);

--Les équipements (Logitech G930, Razer Chroma)
CREATE TABLE Equipements
(
	id_equipement INT IDENTITY PRIMARY KEY NOT NULL,
	id_type_equipement INT NOT NULL,
	marque VARCHAR(25) NOT NULL,
	modele VARCHAR(25) NOT NULL,
	numero_serie VARCHAR(50) NOT NULL,
	commentaire VARCHAR(255) NULL, --Bord de l'écran abîmé, pixel mort etc
	date_creation datetime NOT NULL,
	FOREIGN KEY (id_type_equipement) REFERENCES TypeEquipements(id_type_equipement)
);

--Table de liaison pour lier X équipement a X Collaborateurs
CREATE TABLE AffectationEquipements
(
	id_affectation_equipement INT IDENTITY PRIMARY KEY NOT NULL,
	id_equipement INT NOT NULL,
	id_collaborateur INT NOT NULL,
	is_actif BIT NOT NULL,
	date_creation datetime NOT NULL,
	FOREIGN KEY (id_equipement) REFERENCES Equipements(id_equipement),
	FOREIGN KEY (id_collaborateur) REFERENCES Collaborateurs(id_collaborateur)
);

--Fonction pour convertir le Password en SHA-256 avec du salt
GO
CREATE FUNCTION str_sha256 (@pwd VARCHAR(64))
RETURNS VARCHAR(64)
BEGIN
	DECLARE @hash VARCHAR(64), @salt VARCHAR(32)
	SELECT @salt = 'CcRZI@RT@.HMQfYBMR?fX5px+1oh#Yc=';
	SELECT @pwd = @salt + @pwd;
	SELECT @hash = LOWER(CONVERT(VARCHAR(64),HASHBYTES('SHA2_256', @pwd),2));
	RETURN @hash
END
GO

--Les insertions basiques
INSERT INTO Groups VALUES('READ_WRITE')
INSERT INTO Groups VALUES('READ_ONLY')

INSERT INTO Fonctions VALUES('Développeur')
INSERT INTO Fonctions VALUES('Chef de Projet')
INSERT INTO Fonctions VALUES('Chef de plateau')

--On créer un test user
INSERT INTO Collaborateurs VALUES(1,1,1,'TestNom','TestPrenom','TestMail@apside.fr',dbo.str_sha256('TestAccount'),getdate())

--On créer les vrais utilisateurs
INSERT INTO Collaborateurs VALUES(1,1,1,'HERVE','Louis','louis.herve@apside-groupe.com',dbo.str_sha256('Louis123'),getdate())
INSERT INTO Collaborateurs VALUES(2,1,1,'ARNOUX','Jean-Michel','jmarnoux@apside-groupe.com',dbo.str_sha256('Jean-Michel123'),getdate())
INSERT INTO Collaborateurs VALUES(3,1,1,'POUSSARDIN','Florence','poussardin@apside.fr',dbo.str_sha256('Florence123'),getdate())

--On créer 3 types d'équipements
INSERT INTO TypeEquipements VALUES(1, 'SOURIS')
INSERT INTO TypeEquipements VALUES(1, 'CLAVIER')
INSERT INTO TypeEquipements VALUES(0, 'ECRAN')

--On créer 2 équipements
INSERT INTO Equipements VALUES(1,'RAZER','Chroma','x245-785',NULL,getdate());
INSERT INTO Equipements VALUES(1,'HP','697737-CG1','756-z562','Bord gauche du clavier usé',getdate());

--On affecte 2 équipements à l'utilisateur de TEST
INSERT INTO AffectationEquipements VALUES(1,1,1,getdate())
INSERT INTO AffectationEquipements VALUES(2,1,1,getdate())