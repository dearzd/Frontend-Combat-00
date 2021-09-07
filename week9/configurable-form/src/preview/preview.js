import './preview.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Text from '../renderer/text';
import TextArea from '../renderer/textarea';
import Radio from '../renderer/radio';
import Checkbox from '../renderer/checkbox';
import DatePicker from '../renderer/datePicker';
import Slider from '../renderer/slider';
import React from 'react';

function Preview(props) {
  const { schema, testData } = props;

  const renderMap = {
    'text': Text,
    'radio': Radio,
    'textarea': TextArea,
    'checkbox': Checkbox,
    'datePicker': DatePicker,
    'slider': Slider
  };

  return (
    <div className="preview">
      <h3>Preview</h3>
      <ol>
        <li>Drop to here or change Schema manually;</li>
        <li>Change Test Data to preview;</li>
        <li>Drag and drop to Element Candidates to delete element.</li>
      </ol>
      <Droppable droppableId="droppable-preview">
        {(droppableProvided) => (
          <div className="droppable-container" ref={droppableProvided.innerRef}>
            {schema.map((item, index) => {
              const Comp = renderMap[item.type];
              const data = testData[item.id];

              return (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  disableInteractiveElementBlocking={true}
                  index={index}
                >
                  {(draggableProvided) => (
                    <div
                      className="element-item"
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <Comp key={item.id || index} config={item} data={data} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Preview;
