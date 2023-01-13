import React from 'react';
import ReactDOM from 'react-dom';
import { PreviewProps } from '@pdfme/common';
import { PreviewUI } from './class.js';
import { DESTROYED_ERR_MSG } from './constants.js';
import { I18nContext, FontContext } from './contexts.js';
import Preview from './components/Preview.js';

class Viewer extends PreviewUI {
  constructor(props: PreviewProps) {
    super(props);
    this.render();
  }

  protected render() {
    if (!this.domContainer) throw Error(DESTROYED_ERR_MSG);
    ReactDOM.render(
      <I18nContext.Provider value={this.getI18n()}>
        <FontContext.Provider value={this.getFont()}>
          <Preview template={this.template} size={this.size} inputs={this.inputs} />
        </FontContext.Provider>
      </I18nContext.Provider>,
      this.domContainer
    );
  }
}

export default Viewer;
