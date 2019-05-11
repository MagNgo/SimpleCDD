import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LicenseImage from './License.png';
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

// ============================================================

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionState: '',
      handleClick: this.handleClick.bind(this),
      items: ['Dashboard','Documents','Inbox','Calendar','Setting'],
      switchPage: this.props.value,
    };
  }

  handleClick(action) {
      this.setState({actionState:action,
      });
  }

  render() {
    return (
      <div>
        <SideBar value={this.state} />
        <div className='body'>
          <ActionListPanel value={this.state} />
          <ActionPanel value={this.state} />
        </div>
      </div>
    );
  }
}

class ActionListPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='actionListPanel'>
        <div>ACTION ITEMS
        </div>
        <div>Evidence Submission</div>
          <div>Driver's License <Button onClick={() => this.props.value.handleClick('PassportImage')}>Upload</Button> </div>
          <div>Proof of Address <Button onClick={() => this.props.value.handleClick('PassportImage')}>Complete</Button> </div>
        <div>Complete Relevant Templates</div>
          <Button onClick={() => this.props.value.handleClick('SmartDocument')}>Template 1</Button>
          <Button onClick={() => this.props.value.handleClick('SmartDocument')}>Template 2</Button>
          <Button onClick={() => this.props.value.handleClick('SmartDocument')}>Template 3</Button>
        <div>Sent Physical Copy</div>
        <div><Button>Yes</Button></div>
                <TextField
                  id="standard-name"
                  label="Date"
                  //onChange={this.handleChange('name')}
                  margin="normal"
                />
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

//Login
// ===================================

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '',
    }
  }

  submitForm(event) {
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
        <Button type='submit' onClick={() => this.submitForm()}>Submit</Button>
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
        return <Client value={this.state} />
      case 'Officer':
        return <Officer value={this.state}/>
      default:
       return <Login value={this.state} />
    }
  }

  switchState(page) {
    this.setState({currentPage: page});
  }

}

//Officer
// ==================================

class Officer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionState: '',
      handleClick: this.handleClick.bind(this),
      items: ['Clients', 'Inbox', 'Settings'],
      switchPage: this.props.value,
    };
  }

  handleClick(action) {
      this.setState({actionState:action,
    });
  }

  render() {
    return (
      <div>
        <SideBar value={this.state} />
        <div className='body'>
          <ClientListPanel value={this.state}/>
          <ViewPanel value={this.state} style={{overflow: 'auto'}}/>
        </div>
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
        <div>
          <SimpleMenu />
        </div>
        <div>
          <Button>Beneficial Owners</Button> - Validated
        </div>
        <div>Evidence Submission</div>
          <div>Drivers License <Button onClick={() => this.props.value.handleClick('CompletedDriversLicence')}>Complete</Button> </div>
          <div>Proof of Address <Button >Error - Expired</Button> </div>
        <div>Complete Relevant Templates</div>
          <Button onClick={() => this.props.value.handleClick('SmartDocument')}>Template 1 - Signed</Button>
          <Button onClick={() => this.props.value.handleClick('SmartDocument')}>Template 2 - Signed</Button>
          <Button onClick={() => this.props.value.handleClick('SmartDocument')}>Template 3 - Signed</Button>
        <div>Physical Copy - Sent</div>
        <div>Have they been received? <Button>Yes</Button> <Button>No</Button></div>
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

      case 'CompletedDriversLicence':
        return <CompletedDriversLicence />
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

//Side bar
// ====================================
class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openState: false,
    };
    console.log(props);

  }


  toggleDrawer = (state) => () => {
    this.setState({
      openState: state,
    });
  };

   logout() {
     this.props.value.switchPage.switchState('Login');
   }

  render() {
    return (
      <div>
       <div className="header">
       </div>
       <Drawer
         variant="permanent"
               anchor="top">
       <div><Button className='header' onClick={this.toggleDrawer(true)}>-</Button>
       <Button className='header rightside' onClick={() => this.logout()} >Sign out</Button></div>
       </Drawer>
       <Drawer
        open={this.state.openState}
        onClose={this.toggleDrawer(false)}
        className='drawer'
        anchor="left">
        <List>
          {this.props.value.items.map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      </div>
    )
  }
}


// ========================================
class SimpleMenu extends React.Component {
  state = {
    openDropDown: false,
  };

  handleClick = event => {
    this.setState({ openDropDown: true });
  };

  handleClose = () => {
    this.setState({ openDropDown: false });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Tom
        </Button>
        <Menu
          id="simple-menu"
          open={this.state.openDropDown}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Tom</MenuItem>
          <MenuItem onClick={this.handleClose}>Person 2</MenuItem>
          <MenuItem onClick={this.handleClose}>Person 3</MenuItem>
        </Menu>
      </div>
    );
  }
}

//  action items
// ======================================

class SmartDocument extends React.Component {
  render() {
    return (
      <div>
        <p> THIS IS A DOCUMENT. </p>

        <div>
                <TextField
                  id="standard-name"
                  label="Signature"
                  //onChange={this.handleChange('name')}
                  margin="normal"
                />
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

class CompletedDriversLicence extends React.Component {
  render() {
    return (
      <div>
        <img src={LicenseImage} className='image'/>
        <p> STUFF EXTRACTED FROM DRIVERS LICENSE </p>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);