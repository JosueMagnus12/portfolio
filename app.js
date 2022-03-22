//form fields
const nameEl = document.querySelector("#name");
const emailEl = document.querySelector("#email");
const messageEl = document.querySelector("#message");
const formEl = document.querySelector("form");

//error prompts
const namePrompt = document.querySelector("#name-prompt");
const emailPrompt = document.querySelector("#email-prompt");
const messagePrompt = document.querySelector("#message-prompt");

//utility functions
const isMissing = input => input.value === "";
const nameInRange = name => name.value.length >= 3 && name.value.length <= 25;
const isValidEmail = email => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value);
const isMessageAtLeast10 = message => message.value.length >= 10;

//Validation is based on the metadata of each field
class FormField {
    constructor(field, errorMessage, prompt, isValid) {
        this.field = field;
        this.errorMessage = errorMessage;
        this.prompt = prompt;
        this.isValid = isValid;
    }
}

//this is the actual checker
const checkFormField = (formField, specificConstrainChecker, customMessage) => {
    if (isMissing(formField.field)) {
        formField.errorMessage = 'This field is required';
        formField.valid = false;
    }
    else if (!specificConstrainChecker(formField.field)) {
        formField.errorMessage = customMessage;
        formField.valid = false;
    }
    else {
        formField.valid = true;
    }
};

//validation
formEl.addEventListener('submit', (e) => {
    const formFields = [
        new FormField(nameEl, "", namePrompt, true),
        new FormField(emailEl, "", emailPrompt, true),
        new FormField(messageEl, "", messagePrompt, true),
    ];

    checkFormField(formFields[0], nameInRange, 'Name must have between 3 and 25 characters');
    checkFormField(formFields[1], isValidEmail, 'Enter a valid email');
    checkFormField(formFields[2], isMessageAtLeast10, 'Message must have at least 10 characters');

    const areThereInvalidFields = formFields.some(field => field.valid === false);

    if (areThereInvalidFields) {
        const blackList = formFields.filter(inputField => inputField.valid === false);
        const whiteList = formFields.filter(inputField => inputField.valid === true);
        blackList.forEach(item => {
            item.prompt.classList.remove('hide');
            item.prompt.textContent = item.errorMessage;
        });
        whiteList.forEach(item => {
            item.prompt.classList.add('hide');
        });
        e.preventDefault();
    }
});