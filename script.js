const btn = document.getElementById("btnCargar");
const cardsContainer = document.getElementById("cardsContainer");

btn.addEventListener("click", () => {
    // Realizamos una petición asíncrona para obtener el archivo JSON
    fetch("prueba.json")
        // Convertimos la respuesta del servidor (JSON en texto) en un objeto JavaScript
        .then(respuesta => respuesta.json())
        // Una vez convertidos los datos, trabajamos con ellos
        .then(data => {
            // Limpiamos el contenido del contenedor (por si el botón se pulsa más de una vez)
            cardsContainer.innerHTML = "";
            // Accedemos al array de personas dentro de la propiedad "personas" del JSON
            data.personas.forEach(persona => {
                // Determinamos la clase CSS según el estado de la persona
                let statusClass = "status-unknown";
                if (persona.estado === "Vivo") {
                    statusClass = "status-alive";
                } else if (persona.estado === "Muerto") {
                    statusClass = "status-dead";
                }
                // Creamos una nueva card para la persona
                const card = document.createElement("div");
                card.className = "card";
                // Insertamos el contenido de la card con los datos de la persona
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
                // Añadimos la card creada al contenedor
                cardsContainer.appendChild(card);
            });
        });
});
