import './index.css';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import {
    initialCards,
    editButton,
    addButton,
    nameInput,
    jobInput,
    userInfoSelector,
    form,
    cardSection
} from '../scripts/utils/constants.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';

function createCardElement(link, name) {
    const card = new Card(link, name, '#cards', () => {
        const popupWithImage = new PopupWithImage('.popup_image');
        popupWithImage.open(card._link, card._name);
        popupWithImage.setEventListeners();
    });

    return card.generateCard();
}

const cardsSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCardElement(item.link, item.name);
        cardsSection.addItem(card);
    }
}, cardSection);

cardsSection.renderItems();

const popupWithAddForm = new PopupWithForm('.popup_add', (formValues) => {
    cardsSection.addItem(createCardElement(formValues.link, formValues.title));
});

popupWithAddForm.setEventListeners();

addButton.addEventListener('click', () => {
    popupWithAddForm.open();
});

const userInfo = new UserInfo(userInfoSelector);

const popupWithEditForm = new PopupWithForm('.popup_edit', (formValues) => {
    userInfo.setUserInfo(formValues.name, formValues.job);
});

popupWithEditForm.setEventListeners();

function openFormAuthor() {
    const infoUser = userInfo.getUserInfo();
    nameInput.value = infoUser.nameInfo;
    jobInput.value = infoUser.jobInfo;
    popupWithEditForm.open();
}

editButton.addEventListener('click', () => {
    openFormAuthor();
})

const formElement = new FormValidator(form, '.popup__form');
formElement.enableValidation();
formElement.enableValidation();
