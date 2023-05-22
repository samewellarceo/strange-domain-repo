<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class RequestsController extends Controller
{
    private $apiBaseUrl;
    private $secretKey;

    public function __construct()
    {
        $this->apiBaseUrl = Config::get('api.base_url');
        $this->secretKey = Config::get('api.secret_key');
    }

    public function index(): Response
    {
        $response = Http::withHeaders(['Secret-Key' => $this->secretKey])
            ->get($this->apiBaseUrl);

        if ($response->successful()) {
            $data = $response->json();

            return Inertia::render('Requests', ['data' => $data]);
        }
    }

    public function show(string $id)
    {
        $response = Http::withHeaders(['Secret-Key' => $this->secretKey])
            ->get($this->apiBaseUrl . '/' . $id);

        if ($response->successful()) {
            $data = $response->json();

            return Inertia::render('Request', ['data' => $data]);
        }
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $response = Http::withHeaders(['Secret-Key' => $this->secretKey])
            ->patch($this->apiBaseUrl . '/' . $id, ['status' => $request->status]);

        if ($response->successful()) {
            return Redirect::route('request.show', ['id' => $id]);
        }
    }

    public function destroy(string $id): RedirectResponse
    {
        $response = Http::withHeaders(['Secret-Key' => $this->secretKey])
            ->delete($this->apiBaseUrl . '/' . $id);

        if ($response->successful()) {
            return Redirect::route('requests');
        }
    }

    public function destroyAll(): RedirectResponse
    {
        $response = Http::withHeaders(['Secret-Key' => $this->secretKey])
            ->delete($this->apiBaseUrl);

        if ($response->successful()) {
            return Redirect::route('requests');
        }
    }
}
