import Vnode from './vnode.js';

export default class Engine {
  constructor() {
    this.nodes = new Map();
  }

  render(template, data) {
    template = this.parseToVNode(template);
    console.log('第一阶段|解析创建node>>>', this.nodes, template);

    let rootNode = this.buildNodeTree(template, data);
    console.log('第二阶段|构建nodeTree>>>', rootNode);

    let dom = this.parseNodeToDom(rootNode, data);
    console.log('第三阶段|nodeTree To DomTree>>>', dom);
    return dom;
  }

  parseToVNode(template) {
    const re1 = /<(\w+)\s*([^>]*)>([^<]*)<\/\1>/gm; //匹配<div class="a">XXX</div>
    const re2 = /<(\w+)\s*([^(/>)]*)\/>/gm; //匹配<img src="a"/>

    template = template.replace(/\n/gm, '');

    while (re1.test(template) || re2.test(template)) {
      //<div class="a">XXX</div>类型
      template = template.replace(re1, (s0, s1, s2, s3) => {
        let attr = this.parseAttribute(s2);
        let node = new Vnode(s1, attr, [], null, s3);
        this.nodes.set(node.uuid, node);
        return `(${node.uuid})`;
      });

      //<img src="a"/>类型
      template = template.replace(re2, (s0, s1, s2) => {
        let attr = this.parseAttribute(s2);
        let node = new Vnode(s1, attr, [], null, '');
        this.nodes.set(node.uuid, node);
        return `(${node.uuid})`;
      });
    }

    return template;
  }

  parseAttribute(str) {
    let attr = new Map();
    str = str.trim();
    str.replace(/(\w+)\s*=['"](.*?)['"]/gm, (s0, s1, s2) => {
      attr.set(s1, s2);
      return s0;
    });
    return attr;
  }

  buildNodeTree(template, data) {
    let re = /\((.*?)\)/g;
    let stack = [];
    let parent = new Vnode('root', {}, [], null, template, null);
    stack.push(parent);
    //转成成node节点
    while (stack.length > 0) {
      let pnode = stack.pop();
      let nodestr = pnode.childrenTemplate.trim();
      re.lastIndex = 0;
      [...nodestr.matchAll(re)].forEach((item) => {
        let n = this.nodes.get(item[1]);

        // filter out if value is false.
        if (n.attr.get('if')) {
          let props = n.attr.get('if').split('.');
          let parsedValue = this.getDataValue(props, data, data);

          if (!parsedValue) {
            return;
          }
        }

        let newn = new Vnode(
          n.tag,
          n.attr,
          [],
          pnode,
          n.childrenTemplate,
          null
        );
        pnode.children.push(newn);
        stack.push(newn);
      });
    }
    return parent.children[0];
  }

  getDataValue(props, globalScope, currentScope) {
    let val = currentScope[props[0]] || globalScope[props[0]];
    props.slice(1).forEach((item) => {
      val = val[item];
    });
    return val;
  }

  parseNodeToDom(root, data) {
    let fragment = document.createDocumentFragment();
    let queue = [[root, fragment, data]];
    //转成成node节点
    while (queue.length > 0) {
      let [pnode, pdom, scope] = queue.shift();
      let html = this.scopehtmlParse(pnode, data, scope);
      let ele = this.createElement(pnode, html);
      this.scopeAttrParse(ele, pnode, data, scope);
      pdom.appendChild(ele);

      pnode.children.forEach((item) => {
        queue.push([item, ele, scope]);
      });
    }
    return fragment;
  }

  scopehtmlParse(node, globalScope, curentScope) {
    return node.childrenTemplate.replace(/\{\{(.*?)\}\}/g, (s0, s1) => {
      let props = s1.split('.');
      return this.getDataValue(props, globalScope, curentScope);
    });
  }

  scopeAttrParse(ele, node, globalScope, currentScope) {
    // console.log(node.attr);
    for (let [key, value] of node.attr) {
      let result = /\{\{(.*?)\}\}/.exec(value);
      if (result && result.length > 0) {
        let props = result[1].split('.');
        let val = this.getDataValue(props, globalScope, currentScope);
        ele.setAttribute(key, val);
      }
    }
  }

  createElement(node, html) {
    let ignoreAttr = ['for', 'click'];
    let dom = document.createElement(node.tag);
    for (let [key, val] of node.attr) {
      if (!ignoreAttr.includes(key)) {
        dom.setAttribute(key, val);
      }
    }
    if (node.children.length === 0) {
      dom.innerHTML = html;
    }
    return dom;
  }
}
