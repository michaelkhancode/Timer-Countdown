import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

class Countdown extends Component {
    constructor(props){
        super(props);
        this.state = {
            timerOn: false,
            timerStart: 0,
            timerTime: 0
        }
    }

    startTimer = () => {
        this.setState({
          timerOn: true,
          timerTime: this.state.timerTime,
          timerStart: this.state.timerTime
        });
        this.timer = setInterval(() => {
          const newTime = this.state.timerTime - 10;
          if (newTime >= 0) {
            this.setState({
              timerTime: newTime
            });
          } else {
            clearInterval(this.timer);
            this.setState({ timerOn: false });
            alert("Countdown ended");
          }
        }, 10);
      };

    stopTimer = () => {
      clearInterval(this.timer);
      this.setState({ timerOn: false });
    };

    resetTimer = () => {
      if (this.state.timerOn === false) {
        this.setState({
          timerTime: this.state.timerStart
        });
      }
    };

    adjustTimer = input => {
      const { timerTime, timerOn } = this.state;
      const max = 216000000;
      if (!timerOn) {
        if (input === "incHours" && timerTime + 3600000 < max) {
          this.setState({ timerTime: timerTime + 3600000 });
        } else if (input === "decHours" && timerTime - 3600000 >= 0) {
          this.setState({ timerTime: timerTime - 3600000 });
        } else if (input === "incMinutes" && timerTime + 60000 < max) {
          this.setState({ timerTime: timerTime + 60000 });
        } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
          this.setState({ timerTime: timerTime - 60000 });
        } else if (input === "incSeconds" && timerTime + 1000 < max) {
          this.setState({ timerTime: timerTime + 1000 });
        } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
          this.setState({ timerTime: timerTime - 1000 });
        }
      }
    };

    render() {
        const { timerTime, timerStart, timerOn } = this.state;
        let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
        let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

        return (
        <div className="Countdown">
              <div style={{display:"flex", justifyContent:"center"}} className="Countdown-time">
                <div className="hours">
                  {hours}
                  <br/>
                  <ButtonGroup size="small" 
                  aria-label="small outlined button group"
                  >
                    <Button
                    onClick={() => this.adjustTimer("incHours")}
                    >
                      <FontAwesomeIcon  icon={faArrowUp}/>
                    </Button>
                    <Button
                    onClick={() => this.adjustTimer("decHours")}
                    >
                      <FontAwesomeIcon  icon={faArrowDown}/>
                    </Button>
                  </ButtonGroup>
                </div> 
                :
                <div className="minutes">
                  {minutes}
                  <br/>
                  <ButtonGroup size="small" 
                  aria-label="small outlined button group"
                  >
                    <Button
                    onClick={() => this.adjustTimer("incMinutes")}
                    >
                      <FontAwesomeIcon  icon={faArrowUp}/>
                    </Button>
                    <Button
                    onClick={() => this.adjustTimer("decMinutes")}
                    >
                      <FontAwesomeIcon  icon={faArrowDown}/>
                    </Button>
                  </ButtonGroup>
                </div> 
                :
                <div className="seconds">
                  {seconds}
                  <br/>
                  <ButtonGroup size="small" 
                  aria-label="small outlined button group"
                  >
                    <Button
                    onClick={() => this.adjustTimer("incSeconds")}
                    >
                      <FontAwesomeIcon  icon={faArrowUp}/>
                    </Button>
                    <Button
                    onClick={() => this.adjustTimer("decSeconds")}
                    >
                      <FontAwesomeIcon  icon={faArrowDown}/>
                    </Button>
                  </ButtonGroup>
                </div> 
            </div>
            
            {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
              <Button 
              style={{backgroundColor:"rgb(65, 209, 8)", color:"white" }} 
              variant="outlined" 
              size="small" 
              onClick={this.startTimer}
              >
                      Start
              </Button>
            )}
            {timerOn === true && timerTime >= 1000 && (
              <Button 
              style={{backgroundColor:"rgb(252, 57, 3)", color:"white" }} 
              variant="outlined" 
              size="small" 
              color="primary" 
              onClick={this.stopTimer}
              >
                      Stop
              </Button>
            )}
            {timerOn === false &&
            (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
              // <button onClick={this.startTimer}>Resume</button>
              <Button 
              style={{backgroundColor:"rgb(252, 173, 3)", color:"white" }} 
              variant="outlined" 
              size="small" 
              onClick={this.startTimer}
              >
                Resume
              </Button>
            )}
            {(timerOn === false || timerTime < 1000) &&
            (timerStart !== timerTime && timerStart > 0) && (
              <Button 
              style={{backgroundColor:"rgb(252, 219, 3)", color:"white" }} 
              variant="outlined" 
              size="small" 
              onClick={this.resetTimer}
              >
                Reset
              </Button>
            )}
        </div>
        );
    }
}
export default Countdown;