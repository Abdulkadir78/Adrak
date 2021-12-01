import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? (
      <div
        style={{
          color: "#C6865C",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <h3>
          Something went wrong <br /> Please try again later
        </h3>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
