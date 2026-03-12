import React from 'react';

// 定义 Calculator 组件
const Calculator: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>简易计算器</h1>
      <div style={styles.display}>
        <input type="text" readOnly value="0" style={styles.input} />
      </div>
      <div style={styles.buttons}>
        <button style={styles.button}>7</button>
        <button style={styles.button}>8</button>
        <button style={styles.button}>9</button>
        <button style={styles.button}>÷</button>

        <button style={styles.button}>4</button>
        <button style={styles.button}>5</button>
        <button style={styles.button}>6</button>
        <button style={styles.button}>×</button>

        <button style={styles.button}>1</button>
        <button style={styles.button}>2</button>
        <button style={styles.button}>3</button>
        <button style={styles.button}>-</button>

        <button style={styles.button}>0</button>
        <button style={styles.button}>.</button>
        <button style={styles.button}>=</button>
        <button style={styles.button}>+</button>
      </div>
    </div>
  );
};

// 样式定义（内联样式，便于快速演示）
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '300px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  display: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    height: '50px',
    fontSize: '24px',
    textAlign: 'right',
    padding: '0 10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
  },
  buttons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  },
  button: {
    height: '50px',
    fontSize: '18px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#e0e0e0',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttononHover: {
    backgroundColor: '#d0d0d0',
  },
};

export default Calculator;