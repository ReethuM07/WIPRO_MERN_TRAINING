import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-danger bg-opacity-10 p-4 rounded-3">
          <h4 className="text-danger">Something went wrong.</h4>
          <p className="text-muted">
            Please refresh the page or contact support.
          </p>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error?.toString()}
            {this.state.info?.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
