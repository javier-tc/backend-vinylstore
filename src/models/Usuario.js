import pool from '../config/database.js';
import bcrypt from 'bcrypt';

export const Usuario = {
  async getAll() {
    const [rows] = await pool.execute('SELECT id, nombre, apellido, email, telefono, direccion, region, comuna, rol, activo, fecha_creacion FROM usuarios');
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.execute(
      'SELECT id, nombre, apellido, email, telefono, direccion, region, comuna, rol, activo, fecha_creacion FROM usuarios WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async getByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  },

  async create(usuarioData) {
    const { nombre, apellido, email, password, telefono, direccion, region, comuna, rol } = usuarioData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO usuarios (nombre, apellido, email, password, telefono, direccion, region, comuna, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, email, hashedPassword, telefono || null, direccion || null, region || null, comuna || null, rol || 'Usuario']
    );
    return this.getById(result.insertId);
  },

  async update(id, usuarioData) {
    const { nombre, apellido, email, telefono, direccion, region, comuna, rol, activo } = usuarioData;
    const updates = [];
    const values = [];

    if (nombre !== undefined) { updates.push('nombre = ?'); values.push(nombre); }
    if (apellido !== undefined) { updates.push('apellido = ?'); values.push(apellido); }
    if (email !== undefined) { updates.push('email = ?'); values.push(email); }
    if (telefono !== undefined) { updates.push('telefono = ?'); values.push(telefono); }
    if (direccion !== undefined) { updates.push('direccion = ?'); values.push(direccion); }
    if (region !== undefined) { updates.push('region = ?'); values.push(region); }
    if (comuna !== undefined) { updates.push('comuna = ?'); values.push(comuna); }
    if (rol !== undefined) { updates.push('rol = ?'); values.push(rol); }
    if (activo !== undefined) { updates.push('activo = ?'); values.push(activo); }

    if (updates.length === 0) return this.getById(id);

    values.push(id);
    await pool.execute(`UPDATE usuarios SET ${updates.join(', ')} WHERE id = ?`, values);
    return this.getById(id);
  },

  async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.execute('UPDATE usuarios SET password = ? WHERE id = ?', [hashedPassword, id]);
  },

  async delete(id) {
    await pool.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  },

  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
};

