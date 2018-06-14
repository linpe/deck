import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import isEmpty from 'lodash/isEmpty';
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
    linkToAdd: {
      sending: false,
      title: '',
      url: '',
    },
    loading: false,
    selectedBookmarks: {},
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

  addBookmark = event => {
    event.preventDefault();

    this.setState(prevState => ({
      ...prevState,
      linkToAdd: {
        ...prevState.linkToAdd,
        sending: true,
      },
    }));

    firebase
      .database()
      .ref(`/bookmarks/${this.props.user}/${this.state.activeFolder}`)
      .push({
        dateAdded: new Date().toISOString(),
        href: this.state.linkToAdd.url,
        name: this.state.linkToAdd.title,
      });
  };

  onChange = (field, newValue) => {
    this.setState(prevState => ({
      ...prevState,
      linkToAdd: {
        ...prevState.linkToAdd,
        [field]: newValue,
      },
    }));
  };

  setActiveFolder = folder => {
    this.setState({
      activeFolder: folder,
    });
  };

  toggleAddPopup = () => {
    this.setState({
      showAddPopup: !this.state.showAddPopup,
    });
  };

  toggleSelected = id => {
    this.setState(prevState => ({
      ...prevState,
      selectedBookmarks: {
        ...prevState.selectedBookmarks,
        [id]: prevState.selectedBookmarks[id] ? false : true,
      },
    }));
  };

  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerInner}>
            {this.state.activeFolder && (
              <button className={styles.backButton} onClick={() => this.setActiveFolder()}>
                Back <div className={styles.backArrow} />
              </button>
            )}
            <p className={styles.headerTitle}>SiteDeck</p>
            <button className={styles.signOutButton} onClick={this.props.onSignOut}>
              Sign out
            </button>
          </div>
        </header>
        <div className={styles.body}>
          <Folders folders={this.state.folders} onFolderClick={this.setActiveFolder} show={!this.state.activeFolder} />
          <FolderItems
            bookmarks={
              this.state.activeFolder &&
              Object.entries(this.state.bookmarks[this.state.activeFolder]).map(([id, properties]) => ({
                ...properties,
                id,
                selected: this.state.selectedBookmarks[id],
              }))
            }
            folder={this.state.activeFolder}
            onToggleSelected={this.toggleSelected}
            show={!!this.state.activeFolder}
          />
        </div>

        <ActionBar
          addDisabled={!this.state.activeFolder}
          addSubmitDisabled={!this.state.linkToAdd.title || !this.state.linkToAdd.url}
          deleteDisabled={
            isEmpty(this.state.selectedBookmarks) ||
            !Object.values(this.state.selectedBookmarks).find(selected => selected)
          }
          linkToAdd={this.state.linkToAdd}
          onAddBookmark={this.addBookmark}
          onAddClick={this.toggleAddPopup}
          onChange={this.onChange}
          onDelete={() => this.props.onDelete(this.state.activeFolder, this.state.selectedBookmarks)}
          showAddPopup={this.state.showAddPopup}
        />
      </div>
    );
  }
}

export default Manager;
