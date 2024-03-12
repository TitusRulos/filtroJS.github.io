
        
const ciudadanosPage = () => {
    const ciudadanoSelectPage = document.getElementById('page');
    document.body.style.backgroundImage = "none";
    ciudadanoSelectPage.innerHTML = "";
    ciudadanoSelectPage.innerHTML = `
    <div class="container custom-container">
        <div id="crearCiudadano">
            <h2 class="text-center">CREAR CIUDADANO</h2>
            <form onsubmit="return crearCiudadano()">
                <label for="nombreCiudadano">Nombre:</label>
                <input type="text" id="nombreCiudadano" name="nombre" class="form-control mb-2" required>
                <label for="codigoAdn">Còdigo de ADN:</label>
                <input type="number" id="codigoAdn" name="numADN" class="form-control mb-2" required>
                <label for="celular">Numero de celular:</label>
                <input type="number" id="celular" name="celular" class="form-control mb-2" required>
                <label for="direccion">Direccion: </label>
                <input type="text" id="direccion" name="direccion" class="form-control mb-2" required>
    
                <input type="submit" value="Crear Ciudadano" class="btn btn-primary btn-block mt-3">
            </form>
        </div>
    </div>
    `;
}

const guardarCiudadano = async (nuevoCiudadano) => {
    try {
        const respuesta = await fetch('http://localhost:3000/ciudadanos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoCiudadano),
        });

        if (!respuesta.ok) {
            throw new error('Error al crear el ciudadano. Estado: ', respuesta.status);
        }

        const ciudadanoCreado = await respuesta.json();
        console.log('Ciudadano Creado:', ciudadanoCreado);
    } catch (error) {
        console.error("Error al cargar Ciudadano", error.message);
    }
}

const crearCiudadano = async () => {
    const nombreInput = document.getElementById('nombreCiudadano').value;
    const codigoAdnInput = document.getElementById('codigoAdn').value;
    const celularInput = document.getElementById('celular').value;
    const direccionInput = document.getElementById('direccion').value;

    const codigoArray= Array.from(String(codigoAdnInput), Number)
    for (let i = 0; i < codigoArray.length; i++) {
        if (codigoArray[i] !== 0 && codigoArray[i] !== 1) {
            alert("¡Alerta! El elemento en la posición " + i + " no es ni 0 ni 1.");
            document.getElementById("codigoAdn").value = ""
            return;
        }
    }


    

    const nuevoCiudadano = {
        "nombre_completo": nombreInput,
        "direccion": direccionInput,
        "celular": celularInput,
        "codigo_adn": codigoAdnInput
    };

    await guardarCiudadano(nuevoCiudadano);

    nombreInput.value = '';
    codigoAdnInput.value = '';
    celularInput.value = '';
    direccionInput.value = '';

    alert('Ciudadano creado con éxito!');
}