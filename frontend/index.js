const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SysLab 2.0 - Gestión de Tareas</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body {
      min-height: 100vh;
      background: #0f172a;
      color: #e2e8f0;
    }

    button {
      cursor: pointer;
    }

    #loginView {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .login-container {
      width: 400px;
      background: #1e293b;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 20px 50px rgba(0,0,0,.4);
    }

    .logo {
      text-align: center;
      margin-bottom: 30px;
    }

    .logo h1 {
      color: #38bdf8;
      font-size: 32px;
      margin-bottom: 8px;
    }

    .logo p {
      color: #94a3b8;
      font-size: 14px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #cbd5e1;
      font-size: 14px;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 13px;
      border: 1px solid #475569;
      border-radius: 8px;
      background: #0f172a;
      color: white;
      outline: none;
      font-size: 15px;
    }

    input:focus,
    select:focus,
    textarea:focus {
      border-color: #38bdf8;
    }

    textarea {
      min-height: 90px;
      resize: vertical;
    }

    .primary-button {
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 8px;
      background: #0284c7;
      color: white;
      font-size: 16px;
      font-weight: bold;
    }

    .primary-button:hover {
      background: #0369a1;
    }

    #loginMessage,
    #taskMessage {
      margin-top: 15px;
      text-align: center;
      font-size: 14px;
      min-height: 20px;
    }

    .error {
      color: #f87171;
    }

    .success {
      color: #4ade80;
    }

    #dashboardView {
      display: none;
      min-height: 100vh;
    }

    .layout {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 240px;
      background: #111827;
      border-right: 1px solid #334155;
      padding: 25px 15px;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
    }

    .sidebar-logo {
      padding: 0 15px 30px;
    }

    .sidebar-logo h2 {
      color: #38bdf8;
      font-size: 24px;
    }

    .sidebar-logo span {
      color: #64748b;
      font-size: 12px;
    }

    .menu-title {
      color: #64748b;
      font-size: 11px;
      padding: 10px 15px;
      margin-bottom: 5px;
    }

    .menu-item {
      width: 100%;
      background: transparent;
      border: none;
      color: #cbd5e1;
      text-align: left;
      padding: 13px 15px;
      border-radius: 8px;
      margin-bottom: 5px;
      font-size: 14px;
    }

    .menu-item:hover,
    .menu-item.active {
      background: #1e293b;
      color: #38bdf8;
    }

    .logout-button {
      position: absolute;
      bottom: 25px;
      left: 15px;
      width: calc(100% - 30px);
      background: #1e293b;
      border: 1px solid #334155;
      color: #f87171;
      padding: 12px;
      border-radius: 8px;
    }

    .main {
      margin-left: 240px;
      width: calc(100% - 240px);
      padding: 30px;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .topbar h1 {
      font-size: 28px;
      color: white;
    }

    .topbar p {
      color: #64748b;
      margin-top: 5px;
    }

    .user-info {
      background: #1e293b;
      border: 1px solid #334155;
      padding: 10px 15px;
      border-radius: 8px;
      color: #cbd5e1;
      font-size: 14px;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 22px;
    }

    .stat-card .label {
      color: #94a3b8;
      font-size: 13px;
      margin-bottom: 10px;
    }

    .stat-card .number {
      color: white;
      font-size: 30px;
      font-weight: bold;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 20px;
    }

    .panel {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 22px;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .panel-header h2 {
      font-size: 18px;
      color: white;
    }

    .refresh-button {
      background: transparent;
      border: 1px solid #475569;
      color: #94a3b8;
      padding: 8px 12px;
      border-radius: 6px;
    }

    .task {
      border: 1px solid #334155;
      background: #172033;
      border-radius: 10px;
      padding: 17px;
      margin-bottom: 12px;
    }

    .task-title {
      color: white;
      font-weight: bold;
      font-size: 15px;
    }

    .task-description {
      color: #94a3b8;
      font-size: 13px;
      margin-top: 8px;
      line-height: 1.5;
    }

    .badges {
      display: flex;
      gap: 7px;
      margin-top: 14px;
    }

    .badge {
      padding: 5px 9px;
      border-radius: 5px;
      font-size: 11px;
      font-weight: bold;
    }

    .priority-alta {
      background: #7f1d1d;
      color: #fca5a5;
    }

    .priority-media {
      background: #78350f;
      color: #fcd34d;
    }

    .priority-baja {
      background: #14532d;
      color: #86efac;
    }

    .status-pendiente {
      background: #1e3a8a;
      color: #93c5fd;
    }

    .status-completada {
      background: #166534;
      color: #bbf7d0;
    }

    .task-actions {
      margin-top: 15px;
    }

    .status-button {
      border: 1px solid #475569;
      background: #0f172a;
      color: #cbd5e1;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
    }

    .empty {
      text-align: center;
      color: #64748b;
      padding: 35px 10px;
    }

    @media (max-width: 1000px) {
      .stats {
        grid-template-columns: repeat(2, 1fr);
      }

      .content-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 700px) {
      .sidebar {
        width: 70px;
      }

      .sidebar-logo span,
      .menu-title {
        display: none;
      }

      .main {
        margin-left: 70px;
        width: calc(100% - 70px);
        padding: 20px;
      }

      .stats {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>

<body>

<div id="loginView">

  <div class="login-container">

    <div class="logo">
      <h1>SysLab 2.0</h1>
      <p>Sistema de Gestión de Tareas</p>
    </div>

    <form id="loginForm">

      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          placeholder="estudiante@ejemplo.com"
          required
        >
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          required
        >
      </div>

      <button type="submit" class="primary-button">
        Iniciar sesión
      </button>

      <div id="loginMessage"></div>

    </form>

  </div>

</div>


<div id="dashboardView">

  <div class="layout">

    <aside class="sidebar">

      <div class="sidebar-logo">
        <h2>SysLab</h2>
        <span>Gestión de Tareas</span>
      </div>

      <div class="menu-title">MENÚ</div>

      <button class="menu-item active">
        ◈ &nbsp; Dashboard
      </button>

      <button class="menu-item">
        ✓ &nbsp; Tareas
      </button>

      <button class="logout-button" id="logoutButton">
        Cerrar sesión
      </button>

    </aside>


    <main class="main">

      <div class="topbar">

        <div>
          <h1>Dashboard</h1>
          <p>Resumen de tus tareas</p>
        </div>

        <div class="user-info" id="userInfo">
          Usuario
        </div>

      </div>


      <div class="stats">

        <div class="stat-card">
          <div class="label">TOTAL DE TAREAS</div>
          <div class="number" id="totalTasks">0</div>
        </div>

        <div class="stat-card">
          <div class="label">PENDIENTES</div>
          <div class="number" id="pendingTasks">0</div>
        </div>

        <div class="stat-card">
          <div class="label">COMPLETADAS</div>
          <div class="number" id="completedTasks">0</div>
        </div>

        <div class="stat-card">
          <div class="label">PRIORIDAD ALTA</div>
          <div class="number" id="highTasks">0</div>
        </div>

      </div>


      <div class="content-grid">

        <section class="panel">

          <div class="panel-header">
            <h2>Mis tareas</h2>

            <button
              class="refresh-button"
              id="refreshButton"
            >
              Actualizar
            </button>
          </div>

          <div id="tasksList">
            <div class="empty">
              Cargando tareas...
            </div>
          </div>

        </section>


        <section class="panel">

          <div class="panel-header">
            <h2>Nueva tarea</h2>
          </div>

          <form id="taskForm">

            <div class="form-group">
              <label for="taskTitle">Título</label>

              <input
                type="text"
                id="taskTitle"
                placeholder="Ej. Preparar informe"
                required
              >
            </div>

            <div class="form-group">
              <label for="taskDescription">Descripción</label>

              <textarea
                id="taskDescription"
                placeholder="Descripción de la tarea"
              ></textarea>
            </div>

            <div class="form-group">
              <label for="taskPriority">Prioridad</label>

              <select id="taskPriority">

                <option value="ALTA">
                  ALTA
                </option>

                <option value="MEDIA" selected>
                  MEDIA
                </option>

                <option value="BAJA">
                  BAJA
                </option>

              </select>
            </div>

            <button
              type="submit"
              class="primary-button"
            >
              + Crear tarea
            </button>

            <div id="taskMessage"></div>

          </form>

        </section>

      </div>

    </main>

  </div>

</div>


<script>

const API_URL = 'http://localhost:4001';

const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');

const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

const taskForm = document.getElementById('taskForm');
const taskMessage = document.getElementById('taskMessage');

const tasksList = document.getElementById('tasksList');

const totalTasks = document.getElementById('totalTasks');
const pendingTasks = document.getElementById('pendingTasks');
const completedTasks = document.getElementById('completedTasks');
const highTasks = document.getElementById('highTasks');

const userInfo = document.getElementById('userInfo');

const refreshButton = document.getElementById('refreshButton');
const logoutButton = document.getElementById('logoutButton');


function mostrarDashboard() {

  loginView.style.display = 'none';
  dashboardView.style.display = 'block';

  const usuarioGuardado =
    localStorage.getItem('usuario');

  if (usuarioGuardado) {

    const usuario =
      JSON.parse(usuarioGuardado);

    userInfo.textContent =
      usuario.nombre + ' · ' + usuario.email;
  }

  cargarTareas();
}


function mostrarLogin() {

  loginView.style.display = 'flex';
  dashboardView.style.display = 'none';
}


loginForm.addEventListener('submit', async (event) => {

  event.preventDefault();

  const email =
    document.getElementById('email').value;

  const password =
    document.getElementById('password').value;

  loginMessage.textContent =
    'Iniciando sesión...';

  loginMessage.className = '';

  try {

    const respuesta = await fetch(
      API_URL + '/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const datos = await respuesta.json();

    if (!respuesta.ok) {

      loginMessage.textContent =
        datos.mensaje || 'Credenciales incorrectas';

      loginMessage.className = 'error';

      return;
    }

    localStorage.setItem(
      'token',
      datos.token
    );

    localStorage.setItem(
      'usuario',
      JSON.stringify(datos.usuario)
    );

    loginMessage.textContent =
      'Login exitoso';

    loginMessage.className = 'success';

    setTimeout(() => {
      mostrarDashboard();
    }, 400);

  } catch (error) {

    console.error(error);

    loginMessage.textContent =
      'No se pudo conectar con el servidor';

    loginMessage.className = 'error';
  }

});


async function cargarTareas() {

  const token =
    localStorage.getItem('token');

  if (!token) {

    mostrarLogin();
    return;
  }

  tasksList.innerHTML =
    '<div class="empty">Cargando tareas...</div>';

  try {

    const respuesta = await fetch(
      API_URL + '/api/tasks',
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
    );

    if (respuesta.status === 401) {

      cerrarSesion();
      return;
    }

    const tareas = await respuesta.json();

    mostrarTareas(tareas);

  } catch (error) {

    console.error(error);

    tasksList.innerHTML =
      '<div class="empty">Error al cargar las tareas.</div>';
  }
}


function mostrarTareas(tareas) {

  totalTasks.textContent =
    tareas.length;

  pendingTasks.textContent =
    tareas.filter(tarea => !tarea.completada).length;

  completedTasks.textContent =
    tareas.filter(tarea => tarea.completada).length;

  highTasks.textContent =
    tareas.filter(tarea => tarea.prioridad === 'ALTA').length;


  if (tareas.length === 0) {

    tasksList.innerHTML =
      '<div class="empty">No tienes tareas registradas.</div>';

    return;
  }


  tasksList.innerHTML = '';

  tareas.forEach(tarea => {

    const task = document.createElement('div');

    task.className = 'task';

    const title = document.createElement('div');

    title.className = 'task-title';

    title.textContent = tarea.titulo;

    const description =
      document.createElement('div');

    description.className =
      'task-description';

    description.textContent =
      tarea.descripcion || 'Sin descripción';


    const badges =
      document.createElement('div');

    badges.className = 'badges';


    const priority =
      document.createElement('span');

    priority.className =
      'badge priority-' +
      tarea.prioridad.toLowerCase();

    priority.textContent =
      tarea.prioridad;


    const status =
      document.createElement('span');

    status.className =
      'badge ' +
      (tarea.completada
        ? 'status-completada'
        : 'status-pendiente');

    status.textContent =
      tarea.completada
        ? 'COMPLETADA'
        : 'PENDIENTE';


    badges.appendChild(priority);
    badges.appendChild(status);


    const actions =
      document.createElement('div');

    actions.className =
      'task-actions';


    const button =
      document.createElement('button');

    button.className =
      'status-button';

    button.textContent =
      tarea.completada
        ? 'Marcar como pendiente'
        : 'Marcar como completada';

    button.addEventListener('click', () => {

      cambiarEstado(
        tarea.id,
        !tarea.completada
      );

    });


    actions.appendChild(button);


    task.appendChild(title);
    task.appendChild(description);
    task.appendChild(badges);
    task.appendChild(actions);

    tasksList.appendChild(task);

  });

}


taskForm.addEventListener('submit', async (event) => {

  event.preventDefault();

  const token =
    localStorage.getItem('token');

  const titulo =
    document.getElementById('taskTitle').value;

  const descripcion =
    document.getElementById('taskDescription').value;

  const prioridad =
    document.getElementById('taskPriority').value;


  taskMessage.textContent =
    'Creando tarea...';

  taskMessage.className = '';


  try {

    const respuesta = await fetch(
      API_URL + '/api/tasks',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },

        body: JSON.stringify({
          titulo,
          descripcion,
          prioridad
        })
      }
    );


    if (respuesta.status === 401) {

      cerrarSesion();
      return;
    }


    const datos =
      await respuesta.json();


    if (!respuesta.ok) {

      taskMessage.textContent =
        datos.mensaje ||
        'Error al crear la tarea';

      taskMessage.className =
        'error';

      return;
    }


    taskMessage.textContent =
      'Tarea creada exitosamente';

    taskMessage.className =
      'success';


    taskForm.reset();

    document.getElementById(
      'taskPriority'
    ).value = 'MEDIA';


    cargarTareas();

  } catch (error) {

    console.error(error);

    taskMessage.textContent =
      'No se pudo crear la tarea';

    taskMessage.className =
      'error';
  }

});


async function cambiarEstado(id, completada) {

  const token =
    localStorage.getItem('token');

  try {

    const respuesta = await fetch(
      API_URL + '/api/tasks/' + id + '/status',
      {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },

        body: JSON.stringify({
          completada
        })
      }
    );


    if (respuesta.status === 401) {

      cerrarSesion();
      return;
    }


    const datos =
      await respuesta.json();


    if (!respuesta.ok) {

      alert(
        datos.mensaje ||
        'No se pudo actualizar el estado'
      );

      return;
    }


    cargarTareas();

  } catch (error) {

    console.error(error);

    alert(
      'No se pudo conectar con el servidor'
    );
  }

}


function cerrarSesion() {

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  mostrarLogin();

  loginForm.reset();

  loginMessage.textContent = '';
}


logoutButton.addEventListener(
  'click',
  cerrarSesion
);


refreshButton.addEventListener(
  'click',
  cargarTareas
);


if (localStorage.getItem('token')) {

  mostrarDashboard();

} else {

  mostrarLogin();
}

</script>

</body>
</html>
  `);
});


app.listen(PORT, () => {
  console.log(`Frontend corriendo en el puerto ${PORT}`);
});
