import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #666;
`;

const Placeholder = styled.div`
  padding: 40px;
  background: #f5f5f5;
  border-radius: 8px;
  margin: 20px 0;
`;

const QuadraticExplorer = () => {
  return (
    <Container>
      <Placeholder>
        <h2>📈 Quadratic Equations Explorer</h2>
        <p>This simulation is coming soon!</p>
        <p>Explore parabolas, roots, and quadratic equations interactively.</p>
      </Placeholder>
    </Container>
  );
};

export default QuadraticExplorer;
