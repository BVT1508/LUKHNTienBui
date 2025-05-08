import React from 'react';
import { Form } from 'react-bootstrap';

const CompletedFilter = ({ filterCompleted, setFilterCompleted }) => {

  return (
    <div>
      <h5>Completed</h5>
      <Form.Check
        type="radio"
        label="All"
        name="completedFilter"
        value=""
        onChange={(e) => setFilterCompleted(e.target.value)}
        checked={filterCompleted === ''}
      />
      <Form.Check
        type="radio"
        label="Finished"
        name="completedFilter"
        value="true"
        onChange={(e) => setFilterCompleted(e.target.value)}
        checked={filterCompleted === 'true'}
      />
      <Form.Check
        type="radio"
        label="Unfinished"
        name="completedFilter"
        value="false"
        onChange={(e) => setFilterCompleted(e.target.value)}
        checked={filterCompleted === 'false'}
      />
    </div>
  );
};

export default CompletedFilter;
