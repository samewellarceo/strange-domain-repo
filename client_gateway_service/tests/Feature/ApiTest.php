<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiTest extends TestCase
{
    private $base_url = '/api/requests';
    private $ip = ['REMOTE_ADDR' => '127.0.0.1'];
    private $secretKey = ['Secret-Key' => 'K4azIgi3Fhw6j7CI9GkjEWCG0SFasaGH'];

    public function test_api_index_method(): void
    {
        $response = $this->withHeaders($this->secretKey)
            ->get('/api/requests', $this->ip);

        $response->assertStatus(200);
    }

    public function test_api_update_method(): void
    {
        $response = $this->withHeaders($this->secretKey)
            ->put($this->base_url . '/1', ['status' => true], $this->ip);

        $response->assertStatus(200);
    }

    public function test_api_destroy_method(): void
    {
        $response = $this->withHeaders($this->secretKey)
            ->delete($this->base_url . '/1', $this->ip);

        $response->assertStatus(204);
    }

    public function test_api_destroy_all_method(): void
    {
        $response = $this->withHeaders($this->secretKey)
            ->delete($this->base_url, $this->ip);

        $response->assertStatus(200);
    }
}
