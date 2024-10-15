# Lifeline

<!-- Description -->

# Use Cases

- Registering and logging into Lifeline using Email/Password Authentication.
- Accessing and managing records for blood units, users, events, etc:
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

## Back-End

- [x] Integrate database for data in account screen.
- [x] Integrate image upload and selection screen.
- [ ] Ask permission for push notifications on first login. If the user declines then prevent push notification and only display it on the updates tab.
- [x] Add confirmation modal for logout button.
- [ ] Integrate OAuth (additional providers login) for login and registration screen. Integrate OAuth for Google and Facebook.
  - [ ] Google
  - [ ] Facebook
- [x] Integrate local storage for remember me checkbox on login screen. Checking the remember be checkbox will save the user data locally. Checking for an existing login, allowing the user to login instantly. The user will be automatically redirected to the home screen.
- [ ] Add forget password functionality to send an email for a 4-digit pin confirmation.
- [x] Add a forget password modal to accept the 4-digit pin.
  - [x] Add a button with a 5-minute timer to allow the user to resend another 4-digit pin. This new pin will invalidate the existing pin.
- [x] Add set new password screen with password strength input rules. The user must adhere to the all password rules to change their password.
- [x] Add a back to login button for the successful set new password modal.
- [x] Replace login error modal with simpler text feedback below the inputs.
- [ ] Add an event collection
  - [ ] Connect event collection for home screen
- [ ] Add [infinite scrolling](https://truesparrow.com/blog/infinite-scrolling-in-react-native/) loader to updates tab.
- [ ] Create new collection for recording process logs. The fields should be title, date, description, and the category it corresponds to. Don’t forget the reference of the tickets.
- [ ] In request screen make the steps indicator clickable to navigate pages.
- [ ] In request screen, implement firebase image upload. The users cannot upload more than 5mb for their documents.
- [ ] Include event markers in maps screen.
- [ ] Make hospital markers as hospital.
- [ ] Make blood event markers as blood units.
- [x] Allow users to select “no” for preliminary checklist. okay lang kung mag “no” sila
  - Example: Do you have tattoos?
- [x] Add blood components to the database to. Whether they are RBC, WBC, Platelets, or Plasma.

### Admin Screen

> Prioritize Admin

- [ ] Add hospital-to-hospital blood unit requests.
- [ ] Refresh the appointment requests when going down the screen.
- [ ] Add CRUDA for every collection.
  - [ ] Create a custom screen for managing incentives. This will display as a the number of donations needed and the rewards for each milestone. Just like game passes.
- [ ] Create a screen to handle tickets requests. Place tickets on updates screen as role based components.
- [ ] Create a screen to generate reports. Place on home as monthly report.
  - [ ] Add a view all button to view reports for the year or for selected date range.
  - [ ] Generate reports button that is printable.
- [ ] Add a dashboard on home screen to manage all tasks as panel of buttons.
- [ ] Just replace the home heading with a role (excluding the user). Create an indicator to identify between a user, staff, admin, and super admin.
- [ ] Remove the marker for account hospital. Disable on maps.
- [ ] Display the prizes for requesting blood for every hospital.
- [ ] Add partnership field to the database for when creating events.

# Front-End

- [x] Make Maps section into a flatlist.
- [x] Clean up accounts section into the design.
- [x] Design the in-app notifications for updates.
- [x] Redesign login and registration screen to apply OAuth
- [x] Add a forget password screen where the user will only send an email and activate a modal.
- [x] Add a modal that accepts the 4-digit pin sent to the user’s email.
- [x] Add set new password screen that shows password strength conditions. Green for approved and nothing for disapproved.
- [x] Add a set new password modal that shows that the user has successfully changed their password.
- [x] Transfer donation screen into updates. The updates tab should have sub tabs as categories containing general, donation history, and donation incentives. All information regarding results are accumulated here.
  - [x] The general updates should contain appointments, requests, donations, and incentives. All information regarding processes are accumulated here.
- [x] In request screen add a steps indicator to declutter current and previous screen.
- [x] Update UI design for file a request modal. Success and error.
- [x] Add date and timer modal to lockdown status.
- [x] Create a reusable modal for all screens.
- [x] Add Modal for required completion of account profile in home for new users and users with incomplete data.
- [x] Finish profile edit screen with required information for the user.

## Admin Screen

- [x] Create a command palette on home screen for admins.
- [x] Create a generate report screen. Reports include total blood unit donations, total blood unit requests, total blood unit transfers, and total blood unit donations per event. Show a graph on top and a summary of the graph on the bottom.
  - [x] Line charts for total donations and requests.
  - [x] Bar charts for event donations.
- [x] Create a button for admin, request blood unit transfers from another hospital.

## Redesign

- [x] Update UI for filing a request at file a request screen.
- [ ] Redesign modal for maps screen when a location is selected.

## Random Bug Fixes

- [x] Make the back buttons of maps screen, donation history screen, profile screen, settings screen, about screen, help screen, maps after upcoming events screen, and login screen after account screens appear.

## Low Priority Improvements

- [x] In donations screen improve the modals of each input field.

## Potential Improvements

- [ ] Chatbot that translates FAQ questions to specified language

## Content

> For Nicole

- [ ] Make content for about screen
- [ ] Make content for help screen
- [ ] Make content and research policy for terms and conditions
- [ ] Make content for 10 guidelines for requesting blood units
- [ ] Make content for FAQ. Based on guides and questionnaires sent by the hospital.

## Consult

- [ ] Add a six digit pin number for email verification. The users must first verify their email before they can login.

## If We Have Time

- [ ] Add automated tests using Jest for React Native
- [ ] Add close all questions or open all questions in FAQ

## Ask Questions To Clarifty

> For Jam and Angelo

- [ ] Should hospital administrators control the display of availability of their blood units? Control using a toggle
- [ ] Do incentives refresh upon completion?
- [ ] Can a user acquire the incentives of multiple hospitals?
- [ ] Can you only have one incentive progress at a time?
- [ ] Make a general checklist for all hospitals
- [ ] Do hospitals donate blood to other medical institutions

## Reminder

- Make sure to specify the suffix of certain emails. For example:
  - uerm@admin.com
  - andreisager@lifeline.com
  - angelomunar@lifeline.com
