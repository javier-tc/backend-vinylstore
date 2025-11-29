import { Usuario } from '../models/Usuario.js';

export const usuarioController = {
  async getAll(req, res) {
    try {
      const usuarios = await Usuario.getAll();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const usuario = await Usuario.getById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { nombre, apellido, email, password, rol } = req.body;

      //validar campos requeridos
      if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ 
          error: 'Faltan campos requeridos: nombre, apellido, email y password son obligatorios' 
        });
      }

      //validar formato de email básico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'El formato del email no es válido' });
      }

      //validar que el email no exista
      const usuarioExistente = await Usuario.getByEmail(email);
      if (usuarioExistente) {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }

      //validar longitud mínima de password
      if (password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
      }

      //validar rol si se proporciona
      if (rol && rol !== 'Usuario' && rol !== 'Administrador') {
        return res.status(400).json({ 
          error: 'El rol debe ser "Usuario" o "Administrador"' 
        });
      }

      const usuario = await Usuario.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      //manejar errores de base de datos (ej: constraint violations)
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }
      res.status(500).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      //validar campos requeridos
      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email y contraseña son requeridos' 
        });
      }

      //buscar usuario por email
      const usuario = await Usuario.getByEmail(email);
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      //verificar si el usuario está activo
      if (!usuario.activo) {
        return res.status(403).json({ error: 'Usuario inactivo' });
      }

      //verificar contraseña
      const passwordValido = await Usuario.verifyPassword(password, usuario.password);
      if (!passwordValido) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      //retornar usuario sin password
      const { password: _, ...usuarioSinPassword } = usuario;
      res.json({
        message: 'Login exitoso',
        usuario: usuarioSinPassword
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const usuario = await Usuario.update(req.params.id, req.body);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await Usuario.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

