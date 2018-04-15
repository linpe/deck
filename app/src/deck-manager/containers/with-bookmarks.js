import React from 'react';
import PropTypes from 'prop-types';

const withBookmarks = Component => {
  class WithBookmarks extends React.PureComponent {
    static propTypes = {
      database: PropTypes.object.isRequired,
      user: PropTypes.shape({
        uid: PropTypes.string,
      }),
    };

    static defaultProps = {
      user: {
        uid: undefined,
      },
    };

    state = {
      bookmarks: {},
    };

    getBookmarks = () => {
      this.setState({
        bookmarks: {
          loading: true,
        },
      });

      this.props.database.ref(`/bookmarks/${this.props.user.uid}`).on('value', snapshot => {
        this.setState({
          bookmarks: {
            items: snapshot.val(),
            loading: false,
          },
        });
      });
    };

    addBookmark = ({ name, href, folder = 'Uncategorised' }) => {
      this.props.database.ref(`bookmarks/${this.props.user.uid}/${folder}`).push({
        dateAdded: new Date().toISOString(),
        href,
        name,
      });
    };

    deleteBookmark = (linkId, folder = 'Uncategorised') => {
      this.props.database.ref(`/bookmarks/${this.props.user.uid}/${folder}/${linkId}`).remove();
    };

    render() {
      return (
        <Component
          {...this.state}
          {...this.props}
          addBookmark={this.addBookmark}
          deleteBookmark={this.deleteBookmark}
          getBookmarks={this.getBookmarks}
          selectBookmark={this.selectBookmark}
        />
      );
    }
  }

  return WithBookmarks;
};

export default withBookmarks;
