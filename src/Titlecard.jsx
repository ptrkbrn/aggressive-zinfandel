import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ onSubmit }) => (
  <button type="submit" className="btn" onClick={onSubmit}>Generate</button>
);

SubmitButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

class TitleCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    const { onSelect } = this.props;
    onSelect();
  }

  handleSubmit(e) {
    const { onSubmit } = this.props;
    onSubmit(e);
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

TitleCard.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TitleCard;
