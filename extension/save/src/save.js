import React from 'react';
import Autosuggest from 'react-autosuggest';
import './save.css';

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class Save extends React.PureComponent {
  state = {
    suggestions: [],
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
    this.props.onChangeSave({
      label: newValue,
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value, reason }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  getSuggestionValue = suggestion => suggestion.value;

  shouldRenderSuggestions = () => true;

  renderSuggestion = suggestion => {
    return <span>{suggestion.label}</span>;
  };

  render() {
    const inputProps = {
      placeholder: 'Select a folder to save',
      value: this.props.savedLink.value,
      onChange: this.onChange,
    };

    let buttonLabel = 'Save link';
    if (this.props.savedLink.saving) {
      buttonLabel = 'Saving link...';
    } else if (this.props.savedLink.saved) {
      buttonLabel = 'Saved link';
    }

    return (
      <form onSubmit={this.props.onSaveLink}>
        <h1 className="save-header">Add site</h1>
        <div className="save-autosuggest-container">
          <Autosuggest
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            shouldRenderSuggestions={this.shouldRenderSuggestions}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            theme={{
              container: 'save-autosuggest',
              containerOpen: 'is-open',
              input: 'save-autosuggest-input',
              inputOpen: 'is-open',
              inputFocused: 'is-focused',
              suggestionsContainer: 'save-autosuggest-suggestions',
              suggestionsContainerOpen: 'is-open',
              suggestionsList: 'save-autosuggest-suggestions-list',
              suggestion: 'save-autosuggest-suggestion',
              suggestionFirst: 'is-first',
              suggestionHighlighted: 'is-highlighted',
              sectionContainer: 'save-autosuggest-section',
              sectionContainerFirst: 'is-first',
              sectionTitle: 'save-autosuggest-section-title',
            }}
            alwaysRenderSuggestions={false}
          />
          <div className="save-arrow-container">
            <div className="save-arrow" />
          </div>
        </div>
        <button className="save-button">{buttonLabel}</button>
      </form>
    );
  }
}

export default Save;
