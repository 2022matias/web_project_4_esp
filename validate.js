const formElement = document.querySelector(".popup__form");
const formInput = formElement.querySelector(".popup__input");

const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	errorElement.classList.add("popup__error_visible");
	errorElement.textContent = errorMessage;
	errorElement.classList.add("popup__input_type_error");
};


const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	errorElement.classList.remove("popup__error_visible");
	errorElement.classList.remove("popup__input_type_error");
	errorElement.textContent = "";
};


const isValid = (formElement, inputElement) => {
	if(!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage);
	} else {
		hideInputError(formElement, inputElement);
	}
};

const setEventListeners = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
	const buttonElement = formElement.querySelector(".popup__button");
	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", () => {
			isValid(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
		});
  });
}; 

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation(); 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 


const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.classList.remove("popup__button_disabled");
  }
}; 