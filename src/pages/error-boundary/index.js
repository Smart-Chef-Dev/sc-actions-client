import { PureComponent, createContext, useContext } from "react";
import PropTypes from "prop-types";

import H1 from "../../components/h1";
import H2 from "../../components/h2";

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
          <div>
            <H1>Ooops...</H1>
            <H2>Something went wrong</H2>
          </div>
        ) : (
          this.props.children
        )}
      </ErrorContext.Provider>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ErrorBoundary;
