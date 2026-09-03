// backend/prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Crear un usuario de prueba
  const usuario = await prisma.user.upsert({
    where: { email: 'estudiante@ejemplo.com' },
    update: {},
    create: {
      email: 'estudiante@ejemplo.com',
      nombre: 'Estudiante SysLab',
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

  console.log('✅ Base de datos poblada exitosamente con el usuario y tareas iniciales:', usuario);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });