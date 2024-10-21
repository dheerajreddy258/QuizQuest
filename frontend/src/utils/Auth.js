import { auth } from './firebaseConfig';

const registerUser = async (email, password) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.error(error);
  }
};

const loginUser = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.error(error);
  }
};

const logoutUser = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
  }
};

export { registerUser, loginUser, logoutUser };