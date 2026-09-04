# 🚀 Sistema de Gestión de Tareas — SysLab 2.0

> **Integrantes del Grupo:**
> * [Helen Abigail Soto Renjifo] - [e123181]

> **Materia:** Sistemas Paralelos  
> **Docente:** Ing. Elias Cassal Baldiviezo  
> **Arquitectura Base:** SysLab 2.0  

---

## 📌 Descripción del Proyecto
Sistema full-stack para la gestión de tareas priorizadas desarrollado bajo la arquitectura SysLab 2.0. Permite la administración, priorización y seguimiento de actividades en tiempo real.

---

## 🛠️ Tecnologías y Arquitectura
* **Frontend:** Node.js / Express (Puerto 3000)
* **Backend:** Node.js / Express (Puerto 4000)
* **Base de Datos:** PostgreSQL con Prisma ORM (Puerto 5432)
* **Orquestación:** Docker Compose para la gestión de multi-contenedores

---

## 📁 Estructura del Repositorio
```text
.
├── agente/                 # Reglas y habilidades del agente de IA
├── backend/                # API REST, configuración de Prisma y Dockerfile
├── frontend/               # Interfaz de usuario y Dockerfile
├── docker-compose.yml      # Orquestación de servicios
└── README.md               # Documentación general
