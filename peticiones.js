const cargarTipos = async()=>{
    try{
        const url = "http://201.140.116.237/services/tipo.php"
        await axios 
        .get(url)
        .then((res)=>{
            llenarcombos(res.data)
        })
        .catch((err)=>{
            console.log("Hubo un error en la peticion" +err);
            return false;
        })
    }catch{console.log("Surgio un error"); return false;}
    return true;
}
function llenarcombos(data){
    for(let item of data){
        document.getElementById('tipo').innerHTML += `
        <option value ="${item.tipo}">${item.descripcion}</option>
        `
    }
    document.getElementById('tipo').innerHTML+=`
    </select>
    `
};
const cargarVentas=async()=>{
    try{
     url = "http://201.140.116.237/services/ventas.php"
    await axios 
    .get(url)
    .then((res)=>{
        dibujarTabla(res.data);
    })
    .catch((err)=>{
        console.log("Hubo un error en la peticion" +err);
        
    })
}catch{console.log("Surgio un error")}
}
function dibujarTabla(data){
let tipo = document.getElementById("tipo").value;
document.getElementById("ventas").innerHTML=``
for(let item of data){
    if(item.tipo == tipo){
        document.getElementById("ventas").innerHTML+=`
        <tr>
        <th>${item.folio}</th>
        <th>${item.tipo}</th>
        <th>${item.precio}</th>
        <th>${item.descuento}</th>
        <th>${item.total}</th>
        <th>${item.fechapago}</th>
        <th>${item.giro}</th>
    </tr>
        `
    }
}
}



const inicia=async()=>{
    if(await cargarTipos() == true){
        cargarVentas();
    }
    document.getElementById("tipo").addEventListener("change",async()=>{
    cargarVentas();
});
    
}

inicia();