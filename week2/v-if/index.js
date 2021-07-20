import V2 from './v2.js';

const tmpl = `
    <div class="newslist">
      <div class="img" v-if="info.showImage"><img src="{{image}}"/></div>
      <div class="date" v-if="info.showDate">{{info.date}}</div>
      <div class="name">{{info.name}}</div>
    </div>
    `;

const v2 = new V2().mounted(document.getElementById('app'));

v2.render(
  tmpl,
  {
    image: 'some.img',
    info: { showImage: true, showDate: false, name: 'aaa', date: new Date() }
  }
);
