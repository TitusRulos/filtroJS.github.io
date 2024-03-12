const listCiudadanos = []
let listResultados = []

const loadCiudadanos = async () => {
    try{
        listCiudadanos.length=0;
        const answer= await fetch('http://localhost:3000/ciudadanos')
        if (!answer.ok){
            throw new Error('Error al cargar ciudadanos', answer.status)
        }
        const ciudadano= await answer.json();
        listCiudadanos.push(...ciudadano);
    }catch(error){
        console.error("Error al cargar ciudadanos", error.message);
    }
}

const originPage = () =>{
    const page = document.getElementById("page")
    document.body.style.backgroundImage = "url(https://www.paredro.com/wp-content/uploads/2016/06/DA-VINCI-01.jpg)";
    page.innerHTML=`
    <div class="jumbotron text-center">
            <h1 class="display-4">Bienvenido al Centro de Pruebas de ADN</h1>
            <p class="lead">Ofrecemos servicios de prueba de ADN con la más alta precisión y confidencialidad.</p>
            <hr class="my-4">
            <p>Contamos con un equipo de profesionales capacitados para atender tus necesidades.</p>
        </div>` 
}

const calcularPorcentajeSimilitud = (cadena1, cadena2) => {
    let coincidencias = 0;
    
    for (let i = 0; i < cadena1.length; i++) {
      if (cadena1[i] === cadena2[i]) {
        coincidencias++;
      }
    }
    return (coincidencias / cadena1.length) * 100;
  };

const analisisResultado = () => {
    listResultados = []
    let codigo = document.getElementById('codigoADN')
    let arrayCodigoSospechoso = Array.from(String(codigo), Number)
    listCiudadanos.forEach(ciudadano => {
        let arrayCodigoCiudadano = Array.from(String(ciudadano.codigo_adn), Number)
        let coincidencia = calcularPorcentajeSimilitud(arrayCodigoCiudadano, arrayCodigoSospechoso)
        let ciudadano_nombre = ciudadano.nombre_completo
        let resultado = {
            "nombre_completo": ciudadano_nombre,
            "porcentaje_coincidencia": coincidencia
        }
        listResultados.push(resultado)   
    })
    const tablaBody = document.getElementById("table");
    listResultados.sort((a, b) => b.porcentaje_coincidencia - a.porcentaje_coincidencia);
    listResultados.forEach(objeto => {
        const fila = document.createElement("tr");
        const columnaResultado = document.createElement("td");
        columnaResultado.textContent = objeto.nombre_completo;
        fila.appendChild(columnaResultado);
        const columnaPorcentaje = document.createElement("td");
        columnaPorcentaje.textContent = objeto.porcentaje_coincidencia + "%";
        fila.appendChild(columnaPorcentaje);
        tablaBody.appendChild(fila);
    })
    console.log(listResultados)
    listResultados=[]
    
}

        