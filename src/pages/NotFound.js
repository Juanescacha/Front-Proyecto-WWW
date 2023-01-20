const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-24 text-center">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="mb-8 text-6xl font-bold">Page Not Found</h2>
      <a href="/" className="px-4 py-2 font-black text-black bg-gray-900">
        Landing Page
      </a>
    </div>
  )
}

export default NotFound
