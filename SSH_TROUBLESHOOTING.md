# 🔧 Solución de problemas SSH - Elastika VPS

## ❌ Problema: Connection timed out

### **1. Verificar desde el panel de Elastika:**

1. **Accede al panel:** https://elastika.pe/clientarea.php
2. **Ve a tu VPS:** Busca tu servidor `sv-woPjUCLWrRI2hKgAmNq4.cloud.elastika.pe`
3. **Verifica estado:** Debe estar "Online"
4. **Revisa credenciales:** Usuario `root` y contraseña

### **2. Probar diferentes comandos SSH:**

```bash
# Intenta con verbose para ver más detalles
ssh -v root@161.132.37.57

# Intenta con puerto específico
ssh -p 22 root@161.132.37.57

# Intenta con diferentes algoritmos
ssh -o KexAlgorithms=+diffie-hellman-group1-sha1 root@161.132.37.57
```

### **3. Verificar conectividad básica:**

```bash
# Probar ping
ping 161.132.37.57

# Probar puerto 22
telnet 161.132.37.57 22

# O usar nmap si lo tienes instalado
nmap -p 22 161.132.37.57
```

### **4. Posibles soluciones:**

#### **Opción A: Usar la consola web de Elastika**
1. Ve al panel de Elastika
2. Busca tu VPS
3. Busca la opción "Consola" o "Console"
4. Accede directamente desde el navegador

#### **Opción B: Resetear el VPS**
1. En el panel de Elastika
2. Busca opción "Reiniciar" o "Restart"
3. Reinicia el VPS
4. Espera 2-3 minutos
5. Intenta conectarte nuevamente

#### **Opción C: Verificar firewall**
Si tienes acceso a la consola web:
```bash
# Verificar si SSH está corriendo
systemctl status ssh

# Verificar puertos abiertos
netstat -tlnp | grep :22

# Verificar firewall
ufw status
```

### **5. Alternativas de conexión:**

#### **Usar PuTTY (Windows):**
1. Descarga PuTTY
2. Host: 161.132.37.57
3. Port: 22
4. Connection type: SSH
5. Usuario: root

#### **Usar WinSCP (para transferir archivos):**
1. Descarga WinSCP
2. Protocolo: SFTP
3. Host: 161.132.37.57
4. Usuario: root
5. Puerto: 22

### **6. Contactar soporte de Elastika:**

Si nada funciona:
1. Ve al panel de Elastika
2. Busca "Soporte" o "Support"
3. Abre un ticket explicando el problema
4. Incluye la IP: 161.132.37.57

### **7. Información para el soporte:**

```
Problema: No puedo conectarme via SSH al VPS
IP: 161.132.37.57
Hostname: sv-woPjUCLWrRI2hKgAmNq4.cloud.elastika.pe
Error: ssh: connect to host 161.132.37.57 port 22: Connection timed out
```

## 🔍 **Comandos de diagnóstico:**

```bash
# Verificar si el servidor responde
ping 161.132.37.57

# Verificar puerto SSH
telnet 161.132.37.57 22

# Verificar ruta de red
traceroute 161.132.37.57

# Verificar DNS
nslookup sv-woPjUCLWrRI2hKgAmNq4.cloud.elastika.pe
```

## ⚠️ **Notas importantes:**

1. **Credenciales:** Asegúrate de tener la contraseña correcta del VPS
2. **Firewall local:** Verifica que tu firewall no bloquee el puerto 22
3. **Red:** Verifica tu conexión a internet
4. **VPN:** Si usas VPN, desactívala temporalmente 