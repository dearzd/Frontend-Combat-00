import React from 'react';
import './candidates.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Text from '../renderer/text';
import TextArea from '../renderer/textarea';
import Radio from '../renderer/radio';
import Checkbox from '../renderer/checkbox';
import DatePicker from '../renderer/datePicker';
import Slider from '../renderer/slider';

function Candidates(props) {
  const items = React.useMemo(() => {
    return [
      { type: 'text', component: <Text config={{ label: 'Text' }} /> },
      { type: 'radio', component: <Radio config={{ label: 'Radio' }} /> },
      { type: 'checkbox', component: <Checkbox config={{ label: 'Checkbox' }} /> },
      { type: 'datePicker', component: <DatePicker config={{ label: 'DatePicker' }} /> },
      { type: 'slider', component: <Slider config={{ label: 'Slider' }} /> },
      { type: 'textarea', component: <TextArea config={{ label: 'TextArea' }} /> }
    ];
  }, []);

  return (
    <div className="candidates">
      <h3>Element Candidates</h3>
      <Droppable droppableId="droppable-candidates">
        {(droppableProvided) => (
          <div className="droppable-container" ref={droppableProvided.innerRef}>
            {items.map((item, index) => (
              <Draggable
                key={item.type}
                draggableId={item.type}
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
                    {item.component}
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Candidates;
