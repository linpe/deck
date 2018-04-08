import React from 'react';
import PropTypes from 'prop-types';
import FolderSelector from './folder-selector';
import styles from './add-site-button.css';

const AddSiteButton = ({ errors, folders, href, name, onChange, onGetFolders, onSubmit, selectedFolder }) => (
  <React.Fragment>
    <input className={styles.input} onChange={onChange('name')} placeholder="Name" type="text" value={name} />
    <input className={styles.input} onChange={onChange('href')} placeholder="Url" type="text" value={href} />
    <FolderSelector folders={folders} getFolders={onGetFolders} onChange={onChange} selectedFolder={selectedFolder} />
    <button className={styles.button} onClick={onSubmit}>
      Add site
    </button>
    {errors.length > 0 &&
      errors.map(error => (
        <div className={styles.error} key={error}>
          {error}
        </div>
      ))}
  </React.Fragment>
);
AddSiteButton.propTypes = {
  errors: PropTypes.array.isRequired,
  folders: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onGetFolders: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedFolder: PropTypes.string,
};

AddSiteButton.defaultProps = {
  selectedFolder: '',
};

export default AddSiteButton;
