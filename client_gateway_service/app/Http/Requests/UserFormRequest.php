<?php

namespace App\Http\Requests;

use App\Models\UserRequest;
use Illuminate\Foundation\Http\FormRequest;

class UserFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|string|email|max:255|',
            'message' => 'required|string|max:500',
            'request_type' => 'required|string|in:registration,new-ip'
        ];
    }

    public function store()
    {
        return UserRequest::create([
            'ip' => $this->ip,
            'request_type' => $this->request_type,
            'email' => $this->email,
            'message' => $this->message
        ]);
    }
}
