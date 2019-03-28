//Modules et constentes
require('babel-register')
const express = require('express')
const serve   = require('express-static')
const app = express()
const http = require('http')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const Router = require("rooter");
const mysql = require('mysql')
const myconnection = require('express-myconnection')
const expressValidator = require('express-validator')
const morgan = require('morgan')('dev')

//Middlewares
app.use(morgan)

var config = require('./config')

var dbOptions = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db
}

app.use(myconnection(mysql, dbOptions, 'pool'))


app.set('view engine', 'ejs')

var index = require('./routes/index')
var utilisateur = require('./routes/utilisateur')
var admin = require('./routes/admin')

app.use(expressValidator())


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var methodOverride = require('method-override')


app.use(methodOverride(function(req, res){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

var flash = require('express-flash')
var cookieParser = require('cookie-parser')
var session = require('express-session')

app.use(cookieParser('keyboard cat'))
app.use(session({
    secret: config.database.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
app.use(flash())

//app.use('/', index)
app.use('/utilisateur', utilisateur)

app.use(cookieParser('keyboard cat'))


// configuration de ma base de donnée

	app.get('/', (req, res)=>{
		res.render('../views/home.ejs')
	})
	app.get('/resto1', (req, res)=>{
		res.render('../views/resto1.ejs')
	})
	app.get('/resto2', (req, res)=>{
		res.render('../views/resto2.ejs')
	})
	app.get('/resto3', (req, res)=>{
		res.render('../views/resto3.ejs')
	})
	app.get('/resto4', (req, res)=>{
		res.render('../views/resto4.ejs')
	})
	app.get('/resto5', (req, res)=>{
		res.render('../views/resto5.ejs')
	})
	app.get('/resto6', (req, res)=>{
		res.render('../views/resto6.ejs')
	})
	app.get('/commander', (req, res)=>{
		res.render('../views/commander.ejs')
	})
	app.get('/inscription', (req, res)=>{
		res.render('../views/inscription.ejs')
	})
	app.get('/connexion', (req, res)=>{
		res.render('../views/connexion.ejs')
	})
	/*app.get('/traitement', (req, res)=>{
		res.render('../views/traitement.ejs')
	})*/


app.listen(3000, function(){
    console.log(`server running at port 3000: http://127.0.0.1:3000`)
})

