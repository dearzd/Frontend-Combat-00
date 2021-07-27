import { getAllCode, isCode } from './utils.js';

export function previewCode({ data, editor }) {

  // const code = editor.getValue();

  const code = getAllCode(data);

  console.log(code);

  fetch('/preview', {
    method: 'POST',
    body: JSON.stringify({ code }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((response) => {
    if (response.status === 200) {
      console.log('build success');
      const previewFrame = window.frames['preview-frame'];
      previewFrame.src = '/preview';
    } else {
      response.text().then((message) => {
        console.log(message);
        alert(message);
      });
      return Promise.reject();
    }
  }).catch((e) => {
    console.log(e);
    // alert(e);
  });
}
