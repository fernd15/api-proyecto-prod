# Dockerfile
FROM node:20

# Crear directorio de la app
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci 

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la API en producción
CMD ["npm", "start"]
