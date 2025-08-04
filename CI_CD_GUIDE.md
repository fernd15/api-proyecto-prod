# 🚀 CI/CD con GitHub Actions - Guía Completa

## 📋 ¿Qué es CI/CD?

**CI/CD** significa:
- **CI (Continuous Integration):** Integración continua
- **CD (Continuous Deployment):** Despliegue continuo

**¿Qué hace?**
- Cada vez que haces `git push` a la rama `main`
- GitHub Actions automáticamente:
  1. ✅ Ejecuta tests
  2. ✅ Construye la aplicación
  3. ✅ Despliega en tu VPS de Elastika

## 🔧 Configuración paso a paso

### **Paso 1: Subir tu código a GitHub**

```bash
# Inicializar Git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit"

# Crear repositorio en GitHub y subir
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git branch -M main
git push -u origin main
```

### **Paso 2: Configurar Secrets en GitHub**

1. **Ve a tu repositorio en GitHub**
2. **Ve a Settings → Secrets and variables → Actions**
3. **Crea estos secrets:**

| Secret Name | Valor | Descripción |
|-------------|-------|-------------|
| `VPS_HOST` | `161.132.37.57` | IP de tu VPS |
| `VPS_USERNAME` | `root` | Usuario del VPS |
| `VPS_PASSWORD` | `tu-contraseña` | Contraseña del VPS |
| `VPS_PORT` | `22` | Puerto SSH |

### **Paso 3: Preparar el VPS**

Una vez que tengas acceso al VPS (por consola web o SSH):

```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Instalar PM2
npm install -g pm2

# Instalar Git
apt install git -y

# Crear directorio de la aplicación
mkdir -p /var/www/api-ts
cd /var/www/api-ts

# Clonar tu repositorio
git clone https://github.com/tu-usuario/tu-repositorio.git .

# Instalar dependencias
npm install
npm run build

# Configurar PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### **Paso 4: Configurar Git en el VPS**

```bash
# Configurar Git (reemplaza con tus datos)
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"

# Si usas autenticación por token
git config --global credential.helper store
```

## 🔄 Flujo de trabajo

### **Desarrollo local:**
```bash
# Hacer cambios en tu código
# Hacer commit
git add .
git commit -m "Nuevo feature"
git push origin main
```

### **Automáticamente GitHub Actions:**
1. **Detecta el push**
2. **Ejecuta tests**
3. **Construye la aplicación**
4. **Se conecta al VPS**
5. **Ejecuta el script de despliegue**
6. **Reinicia la aplicación**

## 📁 Estructura de archivos

```
tu-proyecto/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Configuración de GitHub Actions
├── scripts/
│   └── deploy.sh              # Script de despliegue
├── src/
│   ├── app.ts
│   ├── server.ts
│   └── ...
├── ecosystem.config.js         # Configuración PM2
├── package.json
└── CI_CD_GUIDE.md            # Esta guía
```

## 🔍 Monitoreo y logs

### **Ver logs de GitHub Actions:**
1. Ve a tu repositorio en GitHub
2. Ve a la pestaña "Actions"
3. Ve los logs de cada despliegue

### **Ver logs en el VPS:**
```bash
# Logs de la aplicación
pm2 logs api-ts

# Estado de PM2
pm2 status

# Logs del sistema
journalctl -u pm2-root
```

## ⚠️ Troubleshooting

### **Si el despliegue falla:**

1. **Verificar secrets en GitHub:**
   - Ve a Settings → Secrets
   - Verifica que todos los secrets estén configurados

2. **Verificar conectividad SSH:**
   ```bash
   # Desde tu computadora
   ssh root@161.132.37.57
   ```

3. **Verificar logs en GitHub Actions:**
   - Ve a Actions → Ver el job que falló
   - Revisa los logs de error

4. **Verificar logs en el VPS:**
   ```bash
   pm2 logs api-ts
   ```

### **Problemas comunes:**

#### **Error: "Permission denied"**
```bash
# En el VPS
chmod +x /var/www/api-ts/scripts/deploy.sh
```

#### **Error: "Git pull failed"**
```bash
# En el VPS
cd /var/www/api-ts
git config --global user.name "Deploy Bot"
git config --global user.email "deploy@example.com"
```

#### **Error: "PM2 not found"**
```bash
# En el VPS
npm install -g pm2
```

## 🎯 Beneficios del CI/CD

1. **Automatización:** No necesitas desplegar manualmente
2. **Consistencia:** Siempre el mismo proceso de despliegue
3. **Velocidad:** Despliegue en minutos
4. **Seguridad:** Credenciales seguras en GitHub Secrets
5. **Rollback:** Backups automáticos antes de cada despliegue

## 📊 Monitoreo avanzado

### **Configurar notificaciones:**
Puedes agregar notificaciones a Slack, Discord, o email cuando el despliegue termine.

### **Configurar health checks:**
```bash
# En el VPS
curl http://localhost:3000/api/health
```

## 🔐 Seguridad

1. **Nunca subas contraseñas al código**
2. **Usa siempre GitHub Secrets**
3. **Cambia la contraseña del VPS regularmente**
4. **Configura firewall en el VPS**

## 🎉 ¡Listo!

Una vez configurado:
1. Cada `git push` a `main` desplegará automáticamente
2. Tu API estará siempre actualizada
3. Tendrás logs de todos los despliegues
4. Backups automáticos antes de cada cambio

¿Necesitas ayuda con algún paso específico? 