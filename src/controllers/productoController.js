import { Producto } from '../models/Producto.js';

export const productoController = {
  async getAll(req, res) {
    try {
      const activo = req.query.activo !== undefined ? req.query.activo === 'true' : null;
      const productos = await Producto.getAll(activo);
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const producto = await Producto.getById(req.params.id);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getByCategoria(req, res) {
    try {
      const productos = await Producto.getByCategoria(req.params.categoriaId);
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getByArtista(req, res) {
    try {
      const productos = await Producto.getByArtista(req.query.artista);
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const producto = await Producto.create(req.body);
      res.status(201).json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const producto = await Producto.update(req.params.id, req.body);
      if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await Producto.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

