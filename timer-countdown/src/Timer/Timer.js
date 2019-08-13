import React from "react";
import Countdown from "./Countdown/Countdown";
import "./Timer.css"
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class App extends React.Component {
  render() {

    return (
      <div className="Timer">
        <Paper elevation={5} square style={{width:"250px"}}>
            <Typography align="center" variant="h5" component="h3">
              <Countdown />
            </Typography>
        </Paper>
      </div>
    );
  }
}
export default App;