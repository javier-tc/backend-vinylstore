import { Carrito } from '../models/Carrito.js';

export const carritoController = {
  async getByUsuario(req, res) {
    try {
      const { usuarioId } = req.params;
      const userId = req.user.id;

      //verificar que el usuario solo pueda acceder a su propio carrito
      //o que sea administrador
      if (parseInt(usuarioId) !== userId && req.user.rol !== 'Administrador') {
        return res.status(403).json({ error: 'No tienes permisos para acceder a este carrito' });
      }

      const items = await Carrito.getByUsuario(usuarioId);
      const total = await Carrito.getTotal(usuarioId);
      res.json({ items, total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addItem(req, res) {
    try {
      const { usuarioId, productoId } = req.params;
      const { cantidad } = req.body;
      const userId = req.user.id;

      //verificar que el usuario solo pueda modificar su propio carrito
      if (parseInt(usuarioId) !== userId && req.user.rol !== 'Administrador') {
        return res.status(403).json({ error: 'No tienes permisos para modificar este carrito' });
      }

      const item = await Carrito.addItem(usuarioId, productoId, cantidad || 1);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateItem(req, res) {
    try {
      const { usuarioId, productoId } = req.params;
      const { cantidad } = req.body;
      const userId = req.user.id;

      //verificar que el usuario solo pueda modificar su propio carrito
      if (parseInt(usuarioId) !== userId && req.user.rol !== 'Administrador') {
        return res.status(403).json({ error: 'No tienes permisos para modificar este carrito' });
      }

      const item = await Carrito.updateItem(usuarioId, productoId, cantidad);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async removeItem(req, res) {
    try {
      const { usuarioId, productoId } = req.params;
      const userId = req.user.id;

      //verificar que el usuario solo pueda modificar su propio carrito
      if (parseInt(usuarioId) !== userId && req.user.rol !== 'Administrador') {
        return res.status(403).json({ error: 'No tienes permisos para modificar este carrito' });
      }

      await Carrito.removeItem(usuarioId, productoId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async clear(req, res) {
    try {
      const { usuarioId } = req.params;
      const userId = req.user.id;

      //verificar que el usuario solo pueda modificar su propio carrito
      if (parseInt(usuarioId) !== userId && req.user.rol !== 'Administrador') {
        return res.status(403).json({ error: 'No tienes permisos para modificar este carrito' });
      }

      await Carrito.clear(usuarioId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

