# Script para desplegar en Docker Desktop (Windows)

Write-Host "🐳 Desplegando API en Docker Desktop..." -ForegroundColor Green

# Detener contenedor existente si existe
Write-Host "🛑 Deteniendo contenedor existente..." -ForegroundColor Yellow
docker stop api-ts 2>$null
docker rm api-ts 2>$null

# Construir la imagen
Write-Host "🔨 Construyendo imagen Docker..." -ForegroundColor Yellow
docker build -t api-ts .

# Ejecutar el contenedor
Write-Host "🚀 Iniciando contenedor..." -ForegroundColor Yellow
docker run -d --name api-ts -p 3000:3000 --restart unless-stopped api-ts

# Verificar que el contenedor esté corriendo
Write-Host "✅ Verificando estado del contenedor..." -ForegroundColor Yellow
Start-Sleep -Seconds 5
if (docker ps | Select-String "api-ts") {
    Write-Host "🎉 ¡API desplegada exitosamente!" -ForegroundColor Green
    Write-Host "🌐 URL: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "📊 Estado:" -ForegroundColor Cyan
    docker ps | Select-String "api-ts"
} else {
    Write-Host "❌ Error: El contenedor no está corriendo" -ForegroundColor Red
    docker logs api-ts
    exit 1
}

Write-Host ""
Write-Host "🔧 Comandos útiles:" -ForegroundColor Cyan
Write-Host "  Ver logs: docker logs -f api-ts" -ForegroundColor White
Write-Host "  Detener: docker stop api-ts" -ForegroundColor White
Write-Host "  Reiniciar: docker restart api-ts" -ForegroundColor White
Write-Host "  Ver estado: docker ps" -ForegroundColor White 