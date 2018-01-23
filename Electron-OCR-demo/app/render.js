import React from 'react';
import ReactDOM from 'react-dom';

class MainWindow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <div>
        Good, React Ready2!
      </div>
    );
  }
}

const mainWndComponent = ReactDOM.render(
  <MainWindow/>, document.getElementById('content'));