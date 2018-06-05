import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import ActionBar from './action-bar';
import FolderItems from './folder-items';
import Folders from './folders';
import styles from './index.css';

class Manager extends React.PureComponent {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
  };

  state = {
    activeFolder: undefined,
    bookmarks: {},
    folders: [],
    loading: false,
    showAddPopup: false,
  };

  componentDidMount() {
    this.getBookmarks();
  }

  getBookmarks = () => {
    this.setState({ loading: true });

    firebase
      .database()
      .ref(`/bookmarks/${this.props.user}`)
      .on('value', snapshot => {
        this.setState({
          bookmarks: snapshot.val(),
          folders: Object.keys(snapshot.val()),
          loading: false,
        });
      });
  };

  setActiveFolder = folder => {
    this.setState({
      activeFolder: folder,
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          {this.state.activeFolder && (
            <button className={styles.backButton} onClick={() => this.setActiveFolder()}>
              Back <div className={styles.backArrow} />
            </button>
          )}
          <p className={styles.headerTitle}>SiteDeck</p>
          <button className={styles.signOutButton} onClick={this.props.onSignOut}>
            Sign out
          </button>
        </header>
        <div className={styles.body}>
          <Folders folders={this.state.folders} onFolderClick={this.setActiveFolder} show={!this.state.activeFolder} />
          <FolderItems
            bookmarks={
              this.state.activeFolder &&
              Object.entries(this.state.bookmarks[this.state.activeFolder]).map(([id, properties]) => ({
                ...properties,
                id,
              }))
            }
            folder={this.state.activeFolder}
            show={!!this.state.activeFolder}
          />
        </div>
        <ActionBar onDelete={this.props.onDelete} />
      </div>
    );
  }
}

export default Manager;