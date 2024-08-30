import React, { useState, useEffect } from 'react';
import { BiError } from 'react-icons/bi';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      // Log the error to an error reporting service
      // console.error(error, errorInfo);

      // Update the state with the error information
      setHasError(true);
      setErrorMessage(error.message.toString());
    };

    const unsubscribe = window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    // Render a fallback UI when an error occurs
    return (
      <div style={{textAlign:'center'}}>
        <BiError style={{fontSize:'8rem'}}/>
        <h2>Something went wrong.</h2>
        {/* <p>{errorMessage}</p> */}
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;