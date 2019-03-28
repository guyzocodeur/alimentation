var express = require('express')
var app = express()

//SHOW LIST OF USERS
/*app.get('/', function(req, res, next){
    req.getConnection(function(error, conn){
        conn.query('SELECT * FROM users ORDER BY id DESC', function(err,rows, fields){
            if(err){
                req.flash('error', err)
                res.render('user/list', {
                    title : 'User List',
                    data: ''
                })   
            }else{
                //renvoyer la view list.ejs
                res.render('user/list', {
                    title: 'User List',
                    data: rows
                })
            }
        })
    })
})*/

//SHOW ADD USER FORM
app.get('/inscription', function(req, res, next){
    res.render('/inscription', {
        title: 'Ajouter un nouvel utilisateur',
        firstname: '',
        lastname: '',
        email: '',
        phone:'',
        password:''
    })
})

//ADD NEW USER POST ACTION
app.post('/traitement', function(req, res,next){
    req.assert('firstname', 'Name is required').notEmpty()
    req.assert('lastname', 'lastname is required').notEmpty()
    req.assert('email', 'A valid email is required').isEmail()
     req.assert('phone', 'phone is required').notEmpty()
    req.assert('password', 'password is required').notEmpty()

    var errors = req.validationErrors()

    if(!errors){
        var user = {
            firstname: req.sanitize('firstname').escape().trim(),
            lastname: req.sanitize('lastname').escape().trim(),
            email: req.sanitize('email').escape().trim(),
            phone: req.sanitize('phone').escape().trim(),
            password: req.sanitize('password').escape().trim()
        }

        req.getConnection(function(error, conn){
            conn.query('INSERT INTO user SET ?', user, function(err, result){
                if(err){
                    req.flash('error', err)

                    res.render('/inscription', {
                        title: 'Ajouter un nouvel utilisateur',
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        phone: user.phone,
                        password: user.password
                    })
                }else {
                    req.flash('success', 'Data added successfully')

                    res.render('/inscription', {
                        title: 'Ajouter un nouvel utilisateur',
                        firstname: '',
                        lastname: '',
                        email: '',
                        phone: '',
                        password: ''
                    })
                }
            })
        })
    }else {
        var error_msg = ''
        errors.forEach(function(error){
            error_msg += error_msg + '<br>'
        })
        req.flash('error', error_msg)
        res.render('/inscription', {
            title: 'Ajouter un nouvel utilisateur',
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        })
    }
})

//SHOW EDIT USER FORM
/*app.get('/edit/(:id)', function(req, res, next){
    req.getConnection(function(error, conn){
        conn.query('SELECT * FROM users WHERE id = ' + req.params.id, function(err, rows, fields){
            if(err) throw err

            //si ya pas d'user
            if(rows.length <= 0){
                req.flash('error', 'User not found with id = ' + req.params.id)
                res.redirect('/users')
            }else {
                res.render('/user/edit', {
                    title: 'Modifier un utlilisateur',
                    id: rows[0].id,
                    name: rows[0].name,
                    age: rows[0].age,
                    email: rows[0].email
                })
            }
        })
    })
})

//EDIT USER POST ACTION
app.put('/edit/(:id)', function(req, res, next){
    req.assert('name', 'Name is required').notEmpty()
    req.assert('age', 'Age is required').notEmpty()
    req.assert('email', 'A valid email is required').isEmail()

    var errors = req.validationErrors()
    if(!errors){

        var user = {
            name: req.sanitize('name').escape().trim(),
            age: req.sanitize('age').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }

        req.getConnection(function(error, conn){
            conn.query('UPDATE users SET ? WHERE id= ' + req.params.id, user, function(err, result){
                if(err){
                    req.flash('error', err)

                    res.render(('user/edit', {
                        title: 'Modifier utilisateur',
                        id: req.params.id,
                        name: req.params.name,
                        age: req.params.age,
                        email: req.params.email
                    }))
                }else{
                    req.flash('success', 'Data updated successfully !')

                    res.render('user/edit', {
                        title: 'Modifier l\'utilisateur',
                        id: req.params.id,
                        name: req.body.name,
                        age: req.body.age,
                        email: req.body.email
                    })
                }
            })
        })
    }
    else{
        var error_msg = ''
        errors.forEach(function(error){
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        res.render('user/edit', {
            title: 'Modifier User',
            id: req.body.id,
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        })
    }
})*/

//DELETE USER

/*app.delete('/delete/(:id)', function(req, res, next){
    var user = { id: req.params.id}

    req.getConnection(function(error, conn){
        conn.query('DELETE FROM users WHERE id = ' + req.params.id, user, function(err, result){
            if(err){
                req.flash('error', err)
                res.redirect('/users')
            }else {
                req.flash('success', 'Utilisateur supprimé ! id = ' + req.params.id)

                res.redirect('/users')
            }
        })
    })
})*/

module.exports = app