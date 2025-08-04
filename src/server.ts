import app from './app';

const PORT = process.env.PORT || 3000;

console.log('🔌 Iniciando servidor...');

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
}).on('error', (error) => {
  console.error('❌ Error al iniciar el servidor:', error);
});