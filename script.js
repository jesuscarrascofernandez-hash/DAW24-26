const btn = document.getElementById("btnCargar");
const cardsContainer = document.getElementById("cardsContainer");

// Función que crea una card a partir de los datos de una persona
function crearCard(persona) {
    let statusClass = "status-unknown";
    if (persona.estado === "Vivo") {
        statusClass = "status-alive";
    } else if (persona.estado === "Muerto") {
        statusClass = "status-dead";
    }
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img class="card-image ${persona.ajuste === 'contain' ? 'card-image-contain' : ''}" src="${persona.foto}" alt="${persona.nombre}">
        <div class="card-content">
            <h3 class="card-name">${persona.nombre}</h3>
            <div class="card-info">
                <div class="info-item">
                    <span class="info-label">Alias:</span>
                    <span class="info-value">${persona.alias}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Estado:</span>
                    <span class="status-badge ${statusClass}">${persona.estado}</span>
                </div>
            </div>
        </div>
    `;
    return card;
}

btn.addEventListener("click", () => {
    fetch("prueba.json")
        .then(respuesta => respuesta.json())
        .then(data => {
            cardsContainer.innerHTML = "";

            // Primero renderizamos los profesores en su propia fila (2 columnas)
            if (data.profesores && data.profesores.length > 0) {
                const profesoresGrid = document.createElement("div");
                profesoresGrid.className = "profesores-container";
                data.profesores.forEach(profesor => {
                    profesoresGrid.appendChild(crearCard(profesor));
                });
                cardsContainer.appendChild(profesoresGrid);
            }

            // Después renderizamos los alumnos en el grid de 4 columnas
            if (data.personas && data.personas.length > 0) {
                const alumnosGrid = document.createElement("div");
                alumnosGrid.className = "alumnos-container";
                data.personas.forEach(persona => {
                    alumnosGrid.appendChild(crearCard(persona));
                });
                cardsContainer.appendChild(alumnosGrid);
            }
        });
});
