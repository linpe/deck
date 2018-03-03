import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

function handleSubmit(onSubmit) {
  return event => {
    event.preventDefault();
    onSubmit();
  };
}

const Add = ({ folders, loading, onChange, onSubmit, selectedFolder }) => {
  const options = folders.map(folder => ({
    value: folder,
    label: folder,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Select isLoading={loading} onChange={onChange} options={options} value={selectedFolder.value} />
      <button onClick={handleSubmit(onSubmit)}>Add</button>
    </form>
  );
};

Add.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedFolder: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
};

Add.defaultProps = {
  folders: [],
  loading: false,
  selectedFolder: {},
};

export default Add;
