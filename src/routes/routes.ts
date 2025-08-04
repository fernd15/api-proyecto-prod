/*

import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';
import { loginController } from '../controllers/authController';
import {
  //
  getDataSucursales,
  getDataTiempo,
  getDataCategoriaProducto,
  getDataProveedores,
  getDataProductos,
  getDataClientes,
  getDataMetodosPago,
  getDataCanalesVenta,
  getDataPromociones,
  getDataEmpleados,
  getDataServicios,
  getDataVentasCabecera,
  getDataDetalleVentas,
  getDataServicioVentas,
  getDataInventario,
  getDataPedidosOnline
} from '../controllers/controller';

const router = Router();

// Rutas GET por tabla
//
router.post('/login', loginController);
router.get('/sucursales', verifyToken, getDataSucursales);
router.get('/tiempo', verifyToken, getDataTiempo);
router.get('/categorias-producto', verifyToken, getDataCategoriaProducto);
router.get('/proveedores', verifyToken, getDataProveedores);
router.get('/productos', verifyToken, getDataProductos);
router.get('/clientes', verifyToken, getDataClientes);
router.get('/metodos-pago', verifyToken, getDataMetodosPago);
router.get('/canales-venta', verifyToken, getDataCanalesVenta);
router.get('/promociones', verifyToken, getDataPromociones);
router.get('/empleados', verifyToken, getDataEmpleados);
router.get('/servicios', verifyToken, getDataServicios);
router.get('/ventas-cabecera', verifyToken, getDataVentasCabecera);
router.get('/detalle-ventas', verifyToken, getDataDetalleVentas);
router.get('/servicio-ventas', verifyToken, getDataServicioVentas);
router.get('/inventario', verifyToken, getDataInventario);
router.get('/pedidos-online', verifyToken, getDataPedidosOnline);

export default router;


//

*/

import { Router } from 'express';
import { verifyToken } from '../middlewares/auth';
import { loginController } from '../controllers/authController';
import { generateAzureController } from '../controllers/controller';


const router = Router();

router.post('/login', loginController);

// Ruta para blob con parámetro específico
router.get('/blob/:filename', verifyToken, (req, res) => {
  const blobPath = req.params.filename;
  if (!blobPath) {
    res.status(400).json({ message: 'Falta el nombre del archivo' });
    return;
  }
  req.params.blobPath = blobPath;
  generateAzureController(req, res);
});


export default router;