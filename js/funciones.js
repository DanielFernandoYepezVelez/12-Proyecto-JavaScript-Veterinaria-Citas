import UI from './class/UI.js';
import Citas from './class/Citas.js';
import { mascotaInput, fechaInput, horaInput, propietarioInput, sintomasInput, telefonoInput, formulario } from './selectores.js';

let editando;

/* Objeto Con La Información De La Cita */
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

/* Instanciar Las Clases De Forma Global */
const administrarCitas = new Citas();
const ui = new UI();

/* Funciones Programa */
export function datosCitas(e) {
    /* Voy Acceder A Las Propiedades Del Elemento HTML,
    En este caso, Voy A Acceder Al Atributo name.
    name me entrega el nombre del campo y se lo asigno,
    a la propiedad del Objeto Literal y eso es igual
    al valor que se esta ingresando a dicho campo. */
    citaObj[e.target.name] = e.target.value;
}

/* Validar Y Agregar Una Nueva Cita */
export function nuevaCita(e) {
    e.preventDefault();

    const {
        mascota,
        propietario,
        telefono,
        fecha,
        hora,
        sintomas
    } = citaObj;

    if (mascota === '' ||
        propietario === '' ||
        telefono === '' ||
        fecha === '' ||
        hora === '' ||
        sintomas === '') {
        ui.imprimirAlerta('Todos Los Campos Son Obligatorios', 'error');
        return;
    }

    if (editando) {
        ui.imprimirAlerta('Editando Correctamente');

        /* Envio Un Parametro Que Solo Va Acceder A la Copia
        Del Objeto Global, Para Que El Objeto No Se Duplique,
        Y El Spread Operator Me Facilita ESO; 
        Romper La Referencia Original Del Objeto Y Solo Va
        A Tomar Una Copia */
        administrarCitas.editarCita({...citaObj });

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        editando = false;

    } else {
        citaObj.id = Date.now();
        /* Envio Un Parametro Que Solo Va Acceder A la Copia
        Del Objeto Global, Para Que El Objeto No Se Duplique,
        Y El Spread Operator Me Facilita ESO; 
        Romper La Referencia Original Del Objeto Y Solo Va
        A Tomar Una Copia */
        administrarCitas.agregarCita({...citaObj });

        ui.imprimirAlerta('Se Agrego Correctamente');
    }

    reiniciarObjeto();
    formulario.reset();

    ui.imprimirCita(administrarCitas);
}

/* Reiniciar El Objeto */
export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    /* Eliminar Cita */
    administrarCitas.eliminarCita(id);

    /* Muestra Mensaje */
    ui.imprimirAlerta('La Cita Se Elimino Correctamente');

    /* Mostrar Cita */
    ui.imprimirCita(administrarCitas);
}

export function cargarEdicion(cita) {
    const {
        mascota,
        propietario,
        telefono,
        fecha,
        hora,
        sintomas,
        id
    } = cita;

    /* Llenar Los Inputs */
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    /* Llenar El Objeto Nuevamente Depues De La Edición (Real) */
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    editando = true;
}