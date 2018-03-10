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
    folders: PropTypes.arrayOf(PropTypes.string),
    loading: PropTypes.bool,
    selectedFolder: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  };

  static defaultProps = {
    folders: [],
    loading: false,
    selectedFolder: {},
  };

  state = {
    value: '',
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
    this.setState({
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
      return <span>Loading</span>;
    }

    const inputProps = {
      placeholder: 'Select a folder to save',
      value: this.state.value,
      onChange: this.onChange,
    };

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
          Add
        </button>
      </form>
    );
  }
}

export default Add;
