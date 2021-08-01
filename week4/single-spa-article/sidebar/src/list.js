import React from 'react';
import './list.css';

function fetchList() {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = [];

      for (let i = 0; i < 20; i++) {
        data.push({
          id: `articleId-${i + 1}`,
          name: `Article ${i + 1}`
        });
      }

      resolve(data);
    });
  });
}

export default function List(props) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchList().then((responseData) => {
      setData(responseData);
    });
  }, []);

  const handleChange = (event, id) => {
    event.preventDefault();

    const name = data.find(line => line.id === id).name;

    window.history.pushState({}, name, `/content/${id}`);
  };

  return (
    <ul className="article-list">
      {data.map((dataLine) => {
        return (
          <li key={dataLine.id}>
            <a
              href={`/content/${dataLine.id}`}
              onClick={(event) => handleChange(event, dataLine.id)}
            >
              {dataLine.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
