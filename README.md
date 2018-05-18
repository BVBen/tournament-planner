# wm-tippers-backend
Server Backend für Tippspiel zur WM 2018

## Technologien
* Node.js
* Express
* MongoDB

## Einrichten der MongoDB lokal

### Installation und Einrichten der MongoDB
Die MongoDB Community Edition kann [hier](https://www.mongodb.com/download-center?jmp=tutorials&_ga=2.29013244.1731473274.1526449746-1552623019.1526449746#community) installiert werden. Eine Anleitung zur installation können Sie [hier](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/) finden.

Das Program [Robo 3T](https://robomongo.org/download) bietet eine graphische Oberfläche für MongoDBs. Hier können SQL Queries ausgeführt und die einzelnen Tabellen angezeigt werden. 

<b>Der Name der lokalen Datenbank sollte "wm-tippers" sein, da der Pfad zur lokalen Datenbank in der database.config.js noch fest kodiert ist.</b>

### Start der MongoDB
Um die MongoDB zu starten den Befehl
<i>"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"</i> in der Konsole ausführen oder die exe per Hand starten.

## Start des node.js Servers

der Node.js Server kann lokal mit <i>run npm start</i> gestartet werden.
Für Debugg zwecke wurde eine Config für Visual Studio Code erstellt, somit kann der Server im Debug Modus aus Visuals Studio Code heraus ebenfall gestaratet werden.
