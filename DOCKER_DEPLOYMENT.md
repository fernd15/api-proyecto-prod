# 🐳 Despliegue en Docker Desktop

## 📋 Prerrequisitos

1. **Docker Desktop instalado y ejecutándose**
2. **Git Bash o PowerShell** (para ejecutar scripts)

## 🚀 Despliegue rápido

### **Opción 1: Usar el script automático (Recomendado)**

#### **En Git Bash:**
```bash
chmod +x deploy-docker.sh
./deploy-docker.sh
```

#### **En PowerShell:**
```powershell
.\deploy-docker.ps1
```

### **Opción 2: Comandos manuales**

```bash
# 1. Construir la imagen
docker build -t api-ts .

# 2. Ejecutar el contenedor
docker run -d --name api-ts -p 3000:3000 --restart unless-stopped api-ts

# 3. Verificar que esté corriendo
docker ps
```

## 🌐 Acceso a la API

Una vez desplegado, tu API estará disponible en:
- **URL:** http://localhost:3000
- **Puerto:** 3000

## 📋 Rutas disponibles

- **Login:** `POST /api/login`
- **Blob:** `GET /api/blob/:filename`

## 🔧 Comandos útiles

### **Ver logs en tiempo real:**
```bash
docker logs -f api-ts
```

### **Detener la aplicación:**
```bash
docker stop api-ts
```

### **Reiniciar la aplicación:**
```bash
docker restart api-ts
```

### **Ver estado del contenedor:**
```bash
docker ps
```

### **Acceder al contenedor:**
```bash
docker exec -it api-ts bash
```

### **Reconstruir y desplegar:**
```bash
# Detener y eliminar contenedor
docker stop api-ts
docker rm api-ts

# Reconstruir imagen
docker build -t api-ts .

# Ejecutar nuevo contenedor
docker run -d --name api-ts -p 3000:3000 --restart unless-stopped api-ts
```

## 🔄 CI/CD con Docker Desktop

### **Workflow automático:**
1. **Haz cambios en tu código**
2. **Haz commit y push:**
   ```bash
   git add .
   git commit -m "Nuevo feature"
   git push origin main
   ```
3. **GitHub Actions automáticamente:**
   - ✅ Ejecuta tests
   - ✅ Construye la aplicación
   - ✅ Prueba la imagen Docker
4. **Despliega manualmente:**
   ```bash
   ./deploy-docker.sh
   ```

## 🔍 Troubleshooting

### **Si el puerto 3000 está ocupado:**
```bash
# Cambiar puerto
docker run -d --name api-ts -p 3001:3000 --restart unless-stopped api-ts
```

### **Si hay problemas con la imagen:**
```bash
# Reconstruir sin cache
docker build --no-cache -t api-ts .
```

### **Si el contenedor no inicia:**
```bash
# Ver logs de error
docker logs api-ts

# Verificar recursos de Docker
docker system df
```

### **Limpiar Docker:**
```bash
# Eliminar contenedores parados
docker container prune

# Eliminar imágenes no usadas
docker image prune

# Limpiar todo
docker system prune -a
```

## 📊 Monitoreo

### **Ver uso de recursos:**
```bash
docker stats api-ts
```

### **Ver información del contenedor:**
```bash
docker inspect api-ts
```

## ⚠️ Notas importantes

1. **Docker Desktop debe estar ejecutándose**
2. **El puerto 3000 debe estar libre**
3. **Para desarrollo, usa `docker-compose up`**
4. **Para producción, usa los scripts de despliegue**

## 🎯 Beneficios del despliegue en Docker

1. **Consistencia:** Mismo entorno en desarrollo y producción
2. **Aislamiento:** No interfiere con otras aplicaciones
3. **Portabilidad:** Funciona en cualquier máquina con Docker
4. **Escalabilidad:** Fácil de replicar y escalar
5. **Rollback:** Fácil volver a versiones anteriores

## 🎉 ¡Listo!

Una vez desplegado:
- Tu API estará disponible en http://localhost:3000
- Se reiniciará automáticamente si Docker se reinicia
- Podrás ver logs en tiempo real
- Fácil de actualizar con nuevos cambios

¿Necesitas ayuda con algún paso específico? 