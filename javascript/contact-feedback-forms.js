document.addEventListener("DOMContentLoaded", () => { // Wait for the DOM to load before running the code

  // CONTACT FORM

  const contactForm = document.getElementById("contactMeForm"); // seclects the contact form element so we can attach event listeners and manipulate it
  
  contactForm.addEventListener("submit", (event) => { //and a listener for the submit event which triggers when the form is submitted
    event.preventDefault(); // Prevent the form from submitting to a server because we don't have one set up yet at this point in the course
    const name = document.getElementById("contact-name").value; //retrieve name value
    const email = document.getElementById("mail").value; //retrieve email value
    const message = document.getElementById("msg").value; //retrieve message value

    // check if all fields have been filled out, if true, show alert, if false, show an error message:
    if (name && email && message) {
      alert(`Message sent successfully!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
      contactForm.reset(); // Clear the form after submission
    } else {
      alert("Please fill out all fields before sending.");
    }
  });

  // FEEDBACK FORM

  // select elements
  const feedbackForm = document.getElementById("feedbackForm");
  const likeButton = document.getElementById("likeButton"); 
  const dislikeButton = document.getElementById("dislikeButton"); 
  const feedbackList = document.getElementById("feedbackList"); 
  const likeCountDisplay = document.getElementById("likeCount");
  const dislikeCountDisplay = document.getElementById("dislikeCount");

  // initialize vote counts
  let likeVotes = 0;
  let dislikeVotes = 0;

  feedbackForm.addEventListener("submit", (event) => { // add event listener for form submission
    event.preventDefault(); // Prevent default form submission
    const name = document.getElementById("name").value; // retrieves name value
    const feedback = document.getElementById("description").value; // retrieves feedback value

    //ensure all fields are filled out before submitting feedback, if true, add new feedback item to the list, if false, show an error message:
    if (name && feedback) {
      const feedbackItem = document.createElement("li");
      feedbackItem.innerHTML = `<strong>${name}</strong>: ${feedback}`;
      feedbackList.appendChild(feedbackItem);
      feedbackForm.reset(); // Reset form after feedback submission
    } else {
      alert("Please fill out all fields before submitting feedback.");
    }
  });

  // like and dislike buttons
  // first, add event listeners to the buttons and increment the vote counts when clicked
  likeButton.addEventListener("click", () => {
    likeVotes++;
    updateVoteCounts();
  });

  dislikeButton.addEventListener("click", () => {
    dislikeVotes++;
    updateVoteCounts();
  });

  // update the vote counts on the page
  function updateVoteCounts() {
    likeCountDisplay.textContent = `Total Likes: ${likeVotes}`;
    dislikeCountDisplay.textContent = `Total Dislikes: ${dislikeVotes}`;
  }
});
