import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 light:bg-white dark:text-white light:text-gray-900">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-accent mb-4">Oops!</h1>
            <h2 className="text-2xl font-semibold mb-4">Algo deu errado</h2>
            <p className="dark:text-gray-400 light:text-gray-600 mb-8">
              Desculpe, ocorreu um erro inesperado. Tente recarregar a página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-accent text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;