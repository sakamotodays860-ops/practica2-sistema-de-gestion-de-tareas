const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'syslab-secret-2026';

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3001'
}));

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Backend SysLab 2.0 funcionando',
  });
});

// ===============================
// MIDDLEWARE DE AUTENTICACIÓN
// ===============================
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      mensaje: 'Token no proporcionado',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const usuario = jwt.verify(token, JWT_SECRET);

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: 'Token inválido o expirado',
    });
  }
}

// ===============================
// LOGIN
// ===============================
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        mensaje: 'Correo y contraseña son obligatorios',
      });
    }

    const usuario = await prisma.user.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({
        mensaje: 'Credenciales incorrectas',
      });
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValida) {
      return res.status(401).json({
        mensaje: 'Credenciales incorrectas',
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      JWT_SECRET,
      {
        expiresIn: '2h',
      }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);

    res.status(500).json({
      mensaje: 'Error interno del servidor',
    });
  }
});

// ===============================
// LISTAR TAREAS
// ===============================
app.get('/api/tasks', verificarToken, async (req, res) => {
  try {
    const tareas = await prisma.task.findMany({
      where: {
        userId: req.usuario.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener tareas:', error);

    res.status(500).json({
      mensaje: 'Error al obtener las tareas',
    });
  }
});

// ===============================
// CREAR TAREA
// ===============================
app.post('/api/tasks', verificarToken, async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      prioridad,
    } = req.body;

    if (!titulo || !prioridad) {
      return res.status(400).json({
        mensaje: 'Título y prioridad son obligatorios',
      });
    }

    const prioridadesValidas = ['ALTA', 'MEDIA', 'BAJA'];

    if (!prioridadesValidas.includes(prioridad)) {
      return res.status(400).json({
        mensaje: 'La prioridad debe ser ALTA, MEDIA o BAJA',
      });
    }

    const tarea = await prisma.task.create({
      data: {
        titulo,
        descripcion: descripcion || null,
        prioridad,
        userId: req.usuario.id,
      },
    });

    res.status(201).json({
      mensaje: 'Tarea creada exitosamente',
      tarea,
    });
  } catch (error) {
    console.error('Error al crear tarea:', error);

    res.status(500).json({
      mensaje: 'Error al crear la tarea',
    });
  }
});

// ===============================
// OBTENER UNA TAREA
// ===============================
app.get('/api/tasks/:id', verificarToken, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const tarea = await prisma.task.findFirst({
      where: {
        id,
        userId: req.usuario.id,
      },
    });

    if (!tarea) {
      return res.status(404).json({
        mensaje: 'Tarea no encontrada',
      });
    }

    res.json(tarea);
  } catch (error) {
    console.error('Error al obtener tarea:', error);

    res.status(500).json({
      mensaje: 'Error al obtener la tarea',
    });
  }
});

// ===============================
// ACTUALIZAR ESTADO DE TAREA
// ===============================
app.patch('/api/tasks/:id/status', verificarToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { completada } = req.body;

    if (typeof completada !== 'boolean') {
      return res.status(400).json({
        mensaje: 'El estado debe ser true o false',
      });
    }

    const tareaExistente = await prisma.task.findFirst({
      where: {
        id,
        userId: req.usuario.id,
      },
    });

    if (!tareaExistente) {
      return res.status(404).json({
        mensaje: 'Tarea no encontrada',
      });
    }

    const tarea = await prisma.task.update({
      where: {
        id,
      },
      data: {
        completada,
      },
    });

    res.json({
      mensaje: 'Estado actualizado correctamente',
      tarea,
    });
  } catch (error) {
    console.error('Error al actualizar estado:', error);

    res.status(500).json({
      mensaje: 'Error al actualizar el estado',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
