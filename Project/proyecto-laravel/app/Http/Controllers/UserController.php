<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    public function index(Request $request)
    {
        // Ordenar por nombre o fecha de creación
        $sort = $request->get('sort', 'name'); // valor por defecto: nombre
        $direction = $request->get('direction', 'asc'); // asc o desc

        $users = User::orderBy($sort, $direction)->get();

        return view('users.index', compact('users', 'sort', 'direction'));
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
    public function show(User $user)
    {
        $usuario = $user;
        return view('users.show', compact('usuario'));
    }
    
    public function edit(User $user)
    {
        $usuario = $user;
        return view('users.edit', compact('usuario'));
    }
    
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
        ]);
    
        $data = $request->only(['name', 'email']);
        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->password);
        }
    
        $user->update($data);
    
        $usuario = $user;
        return redirect()->route('users.index')->with('success', 'Usuario actualizado correctamente.');
    }
    
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'Usuario eliminado correctamente.');
    }
    
}
