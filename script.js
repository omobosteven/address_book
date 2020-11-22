let addressForm = document.forms.addAddressForm;

let name = addressForm.elements.name;
let email = addressForm.elements.email;
let phoneNumber = addressForm.elements.phoneNumber;

let addressFormItems = document.querySelectorAll('input[name]');
let errorMessage = document.getElementById('error');
let contacts = document.getElementById('contactList');
let contactTitle = document.querySelectorAll('.contactTitle');
let contactDetails;

let contactsState = [];

const deleteContact = (event) => {
  event.stopPropagation();
  const filteredContactsState = contactsState.filter((contact) => {
    return contact.id !== parseInt(event.target.dataset.id);
  });
  contactsState = [...filteredContactsState];
  localStorage.setItem("contacts", JSON.stringify(contactsState));

  event.target.parentElement.parentElement.remove();
};

const createNewContactElement = (contact) => {
  let listItem = document.createElement('li');
  let contactDetails = document.createElement('div');
  let contactName = document.createElement('h3');
  let contactEmail = document.createElement('p');
  let contactPhoneNumber = document.createElement('p');
  let editBtn = document.createElement('i');
  let deleteBtn = document.createElement('i');

  contactName.textContent = contact.name;
  contactEmail.textContent = contact.email;
  contactPhoneNumber.textContent = contact.phoneNumber;
  editBtn.textContent = 'create';
  deleteBtn.textContent = 'remove_circle';

  contactName.className = ('contactTitle');
  contactDetails.className = ('contactDetails');
  editBtn.classList.add("material-icons", "cta-icon");
  deleteBtn.classList.add("material-icons", "cta-icon");

  deleteBtn.setAttribute("data-id", contact.id);

  contactName.addEventListener('click', toggleContactDetails);
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('edit')}
    );
  deleteBtn.addEventListener('click', deleteContact);

  contactName.append(editBtn, deleteBtn);
  listItem.append(contactName, contactDetails);
  contactDetails.append(contactEmail, contactPhoneNumber);

  return listItem
};

 /**
  * @description Listener for saveButton to Add a New Contact to the List
  */

const addContact = (event) => {
  event.preventDefault();

  let contact = {
        name: name.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        id: contactsState.length + 1
      }

  // let validation = validateFormInput(contact);
  // if (!validation) {
  //   return false;
  // }

  contactsState.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contactsState));

  let listItem = createNewContactElement(contact);
  contacts.appendChild(listItem);

    name.value = '',
    email.value = '',
    phoneNumber.value = ''
};

 /**
  * @description Validates the Inputs to the Form
  */

const validateFormInput = (contact) => {

  const name = /(^[a-z])[a-z]+\s?[a-z_-]+([a-z0-9]$)+/gim;
  let isName = contact.name.match(name);

  const email = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z.]+)/ig;
  let isEmail = contact.email.match(email);

  const number = /(^[+]\d{13})|(\d{10})/gm;
  let isPhoneNum = contact.phoneNumber.match(number)

  if (!contact.name) {
    errorMessage.innerText = 'Name not provided';
    return false;
  } else if (!isName) {
    errorMessage.innerText = 'Name can only contain letters, numbers, underscore and dash \n and can only start with letters';
    return false
  }

  if (!contact.address) {
    errorMessage.innerText = 'Address not provided';
    return false;
  }

  if (!contact.email) {
    errorMessage.innerText = 'Email not provided';
    return false;
  } else if (!isEmail) {
    errorMessage.innerText = 'email is invalid';
    return false;
  }

  if (!contact.phoneNumber) {
    errorMessage.innerText = 'Phone number not provided';
    return false;
  } else if (!isPhoneNum) {
    errorMessage.innerText = 'enter a valid phone number';
    return false;
  }


  return true;
};


 /**
  * @description Listener for contactTitle to Trigger Accordion
  */

const toggleContactDetails = (e) => {
  contactDetails = document.querySelectorAll('.contactDetails');
  closeContactDetails(e.target.nextElementSibling);
  e.target.nextElementSibling.classList.toggle('active');
  e.target.nextElementSibling.scrollIntoView(true);
};

 /**
  * @description Function to Close Any Open contactDetails
  */

const closeContactDetails = (target) => {
  for (let i = 0; i < contactDetails.length; i++) {
    if (target != contactDetails[i]){
      contactDetails[i].classList.remove('active');
    }
  }
};

 /**
  * @description Click Event Handlers
  */

  //Save Button
addAddressForm.addEventListener('submit', addContact);

 //Contact titles
 for (let i = 0; i < contactTitle.length; i++) {
  contactTitle[i].addEventListener('click', toggleContactDetails);
};

// Address Form
// for (let i = 0; i < addressFormItems.length; i++) {
//     addressFormItems[i].addEventListener('input', () => {
//       if (errorMessage.textContent.length > 0) {
//               errorMessage.innerHTML = '';
//       }
//     });
// };

const renderContact = (contactsState) => {
  for (const contact of contactsState) {
    const listItem = createNewContactElement(contact);
    contacts.appendChild(listItem);
  }
}

const contactsFromStorage = JSON.parse(localStorage.getItem("contacts")) || [];
contactsState = [...contactsFromStorage];
renderContact(contactsState);
