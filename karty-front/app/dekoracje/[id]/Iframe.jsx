'use client';

import { useState, useEffect, useRef } from 'react';

import styles from './dekoracja.module.css';

export default function Iframe({id}){
    const [imageSrc, setImageSrc] = useState(null); // State to hold the image source
    const iframeRef = useRef(null); // Reference to the iframe
  
    useEffect(() => {
      // Function to extract the first image source from the iframe
      const handleIframeLoad = () => {
        
        
        try {
            const iframeDocument = iframeRef;
            console.log(iframeDocument);
 
            
    
            // // Parse the HTML and create a temporary DOM structure
            // const tempDiv = document.createElement('div');
            // tempDiv.innerHTML = outerHTML;
            
            // const imgElements = tempDiv.querySelectorAll('img'); // Select all <img> tags
            // const imgSources = Array.from(imgElements).map(img => img.src); // Extract src attributes
            // setImageSources(imgSources);
    
          } catch (error) {
            console.error("Error accessing iframe content:", error);
          }
      };
  
      // Add load event listener to the iframe
      const iframeElement = iframeRef.current;
      iframeElement?.addEventListener('load', handleIframeLoad);
  
      // Cleanup the event listener on component unmount
      return () => iframeElement?.removeEventListener('load', handleIframeLoad);
    }, [iframeRef]);
  
    return (
      <div>
        {/* Conditionally render the image or iframe based on the loading status */}
        {imageSrc ? (
          <img src={imageSrc} alt="Iframe image" />
        ) : (
          <iframe
            ref={iframeRef}
            className={styles.iframe}
            src={`http://192.168.1.5/stany/index.php?s%5BIdProduktu%5D=${id}&s%5Bfstel.Data%5D=&s%5Bfstareid.Data%5D=&s%5BKod%5D=&s%5BNazwa%5D=&m=134&d=ASC&sort=&listaGrup=000+-+OSWIETLENIE_ZEW_STRING`}
             // Hide the iframe once loaded
            title="Hidden iframe"
          ></iframe>
        )}
      </div>
    );
    
}