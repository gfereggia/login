
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var session = require('express-session');

//load admin route
var admin = require('./routes/admin'); 
var cotizador = require('./routes/cotizador'); 
var productos = require('./routes/productos'); 
var empresas = require('./routes/empresas'); 
var empleados = require('./routes/empleados');
var usuarios = require('./routes/usuarios');


var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');


// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());

app.use(function(req, res, next) { 
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'); 
    next(); 
});

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{

        host: 'localhost',
        user: 'root',
        password : 'root',
        database:'dbproductos'

    },'pool') 

);



app.get('/', routes.index);
app.post('/', routes.login);

app.get('/admin', admin.mostrar);
app.get('/admin/logout', admin.logout);

app.get('/productos', productos.list);
app.get('/productos/add', productos.add);
//app.post('/productos/add', productos.save);
app.post('/productos/add', productos.save);
app.get('/productos/delete/:id', productos.delete_productos);
app.get('/productos/buscar/:busqueda', productos.buscar);
app.get('/productos/ordenar/:orden', productos.ordenar);
app.get('/productos/borrar/:id/:cantidad?', productos.delete_cantidad);
app.get('/productos/edit/:id', productos.edit);
app.post('/productos/edit/:id',productos.save_edit);

app.get('/cotizador', cotizador.list);
//app.post('/cotizador/pdf', cotizador.generatePdf);


app.get('/empresas', empresas.list);
app.get('/empresas/add', empresas.add);
app.post('/empresas/add', empresas.save);
app.get('/empresas/delete/:id', empresas.delete_empresas);
app.get('/empresas/buscar/:busqueda', empresas.buscar);
app.get('/empresas/ordenar/:orden', empresas.ordenar);
app.get('/empresas/edit/:id', empresas.edit);
app.post('/empresas/edit/:id',empresas.save_edit);

app.get('/empleados', empleados.list);
app.get('/empleados/add', empleados.add);
app.post('/empleados/add', empleados.save);
app.get('/empleados/delete/:id', empleados.delete_empleados);
app.get('/empleados/buscar/:busqueda', empleados.buscar);
app.get('/empleados/filterBy/:id', empleados.filterBy);
app.get('/empleados/ordenar/:orden', empleados.ordenar);
app.get('/empleados/edit/:id', empleados.edit);
app.post('/empleados/edit/:id',empleados.save_edit);

app.get('/usuarios', usuarios.list);
app.get('/usuarios/add', usuarios.add);
app.post('/usuarios/add', usuarios.save);
app.get('/usuarios/delete/:id', usuarios.delete_usuarios);
app.get('/usuarios/edit/:id', usuarios.edit);
app.get('/usuarios/buscar/:busqueda', usuarios.buscar);
app.post('/usuarios/edit/:id',usuarios.save_edit);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
