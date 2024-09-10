import React from 'react';

const PreventContextMenu = ({ children }) => {
  const handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default context menu
    // Optional: Add your custom behavior
  };

  return (
    <div onContextMenu={handleContextMenu} style={{ height: '100vh' }}>
      {children}
    </div>
  );
};

export default PreventContextMenu;