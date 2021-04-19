export let DB;
import UI from '../js/class/UI.js';

const ui = new UI();

window.onload = () => {
    // console.log('Documento Listo');
    indexDB();
}

function indexDB() {
    const crearDB = window.indexedDB.open('citas', 1);

    crearDB.onerror = function() {
        console.log('Hubo Un Error En La Creación De Una Base De Datos');
    }

    crearDB.onsuccess = function() {
        console.log('BD Creada De Forma Exitosa');
        DB = crearDB.result;
        // console.log(DB);

        /* Mostrar Citas Al Cargar Pero IndexDB Ya Esta Listo */
        ui.imprimirCita();
    }

    /* Definir El Schema */
    crearDB.onupgradeneeded = function(e) {
        const db = e.target.result;

        /* Configuración Standar */
        const objectStore = db.createObjectStore('citas', {
            keyPath: 'id',
            autoIncrement: true
        });

        /* Definir Columnas */
        /* El Primer Nombre Es El De La Columna, El Segundo Es El KeyPath, Es Decir, Como
        Vamos Acceder A Los Campos Existentes En La Base De Datos O Como Se Van A Realizar
        Busquedas */
        objectStore.createIndex('id', 'id', { unique: true });
        objectStore.createIndex('mascota', 'mascota', { unique: false });
        objectStore.createIndex('propietario', 'propietario', { unique: false });
        objectStore.createIndex('telefono', 'telefono', { unique: false });
        objectStore.createIndex('fecha', 'fecha', { unique: false });
        objectStore.createIndex('hora', 'hora', { unique: false });
        objectStore.createIndex('sintomas', 'sintomas', { unique: false });

        console.log('DB Creada Exitosamente Y Lista Para LLenar');
    }
}