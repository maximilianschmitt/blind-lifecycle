'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Alt = require('alt');
var alt = new Alt();

var UserActions = alt.generateActions(['requireUser']);

class UserStore {
  constructor() {
    this.requireUser = false;
    this.bindActions(UserActions);
  }

  onRequireUser() {
    this.setState({ requireUser: true });
  }
}

alt.addStore('UserStore', UserStore);

class RequireUser extends React.Component {
  constructor() {
    super();
    this.state = alt.stores.UserStore.getState();
  }

  componentDidMount() {
    this.unlisten = alt.stores.UserStore.listen(this.setState.bind(this));
    if (!this.state.requireUser) {
      // UserActions.requireUser();
      // using setTimeout will work:
      setTimeout(() => UserActions.requireUser());
    }
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    if (this.state.requireUser) {
      return <div>I have required your user</div>;
    }

    return <div>I will require your user</div>;
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = alt.stores.UserStore.getState();
  }

  componentDidMount() {
    this.unlisten = alt.stores.UserStore.listen(this.setState.bind(this));
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return (
      <div>
        <div>User required? {this.state.requireUser + ''}</div>
        <RequireUser />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#main'));
