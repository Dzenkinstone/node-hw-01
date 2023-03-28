const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const findContact = parsedContacts.find(
      ({ id }) => id === String(contactId)
    );
    return findContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    const deleteContact = parsedContacts.filter(
      ({ id }) => id !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(deleteContact));
    return deleteContact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    const contact = parsedContacts.map((contact) => contact);
    contact.push({ id: uuidv4(), name, email, phone });
    await fs.writeFile(contactsPath, JSON.stringify(contact));
    return contact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
