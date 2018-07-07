import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import styles from './card.css';

class Card extends React.PureComponent {
  static propTypes = {
    dateAdded: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onToggleSelected: PropTypes.func.isRequired,
    imageUrl: PropTypes.string,
    selected: PropTypes.bool,
  };

  static defaultProps = {
    imageUrl: undefined,
    selected: false,
  };

  render() {
    let backgroundImage;
    if (this.props.imageUrl) {
      backgroundImage = `url(${this.props.imageUrl})`;
    }

    return (
      <div className={styles.container} onClick={() => this.props.onToggleSelected(this.props.id)}>
        <div className={`${styles.card} ${this.props.selected ? styles.cardSelected : ''}`} key={this.props.id}>
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
      </div>
    );
  }
}

export default Card;
