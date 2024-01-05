import * as pdfLib from '@pdfme/pdf-lib';
import type { GenerateProps } from '@pdfme/common';
import { checkGenerateProps, pt2mm } from '@pdfme/common';
import { insertPage, preprocessing, postProcessing } from './helper.js';

const generate = async (props: GenerateProps) => {
  checkGenerateProps(props);
  const { inputs, template, options = {}, plugins: userPlugins = {} } = props;

  if (inputs.length === 0) {
    throw new Error('inputs should not be empty');
  }

  const { pdfDoc, basePages, embedPdfBoxes, renderObj } = await preprocessing({
    template,
    userPlugins,
  });

  const keys = template.schemas.flatMap((schemaObj) => Object.keys(schemaObj));

  const _cache = new Map();
  for (let i = 0; i < inputs.length; i += 1) {
    const inputObj = inputs[i];
    for (let j = 0; j < basePages.length; j += 1) {
      const basePage = basePages[j];
      const embedPdfBox = embedPdfBoxes[j];
      const page = insertPage({ basePage, embedPdfBox, pdfDoc });
      for (let l = 0; l < keys.length; l += 1) {
        const key = keys[l];
        const schemaObj = template.schemas[j] || {};
        const schema = schemaObj[key];
        if (!schema) {
          continue;
        }

        const render = renderObj[schema.type];
        if (!render) {
          continue;
        }
        const value = schema.readOnly ? schema.content || '' : inputObj[key];
        const res = await render({ key, value, schema, pdfLib, pdfDoc, page, options, _cache });
        if (res) {
          console.log(pt2mm(res.width), pt2mm(res.height));
        }
      }
    }
  }

  postProcessing({ pdfDoc, options });

  return pdfDoc.save();
};

export default generate;
