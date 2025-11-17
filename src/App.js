import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Welcome to React
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Get started by editing <code className="bg-gray-100 px-2 py-1 rounded">src/App.js</code>
        </p>
        <div className="flex justify-center">
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Learn React
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;

