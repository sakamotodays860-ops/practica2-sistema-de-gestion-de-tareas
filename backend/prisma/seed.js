const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('SysLab2026*', 10);

  const usuario = await prisma.user.upsert({
    where: { email: 'estudiante@ejemplo.com' },
    update: {
      password: passwordHash,
    },
    create: {
      email: 'estudiante@ejemplo.com',
      nombre: 'Estudiante SysLab',
      password: passwordHash,
      tasks: {
        create: [
          {
            titulo: 'Configurar arquitectura SysLab 2.0',
            descripcion: 'Instalar Docker y configurar servicios backend/frontend',
            prioridad: 'ALTA',
            completada: false,
          },
          {
            titulo: 'Diseñar schema.prisma para Gestión de Tareas',
            descripcion: 'Definir modelos de datos User y Task',
            prioridad: 'MEDIA',
            completada: true,
          },
        ],
      },
    },
  });

  console.log(
    '✅ Base de datos poblada exitosamente:',
    usuario.email
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
