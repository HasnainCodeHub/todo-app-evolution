export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className="flex justify-center items-center" role="status" aria-label="Loading">
      <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 ${sizeStyles[size]}`}></div>
    </div>
  )
}
