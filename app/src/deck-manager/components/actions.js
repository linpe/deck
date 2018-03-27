import React from 'react';
import PropTypes from 'prop-types';
import FolderSelector from './folder-selector';
import styles from './actions.css';

const Actions = ({ errors, folder, folders, href, name, onChange, onGetFolders, onSubmit }) => (
  <form className={styles.actions} onSubmit={onSubmit}>
    <div className={styles.actionsInner}>
      <label>
        <span>Name</span>
        <input onChange={onChange('name')} type="text" value={name} />
      </label>
      <label>
        <span>Url</span>
        <input onChange={onChange('href')} type="text" value={href} />
      </label>
      <FolderSelector folders={folders} getFolders={onGetFolders} onChange={onChange} selectedFolder={folder} />
      <button onClick={onSubmit}>Add bookmark</button>
      {errors.length > 0 && errors.map(error => <div key={error}>{error}</div>)}
    </div>
  </form>
);

Actions.propTypes = {
  errors: PropTypes.array.isRequired,
  folders: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onGetFolders: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  folder: PropTypes.string,
};

Actions.defaultProps = {
  folder: undefined,
};

export default Actions;
