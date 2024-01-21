import React from 'react';

const Url = () => {
  const parent = {
    fontSize: '26px', // Set the font size of the parent element
  };

  const head = {
    fontSize: '1em',
    textAlign: 'center',
    animation: 'easeIn 2s ease-out', // ease-in is the easing function
  };

  // Define the CSS keyframes for the ease-in animation
  const styles = `
    @keyframes easeIn {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;

  return (
    <div style={parent}>
      <style>{styles}</style>
      <h1 style={head}>URL Shortener</h1>
    </div>
  );
};

export default Url;
