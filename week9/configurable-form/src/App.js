import React from 'react';
import './App.css';
import Candidates from './candidates/candidates';
import Code from './code/code';
import Preview from './preview/preview';
import { DragDropContext } from 'react-beautiful-dnd';

function randomId() {
  return Math.floor(Math.random() * 100);
}

function schemaGenerator(type) {
  switch (type) {
    case 'text':
      return { id: 'text-id' + randomId(), type: 'text', label: 'Text' };
    case 'textarea':
      return { id: 'textarea-id' + randomId(), type: 'textarea', label: 'Textarea' };
    case 'radio':
      return {
        id: 'radio-id' + randomId(),
        type: 'radio',
        label: 'Radio Label',
        values: [{ code: '1' + randomId(), meaning: '1' }, { code: '2', meaning: '2' }]
      };
    case 'checkbox':
      return { id: 'checkbox-id' + randomId(), type: 'checkbox', label: 'Checkbox' };
    case 'datePicker':
      return { id: 'datePicker-id' + randomId(), type: 'datePicker', label: 'Date Picker' };
    case 'slider':
      return { id: 'slider-id' + randomId(), type: 'slider', label: 'Slider' };
  }
}

function testDataGenerator(id, type) {
  if (type === 'radio') {
    return { code: '', meaning: '' };
  }

  return '';
}

function App() {
  const [schema, setSchema] = React.useState([
    { id: 'name', type: 'text', label: 'Name' },
    {
      id: 'gender',
      type: 'radio',
      label: 'Gender',
      values: [{ code: 'female', meaning: '女' }, { code: 'male', meaning: '男' }]
    },
    { id: 'description', type: 'textarea', label: 'Description' },
    { id: 'secondary', type: 'checkbox', label: 'Secondary' },
    { id: 'birthday', type: 'datePicker', label: 'Birthday' },
    { id: 'testSlider', type: 'slider', label: 'Test Slider' }
  ]);

  const [testData, setTestData] = React.useState({
    name: '张东',
    gender: { code: 'male', meaning: '男' },
    description: '前端进阶训练营第 0 期第9周作业。',
    secondary: true,
    birthday: '2017-05-24',
    testSlider: 40
  });

  const handleElementsChange = (elements) => {

  };

  const handleSchemaChange = (newSchema) => {
    setSchema(newSchema);
  };

  const handleTestDataChange = (newTestData) => {
    setTestData(newTestData);
  };

  const handlePreviewChange = () => {

  };

  const handleDragEnd = (result) => {
    const { draggableId, source, destination } = result;
    console.log(result);

    if (!destination) {
      return;
    }

    const newSchema = [...schema];

    if (
      source.droppableId === 'droppable-candidates' &&
      destination.droppableId === 'droppable-preview'
    ) {
      // Means drop new element to preview
      const elementSchema = schemaGenerator(draggableId);
      newSchema.splice(destination.index, 0, elementSchema);
      setSchema(newSchema);
      setTestData({
        ...testData,
        [elementSchema.id]: testDataGenerator(elementSchema.id, elementSchema.type)
      });
      return;
    }

    if (
      source.droppableId === 'droppable-preview' &&
      destination.droppableId === 'droppable-candidates'
    ) {
      // Means drag out of preview to delete
      newSchema.splice(source.index, 1);
      setSchema(newSchema);
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.droppableId === 'droppable-preview'
    ) {
      // Means change order in preview
      const temp = newSchema[source.index];
      newSchema[source.index] = newSchema[destination.index];
      newSchema[destination.index] = temp;
      setSchema(newSchema);
    }
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Candidates onChange={handleElementsChange} />
        <Code
          schema={schema}
          onSchemaChange={handleSchemaChange}
          testData={testData}
          onTestDataChange={handleTestDataChange}
        />
        <Preview schema={schema} testData={testData} onChange={handlePreviewChange} />
      </DragDropContext>
    </div>
  );
}

export default App;
