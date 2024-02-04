import React, { useState } from 'react';

const InputComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState(''); // New state variable for error handling

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if the input is empty
    if (!userInput.trim()) {
      setError('Please enter a URL');
      return;
    }
  
    try {
      const response = await fetch('https://url-shortener-k7q2.vercel.app//submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Check if the response contains a shortUrl property
        if (data.shortUrl) {
          console.log('Short URL:', data.shortUrl);
          setShortUrl(data.shortUrl);
          setError(''); // Clear any previous error
          console.log('Input successfully sent to the server!');
        } else {
          console.error('Short URL not found in the response:', data);
        }
      } else {
        console.error('Failed to send the input to the server.');
      }
    } catch (error) {
      console.error('Error sending the input to the server:', error);
    }
  };  
  const containerStyle = {
    padding: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const inputStyle = {
    padding: '0.5em',
    width: '80%',
    borderRadius: '15px',
    height: '2em',
    animation: 'seIn 4s ease-out',
  };

  const buttonStyle = {
    marginTop: '10px',
    fontSize: '1em',
    padding: '10px',
    animation: 'easeIn 2s ease-out',
    backgroundColor: '#190482',
    color: '#C2D9FF',
    borderRadius: '5px',
    borderColor: '#7752FE',
  };

  // Define the CSS keyframes for the ease-in animation
  const styles = `
    @keyframes seIn {
      0% { opacity: 0; transform: translateY(-120px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{styles}</style>
      <input
        type="text"
        style={inputStyle}
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter the URL"
      />
      <button type="button" onClick={handleSubmit} style={buttonStyle}>
        Click to Shorten
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortUrl && <p>{shortUrl}</p>}
    </div>
  );
};

export default InputComponent;
