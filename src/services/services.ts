import { pool } from "../config/db";

// Utilidad para ejecutar una consulta SELECT
async function queryAll(tableName: string) {
  const [rows] = await pool.query(`SELECT * FROM ${tableName}`);
  return rows;
}

// Servicios para cada tabla
export const dbServices = {
  getAllSucursales: () => queryAll("pract_09_Data_Sucursal"),
  getAllTiempo: () => queryAll("pract_09_Data_Tiempo"),
  getAllCategoriaProducto: () => queryAll("pract_09_Data_CategoriaProducto"),
  getAllProveedores: () => queryAll("pract_09_Data_Proveedor"),
  getAllProductos: () => queryAll("pract_09_Data_Producto"),
  getAllClientes: () => queryAll("pract_09_Data_Cliente"),
  getAllMetodosPago: () => queryAll("pract_09_Data_MetodoPago"),
  getAllCanalesVenta: () => queryAll("pract_09_Data_CanalVenta"),
  getAllPromociones: () => queryAll("pract_09_Data_Promocion"),
  getAllEmpleados: () => queryAll("pract_09_Data_Empleado"),
  getAllServicios: () => queryAll("pract_09_Data_Servicio"),
  getAllVentasCabecera: () => queryAll("pract_09_Data_Fact_VentaCabecera"),
  getAllDetalleVentas: () => queryAll("pract_09_Hechos_DetalleVenta"),
  getAllServicioVentas: () => queryAll("pract_09_Data_Fact_ServicioVenta"),
  getAllInventario: () => queryAll("pract_09_Hechos_Inventario"),
  getAllPedidosOnline: () => queryAll("pract_09_Hechos_PedidosOnline")
};
