import React, { Component } from "react";
import AuthUserContext from "./AuthUserContext";

class Header extends Component {
  render() {
    return this.props.user ? (
      <div>
        <h1 className="display-3 text-center mt-4 brandicon">
          {this.props.user.schoolName}
        </h1>
      </div>
    ) : null;
  }
}

export default props => {
  return (
    <AuthUserContext.Consumer>
      {user => <Header {...props} user={user} />}
    </AuthUserContext.Consumer>
  );
};
