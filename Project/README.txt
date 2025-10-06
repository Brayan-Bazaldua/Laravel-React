# Proyecto Fullstack — Laravel API + React (Vite + Tailwind)

## Descripción general

Este proyecto implementa un sistema **Fullstack** con:
- **Backend:** Laravel 10 (API REST)
- **Frontend:** React + Vite + TailwindCSS
- **Base de datos:** MySQL

El objetivo fue crear un login funcional y una tabla de usuarios consumiendo datos del backend Laravel desde un frontend moderno React con arquitectura **Atomic Design**.

--------------------------------------------------------------------------------------------------------------------

##Requisitos previos

Antes de ejecutar el proyecto, instala lo siguiente en tu equipo:

| Herramienta | Versión recomendada | Comando para verificar |
|--------------|--------------------|-------------------------|
| PHP | 8.1+ | `php -v` |
| Composer | 2.x | `composer -V` |
| Node.js | 18+ (LTS) | `node -v` |
| MySQL | 5.7 / 8 | `mysql -V` |
| Git | opcional | `git --version` |
| VS Code | opcional | — |

--------------------------------------------------------------------------------------------------------------------

##Estructura del repositorio

/proyecto-laravel → API Laravel
/frontend-react → App React + Vite + Tailwind
README.md → Documentación del proyecto
--------------------------------------------------------------------------------------------------------------------

## Instrucciones de instalación

###1. Backend — Laravel API

1. Ve a la carpeta:
   cd proyecto-laravel
Instala dependencias:


composer install
Crea tu archivo .env copiando el ejemplo:


cp .env.example .env
Configura tu conexión MySQL en el .env:

env
Copiar código
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=proyecto_final
DB_USERNAME=root
DB_PASSWORD=secret
Genera la clave de la aplicación:

php artisan key:generate
Ejecuta las migraciones y seeders:


php artisan migrate --seed
Limpia cachés (importante):


php artisan optimize:clear
Levanta el servidor:


php artisan serve
Por defecto estará en: http://127.0.0.1:8000
--------------------------------------------------------------------------------------------------------------------

2. Frontend — React + Vite + Tailwind
Abre otra terminal:
cd frontend-react
Instala dependencias:


npm install
Si tienes error de PostCSS, instala esto:

npm install -D @tailwindcss/postcss

Inicia el servidor de desarrollo:
npm run dev
Por defecto en: http://localhost:5173

Usuario de prueba (Seeder)
Campo	Valor
Email	admin@example.com
Password	123456
--------------------------------------------------------------------------------------------------------------------
Estructura (Frontend - Atomic Design)

src/
  components/
    atoms/         # Elementos pequeños: Button, Input, Label
    molecules/     # Combinaciones: LoginForm
    organisms/     # Secciones completas: UsersTable, Navbar
    templates/     # Layouts base: PageLayout
  pages/
    LoginPage.jsx
    UsersPage.jsx
  services/
    api.js
  App.jsx
  main.jsx

Configuración de CORS (Backend)
Archivo: config/cors.php

return [
  'paths' => ['api/*', 'sanctum/csrf-cookie'],
  'allowed_methods' => ['*'],
  'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
  'allowed_headers' => ['*'],
  'supports_credentials' => true,
];

Y luego:

php artisan config:clear
--------------------------------------------------------------------------------------------------------------------
Errores comunes y soluciones
Error	Causa	Solución
CORS policy	Origin distinto	Editar config/cors.php y agregar el puerto 5173
404 /api/login	Ruta no existe	Revisar routes/api.php y limpiar caché
Target class [files] does not exist	Providers dañados	Recrear los archivos en app/Providers
React undefined / JSX error	Falta import	Añadir import React from "react"
Resource busy or locked (EBUSY)	Archivo bloqueado (OneDrive)	Mover el proyecto fuera de carpetas sincronizadas
PostCSS error	Tailwind config incompleta	Instalar @tailwindcss/postcss

Preguntas frecuentes / Entrevista técnica
1. ¿Qué patrón usaste en el frontend?
→ Atomic Design: separación entre atoms, molecules, organisms y templates.

2. ¿Cómo manejaste la seguridad del login?
→ Contraseñas encriptadas con Hash::make(), validación de credenciales, CORS configurado y preparado para usar Laravel Sanctum.

3. ¿Qué problemas enfrentaste?
→ Errores de CORS, falta de providers de Laravel, conflictos con OneDrive, y PostCSS/Tailwind. Todos documentados con sus soluciones.

4. ¿Qué mejoras aplicarías?
→ Implementar autenticación con Sanctum o JWT, agregar paginación en UsersTable, y un sistema de roles (admin/user).

Comandos útiles

# Laravel
composer install
php artisan migrate --seed
php artisan serve
php artisan optimize:clear

# React
npm install
npm run dev

php artisan route:list mostrando /api/login y /api/users

--------------------------------------------------------------------------------------------------------------------

## 2. Archivos de Providers (Laravel)

Pégalos en `app/Providers/`

--------------------------------------------------------------------------------------------------------------------
### `app/Providers/AppServiceProvider.php`

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
--------------------------------------------------------------------------------------------------------------------
app/Providers/AuthServiceProvider.php

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
--------------------------------------------------------------------------------------------------------------------
app/Providers/EventServiceProvider.php

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
--------------------------------------------------------------------------------------------------------------------
 app/Providers/RouteServiceProvider.php

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
--------------------------------------------------------------------------------------------------------------------
Una vez pegues los archivos:

Ejecuta en consola (dentro de proyecto-laravel):
composer dump-autoload
php artisan optimize:clear
php artisan serve