import { datosCitas, nuevaCita } from '../funciones.js';
import { mascotaInput, fechaInput, horaInput, propietarioInput, sintomasInput, telefonoInput, formulario } from '../selectores.js';

class App {
    constructor() {
        this.initApp();
    }

    /* Eventos DOM */
    initApp() {
        horaInput.addEventListener('input', datosCitas);
        fechaInput.addEventListener('input', datosCitas);
        mascotaInput.addEventListener('input', datosCitas);
        telefonoInput.addEventListener('input', datosCitas);
        sintomasInput.addEventListener('input', datosCitas);
        propietarioInput.addEventListener('input', datosCitas);

        formulario.addEventListener('submit', nuevaCita);
    }
}

export default App;