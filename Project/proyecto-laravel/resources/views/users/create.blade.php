<!DOCTYPE html>
<html>
<head>
    <title>Crear Usuario</title>
</head>
<body>
    <h1>Nuevo Usuario</h1>

    <form action="{{ route('users.store') }}" method="POST">
        @csrf
        <label>Nombre:</label>
        <input type="text" name="name" required><br><br>

        <label>Email:</label>
        <input type="email" name="email" required><br><br>

        <label>Password:</label>
        <input type="password" name="password" required><br><br>

        <button type="submit">Guardar</button>
    </form>

    <br>
    <a href="{{ route('users.index') }}">⬅️ Volver</a>
</body>
</html>
