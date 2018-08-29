/*
 * GET empresas list
 */

exports.list = function(req, res){
  if (req.session.user) {
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM empresa ORDER BY empresa ASC',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('empresas.jade',{page_title:"Listado de empresas",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }
  
};

exports.add = function(req, res){
  if (req.session.user) {
    res.render('add_empresas.jade',{page_title:"Agregar Empresa"});
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }    
};

exports.edit = function(req, res){
  if (req.session.user) {
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM empresa WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );

            if (rows.length == 0){
              alert ("Empresa inexistente");
            }else{
              res.render('edit_empresas.jade',{page_title:"Editar empresa",data:rows});
            }
                     
         });
         
         //console.log(query.sql);
    }); 
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }      
};

/* Save Empresa */
exports.save = function(req,res,next){

 console.log(req.body.empresa);
 console.log(req.body.ubicacion);
 console.log(req.body.telefono);
 console.log(req.body.dominio);
 console.log(req.body.comentarios);


  req.getConnection(function (err, connection) {

  var data = {

    empresa : req.body.empresa,
    ubicacion : req.body.ubicacion,
    telefono : req.body.telefono,
    dominio : req.body.dominio,
    comentarios : req.body.comentarios

  
  };

  console.log(data);

  var query = connection.query("INSERT INTO empresa set ? ",data, function(err, rows)
    {

    if (err)
      console.log("Error inserting : %s ",err );

      console.log(query.sql); //get raw query
      res.redirect('/empresas');

    });

  });

};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    console.log(req.body.empresa);
    console.log(req.body.ubicacion);
    console.log(req.body.telefono);
    console.log(req.body.dominio);
    console.log(req.body.comentarios);


    req.getConnection(function (err, connection) {
        
        var data = {
            
          empresa : req.body.empresa,
          ubicacion : req.body.ubicacion,
          telefono : req.body.telefono,
          dominio : req.body.dominio,
          comentarios : req.body.comentarios
        
        };
        
        connection.query("UPDATE empresa set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/empresas');
          
        });
    
    });
};


exports.delete_empresas = function(req,res){
          
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM empresa  WHERE id = ? ",[id], function(err, rows)
        {
            
            if(err)
               console.log("Error deleting : %s ",err );

            
            res.redirect('/empresas');
             
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
       
     
      var query = connection.query("SELECT * FROM empresa where empresa LIKE ?;",['%' + busqueda + '%'],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            
            console.log(query.sql);    
            res.render('empresas.jade',{page_title:"Listado de empresas",data:rows});
                
         });
         
        //  console.log(query.sql);
    });
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }
  
};

exports.ordenar = function(req, res){
  if (req.session.user) {

    var orden = req.params.orden;

    switch(orden){
       case 'nombreA': 
            orden = "SELECT * FROM empresa ORDER BY empresa ASC";
            break;
       
       case 'nombreZ': 
            orden = "SELECT * FROM empresa ORDER BY empresa DESC";
            break;
      
       case 'ubicacionA': 
            orden = "SELECT * FROM empresa ORDER BY ubicacion ASC";
            break;
      
       case 'ubicacionZ': 
          orden = "SELECT * FROM empresa ORDER BY ubicacion DESC";
          break;
       
       default: "SELECT * FROM empresa ORDER BY nombre ASC";
          break;
    } 

    req.getConnection(function(err,connection){
       
     
      var query = connection.query(orden,function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            
            console.log(query.sql);    
            res.render('empresas.jade',{page_title:"Listado de empresas",data:rows});
                
         });
         
        //  console.log(query.sql);
    });
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }
  
};

