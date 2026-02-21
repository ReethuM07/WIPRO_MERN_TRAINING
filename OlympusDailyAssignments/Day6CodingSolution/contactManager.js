// contactManager.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// 2. Implement ContactManager Class
var ContactManager = /** @class */ (function () {
    function ContactManager() {
        this.contacts = [];
    }
    // Add a new contact
    ContactManager.prototype.addContact = function (contact) {
        var exists = this.contacts.some(function (c) { return c.id === contact.id; });
        if (exists) {
            console.log("\u274C Error: Contact with ID ".concat(contact.id, " already exists.\n"));
            return;
        }
        this.contacts.push(contact);
        console.log("\u2705 Contact \"".concat(contact.name, "\" added successfully!\n"));
    };
    // View all contacts
    ContactManager.prototype.viewContacts = function () {
        console.log("📋 Viewing All Contacts:");
        if (this.contacts.length === 0) {
            console.log("📭 No contacts found.\n");
            return;
        }
        console.table(this.contacts);
        console.log("");
    };
    // Modify an existing contact
    ContactManager.prototype.modifyContact = function (id, updatedContact) {
        var contactIndex = this.contacts.findIndex(function (c) { return c.id === id; });
        if (contactIndex === -1) {
            console.log("\u274C Error: Contact with ID ".concat(id, " does not exist.\n"));
            return;
        }
        this.contacts[contactIndex] = __assign(__assign({}, this.contacts[contactIndex]), updatedContact);
        console.log("\u2705 Contact with ID ".concat(id, " updated successfully!\n"));
    };
    // Delete a contact
    ContactManager.prototype.deleteContact = function (id) {
        var contactIndex = this.contacts.findIndex(function (c) { return c.id === id; });
        if (contactIndex === -1) {
            console.log("\u274C Error: Contact with ID ".concat(id, " does not exist.\n"));
            return;
        }
        var removed = this.contacts.splice(contactIndex, 1);
        console.log("\u2705 Contact \"".concat(removed[0].name, "\" deleted successfully!\n"));
    };
    return ContactManager;
}());
// ----------------------
// 3. Testing Script (Hardcoded)
// ----------------------
console.log("📞 Welcome to the Contact Manager Assignment Test!\n");
var manager = new ContactManager();
// Adding contacts
console.log("🔹 Adding Contacts:");
manager.addContact({ id: 1, name: "Reethu", email: "reethu@example.com", phone: "1234567890" });
manager.addContact({ id: 2, name: "Neethu", email: "neethu@example.com", phone: "9876543210" });
// Attempt to add a duplicate
manager.addContact({ id: 1, name: "Preethu", email: "preethu@example.com", phone: "1112223333" });
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
manager.deleteContact(1);
// Attempt to delete a non-existent contact
manager.deleteContact(5);
// View contacts after deletion
console.log("🔹 Viewing Contacts After Deletion:");
manager.viewContacts();
console.log("🎉 Contact Manager Test Completed!");
