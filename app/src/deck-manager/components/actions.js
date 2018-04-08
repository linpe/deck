import React from 'react';
import PropTypes from 'prop-types';
import Action from './action';
import AddSiteButton from './add-site-button';
import FolderSelector from './folder-selector';
import styles from './actions.css';

class Actions extends React.PureComponent {
  static propTypes = {
    errors: PropTypes.array.isRequired,
    folders: PropTypes.object.isRequired,
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onGetFolders: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    folder: PropTypes.string,
  };

  static defaultProps = {
    folder: undefined,
  };

  state = {
    showAddNewSite: false,
  };

  toggleAddNewSite = () => {
    this.setState({ showAddNewSite: !this.state.showAddNewSite });
  };

  renderAddNewSite() {
    return (
      <Action buttonLabel="Add a new site" onClick={this.toggleAddNewSite}>
        {this.state.showAddNewSite && (
          <AddSiteButton
            errors={this.props.errors}
            folders={this.props.folders}
            href={this.props.href}
            name={this.props.name}
            onChange={this.props.onChange}
            onGetFolders={this.props.onGetFolders}
            onSubmit={this.props.onSubmit}
            selectedFolder={this.props.folder}
          />
        )}
      </Action>
    );
  }

  render() {
    return (
      <form className={styles.actions} onSubmit={this.props.onSubmit}>
        <div className={styles.actionsInner}>{this.renderAddNewSite()}</div>
      </form>
    );
  }
}

export default Actions;
