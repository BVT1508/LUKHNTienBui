import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TodoProvider } from './context/TodoContext';
import TodoList from './components/TodoList';
import UserFilter from './components/UserFilter';
import CompletedFilter from './components/CompletedFilter';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <Container>
        <Row>
          <Col md={9}>
            <TodoList />
          </Col>
          <Col md={3}>
            <UserFilter />
            <CompletedFilter />
          </Col>

        </Row>
      </Container>
    </TodoProvider>
  );
}

export default App;
