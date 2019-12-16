# INM5001 - Atelier

## Le client et ses besoins

L�entreprise qui requiert nos services est dans l�industrie de l��quipement nautique. Elle fabrique dans son usine de Montr�al des embarcations de loisir sans moteur telles que des kayaks, des cano�s et des p�dalos. 

L�entreprise a connu un succ�s fulgurant dans les derni�res ann�es et a d� faire une grande vague d�embauche. Afin de suffire � la demande, l�usine est d�sormais ouverte 24 heures par jour. Les employ�s y travaillant sont donc r�partis sur trois quarts de travail soit de jour, de soir et de nuit. Chacun des quarts de travail est d�une dur�e de 8h. Certains employ�s travaillent � temps partiel et d�autres � temps plein. Ceci am�ne le g�rant de l�usine � passer beaucoup de temps � cr�er les horaires des employ�s ainsi qu�� g�rer les absences, les vacances, le temps suppl�mentaires, les cong�s de maladie et de maternit�. Tout ceci est, pour l'instant, fait � la main.

## Le logiciel

Le logiciel que nous d�velopperons servira principalement � cr�er des horaires hebdomadaires de fa�on automatique afin de sauver du temps sur cette t�che du g�rant. 

Dans un premier temps, le gestionnaire devra entrer dans la base de donn�es chacun de ses employ�s ainsi que le quart de travail qui lui est attribu�. Puis � toutes les semaines, selon l�anciennet� du travailler et le nombre de travailleurs n�cessaires sur le plancher � chaque jour et � chaque quart de travail, l�horaire sera g�n�r�.

Dans un deuxi�me temps, des restrictions plus d�taill�es quant au nombre maximal d�heures qu�un employ� peut travailler dans une semaine, une journ�e sp�cifique qu�il n�est pas disponible, des cong�s, des vacances, etc. seront pris en consid�ration pour la cr�ation de l�horaire.

Dans un troisi�me temps, un syst�me d�utilisateurs pourra �tre int�grer au logiciel afin que chaque employ� puisse se connecter � son compte, consulter son horaire, faire des demandes de changement d�horaire ainsi que recevoir des alertes pour des demandes de temps suppl�mentaires de la part de son gestionnaire.

## L'�quipe

L��quipe est form� de quatre membres.

| Membres  | R�les |
| ------------- | ------------- |
| R�mi Nanthavong  | Propri�taire, coordonateur, d�veloppeur |
| Mourad  Latoui | D�veloppeur |
| Kayla Louis  | D�veloppeur, r�daction de la documentation |
| Alexandre Lauzon | D�veloppeur  |

## Installation IDE

Vous devez installer les applications suivante: 

Eclipse : https://www.eclipse.org/downloads/

NodeJS: https://nodejs.org/en/download/

npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Oracle JDK: https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli#download-and-install

PostgreSQL: https://www.postgresql.org/download/

Une fois le tout installer, il faudra installer le plugin nodejs dans eclipse

 1) Ouvrir Eclipse
                            
 2) Allez dans Help
                            
 3) Vouz trouveriez Eclipse Marketplace
                            
 4) Recherchez et installez  Enide (Studio) 2015 - Node.js, JavaScript, Java and Web Tools
                            
                            
Vous etes maintenant pr�t � programmer!     

## HOW TO

Application WEB

Allez sur https://prodcalendrier.herokuapp.com/

Exemple d'un usager Gestionnaire:

Username: Gestion et Password: ABC123

Les gestionnaire ont droits d'acc�der � les pages: Gestion Employe (Fonctionnelle) - Gestion Horaire (Non Fonctionnelle) - Affichage Horaire ( Dependence Gestion Horaire).

Exemple d'un usager Employ�:

Username: TREIK et Password: ABC934

Les employ�s n'ont access � aucune pages pour l'instant.
