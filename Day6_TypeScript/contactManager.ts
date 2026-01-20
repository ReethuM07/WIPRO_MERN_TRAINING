// contactManager.ts

// 1. Defining Interface
interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

// 2. Implementing ContactManager Class
class ContactManager {
  private contacts: Contact[] = [];

  // Add a new contact
  addContact(contact: Contact): void {
    const exists = this.contacts.some(c => c.id === contact.id);
    if (exists) {
      console.log(`❌ Error: Contact with ID ${contact.id} already exists.\n`);
      return;
    }
    this.contacts.push(contact);
    console.log(`✅ Contact "${contact.name}" added successfully!\n`);
  }

  // View all contacts
  viewContacts(): void {
    console.log("📋 Viewing All Contacts:");
    if (this.contacts.length === 0) {
      console.log("📭 No contacts found.\n");
      return;
    }
    console.table(this.contacts);
    console.log("");
  }

  // Modify an existing contact
  modifyContact(id: number, updatedContact: Partial<Contact>): void {
    const contactIndex = this.contacts.findIndex(c => c.id === id);
    if (contactIndex === -1) {
      console.log(`❌ Error: Contact with ID ${id} does not exist.\n`);
      return;
    }
    this.contacts[contactIndex] = { ...this.contacts[contactIndex], ...updatedContact };
    console.log(`✅ Contact with ID ${id} updated successfully!\n`);
  }

  // Delete a contact
  deleteContact(id: number): void {
    const contactIndex = this.contacts.findIndex(c => c.id === id);
    if (contactIndex === -1) {
      console.log(`❌ Error: Contact with ID ${id} does not exist.\n`);
      return;
    }
    const removed = this.contacts.splice(contactIndex, 1);
    console.log(`✅ Contact "${removed[0].name}" deleted successfully!\n`);
  }
}

// ------------------
// 3. Testing Script 
// ------------------
console.log("📞 Welcome to the Contact Manager Assignment Test!\n");

const manager = new ContactManager();

// Adding contacts
console.log("🔹 Adding Contacts:");
manager.addContact({ id: 1, name: "Reethu", email: "reethu@example.com", phone: "8147183647" });
manager.addContact({ id: 2, name: "Neethu", email: "neethu@example.com", phone: "9876543210" });

// Attempt to add a duplicate
manager.addContact({ id: 1, name: "Preethu", email: "preethu@example.com", phone: "9112823373" });

// View all contacts
console.log("🔹 Viewing Contacts:");
manager.viewContacts();

// Modify a contact
console.log("🔹 Modifying Contact:");
manager.modifyContact(2, { email: "neethu.new@example.com", phone: "9998887777" });

// Attempt to modify a non-existent contact
manager.modifyContact(5, { name: "Unknown" });

// View contacts after modification
console.log("🔹 Viewing Contacts After Modification:");
manager.viewContacts();

// Delete a contact
console.log("🔹 Deleting Contact:");
manager.deleteContact(2);

// Attempt to delete a non-existent contact
manager.deleteContact(5);

// View contacts after deletion
console.log("🔹 Viewing Contacts After Deletion:");
manager.viewContacts();

console.log("🎉 Contact Manager Test Completed!");
