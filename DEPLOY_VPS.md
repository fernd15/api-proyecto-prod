# 🚀 Despliegue en Elastika VPS

## 📋 Información del VPS
- **IP:** 161.132.37.57
- **Hostname:** sv-woPjUCLWrRI2hKgAmNq4.cloud.elastika.pe
- **OS:** Ubuntu
- **Estado:** Online

## 🔧 Pasos para desplegar

### **1. Conectar al VPS via SSH:**
```bash
ssh root@161.132.37.57
```

### **2. Actualizar el sistema:**
```bash
apt update && apt upgrade -y
```

### **3. Instalar Node.js 18:**
```bash
# Instalar curl si no está instalado
apt install curl -y

# Descargar e instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Verificar instalación
node --version
npm --version
```

### **4. Instalar PM2 (Process Manager):**
```bash
npm install -g pm2
```

### **5. Instalar Nginx (opcional, para proxy reverso):**
```bash
apt install nginx -y
```

### **6. Crear directorio para la aplicación:**
```bash
mkdir -p /var/www/api-ts
cd /var/www/api-ts
```

### **7. Clonar tu repositorio (si está en GitHub):**
```bash
# Si tu código está en GitHub
git clone https://github.com/tu-usuario/tu-repositorio.git .

# O subir archivos manualmente via SCP/SFTP
```

### **8. Instalar dependencias:**
```bash
npm install
npm run build
```

### **9. Configurar variables de entorno:**
```bash
nano .env
```

**Contenido del archivo .env:**
```env
NODE_ENV=production
PORT=3000
DB_HOST=tu-host-db
DB_USER=tu-usuario-db
DB_PASSWORD=tu-password-db
DB_NAME=tu-nombre-db
```

### **10. Configurar PM2:**
```bash
# Crear archivo de configuración PM2
nano ecosystem.config.js
```

**Contenido de ecosystem.config.js:**
```javascript
module.exports = {
  apps: [{
    name: 'api-ts',
    script: 'dist/server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

### **11. Iniciar la aplicación con PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### **12. Configurar Nginx (opcional):**
```bash
nano /etc/nginx/sites-available/api-ts
```

**Contenido de la configuración Nginx:**
```nginx
server {
    listen 80;
    server_name 161.132.37.57;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Habilitar el sitio
ln -s /etc/nginx/sites-available/api-ts /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### **13. Configurar firewall:**
```bash
# Instalar ufw si no está instalado
apt install ufw -y

# Configurar firewall
ufw allow ssh
ufw allow 80
ufw allow 443
ufw allow 3000
ufw enable
```

## 🔧 Comandos útiles

### **Ver logs de la aplicación:**
```bash
pm2 logs api-ts
```

### **Reiniciar la aplicación:**
```bash
pm2 restart api-ts
```

### **Ver estado de PM2:**
```bash
pm2 status
```

### **Actualizar la aplicación:**
```bash
cd /var/www/api-ts
git pull
npm install
npm run build
pm2 restart api-ts
```

### **Ver logs de Nginx:**
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## 🌐 URLs de tu aplicación

Una vez desplegado, tu API estará disponible en:
- **Directo:** http://161.132.37.57:3000
- **Con Nginx:** http://161.132.37.57

## 📋 Rutas disponibles

- **Login:** `POST /api/login`
- **Blob:** `GET /api/blob/:filename`

## 🔍 Troubleshooting

### **Si la aplicación no responde:**
```bash
pm2 status
pm2 logs api-ts
```

### **Si Nginx no funciona:**
```bash
nginx -t
systemctl status nginx
```

### **Ver uso de recursos:**
```bash
htop
df -h
free -h
```

## ⚠️ Notas importantes

1. **Seguridad:** Cambia la contraseña root por defecto
2. **Backups:** Configura backups regulares
3. **Monitoreo:** Considera usar herramientas de monitoreo
4. **SSL:** Configura certificado SSL para HTTPS

## 🎯 Próximos pasos

1. **Configurar dominio personalizado**
2. **Configurar SSL/HTTPS con Let's Encrypt**
3. **Configurar monitoreo**
4. **Configurar backups automáticos** 