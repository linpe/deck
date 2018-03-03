import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

class FolderSelector extends React.PureComponent {
  static propTypes = {
    getFolders: PropTypes.func.isRequired,
    folders: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.string),
      loading: PropTypes.bool,
    }),
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    folders: {
      items: undefined,
      loading: false,
    },
    selectedFolder: undefined,
  };

  componentDidMount = () => {
    if (isEmpty(this.props.folders)) {
      this.props.getFolders();
    }
  };

  render() {
    if (this.props.folders.loading) {
      return <div>Loading folders...</div>;
    }

    const showFolders = !isEmpty(this.props.folders.items);

    return (
      <select value={this.props.selectedFolder} onChange={this.props.onChange('folder')}>
        {showFolders &&
          this.props.folders.items.map((folder, index) => (
            <option key={index} value={folder}>
              {folder}
            </option>
          ))}
      </select>
    );
  }
}

export default FolderSelector;
