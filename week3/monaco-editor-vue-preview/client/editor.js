import { getLanguage, isCode, isImg } from './utils.js';
import { setCurrent } from './sidebar.js';

require.config({ paths: { 'vs': '/node_modules/monaco-editor/min/vs' } });

export function initEditor() {
  return new Promise((resolve, reject) => {
    require(['vs/editor/editor.main'], function() {
      const editor = monaco.editor.create(document.getElementById('editor'), {
        model: null
      });
      resolve(editor);
    });
  });
}

export function createModel(name, code) {
  return monaco.editor.createModel(code, getLanguage(name));
}

export function initModels(sourceCode) {
  const data = new Map();

  for (let name of sourceCode.keys()) {
    if (isCode(name)) {
      // const model = monaco.editor.createModel(sourceCode.get(name), getLanguage(name));
      const model = createModel(name, sourceCode.get(name));

      data.set(name, {
        model: model,
        state: null
      });
    } else {
      data.set(name, {
        model: null,
        state: null
      });
    }
  }

  return data;
}

export function switchFile(name, store) {
  setCurrent(name);

  if (isCode(name)) {
    switchCurrentCode(name, store);
    return;
  }

  if (isImg(name)) {
    switchImg(name, store);
    return;
  }
}

function switchCurrentCode(name, store) {
  const editorDiv = document.getElementById('editor');
  const imgDiv = document.getElementById('img-viewer');
  editorDiv.style.display = 'block';
  imgDiv.style.display = 'none';

  const { editor, data } = store;

  const currentState = editor.saveViewState();

  const currentModel = editor.getModel();

  for (let name of data.keys()) {
    let dataItem = data.get(name);
    if (dataItem.model === currentModel) {
      dataItem.state = currentState;
      break;
    }
  }

  editor.setModel(data.get(name).model);
  editor.restoreViewState(data.get(name).state);
  editor.focus();
}

function switchImg(name, store) {
  const editorDiv = document.getElementById('editor');
  const imgDiv = document.getElementById('img-viewer');

  const img = document.createElement('img');
  img.src = `/sourceCode/${name}`;

  editorDiv.style.display = 'none';
  imgDiv.style.display = 'flex';
  imgDiv.innerHTML = '';
  imgDiv.appendChild(img);
}
