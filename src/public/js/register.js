const form = document.getElementById("registration");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => {
    obj[key] = value;
  });
  const profilePhoto = form.querySelector('input[name="profilePhoto"]')
    .files[0];
  if (profilePhoto) {
    obj.profilePhoto = profilePhoto;
  }
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });
  try {
    const response = await fetch("/api/sessions/register", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      window.location.replace("/users/login");
    } else {
      console.error("Registration failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
});
