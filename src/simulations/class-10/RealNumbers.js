import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  padding: 40px 20px;
  background: white;
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
`;

const TabButton = styled(motion.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#667eea' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#667eea' : '#e0e0e0'};
  }
`;

const TabContent = styled(motion.div)`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 30px;
  color: #333;
  line-height: 1.8;

  h2 {
    color: #667eea;
    margin-bottom: 20px;
  }

  h3 {
    color: #764ba2;
    margin-top: 20px;
  }

  p {
    margin-bottom: 15px;
  }

  ul, ol {
    margin-left: 20px;

    li {
      margin-bottom: 10px;
    }
  }
`;

const InputContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #ddd;

  input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    margin: 5px 5px 5px 0;
    width: 80px;
  }

  button {
    padding: 8px 16px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
  }
`;

const Result = styled.div`
  background: #e8f5e9;
  border-left: 4px solid #4caf50;
  padding: 15px;
  margin: 15px 0;
  border-radius: 4px;
`;

const RealNumbers = () => {
  const [activeTab, setActiveTab] = useState('theory');
  const [num1, setNum1] = useState(48);
  const [num2, setNum2] = useState(18);
  const [result, setResult] = useState(null);

  const euclidAlgorithm = (a, b) => {
    const steps = [];
    while (b !== 0) {
      const quotient = Math.floor(a / b);
      const remainder = a % b;
      steps.push(`${a} = ${b} × ${quotient} + ${remainder}`);
      a = b;
      b = remainder;
    }
    return { hcf: a, steps };
  };

  const handleCalculate = () => {
    const result = euclidAlgorithm(Math.max(num1, num2), Math.min(num1, num2));
    setResult(result);
  };

  const tabs = [
    { id: 'theory', label: '📚 Theory' },
    { id: 'visualizer', label: '🎯 Algorithm' },
    { id: 'practice', label: '💡 Practice' }
  ];

  return (
    <Container>
      <Content>
        <TabContainer>
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabContainer>

        <AnimatePresence mode="wait">
          {activeTab === 'theory' && (
            <TabContent key="theory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2>Euclid's Division Algorithm</h2>
              <p>A method to find the HCF (GCD) of two numbers based on the principle that the HCF of two numbers does not change if the larger number is replaced by its difference with the smaller number.</p>
              
              <h3>The Algorithm</h3>
              <p>For two positive integers a and b where a > b: a = bq + r, where 0 ≤ r < b</p>
              
              <h3>Steps</h3>
              <ol>
                <li>Divide the larger number by the smaller number</li>
                <li>Replace the larger number with the smaller number</li>
                <li>Replace the smaller number with the remainder</li>
                <li>Repeat until the remainder becomes zero</li>
                <li>The HCF is the last non-zero remainder</li>
              </ol>

              <h3>Fundamental Theorem of Arithmetic</h3>
              <p>Every composite number can be expressed as a unique product of prime numbers.</p>
            </TabContent>
          )}

          {activeTab === 'visualizer' && (
            <TabContent key="visualizer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2>Algorithm Visualizer</h2>
              <InputContainer>
                <div>
                  <label>Enter two numbers:</label><br />
                  <input type="number" value={num1} onChange={(e) => setNum1(parseInt(e.target.value) || 0)} />
                  <input type="number" value={num2} onChange={(e) => setNum2(parseInt(e.target.value) || 0)} />
                  <button onClick={handleCalculate}>Calculate HCF</button>
                </div>
              </InputContainer>

              {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3>Steps:</h3>
                  {result.steps.map((step, idx) => (
                    <div key={idx}>Step {idx + 1}: {step}</div>
                  ))}
                  <Result>HCF = {result.hcf}</Result>
                </motion.div>
              )}
            </TabContent>
          )}

          {activeTab === 'practice' && (
            <TabContent key="practice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2>Practice Problems</h2>
              <ul>
                <li>HCF(24, 36)</li>
                <li>HCF(56, 96)</li>
                <li>HCF(135, 225)</li>
              </ul>
              <p>Use the Algorithm Visualizer to check answers!</p>
            </TabContent>
          )}
        </AnimatePresence>
      </Content>
    </Container>
  );
};

export default RealNumbers;
