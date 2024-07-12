const apiUrl = 'http://localhost:3000';

document.getElementById('btnAbrirModal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'block';
});

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});

document.getElementById('mercaderia-form').addEventListener('submit', event => {
    event.preventDefault();
    const nombre = document.getElementById('mercaderia-nombre').value.trim();
    const precio = document.getElementById('mercaderia-precio').value.trim();
    const imagen = document.getElementById('mercaderia-imagen').value.trim();
    const tipoMercaderia_idTipoMercaderia = document.getElementById('mercaderia-tipo').value.trim();

    if (!nombre || !precio || !imagen || !tipoMercaderia_idTipoMercaderia) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    fetch(`${apiUrl}/mercaderias`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, precio, imagen, tipoMercaderia_idTipoMercaderia })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('mercaderia-form').reset();
        document.getElementById('modal').style.display = 'none';
        fetchMercaderias();
        console.log('Mercadería agregada correctamente');
    })
    .catch(error => console.error('Error:', error));
});

function deleteMercaderia(id) {
    if (confirm('¿Estás seguro de eliminar esta mercadería?')) {
        fetch(`${apiUrl}/mercaderias/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log(`Mercadería con ID ${id} eliminada correctamente`);
                fetchMercaderias(); 
            } else {
                console.error('Error al eliminar la mercadería');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

function modifyMercaderia(id) {
    fetch(`${apiUrl}/mercaderias/${id}`)
        .then(response => response.json())
        .then(mercaderia => {
            const nuevoNombre = prompt('Ingrese el nuevo nombre:', mercaderia.Nombre) || mercaderia.Nombre;
            const nuevoPrecio = prompt('Ingrese el nuevo precio:', mercaderia.Precio) || mercaderia.Precio;
            const nuevaImagen = prompt('Ingrese la nueva imagen:', mercaderia.Imagen) || mercaderia.Imagen;
            const nuevoTipoMercaderia_idTipoMercaderia = prompt('Ingrese el nuevo tipo de mercadería:', mercaderia.TipoMercaderia_idTipoMercaderia) || mercaderia.TipoMercaderia_idTipoMercaderia;

            if (!nuevoNombre || !nuevoPrecio || !nuevaImagen || !nuevoTipoMercaderia_idTipoMercaderia) {
                alert('Por favor, complete todos los campos.');
                return;
            }

            const updatedData = {
                nombre: nuevoNombre,
                precio: nuevoPrecio,
                imagen: nuevaImagen,
                tipoMercaderia_idTipoMercaderia: nuevoTipoMercaderia_idTipoMercaderia
            };

            fetch(`${apiUrl}/mercaderias/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })
            .then(response => response.json())
            .then(() => {
                document.getElementById('main').innerHTML = '';
                fetchMercaderias();
            })
            .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
}

function fetchMercaderias() {
    fetch(`${apiUrl}/mercaderias`)
        .then(response => response.json())
        .then(data => {
            const mercaderiasList = document.getElementById('main');
            mercaderiasList.innerHTML = '';
            data.forEach(mercaderia => {
                const mercaderiaElement = document.createElement('section');
                mercaderiaElement.classList.add('collection', 'container');
                
                mercaderiaElement.innerHTML = `
                    <article class="collection__content">
                        <picture class="collection__cover" >
                            <img src="${mercaderia.Imagen}" alt="${mercaderia.Nombre}">
                        </picture>
                        <h3 class="collection__text">${mercaderia.Nombre}</h3>
                        <p class="collection__text">$${mercaderia.Precio}</p>
                              <div class="collection__buttons">
                             <button class="modify-button" data-mercaderia-id="${mercaderia.idMercaderia}">Modificar</button>
                             <button class="delete-button" data-mercaderia-id="${mercaderia.idMercaderia}">Eliminar</button>
                        </div>   
                    </article>
                `;
                const modifyButton = mercaderiaElement.querySelector('.modify-button');
                modifyButton.addEventListener('click', () => {
                    const id = modifyButton.getAttribute('data-mercaderia-id');
                    modifyMercaderia(id);
                });

                const deleteButton = mercaderiaElement.querySelector('.delete-button');
                deleteButton.addEventListener('click', () => {
                    const id = deleteButton.getAttribute('data-mercaderia-id');
                    deleteMercaderia(id);
                });

                mercaderiasList.appendChild(mercaderiaElement);
            });
        })
        .catch(error => console.log('Error:', error));
}

fetchMercaderias();