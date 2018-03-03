import React from 'react';
import PropTypes from 'prop-types';

const withFolders = Component => {
  class WithFolders extends React.PureComponent {
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
      folders: {},
    };

    getFolders = () => {
      this.setState({
        folders: {
          loading: true,
        },
      });

      this.props.database.ref(`/bookmarks/${this.props.user.uid}`).on('value', snapshot => {
        this.setState({
          folders: {
            items: Object.keys(snapshot.val()),
            loading: false,
          },
        });
      });
    };

    deleteFolder = folder => {
      this.props.database.ref(`/bookmarks/${this.props.user.uid}/${folder}`).remove();
    };

    render() {
      return (
        <Component
          {...this.props}
          folders={this.state.folders}
          deleteFolder={this.deleteFolder}
          getFolders={this.getFolders}
        />
      );
    }
  }

  return WithFolders;
};

export default withFolders;
