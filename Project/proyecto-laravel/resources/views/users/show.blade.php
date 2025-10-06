<!DOCTYPE html>
<html>
<head>
    <title>Detalle Usuario</title>
</head>
<body>
    <h1>{{ $user->name }}</h1>
    <p>Email: {{ $user->email }}</p>

    <br>
    <a href="{{ route('users.index') }}">⬅️ Volver</a>
</body>
</html>
