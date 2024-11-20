import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { Image, TouchableOpacity } from "react-native";

export default function GoogleAuth() {
  GoogleSignin.configure({
    webClientId:
      "258884201826-dmk3nhsl315f531bb5ok3vbfboee25kp.apps.googleusercontent.com",
  });

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { accessToken, idToken } = await GoogleSignin.getTokens();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <TouchableOpacity
      onPress={() =>
        onGoogleButtonPress().then(() => console.log("Signed in with Google!"))
      }
    >
      <Image
        source={require("../assets/icons/google.png")}
        style={{ width: 34, height: 34 }}
      />
    </TouchableOpacity>
  );
}
