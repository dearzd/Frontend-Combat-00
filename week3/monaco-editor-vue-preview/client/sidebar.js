import { getAllCode, getExtension, isCode } from './utils.js';

export function fetchFiles() {
  return fetch('/files')
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject();
      }
    })
    .then((files) => {
      let requests = [];

      // files.sort((a, b) => a.localeCompare(b));
      files.forEach((name) => {
        if (isCode(name)) {
          requests.push(
            fetch(`/sourceCode/${name}`).then((response) => response.text())
          );
        }
      });

      return Promise.all(requests).then((dataArr) => {
        let data = new Map();

        files.forEach((name, index) => {
          if (isCode(name)) {
            data.set(name, dataArr.shift());
          } else {
            data.set(name, null);
          }
        });

        console.log(data);

        return data;
      });
    })
    .catch((e) => console.log(e));
}

export function listFiles({ data, onSwitch }) {
  const filesDiv = document.querySelector('.sidebar .files');
  let html = [];

  const files = Array.from(data.keys()).sort((a, b) => a.localeCompare(b));

  for (let name of files) {
    html.push(`
      <li data-name="${name}" class="file-item">
        <span class="file-icon ${getExtension(name)}"></span>
        <span class="file-name">${name}</span>
        <button class="delete-file">
        <svg viewBox="0 0 500 500"><path d="M421.1 450 250 278.9 78.9 450 50 421.1 221.1 250 50 78.9 78.9 50 250 221.1 421.1 50 450 78.9 278.9 250 450 421.1z"></path></svg>
        </button>
      </li>
    `);
  }

  filesDiv.innerHTML = html.join('');

  bindEvents({
    onSwitch,
    onDeleteSuccess: (name) => {
      data.delete(name);
      listFiles({ data, onSwitch });
    }
  });
}

export function setCurrent(name) {
  const files = document.querySelectorAll('.sidebar .files .file-item');

  for (let file of files) {
    file.classList.remove('current');
    if (file.getAttribute('data-name') === name) {
      file.classList.add('current');
    }
  }
}

export function bindEvents({ onSwitch, onDeleteSuccess }) {
  const files = document.querySelectorAll('.sidebar .files .file-item');

  for (let file of files) {
    file.addEventListener('click', (event) => {
      const name = event.currentTarget.getAttribute('data-name');
      onSwitch(name);
    });

    const deleteBtn = file.querySelector('.delete-file');
    deleteBtn.addEventListener('click', (event) => {
      const name = event.currentTarget.parentNode.getAttribute('data-name');
      deleteFile(name).then(onDeleteSuccess);
      event.stopPropagation();
    });
  }
}

export function newFile() {
  return prompt('File Name: ');
}

export function downloadFiles({ data }) {
  const code = getAllCode(data);

  fetch('/download', {
    method: 'POST',
    body: JSON.stringify({ code }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((response) => {
    if (response.status === 200) {
      console.log('Export zip successfully!');
      return response.blob();
    } else {
      return Promise.reject();
    }
  }).then((blob) => {
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);

    a.download = 'code.zip';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }).catch((e) => {
    console.log(e);
    alert('Export Error!');
  });
}

export function uploadImage(file) {
  let formData = new FormData();
  formData.append('image', file);

  return fetch('/upload', {
    method: 'POST',
    body: formData
  }).then((response) => {
    if (response.status === 200) {
      console.log('Upload image successfully!');
    } else {
      return Promise.reject();
    }
  }).catch((e) => {
    console.log(e);
    alert('Upload Error!');
  });
}

export function deleteFile(name) {
  return fetch(`/file/${name}`, {
    method: 'delete'
  }).then((response) => {
    if (response.status === 200) {
      console.log(`Delete ${name} successfully!`);
      return name;
    } else {
      return Promise.reject();
    }
  }).catch((e) => {
    console.log(e);
    alert('Delete file Error!');
  });
}
