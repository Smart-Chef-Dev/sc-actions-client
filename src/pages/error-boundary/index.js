import { PureComponent, createContext, useContext } from "react";

const ErrorContext = createContext({});

export const useErrorContext = () => useContext(ErrorContext);

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };

    this.changeErrorState = this.changeErrorState.bind(this);
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  changeErrorState(error) {
    console.error(error);

    this.setState({
      hasError: true,
    });
  }

  render() {
    return (
      <ErrorContext.Provider value={{ handleError: this.changeErrorState }}>
        {this.state.hasError ? (
          <div className="text-center">
            <h1>Ooops...</h1>
            <h2>Something went wrong</h2>
          </div>
        ) : (
          this.props.children
        )}
      </ErrorContext.Provider>
    );
  }
}

export default ErrorBoundary;
