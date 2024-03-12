const analisisPage = () => {
    const analisisPage = document.getElementById('page');
    document.body.style.backgroundImage = "none";
    analisisPage.innerHTML = "";
    analisisPage.innerHTML = `
    <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="col-md-6">
        <form onsubmit="return analisisResultado()">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">Código ADN</span>
                </div>
                <input type="text" class="form-control" id="codigoADN" aria-describedby="basic-addon3" value="" required>
            </div>
            <button type="submit" class="btn btn-primary mb-3">Enviar</button>
        </form>
        <div style="overflow-y: auto; max-height: 200px;">
            <table id="table" class="table">
                <thead>
                    <tr>
                        <th scope="col">Resultado</th>
                        <th scope="col">%</th>
                    </tr>
                </thead>
                <tbody id="tablaBody">
                    <!-- Aquí se llenarán las filas con JavaScript -->
                </tbody>
            </table>
        </div>
    </div>
</div>
    `;
}