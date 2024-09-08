// toggle password
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePassword");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleBtn.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    toggleBtn.textContent = "Show";
  }
}

const form = document.getElementById("login-form");
const onlineIdInput = document.getElementById("online-id");
const passwordInput = document.getElementById("password");
const rememberMeCheckbox = document.getElementById("remember-me");
const loginBtn = document.querySelector(".login-btn");
const container = document.querySelector(".container");
const loginBox = document.querySelector(".login-box");
const logo = document.querySelector(".logo img");
const main = document.querySelector(".main");
const imgBox = document.querySelector(".img-box");
const onlineIdError = document.getElementById("online-id-error");
const passwordError = document.getElementById("password-error");
const checkboxError = document.getElementById("checkbox-error");

// clear error message
function clearError(errorElement) {
  errorElement.textContent = "";
}

// clear errors on input
onlineIdInput.addEventListener("input", () => clearError(onlineIdError));
passwordInput.addEventListener("input", () => clearError(passwordError));
rememberMeCheckbox.addEventListener("change", () => clearError(checkboxError));

const handleSubmit = (e) => {
  e.preventDefault();
  const onlineId = onlineIdInput.value.trim();
  const password = passwordInput.value.trim();
  const rememberMe = rememberMeCheckbox.checked;

  let isValid = true;

  if (onlineId === "") {
    onlineIdError.textContent = "Online ID is required";
    isValid = false;
  } else {
    onlineIdError.textContent = "";
  }

  if (password === "") {
    passwordError.textContent = "Password is required";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  if (!rememberMe) {
    checkboxError.textContent = "Please agree to remember me";
    isValid = false;
  } else {
    checkboxError.textContent = "";
  }

  if (isValid) {
    console.log("Online ID:", onlineId);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);

    // Show spinner
    showSpinner();

    // form submission
    setTimeout(() => {
      hideContent();

      setTimeout(() => {
        showHomeImage();

        setTimeout(() => {
          showLogoWithBackground();
        }, 1000);

        setTimeout(() => {
          resetForm();
          animateContentAppearance();
          loginBtn.innerHTML = "Login";
          loginBtn.disabled = false;
        }, 2000);
      }, 1000);
    }, 1000);
  }
};

// handleSubmit form's submit
form.addEventListener("submit", handleSubmit);

// show spinner
function showSpinner() {
  loginBtn.innerHTML = '<span class="spinner"></span>';
  loginBtn.disabled = true;
}

// hide all content except logo and show zoom-in animation
function hideContent() {
  loginBox.style.display = "none";
  const tempLogo = logo.cloneNode(true);
  tempLogo.className = "centered zoom-in";
  container.innerHTML = "";
  container.appendChild(tempLogo);
  tempLogo.style.width = "250px";
  container.style.height = "calc(100vh - 40px)";

  // zoom-out animation when removing the logo
  setTimeout(() => {
    tempLogo.classList.remove("zoom-in");
    tempLogo.classList.add("zoom-out");
    setTimeout(() => {
      tempLogo.remove();
    }, 600);
  }, 2000);
}

// show home image with zoom-in animation
function showHomeImage() {
  const homeImg = document.createElement("img");
  homeImg.className = "home-img centered zoom-in";
  homeImg.src = "home.jpg";
  homeImg.alt = "Home background";
  container.innerHTML = "";
  container.appendChild(homeImg);
  container.style.height = "calc(100vh - 40px)";

  // zoom-out animation when removing the image
  setTimeout(() => {
    homeImg.classList.remove("zoom-in");
    homeImg.classList.add("zoom-out");
    setTimeout(() => {
      homeImg.remove();
    }, 600);
  }, 2000);
}

// show logo with white background and zoom-in animation
function showLogoWithBackground() {
  const logoContainer = document.createElement("div");
  logoContainer.className = "centered-logo-container centered zoom-in";
  const logoImg = logo.cloneNode(true);
  logoContainer.appendChild(logoImg);
  container.appendChild(logoContainer);
  container.style.height = "calc(100vh - 40px)";

  // zoom-out animation when removing the logo container
  setTimeout(() => {
    logoContainer.classList.remove("zoom-in");
    logoContainer.classList.add("zoom-out");
    setTimeout(() => {
      logoContainer.remove();
    }, 600);
  }, 2000);
}

// reset form
function resetForm() {
  form.reset();
  onlineIdError.textContent = "";
  passwordError.textContent = "";
  checkboxError.textContent = "";
}

// animate content appearance
function animateContentAppearance() {
  container.innerHTML = "";
  container.appendChild(loginBox);
  loginBox.style.opacity = "0";
  loginBox.style.display = "grid";
  container.style.height = "100%";

  const elements = [logo.parentElement, ...main.children, imgBox];
  elements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 200);
  });

  setTimeout(() => {
    loginBox.style.opacity = "1";
    loginBox.style.transition = "opacity 0.5s ease";
  }, 100);
}

//  page reload
document.addEventListener("DOMContentLoaded", function () {
  resetForm();
  animateContentAppearance();
});
