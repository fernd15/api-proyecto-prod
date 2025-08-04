# API TypeScript con Docker

## 🚀 Despliegue con Docker Desktop

### Prerrequisitos
- Docker Desktop instalado y ejecutándose
- Node.js (para desarrollo local)

### 📋 Pasos para desplegar

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd Api_TS
   ```

2. **Construir y ejecutar con Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Para ejecutar en segundo plano**
   ```bash
   docker-compose up -d --build
   ```

4. **Para detener los contenedores**
   ```bash
   docker-compose down
   ```

### 🔧 Comandos útiles

- **Ver logs en tiempo real:**
  ```bash
  docker-compose logs -f
  ```

- **Reconstruir sin cache:**
  ```bash
  docker-compose up --build --force-recreate
  ```

- **Acceder al contenedor:**
  ```bash
  docker exec -it mi_api_ts bash
  ```

### 🌐 Acceso a la API

Una vez desplegado, la API estará disponible en:
- **URL:** http://localhost:3000
- **Puerto:** 3000

### 📁 Estructura del proyecto

```
Api_TS/
├── src/
│   ├── app.ts          # Configuración de Express
│   ├── server.ts       # Servidor principal
│   ├── controllers/    # Controladores
│   ├── routes/         # Rutas de la API
│   ├── services/       # Lógica de negocio
│   ├── middlewares/    # Middlewares
│   ├── database/       # Configuración de BD
│   └── utils/          # Utilidades
├── Dockerfile          # Configuración de Docker
├── docker-compose.yml  # Orquestación de contenedores
└── package.json        # Dependencias del proyecto
```

### 🔍 Troubleshooting

**Si el puerto 3000 está ocupado:**
- Cambia el puerto en `docker-compose.yml`:
  ```yaml
  ports:
    - "3001:3000"  # Puerto externo:interno
  ```

**Si hay problemas con node_modules:**
- Elimina la carpeta node_modules local y reconstruye:
  ```bash
  rm -rf node_modules
  docker-compose up --build
  ```

**Para desarrollo local sin Docker:**
```bash
npm install
npm run dev
```
