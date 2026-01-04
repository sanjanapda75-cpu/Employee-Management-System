import { $ } from "../utils/dom.js";

// Displays a temporary alert message (success by default, or error if specified)
export function showAlert(message, type = "success") {
  // Get the designated container element in the HTML where alerts should appear
  const container = $("alertContainer");

  // Check if container exists, if not log error and exit
  if (!container) {
    console.error("Alert container (#alertContainer) not found in the DOM!");
    console.log("Alert message:", message);
    return;
  }

  // Create a new div element dynamically to hold the alert message
  const el = document.createElement("div");

  // Apply CSS classes (likely Tailwind CSS) for styling based on the alert type
  el.className =
    `px-4 py-2 rounded shadow text-white mb-2 ${ // Base styles + margin
      type === "success" ? "bg-green-500" : "bg-red-500" // Conditional background color
    }`;
  
  // Set the actual text content of the alert element
  el.textContent = message;

  // Add the newly created alert element to the container in the DOM
  container.appendChild(el);
  
  // Add fade out animation
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transition = "opacity 0.3s";
    setTimeout(() => el.remove(), 300);
  }, 3000);
}