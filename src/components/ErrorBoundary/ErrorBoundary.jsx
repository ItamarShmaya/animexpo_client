import React from "react";
import withRouter from "./withRouter/withRouter.js";
import "./ErrorBoundary.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, redirect: false };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      hasError: true,
    });
  }

  onGoHomeButtonClick = () => {
    this.props.router.navigate("/");
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <button onClick={this.onGoHomeButtonClick}>Go Home</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
