import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { createUserDocumentOnAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentOnAuth(user);
  };
  return (
    <>
      <h1>This is sign in Page</h1>
      <button onClick={logGoogleUser}>Sign In With Google</button>
    </>
  );
};

export default SignIn;
