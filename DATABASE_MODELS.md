# Database Modesl Using Firebase

- [Firestore Documentation](https://firebase.google.com/docs/firestore/data-model#collections  )
- [New Id Generation](https://stackoverflow.com/questions/46618719/firestore-are-auto-generated-ids-unique-in-the-collection-or-globally)

1. Models in firestore are written in `camelCase`.

## User

| Key     | Field       | Type     | Description / Value                                                                                      |
| ------- | ----------- | -------- | -------------------------------------------------------------------------------------------------------- |
| Primary | id          | string   | The unique id of the user. The id is the username by default and can be changed later.                   |
|         | createdAt   | datetime | The date when the user is created.                                                                       |
|         | updatedAt   | datetime | The date when the user is updated.                                                                       |
|         | role        | string   | The role determines the access level of the user. Whether the account is for an admin, staff, or client. |
|         | username    | string   | The username of the user.                                                                                |
|         | email       | string   | The email used by the user.                                                                              |
|         | phoneNumber | string   | The phone number used by the user.                                                                       |
|         | avatarUrl   | string   | The avatar picture of the user.                                                                          |


## Blood Unit Donation

| Key     | Field      | Type     | Description / Value                                                             |
| ------- | ---------- | -------- | ------------------------------------------------------------------------------- |
| Primary | id         | string   | The unique id of blood unit.                                                    |
| Foreign | facilityId | id       | The reference to the facility where the blood unit is stored.                   |
| Foreign | eventId?   | id       | The reference to the event if blood units are donated at events. (optional)     |
| Foreign | donorId    | id       | The reference to the donor of the blood unit.                                   |
|         | createdAt  | datetime | The datetime when the blood unit is donated.                                    |
|         | archivedAt | datetime | The datetime when the blood unit is transfused or disposed.                     |
|         | type       | string   | The blood type of the blood unit. It can be O, A, B, or AB.                     |
|         | rhesus     | string   | The rhesus factor of the blood unit. It can be positive or negative.            |
|         | status     | string   | The current status of the blood unit. It can be stored, transfused, or disposed |

## Blood Unit/s Request

| Key     | Field        | Type     | Description / Value                                                         |
| ------- | ------------ | -------- | --------------------------------------------------------------------------- |
| Primary | id           | string   | The unique id of the request.                                               |
|         | createdAt    | datetime | The datetime when the blood unit/s was requested.                           |
|         | archivedAt   | datetime | The datetime when the request is archived after being accepted or declined. |
|         | status       | string   | pending, accepted, or declined                                              |
| Foreign | bloodUnitIds | id[]     | The array of references to the blood units requested.                       |
| Foreign | fromId       | id       | The facility where the blood units are requested from.                      |
| Foreign | toId         | id       | The facility requesting blood units.                                        |

## Facility

| Key     | Field     | Type     | Description / Value                           |
| ------- | --------- | -------- | --------------------------------------------- |
| Primary | id        | string   | The unique id of the facility.                |
|         | createdAt | datetime | The datetime when the facility is registered. |
|         | name      | string   | The name of the facility.                     |
|         | address   | string   | The address of the facility.                  |

## Event

| Key     | Field       | Type     | Description / Value                                                                          |
| ------- | ----------- | -------- | -------------------------------------------------------------------------------------------- |
| Primary | id          | string   | The unique id of the event.                                                                  |
| Foreign | facilityId? | id       | The reference to the facility holding the event. (optional)                                  |
|         | createdAt   | datetime | The datetime when the event is created.                                                      |
|         | startAt     | datetime | The datetime when the event starts.                                                          |
|         | endAt       | datetime | The datetime when the event ends.                                                            |
|         | title       | string   | The title of the event.                                                                      |
|         | address     | string   | The address of the event location.                                                           |
|         | status      | string   | The status of the event. Whether the event is pending, in-progress, cancelled, or completed. |

## Question

| Key     | Field    | Type   | Description / Value            |
| ------- | -------- | ------ | ------------------------------ |
| Primary | id       | string | The unique id of the question. |
|         | category | string | The category of the question.  |
|         | question | string | The question.                  |
|         | answer   | string | The answer.                    |
