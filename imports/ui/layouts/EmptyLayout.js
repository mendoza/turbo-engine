import React, { PureComponent } from "react";

class EmptyLayout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        Navbar
        <br />
        {children}
      </div>
    );
  }
}

export default EmptyLayout;
