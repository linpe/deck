import React from 'react';
import Autosuggest from 'react-autosuggest';

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

    let buttonLabel = 'Save';
    if (this.props.savedLink.saving) {
      buttonLabel = 'Saving...';
    } else if (this.props.savedLink.saved) {
      buttonLabel = 'Saved';
    }

    return (
      <form onSubmit={this.props.onSaveLink}>
        <h1>Add site</h1>
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        <button>{buttonLabel}</button>
      </form>
    );
  }
}

export default Save;
