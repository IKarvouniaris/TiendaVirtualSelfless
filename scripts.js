
document.addEventListener('DOMContentLoaded', () => {
  const carrito = document.getElementById('carrito');

  const abrirCarritoBtn = document.querySelector('.abrir-carrito');

  const cerrarCarritoBtn = document.querySelector('.cerrar-carrito');

  const contenidoCarrito = document.querySelector('.contenido-carrito');
    
  abrirCarritoBtn.addEventListener('click', () => {
    carrito.style.right = '0';
    document.body.classList.add('carrito-abierto');
  });
  
  cerrarCarritoBtn.addEventListener('click', () => {
    carrito.style.right = '-400px';
    document.body.classList.remove('carrito-abierto');
  });
  
  const botonesAñadir = document.querySelectorAll('.añadir');
  botonesAñadir.forEach(boton => {
    boton.addEventListener('click', (e) => {
      const producto = e.target.closest('.caja');
      const descripcion = producto.querySelector('.descripcion').textContent;
      const valor = parseFloat(producto.querySelector('.valor').textContent.replace('$', ''));
      const imagenSrc = producto.querySelector('img').src;
      const itemExistente = Array.from(contenidoCarrito.children).find(item => 
        item.querySelector('p.descripcion').textContent === descripcion
      );
  
      if (itemExistente) {
        const cantidadElem = itemExistente.querySelector('.cantidad');
        const valorElem = itemExistente.querySelector('.valor');
        let cantidad = parseInt(cantidadElem.textContent) + 1;
        cantidadElem.textContent = cantidad;

        const valorTotal = valor * cantidad;
        valorElem.textContent = `$${valorTotal.toFixed(2)}`;
      } 
      else {
        const itemCarrito = document.createElement('div');
        itemCarrito.classList.add('item-carrito');
        itemCarrito.innerHTML = `
          <img src="${imagenSrc}" alt="${descripcion}">
          <p class="descripcion">${descripcion}</p>
          <p class="valor">$${valor.toFixed(2)}</p>
          <div class="cantidad-control">
            <button class="disminuir">-</button>
            <p class="cantidad">1</p>
            <button class="aumentar">+</button>
          </div>
          <button class="quitar">✖</button>
        `;
  
        itemCarrito.querySelector('.quitar').addEventListener('click', () => {
          contenidoCarrito.removeChild(itemCarrito);
        });
  
        itemCarrito.querySelector('.aumentar').addEventListener('click', () => {
          const cantidadElem = itemCarrito.querySelector('.cantidad');
          let cantidad = parseInt(cantidadElem.textContent) + 1;
          cantidadElem.textContent = cantidad;

          const valorElem = itemCarrito.querySelector('.valor');
          const valorTotal = valor * cantidad;
          valorElem.textContent = `$${valorTotal.toFixed(2)}`;
        });
  
        itemCarrito.querySelector('.disminuir').addEventListener('click', () => {
          const cantidadElem = itemCarrito.querySelector('.cantidad');
          let cantidad = parseInt(cantidadElem.textContent);
          if (cantidad > 1) {
            cantidad -= 1;
            cantidadElem.textContent = cantidad;

            const valorElem = itemCarrito.querySelector('.valor');
            const valorTotal = valor * cantidad;
            valorElem.textContent = `$${valorTotal.toFixed(2)}`;
          }
        });
  
        contenidoCarrito.appendChild(itemCarrito);
      }
  
      mostrarNotificacion('Producto añadido al carrito');
    });
  });

  function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion');
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
      notificacion.remove();
    }, 3000);
  }
});
  