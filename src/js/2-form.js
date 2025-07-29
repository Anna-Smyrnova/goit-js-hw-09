const formEl = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};

formEl.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value.trim();
  const message = e.currentTarget.elements.message.value.trim();

  formData.email = email;
  formData.message = message;

  saveToLS('feedback-form-state', formData);
});

document.addEventListener('DOMContentLoaded', () => {
  const lsData = getFromLS('feedback-form-state');
  if (lsData) {
    formData.email = lsData.email || '';
    formData.message = lsData.message || '';
    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  }
});

formEl.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  formEl.reset();
  formData.email = '';
  formData.message = '';
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key) {
  const jsonData = localStorage.getItem(key);
  try {
    return jsonData ? JSON.parse(jsonData) : null;
  } catch {
    return null;
  }
}
