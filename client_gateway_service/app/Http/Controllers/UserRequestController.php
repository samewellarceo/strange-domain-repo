<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserFormRequest;
use App\Models\UserRequest;
use Illuminate\Support\Facades\Redirect;
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
            'request_type' => $routeName,
            'ip' => $ip
        ]);
    }

    public function store(UserFormRequest $request): RedirectResponse
    {
        $request->store();

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

    public function destroy($id)
    {
        $userRequest = UserRequest::findOrFail($id);
        $userRequest->delete();

        return response()->json(['message' => 'User request deleted successfully'], 204);
    }

    public function destroyAll()
    {
        UserRequest::truncate();

        return response()->json(['message' => 'All user requests deleted successfully']);
    }
}
