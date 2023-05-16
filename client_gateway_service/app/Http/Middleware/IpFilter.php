<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Symfony\Component\HttpFoundation\Response;

class IpFilter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */


    public function handle(Request $request, Closure $next): Response
    {
        $allowedIP = Config::get('admin.allowed_ip');
        $secretKey = Config::get('admin.secret_key');

        // Check if the request IP matches the allowed IP
        if ($request->ip() !== $allowedIP) {
            return response('Unauthorized', 401);
        }

        // Check if the secret key is provided in the request header
        if ($request->header('Secret-Key') !== $secretKey) {
            return response('Unauthorized', 401);
        }

        return $next($request);
    }
}
