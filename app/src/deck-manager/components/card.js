import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { format } from 'date-fns';
import styles from './card.css';

class Card extends React.PureComponent {
  static propTypes = {
    dateAdded: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  state = {
    imageUrl: undefined,
  };

  componentDidMount = () => {
    const storage = firebase.storage();
    const storageRef = storage.ref();

    storageRef
      .child(`${this.props.id}-thumb.jpg`)
      .getDownloadURL()
      .then(imageUrl => {
        this.setState({ imageUrl });
      });
  };

  render() {
    let backgroundImage;
    if (this.state.imageUrl) {
      backgroundImage = `url(${this.state.imageUrl})`;
    }

    return (
      <div className={styles.card} key={this.props.id}>
        <div className={styles.cardImage} style={{ backgroundImage }}>
          <div className={styles.cardOverlay}>
            <a className={styles.cardButton} href={this.props.href} target="_blank" rel="noopener noreferrer">
              Open in new tab
            </a>
          </div>
        </div>
        <div className={styles.cardBody}>
          <p className={styles.date}>Added on {format(this.props.dateAdded, 'DD/MM/YYYY')}</p>
          <a className={styles.name} href={this.props.href} target="_blank" rel="noopener noreferrer">
            {this.props.name}
          </a>
        </div>
      </div>
    );
  }
}

export default Card;
