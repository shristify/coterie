import React from "react";
import ToolbarComponent from "./components/Toolbar/Toolbar";

class App1 extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = () => {
   
    this.setState({ left: false });
  };

  openDrawer = () => {
    this.setState({
      left: true
    });
  };

  render() {
    return (
      <div className="App1">
     
     <ToolbarComponent openDrawerHandler={this.openDrawer} />
     

      </div>
    );
  }
}
export default App1;
