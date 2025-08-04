# 🤖 N8N Workflow: API + IA + Telegram Bot

## 📋 Prerrequisitos

1. **N8N instalado y ejecutándose**
2. **Tu API funcionando** (http://localhost:3000 o en producción)
3. **Bot de Telegram creado** (via @BotFather)
4. **Cuenta de OpenAI** (para el agente de IA)

## 🚀 Configuración paso a paso

### **Paso 1: Crear el Bot de Telegram**

1. **Ve a Telegram** y busca `@BotFather`
2. **Envía:** `/newbot`
3. **Sigue las instrucciones:**
   - Nombre del bot: `Mi API Bot`
   - Username: `mi_api_bot` (debe terminar en 'bot')
4. **Guarda el token** que te da BotFather

### **Paso 2: Configurar N8N**

#### **Instalar N8N:**
```bash
# Instalar N8N globalmente
npm install -g n8n

# Ejecutar N8N
n8n start
```

#### **Acceder a N8N:**
- **URL:** http://localhost:5678
- **Crear cuenta** o usar credenciales por defecto

### **Paso 3: Crear el Workflow**

#### **Nodos necesarios:**

1. **Telegram Trigger** (Webhook)
2. **HTTP Request** (para tu API)
3. **OpenAI** (para el agente de IA)
4. **Telegram** (para responder)

## 🔧 Configuración detallada del Workflow

### **Nodo 1: Telegram Webhook**

```json
{
  "name": "Telegram Webhook",
  "type": "n8n-nodes-base.telegramTrigger",
  "parameters": {
    "authentication": "botToken",
    "botToken": "TU_BOT_TOKEN_AQUI",
    "updates": "message",
    "additionalFields": {}
  }
}
```

### **Nodo 2: HTTP Request (Tu API)**

```json
{
  "name": "Call API",
  "type": "n8n-nodes-base.httpRequest",
  "parameters": {
    "url": "http://localhost:3000/api/login",
    "method": "POST",
    "sendHeaders": true,
    "headerParameters": {
      "parameters": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ]
    },
    "sendBody": true,
    "bodyParameters": {
      "parameters": [
        {
          "name": "username",
          "value": "={{ $json.message.from.username }}"
        },
        {
          "name": "message",
          "value": "={{ $json.message.text }}"
        }
      ]
    }
  }
}
```

### **Nodo 3: OpenAI Agent**

```json
{
  "name": "AI Agent",
  "type": "n8n-nodes-base.openAi",
  "parameters": {
    "authentication": "apiKey",
    "apiKey": "TU_OPENAI_API_KEY",
    "operation": "chat",
    "model": "gpt-4",
    "messages": {
      "values": [
        {
          "role": "system",
          "content": "Eres un asistente inteligente que ayuda a los usuarios a interactuar con una API. Analiza el mensaje del usuario y la respuesta de la API para proporcionar respuestas útiles y contextuales."
        },
        {
          "role": "user",
          "content": "Usuario: {{ $json.message.text }}\nRespuesta API: {{ $('Call API').item.json }}"
        }
      ]
    },
    "options": {
      "temperature": 0.7,
      "maxTokens": 500
    }
  }
}
```

### **Nodo 4: Telegram Response**

```json
{
  "name": "Send Telegram Response",
  "type": "n8n-nodes-base.telegram",
  "parameters": {
    "authentication": "botToken",
    "botToken": "TU_BOT_TOKEN_AQUI",
    "operation": "sendMessage",
    "chatId": "={{ $json.message.chat.id }}",
    "text": "={{ $('AI Agent').item.json.choices[0].message.content }}",
    "additionalFields": {
      "parseMode": "Markdown"
    }
  }
}
```

## 🔄 Flujo del Workflow

```
Telegram Message → HTTP Request (API) → OpenAI Agent → Telegram Response
```

### **Paso 4: Configurar Webhook**

1. **En N8N, activa el workflow**
2. **Copia la URL del webhook**
3. **Ve a Telegram** y envía a @BotFather:
   ```
   /setwebhook
   URL_DEL_WEBHOOK_AQUI
   ```

## 🎯 Funcionalidades del Bot

### **Comandos disponibles:**

- `/start` - Mensaje de bienvenida
- `/help` - Mostrar comandos disponibles
- `/login` - Autenticarse con la API
- `/data` - Obtener datos de la API
- `/blob filename` - Obtener archivo específico

### **Respuestas inteligentes:**

- **Análisis de contexto** del mensaje del usuario
- **Integración con tu API** para obtener datos
- **Respuestas personalizadas** basadas en la IA
- **Manejo de errores** y respuestas útiles

## 🔧 Configuración avanzada

### **Variables de entorno en N8N:**

```bash
# En tu servidor N8N
export TELEGRAM_BOT_TOKEN="tu_bot_token"
export OPENAI_API_KEY="tu_openai_key"
export API_BASE_URL="http://localhost:3000"
```

### **Configurar en N8N:**

1. **Ve a Settings → Credentials**
2. **Crea credenciales para:**
   - Telegram Bot Token
   - OpenAI API Key
   - Tu API (si requiere autenticación)

## 📊 Monitoreo y logs

### **Ver logs del workflow:**
1. **En N8N, ve a Executions**
2. **Revisa las ejecuciones** del workflow
3. **Verifica errores** y respuestas

### **Comandos útiles:**

```bash
# Ver logs de N8N
n8n logs

# Reiniciar N8N
n8n restart

# Ver estado
n8n status
```

## 🔍 Troubleshooting

### **Si el webhook no funciona:**
1. **Verifica que el bot token sea correcto**
2. **Asegúrate de que el webhook esté configurado**
3. **Revisa los logs de N8N**

### **Si la API no responde:**
1. **Verifica que tu API esté corriendo**
2. **Comprueba la URL en el nodo HTTP Request**
3. **Revisa los logs de tu API**

### **Si OpenAI no funciona:**
1. **Verifica tu API key de OpenAI**
2. **Comprueba tu saldo de OpenAI**
3. **Revisa los límites de rate**

## 🎉 Beneficios del workflow

1. **Automatización completa** del bot
2. **Integración inteligente** con tu API
3. **Respuestas contextuales** usando IA
4. **Escalabilidad** fácil de configurar
5. **Monitoreo en tiempo real**

## 📋 Próximos pasos

1. **Configurar las credenciales** en N8N
2. **Crear el workflow** con los nodos
3. **Probar el bot** en Telegram
4. **Optimizar las respuestas** de la IA
5. **Agregar más funcionalidades** según necesites

¿Necesitas ayuda con algún paso específico? 