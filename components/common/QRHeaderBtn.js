import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default function QRHeaderBtn() {
  return (
    <Link asChild href="QRScanner">
      <TouchableOpacity>
        <MaterialCommunityIcons name="qrcode-scan" size={24} color="black" />
      </TouchableOpacity>
    </Link>
  );
}
