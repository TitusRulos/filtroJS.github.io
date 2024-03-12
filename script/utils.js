const listCiudadanos = [];
let listResultados = [];

// Función para cargar los ciudadanos desde la base de datos
const loadCiudadanos = async () => {
    try {
        listCiudadanos.length = 0;
        const response = await fetch('http://localhost:3000/ciudadanos');
        if (!response.ok) {
            throw new Error('Error al cargar ciudadanos', response.status);
        }
        const ciudadanos = await response.json();
        listCiudadanos.push(...ciudadanos);
    } catch (error) {
        console.error("Error al cargar ciudadanos", error.message);
    }
};

// Función para calcular el porcentaje de similitud entre dos códigos de ADN
const calcularPorcentajeSimilitud = (cadena1, cadena2) => {
    let coincidencias = 0;
    
    for (let i = 0; i < cadena1.length; i++) {
        if (cadena1[i] === cadena2[i]) {
            coincidencias++;
        }
    }
    
    return (coincidencias / cadena1.length) * 100;
};

// Función para obtener los 5 códigos de ADN más parecidos al código ingresado por el usuario
const obtenerCodigosParecidos = (codigoUsuario) => {
    listResultados.length = 0;

    listCiudadanos.forEach(ciudadano => {
        const coincidencia = calcularPorcentajeSimilitud(codigoUsuario, ciudadano.codigo_adn);
        listResultados.push({ nombre_completo: ciudadano.nombre_completo, porcentaje_coincidencia: coincidencia });
    });

    listResultados.sort((a, b) => b.porcentaje_coincidencia - a.porcentaje_coincidencia);
    return listResultados.slice(0, 5); // Devuelve solo los 5 primeros resultados
};

// Función para mostrar los resultados en la tabla
const mostrarResultados = (resultados) => {
    const tablaBody = document.getElementById("table");
    tablaBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos resultados

    resultados.forEach(resultado => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${resultado.nombre_completo}</td><td>${resultado.porcentaje_coincidencia}%</td>`;
        tablaBody.appendChild(fila);
    });
};

// Función que se ejecuta al enviar el formulario
const analisisResultado = () => {
    const codigoUsuario = document.getElementById('codigoADN').value;
    const codigosParecidos = obtenerCodigosParecidos(codigoUsuario);
    mostrarResultados(codigosParecidos);
};
