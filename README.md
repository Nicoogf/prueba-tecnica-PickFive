# 🎮 PickFive

Este proyecto fue desarrollado como parte de una prueba técnica. Consiste en una aplicación que permite explorar videojuegos populares y seleccionar tus 5 favoritos.

---

## ✅ Requisitos mínimos cumplidos

- ✅ Listado de juegos populares obtenido desde la API de [RAWG](https://rawg.io/)
- ✅ Detalle individual de cada juego.
- ✅ Funcionalidad para seleccionar hasta 5 juegos como favoritos.
- ✅ Persistencia del Top 5 (almacenado en localStorage).
- ✅ Responsive design.
- ✅ Manejo de errores y loaders.

---

## ✨ Funcionalidades extra implementadas

- 🔀 **Drag & Drop** para reordenar el Top 5 de forma intuitiva.
- 🔢 **Indicador visual en el header** que muestra cuántos juegos hay en tu Top 5.
- 🧩 **Slots vacíos visibles** que indican cuántos lugares quedan disponibles.



- 🌙 **Dark Mode parcial**: Se implementó el cambio de tema oscuro/claro y funciona, pero actualmente requiere refrescar la página al cambiar el modo (por falta de tiempo para ajustar la reactividad del estado global del tema).

---

## 🔐 API Key (RAWG)

Para que el proyecto funcione correctamente, es necesario obtener una API Key desde [https://rawg.io/apidocs](https://rawg.io/apidocs):

### Pasos:

1. Registrarse en [RAWG.io](https://rawg.io/).
2. Solicitar tu API Key desde tu perfil.
3. Guardar en un archivo `.env` en la raíz del proyecto:

```env
VITE_RAWG_API_KEY=tu_clave_aquí

