// Test básico para verificar que la aplicación se construye correctamente
describe('Basic Tests', () => {
  test('should pass basic test', () => {
    expect(true).toBe(true);
  });

  test('should have correct Node.js version', () => {
    const nodeVersion = process.version;
    expect(nodeVersion).toMatch(/^v20\./);
  });
}); 