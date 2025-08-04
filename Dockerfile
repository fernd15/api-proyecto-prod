# Dockerfile
FROM node:18

# Crear directorio de la app
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la API en modo desarrollo
CMD ["npm", "run", "dev"]
