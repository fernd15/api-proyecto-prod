#!/bin/bash

# Script de despliegue para Elastika VPS
set -e

echo "🚀 Iniciando despliegue..."

# Variables
APP_DIR="/var/www/api-ts"
BACKUP_DIR="/var/www/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Crear directorio de la aplicación si no existe
if [ ! -d "$APP_DIR" ]; then
    echo "📁 Creando directorio de la aplicación..."
    mkdir -p "$APP_DIR"
fi

# Crear directorio de backups si no existe
if [ ! -d "$BACKUP_DIR" ]; then
    echo "📁 Creando directorio de backups..."
    mkdir -p "$BACKUP_DIR"
fi

# Backup del directorio actual
if [ -d "$APP_DIR" ] && [ "$(ls -A $APP_DIR)" ]; then
    echo "💾 Creando backup..."
    tar -czf "$BACKUP_DIR/backup_$TIMESTAMP.tar.gz" -C "$APP_DIR" .
fi

# Ir al directorio de la aplicación
cd "$APP_DIR"

# Actualizar desde Git
echo "📥 Actualizando desde Git..."
git fetch origin
git reset --hard origin/main

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm ci --only=production

# Construir la aplicación
echo "🔨 Construyendo la aplicación..."
npm run build

# Crear directorio de logs si no existe
mkdir -p logs

# Reiniciar la aplicación con PM2
echo "🔄 Reiniciando la aplicación..."
if pm2 list | grep -q "api-ts"; then
    pm2 restart api-ts
else
    pm2 start ecosystem.config.js
fi

# Guardar configuración de PM2
pm2 save

# Verificar que la aplicación esté corriendo
echo "✅ Verificando estado de la aplicación..."
sleep 5
if pm2 list | grep -q "api-ts.*online"; then
    echo "🎉 ¡Despliegue completado exitosamente!"
    echo "📊 Estado de la aplicación:"
    pm2 status
else
    echo "❌ Error: La aplicación no está corriendo"
    pm2 logs api-ts --lines 20
    exit 1
fi

# Limpiar backups antiguos (mantener solo los últimos 5)
echo "🧹 Limpiando backups antiguos..."
cd "$BACKUP_DIR"
ls -t *.tar.gz | tail -n +6 | xargs -r rm

echo "✅ Despliegue finalizado!" 