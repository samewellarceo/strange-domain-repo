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
    public function create(): Response
    {
        $routeName = request()->route()->getName();
        $ip = request()->ip();

        return Inertia::render('Request', [
            'type' => $routeName,
            'ip' => $ip
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|string|email|max:255|:',
            'message' => 'required|string|max:500',
        ]);

        UserRequest::create([
            'ip' => $request->ip,
            'request_type' => $request->type,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        return Redirect::to('/');
    }

    // API routes

    public function index()
    {
        $userRequests = UserRequest::get();

        return response()->json($userRequests);
    }

    public function update(Request $request, $id)
    {
        $userRequest = UserRequest::findOrFail($id);
        $userRequest->status = $request->input('status');
        $userRequest->save();

        return response()->json(['message' => 'User request status updated successfully']);
    }

    public function destroy(UserRequest $userRequest)
    {
        $userRequest->delete();

        return response()->json(['message' => 'User request deleted successfully']);
    }

    public function destroyAll()
    {
        UserRequest::truncate();

        return response()->json(['message' => 'All user requests deleted successfully']);
    }
}
