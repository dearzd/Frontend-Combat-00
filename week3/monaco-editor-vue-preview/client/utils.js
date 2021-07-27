export function getExtension(name) {
  return name.split('.')[1].toLowerCase();
}

export function getLanguage(name) {
  const ext = getExtension(name);
  const map = {
    js: 'javascript',
    html: 'html',
    css: 'css',
    vue: 'html',
    md: 'markdown',
    json: 'json'
  };

  return map[ext];
}

export function isCode(name) {
  const ext = getExtension(name);
  const codeSet = new Set(['js', 'html', 'css', 'vue', 'md', 'json']);
  return codeSet.has(ext);
}

export function isImg(name) {
  const ext = getExtension(name);
  const imgSet = new Set(['ico', 'png', 'jpg', 'jpeg', 'svg', 'gif']);
  return imgSet.has(ext);
}

export function getAllCode(data) {
  let code = {};

  for (let name of data.keys()) {
    if (isCode(name)) {
      code[name] = data.get(name).model.getValue();
    }
  }

  return code;
}
