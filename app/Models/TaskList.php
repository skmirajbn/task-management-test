<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    protected $guarded = [];

    public function Tasks()
    {
        return $this->hasMany(Task::class, 'task_list_id');
    }
}
