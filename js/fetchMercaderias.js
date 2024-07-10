const apiUrl = 'http://localhost:3000';

function fetchMercaderias() {
    fetch(`${apiUrl}/mercaderias`)
        .then(response => response.json())
        .then(data => {
            const mercaderiasList = document.getElementById('main');
            data.forEach(mercaderia => {
                const mercaderiaElement = document.createElement('section');
                mercaderiaElement.classList.add('collection', 'container');
                
                mercaderiaElement.innerHTML = `
                    <article class="collection__content">
                        <h3 class="collection__title">${mercaderia.Nombre}</h3>
                        <p class="collection__text">$${mercaderia.Precio}</p>
                        <div class="btn-producto">
                            <button class="producto-boton">Detalle</button>
                            <button onclick="printMercaderia('${mercaderia.idMercaderia}','${mercaderia.Nombre}')" class="producto-boton">Agregar</button>
                        </div>
                    </article>
                    <picture class="collection__cover">
                        <img src="${mercaderia.Imagen}" alt="${mercaderia.Nombre}">
                    </picture>
                `;
                
                mercaderiasList.appendChild(mercaderiaElement);
            });
        })
        .catch(error => console.log('Error:', error));
}

fetchMercaderias();

