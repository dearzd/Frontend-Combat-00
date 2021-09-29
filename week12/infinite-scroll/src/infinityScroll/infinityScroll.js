import React from 'react';
import PropTypes from 'prop-types';
import './infinityScroll.css';

function InfinityScroll(props) {
  const { className, contentRenderer, getContent, ...other } = props;

  const [content, setContent] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const container = React.useRef(null);
  const isUnmount = React.useRef(false);

  React.useEffect(() => {
    fetchContent();

    return () => {
      console.log('unmount');
      isUnmount.current = true;
    };
  }, []);

  const fetchContent = () => {
    setLoading(true);

    getContent().then((data) => {
      if (isUnmount.current) {
        return;
      }

      setLoading(false);

      setContent([
        ...content,
        ...data
      ]);

    });
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = container.current;
    if (!loading && scrollTop > 0 && clientHeight + scrollTop === scrollHeight) {
      fetchContent();
    }
  };

  return (
    <div
      className={'infinity-scroll' + (className ? ' ' + className : '')}
      onScroll={handleScroll}
      {...other}
      ref={container}
    >
      {content.map((item) => {
        return contentRenderer ? contentRenderer(item) : item;
      })}
      {loading ? 'Loading ...' : null}
    </div>
  );
}

InfinityScroll.propTypes = {
  className: PropTypes.string,
  contentRenderer: PropTypes.func,
  getContent: PropTypes.func
};

export default InfinityScroll;
