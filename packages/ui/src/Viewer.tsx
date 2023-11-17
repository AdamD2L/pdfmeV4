import React from 'react';
import ReactDOM from 'react-dom';
import { PreviewProps } from '@pdfme/common';
import { PreviewUI } from './class';
import { DESTROYED_ERR_MSG } from './constants.js';
import { I18nContext, FontContext, PluginsRegistry, OptionsContext } from './contexts';
import Preview from './components/Preview';
import AppContextProvider from './components/AppContextProvider';

class Viewer extends PreviewUI {
  constructor(props: PreviewProps) {
    super(props);
    this.render();
  }

  protected render() {
    if (!this.domContainer) throw Error(DESTROYED_ERR_MSG);
    ReactDOM.render(
      <AppContextProvider
        i18n={this.getI18n()}
        font={this.getFont()}
        plugins={this.getPluginsRegistry()}
        options={this.getOptions()}
      >
        <Preview template={this.template} size={this.size} inputs={this.inputs} />
      </AppContextProvider>,
      this.domContainer
    );
  }
}

export default Viewer;
