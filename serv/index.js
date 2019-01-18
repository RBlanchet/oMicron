// Système
const express = require('express')
const path    = require("path")
const fs      = require('fs')
const port    = 8080
const app     = express()

// Import du fichier de config
const config = require('../config/config.json')

// Recup IP
const ip      = require('ip')

// Lancement du serveur sur le port définie plus haut
const server = app.listen(port, () => {
  let ipAddress = ip.address()

  if (ipAddress != config.IP_ADDRESS) {
    config.IP_ADDRESS = ipAddress
    fs.writeFileSync(__dirname + '/../config/config.json', JSON.stringify(config))
  }
  console.log(`
    - Le serveur statique Vue.js écoute sur le port ${port}
    - Le site est herbergé sur l'addresse ${config.IP_ADDRESS}
    `)
})

// Socket
const io = require('socket.io')(server)

// GPIO
const GPIO = require('onoff').Gpio
const piServor = require('pigpio').Gpio

// Configuration des PINS
const avancer     = new GPIO(config.PINS.AVANCER, 'out')
const reculer     = new GPIO(config.PINS.RECULER, 'out')
const moteur      = new GPIO(config.PINS.MOTEUR, 'out')
const servoMoteur = new piServor(config.PINS.SERVO, {mode: piServor.OUTPUT})

// Configuration des position du Servo moteur
const _positionInitiale = config.SERVO.POSITION_INITIALE
const _incrementServo   = config.SERVO.INCREMENT


function angleToPercent(angle) {
  return Math.floor((angle/180) * 100)
}

// Vue.js
app.use('/static', express.static(__dirname + '/../dist/static'))

// Route de base
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/index.html'))
  // Initialisation de la positon de départ
  servoMoteur.servoWrite(_positionInitiale)
})

// A la connection d'un utilisateur sur le serveur Sockets
io.on('connection', function(socket){
  console.log('Un utilisateur est connecté.')
  // Reinitialisation du Servo Moteur
  let positionInitiale = _positionInitiale

  // GPIO
  /**
     * Fonction avancer
     */
    socket.on('AVANCER', () => {
        moteur.writeSync(1)
        avancer.writeSync(1)
    })
    /**
     * Fonction stop avancer
     */
    socket.on('STOP_AVANCER', () => {
        moteur.writeSync(1)
        avancer.writeSync(0)
    })
    /**
     * Fonction reculer
     */
    socket.on('RECULER', () => {
        moteur.writeSync(1)
        reculer.writeSync(1)
    })
    /**
     * Fonction stop reculer
     */
    socket.on('STOP_RECULER', () => {
        moteur.writeSync(1)
        reculer.writeSync(0)
    })
    /**
     * Fonction droite
     */
    socket.on('DROITE', () => {
		if (positionInitiale <= _positionInitiale + config.SERVO.ANGLE_MAXIMAL) {
			positionInitiale += _incrementServo - 250
			servoMoteur.servoWrite(positionInitiale)
			console.log(positionInitiale)
		} else {
			console.log("Position depassé")
		} 
    })
    /**
     * Fonction stop droite
     */
    socket.on('STOP_DROITE', () => {
        //console.log('STOP_DROITE')
        //moteur.writeSync(0)
        //avancer.writeSync(0)
    })
    /**
     * Fonction gauche
     */
    socket.on('GAUCHE', () => {
		if (positionInitiale >= _positionInitiale - 200) {
			positionInitiale -= _incrementServo + 275
			servoMoteur.servoWrite(positionInitiale)
			console.log(positionInitiale)
		} else {
			console.log("Position depassé")
		} 
    })
    /**
     * Fonction stop gauche
     */
    socket.on('STOP_GAUCHE', () => {
        //console.log('STOP_GAUCHE')
        //moteur.writeSync(0)
        //avancer.writeSync(0)
    })
    /**
     * Fonction Arrêt
     */
    socket.on('ARRET', () => {
		console.log('Arrête')
		positionInitiale = _positionInitiale
		servoMoteur.servoWrite(_positionInitiale)
        moteur.writeSync(0)
    })
})
