<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $user = User::where('id', '!=', auth()->id())->get();

        return Inertia::render('Admins', ['data' => $user]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        $user->get();

        return Inertia::render('Admin', ['data' => $user]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $user->status = $request->input('status');
        $user->save();

        return Redirect::route('admin.show', ['id' => $id]);
    }

    public function destroy(string $id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $user->delete();

        return Redirect::route('admins');
    }
}
