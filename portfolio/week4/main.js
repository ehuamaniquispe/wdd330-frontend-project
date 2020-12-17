
const form = document.forms[0];

form.addEventListener('submit',validate,false);
function validate(event) {
    const firstLetter = form.name.value[0];
    if (firstLetter.toUpperCase() === 'E') {
        event.preventDefault();
        alert('Your name is not allowed to start with E!');
    }
}
