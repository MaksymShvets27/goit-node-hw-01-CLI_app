const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");
let contactsList = [];

const takeContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const json = JSON.parse(data.toString());
    return json;
  } catch (error) {
    console.log(error.messege);
  }
};

const listContacts = async () => {
  contactsList = await takeContacts();
  if (!contactsList) {
    console.log("Sorry, you dont have contacts");
    return;
  }
  console.table(contactsList);
};

const getContactById = async (contactId) => {
  contactsList = await takeContacts();
  if (!contactsList) {
    console.log("Sorry, you dont have contacts");
    return;
  }
  const currentContact = contactsList.find((contact) => {
    return contact.id === Number(contactId);
  });
  if (!currentContact) {
    console.log("Sorry, wrong Id!");
    return;
  }
  console.table(currentContact);
};

const removeContact = async (contactId) => {
  contactsList = await takeContacts();
  if (!contactsList) {
    console.log("Sorry, you dont have contacts");
    return;
  }
  const newContactsList = contactsList.filter(
    (contact) => contact.id !== Number(contactId)
  );
  fs.writeFile(contactsPath, JSON.stringify(newContactsList));
};

const addContact = async (name, email, phone) => {
  try {
    contactsList = await takeContacts();
    contactsList.map((contact) => {
      if (contact.name === name) {
        console.log("You already have contact with current name!");
        process.exit();
        return;
      }
    });
    contactsList.push({
      name: name,
      email: email,
      phone: phone,
    });
    contactsList.forEach((element, index) => {
      element.id = index + 1;
    });
    fs.writeFile(contactsPath, JSON.stringify(contactsList));
  } catch (err) {
    console.log("Error!!");
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
