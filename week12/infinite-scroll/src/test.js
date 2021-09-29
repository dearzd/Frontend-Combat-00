import InfinityScroll from './infinityScroll';

const colors = [
  'lightgreen',
  'lightblue',
  'violet',
  'yellow',
  'red',
  'skyblue',
  'beige',
  'saddlebrown',
  'navajowhite',
  'wheat',
  'deeppink',
  'darkgray'
];

function contentRenderer(item) {
  const { id, name, color } = item;
  return (
    <div
      key={id}
      style={{ height: 100, background: color }}
    >
      {name}
    </div>
  );
}

function Test() {
  const getContent = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let items = [];

        for (let i = 0; i < 8; i++) {
          const id = Math.floor(Math.random() * 1000);
          const colorIndex = Math.ceil(Math.random() * (colors.length - 1));
          items.push({
            id: id,
            name: 'Content-' + id,
            color: colors[colorIndex]
          });
        }
        console.log(items);

        resolve(items);
      }, 1000);
    });
  };

  return (
    <InfinityScroll
      style={{ width: 400, height: 400, margin: 'auto', border: '1px solid #ccc' }}
      contentRenderer={contentRenderer}
      getContent={getContent}
    />
  );
}

export default Test;
