//middleware de autorización por roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    //verificar que el usuario esté autenticado (debe pasar por authenticate primero)
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    //verificar que el usuario tenga uno de los roles permitidos
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ 
        error: 'Acceso denegado. No tienes permisos para realizar esta acción' 
      });
    }

    next();
  };
};

