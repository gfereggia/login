/*
 * GET productos list
 */

exports.list = function(req, res){
  if (req.session.user) {
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM stock ORDER BY nombre ASC',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('productos.jade',{page_title:"Listado de Productos",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }
  
};

exports.add = function(req, res){
  if (req.session.user) {
    res.render('add_productos.jade',{page_title:"Agregar Producto"});
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }    
};

exports.edit = function(req, res){
  if (req.session.user) {
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM stock WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );

            if (rows.length == 0){
              alert ("Producto inexistente");
            }else{
              res.render('edit_productos.jade',{page_title:"Editar Producto",data:rows});
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

  console.log(req.body.nombre);
  console.log(req.body.precio);
  console.log(req.body.cantidad);
  console.log(req.body.comentarios);

  req.getConnection(function (err, connection) {

  var data = {

    nombre : req.body.nombre,
    precio : req.body.precio,
    cantidad : req.body.cantidad,
    comentarios : req.body.comentarios
  
  };

  console.log(data);

  var query = connection.query("INSERT INTO stock set ? ",data, function(err, rows)
    {

    if (err)
      console.log("Error inserting : %s ",err );

      console.log(query.sql); //get raw query
      res.redirect('/productos');

    });

  });

};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    console.log(req.body.nombre);
    console.log(req.body.precio);
    console.log(req.body.cantidad);
    console.log(req.body.comentarios);

    console.log('---------');
    console.log(req.files);
    console.log('---------');
   


    req.getConnection(function (err, connection) {
        
        var data = {
            
         nombre : req.body.nombre,
         precio : req.body.precio,
         cantidad : req.body.cantidad,
         comentarios : req.body.comentarios
        
        };
        
        connection.query("UPDATE stock set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/productos');
          
        });
    
    });
};


exports.delete_cantidad = function(req,res){
    
    var cantidad = req.params.cantidad;     
    var id = req.params.id;   
    
    req.getConnection(function (err, connection) {
        
       var query = connection.query("UPDATE stock SET cantidad = cantidad - ? WHERE id = ? ",[cantidad,id], function(err, rows)
        {
            
            if(err)
               console.log("Error deleting : %s ",err );


            res.redirect('/productos');
             
        });

        console.log(query.sql);
        
     });
};

exports.delete_productos = function(req,res){
          
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM stock WHERE id = ? ",[id], function(err, rows)
        {
            
            if(err)
               console.log("Error deleting : %s ",err );

            
            res.redirect('/productos');
             
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
       
     
      var query = connection.query("SELECT * FROM stock where nombre LIKE ?;",['%' + busqueda + '%'],function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            
            console.log(query.sql);    
            res.render('productos.jade',{page_title:"Listado de productos",data:rows});
                
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
            orden = "SELECT * FROM stock ORDER BY nombre ASC";
            break;
       
       case 'nombreZ': 
            orden = "SELECT * FROM stock ORDER BY nombre DESC";
            break;
      
       case 'precioMayor': 
            orden = "SELECT * FROM stock ORDER BY precio DESC";
            break;
      
       case 'precioMenor': 
          orden = "SELECT * FROM stock ORDER BY precio ASC";
          break;
       
       case 'cantidadMayor': 
          orden = "SELECT * FROM stock ORDER BY cantidad DESC";
          break;
       
       case 'cantidadMenor': 
          orden = "SELECT * FROM stock ORDER BY cantidad ASC";
          break;
       
       default: "SELECT * FROM stock ORDER BY nombre ASC";
          break;
    } 

    req.getConnection(function(err,connection){
       
     
      var query = connection.query(orden,function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            
            console.log(query.sql);    
            res.render('productos.jade',{page_title:"Listado de productos",data:rows});
                
         });
         
        //  console.log(query.sql);
    });
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }
  
};


