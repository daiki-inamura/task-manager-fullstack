import { useEffect, useState } from 'react'

type Task = {
  id: number;
  title: string;
  description: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
    .then(res => res.json())
    .then(data => setTasks(data))
    .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div>
      <h1>タスク一覧</h1>
      {tasks.length === 0 ? (
        <p>タスクがありません。</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong>: {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App
