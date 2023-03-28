const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const argv = require("yargs").argv;

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        console.table(await listContacts());
        break;

      case "get":
        console.log(await getContactById(id));
        break;

      case "add":
        console.log(await addContact(name, email, phone));
        break;

      case "remove":
        console.log(await removeContact(id));
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error);
  }
}

invokeAction(argv);
