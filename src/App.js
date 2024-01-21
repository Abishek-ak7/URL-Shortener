import './App.css';
import URL from './components/Url';
import Input from './components/input';
import Output from './components/output';

function App() {
  const containerStyle = {
    height: '100vh',
    color: '#C2D9FF',
    padding: '5em',
  };

  const bodyStyles = `
    html, body {
      height: 100%;
      margin: 0;
      overflow: hidden;
    }

    body {
      background: linear-gradient(45deg, #7E2553, #11009E, #0F1035, #161A30);
      background-size: 300% 300%;
      animation: color 12s ease-in-out infinite;
    }

    @keyframes color {
      0% {
        background-position: 0 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0 50%;
      }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{bodyStyles}</style>
      <div>
        <URL />
        <Input />
      </div>
      <Output />
    </div>
  );
}

export default App;
