<!DOCTYPE html>
<html>
<head>
    <title>Editar Usuario</title>
</head>
<body>
    <h1>Editar Usuario</h1>

    <form action="{{ route('users.update', $user->id) }}" method="POST">
        @csrf
        @method('PUT')

        <label>Nombre:</label>
        <input type="text" name="name" value="{{ $user->name }}" required><br><br>

        <label>Email:</label>
        <input type="email" name="email" value="{{ $user->email }}" required><br><br>

        <label>Password (dejar vacío si no quieres cambiarlo):</label>
        <input type="password" name="password"><br><br>

        <button type="submit">Actualizar</button>
    </form>

    <br>
    <a href="{{ route('users.index') }}">⬅️ Volver</a>
</body>
</html>
