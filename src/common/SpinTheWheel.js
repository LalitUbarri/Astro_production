import React from "react";
// import ReactDOM from "react-dom";
import "../styles/SpinTheWheel.css";
import axios from "axios";
// import SpinTheWheelPopup1 from "./SpinTheWheelPopup1";
import Confetti from "./Confetti";
import AudioSound from "../Audio/SpinAudio.mpeg";
import swal from 'sweetalert';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class SpinTheWheel extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      list: [],
      list1:[],
      breakpoint:[],
      value:'Lalit kumar',
      copied: false,
      IsCong:false,
      spinData:[],
      radius: 75, // PIXELS
      rotate: 0, // DEGREES
      easeOut: 0, // SECONDS
      angle: 0, // RADIANS
      top: null, // INDEX
      offset: null, // RADIANS
      net: null, // RADIANS
      result: null, // INDEX
      spinning: false,
      resultNum:null,
      copySuccess: ''
    };
  }
  
  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: 'Copied!' });
  };
  componentDidMount() {
    if(this.props.rotate === 0){
      this.setState({
        rotate: 0,
        easeOut: 0,
        result: null,
        spinning: false
      });
    }
    var Api_Url1 = `http://14.99.239.245:8080/Wheel/getWheelIndex?usertype=Existing&medium=Android`;
    fetch(Api_Url1,{
      method:'Post',
      headers:{
        // 'Content-Type': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
      },
      // body:NewUserData
    }).then(response => response.json()).then(res =>{
      console.log(res);
      this.setState({
        breakpoint:res
      })
    }).catch(err => {
      console.log(err);
    })


    var Api_url = `http://14.99.239.245:8080/Wheel/getWheelDataWEB?msisdn=${localStorage['msisdn']}&deviceid=1234&usertype=Existing&medium=Android`;
    
    fetch(Api_url,{
      method:'Post',
      headers:{
        // 'Content-Type': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then(response => response.json()).then(res =>{
      this.setState({
        spinData:res
      })
      console.log('spin',res);

      var arrayData = this.state.spinData.map(d => Object.values(d))
      for (var i = 0; i < arrayData.length; i++){
          this.state.list.push(arrayData[i][2]);
          this.state.list1.push(arrayData[i][1]);
          // this.state.breakpoint.push(arrayData[i][4]);
          // console.log(arrayData[i][2]);
      } 
      if(this.state.list.length !== 0){
        // generate canvas wheel on load
        this.renderWheel();
      }else{
        return;
      }
    }).catch(err =>{
      // alert(err)
      console.log(err);
    })

    // var Api_url = `http://14.99.239.245:8080/API/FetchWheelAPI`;
    // axios.get(Api_url).then(res => {
    //   // console.log(res.data)
    //     this.setState({
    //       spinData:res.data,
    //     })
    //   var arrayData = this.state.spinData.map(d => Object.values(d))
    //   for (var i = 0; i < arrayData.length; i++){
    //       this.state.list.push(arrayData[i][1]);
    //       this.state.list1.push(arrayData[i][2]);
    //       // console.log(arrayData[i][2]);
    //   } 
    //   if(this.state.list.length !== 0){
    //     // generate canvas wheel on load
    //     this.renderWheel();
    //   }else{
    //     return;
    //   }
    // }).catch(err => {console.log(err);})
    
  }

  renderWheel() {
    console.log(this.state.list);
    console.log(this.state.list1);
    // determine number/size of sectors that need to created
    let numOptions = this.state.list.length;
    let arcSize = (2 * Math.PI) / numOptions;
    // alert(2 * Math.PI/numOptions)
    this.setState({
      angle: arcSize
    });

    // get index of starting position of selector
    this.topPosition(numOptions, arcSize);
    // dynamically generate sectors from state list
    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = this.state.list[i];
      if(i % 2 === 0){
        this.renderSector(i + 1, text, angle, arcSize,this.GetEvenColor());
      }else{
        this.renderSector(i + 1, text, angle, arcSize, this.getOddColor());;
      }
      angle += arcSize;
    }
  }

  topPosition = (num, angle) => {
    // set starting index and angle offset based on list length
    // works upto 9 options
    let topSpot = null;
    let degreesOff = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    this.setState({
      top: topSpot - 1,
      offset: degreesOff
    });
  };

  renderSector(index, text, start, arc, color) {
    // create canvas arc for each list element
    let canvas = document.getElementById("wheel");
    let ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let radius = this.state.radius;
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = radius * 3.33;
    let textRadius = baseSize - 120;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 3.5;
    ctx.strokeStyle = color;
  

    ctx.font = "14px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2) * textRadius,
      baseSize + Math.sin(angle - arc / 2) * textRadius
    );

    ctx.rotate(angle - 450 / 2 + Math.PI / 2);
    ctx.fillText(text, - ctx.measureText(text).width / 2, 2);
    ctx.restore();
  }

  getOddColor() {
    // randomly generate rbg values for wheel sectors
    let r = 1 * 255;
    let g = 1 * 255;
    let b = 1 * 255;
    return `rgba(${r},${g},${b},1)`;
  }

  GetEvenColor() {
    // randomly generate rbg values for wheel sectors
    let r = 1 * 255;
    let g = 1 * 155;
    let b = 1 * 5;
    return `rgba(${r},${g},${b},1)`;
  }

  spin = () => {
    this.PlaySound();

    setTimeout(()=>{
      this.setState({
        IsCong:false
      })
    },11000)
    
    // set random spin degree and ease out time
    // set state variables to initiate animation
    // let randomSpin = Math.floor(Math.random() * 900) + 500;
    // if

    // let randomSpin = 360 * 10 + 45 * this.state.breakpoint[0].wheelid;
    var wheelpoint;
    this.state.spinData.map((item,i)=> {
      console.log("spindataid", item.id);
      for(var i = 0; i < this.state.breakpoint.length; i++){
        console.log('itemid',this.state.breakpoint[i].wheelid);
        if(this.state.breakpoint[i].wheelid === item.id){
          wheelpoint = item.wheelpointindex;
        }
      }
    })
    console.log("11111jdfhdf", wheelpoint);
    let randomSpin = 360 * 35 + (45 * wheelpoint);
    // let randomSpin = 360 * 10 + 45;
    this.setState({
      rotate: randomSpin,
      easeOut: 5,
      spinning: true
    });

    // if()
    // alert( randomSpin)
    // calcalute result after wheel stops spinning

    setTimeout(() => {
      this.getResult(randomSpin);
    }, 5000);
    // alert(randomSpin)
  };

  getResult = spin => {
    // find net rotation and add to offset angle
    // repeat substraction of inner angle amount from total distance traversed
    // use count as an index to find value of result from state list
    const { angle, top, offset, list } = this.state;
    let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
    let travel = netRotation + offset;
    let count = top + 1;

    while (travel > 0) {
      travel = travel - angle;
      count--;
    }
    let result;
    if (count >= 0) {
      result = count;
      
    } else {
      result = list.length + count;
    }
    if(result !== 0) {
      this.setState({
        IsCong:true
      })
    }else{
      this.setState({
        IsCong:false
      })
    }
    console.log("hello",result);
    // set state variable to display result
    this.setState({
      net: netRotation,
      result: result,
      resultNum:result
    });
  };

  reset = () => {
    // reset wheel and result
    this.setState({
      rotate: 0,
      easeOut: 0,
      result: null,
      spinning: false
    });
  };

  

   PlaySound = () =>{
    var audio = new Audio(AudioSound);
    // Stop and rewind the sound (stops it if already playing).
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    audio.play();

  }
  
  render() {
    return (
      <>
      <div className="SpinApp">
        <span id="selector">&#9660;</span>
        <canvas

          className="Wheel"
          id="wheel"
          width="500"
          height="500"
          style={{
            WebkitTransform: `rotate(${this.state.rotate}deg)`,
            WebkitTransition: `-webkit-transform ${
              this.state.easeOut
            }s ease-out`
          }}
        />

        {this.state.spinning ? (
          <button type="button" id="reset" 
          // onClick={this.reset}
          >
           Spin
          </button>
        ) : (
          <button type="button" id="spin" onClick={this.spin}>
            spin
          </button>
        )}
        {this.state.IsCong ? this.state.list1[this.state.result] === 0 && this.state.list1[this.state.result] === 7 ? null:<Confetti />:null}
      </div>
      <div class="display mt-3">
      
          <span id="readout">
            YOU WON: {""}
            {this.state.list1[this.state.result] ? this.state.spinData[this.state.result].offertype === "COUPON" ? <div className="copyOuter">
              <textarea 
                  ref={(textarea) => this.textArea = textarea}
                  defaultValue={this.state.list1[this.state.result]}
                  rows="1"
                />
                <span onClick={this.copyToClipboard} class="CopyBtn"> {this.state.copySuccess ? <> {this.state.copySuccess}</>:'Copy'} </span>
              </div>:<span id="result"> {this.state.list1[this.state.result]} </span>:<span id="result"> {this.state.list1[this.state.result]} </span> }
          </span>
          <p className="text-center mt-2">  {this.state.list1[this.state.result] ? this.state.spinData[this.state.result].description:null}</p>
        </div>
    </>
    );
  }
}


export default SpinTheWheel;