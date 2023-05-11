<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRequest extends Model
{
    protected $fillable = ['ip', 'request_type', 'email', 'message', 'status'];
}
