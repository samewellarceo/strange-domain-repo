<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class RequestsController extends Controller
{
    public function index(): Response
    {
        $response = Http::requests()->get('/');

        if ($response->successful()) {
            $data = $response->json();

            return Inertia::render('Requests', ['data' => $data]);
        }
    }

    public function show(string $id)
    {
        $response = Http::requests()->get('/' . $id);

        if ($response->successful()) {
            $data = $response->json();

            return Inertia::render('Request', ['data' => $data]);
        }
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $response = Http::requests()->patch('/' . $id, ['status' => $request->status]);

        if ($response->successful()) {
            return Redirect::route('request.show', ['id' => $id]);
        }
    }

    public function destroy(string $id): RedirectResponse
    {
        $response = Http::requests()->delete('/' . $id);

        if ($response->successful()) {
            return Redirect::route('requests');
        }
    }

    public function destroyAll(): RedirectResponse
    {
        $response = Http::requests()->delete('/');

        if ($response->successful()) {
            return Redirect::route('requests');
        }
    }
}
