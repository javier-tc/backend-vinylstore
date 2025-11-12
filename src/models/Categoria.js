import pool from '../config/database.js';

export const Categoria = {
  async getAll() {
    const [rows] = await pool.execute('SELECT * FROM categorias ORDER BY nombre');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows[0];
  },

  async create(categoriaData) {
    const { nombre, descripcion } = categoriaData;
    const [result] = await pool.execute(
      'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion || null]
    );
    return this.getById(result.insertId);
  },

  async update(id, categoriaData) {
    const { nombre, descripcion } = categoriaData;
    const updates = [];
    const values = [];

    if (nombre !== undefined) { updates.push('nombre = ?'); values.push(nombre); }
    if (descripcion !== undefined) { updates.push('descripcion = ?'); values.push(descripcion); }

    if (updates.length === 0) return this.getById(id);

    values.push(id);
    await pool.execute(`UPDATE categorias SET ${updates.join(', ')} WHERE id = ?`, values);
    return this.getById(id);
  },

  async delete(id) {
    await pool.execute('DELETE FROM categorias WHERE id = ?', [id]);
  }
};

