import React from 'react';

const SubmitButton = (props) => (
  <button type="submit" className="btn" onClick={props.onSubmit}>Generate</button>
);

class TitleCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    this.props.onSelect();
  }

  handleSubmit(e) {
    this.props.onSubmit(e);
  }

  render() {
    return (
      <>
        <div className="titleCard" id="titleCard">
          <div id="img-target" spellCheck="false" onClick={this.handleSelect} contentEditable>{this.props.cardContent}</div>
        </div>
        <SubmitButton onSubmit={this.handleSubmit} />
      </>
    );
  }
}

export default TitleCard;
