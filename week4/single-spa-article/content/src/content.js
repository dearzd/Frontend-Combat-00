import React from 'react';
import dataJson from './data.json';

function fetchContent(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataJson[id] || {
        name: 'No Data',
        content: 'This article is waiting ot complete.'
      });
    });
  });
}

export default function Content(props) {
  const { match } = props;

  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const id = match.params.id;

    fetchContent(id).then((responseData) => {
      setData(responseData);
    });
  }, [match]);

  return (
    <div className="article-content">
      <h1>{data.name}</h1>
      <div>
        {data.content}
      </div>
    </div>
  );
}
