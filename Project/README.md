# Proyecto Fullstack — Laravel API + React (Vite + Tailwind)

## Descripción general

Este proyecto implementa un sistema **Fullstack** con autenticación y gestión de usuarios.
- **Backend:** Laravel (API REST)
- **Frontend:** React + Vite + TailwindCSS
- **Base de datos:** MySQL
- **Arquitectura Frontend:** Atomic Design (atoms, molecules, organisms, templates)

Funcionalidades implementadas:
- Pantalla de **Login** con validación de credenciales.
- **Listado de usuarios** con filtros por nombre y fecha.
- **CRUD** de usuarios: Crear (modal), Editar (modal), Eliminar (confirmación).
- Uso de **migraciones** y **seeders** en Laravel.
- Diseño con **Tailwind CSS** y estructura atómica en React.
- Comunicación con backend via **Axios** y manejo básico de CORS.

---

## Requerimientos previos (instalar antes)

| Herramienta | Versión recomendada | Comando para verificar |
|-------------|---------------------|------------------------|
| PHP | 8.1+ | `php -v` |
| Composer | 2.x | `composer -V` |
| Node.js | 18+ (LTS) | `node -v` |
| npm | 9+ | `npm -v` |
| MySQL | 5.7 / 8.x | `mysql -V` |
| Git | opcional | `git --version` |
| VS Code | opcional | — |

> Nota: ejecutar los comandos en la terminal dentro de las carpetas `proyecto-laravel` y `frontend-react` según corresponda.

---

## Estructura del repositorio (resumen)

```
/proyecto-laravel        # Backend Laravel (API)
/frontend-react          # Frontend React (Vite + Tailwind)
README.md                # Documentación (este archivo)
```

Frontend (src):
```
src/
  components/
    atoms/         # Button, Input, Logo, etc.
    molecules/     # Navbar, LoginForm, Filters, UserModal, etc.
    organisms/     # UsersTable, etc.
    templates/     # PageLayout, Dashboard layout
  pages/
    LoginPage.jsx
    UsersPage.jsx
  services/
    api.js         # cliente axios (opcional)
  App.jsx
  main.jsx
```

---

## Instrucciones de instalación detalladas

### 1) Backend — Laravel API

1. Abrir terminal y moverse a la carpeta del backend:
```bash
cd proyecto-laravel
```

2. Instalar dependencias de PHP:
```bash
composer install
```

3. Crear archivo .env a partir del ejemplo:
```bash
cp .env.example .env
```

4. Editar `.env` y configurar la conexión a MySQL (asegúrate que la BD exista o créala):
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=proyecto_final
DB_USERNAME=root
DB_PASSWORD=secret
```

5. Generar la clave de la aplicación:
```bash
php artisan key:generate
```

6. Ejecutar migraciones y seeders (puebla usuarios de prueba):
```bash
php artisan migrate --seed
```

7. Limpiar y optimizar cachés (recomendado si hiciste cambios en providers o config):
```bash
php artisan optimize:clear
php artisan config:clear
```

8. Levantar el servidor de desarrollo de Laravel:
```bash
php artisan serve
```
Por defecto el backend estará disponible en: `http://127.0.0.1:8000`

> Si aparecen errores sobre providers faltantes (`Class App\Providers\AuthServiceProvider not found`), revisa que los archivos en `app/Providers` existan y tengan el namespace correcto y luego ejecuta `composer dump-autoload` y `php artisan optimize:clear`.

---

### 2) Frontend — React (Vite) + Tailwind

1. Abrir otra terminal y moverse a la carpeta del frontend:
```bash
cd frontend-react
```

2. Instalar dependencias:
```bash
npm install
```

3. Dependencias adicionales (si te lanza error de PostCSS / Tailwind):
```bash
npm install -D @tailwindcss/postcss
npm install clsx
```

4. Iniciar el servidor de desarrollo Vite:
```bash
npm run dev
```

Por defecto el frontend estará en: `http://localhost:5173`

> Nota: si `vite` no se reconoce, asegúrate que `node` y `npm` estén bien instalados y que corriste `npm install` en la carpeta `frontend-react`.

---

## Rutas importantes (Laravel)

- `POST /api/login` → login (debe aceptar email y password).  
- `GET /api/users` → listar usuarios.  
- `POST /api/users` → crear usuario.  
- `PUT /api/users/{id}` → actualizar usuario.  
- `DELETE /api/users/{id}` → eliminar usuario.

Puedes verificar con:
```bash
php artisan route:list
```

---

## Configuración de CORS (Laravel)

Archivo: `config/cors.php` — ejemplo usado en el proyecto:
```php
return [
  'paths' => ['api/*', 'sanctum/csrf-cookie'],
  'allowed_methods' => ['*'],
  'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
  'allowed_headers' => ['*'],
  'supports_credentials' => true,
];
```
Después de editar, limpiar cache de configuración:
```bash
php artisan config:clear
```

> Si recibes error de CORS diciendo que el `Origin` difiere de lo permitido (por ejemplo `http://localhost:5173`), agrega el puerto en `allowed_origins` y reinicia Laravel.

---

## Archivos de Providers (solución de errores "Class ... not found")

Si tu instalación perdió archivos en `app/Providers`, pega estos archivos (3-4) en `app/Providers/` si es necesario:

### `app/Providers/AppServiceProvider.php`
```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        //
    }
}
```

### `app/Providers/AuthServiceProvider.php`
```php
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}
```

### `app/Providers/EventServiceProvider.php`
```php
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        // 'App\Events\ExampleEvent' => [
        //     'App\Listeners\ExampleListener',
        // ],
    ];

    public function boot(): void
    {
        //
    }
}
```

### `app/Providers/RouteServiceProvider.php`
```php
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
```

Después de agregar archivos ejecuta:
```bash
composer dump-autoload
php artisan optimize:clear
php artisan serve
```

---

## Errores comunes y soluciones rápidas

- **CORS policy / Origin not allowed**  
  - Causa: origen (puerto) del frontend no está en `config/cors.php`.  
  - Solución: agregar `http://localhost:5173` y ejecutar `php artisan config:clear`.

- **404 /api/login**  
  - Causa: ruta API mal definida o no cargada.  
  - Solución: revisar `routes/api.php`, ejecutar `php artisan route:clear` y `php artisan route:list` para verificar.

- **Target class [files] does not exist / Provider errors**  
  - Causa: falta uno o varios archivos en `app/Providers`.  
  - Solución: pegar los providers (ver sección anterior), ejecutar `composer dump-autoload` y `php artisan optimize:clear`.

- **Resource busy or locked (EBUSY)**  
  - Causa: archivos bloqueados por OneDrive o software de sincronización.  
  - Solución: mover el proyecto fuera de carpetas sincronizadas (ej: Documents/OneDrive).

- **PostCSS / Tailwind errors**  
  - Causa: falta plugin `@tailwindcss/postcss` o configuración.  
  - Solución: `npm install -D @tailwindcss/postcss` y revisar `postcss.config.js`.

- **React: "React is not defined" o errores de import**  
  - Causa: falta `import React from "react"` en algunos archivos (según configuración de Babel/Vite puede ser opcional pero evita problemas).  
  - Solución: agregar `import React from "react"` o usar plugin que implemente JSX runtime automático.

---

## Frontend - puntos importantes y snippets útiles

### `UsersPage.jsx` (resumen de la lógica)
- Carga usuarios con `axios.get("http://127.0.0.1:8000/api/users")`
- Mantiene estado `users, nameFilter, dateFilter, isModalOpen, editingUser, formData`
- Filtra localmente por `name` y `created_at` (slice para fecha)
- Usa `UserModal` para crear/editar y refresca lista después

### `UserModal.jsx` (campos)
- name, email, password, confirmPassword (contraseña opcional en edición)
- Validación: confirmar contraseña solo cuando se crea
- En edición no se exige contraseña (solo si se envía, se actualiza)

### `Button.jsx` (atom)
- Se recomienda un botón base que acepte `className` para sobrescribir estilos.
- Si usas `clsx`, instalar con `npm install clsx` y combinar clases:

```jsx
import clsx from "clsx";

function Button({ className, children, ...props }) {
  return <button className={clsx("px-3 py-2 rounded-md", className)} {...props}>{children}</button>
}
```

---

## Preguntas frecuentes para entrevista técnica

**1) ¿Cómo organizaste los componentes según Atomic Design y por qué?**  
- Atoms: elementos puros (Button, Input, Logo).  
- Molecules: combinaciones (LoginForm, Filters, UserModal).  
- Organisms: secciones completas (UsersTable).  
- Templates/Pages: layout y rutas.  
Esta separación mejora la reutilización y pruebas unitarias.

**2) ¿Qué problemas enfrentaste y cómo los solucionaste?**  
- CORS: ajustes en `config/cors.php`.  
- Providers faltantes: reponer archivos y `composer dump-autoload`.  
- Tailwind/PostCSS: instalar plugin `@tailwindcss/postcss`.  
- OneDrive / EBUSY: mover proyecto.

**3) ¿Cómo aseguramos la seguridad del sistema de login?**  
- Contraseñas encriptadas con `Hash::make()` en Laravel.  
- Validación de campos en backend (Request validation).  
- Preparado para Sanctum (token-based) o JWT si se escalara.

---

## Comandos útiles (resumen)

### Laravel
```bash
composer install
composer dump-autoload
php artisan migrate --seed
php artisan serve
php artisan optimize:clear
php artisan route:list
```

### Frontend
```bash
cd frontend-react
npm install
npm install -D @tailwindcss/postcss
npm install clsx
npm run dev
```

---

## Seeder / Credenciales de prueba
Seeder crea un usuario de ejemplo:
- **Email:** admin@example.com  
- **Password:** 123456

---

## Créditos / Autor
**Autor:** Brayan Bazaldua  
**Tecnologías:** Laravel, React, TailwindCSS, Vite, MySQL  
**Año:** 2025  
**Licencia:** Uso educativo / demostrativo

---


