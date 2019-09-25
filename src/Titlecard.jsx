import React from 'react';

const SubmitButton = (props) => (
  <button type="submit" className="btn" onClick={props.onSubmit}>Generate</button>
);

class TitleCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.innerText);
  }

  handleSubmit() {
    this.props.onSubmit();
  }

  render() {
    return (
      <>
        <div className="titleCard" id="titleCard">
          <div id="img-target" onChange={this.handleChange} dangerouslySetInnerHTML={{__html: this.props.cardContent}} contentEditable></div>
        </div>
        <SubmitButton onSubmit={this.handleSubmit} />
      </>
    );
  }
}

export default TitleCard;
