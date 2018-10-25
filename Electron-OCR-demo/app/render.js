import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideMenu from './components/Menu';
import Upload from './components/Upload';

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    // primaryColor: white,
  }
});

class MainWindow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <SideMenu />
          <Upload />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mainWndComponent = ReactDOM.render(
  <MainWindow/>, document.getElementById('content'));