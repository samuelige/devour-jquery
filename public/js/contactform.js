$(document).ready(function () {
    $("#contactform").on("submit", function (e) {
      e.preventDefault();
  
      const form = $(this);
      const url = form.attr("action");
      const submitButton = $("#submit");
  
      // Update submit button text to show loading state
      submitButton.html('Please wait... <span class="fas fa-circle-notch fa-spin"></span>');
  
      // Simulate delay before sending the request
      setTimeout(function () {
        $.ajax({
          type: "POST",
          url: url,
          data: form.serialize(),
          dataType: "json",
          cache: false,
          success: function (data) {
            const message = data.msg;
            submitButton.html('Submit <span class="fa-solid fa-angle-right"></span>');
  
            // Handle success or failure based on the status
            if (data.status === 'ok') {
              alert(message);
              form.trigger("reset"); 
            } else {
              alert(message);
              grecaptcha.reset();
            }
          },
          error: function () {
            submitButton.html('Submit <span class="fa-solid fa-angle-right"></span>');
            alert("An error occurred. Please try again later.");
          }
        });
      }, 2000);
    });
  });