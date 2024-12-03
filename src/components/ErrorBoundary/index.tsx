import { Component } from 'react';
import { ErrorInfo } from 'react-dom/client';
import { ChildrenProps, ErrorBoundaryState } from '../../types';
import styles from './ErrorBoundary.module.scss';

class ErrorBoundary extends Component<ChildrenProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h2 className={styles.error}>Something went wrong</h2>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
