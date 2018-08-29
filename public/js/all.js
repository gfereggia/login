function addUser(){
            
    window.location.href = '/productos/add';
}

function addEmpresa(){
            
    window.location.href = '/empresas/add';
}

function addEmpleado(){
            
    window.location.href = '/empleados/add';
}

function addUsuario(){
            
    window.location.href = '/usuarios/add';
}

function cancelAddEmpleado(){
    
    window.location.href = '/empleados';
}

function cancelAddEmpresa(){
    
    window.location.href = '/empresas';
}

function cancelAdd(){
    
    window.location.href = '/productos';
}

function cancelAddUsuario(){
    
    window.location.href = '/usuarios';
}

function filtrar(){
    var id = $("#filtro").val();
	window.location.href = '../../empleados/filterBy/' + id
	// alert($("#filtro").val())
}

function ordenarProducto(){
    var orden = $("#orden").val();
    window.location.href = '../../productos/ordenar/' + orden
     // alert($("#orden").val())
}

function ordenarEmpresa(){
    var orden = $("#orden").val();
    window.location.href = '../../empresas/ordenar/' + orden
     // alert($("#orden").val())
}

function ordenarEmpleado(){
    var orden = $("#orden").val();
    window.location.href = '../../empleados/ordenar/' + orden
     // alert($("#orden").val())
}

function buscarEmpresa(){
    var busqueda = $("#buscarEmpresa").val();
    if(busqueda == ''){
        alert('Ingrese un parametro de busqueda valido');
    }else{     
        window.location.href = '../../empresas/buscar/' + busqueda
    }
    // alert($("#buscarEmpresa").val();)
}

function buscarProducto(){
    var busqueda = $("#buscarProducto").val();
    console.log(busqueda)
    if(busqueda == ''){
        alert('Ingrese un parametro de busqueda valido');
    }else{     
        window.location.href = '../../productos/buscar/' + busqueda
    }
    // alert($("#buscarEmpresa").val();)
}

function buscarUsuario(){
    var busqueda = $("#buscarUsuario").val();
    console.log(busqueda)
    if(busqueda == ''){
        alert('Ingrese un parametro de busqueda valido');
    }else{     
        window.location.href = '../../usuarios/buscar/' + busqueda
    }
    // alert($("#buscarEmpresa").val();)
}

function buscarEmpleado(){
    var busqueda = $("#buscarEmpleado").val();
    console.log(busqueda)
    if(busqueda == ''){
        alert('Ingrese un parametro de busqueda valido');
    }else{     
        window.location.href = '../../empleados/buscar/' + busqueda
    }
    // alert($("#buscarEmpresa").val();)
}



// detect enter keypress
function producto(){
    $(document).keypress(function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            buscarProducto();
            // alert('You pressed enter! - keypress');
        }
    });
}

// detect enter keypress
function empresa(){
    $(document).keypress(function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            buscarEmpresa();
            // alert('You pressed enter! - keypress');
        }
    });
}

// detect enter keypress
function usuario(){
    $(document).keypress(function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            buscarUsuario();
            // alert('You pressed enter! - keypress');
        }
    });
}

// detect enter keypress
function empleado(){
    $(document).keypress(function(e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '13') {
            buscarEmpleado();
            // alert('You pressed enter! - keypress');
        }
    });
}

function deleteCantidad(id,cant){
    var cantidad = prompt("Ingrese cantidad a eliminar");
    if(cantidad < 0 || isNaN(cantidad) == true){
        alert("Ingrese un valor valido")
    }else{
        if(cantidad == 0){
            cancelAdd();
        }else{

            if(cantidad - cant > 0){
                alert("La cantidad restante no puede ser menor a la cantidad del producto ")
            }else{
                if(cantidad - cant == 0){
                    borrarProducto(id);
                }else{ 
                    window.location.href = '../../productos/borrar/' + id + '/' + cantidad;
                }
            }
        }
    }

}


function borrarProducto(id){
    if(confirm("Desea eliminar el producto?")){
        window.location.href = '../../productos/delete/' + id;
    }
}


function borrarEmpresa(id){
    if(confirm("Desea eliminar la empresa?")){
        window.location.href = '../../empresas/delete/' + id;
    }
}


function borrarEmpleado(id){
    if(confirm("Desea eliminar el empleado?")){
        window.location.href = '../../empleados/delete/' + id;
    }
}

function borrarUsuario(id){
    if(confirm("Desea eliminar el usuario?")){
        window.location.href = '../../usuarios/delete/' + id;
    }
}