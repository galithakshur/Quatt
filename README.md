# Users CRUD API Testing

## What to install/dependencies

You will need Node.js installed on your system to run this code.

The following packages are used:

- `supertest`
- `jest`

Install the required packages by running `npm install`.

## How to Run
Update the user emails in the code before running to ensure email doesn't already exsist in the DB (lines 13 and 84) 
After installing dependencies, execute `npm run test` to run the tests.

## API

- The API is available at https://gorest.co.in/.
- These tests focus on CRUD operations for users only.
- The end point used for testing was https://gorest.co.in/public/v2/users
- Version 2 of the API is used for testing.

## Tests Performed

1. Created new user successfully.
2. Got new user details successfully.
3. Failed to create new user with existing email.
4. Failed to create user with invalid Gender field value.
5. Updated user details successfully.
6. Got user details successfully after editing.
7. Deleted user successfully.
8. Failed to get user details after deleting user.
9. Failed to delete non-existing user.

## Non-Included Failure Modes

Additional failure modes beyond those mentioned above have not been explicitly tested in this code such as:

- Failed to create/edit a user with extra fileds that are not part of the structure - the endpoint just ignores the extra fields
- Failed to create a user with missing fileds - same resulet as invalid value, user is not created
- Failed to update ID filed - 400 error Bad request
- Add .send(body) of a different user to delete user - body is ignored and the user is deleted by the id

## Author

Galit Hakshur galithakshur@gmail.com
