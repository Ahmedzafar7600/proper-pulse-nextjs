'use client'
import React from 'react';
import ClipLoader from 'react-spinners/CircleLoader'

const ovveride={
    display:'block',
    margin:'100px auto'
}

const LoadingPage = () => {
 
    

  return (
    <ClipLoader color='#3b82f6' cssOverride={ovveride} size={150} aria-label='Loading Spinner'/>
  );
}

export default LoadingPage;
