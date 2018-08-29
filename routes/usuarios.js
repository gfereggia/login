/*
 * GET usuarios list
 */

exports.list = function(req, res){
  if (req.session.user) {
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM usuarios ORDER BY usuario ASC',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('usuarios.jade',{page_title:"Listado de usuarios",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }
  
};

exports.add = function(req, res){
  if (req.session.user) {
    res.render('add_usuarios.jade',{page_title:"Agregar Usuarios"});
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }    
};

exports.edit = function(req, res){
  if (req.session.user) {
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM usuarios WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );

            if (rows.length == 0){
              alert ("Usuario inexistente");
            }else{
              res.render('edit_usuarios.jade',{page_title:"Editar Usuario",data:rows});
            }
                     
         });
         
         //console.log(query.sql);
    }); 
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }      
};

/* Save producto */
exports.save = function(req,res,next){

  console.log(req.body.usuario);
  console.log(req.body.clave);
  console.log(req.body.comentarios);

  req.getConnection(function (err, connection) {

  var data = {

    usuario : req.body.usuario,
    clave : req.body.clave,
    comentarios : req.body.comentarios
  
  };

  console.log(data);

  var query = connection.query("INSERT INTO usuarios set ? ",data, function(err, rows)
    {

    if (err)
      console.log("Error inserting : %s ",err );

      console.log(query.sql); //get raw query
      res.redirect('/usuarios');

    });

  });

};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
  
    console.log(req.body.usuario);
    console.log(req.body.clave);
    console.log(req.body.comentarios);

    req.getConnection(function (err, connection) {
        
        var data = {
            
         usuario : req.body.usuario,
         clave : req.body.clave,
         comentarios : req.body.comentarios
        
        };
        
        connection.query("UPDATE usuarios set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/usuarios');
          
        });
    
    });
};


exports.delete_usuarios = function(req,res){
          
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM usuarios  WHERE id = ? ",[id], function(err, rows)
        {
            
            if(err)
               console.log("Error deleting : %s ",err );

            
            res.redirect('/usuarios');
             
        });
        
     });
};

exports.buscar = function(req, res){
  if (req.session.user) {

    var busqueda = req.params.busqueda;
    console.log("req: "+req)
    console.log("--------------------------------")
    console.log("--------------------------------")
    console.log("req.params: "+req.params)
    console.log("--------------------------------")
    console.log("--------------------------------")
    console.log("req.params.busqueda: "+req.params.busqueda)
    console.log("--------------------------------")
    console.log("--------------------------------")
    console.log("req.params.id "+req.params.id)
    console.log("--------------------------------")
    console.log("--------------------------------")
    console.log("busqueda: "+busqueda)

    req.getConnection(function(err,connection){
       
     
      var query = connection.query("SELECT * FROM usuarios where usuario LIKE ?;",['%' + busqueda + '%'],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            
            console.log(query.sql);    
            res.render('usuarios.jade',{page_title:"Listado de usuarios",data:rows});
                
         });
         
        //  console.log(query.sql);
    });
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }
  
};

