# INM5001 - Atelier

## Le client et ses besoins

L’entreprise qui requiert nos services est dans l’industrie de l’équipement nautique. Elle fabrique dans son usine de Montréal des embarcations de loisir sans moteur telles que des kayaks, des canoés et des pédalos. 

L’entreprise a connu un succès fulgurant dans les dernières années et a dû faire une grande vague d’embauche. Afin de suffire à la demande, l’usine est désormais ouverte 24 heures par jour. Les employés y travaillant sont donc répartis sur trois quarts de travail soit de jour, de soir et de nuit. Chacun des quarts de travail est d’une durée de 8h. Certains employés travaillent à temps partiel et d’autres à temps plein. Ceci amène le gérant de l’usine à passer beaucoup de temps à créer les horaires des employés ainsi qu’à gérer les absences, les vacances, le temps supplémentaires, les congés de maladie et de maternité. Tout ceci est, pour l'instant, fait à la main.

## Le logiciel

Le logiciel que nous développerons servira principalement à créer des horaires hebdomadaires de façon automatique afin de sauver du temps sur cette tâche du gérant. 

Dans un premier temps, le gestionnaire devra entrer dans la base de données chacun de ses employés ainsi que le quart de travail qui lui est attribué. Puis à toutes les semaines, selon l’ancienneté du travailler et le nombre de travailleurs nécessaires sur le plancher à chaque jour et à chaque quart de travail, l’horaire sera généré.

Dans un deuxième temps, des restrictions plus détaillées quant au nombre maximal d’heures qu’un employé peut travailler dans une semaine, une journée spécifique qu’il n’est pas disponible, des congés, des vacances, etc. seront pris en considération pour la création de l’horaire.

Dans un troisième temps, un système d’utilisateurs pourra être intégrer au logiciel afin que chaque employé puisse se connecter à son compte, consulter son horaire, faire des demandes de changement d’horaire ainsi que recevoir des alertes pour des demandes de temps supplémentaires de la part de son gestionnaire.

## L'équipe

L’équipe est formé de quatre membres.

| Membres  | Rôles |
| ------------- | ------------- |
| Rémi Nanthavong  | Propriétaire, coordonateur, développeur |
| Mourad  Latoui | Développeur |
| Kayla Louis  | Développeur, rédaction de la documentation |
| Alexandre Lauzon | Développeur  |

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
                            
                            
Vous etes maintenant prêt à programmer!     

## HOW TO

Application WEB

Allez sur https://prodcalendrier.herokuapp.com/

Exemple d'un usager Gestionnaire:

Username: Demo et Password: ABC123

Les gestionnaire ont droit d'accèder à les pages: Gestion Employe - Gestion Horaire - Affichage Horaire.

Exemple d'un usager Employé:

Username: LKAYL et Password: ABC123

Les employés ont accès aux pages Zone Employé et Affichage Horaire.
