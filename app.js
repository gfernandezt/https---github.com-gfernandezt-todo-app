const express = require('express');
const path = require('path');  // ✅ Importamos el módulo path

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));  // ✅ Permite servir archivos estáticos como index.html

let tareas = [
    { id: 1, titulo: "Aprender Docker", completado: false },
    { id: 2, titulo: "Configurar GitHub Actions", completado: false }
];

// ✅ Servir la página HTML en la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ Endpoints de la API
app.get('/tareas', (req, res) => {
    res.json(tareas);
});

app.post('/tareas', (req, res) => {
    const nuevaTarea = { id: tareas.length + 1, ...req.body };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

app.put('/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).send("Tarea no encontrada");
    Object.assign(tarea, req.body);
    res.json(tarea);
});

app.delete('/tareas/:id', (req, res) => {
    tareas = tareas.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

// ✅ Escuchar en el puerto
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
