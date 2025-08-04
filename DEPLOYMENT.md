# 🚀 Despliegue en AWS Elastic Beanstalk

## 📋 Prerrequisitos

1. **AWS CLI instalado y configurado**
2. **EB CLI instalado**
3. **Cuenta de AWS con permisos para Elastic Beanstalk**

## 🔧 Instalación de herramientas

### **Instalar AWS CLI:**
```bash
# Windows (usando chocolatey)
choco install awscli

# O descargar desde: https://aws.amazon.com/cli/
```

### **Instalar EB CLI:**
```bash
pip install awsebcli
```

### **Configurar AWS:**
```bash
aws configure
# Ingresa tu Access Key ID, Secret Access Key, región (ej: us-east-1)
```

## 🚀 Pasos para desplegar

### **1. Inicializar EB en tu proyecto:**
```bash
eb init
```

**Opciones a seleccionar:**
- **Application name:** api-ts (o el nombre que prefieras)
- **Platform:** Node.js
- **Platform version:** Node.js 18 (recomendado)
- **Region:** us-east-1 (o tu región preferida)

### **2. Crear el entorno de producción:**
```bash
eb create production
```

**Opciones a seleccionar:**
- **Environment name:** api-ts-production
- **DNS CNAME prefix:** api-ts-prod (debe ser único)
- **Load balancer type:** application
- **Single instance:** No (para alta disponibilidad)

### **3. Configurar variables de entorno:**
```bash
eb setenv NODE_ENV=production
eb setenv DB_HOST=tu-host-db
eb setenv DB_USER=tu-usuario-db
eb setenv DB_PASSWORD=tu-password-db
eb setenv DB_NAME=tu-nombre-db
```

### **4. Desplegar la aplicación:**
```bash
eb deploy
```

### **5. Verificar el despliegue:**
```bash
eb status
eb open
```

## 📁 Estructura de archivos para EB

```
Api_TS/
├── .ebextensions/
│   ├── nodecommand.config
│   └── environment.config
├── .ebignore
├── Procfile
├── package.json
├── tsconfig.json
└── src/
    ├── app.ts
    ├── server.ts
    └── ...
```

## 🔧 Comandos útiles

### **Ver logs:**
```bash
eb logs
```

### **Conectar al servidor:**
```bash
eb ssh
```

### **Ver información del entorno:**
```bash
eb status
```

### **Terminar el entorno:**
```bash
eb terminate production
```

### **Actualizar configuración:**
```bash
eb config
```

## 🌐 URLs de tu aplicación

Una vez desplegado, tu API estará disponible en:
- **URL:** https://tu-app.elasticbeanstalk.com
- **Puerto:** 8081 (configurado internamente)

## 📋 Rutas disponibles

- **Login:** `POST /api/login`
- **Blob:** `GET /api/blob/:filename`

## ⚠️ Notas importantes

1. **Variables de entorno:** Configura todas las variables necesarias para tu base de datos
2. **Seguridad:** No subas archivos `.env` al repositorio
3. **Monitoreo:** Usa CloudWatch para monitorear tu aplicación
4. **Escalabilidad:** Considera usar Auto Scaling Groups

## 🔍 Troubleshooting

### **Si el build falla:**
```bash
eb logs --all
```

### **Si la aplicación no responde:**
```bash
eb health
```

### **Para reiniciar la aplicación:**
```bash
eb restart
```

## 💰 Costos estimados

- **Single instance:** ~$15-30/mes
- **Load balancer:** ~$20/mes adicional
- **Data transfer:** Según uso

## 🎯 Próximos pasos

1. **Configurar dominio personalizado**
2. **Configurar SSL/HTTPS**
3. **Configurar monitoreo con CloudWatch**
4. **Configurar backups automáticos** 