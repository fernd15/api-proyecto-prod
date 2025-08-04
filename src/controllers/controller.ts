/*
import { Request, Response } from 'express';
import { pool } from '../database/mysql';

// Función generadora
const generateController = (table: string, alias: string) => async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM ${table}`);
    res.json(rows);
  } catch (error) {
    console.error(`Error al obtener ${alias}:`, error);
    res.status(500).json({ message: `Error al obtener ${alias}` });
  }
};
*/
import { Request, Response } from 'express';
import { getBlobCSVContent } from '../utils/blobClient';
import { parse } from 'csv-parse/sync';

// Controlador dinámico para cualquier ruta de blob
export const generateAzureController = async (req: Request, res: Response) => {
  const blobPath = req.params.blobPath;
  if (!blobPath) {
    res.status(400).json({ message: 'Falta el nombre del archivo' });
    return;
  }
  try {
    const rawCSV = await getBlobCSVContent("raw", blobPath);
    const records = parse(rawCSV, {
      columns: true,
      skip_empty_lines: true
    });
    res.json(records);
  } catch (error) {
    console.error(`Error al obtener archivo:`, error);
    res.status(500).json({ message: `Error al obtener archivo` });
  }
};


/*
export const getDataSucursales = generateController('pract_09_Data_Sucursal', 'sucursales'); 
export const getDataTiempo = generateController('pract_09_Data_Tiempo', 'tiempo');
export const getDataCategoriaProducto = generateController('pract_09_Data_CategoriaProducto', 'categoria_producto');
export const getDataProveedores = generateController('pract_09_Data_Proveedores', 'proveedores');
export const getDataProductos = generateController('pract_09_Data_Productos', 'productos');
export const getDataClientes = generateController('pract_09_Data_Clientes', 'clientes');
export const getDataMetodosPago = generateController('pract_09_Data_MetodosPago', 'metodos_pago');
export const getDataCanalesVenta = generateController('pract_09_Data_CanalesVenta', 'canales_venta');
export const getDataPromociones = generateController('pract_09_Data_Promociones', 'promociones');
export const getDataEmpleados = generateController('pract_09_Data_Empleados', 'empleados');
export const getDataServicios = generateController('pract_09_Data_Servicios', 'servicios');
export const getDataVentasCabecera = generateController('pract_09_Data_VentasCabecera', 'ventas_cabecera');
export const getDataDetalleVentas = generateController('pract_09_Data_DetalleVentas', 'detalle_ventas');
export const getDataServicioVentas = generateController('pract_09_Data_ServicioVentas', 'servicio_ventas');
export const getDataInventario = generateController('pract_09_Data_Inventario', 'inventario');
export const getDataPedidosOnline = generateController('pract_09_Data_PedidosOnline', 'pedidos_online');
*/