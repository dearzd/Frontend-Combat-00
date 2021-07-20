import Engine from './engine.js';

export default class V2 {
  constructor() {
    this.root = null;
    this.engine = new Engine();
  }

  render(template, data) {
    let dom = this.engine.render(template, data);
    console.log(dom);
    this.root.appendChild(dom);
  }

  mounted(dom) {
    this.root = dom;
    return this;
  }
}
