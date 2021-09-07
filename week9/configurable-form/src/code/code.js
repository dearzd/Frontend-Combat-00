import React from 'react';
import './code.css';
import * as monaco from 'monaco-editor';

function Code(props) {
  const { schema, testData, onSchemaChange, onTestDataChange } = props;

  const schemaEditor = React.useRef(null);
  const dataEditor = React.useRef(null);

  React.useLayoutEffect(() => {
    if (!schemaEditor.current) {
      schemaEditor.current = monaco.editor.create(document.getElementById('schema-editor'), {
        model: null
      });
    }

    const code = JSON.stringify(schema, null, '  ');

    console.log('effect');
    if (!schemaEditor.current.getModel() || code !== schemaEditor.current.getModel().getValue()) {
      console.log('schema changed');
      const model = monaco.editor.createModel(code, 'json');
      schemaEditor.current.setModel(model);
    }
  }, [schema]);

  React.useLayoutEffect(() => {
    const code = JSON.stringify(testData, null, '  ');
    const model = monaco.editor.createModel(code, 'json');

    dataEditor.current = monaco.editor.create(document.getElementById('data-editor'), {
      model: model
    });
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      const newSchema = JSON.parse(schemaEditor.current.getModel().getValue());
      onSchemaChange(newSchema);

      const newTestData = JSON.parse(dataEditor.current.getModel().getValue());
      onTestDataChange(newTestData);
    }, 1000);
  }, [])

  return (
    <div className="code">
      <div className="code-section">
        <h3>Schema</h3>
        <div id="schema-editor" />
      </div>
      <div className="code-section">
        <h3>Test Data</h3>
        <div id="data-editor" />
      </div>
    </div>
  );
}

export default Code;
