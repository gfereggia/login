/*
 * GET empleados list
 */

exports.list = function(req, res){
  if (req.session.user) {
    req.getConnection(function(err,connection){
       
      // var query = connection.query('SELECT * FROM empleados e INNER JOIN empresa em on em.id = e.empresa ORDER BY e.nombre ASC',function(err,rows)
      var query = connection.query('SELECT e.*, em.id as "empresa.id", em.empresa as "empresa.empresa"  FROM empleados e INNER JOIN empresa em on em.id = e.empresa ORDER BY e.nombre ASC;',function(err,rows)
        {
            
            if(err){
                console.log("Error Selecting : %s ",err );
            }else{

            var query2 = connection.query('SELECT * FROM empresa ORDER BY empresa ASC',function(err,rows2)
              {
              
                  if(err)
                  console.log("Error Selecting : %s ",err );
                  else{
                    res.render('empleados.jade',{page_title:"Listado de empleados",data: {
                      rows:rows,
                      rows2:rows2
                    }});
                      
                 }
               });
            }

         });
         
        //  console.log(query.sql);
    });
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }
  
};

exports.add = function(req, res){
  if (req.session.user) {
    req.getConnection(function (err, connection) {
      connection.query('SELECT * FROM empresa ORDER BY empresa ASC', function (err, rows) {  
        if (err) {
          console.log("Error Selecting : %s ", err);
        } else {
          res.render('add_empleados.jade', {
            page_title: "Agregar Empleado",
            data: rows
          })
        }
      })
    });    

  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }    
};

exports.edit = function(req, res){
  if (req.session.user) {
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM empleados WHERE empleados.id = ?',[id],function(err,rows)
        {
            

            if(err)
                console.log("Error Selecting : %s ",err );

            if (rows.length == 0){
              alert ("Empleado inexistente");
            }else{

            var query2 = connection.query('SELECT * FROM empresa ORDER BY empresa DESC',function(err,rows2)
              {
              
                  if(err)
                  console.log("Error Selecting : %s ",err );
                  else{
                    res.render('edit_empleados.jade',{page_title:"Editar Empleado",data: {
                      rows:rows,
                      rows2:rows2
                    }});
                      
                 }
               });
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
  console.log(req.body.apellido);
  console.log(req.body.mail);
  console.log(req.body.clave_mail);
  console.log(req.body.clave_dominio);
  console.log(req.body.comentarios);
  console.log(req.body.empresa);

  req.getConnection(function (err, connection) {

  var data = {

    nombre : req.body.nombre,
    apellido : req.body.apellido,
    mail : req.body.mail,
    clave_mail: req.body.clave_mail,
    clave_dominio: req.body.clave_dominio,
    comentarios: req.body.comentarios,
    empresa: req.body.empresa
  
  };

  console.log(data);

  var query = connection.query("INSERT INTO empleados set ? ",data, function(err, rows)
    {

    if (err)
      console.log("Error inserting : %s ",err );

      console.log(query.sql); //get raw query
      res.redirect('/empleados');

    });

  });

};


exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    console.log(req.body.nombre);
    console.log(req.body.apellido);
    console.log(req.body.mail);
    console.log(req.body.clave_mail);
    console.log(req.body.clave_dominio);
    console.log(req.body.comentarios);
    console.log(req.body.empresa);
   


    req.getConnection(function (err, connection) {
        
        var data = {
            
          nombre : req.body.nombre,
          apellido : req.body.apellido,
          mail : req.body.mail,
          clave_mail: req.body.clave_mail,
          clave_dominio: req.body.clave_dominio,
          comentarios: req.body.comentarios,
          empresa: req.body.empresa
        
        };
        
        connection.query("UPDATE empleados set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/empleados');
          
        });
    
    });
};


exports.delete_empleados = function(req,res){
          
    var id = req.params.id;
    console.log(req.params)
    
    req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM empleados  WHERE id = ? ",[id], function(err, rows)
        {
            
            if(err)
               console.log("Error deleting : %s ",err );

            
            res.redirect('/empleados');
             
        });
        
     });
};

exports.filterBy = function(req, res){
  if (req.session.user) {

    var id = req.params.id;
    console.log("req: "+req)
    console.log("--------------------------------")
    console.log("--------------------------------")
    console.log("req.params: "+req.params)
    console.log("--------------------------------")
    console.log("--------------------------------")
    console.log("req.params.filtro: "+req.params.filtro)
    console.log("--------------------------------")
    console.log("--------------------------------")
    console.log("req.params.id "+req.params.id)
    console.log("--------------------------------")
    console.log("--------------------------------")
    console.log("id: "+id)

    req.getConnection(function(err,connection){
       
     //var query = connection.query('SELECT empleados.nombre, empleados.apellido, empleados.mail, empleados.clave_mail, empleados.clave_dominio, empleados.comentarios FROM empleados WHERE empleados.empresa = ? ORDER BY empleados.nombre ASC',[id],function(err,rows)
      var query = connection.query('SELECT e.*, em.id as "empresa.id", em.empresa as "empresa.empresa"  FROM empleados e INNER JOIN empresa em on em.id = e.empresa WHERE e.empresa = ? ORDER BY e.nombre ASC;',[id],function(err,rows)
        {
            if(err){
                console.log("Error Selecting : %s ",err );
            }else{

            var query2 = connection.query('SELECT * FROM empresa ORDER BY empresa ASC',function(err,rows2)
              {
              
                  if(err)
                  console.log("Error Selecting : %s ",err );
                  else{
                    res.render('empleados.jade',{page_title:"Listado de empleados",data: {
                      rows:rows,
                      rows2:rows2
                    }});
                      
                 }
               });
            }
                

         });
         
        //  console.log(query.sql);
    });
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }
  
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
       
       var query = connection.query('SELECT e.*, em.id as "empresa.id", em.empresa as "empresa.empresa" FROM empleados e INNER JOIN empresa em on em.id = e.empresa WHERE e.nombre LIKE ? ORDER BY e.nombre ASC;',['%' + busqueda + '%'],function(err,rows)
        {
            if(err){
                console.log("Error Selecting : %s ",err );
            }else{

            var query2 = connection.query('SELECT * FROM empresa ORDER BY empresa ASC',function(err,rows2)
              {
              
                  if(err)
                  console.log("Error Selecting : %s ",err );
                  else{
                    res.render('empleados.jade',{page_title:"Listado de empleados",data: {
                      rows:rows,
                      rows2:rows2
                    }});
                      
                 }
               });
            }
                

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
            orden = "SELECT e.*, em.id as 'empresa.id', em.empresa as 'empresa.empresa' FROM empleados e INNER JOIN empresa em on em.id = e.empresa ORDER BY e.nombre ASC;";
            break;
       
       case 'nombreZ': 
            orden = "SELECT e.*, em.id as 'empresa.id', em.empresa as 'empresa.empresa' FROM empleados e INNER JOIN empresa em on em.id = e.empresa ORDER BY e.nombre DESC;";
            break;
      
       case 'apellidoA': 
            orden = "SELECT e.*, em.id as 'empresa.id', em.empresa as 'empresa.empresa' FROM empleados e INNER JOIN empresa em on em.id = e.empresa ORDER BY e.apellido ASC;";
            break;
      
       case 'apellidoZ': 
          orden = "SELECT e.*, em.id as 'empresa.id', em.empresa as 'empresa.empresa' FROM empleados e INNER JOIN empresa em on em.id = e.empresa ORDER BY e.apellido DESC;";
          break;

       case 'mailA': 
          orden = "SELECT e.*, em.id as 'empresa.id', em.empresa as 'empresa.empresa' FROM empleados e INNER JOIN empresa em on em.id = e.empresa ORDER BY e.mail ASC;";
          break;

        case 'mailZ': 
          orden = "SELECT e.*, em.id as 'empresa.id', em.empresa as 'empresa.empresa' FROM empleados e INNER JOIN empresa em on em.id = e.empresa ORDER BY e.mail DESC;";
          break;
       
       default: "SELECT e.*, em.id as 'empresa.id', em.empresa as 'empresa.empresa' FROM empleados e INNER JOIN empresa em on em.id = e.empresa ORDER BY e.nombre ASC;";
          break;
    } 

    req.getConnection(function(err,connection){
       
     
      var query = connection.query(orden,function(err,rows)
        {
            if(err){
                console.log("Error Selecting : %s ",err );
            }else{

            var query2 = connection.query('SELECT * FROM empresa ORDER BY empresa ASC',function(err,rows2)
              {
              
                  if(err)
                  console.log("Error Selecting : %s ",err );
                  else{
                    res.render('empleados.jade',{page_title:"Listado de empleados",data: {
                      rows:rows,
                      rows2:rows2
                    }});
                      
                 }
               });
            }
                
         });
         
        //  console.log(query.sql);
    });
  } else {
    res.render('index.jade', { page_title: 'Login de usuarios',msj: 'Para acceder a este contenido tiene que estar logueado' });
  }
  
};


