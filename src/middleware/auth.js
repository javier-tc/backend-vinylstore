import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario.js';

//middleware de autenticación JWT
export const authenticate = async (req, res, next) => {
  try {
    //obtener token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token de autenticación requerido' });
    }

    const token = authHeader.substring(7); //remover "Bearer " del inicio

    if (!token) {
      return res.status(401).json({ error: 'Token de autenticación requerido' });
    }

    //verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secret_key_muy_segura_cambiar_en_produccion');
    
    //buscar usuario en la base de datos para verificar que aún existe y está activo
    const usuario = await Usuario.getById(decoded.userId);
    
    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    if (!usuario.activo) {
      return res.status(403).json({ error: 'Usuario inactivo' });
    }

    //añadir información del usuario al request para uso en controladores
    req.user = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      nombre: usuario.nombre,
      apellido: usuario.apellido
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    return res.status(500).json({ error: 'Error al verificar token' });
  }
};

