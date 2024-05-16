// Set the date of the party
const partyDate = new Date("May 18, 2024 00:00:00").getTime();

// Update the countdown every second
const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = partyDate - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result
  document.getElementById(
    "countdown"
  ).innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  // If the countdown is over, display a message
  if (distance < 0) {
    clearInterval(countdownFunction);
    document.getElementById("countdown").innerText = "The party has started!";
  }
}, 1000);

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase config here
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to handle attendance confirmation
function confirmAttendance(response) {
  const attendeeName = prompt("Please enter your name:");
  if (attendeeName) {
    const attendeeRef = database.ref("attendees").push();
    attendeeRef.set({
      name: attendeeName,
      response: response,
    });
  }
}

// Listen for attendees
database.ref("attendees").on("value", (snapshot) => {
  const attendeesList = document.getElementById("attendeesList");
  attendeesList.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const attendee = childSnapshot.val();
    const li = document.createElement("li");
    li.innerText = `${attendee.name} (${attendee.response})`;
    attendeesList.appendChild(li);
  });
});
