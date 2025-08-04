#!/bin/bash

echo "🐳 Desplegando API en Docker Desktop..."

# Detener contenedor existente si existe
echo "🛑 Deteniendo contenedor existente..."
docker stop api-ts 2>/dev/null || true
docker rm api-ts 2>/dev/null || true

# Construir la imagen
echo "🔨 Construyendo imagen Docker..."
docker build -t api-ts .

# Ejecutar el contenedor
echo "🚀 Iniciando contenedor..."
docker run -d \
  --name api-ts \
  -p 3000:3000 \
  --restart unless-stopped \
  api-ts

# Verificar que el contenedor esté corriendo
echo "✅ Verificando estado del contenedor..."
sleep 5
if docker ps | grep -q api-ts; then
    echo "🎉 ¡API desplegada exitosamente!"
    echo "🌐 URL: http://localhost:3000"
    echo "📊 Estado:"
    docker ps | grep api-ts
else
    echo "❌ Error: El contenedor no está corriendo"
    docker logs api-ts
    exit 1
fi

echo ""
echo "🔧 Comandos útiles:"
echo "  Ver logs: docker logs -f api-ts"
echo "  Detener: docker stop api-ts"
echo "  Reiniciar: docker restart api-ts"
echo "  Ver estado: docker ps" 