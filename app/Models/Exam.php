<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function questions()
    {
        return $this->hasMany(Question::class, "exam_id", "id");
    }

    public function attempts()
    {
        return $this->hasMany(Attempt::class, "exam_id", "id");
    }
}
