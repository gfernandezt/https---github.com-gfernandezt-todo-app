async function obtenerTareas() {
    const respuesta = await fetch('/tareas');
    const tareas = await respuesta.json();
    const lista = document.getElementById('listaTareas');
    lista.innerHTML = '';

    tareas.forEach(tarea => {
        const li = document.createElement('li');

        // Campo editable para el título de la tarea
        const input = document.createElement('input');
        input.type = 'text';
        input.value = tarea.titulo;
        input.addEventListener('change', () => actualizarTarea(tarea.id, input.value));

        // Botón para eliminar tarea
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '❌';
        btnEliminar.onclick = () => eliminarTarea(tarea.id);

        li.appendChild(input);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}

async function agregarTarea() {
    const titulo = document.getElementById('nuevaTarea').value;
    if (!titulo) return alert("Escribe una tarea");

    await fetch('/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, completado: false })
    });

    document.getElementById('nuevaTarea').value = '';
    obtenerTareas();
}

async function actualizarTarea(id, nuevoTitulo) {
    await fetch(`/tareas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: nuevoTitulo })
    });

    obtenerTareas();
}

async function eliminarTarea(id) {
    await fetch(`/tareas/${id}`, { method: 'DELETE' });
    obtenerTareas();
}

document.addEventListener("DOMContentLoaded", obtenerTareas);
