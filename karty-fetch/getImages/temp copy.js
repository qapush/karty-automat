document.addEventListener("DOMContentLoaded", function () {

  if(document.querySelector('.changing-text h3')){


      const texts = [
        "Growth People Pro – your partner in success!",
        "Elevate your business through Holistic Employee Experience",
        "Tailored Solutions for Your Unique Needs",
        "Proven Results with Holistic Approach",
        "Empowering Businesses with People-First Strategies"
      ];
    
      let index = 0; // Initial index
      const changingTextElement = document.querySelector(".changing-text h3");
    
      if (!changingTextElement) {
        console.error("Error: Element .changing-text h3 not found!");
        return; // Stop execution if the element doesn't exist
      }
    
      function updateText() {
        // Add fade-out class
        changingTextElement.classList.add("fade-out");
    
        // Wait for the fade-out effect to finish
        setTimeout(() => {
          // Update the text content
          changingTextElement.textContent = texts[index];
          // Increment index and reset if at the end
          index = (index + 1) % texts.length;
    
          // Remove fade-out class to fade in
          changingTextElement.classList.remove("fade-out");
        }, 500); // Match the timeout with the CSS transition duration (0.5s)
      }
    
      // Initial text display
      updateText();
    
      // Rotate text every 7 seconds
      setInterval(updateText, 7000);



  }



  if (document.querySelector(".bg-mobile img")) {
    const changeBG = () => {
      if (
        window.innerWidth < 850 &&
        document.querySelector(".bg-mobile img").src !==
          "https://growthpeople.pro/wp-content/uploads/2025/03/bg-mobile.jpg"
      ) {
        document.querySelector(".bg-mobile img").src =
          "https://growthpeople.pro/wp-content/uploads/2025/03/bg-mobile.jpg";
      } else if (
        window.innerWidth > 850 &&
        document.querySelector(".bg-mobile img").src !==
          "https://growthpeople.pro/wp-content/uploads/2025/03/training.jpg"
      ) {
        document.querySelector(".bg-mobile img").src =
          "https://growthpeople.pro/wp-content/uploads/2025/03/training.jpg";
      }
    };

    changeBG();
    window.addEventListener("resize", changeBG);
  }

  if (document.querySelector(".founder img")) {
    const changeBGFounder = () => {
      if (
        window.innerWidth < 850 &&
        document.querySelector(".founder img").src !==
          "https://growthpeople.pro/wp-content/uploads/2025/03/bgbg.jpg"
      ) {
        document.querySelector(".founder img").src =
          "https://growthpeople.pro/wp-content/uploads/2025/03/bgbg.jpg";
      } else if (
        window.innerWidth > 850 &&
        document.querySelector(".founder img").src !==
          "https://growthpeople.pro/wp-content/uploads/2025/03/eleni.jpg"
      ) {
        document.querySelector(".founder img").src =
          "https://growthpeople.pro/wp-content/uploads/2025/03/eleni.jpg";
      }
    };

    changeBGFounder();
    window.addEventListener("resize", changeBGFounder);
  }

  if (document.querySelector(".certifications img")) {
    const changeBGCert = () => {
      if (
        window.innerWidth < 850 &&
        document.querySelector(".certifications img").src !==
          "https://growthpeople.pro/wp-content/uploads/2025/03/cert-bg.jpg"
      ) {
        document.querySelector(".certifications img").src =
          "https://growthpeople.pro/wp-content/uploads/2025/03/cert-bg.jpg";
      } else if (
        window.innerWidth > 850 &&
        document.querySelector(".certifications img").src !==
          "https://growthpeople.pro/wp-content/uploads/2025/03/Certificate.jpg"
      ) {
        document.querySelector(".certifications img").src =
          "https://growthpeople.pro/wp-content/uploads/2025/03/Certificate.jpg";
      }
    };

    changeBGCert();
    window.addEventListener("resize", changeBGCert);
  }

  if (document.querySelector(".gonov img")) {
    const changeBGGonov = () => {
      if (
        window.innerWidth < 850 &&
        document.querySelector(".gonov img").src !==
          "https://growthpeople.pro/wp-content/uploads/2025/03/bgbg.jpg"
      ) {
        document.querySelector(".gonov img").src =
          "https://growthpeople.pro/wp-content/uploads/2025/03/bgbg.jpg";
      } else if (
        window.innerWidth > 850 &&
        document.querySelector(".gonov img").src !==
          "https://growthpeople.pro/wp-content/uploads/2025/03/gonov.jpg"
      ) {
        document.querySelector(".gonov img").src =
          "https://growthpeople.pro/wp-content/uploads/2025/03/gonov.jpg";
      }
    };

    changeBGGonov();
    window.addEventListener("resize", changeBGGonov);
  }

  
});


