FROM node 
#Definimos una imagen base: NODE

WORKDIR /app
#Creamos un directorio llamado app para que sea nuestro workspace

COPY package.json .
#Copiamos el archivo package.json para que sea accesible en el contenedor

RUN npm install
#Instalamos las dependencias del proyecto

COPY . .
#Copiamos el resto de archivos del proyecto

EXPOSE 8080
#Definimos el puerto que vamos a usar para la aplicación

CMD [ "npm", "start" ]
#Tiene que ejecutar el "npm start"

