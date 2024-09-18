// Authentication Screens
import Login from "./(auth)/login";
import Register from "./(auth)/register";
import ForgotPassword from "./(auth)/forgot-password";

// Tab Screens
import HomeTab from "./(app)/(tabs)";
import UpdatesTab from "./(app)/(tabs)/updates-tab";
import MapsTab from "./(app)/(tabs)/maps-tab";
import FAQTab from "./(app)/(tabs)/faq-tab";
import AccountTab from "./(app)/(tabs)/account-tab";

// Home Screens
import Request from "./(app)/(home)/request";
import EventDetails from "./(app)/(home)/event-details";
import AllEventsScreen from "./(app)/(home)/all-events";
import ManageBloodUnits from "./(app)/(home)/manage-blood-units";
import ManageEvents from "./(app)/(home)/manage-events";
import ManageStaff from "./(app)/(home)/manage-staff";
import ManageUsers from "./(app)/(home)/manage-users";

// Account Screens
import Profile from "./(app)/(account)/profile";
import DonationHistory from "./(app)/(account)/donation-history";
import Settings from "./(app)/(account)/settings";
import About from "./(app)/(account)/about";
import Help from "./(app)/(account)/help";

// QR Code Screens
import QRScanner from "./(app)/(qr)/qr-scanner";

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
  AccountTab,
  Profile,
  DonationHistory,
  Settings,
  About,
  Help,
  QRScanner,
  NoInternetScreen,
  TermsAndConditionsScreen,
};
