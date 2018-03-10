import React from 'react';

const withClickOutside = Component => {
  class WithClickOutside extends React.PureComponent {
    componentDidMount = () => {
      document.addEventListener('click', this.handleClickOutside);
    };

    componentWillUnmount = () => {
      document.removeEventListener('click', this.handleClickOutside);
    };

    handleClickOutside = event => {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        // eslint-disable-next-line no-undef
        chrome.runtime.sendMessage(process.env.REACT_APP_EXTENSION_ID, { close: true });
      }
    };

    setWrapperRef = ref => {
      this.wrapperRef = ref;
    };

    render() {
      return (
        <div ref={this.setWrapperRef}>
          <Component {...this.props} />
        </div>
      );
    }
  }

  return WithClickOutside;
};

export default withClickOutside;
