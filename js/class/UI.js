import { DB } from '../../data/db.js'
import { contenedorCitas, heading } from '../selectores.js'
import { eliminarCita, cargarEdicion } from '../funciones.js';

class UI {
    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'd-block', 'alert', 'col-12');

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    /* Método Para Citas Que No Estan En La Base De Datos */
    /* imprimirCita({ citas }) {
        this.LimpiarHtml();

        citas.forEach(cita => {
            const {
                mascota,
                propietario,
                telefono,
                fecha,
                hora,
                sintomas,
                id
            } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id; /* data-id = id */

    /* Scripting De Los Elementos De Cita 
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario: </span> ${propietario}
          `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono: </span> ${telefono}
          `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha: </span> ${fecha}
          `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora: </span> ${hora}
          `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
          `;

            /* Btn Eliminar 
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn btn-danger mr-2';
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>`;

            /* Btn Editar 
            const btnEditar = document.createElement('button');
            btnEditar.className = 'btn btn-info';
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /> </svg>`;

            /* Esto es muy importante, por que es una función que se va a ejecutar,
            solo cuando se de click y se pasa un ID como parámetro a la función 
            que se va a ejecutar
            btnEliminar.onclick = () => eliminarCita(id);
            btnEditar.onclick = () => cargarEdicion(cita);

    /* Agregar Los Parrafos Al Div Cita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            contenedorCitas.appendChild(divCita);
        });
    } */

    /* Método Para Citas Que SI! Estan En La Base De Datos */
    imprimirCita() {
        this.LimpiarHtml();

        /* Aqui Debemos Leer Lo Que Tenemos En La Base De Datos */
        const objectStore = DB.transaction('citas').objectStore('citas');

        objectStore.openCursor().onsuccess = function(e) {
            const cursor = e.target.result;

            if (cursor) {
                const {
                    mascota,
                    propietario,
                    telefono,
                    fecha,
                    hora,
                    sintomas,
                    id
                } = cursor.value;

                const divCita = document.createElement('div');
                divCita.classList.add('cita', 'p-3');
                divCita.dataset.id = id; /* data-id = id */

                /* Scripting De Los Elementos De Cita */
                const mascotaParrafo = document.createElement('h2');
                mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
                mascotaParrafo.textContent = mascota;

                const propietarioParrafo = document.createElement('p');
                propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder">Propietario: </span> ${propietario}
          `;

                const telefonoParrafo = document.createElement('p');
                telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono: </span> ${telefono}
          `;

                const fechaParrafo = document.createElement('p');
                fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha: </span> ${fecha}
          `;

                const horaParrafo = document.createElement('p');
                horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora: </span> ${hora}
          `;

                const sintomasParrafo = document.createElement('p');
                sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
          `;

                /* Btn Eliminar */
                const btnEliminar = document.createElement('button');
                btnEliminar.className = 'btn btn-danger mr-2';
                btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>`;

                /* Btn Editar */
                const btnEditar = document.createElement('button');
                btnEditar.className = 'btn btn-info';
                btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /> </svg>`;

                /* Esto es muy importante, por que es una función que se va a ejecutar,
            solo cuando se de click y se pasa un ID como parámetro a la función 
            que se va a ejecutar */
                btnEliminar.onclick = () => eliminarCita(id);
                const cita = cursor.value;
                btnEditar.onclick = () => cargarEdicion(cita);

                /* Agregar Los Parrafos Al Div Cita */
                divCita.appendChild(mascotaParrafo);
                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(telefonoParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(horaParrafo);
                divCita.appendChild(sintomasParrafo);

                divCita.appendChild(btnEliminar);
                divCita.appendChild(btnEditar);

                contenedorCitas.appendChild(divCita);

                /* Ve Al Siguiente Elemento Si Existe En IndexDB */
                cursor.continue();
            }
        }
    }

    LimpiarHtml() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

export default UI;