<?php

namespace Tests\Feature;

use Tests\TestCase;

class RouteTest extends TestCase
{
    private $base_api_url = '/api/requests';
    private $ip = ['REMOTE_ADDR' => '127.0.0.1'];
    private $secretKey = ['Secret-Key' => 'K4azIgi3Fhw6j7CI9GkjEWCG0SFasaGH'];

    private $userRequestData = [
        'ip' => '127.0.0.1',
        'request_type' => 'new-ip',
        'email' => 'test@sample.com',
        'message' => 'Test message'
    ];

    // API routes

    public function test_api_index_method(): void
    {
        $response = $this->withHeaders($this->secretKey)
            ->get($this->base_api_url, $this->ip);

        $response->assertStatus(200);
    }

    public function test_api_show_method(): void
    {
        $response = $this->withHeaders($this->secretKey)
            ->get($this->base_api_url . '/1', $this->ip);

        $response->assertStatus(200);
    }

    public function test_api_update_method(): void
    {
        $response = $this->withHeaders($this->secretKey)
            ->patch($this->base_api_url . '/1', ['status' => true], $this->ip);

        $response->assertStatus(200);
    }

    public function test_api_destroy_method(): void
    {
        $response = $this->withHeaders($this->secretKey)
            ->delete($this->base_api_url . '/1', $this->ip);

        $response->assertStatus(204);
    }

    public function test_api_destroy_all_method(): void
    {
        $response = $this->withHeaders($this->secretKey)
            ->delete($this->base_api_url, $this->ip);

        $response->assertStatus(200);
    }

    // Web and Auth routes

    public function test_render_welcome_page(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_registration_create_method(): void
    {
        $response = $this->get('/registration');

        $response->assertStatus(200);
    }

    public function test_newip_create_method(): void
    {
        $response = $this->get('/new-ip');

        $response->assertStatus(200);
    }

    public function test_registration_store_method(): void
    {
        $response = $this->post('/registration', $this->userRequestData);

        $response->assertStatus(302);
        $response->assertRedirect('/');

        $this->assertDatabaseHas('user_requests', $this->userRequestData);
    }

    public function test_newip_store_method(): void
    {
        $response = $this->post('/new-ip', $this->userRequestData);

        $response->assertStatus(302);
        $response->assertRedirect('/');

        $this->assertDatabaseHas('user_requests', $this->userRequestData);
    }
}
