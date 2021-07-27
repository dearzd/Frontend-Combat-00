import {
  fetchFiles,
  newFile,
  downloadFiles,
  listFiles,
  uploadImage
} from './sidebar.js';
import { createModel, initEditor, initModels, switchFile } from './editor.js';
import { previewCode } from './preview.js';

const entryFile = 'main.js';

let store = {
  editor: null,
  data: new Map()
};

initEditor().then((editor) => {
  store.editor = editor;

  fetchFiles().then(sourceCode => {
    store.data = initModels(sourceCode);

    listFiles({
      data: store.data,
      onSwitch: (name) => switchFile(name, store)
    });

    switchFile(entryFile, store);

    console.log(store);
  });
});

document.getElementById('new-file').addEventListener('click', function(event) {
  const filename = newFile();

  if (!filename) {
    return;
  }

  const existFiles = Array.from(store.data.keys());

  if (existFiles.find(name => name.toLowerCase() === filename.toLowerCase())) {
    alert('名字不能和已有的文件名重复！');
    return;
  }

  if (!filename.split('.')[1]) {
    alert('名字必须加上后缀名！');
    return;
  }

  store.data.set(filename, {
    model: createModel(filename, ''),
    state: null
  });

  switchFile(filename, store);

  listFiles({
    data: store.data,
    onSwitch: (name) => switchFile(name, store)
  });
});

document.getElementById('upload-file').addEventListener('change', function(event) {
  const file = event.target.files[0];
  console.log(file);

  uploadImage(file).then(() => {
    const filename = file.name;
    store.data.set(filename, {
      model: null,
      state: null
    });

    switchFile(filename, store);

    listFiles({
      data: store.data,
      onSwitch: (name) => switchFile(name, store)
    });
  });
});

document.getElementById('export-zip').addEventListener('click', function(event) {
  downloadFiles(store);
});

document.getElementById('preview').addEventListener('click', function(event) {
  previewCode(store);
});
