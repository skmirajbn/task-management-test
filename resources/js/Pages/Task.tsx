import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

type TaskListType = {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

export default function Task() {
    const { taskLists } =
        usePage<PageProps<{ taskLists: TaskListType[] }>>().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Task List
                </h2>
            }
        >
            <Head title="Task List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="flex justify-end">
                        <Link
                            href={route('task_lists.create')}
                            className="rounded-md bg-blue-500 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Add Task List
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:bg-gray-800">
                                {taskLists.map((task) => (
                                    <tr key={task.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {task.name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                            <Link
                                                href={route(
                                                    'task_lists.edit',
                                                    task.id,
                                                )}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route(
                                                    'task_lists.destroy',
                                                    task.id,
                                                )}
                                                method="delete"
                                                as="button"
                                                className="ml-4 text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
