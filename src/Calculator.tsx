import React, { useState, useEffect } from 'react';

// 定义 Calculator 组件
const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');

  // 1. 将核心计算逻辑提取出来，改为使用 `prev` 状态。
  // 这样做是为了在 useEffect 中避免“闭包陷阱”（获取不到最新的 displayValue）
  const processInput = (value: string) => {
    setDisplayValue((prev) => {
      // 遇到错误状态时，按任何键重新开始
      if (prev === '错误') {
        if (value === 'C') return '0';
        return ['+', '-', '×', '÷', '=', 'Backspace'].includes(value) ? '0' : value;
      }

      // 清除
      if (value === 'C') return '0';

      // 退格删除 (键盘专属或后续可加按钮)
      if (value === 'Backspace') {
        return prev.length > 1 ? prev.slice(0, -1) : '0';
      }

      // 计算结果
      if (value === '=') {
        try {
          const expression = prev.replace(/×/g, '*').replace(/÷/g, '/');
          let result = new Function('return ' + expression)();
          result = Math.round(result * 100000000) / 100000000;
          return String(result);
        } catch (error) {
          // 如果出现类似 5+* 这种无法计算的表达式
          setTimeout(() => setDisplayValue('0'), 1500);
          return '错误';
        }
      }

      // 正常输入数字或符号
      if (prev === '0' && value !== '.') {
        return value; // 去掉开头的 0
      }
      return prev + value;
    });
  };

  // 2. 键盘事件监听钩子
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      // 匹配数字 (0-9) 和 小数点、加号、减号
      if (/^[0-9.+-]$/.test(key)) {
        processInput(key);
      } 
      // 映射乘法和除法
      else if (key === '*') {
        processInput('×');
      } else if (key === '/') {
        event.preventDefault(); // 阻止浏览器按 / 唤起快捷搜索的默认行为
        processInput('÷');
      } 
      // 按回车键或等号触发计算
      else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // 阻止回车键的默认提交行为
        processInput('=');
      } 
      // 按 Esc 键触发清除
      else if (key === 'Escape') {
        processInput('C');
      } 
      // 按退格键触发删除
      else if (key === 'Backspace') {
        processInput('Backspace');
      }
    };

    // 组件挂载时添加监听器
    window.addEventListener('keydown', handleKeyDown);

    // 组件卸载时移除监听器 (非常重要，防止内存泄漏)
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // 空依赖数组，因为 processInput 内部使用的是 setState 的回调形式获取最新值

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>简易计算器</h1>
      <div style={styles.display}>
        <input type="text" readOnly value={displayValue} style={styles.input} />
      </div>
      <div style={styles.buttons}>
        {/* 点击事件直接调用 processInput */}
        <button style={styles.button} onClick={() => processInput('7')}>7</button>
        <button style={styles.button} onClick={() => processInput('8')}>8</button>
        <button style={styles.button} onClick={() => processInput('9')}>9</button>
        <button style={styles.button} onClick={() => processInput('÷')}>÷</button>

        <button style={styles.button} onClick={() => processInput('4')}>4</button>
        <button style={styles.button} onClick={() => processInput('5')}>5</button>
        <button style={styles.button} onClick={() => processInput('6')}>6</button>
        <button style={styles.button} onClick={() => processInput('×')}>×</button>

        <button style={styles.button} onClick={() => processInput('1')}>1</button>
        <button style={styles.button} onClick={() => processInput('2')}>2</button>
        <button style={styles.button} onClick={() => processInput('3')}>3</button>
        <button style={styles.button} onClick={() => processInput('-')}>-</button>

        <button style={styles.button} onClick={() => processInput('0')}>0</button>
        <button style={styles.button} onClick={() => processInput('.')}>.</button>
        <button style={styles.button} onClick={() => processInput('=')}>=</button>
        <button style={styles.button} onClick={() => processInput('+')}>+</button>

        <button style={{...styles.button, ...styles.clearButton}} onClick={() => processInput('C')}>
          清除 (C/Esc)
        </button>
      </div>
    </div>
  );
};

// 样式定义保持不变
const styles: { [key: string]: React.CSSProperties } = {
  container: { width: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  title: { textAlign: 'center', color: '#333', marginBottom: '20px' },
  display: { marginBottom: '20px' },
  input: { width: '100%', height: '50px', fontSize: '24px', textAlign: 'right', padding: '0 10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff', boxSizing: 'border-box' },
  buttons: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' },
  button: { height: '50px', fontSize: '18px', borderRadius: '5px', border: 'none', backgroundColor: '#e0e0e0', cursor: 'pointer', transition: 'background-color 0.2s' },
  clearButton: { gridColumn: 'span 4', backgroundColor: '#ffb3b3', fontWeight: 'bold' }
};

export default Calculator;