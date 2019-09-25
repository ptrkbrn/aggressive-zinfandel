import React from 'react';
import './App.css';
import htmlToImage from 'html-to-image';
import TitleCard from './Titlecard';
import intro from './intro.mp3';

function Skyline() {
  return (
    <header>
      <svg
        version="1.1"
        id="Layer_2"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 1143.08 794.94"
        style={{ enableBackground: 'new 0 0 1143.08 794.94' }}
        xmlSpace="preserve"
      >
        <path
          className="skyline"
          d="M83.59,623c0,0,7,4,12-11s2.34-202.33,2.34-202.33h58.14l1.65,210.09l9.91,0.33l1.32-74.99h37.33l1.32,76.31
          l15.2,0.33l1.65-293.34l16.85-16.19h29.4l15.2,13.21l0.29,56.33l1.04,203.97l23.45,0.66V413.3l3.63-3.96l71.02-0.33l3.63,2.64
          l1.32,98.77l4.29,2.97l7.27,0.33l5.62-1.98l1.32-4.96l1.32-202.49h78.62l1.98,278.47c0,0,6.61,11.89,12.88-0.33
          c6.28-12.22,1.65-212.73,1.65-212.73l38.98-36.34l41.62,37.99v71.68l1.32,4.96l2.97,2.64l26.43-0.99l3.3-2.31l1.32-4.62l3.3-34.35
          l11.89-59.79c0,0,7.28-75.55-6.17-116.51c-7.81-23.8-38.16-21.55-40.41-23.55c-20.48-18.17-25.79-13.06-29.73-13.87
          c-3.94-0.81,23.12-4.62,23.12-4.62l6.94-9.25l52.85-13.21l3.3-15.2l6.94-4.29l2.64-49.88l3.63,50.87l8.26,4.96v12.22l54.84,17.18
          l16.19,9.91l12.22,1.32l-25.44,1.98l-1.98,5.95l-1.32,6.28l-5.62,2.64l-20.81,1.32c0,0-15.53,1.98-20.81,50.21
          s4.29,112.31,4.29,112.31l38.65,0.66l1.98,3.96l0.99,23.12h114.96l1.65,139.73l2.64,4.29l10.24-0.66l4.29-3.96V334.68l4.62-2.97
          l8.92-26.1l3.96-1.98l7.93-29.07l4.96-4.62v-4.29l1.32-18.5l7.93-5.29l5.95-10.9c0,0-0.2-17.84,2.31-16.85
          c2.51,0.99,5.29,19.16,5.29,19.16l2.64,8.26l5.62,4.96l2.64,24.44l4.29,4.62l6.28,26.1l4.96,2.97l7.93,20.48v5.29l3.96,3.3
          l2.31,287.39l9.58-0.33l2.97-2.31l1.32-159.88l13.21,0.33"
        />
      </svg>
      <div className="header-text">
        <div id="title">
          <h1>FRASIER</h1>
          <p><em>Title Card Generator</em></p>
        </div>
      </div>
    </header>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTitleCard: false,
      showStartButton: true,
      showControls: false,
      cardContent: 'ONCE UPON A TIME FRASIER, ROZ, GIL, BULLDOG, AND TOOTY WENT TO THE BLACK TOWER. . .',
      imgSource: '',
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleButtonClick() {
    this.setState({
      showTitleCard: !this.state.showTitleCard,
      showStartButton: !this.state.showStartButton,
    });
    document.querySelector('header').classList.add('header-shrunk');
  }

  handleChange(input) {
    this.setState({
      cardContent: input,
    });
    console.log(this.state.cardContent);
  }

  handleSubmit() {
    const titleCard = document.getElementById('img-target');
    htmlToImage.toJpeg(titleCard)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        this.setState({ imgSource: img.src });
        console.log(this.state.imgSource);
        document.querySelector('#generatedCard').appendChild(img);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
    setTimeout(() => {
      this.setState({
        showTitleCard: !this.state.showTitleCard,
        showControls: !this.state.showControls,
      });
    }, 500);
  }

  handleReset() {
    this.setState({
      showControls: !this.state.showControls,
      showTitleCard: !this.state.showTitleCard,
    });
    const img = document.querySelector('img');
    img.remove();
  }

  render() {
    return (
      <div className="App">
        <div>
          <audio autoPlay id="intro">
            <source src={intro} />
          </audio>
        </div>
        <Skyline />
        {this.state.showStartButton
          ? <a className="btn start-btn" href="#titleCard" onClick={this.handleButtonClick}>Let's get better!</a>
          : null}
        { this.state.showTitleCard
          ? (
            <TitleCard
              cardContent={this.state.cardContent}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            />
          )
          : null}
        <div id="generatedCard" />
        { this.state.showControls
          ? (
            <div>
              <a className="btn" href={this.state.imgSource} download>Save</a>
              <button type="button" className="btn" onClick={this.handleReset}>Make another</button>
            </div>
          )
          : null}
      </div>
    );
  }
}

export default App;