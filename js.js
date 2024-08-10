document.addEventListener('DOMContentLoaded', () => {
    const dateError = document.querySelector('[data-error="date-error"]');
    const nombreError = document.querySelector('[data-error="nombre-error"]');
    const passwordError = document.querySelector('[data-error="password-error"]');
    const form = document.getElementById('form');
    const contentDiv = document.getElementById('content');

    const nombreInput = document.getElementById('nombre');
    const passwordInput = document.getElementById('password');
    const formProductos = document.getElementById('form-productos')
    const nombreProductos = document.querySelector('#nombre-lbl')
    
    const precioProductos = document.querySelector('#precio-lbl')
    const edadMinimaProductos = document.querySelector('#edadMinima-lbl')
    const url = 'http://localhost:8080/productos/'
    const createProductos = async (input)=>{
        try {
            const options = {
                method : 'POST',
                headers : {'content-type' : 'application/json'},
                body : JSON.stringify(input)
            }
            const respuesta = await fetch(url,options)
            if (!respuesta.ok) {
                throw new Error('Error al enviar el producto', respuesta.status)
            }
            const data = await respuesta.json()
            console.log(data)
        } catch (error) {
            console.log('createProducts', error)
        }
    }
    formProductos.addEventListener('submit', (e)=>{
        e.preventDefault()
        
        const producto = {
            [formProductos[0].name] : formProductos[0].value.trim(),
            [formProductos[1].name] : formProductos[1].value.trim(),
            [formProductos[2].name] : formProductos[2].value.trim(),
        }
        console.log(formProductos[0].value)
        console.log(formProductos[1].value)
        console.log(formProductos[2].value)
        console.log(formProductos[0].name)
        console.log(formProductos[1].name)
        console.log(formProductos[2].name)

        createProductos(producto)
        e.preventDefault()
    })
    const getAllProductos = async ()=>{
        try {
            const respuesta = await fetch(url)
            if (!respuesta.ok) {
                throw new Error('No se pudo enviar el producto', respuesta.status)
            }
            const data = await respuesta.json()
            console.log(data)
            data.forEach(producto => {
                const h5 = document.createElement('h5')
                h5.innerText = producto.nombre
                const p = document.createElement('p')
                p.innerText = producto.edadMinima
                p.classList.add('card-text')
                const img = document.createElement('img')
                img.src = producto.imagen
                img.classList.add('card-img-top')
                const divProductos = document.createElement('div')
                divProductos.classList.add('card')
                divProductos.style.width = '18rem'
                contentDiv.appendChild(divProductos)
                divProductos.appendChild(img)
                divProductos.appendChild(h5)
                divProductos.appendChild(p)
            });
            
        
        } catch (error) {
            console.log('getAllProductos', error)
        }
    }
    getAllProductos()
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        function verificarEdad() {
            const birthdate = document.getElementById('birthdate').value;
            const birthDateNuevo = new Date(birthdate);
            const today = new Date();
            let age = today.getFullYear() - birthDateNuevo.getFullYear();
            console.log(age)
            const monthDifference = today.getMonth() - birthDateNuevo.getMonth();
            const dayDifference = today.getDate() - birthDateNuevo.getDate();

            if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
                age--;
            }

            if (age >= 18) {
                dateError.textContent = '';
                return true;
            } else {
                dateError.textContent = 'Lo sentimos, debes tener al menos 18 años para acceder a este contenido.';
                return false;
            }
        }

        function validarNombre() {
            if (nombreInput.value.trim() === '') {
                nombreError.innerText = 'Complete este campo';
                return false;
            } else {
                nombreError.innerText = '';
                return true;
            }
        }

        function validarPassword() {
            if (passwordInput.value.trim() === '') {
                passwordError.innerText = 'Complete este campo';
                return false;
            } else {
                passwordError.innerText = '';
                return true;
            }
        }

        const esEdadValida = verificarEdad();
        const esNombreValido = validarNombre();
        const esPasswordValido = validarPassword();

        if (esEdadValida && esNombreValido && esPasswordValido) {
            console.log('Los inputs tienen información válida, puedo enviar la data');
            const data = {
                nombre: nombreInput.value.trim(),
                password: passwordInput.value.trim()
            };
            console.log(data);
            contentDiv.style.visibility = 'visible';
        } else {
            console.log('Los inputs no tienen información válida');
        }
let productos = [
    { nombre: 'Vodka', edadMinima: 18 },
    { nombre: 'Whisky', edadMinima: 21 },
    { nombre: 'Cerveza Artesanal', edadMinima: 18 }
  ];
function VerificarProductos() {
    const birthdate = document.getElementById('birthdate').value;
    const birthDateNuevo = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDateNuevo.getFullYear();
    console.log(age)
    const monthDifference = today.getMonth() - birthDateNuevo.getMonth();
    const dayDifference = today.getDate() - birthDateNuevo.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

}
VerificarProductos()
    });
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const contentDiv = document.getElementById('content');
      const esEdadValida = verificarEdad();
      const esNombreValido = validarNombre();
      const esPasswordValido = validarPassword();

      if (esEdadValida && esNombreValido && esPasswordValido) {
          const data = {
              nombre: nombreInput.value.trim(),
              password: passwordInput.value.trim(),
              birthdate: document.getElementById('birthdate').value
          };
          const jsonData = JSON.stringify(data);
          console.log(jsonData);

        contentDiv.style.visibility = 'visible';
     } else {
         console.log('Los inputs no tienen información válida');
     }

    VerificarProductos();
});
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const contentDiv = document.getElementById('content');
     const esEdadValida = verificarEdad();
      const esNombreValido = validarNombre();
      const esPasswordValido = validarPassword();

      if (esNombreValido && esPasswordValido) {
          const data = {
              nombre: nombreInput.value.trim(),
              password: passwordInput.value.trim(),
              birthdate: document.getElementById('birthdate').value
          };
          localStorage.setItem('formData', JSON.stringify(data));
          console.log('Datos guardados en localStorage:', data);

         contentDiv.style.visibility = 'visible';
     } else {
         console.log('Los inputs no tienen información válida');
     }

     VerificarProductos();
});
