<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de Usuarios</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css">
</head>
<body class="bg-gray-100 p-6">

    <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
            <h1 class="text-2xl font-bold">Lista de Usuarios</h1>
            <!-- Botón de logout -->
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" 
                        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                    Cerrar sesión
                </button>
            </form>
        </div>

        <table class="w-full border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-200 text-left">
                    <th class="p-2 border border-gray-300">
                        <a href="{{ route('users.index', ['sort' => 'name', 'direction' => $direction === 'asc' ? 'desc' : 'asc']) }}">
                            Nombre
                        </a>
                    </th>
                    <th class="p-2 border border-gray-300">Correo electrónico</th>
                    <th class="p-2 border border-gray-300">
                        <a href="{{ route('users.index', ['sort' => 'created_at', 'direction' => $direction === 'asc' ? 'desc' : 'asc']) }}">
                            Fecha de creación
                        </a>
                    </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $usuario)
                    <tr class="hover:bg-gray-100">
                        <td class="p-2 border border-gray-300">{{ $usuario->name }}</td>
                        <td class="p-2 border border-gray-300">{{ $usuario->email }}</td>
                        <td class="p-2 border border-gray-300">{{ $usuario->created_at->format('d/m/Y H:i') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

</body>
</html>
