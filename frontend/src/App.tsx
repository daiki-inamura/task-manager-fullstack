import { useEffect, useState } from 'react'

type Task = {
  id: number
  title: string
  completed: boolean
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/tasks')
      .then(response => {
        if (!response.ok) 
          throw new Error(response.statusText);
          return response.json();  
      })
      .then((data: Task[]) => setTasks(data))
      .catch(error => setError(error.message));
  }, []);

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <ul className="mt-4 list-disc pl-5">
        {tasks.map(t => (
          <li key={t.id}>
            #{t.id} {t.title} [{t.completed ? '✓' : '–'}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
