import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Card from '../components/card';
import Folder from '../components/folder';
import FolderSelector from '../components/folder-selector';
import Header from '../components/header';
import parseBookmarks from '../util/parse-bookmarks';
import styles from './dashboard.css';

class Dashboard extends React.PureComponent {
  static propTypes = {
    addBookmark: PropTypes.func.isRequired,
    bookmarks: PropTypes.object.isRequired,
    deleteBookmark: PropTypes.func.isRequired,
    deleteFolder: PropTypes.func.isRequired,
    folders: PropTypes.object.isRequired,
    getBookmarks: PropTypes.func.isRequired,
    getFolders: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  state = {
    linkToSave: {
      href: '',
      name: '',
      folder: undefined,
      errors: [],
    },
  };

  componentDidMount = () => {
    if (isEmpty(this.props.bookmarks)) {
      this.props.getBookmarks();
    }
  };

  onLogOutClick = () => {
    this.props.logOut();
  };

  onChange = fieldName => {
    return event => {
      event.persist();
      this.setState(state => ({
        ...state,
        linkToSave: {
          ...state.linkToSave,
          [fieldName]: event.target.value,
        },
      }));
    };
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.state.linkToSave.name && this.state.linkToSave.href) {
      this.props.addBookmark(this.state.linkToSave);
    } else {
      this.setState(state => ({
        ...state,
        linkToSave: {
          ...state.linkToSave,
          errors: ['Please enter a name and a url.'],
        },
      }));
    }
  };

  onDeleteBookmarkClick = (linkId, folder) => {
    this.props.deleteBookmark(linkId, folder);
  };

  onDeleteFolderClick = folder => {
    if (window.confirm('Deleting this folder will remove all bookmarks in it. Do you wish to continue?')) {
      this.props.deleteFolder(folder);
    }
  };

  render() {
    const showBookmarks = !isEmpty(this.props.bookmarks.items);
    const showErrors = !isEmpty(this.state.linkToSave.errors);
    const bookmarkItems = parseBookmarks(this.props.bookmarks.items);

    return (
      <div className={styles.dashboard}>
        <Header onLogOutClick={this.onLogOutClick} />
        {showBookmarks && (
          <div className={styles.body}>
            <h1 className={styles.heading}>Your deck</h1>
            <div className={styles.grid}>
              {bookmarkItems.map(([folder, links], index) => {
                if (folder !== 'Uncategorised') {
                  return <Folder key={index} label={folder} />;
                }

                return links.map(link => <Card {...link} key={link.id} />);
              })}
            </div>
          </div>
        )}
        <form className={styles.actions} onSubmit={this.onSubmit}>
          <div className={styles.actionsInner}>
            <label>
              <span>Name</span>
              <input onChange={this.onChange('name')} type="text" value={this.state.linkToSave.name} />
            </label>
            <label>
              <span>Url</span>
              <input onChange={this.onChange('href')} type="text" value={this.state.linkToSave.href} />
            </label>
            <FolderSelector
              folders={this.props.folders}
              getFolders={this.props.getFolders}
              onChange={this.onChange}
              selectedFolder={this.state.linkToSave.folder}
            />
            <button onClick={this.onSubmit}>Add bookmark</button>
            {showErrors && <div>{this.state.linkToSave.errors}</div>}
          </div>
        </form>
      </div>
    );
  }
}

export default Dashboard;
