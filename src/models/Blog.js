import pool from '../config/database.js';

export const Blog = {
  async getAll(publicado = null) {
    let query = `
      SELECT b.*, CONCAT(u.nombre, ' ', u.apellido) AS autor_nombre 
      FROM blogs b
      LEFT JOIN usuarios u ON b.autor_id = u.id
    `;
    const params = [];

    if (publicado !== null) {
      query += ' WHERE publicado = ?';
      params.push(publicado);
    }

    query += ' ORDER BY fecha_creacion DESC';
    const [rows] = await pool.execute(query, params);
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute(
      `SELECT b.*, CONCAT(u.nombre, ' ', u.apellido) AS autor_nombre 
       FROM blogs b
       LEFT JOIN usuarios u ON b.autor_id = u.id
       WHERE b.id = ?`,
      [id]
    );
    return rows[0];
  },

  async create(blogData) {
    const { titulo, contenido, excerpt, imagen, autor_id, publicado, fecha_publicacion } = blogData;
    const [result] = await pool.execute(
      'INSERT INTO blogs (titulo, contenido, excerpt, imagen, autor_id, publicado, fecha_publicacion) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [titulo, contenido, excerpt || null, imagen || null, autor_id || null, publicado || false, fecha_publicacion || null]
    );
    return this.getById(result.insertId);
  },

  async update(id, blogData) {
    const { titulo, contenido, excerpt, imagen, autor_id, publicado, fecha_publicacion } = blogData;
    const updates = [];
    const values = [];

    if (titulo !== undefined) { updates.push('titulo = ?'); values.push(titulo); }
    if (contenido !== undefined) { updates.push('contenido = ?'); values.push(contenido); }
    if (excerpt !== undefined) { updates.push('excerpt = ?'); values.push(excerpt); }
    if (imagen !== undefined) { updates.push('imagen = ?'); values.push(imagen); }
    if (autor_id !== undefined) { updates.push('autor_id = ?'); values.push(autor_id); }
    if (publicado !== undefined) { updates.push('publicado = ?'); values.push(publicado); }
    if (fecha_publicacion !== undefined) { updates.push('fecha_publicacion = ?'); values.push(fecha_publicacion); }

    if (updates.length === 0) return this.getById(id);

    values.push(id);
    await pool.execute(`UPDATE blogs SET ${updates.join(', ')} WHERE id = ?`, values);
    return this.getById(id);
  },

  async delete(id) {
    await pool.execute('DELETE FROM blogs WHERE id = ?', [id]);
  }
};

