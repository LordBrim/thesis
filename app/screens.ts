// Authentication Screens
import Login from "./(auth)/login";
import Register from "./(auth)/register";
import ForgotPassword from "./(auth)/forgot-password";

// Tab Screens
import HomeTab from "./(app)/(user)/(tabs)";
import UpdatesTab from "./(app)/(user)/(tabs)/updates-tab";
import MapsTab from "./(app)/(user)/(tabs)/maps-tab";
import FAQTab from "./(app)/(user)/(tabs)/faq-tab";

// Home Screens
import Request from "./(app)/(user)/(home)/request";
import EventDetails from "./(app)/(user)/(home)/event-details";
import AllEventsScreen from "./(app)/(user)/(home)/all-events";
import ManageBloodUnits from "./(app)/(admin)/(home)/manage-blood-units";
import ManageEvents from "./(app)/(admin)/(home)/manage-events";
import ManageStaff from "./(app)/(admin)/(home)/manage-staff";
import ManageUsers from "./(app)/(admin)/(home)/manage-users";

// Account Screens
import Profile from "./(app)/(user)/(account)/profile";
import DonationHistory from "./(app)/(user)/(account)/donation-history";
import Settings from "./(app)/(user)/(account)/settings";
import About from "./(app)/(user)/(account)/about";
import Help from "./(app)/(user)/(account)/help";

// QR Code Screens
import QRScanner from "./(app)/(user)/(qr)/qr-scanner";

// Auxilary Screens
import EmptyScreen from "./(aux)/empty";
import NoInternetScreen from "./(aux)/no-internet";
import TermsAndConditionsScreen from "./(aux)/terms-and-conditions";

export {
  EmptyScreen,
  Login,
  Register,
  ForgotPassword,
  HomeTab,
  Request,
  EventDetails,
  AllEventsScreen,
  ManageBloodUnits,
  ManageEvents,
  ManageStaff,
  ManageUsers,
  UpdatesTab,
  MapsTab,
  FAQTab,
  Profile,
  DonationHistory,
  Settings,
  About,
  Help,
  QRScanner,
  NoInternetScreen,
  TermsAndConditionsScreen,
};
