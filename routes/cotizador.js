/*
 * GET cotizador list
 */

exports.list = function(req, res){
  if (req.session.user) {
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM stock ORDER BY nombre ASC',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('cotizador.jade',{page_title:"Listado de cotizador",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }
  
};

/* Save Cotizador */
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
      res.redirect('/cotizador');

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


            res.redirect('/cotizador');
             
        });

        console.log(query.sql);
        
     });
};
