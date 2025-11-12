import { Carrito } from '../models/Carrito.js';

export const carritoController = {
  async getByUsuario(req, res) {
    try {
      const items = await Carrito.getByUsuario(req.params.usuarioId);
      const total = await Carrito.getTotal(req.params.usuarioId);
      res.json({ items, total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async addItem(req, res) {
    try {
      const { usuarioId, productoId } = req.params;
      const { cantidad } = req.body;
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
      const item = await Carrito.updateItem(usuarioId, productoId, cantidad);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async removeItem(req, res) {
    try {
      const { usuarioId, productoId } = req.params;
      await Carrito.removeItem(usuarioId, productoId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async clear(req, res) {
    try {
      await Carrito.clear(req.params.usuarioId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

