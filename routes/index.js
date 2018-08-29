var express = require('express');
var router = express.Router();

//Requerimos el módulo 'fs' para la copia de archivos
var fs = require('fs');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index.jade', { page_title: 'Login de usuarios' });
};

exports.login = function(req, res){
  	var input = JSON.parse(JSON.stringify(req.body));
    //almacenamos en una variable auxiliar el contenido de los campos de post del formulario
    var user = req.body.user;
    var pass = req.body.pass;

    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM usuarios WHERE usuario = ? AND clave = ?',[user,pass],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            if (rows.length == 0){
              res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Usuario inexistente, verifique los datos e ingrese nuevamente' });
            }else {
              //creamos las variables de session con los datos del formulario
              req.session.user=req.body.user;
              req.session.pass=req.body.pass;
              res.redirect('/productos');
            } 
            
           
         });
         
    }); 
};

/* Sacado de pagina1.jade
        if (data.length == 0)
          p Verifique su usuario y password e intente nuevamente
          a(href="../") Login
        else
          p Bienvenido, #{data[0].nombre} #{data[0].apellido}


*/