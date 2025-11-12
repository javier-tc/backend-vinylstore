import pool from '../config/database.js';

export const Carrito = {
  async getByUsuario(usuarioId) {
    const [rows] = await pool.execute(
      `SELECT c.*, p.nombre, p.artista, p.precio, p.imagen, p.stock 
       FROM carrito c
       INNER JOIN productos p ON c.producto_id = p.id
       WHERE c.usuario_id = ?`,
      [usuarioId]
    );
    return rows;
  },

  async getItem(usuarioId, productoId) {
    const [rows] = await pool.execute(
      'SELECT * FROM carrito WHERE usuario_id = ? AND producto_id = ?',
      [usuarioId, productoId]
    );
    return rows[0];
  },

  async addItem(usuarioId, productoId, cantidad = 1) {
    const existingItem = await this.getItem(usuarioId, productoId);
    
    if (existingItem) {
      const [result] = await pool.execute(
        'UPDATE carrito SET cantidad = cantidad + ? WHERE usuario_id = ? AND producto_id = ?',
        [cantidad, usuarioId, productoId]
      );
      return this.getItem(usuarioId, productoId);
    } else {
      const [result] = await pool.execute(
        'INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)',
        [usuarioId, productoId, cantidad]
      );
      return this.getItem(usuarioId, productoId);
    }
  },

  async updateItem(usuarioId, productoId, cantidad) {
    await pool.execute(
      'UPDATE carrito SET cantidad = ? WHERE usuario_id = ? AND producto_id = ?',
      [cantidad, usuarioId, productoId]
    );
    return this.getItem(usuarioId, productoId);
  },

  async removeItem(usuarioId, productoId) {
    await pool.execute(
      'DELETE FROM carrito WHERE usuario_id = ? AND producto_id = ?',
      [usuarioId, productoId]
    );
  },

  async clear(usuarioId) {
    await pool.execute('DELETE FROM carrito WHERE usuario_id = ?', [usuarioId]);
  },

  async getTotal(usuarioId) {
    const [rows] = await pool.execute(
      `SELECT SUM(p.precio * c.cantidad) AS total
       FROM carrito c
       INNER JOIN productos p ON c.producto_id = p.id
       WHERE c.usuario_id = ?`,
      [usuarioId]
    );
    return rows[0]?.total || 0;
  }
};

