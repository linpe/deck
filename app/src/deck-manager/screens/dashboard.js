import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Actions from '../components/actions';
import Card from '../components/card';
import CardList from '../components/card-list';
import Folder from '../components/folder';
import { parseBookmarks } from '../util/parse-bookmarks';
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
    selectBookmark: PropTypes.func.isRequired,
    selectedBookmarks: PropTypes.object.isRequired,
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
    const bookmarkItems = parseBookmarks(this.props.bookmarks.items);

    return (
      <div className={styles.dashboard}>
        {showBookmarks && (
          <CardList heading="Your deck">
            {bookmarkItems.map(([folder, links], index) => {
              if (folder !== 'Uncategorised') {
                return <Folder key={index} label={folder} />;
              }

              return links.map(link => (
                <Card
                  {...link}
                  key={link.id}
                  onSelectClick={this.props.selectBookmark}
                  selected={this.props.selectedBookmarks[link.id]}
                />
              ));
            })}
          </CardList>
        )}
        <Actions
          {...this.state.linkToSave}
          folders={this.props.folders}
          onChange={this.onChange}
          onGetFolders={this.props.getFolders}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default Dashboard;
