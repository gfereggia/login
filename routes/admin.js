var express = require('express');
var router = express.Router();

/*
 * GET users listing.
 */

exports.mostrar = function(req, res){
  if (req.session.user) {
    res.render('productos.jade',{page_title:"Listado de Productos", user: req.session.user});
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
    }
};

exports.logout = function(req, res){
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }
    else
    {
      res.redirect('/');
    }
  });
};

