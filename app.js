document.getElementById("story-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    // Get user inputs
    const ageGroup = document.getElementById("age-group").value;
    const genre = document.getElementById("genre").value;
    const pages = parseInt(document.getElementById("pages").value, 10);
  
    // Prepare prompt
    const prompt = `Write a ${genre} story for an audience aged ${ageGroup}, approximately ${pages * 100} words in length. Complete the story in ${pages * 100} words`;
  
    try {
      // Call backend
      const response = await fetch("http://localhost:5000/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await response.json();
      if (data.story) {
        document.getElementById("story").innerText = data.story;
      } else {
        document.getElementById("story").innerText = "Error generating story. Try again!";
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("story").innerText = "Error connecting to server.";
    }
  });
  