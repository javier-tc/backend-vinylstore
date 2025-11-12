import { Blog } from '../models/Blog.js';

export const blogController = {
  async getAll(req, res) {
    try {
      const publicado = req.query.publicado !== undefined ? req.query.publicado === 'true' : null;
      const blogs = await Blog.getAll(publicado);
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const blog = await Blog.getById(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog no encontrado' });
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const blog = await Blog.create(req.body);
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const blog = await Blog.update(req.params.id, req.body);
      if (!blog) {
        return res.status(404).json({ error: 'Blog no encontrado' });
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await Blog.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

