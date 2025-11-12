import { Categoria } from '../models/Categoria.js';

export const categoriaController = {
  async getAll(req, res) {
    try {
      const categorias = await Categoria.getAll();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const categoria = await Categoria.getById(req.params.id);
      if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const categoria = await Categoria.create(req.body);
      res.status(201).json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const categoria = await Categoria.update(req.params.id, req.body);
      if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await Categoria.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

