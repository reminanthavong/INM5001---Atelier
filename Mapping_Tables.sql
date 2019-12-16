
/*==============================================================*/
/* Table: BaseEmployes											*/
/*==============================================================*/
CREATE TABLE BaseEmployes (
	IDEmployeur 	VARCHAR(11) NULL,
	IDEmploye 		VARCHAR(5) NULL,	
	NomEmploye 		VARCHAR(20) NULL, 
	PrenomEmploye 	VARCHAR(20) NULL,
	NBRQuartsMax 	INTEGER NULL,
	DateEmbauche 	DATE 
);
/*==============================================================*/
/* Table: BaseIdentification                                    */
/*==============================================================*/
CREATE TABLE BaseIdentification
(
	IDUtilisateur	VARCHAR(11) NULL,		
	MotDePasse		VARCHAR(6) NULL,		
	TypeUtilisateur	VARCHAR(1) NULL
);
/*==============================================================*/
/* Table: BaseQuartsEmploye                                     */
/*==============================================================*/
CREATE TABLE BaseQuartsEmploye
(
	IDEmployeur		VARCHAR(11) NULL,		
	IDEmploye		VARCHAR(5) NULL,		
	IDTableHoraire	VARCHAR(25) NULL,
	TypeQuart		VARCHAR(1) NULL,
	JourSemaine		VARCHAR(1) NULL,
	Disponibilite	VARCHAR(1) NULL,
	ParamType		VARCHAR(1) NULL
);
/*==============================================================*/
/* Table: BaseQuartsEmployeur                                   */
/*==============================================================*/
CREATE TABLE BaseQuartsEmployeur
(
	IDEmployeur		VARCHAR(11) NULL,		
	IDTableHoraire	VARCHAR(25) NULL,	
	TypeQuart		VARCHAR(1) NULL,
	JourSemaine		VARCHAR(1) NULL,
	NBREmployes		INTEGER NULL
);
/*==============================================================*/
/* Table: TableHoraire											*/
/*==============================================================*/
CREATE TABLE TableHoraire
(
	IDTableHoraire	VARCHAR(25) NULL,	
	DateParam		DATE NULL,
	IDEmployeur		VARCHAR(11) NULL,
	IDEmploye		VARCHAR(5) NULL,	
	JourSemaine		VARCHAR(1) NULL,
	TypeQuart		VARCHAR(1) NULL
);
/*==============================================================*/
/* Table: TableCodes											*/
/*==============================================================*/
CREATE TABLE TableCodes
(
	Label			VARCHAR(30) NULL,	
	Code			VARCHAR(1) NULL,	
	Valeur			VARCHAR(30) NULL	
);
/*==============================================================*/

--------------------------------------------------------------------------------------------------------------
INSERT INTO BaseEmployes VALUES('Gestion8768','TREIK','TARA W','REIKER','5','1977-11-18');
INSERT INTO BaseEmployes VALUES('Gestion8768','SYACO','SIMARRON M','YACOOB','4','2000-01-17');
INSERT INTO BaseEmployes VALUES('Gestion8768','LBRON','LEALLER D','BRONNICHE','3','1994-11-07');
INSERT INTO BaseEmployes VALUES('Gestion8768','SGOLI','SHAHBANA R','GOLINI','2','1983-07-11');
INSERT INTO BaseEmployes VALUES('Gestion8768','LMASA','LLYASSA C','MASAND','1','1998-02-16');
INSERT INTO BaseEmployes VALUES('Gestion8768','DTOOM','DOURTJE','TOOMEY','2','2000-01-17');
INSERT INTO BaseEmployes VALUES('Gestion8768','JCOOL','JOVEL M','COOLONG','3','1996-08-19');
INSERT INTO BaseEmployes VALUES('Gestion8768','JHARV','JITWIPAR','HARVEGO','4','1986-12-08');
INSERT INTO BaseEmployes VALUES('Gestion3525','EBECK','ELAINE R','BECKER','5','1970-04-07');
INSERT INTO BaseEmployes VALUES('Gestion3525','JNASH','JENISSA C','NASHEL','4','1979-04-16');
INSERT INTO BaseEmployes VALUES('Gestion3525','MSLAT','MASCHEAL','SLATTON','3','2000-04-17');
INSERT INTO BaseEmployes VALUES('Gestion3525','DPURN','DESRI M','PURNELL','2','1984-10-16');

INSERT INTO BaseEmployes VALUES('Gestion3525','LMOUR','LATOUI','MOURAD','3','1970-01-01');

INSERT INTO BaseEmployes VALUES('Gestion7196','LMEAN','LATOSHA','MEANY','1','1999-08-09');
INSERT INTO BaseEmployes VALUES('Gestion7196','KLUND','KAUMUDEE K','LUND','2','1993-11-08');
INSERT INTO BaseEmployes VALUES('Gestion7196','TSEAW','TINNAYA','SEAWARD','3','1999-05-10');
INSERT INTO BaseEmployes VALUES('Gestion7196','LALTO','LYRESSA D','ALTONJI','4','1978-01-05');
INSERT INTO BaseEmployes VALUES('Gestion7196','MALTO','MYONGHLUI I','ALTONJI','5','1981-02-16');
INSERT INTO BaseEmployes VALUES('Gestion7196','CRETK','CATENO L','RETKWA','4','1994-06-20');
--------------------------------------------------------------------------------------------------------------
INSERT INTO BaseIdentification VALUES('Gestion8768','ABC123','1');
INSERT INTO BaseIdentification VALUES('Gestion3525','ABC456','1');
INSERT INTO BaseIdentification VALUES('Gestion7196','ABC789','1');
INSERT INTO BaseIdentification VALUES('TREIK','ABC934','0');
INSERT INTO BaseIdentification VALUES('SYACO','ABC669','0');
INSERT INTO BaseIdentification VALUES('LBRON','ABC084','0');
INSERT INTO BaseIdentification VALUES('SGOLI','ABC723','0');
INSERT INTO BaseIdentification VALUES('LMASA','ABC177','0');
INSERT INTO BaseIdentification VALUES('DTOOM','ABC565','0');
INSERT INTO BaseIdentification VALUES('JCOOL','ABC929','0');
INSERT INTO BaseIdentification VALUES('JHARV','ABC843','0');
INSERT INTO BaseIdentification VALUES('EBECK','ABC662','0');
INSERT INTO BaseIdentification VALUES('JNASH','ABC683','0');
INSERT INTO BaseIdentification VALUES('MSLAT','ABC455','0');
INSERT INTO BaseIdentification VALUES('DPURN','ABC017','0');
INSERT INTO BaseIdentification VALUES('LMEAN','ABC445','0');
INSERT INTO BaseIdentification VALUES('KLUND','ABC065','0');
INSERT INTO BaseIdentification VALUES('TSEAW','ABC738','0');
INSERT INTO BaseIdentification VALUES('LALTO','ABC529','0');
INSERT INTO BaseIdentification VALUES('MALTO','ABC115','0');
INSERT INTO BaseIdentification VALUES('CRETK','ABC375','0');
--------------------------------------------------------------------------------------------------------------
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','TREIK','001','J','1','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','TREIK','001','S','2','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','TREIK','001','S','3','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','TREIK','001','J','4','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','TREIK','001','S','5','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','TREIK','001','N','6','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','TREIK','001','N','7','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SYACO','001','S','1','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SYACO','001','S','2','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SYACO','001','S','3','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SYACO','001','J','4','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SYACO','001','J','5','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SYACO','001','S','6','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SYACO','001','N','7','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LBRON','001','J','1','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LBRON','001','N','2','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LBRON','001','S','3','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LBRON','001','N','4','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LBRON','001','J','5','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LBRON','001','S','6','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LBRON','001','S','7','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SGOLI','001','J','1','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SGOLI','001','J','2','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SGOLI','001','S','3','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SGOLI','001','N','4','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SGOLI','001','S','5','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SGOLI','001','S','6','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','SGOLI','001','S','7','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LMASA','001','N','1','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LMASA','001','J','2','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LMASA','001','N','3','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LMASA','001','J','4','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LMASA','001','S','5','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LMASA','001','S','6','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','LMASA','001','J','7','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','DTOOM','001','J','1','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','DTOOM','001','S','2','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','DTOOM','001','N','3','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','DTOOM','001','S','4','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','DTOOM','001','J','5','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','DTOOM','001','S','6','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','DTOOM','001','N','7','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JCOOL','001','J','1','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JCOOL','001','J','2','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JCOOL','001','N','3','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JCOOL','001','J','4','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JCOOL','001','J','5','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JCOOL','001','J','6','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JCOOL','001','S','7','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JHARV','001','N','1','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JHARV','001','S','2','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JHARV','001','J','3','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JHARV','001','J','4','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JHARV','001','J','5','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JHARV','001','J','6','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion8768','JHARV','001','J','7','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','EBECK','001','S','1','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','EBECK','001','N','2','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','EBECK','001','S','3','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','EBECK','001','S','4','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','EBECK','001','N','5','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','EBECK','001','N','6','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','EBECK','001','J','7','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','JNASH','001','N','1','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','JNASH','001','S','2','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','JNASH','001','J','3','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','JNASH','001','S','4','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','JNASH','001','N','5','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','JNASH','001','S','6','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','JNASH','001','J','7','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','MSLAT','001','S','1','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','MSLAT','001','S','2','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','MSLAT','001','J','3','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','MSLAT','001','J','4','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','MSLAT','001','N','5','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','MSLAT','001','J','6','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','MSLAT','001','J','7','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','DPURN','001','N','1','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','DPURN','001','N','2','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','DPURN','001','S','3','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','DPURN','001','N','4','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','DPURN','001','N','5','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','DPURN','001','N','6','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','DPURN','001','N','7','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','J','1','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','N','1','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','S','1','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','J','2','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','S','2','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','N','2','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','J','3','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','S','3','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','N','3','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','J','4','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','S','4','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','N','4','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','J','5','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','S','5','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion3525','LMOUR','000','N','5','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LMEAN','001','N','1','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LMEAN','001','S','2','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LMEAN','001','N','3','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LMEAN','001','N','4','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LMEAN','001','S','5','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LMEAN','001','N','6','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LMEAN','001','N','7','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','KLUND','001','N','1','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','KLUND','001','N','2','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','KLUND','001','J','3','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','KLUND','001','N','4','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','KLUND','001','N','5','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','KLUND','001','J','6','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','KLUND','001','J','7','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','TSEAW','001','S','1','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','TSEAW','001','J','2','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','TSEAW','001','J','3','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','TSEAW','001','J','4','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','TSEAW','001','J','5','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','TSEAW','001','J','6','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','TSEAW','001','J','7','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LALTO','001','N','1','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LALTO','001','N','2','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LALTO','001','N','3','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LALTO','001','J','4','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LALTO','001','S','5','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LALTO','001','J','6','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','LALTO','001','J','7','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','MALTO','001','S','1','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','MALTO','001','N','2','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','MALTO','001','S','3','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','MALTO','001','S','4','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','MALTO','001','S','5','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','MALTO','001','J','6','0','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','MALTO','001','S','7','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','CRETK','001','N','1','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','CRETK','001','N','2','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','CRETK','001','N','3','0','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','CRETK','001','J','4','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','CRETK','001','S','5','1','0');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','CRETK','001','J','6','1','1');
INSERT INTO BaseQuartsEmploye VALUES('Gestion7196','CRETK','001','N','7','0','0');
--------------------------------------------------------------------------------------------------------------
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','J','1','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','J','2','5');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','J','3','3');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','J','4','1');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','J','5','5');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','J','6','5');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','J','7','1');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','S','1','1');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','S','2','3');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','S','3','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','S','4','3');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','S','5','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','S','6','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','S','7','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','N','1','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','N','2','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','N','3','4');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','N','4','5');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','N','5','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','N','6','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion8768','001','N','7','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','J','1','4');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','J','2','1');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','J','3','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','J','4','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','J','5','5');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','J','6','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','J','7','5');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','S','1','5');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','S','2','5');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','S','3','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','S','4','4');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','S','5','1');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','S','6','4');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','S','7','4');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','N','1','3');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','N','2','4');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','N','3','1');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','N','4','3');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','N','5','1');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','N','6','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion3525','001','N','7','3');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','J','1','3');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','J','2','5');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','J','3','1');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','J','4','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','J','5','5');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','J','6','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','J','7','4');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','S','1','1');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','S','2','4');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','S','3','3');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','S','4','2');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','S','5','3');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','S','6','4');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','S','7','4');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','N','1','5');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','N','2','1');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','N','3','1');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','N','4','3');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','N','5','3');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','N','6','1');
INSERT INTO BaseQuartsEmployeur VALUES('Gestion7196','001','N','7','5');
--------------------------------------------------------------------------------------------------------------
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion8768','TREIK','1','J');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion8768','SYACO','1','S');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion8768','LBRON','1','N');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion8768','SGOLI','2','J');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion8768','LMASA','2','S');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion8768','DTOOM','2','N');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion8768','JCOOL','3','J');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion8768','JHARV','3','S');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion3525','EBECK','3','N');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion3525','JNASH','4','J');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion3525','MSLAT','4','S');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion3525','DPURN','4','N');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion7196','LMEAN','5','J');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion7196','KLUND','5','S');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion7196','TSEAW','5','N');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion7196','LALTO','1','N');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion7196','MALTO','2','J');
INSERT INTO TableHoraire VALUES('001','2019-10-07','Gestion7196','CRETK','2','S');
--------------------------------------------------------------------------------------------------------------
INSERT INTO TableConges VALUES('TREIK','2019-10-7','J','2');
INSERT INTO TableConges VALUES('SYACO','2019-10-9','N','4');
INSERT INTO TableConges VALUES('SYACO','2019-1-10','S','5');
INSERT INTO TableConges VALUES('SYACO','2020-10-7','J','4');
INSERT INTO TableConges VALUES('SYACO','2020-3-19','S','5');
INSERT INTO TableConges VALUES('LBRON','2019-10-1','S','3');
INSERT INTO TableConges VALUES('LMASA','2020-12-6','S','1');
INSERT INTO TableConges VALUES('LMASA','2020-9-23','J','4');
INSERT INTO TableConges VALUES('JCOOL','2020-7-5','S','1');
INSERT INTO TableConges VALUES('JHARV','2019-3-20','S','4');
INSERT INTO TableConges VALUES('JHARV','2020-4-20','N','2');
INSERT INTO TableConges VALUES('JHARV','2020-11-2','J','2');
INSERT INTO TableConges VALUES('JHARV','2020-5-10','N','1');
INSERT INTO TableConges VALUES('EBECK','2019-1-30','S','4');
INSERT INTO TableConges VALUES('MSLAT','2020-12-3','S','5');
INSERT INTO TableConges VALUES('MSLAT','2020-10-7','S','4');
INSERT INTO TableConges VALUES('KLUND','2020-3-19','J','5');
INSERT INTO TableConges VALUES('LALTO','2019-10-1','S','3');
--------------------------------------------------------------------------------------------------------------
INSERT INTO TableCodes VALUES('TypeUtilisateur','1','Employeur');
INSERT INTO TableCodes VALUES('TypeUtilisateur','0','Employe');
INSERT INTO TableCodes VALUES('TypeQuart','J','Jour');
INSERT INTO TableCodes VALUES('TypeQuart','S','Soir');
INSERT INTO TableCodes VALUES('TypeQuart','N','Nuit');
INSERT INTO TableCodes VALUES('JourSemaine','1','Lundi');
INSERT INTO TableCodes VALUES('JourSemaine','2','Mardi');
INSERT INTO TableCodes VALUES('JourSemaine','3','Mercredi');
INSERT INTO TableCodes VALUES('JourSemaine','4','Jeudi');
INSERT INTO TableCodes VALUES('JourSemaine','5','Vendredi');
INSERT INTO TableCodes VALUES('JourSemaine','6','Samedi');
INSERT INTO TableCodes VALUES('JourSemaine','7','Dimanche');
INSERT INTO TableCodes VALUES('Disponibilite','1','Disponible');
INSERT INTO TableCodes VALUES('Disponibilite','0','Non-Disponible');
INSERT INTO TableCodes VALUES('ParamType','1','Defaut');
INSERT INTO TableCodes VALUES('ParamType','0','horaire');
--------------------------------------------------------------------------------------------------------------
