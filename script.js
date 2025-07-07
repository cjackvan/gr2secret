document.addEventListener("DOMContentLoaded", function () {
  const bookContainers = document.querySelectorAll('.book-container');

  // Function to hide all tooltips
  function hideAllTooltips() {
    bookContainers.forEach(container => {
      const tooltip = container.querySelector('.hover-window');
      tooltip.style.display = 'none';  // Hide the tooltip
    });
  }

  // Hide all tooltips when the page loads (important for when the user navigates back)
  hideAllTooltips();

  // Desktop: Show the tooltip when mouse enters
  bookContainers.forEach(container => {
    const tooltip = container.querySelector('.hover-window');

    // Show the tooltip when mouse enters (desktop)
    container.addEventListener('mouseenter', function () {
      tooltip.style.display = 'block';  // Show the tooltip
    });

    // Hide the tooltip when mouse leaves (desktop)
    container.addEventListener('mouseleave', function () {
      tooltip.style.display = 'none';  // Hide the tooltip
    });

    // Update tooltip position on mousemove (desktop)
    container.addEventListener('mousemove', function (e) {
      const mouseX = e.clientX - container.getBoundingClientRect().left;
      const mouseY = e.clientY - container.getBoundingClientRect().top;

      const tooltipOffsetX = 15;  // Horizontal offset (right of cursor)
      const tooltipOffsetY = -40; // Vertical offset (above the cursor)

      tooltip.style.left = (mouseX + tooltipOffsetX) + 'px';
      tooltip.style.top = (mouseY + tooltipOffsetY) + 'px';
    });

    // Mobile: Show the tooltip on touchstart
    container.addEventListener('touchstart', function () {
      tooltip.style.display = 'block';  // Show the tooltip
    });

    // Mobile: Hide the tooltip on touchend
    container.addEventListener('touchend', function () {
      tooltip.style.display = 'none';  // Hide the tooltip
    });

    // Mobile: Update tooltip position on touchmove
    container.addEventListener('touchmove', function (e) {
      const touch = e.touches[0];  // Get the first touch point
      const touchX = touch.clientX - container.getBoundingClientRect().left;
      const touchY = touch.clientY - container.getBoundingClientRect().top;

      const tooltipOffsetX = 15;  // Horizontal offset (right of touch)
      const tooltipOffsetY = -40; // Vertical offset (above the touch)

      tooltip.style.left = (touchX + tooltipOffsetX) + 'px';
      tooltip.style.top = (touchY + tooltipOffsetY) + 'px';
    });
  });

  // Close the tooltip when clicking anywhere outside the book container (for mobile)
  document.body.addEventListener('touchstart', function (e) {
    if (!e.target.closest('.book-container')) {
      hideAllTooltips();  // Hide tooltip if tapped outside the container
    }
  });

  // Ensure tooltips are hidden when navigating back (browser back button behavior)
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {  // If the page was restored from cache (back/forward navigation)
      hideAllTooltips();  // Hide all tooltips when navigating back to the page
    }
  });

  // Optional: If you're using sessionStorage to handle other state, ensure the tooltip state is cleared when navigating
  sessionStorage.setItem('tooltip-visible', 'false');  // Just a precaution to reset any session-specific state
});