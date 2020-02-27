import React from 'react';
import 'normalize.css';
import './App.css';
import htmlToImage from 'html-to-image';
import Skyline from './Skyline';
import TitleCard from './Titlecard';
import intro1 from './sounds/intro1.mp3';
import intro2 from './sounds/intro2.mp3';
import intro3 from './sounds/intro3.mp3';
import intro4 from './sounds/intro4.mp3';
import intro5 from './sounds/intro5.mp3';

class App extends React.Component {
  static defaultProps = {
    titleCards: [
      'WHERE\'S A GRINDSTONE WHEN YOU NEED ONE?',
      'DON JUAN IN HELL',
      'OF MICE AND WOLFMEN',
      'BONE APPÉTIT',
      'LONG NIGHT\'S JOURNEY INTO DAY',
      <>
        <span>IT&apos;S NOT YOU, IT&apos;S ME. . .</span>
        <span>NO, IT&apos;S YOU</span>
      </>,
      'SHIP OF FOOLS',
      <>
        <span>PROFESSOR CRANE&apos;S</span>
        <span>SELF DELUSION 101</span>
      </>,
      'ONCE UPON A TIME FRASIER, ROZ, GIL, BULLDOG, AND TOOTY WENT TO THE BLACK TOWER. . .',
    ],
    intros: [intro1, intro2, intro3, intro4, intro5]
  }
  constructor(props) {
    super(props);
    this.state = {
      intro: '',
      showTitleCard: false,
      showStartButton: true,
      showControls: false,
      cardContent: '',
      imgSource: '',
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    const { titleCards, intros } = this.props;
    this.setState({
      intro: intros[Math.floor(Math.random() * intros.length)],
      cardContent: titleCards[Math.floor(Math.random() * titleCards.length)],
    });
  }

  handleButtonClick() {
    const { showTitleCard, showStartButton } = this.state;
    this.setState({
      showTitleCard: !showTitleCard,
      showStartButton: !showStartButton,
    });
    document.querySelector('header').classList.add('header-shrunk');
  }

  handleSelect() {
    this.setState({
      cardContent: <br />,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const titleCard = document.getElementById('img-target');
    htmlToImage.toJpeg(titleCard)
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        this.setState({ imgSource: img.src });
        document.querySelector('#generatedCard').appendChild(img);
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
    setTimeout(() => {
      const { showTitleCard, showControls } = this.state;
      this.setState({
        showTitleCard: !showTitleCard,
        showControls: !showControls,
      });
    }, 500);
  }

  handleReset() {
    const { showControls, showTitleCard } = this.state;
    const { titleCards } = this.props;
    this.setState({
      showControls: !showControls,
      showTitleCard: !showTitleCard,
      cardContent: titleCards[Math.floor(Math.random() * titleCards.length)],
    });
    const img = document.querySelector('img');
    img.remove();
  }

  render() {
    const {
      intro, showTitleCard, showStartButton, showControls, cardContent, imgSource,
    } = this.state;
    return (
      <div className="App">
        <audio autoPlay id="intro" src={intro}><track kind="captions" /></audio>
        <Skyline />
        {showStartButton
          ? <a className="btn start-btn" href="#titleCard" onClick={this.handleButtonClick}>Let&apos;s get better!</a>
          : null}
        { showTitleCard
          ? (
            <TitleCard
              cardContent={cardContent}
              onSelect={this.handleSelect}
              onSubmit={this.handleSubmit}
            />
          )
          : null}
        <div id="generatedCard" />
        { showControls
          ? (
            <div>
              <a className="btn" href={imgSource} download={Math.floor(Math.random() * 10000)}>Save</a>
              <button type="button" className="btn" onClick={this.handleReset}>Make another</button>
            </div>
          )
          : null}
      </div>
    );
  }
}

export default App;
