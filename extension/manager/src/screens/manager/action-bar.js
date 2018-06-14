import React from 'react';
import PropTypes from 'prop-types';
import ClickOutside from '../../components/click-outside';
import PrimaryButton from '../../components/primary-button';
import Input from '../../components/input';
import styles from './action-bar.css';

const ActionBar = ({
  addDisabled,
  addSubmitDisabled,
  deleteDisabled,
  linkToAdd,
  onAddBookmark,
  onAddClick,
  onChange,
  onDelete,
  showAddPopup,
}) => (
  <div className={styles.container}>
    <div className={styles.inner}>
      <div className={styles.add}>
        <button className={`${styles.button} ${styles.addButton}`} disabled={addDisabled} onClick={onAddClick}>
          Add new site
        </button>
        {showAddPopup && (
          <ClickOutside close={onAddClick}>
            <div className={styles.popup}>
              <form onSubmit={onAddBookmark}>
                <Input
                  label="Site name"
                  onChange={event => onChange('title', event.target.value)}
                  type="text"
                  value={linkToAdd.title}
                  autoFocus
                />
                <Input
                  label="Site url"
                  onChange={event => onChange('url', event.target.value)}
                  type="text"
                  value={linkToAdd.url}
                />
                <PrimaryButton disabled={addSubmitDisabled}>Add site</PrimaryButton>
              </form>
            </div>
          </ClickOutside>
        )}
      </div>
      <button className={styles.button} disabled={deleteDisabled} onClick={onDelete}>
        Delete
      </button>
    </div>
  </div>
);

ActionBar.propTypes = {
  addDisabled: PropTypes.bool.isRequired,
  addSubmitDisabled: PropTypes.bool.isRequired,
  deleteDisabled: PropTypes.bool.isRequired,
  linkToAdd: PropTypes.object.isRequired,
  onAddBookmark: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  showAddPopup: PropTypes.bool.isRequired,
};

export default ActionBar;
