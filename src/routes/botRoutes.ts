import { Router } from 'express';

const router = Router();

// Ruta para recibir mensajes del bot vía webhook
router.post('/bot/webhook', (req, res) => {
  // Aquí puedes procesar el mensaje recibido desde N8N/Telegram
  // Por ejemplo, reenviar datos, validar, etc.
  res.status(200).json({ message: 'Webhook recibido correctamente', data: req.body });
});

export default router; 