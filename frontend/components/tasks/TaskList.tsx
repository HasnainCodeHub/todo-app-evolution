import type { Task } from '../../types/task'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (taskId: number) => void
  onUpdate: (taskId: number, updates: { title?: string; description?: string }) => void
  onDelete: (taskId: number) => void
  isLoading?: boolean
}

export default function TaskList({ tasks, onToggleComplete, onUpdate, onDelete, isLoading }: TaskListProps) {
  // Sort tasks: incomplete first, then by ID descending (newest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    return b.id - a.id
  })

  const incompleteTasks = sortedTasks.filter(t => !t.completed)
  const completedTasks = sortedTasks.filter(t => t.completed)

  return (
    <div className="space-y-6">
      {/* Incomplete tasks */}
      {incompleteTasks.length > 0 && (
        <div className="space-y-3">
          {incompleteTasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TaskItem
                task={task}
                onToggleComplete={onToggleComplete}
                onUpdate={onUpdate}
                onDelete={onDelete}
                isLoading={isLoading}
              />
            </div>
          ))}
        </div>
      )}

      {/* Completed tasks section */}
      {completedTasks.length > 0 && (
        <div className="space-y-3">
          {incompleteTasks.length > 0 && (
            <div className="flex items-center gap-3 pt-4">
              <div className="flex-1 h-px bg-surface-200" />
              <span className="text-xs font-medium text-surface-400 uppercase tracking-wider">
                Completed ({completedTasks.length})
              </span>
              <div className="flex-1 h-px bg-surface-200" />
            </div>
          )}
          {completedTasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-fade-in"
              style={{ animationDelay: `${(incompleteTasks.length + index) * 50}ms` }}
            >
              <TaskItem
                task={task}
                onToggleComplete={onToggleComplete}
                onUpdate={onUpdate}
                onDelete={onDelete}
                isLoading={isLoading}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
