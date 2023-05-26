<?php

namespace App\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Http::macro('requests', function () {
            return Http::withHeaders([
                'Secret-Key' => Config::get('api.secret_key'),
            ])->baseUrl(Config::get('api.base_url'));
        });
    }
}
