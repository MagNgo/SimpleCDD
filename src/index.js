import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// ============================================================

class ActionListPanel extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div className='actionListPanel'>
        <div>ACTION ITEMS
        </div>
        <div>Evidence Submission</div>
          <div>Drivers License <button onClick={() => this.props.value.handleClick('PassportImage')}>V</button> </div>
          <div>Proof of Address <button onClick={() => this.props.value.handleClick('PassportImage')}>V</button> </div>
        <div>Complete Relevant Templates</div>
          <button onClick={() => this.props.value.handleClick('SmartDocument')}>Template 1</button>
          <button onClick={() => this.props.value.handleClick('SmartDocument')}>Template 2</button>
          <button onClick={() => this.props.value.handleClick('SmartDocument')}>Template 3</button>
        <div>Send Physical Copy</div>
      </div>
    )
  }
}

class ActionPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  getAction(action) {
    switch(action) {
      case 'SmartDocument':
        return <SmartDocument/>

      case 'PassportImage' :
        return <PassportImage/>
    }
  }

  render() {
    return (
      <div className='actionPanel'>
        {this.getAction(this.props.value.actionState)}
      </div>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className="header">
      </div>
    )
  }
}

class SmartDocument extends React.Component {
  render() {
    return (
      <div>
        <p> THIS IS A DOCUMENT. </p>

        <div>
        Signature
        <textarea></textarea>
        </div>
      </div>
    )
  }
}

class PassportImage extends React.Component {
  render() {
    return (
      <div>
        <p> THIS IS AN IMAGE. </p>
      </div>
    )
  }
}

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionState: '',
      handleClick: this.handleClick.bind(this),
    };
  }

  handleClick(action) {
      this.setState({actionState:action,
      });
  }

  render() {
    return (
      <div>
        <Header />
        <div className='body'>
          <ActionListPanel value={this.state} />
          <ActionPanel value={this.state} />
        </div>
      </div>
    );
  }
}


// ===================================

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
    }
  }

  submitForm(event) {
    console.log(this.state.name);
    if(this.state.name == 'Client') {
      this.props.value.switchState('Client');
    } else if (this.state.name == 'Officer') {
      this.props.value.switchState('Officer');
    }
  }

  render() {
    return (
    <div>
      <form>
        Username: <input type='text'  onChange={(evt) => { this.state.name = evt.target.value; }}/>
        Password: <input type='text'/>
        <button type='submit' onClick={() => this.submitForm()}>Submit</button>
      </form>
    </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'Login',
      switchState: this.switchState.bind(this),
    }
  }

  render() {
    return (
      <div>
        {this.switchPage(this.state.currentPage)}
      </div>
    )
  }

  switchPage(page) {
    switch(page) {
      case 'Client':
        return <Client />
      case 'Officer':
        return <Officer />
      default:
       return <Login value={this.state} />
    }
  }

  switchState(page) {
    this.setState({currentPage: page});
  }

}

// ==================================

class Officer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionState: '',
      handleClick: this.handleClick.bind(this),
    };
  }

  handleClick(action) {
      this.setState({actionState:action,
      });
  }

  render() {
    return (
      <div className='body'>
        <ClientListPanel value={this.state}/>
        <ViewPanel value={this.state}/>
      </div>
    )
  }
}

class ClientListPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='actionListPanel'>
        <div>ACTION ITEMS
        </div>
        <div>Evidence Submission</div>
          <div>Drivers License <button onClick={() => this.props.value.handleClick('PassportImage')}>V</button> </div>
          <div>Proof of Address <button onClick={() => this.props.value.handleClick('PassportImage')}>V</button> </div>
        <div>Complete Relevant Templates</div>
          <button onClick={() => this.props.value.handleClick('SmartDocument')}>Template 1</button>
          <button onClick={() => this.props.value.handleClick('SmartDocument')}>Template 2</button>
          <button onClick={() => this.props.value.handleClick('SmartDocument')}>Template 3</button>
        <div>Send Physical Copy</div>
      </div>
    )
  }
}

class ViewPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  getAction(action) {
    switch(action) {
      case 'SmartDocument':
        return <SmartDocument/>

      case 'PassportImage' :
        return <PassportImage/>
    }
  }

  render() {
    return (
      <div className='actionPanel'>
        {this.getAction(this.props.value.actionState)}
      </div>
    )
  }
}



// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);