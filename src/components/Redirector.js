import React, {Component} from 'react';

class Redirector extends Component {

  componentDidUpdate() {
    console.log('Redirector::componentDidUpdate');
    const {redirect, location, history, setRedirect} = this.props;
    const {path} = redirect;

    if (!path) return;


    if (path !== location.pathname) {
      history.push({
        pathname: path,  
      });  
      // console.log('Redirector::performing redirect to', path);  
    }
    else {
      // console.log('Redirector:: clearing redirect');
      setRedirect({});
      setTimeout( () => history.replace({state: {}}), 4000);
    }
  }
  

  render() {
    return <></>;
  }
}

export default Redirector;

  // state: {alert},
  // const {path, alert} = redirect;