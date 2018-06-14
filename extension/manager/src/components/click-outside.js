import React from 'react';
import PropTypes from 'prop-types';

class ClickOutside extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    close: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (!this.ref.contains(event.target)) {
      this.props.close();
    }
  };

  setRef = ref => {
    this.ref = ref;
  };

  render() {
    return <div ref={this.setRef}>{this.props.children}</div>;
  }
}

export default ClickOutside;
