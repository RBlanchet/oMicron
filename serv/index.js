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

if (config.ENVIRONNEMENT == "production") {
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
}


function angleToPercent(angle) {
  return Math.floor((angle/180) * 100)
}

// Vue.js
app.use('/static', express.static(__dirname + '/../dist/static'))

// Route de base
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../dist/index.html'))
  // Initialisation de la positon de départ
  if (config.ENVIRONNEMENT == "production") {
    servoMoteur.servoWrite(_positionInitiale)
  }
})

// A la connection d'un utilisateur sur le serveur Sockets
io.on('connection', function(socket){
  console.log('Un utilisateur est connecté.')
  // Reinitialisation du Servo Moteur
  if (config.ENVIRONNEMENT == "production") {
    let positionInitiale = _positionInitiale
  }

  // GPIO

  /**
   * Fonction avancer
   */
  socket.on('AVANCER', () => {
    if (config.ENVIRONNEMENT == "production") {
      moteur.writeSync(1)
      avancer.writeSync(1)
    } else {
      console.log('Avancer')
    }

  })

  /**
   * Fonction stop avancer
   */
  socket.on('STOP_AVANCER', () => {
    if (config.ENVIRONNEMENT == "production") {
      moteur.writeSync(1)
      avancer.writeSync(0)
    } else {
      console.log('Stop Avancer')
    }

  })

  /**
   * Fonction reculer
   */
  socket.on('RECULER', () => {
    if (config.ENVIRONNEMENT == "production") {
      moteur.writeSync(1)
      reculer.writeSync(1)
    } else {
      console.log('Reculer')
    }
  })

  /**
   * Fonction stop reculer
   */
  socket.on('STOP_RECULER', () => {
    if (config.ENVIRONNEMENT == "production") {
      moteur.writeSync(1)
      reculer.writeSync(0)
    } else {
      console.log('Stop Reculer')
    }
  })

  /**
   * Fonction droite
   */
  socket.on('DROITE', () => {
    if (config.ENVIRONNEMENT == "production") {
      if (positionInitiale <= _positionInitiale + config.SERVO.ANGLE_MAXIMAL) {
        positionInitiale += _incrementServo
        servoMoteur.servoWrite(positionInitiale)
        console.log(positionInitiale)
      } else {
        console.log("Position depassé")
      }
    } else {
      console.log('Droite')
    }
  })

  /**
   * Fonction stop droite
   */
  socket.on('STOP_DROITE', () => {
    if (config.ENVIRONNEMENT == "production") {
      moteur.writeSync(0)
      avancer.writeSync(0)
    } else {
      console.log('Stop Droite')
    }
  })

  /**
   * Fonction gauche
   */
  socket.on('GAUCHE', () => {
    if (config.ENVIRONNEMENT == "production") {
      if (positionInitiale >= _positionInitiale - 200) {
        positionInitiale -= _incrementServo
        servoMoteur.servoWrite(positionInitiale)
        console.log(positionInitiale)
      } else {
        console.log("Position depassé")
      }
    } else {
      console.log('Gauche')
    }
  })

  /**
   * Fonction stop gauche
   */
  socket.on('STOP_GAUCHE', () => {
    if (config.ENVIRONNEMENT == "production") {
      moteur.writeSync(0)
      avancer.writeSync(0)
    } else {
      console.log('Stop Gauche')
    }
  })

  /**
   * Fonction Arrêt
   */
  socket.on('ARRET', () => {
    if (config.ENVIRONNEMENT == "production") {
      positionInitiale = _positionInitiale
      servoMoteur.servoWrite(_positionInitiale)
      moteur.writeSync(0)
    } else {
      console.log('Arrêt')
    }
  })
})
