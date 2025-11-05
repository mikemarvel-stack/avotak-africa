import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (this.props.onError) this.props.onError(error, info);
    // Also log to console for easier debugging
    console.error('ErrorBoundary caught error:', error, info);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 p-4 text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h1>
            <p className="mb-4">We've encountered an unexpected error. Please try refreshing the page.</p>
            
            <button
              onClick={this.handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Refresh Page
            </button>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md text-left max-w-2xl overflow-auto">
                <strong>Development Error Details:</strong>
                <pre className="mt-2 text-sm whitespace-pre-wrap">
                  {String(this.state.error.message || this.state.error)}
                </pre>
              </div>
            )}
          </div>
        )
      );
    }
    return this.props.children;
  }
}