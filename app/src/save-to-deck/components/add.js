import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import styles from './add.css';

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class Add extends React.PureComponent {
  static propTypes = {
    getFolders: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    saved: PropTypes.bool.isRequired,
    saving: PropTypes.bool.isRequired,
    selectedFolder: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }).isRequired,
    folders: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    folders: [],
    loading: false,
  };

  state = {
    suggestions: [],
  };

  componentDidMount = () => {
    this.props.getFolders();
  };

  getSuggestions = value => {
    const options = this.props.folders.map(folder => ({
      value: folder,
      label: folder,
    }));
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp('^' + escapedValue, 'i');

    return options.filter(option => regex.test(option.value));
  };

  onChange = (event, { newValue }) => {
    this.props.onChange({
      label: newValue,
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  getSuggestionValue = suggestion => {
    return suggestion.value;
  };

  shouldRenderSuggestions = () => true;

  handleSubmit = onSubmit => {
    return event => {
      event.preventDefault();
      onSubmit();
    };
  };

  renderSuggestion = suggestion => {
    return <span>{suggestion.label}</span>;
  };

  render() {
    if (this.props.loading) {
      return <div className={styles.spinner} />;
    }

    const inputProps = {
      placeholder: 'Select a folder to save',
      value: this.props.selectedFolder.value,
      onChange: this.onChange,
    };

    let buttonLabel = 'Add';
    if (this.props.saving) {
      buttonLabel = 'Saving...';
    } else if (this.props.saved) {
      buttonLabel = 'Saved';
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          theme={{
            container: styles.suggest,
            containerOpen: styles.suggestOpen,
            input: styles.input,
            inputOpen: styles.inputOpen,
            inputFocused: styles.inputFocused,
            suggestionsContainer: styles.suggestionsContainer,
            suggestionsContainerOpen: styles.suggestionsContainerOpen,
            suggestionsList: styles.suggestionsList,
            suggestion: styles.suggestion,
            suggestionFirst: styles.suggestionFirst,
            suggestionHighlighted: styles.suggestionHighlighted,
            sectionContainer: styles.sectionContainer,
            sectionContainerFirst: styles.sectionContainerFirst,
            sectionTitle: styles.sectionTitle,
          }}
        />
        <button className={styles.button} onClick={this.handleSubmit(this.props.onSubmit)}>
          {buttonLabel}
        </button>
      </form>
    );
  }
}

export default Add;
