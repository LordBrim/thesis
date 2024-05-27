import { firestoreOperations } from "firestore-services";
export async function generateUniqueTicketCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";

  while (true) {
    // Keep generating until a unique code is found
    let code = "";
    code += characters.charAt(Math.floor(Math.random() * characters.length)); // First letter
    code += characters.charAt(Math.floor(Math.random() * characters.length)); // Second letter
    code += characters.charAt(Math.floor(Math.random() * characters.length)); // Third letter
    code += characters.charAt(Math.floor(Math.random() * characters.length)); // Fourth letter
    code += " "; // Space between letters and numbers
    code += digits.charAt(Math.floor(Math.random() * digits.length)); // First number
    code += digits.charAt(Math.floor(Math.random() * digits.length)); // Second number
    code += digits.charAt(Math.floor(Math.random() * digits.length)); // Third number
    code += digits.charAt(Math.floor(Math.random() * digits.length)); // Fourth number

    try {
      // Check if the code already exists in Firestore
      const existingDocuments = await firestoreOperations.getDocuments(
        "ticketRequest"
      );
      const codeExists = existingDocuments.some(
        (doc) => doc.ticketNumber === code
      );

      if (!codeExists) {
        return code;
      }
    } catch (error) {
      console.error("Error checking for existing ticket code:", error);
    }
  }
}
