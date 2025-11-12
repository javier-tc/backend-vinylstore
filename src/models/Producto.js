import pool from '../config/database.js';

export const Producto = {
  async getAll(activo = null) {
    let query = 'SELECT * FROM vista_productos_completos';
    const params = [];
    
    if (activo !== null) {
      query += ' WHERE activo = ?';
      params.push(activo);
    }
    
    query += ' ORDER BY fecha_creacion DESC';
    const [rows] = await pool.execute(query, params);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute('SELECT * FROM vista_productos_completos WHERE id = ?', [id]);
    return rows[0];
  },

  async getByCategoria(categoriaId) {
    const [rows] = await pool.execute(
      'SELECT * FROM vista_productos_completos WHERE categoria_id = ? AND activo = TRUE ORDER BY nombre',
      [categoriaId]
    );
    return rows;
  },

  async getByArtista(artista) {
    const [rows] = await pool.execute(
      'SELECT * FROM vista_productos_completos WHERE artista LIKE ? AND activo = TRUE',
      [`%${artista}%`]
    );
    return rows;
  },

  async create(productoData) {
    const { nombre, artista, precio, categoria_id, stock, descripcion, imagen } = productoData;
    const [result] = await pool.execute(
      'INSERT INTO productos (nombre, artista, precio, categoria_id, stock, descripcion, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, artista, precio, categoria_id || null, stock || 0, descripcion || null, imagen || null]
    );
    return this.getById(result.insertId);
  },

  async update(id, productoData) {
    const { nombre, artista, precio, categoria_id, stock, descripcion, imagen, activo } = productoData;
    const updates = [];
    const values = [];

    if (nombre !== undefined) { updates.push('nombre = ?'); values.push(nombre); }
    if (artista !== undefined) { updates.push('artista = ?'); values.push(artista); }
    if (precio !== undefined) { updates.push('precio = ?'); values.push(precio); }
    if (categoria_id !== undefined) { updates.push('categoria_id = ?'); values.push(categoria_id); }
    if (stock !== undefined) { updates.push('stock = ?'); values.push(stock); }
    if (descripcion !== undefined) { updates.push('descripcion = ?'); values.push(descripcion); }
    if (imagen !== undefined) { updates.push('imagen = ?'); values.push(imagen); }
    if (activo !== undefined) { updates.push('activo = ?'); values.push(activo); }

    if (updates.length === 0) return this.getById(id);

    values.push(id);
    await pool.execute(`UPDATE productos SET ${updates.join(', ')} WHERE id = ?`, values);
    return this.getById(id);
  },

  async delete(id) {
    await pool.execute('DELETE FROM productos WHERE id = ?', [id]);
  }
};

