import pool from '../config/database.js';

export const Orden = {
  async getAll(usuarioId = null) {
    let query = 'SELECT * FROM vista_ordenes_completas';
    const params = [];

    if (usuarioId) {
      query += ' WHERE usuario_id = ?';
      params.push(usuarioId);
    }

    query += ' ORDER BY fecha_creacion DESC';
    const [rows] = await pool.execute(query, params);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM vista_ordenes_completas WHERE id = ?', [id]);
    return rows[0];
  },

  async getItems(ordenId) {
    const [rows] = await pool.execute(
      `SELECT oi.*, p.nombre, p.artista, p.imagen
       FROM orden_items oi
       INNER JOIN productos p ON oi.producto_id = p.id
       WHERE oi.orden_id = ?`,
      [ordenId]
    );
    return rows;
  },

  async create(ordenData) {
    const { usuario_id, total, direccion_envio, telefono_contacto, notas, items } = ordenData;
    
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.execute(
        'INSERT INTO ordenes (usuario_id, total, direccion_envio, telefono_contacto, notas) VALUES (?, ?, ?, ?, ?)',
        [usuario_id, total, direccion_envio || null, telefono_contacto || null, notas || null]
      );

      const ordenId = result.insertId;

      for (const item of items) {
        await connection.execute(
          'INSERT INTO orden_items (orden_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
          [ordenId, item.producto_id, item.cantidad, item.precio_unitario, item.subtotal]
        );
      }

      await connection.commit();
      return this.getById(ordenId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async update(id, ordenData) {
    const { estado, direccion_envio, telefono_contacto, notas } = ordenData;
    const updates = [];
    const values = [];

    if (estado !== undefined) { updates.push('estado = ?'); values.push(estado); }
    if (direccion_envio !== undefined) { updates.push('direccion_envio = ?'); values.push(direccion_envio); }
    if (telefono_contacto !== undefined) { updates.push('telefono_contacto = ?'); values.push(telefono_contacto); }
    if (notas !== undefined) { updates.push('notas = ?'); values.push(notas); }

    if (updates.length === 0) return this.getById(id);

    values.push(id);
    await pool.execute(`UPDATE ordenes SET ${updates.join(', ')} WHERE id = ?`, values);
    return this.getById(id);
  },

  async delete(id) {
    await pool.execute('DELETE FROM ordenes WHERE id = ?', [id]);
  }
};

