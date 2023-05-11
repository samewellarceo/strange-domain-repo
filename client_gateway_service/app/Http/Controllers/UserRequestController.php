<?php

namespace App\Http\Controllers;

use App\Models\UserRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserRequestController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request): Response
    {
        $routeName = request()->route()->getName();

        return Inertia::render('Request', [
            'type' => $routeName,
            'ip' => $request->ip()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|email|max:255|:' . UserRequest::class,
            'message' => 'required|string|max:500',
        ]);

        $userRequest = UserRequest::create([
            'ip' => $request->ip,
            'request_type' => $request->type,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        event(new Registered($userRequest));

        return Redirect::to('/');
    }
}
