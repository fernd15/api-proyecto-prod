#!/bin/bash

echo "🤖 Configurando N8N para el bot de Telegram..."

# Verificar si N8N está instalado
if ! command -v n8n &> /dev/null; then
    echo "📦 Instalando N8N..."
    npm install -g n8n
else
    echo "✅ N8N ya está instalado"
fi

# Crear directorio para N8N
mkdir -p ~/.n8n

# Configurar variables de entorno
echo "🔧 Configurando variables de entorno..."

cat > ~/.n8n/.env << EOF
# N8N Configuration
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=admin123

# Telegram Bot
TELEGRAM_BOT_TOKEN=TU_BOT_TOKEN_AQUI

# OpenAI
OPENAI_API_KEY=TU_OPENAI_API_KEY_AQUI

# API Configuration
API_BASE_URL=http://localhost:3000
API_ENDPOINT=/api/bot/webhook

# N8N Webhook URL (se generará automáticamente)
N8N_WEBHOOK_URL=https://tu-dominio.com/webhook/telegram
EOF

echo "✅ Variables de entorno configuradas"
echo ""
echo "📋 Próximos pasos:"
echo "1. Edita ~/.n8n/.env con tus credenciales"
echo "2. Ejecuta: n8n start"
echo "3. Ve a http://localhost:5678"
echo "4. Crea el workflow siguiendo la guía"
echo ""
echo "🔧 Comandos útiles:"
echo "  Iniciar N8N: n8n start"
echo "  Ver logs: n8n logs"
echo "  Detener: n8n stop"
echo "  Reiniciar: n8n restart" 