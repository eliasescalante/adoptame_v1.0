# Adoptame

## Entrega Final

**Profesor**: Samuel Tocaimaza  
**Comisión**: 70090  
**Alumno**: Elías Escalante  

---

## Descripción del Proyecto

Este proyecto forma parte de la entrega final del ultimo tramo de la diplomatura "Desarrollo Backend" -  **Backend III - Testing y Escalabilidad**. La aplicación **Adoptame** está diseñada para facilitar la adopción de mascotas mediante la gestión de usuarios, mascotas y adopciones. En esta entrega, se han implementado nuevas funcionalidades relacionadas con la generación de datos y mocks para pruebas.

---

## Implementacion de la pre-entrega

Se añadió el archivo `mocks.router.js` que incluye los siguientes endpoints:

1. **`/mockingpets`**  
   Genera datos simulados de mascotas para realizar pruebas y validaciones.  

2. **`/mockingusers`**  
   Genera usuarios simulados con datos realistas para escenarios de prueba.  

3. **`/generateData`**  
   Permite insertar datos en la base de datos según los parámetros especificados, facilitando la carga de datos iniciales o masivos.  

## Implementacion de la entrega final

1. **`npm test`** 
   Se agregó la carpeta test donde se agrego los test funcionales al endpoitn del router "adoption.router.js".
2. **`Dockerfile`**
   Se agrego el uso de contenedores al proyecto agregando la imagen del proyecto
3. **`.dockerignore`**
   Se agrego el archivo para ignorar archivos innecesarios al momento de crear la imagen
4. **`Dockerhub`**
   Se subio la imagen al repositorio de dockerhub. Link del repositorio: https://hub.docker.com/r/eliasescalante/adoptame2

---

## Configuración del Proyecto
### Requisitos
- Node.js v16 o superior
- MongoDB Atlas o una instancia local de MongoDB [en este proyecto se incluyo la variable de entorno]
- Archivo `.env` configurado correctamente

