document.addEventListener("DOMContentLoaded", () => { // Wait for the DOM to be fully loaded
    
  const buttons = document.querySelectorAll(".button-like"); // Find all elements with the class 'button-like' and store them in the buttons variable.

  buttons.forEach(button => { // For each button in the buttons array, add an event listener that listens for a click event. When a button is clicked, the function is executed.

      button.addEventListener("click", () => { // When a button is clicked, the function is executed.

          // Toggle the 'active' class on the clicked button.  If the button has the 'active' class, remove it. If it doesn't have the 'active' class, add it.
          button.classList.toggle("active");

          const description = button.nextElementSibling; // The next sibling element of the button is the project description.
          if (description && description.classList.contains("project-description")) { // If the description exists and has the class 'project-description', execute the following code.

              // Toggle the visibility of the description
              if (description.style.display === "block") { // If the description is visible, hide it.
                description.style.display = "none"; // Hide the description
                button.querySelector(".button-arrow").textContent = "⥥"; // display a downward arrow (U+02965)
            } else { // If the description is hidden, show it.
                description.style.display = "block"; // Show the description
                button.querySelector(".button-arrow").textContent = "⥣"; // display an upward arrow
            }
          }
      });
  });
});
