import { categorias } from "./data.js";

// funcion para determinar si es necesario reponer el stock para un producto especifico
function verificarStock(producto) {
    let porcentajeCategoria;
    switch (producto.categoria) {
        case 'A':
            porcentajeCategoria = 0.6;
            break;
        case 'B':
            porcentajeCategoria = 0.4;
            break;
        case 'C':
            porcentajeCategoria = 0.25;
            break;
        default:
            porcentajeCategoria = 0;
            break;
    }
    const porcentajeStockActual = producto.stockActual / producto.stockMaximo;
    return porcentajeStockActual <= porcentajeCategoria;
}

// funcion para obtener la cantidad a reponer por producto
function cantidadAReponer(producto) {
    const stockDiferencia = producto.stockMaximo - producto.stockActual;
    return stockDiferencia > 0 ? stockDiferencia : 0; // si la diferencia es negativa, no se necesita reponer
}

// promesa que verifica el stock de un producto
function verificarStockProducto(producto) {
    return new Promise((resolve, reject) => {
        const input = document.querySelector(`#prod_${producto.id}`);
        if (input) {
            const stockActual = parseInt(input.value);
            if (isNaN(stockActual) || stockActual < 0) {
                return reject(`el valor ingresado para el producto${producto.id} no es un número válido.`)
            }

            producto.stockActual = stockActual;
            console.log(`Producto ${producto.id}, Stock actual: ${producto.stockActual}`);
            const cantidad = cantidadAReponer(producto);
            console.log(`Cantidad a reponer para producto ${producto.id}: ${cantidad}`);

            const mensaje = verificarStock(producto) ?
                `Es necesario comprar ${cantidad} unidades del producto ${producto.id} de la categoría ${producto.categoria}.` :
                `No es necesario comprar stock para el producto ${producto.id} de la categoría ${producto.categoria}.`;

            resolve({ mensaje, necesitaCompra: verificarStock(producto) });
        } else {
            reject(`No se encontró el input para el producto ${producto.id}`);
        }
    });
}

// obtener referencias a elementos del DOM
const verificarStockBtn = document.getElementById('verificarStockBtn');
const limpiarBtn = document.getElementById('limpiarBtn');
const resultadosDiv = document.getElementById('resultados');

// funcion de respuesta al clic en el botón "verificar stock"
verificarStockBtn.addEventListener('click', function() {
    // limpiar resultados anteriores antes de mostrar los nuevos
    resultadosDiv.innerHTML = '';

    const promesas = [];

    // crear promesa para cada producto
    categorias.forEach(categoria => {
        categoria.productos.forEach(producto => {
            promesas.push(verificarStockProducto(producto));
        });
    });

    // uso de las promesas
    Promise.allSettled(promesas).then(resultados => {
        resultados.forEach(resultado => {
            const p = document.createElement('p');
            if (resultado.status === "fulfilled") {
                p.innerText = resultado.value.mensaje;
                p.classList.add(`textoNoComprar`);
                if (resultado.value.necesitaCompra) {
                    p.classList.add('textoComprar');
                }
            } else {
                p.innerText = `Línea vacía o ${resultado.reason}`;
                p.classList.add(`textoVacio`);
            }   
            resultadosDiv.appendChild(p);
        });

        // guardar datos de stock en localStorage
        const stockActual = categorias.reduce((acc, categoria) => {
            categoria.productos.forEach(producto => {
                acc.push(producto.stockActual);
            });
            return acc;
        }, []);
        localStorage.setItem('stockActual', JSON.stringify(stockActual));

        //alerta de stock verificado
        Swal.fire({
            title: 'Stock Verificado',
            text: 'El stock de todos los productos ha sido analizado, si es necesario comprar, aparecerán en rojo el texto del producto específico.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    });
});

// event listener para el boton de limpiar
limpiarBtn.addEventListener('click', function() {
    //alerta de borrar lo procesado
    Swal.fire({
        title: "¿Quieres borrar lo procesado?",
        text: "Se eliminará todo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, Limpiar!"
    }).then((result) => {
        if (result.isConfirmed) {
            // restablecer el valor de todos los campos de entrada
            const inputs = document.querySelectorAll('.stockProducto');
            inputs.forEach(input => {
            input.value = '';
            });
            // eliminar los resultados de la verificacion de stock
            resultadosDiv.innerHTML = '';            
            //alerta de aceptar borrar lo procesado
            Swal.fire({
                title: "Borrado!",
                text: "Se ha limpiado todo.",
                icon: "success"
            });
        }
    });
});