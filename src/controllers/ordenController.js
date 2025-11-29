import { Orden } from '../models/Orden.js';
import { Carrito } from '../models/Carrito.js';

export const ordenController = {
  async getAll(req, res) {
    try {
      const usuarioId = req.query.usuarioId || null;
      const ordenes = await Orden.getAll(usuarioId);
      res.json(ordenes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const orden = await Orden.getById(req.params.id);
      if (!orden) {
        return res.status(404).json({ error: 'Orden no encontrada' });
      }
      const items = await Orden.getItems(req.params.id);
      res.json({ ...orden, items });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const userId = req.user.id;
      const { usuario_id } = req.body;

      //verificar que el usuario solo pueda crear órdenes para sí mismo
      if (usuario_id && parseInt(usuario_id) !== userId && req.user.rol !== 'Administrador') {
        return res.status(403).json({ error: 'No tienes permisos para crear órdenes para este usuario' });
      }

      //si no se especifica usuario_id, usar el del token
      if (!usuario_id) {
        req.body.usuario_id = userId;
      }

      const orden = await Orden.create(req.body);
      res.status(201).json(orden);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createFromCarrito(req, res) {
    try {
      const { usuarioId } = req.params;
      const { direccion_envio, telefono_contacto, notas } = req.body;
      const userId = req.user.id;

      //verificar que el usuario solo pueda crear órdenes para sí mismo
      if (parseInt(usuarioId) !== userId && req.user.rol !== 'Administrador') {
        return res.status(403).json({ error: 'No tienes permisos para crear órdenes para este usuario' });
      }

      const carritoItems = await Carrito.getByUsuario(usuarioId);
      if (carritoItems.length === 0) {
        return res.status(400).json({ error: 'El carrito está vacío' });
      }

      const items = carritoItems.map(item => ({
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        subtotal: item.precio * item.cantidad
      }));

      const total = items.reduce((sum, item) => sum + item.subtotal, 0);

      const ordenData = {
        usuario_id: usuarioId,
        total,
        direccion_envio,
        telefono_contacto,
        notas,
        items
      };

      const orden = await Orden.create(ordenData);
      await Carrito.clear(usuarioId);

      const ordenCompleta = await Orden.getById(orden.id);
      const ordenItems = await Orden.getItems(orden.id);

      res.status(201).json({ ...ordenCompleta, items: ordenItems });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const orden = await Orden.update(req.params.id, req.body);
      if (!orden) {
        return res.status(404).json({ error: 'Orden no encontrada' });
      }
      res.json(orden);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await Orden.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

