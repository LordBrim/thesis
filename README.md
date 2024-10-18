# Lifeline

<!-- Description -->

## Email Creation %% #done %%

- Make sure to specify the suffix of certain emails. For example:
  - uerm@admin.com
  - andreisager@lifeline.com
  - angelomunar@lifeline.com

# Use Cases

- Registering and logging into Lifeline using Email/Password Authentication.
- Accessing and managing records for users, events, etc:
  - Create
  - Read
  - Update
  - Delete
  - Archive
- Provides a summary and generates reports based on gathered data in the database.
  - Weekly
  - Monthly
  - Yearly
- QR code technology to streamline procedures.
- Online accessibility and inquiry.
- Map navigation using gps route planning.

# Tasks

## App Screens

### User

- Home Screen
  - [ ] CRUD for all manage screens
  - [ ] In request screen make the steps indicator clickable to navigate pages.
  - [ ] In request screen, implement firebase image upload. The users cannot upload more than 5mb for their documents.
  - [ ] Add an event collection
  - [ ] Add partnership field to the database for when creating events.
  - [ ] Make events go directly to event location on maps.
  - [ ] Allow admin to manipulate blood availability using toggles.
- Updates Screen
  - [ ] Add [infinite scrolling](https://truesparrow.com/blog/infinite-scrolling-in-react-native/) loader to updates tab.
  - [ ] Display the prizes as text for requesting blood for every hospital.
- Maps Screen
  - [ ] Include event markers in maps screen.
  - [ ] Make hospital markers as [hospital](https://icons.expo.fyi/Index/FontAwesome6/hospital) icon.
  - [ ] Make blood event markers as [blood units](https://icons.expo.fyi/Index/Fontisto/blood) icon.
  - [ ] Remove the marker for account hospital. Disable on maps.
  - [ ] Redesign modal for maps screen when a location is selected.
- FAQ Screen
- [ ] FAQ general questions are pinned to the top. While custom questions are sorted alphabetically by hospital on the bottom.
- Account Screen

### Staff

- Home Screen
  - [ ] No approval needed. Staff can edit event details.

### Admin

- Home Screen
  - [ ] Just replace the home heading with a role (excluding the user). Create an indicator to identify between a user, staff, admin, and super admin.
  - [ ] Add hospital-to-hospital blood unit requests.
  - [ ] Add CRUDA for every collection.
  - [ ] Refresh the appointment requests when going down the screen.
  - [ ] Create a screen to handle tickets requests. Place tickets on updates screen as role based components.
  - [ ] Create a custom screen for managing incentives. This will display as a the number of donations needed and the rewards for each milestone. Just like game passes.

## Authentication

- [ ] Integrate OAuth (additional providers login) for login and registration screen. Integrate OAuth for Google and Facebook.
  - [ ] Google
  - [ ] Facebook
- [ ] Create new collection for recording process logs. The fields should be title, date, description, and the category it corresponds to. Don’t forget the reference of the tickets.
- [ ] Add forget password functionality to send an email for a 4-digit pin confirmation.

## State Management And Permissions

- [ ] (High) Implement roles using context.
- [ ] Ask permission for push notifications on first login. If the user declines then prevent push notification and only display it on the updates tab.

## Potential Improvements

- [ ] Chatbot that translates FAQ questions to specified language

## Content

> For Nicole

- [ ] Make content for about screen
- [ ] Make content for help screen
- [ ] Make content and research policy for terms and conditions
- [ ] Make content for 10 guidelines for requesting blood units
- [ ] Make content for FAQ. Based on guides and questionnaires sent by the hospital.

## If We Have Time

- [ ] Add automated tests using Jest for React Native
- [ ] Add close all questions or open all questions in FAQ
