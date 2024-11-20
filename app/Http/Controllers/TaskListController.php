<?php

namespace App\Http\Controllers;

use App\Models\TaskList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $taskLists = TaskList::all();

        return Inertia::render('TaskLists/Index', compact('taskLists'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('TaskLists/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        TaskList::create([
            'name' => $request->name,
            'user_id' => Auth::user()->id,
        ]);

        return redirect()->route('task_lists.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $taskList = TaskList::findOrFail($id);

        return Inertia::render('TaskLists/Edit', compact('taskList'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $taskList = TaskList::findOrFail($id);
        $taskList->name = $request->name;
        $taskList->save();

        return redirect()->route('task_lists.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        TaskList::findOrFail($id)->delete();

        return redirect()->route('task_lists.index');
    }
}
