import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Import the Firebase app instance
import { FIREBASE_APP } from "./firebase-config";

// Initialize Firestore
const FIRESTORE_DB = getFirestore(FIREBASE_APP);

// Function to perform CRUD operations on a given collection
export const firestoreOperations = {
  addDocument: async (collectionName, documentData) => {
    try {
      const collectionRef = collection(FIRESTORE_DB, collectionName);
      const docRef = await addDoc(collectionRef, documentData);
      console.log(`Document written with ID: ${docRef.id}`);
      return docRef.id;
    } catch (error) {
      console.error(`Error adding document to ${collectionName}: `, error);
      throw error;
    }
  },

  getDocuments: async (collectionName) => {
    try {
      const collectionRef = collection(FIRESTORE_DB, collectionName);
      const querySnapshot = await getDocs(collectionRef);
      const documentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return documentsData;
    } catch (error) {
      console.error(`Error getting documents from ${collectionName}: `, error);
      throw error;
    }
  },

  updateDocument: async (collectionName, documentId, updatedData) => {
    try {
      const collectionRef = collection(FIRESTORE_DB, collectionName);
      const docRef = doc(collectionRef, documentId);
      await updateDoc(docRef, updatedData);
      console.log(`Document updated successfully`);
    } catch (error) {
      console.error(`Error updating document in ${collectionName}: `, error);
      throw error;
    }
  },

  deleteDocument: async (collectionName, documentId) => {
    try {
      const collectionRef = collection(FIRESTORE_DB, collectionName);
      const docRef = doc(collectionRef, documentId);
      await deleteDoc(docRef);
      console.log(`Document deleted successfully`);
    } catch (error) {
      console.error(`Error deleting document from ${collectionName}: `, error);
      throw error;
    }
  },
};

export default FIRESTORE_DB;
