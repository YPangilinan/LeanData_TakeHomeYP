# Take Home Project - Expenses Tables
![Screen Shot 2023-05-02 at 12 02 17 PM](https://user-images.githubusercontent.com/61812035/235760989-5bd0c696-81ac-484d-8d1e-f4b85537cd9f.png)

## Project Description
This is a single page application containing 3 tables that allow you to add/edit/delete users, add/edit/delete expenses for each user, and display a summary of expenses by expense category.  <br>

## Want to run it locally?
To install the application follow the instructions below:

	git clone git@github.com:YPangilinan/LeanData_TakeHomeYP.git
	npm install
  
This should install the necessary packages from the Package.JSON needed for the application. Then the terminal,run the React application with the command below.

	npm start
  
The application will now be running locally on `localhost:3000`.

### How was this app created?
The specific technologies used to create this app are:
- [Create-React-App](https://github.com/facebook/create-react-app)
- [MaterialUI](https://material-ui.com/)


## Features and Futures
What are the functionalities for each table? What are some limitations to the features? And what are thoughts for future iterations of the project.

### Users Table

**Functionality**
- Add New User: This form takes a required first and last name and adds to the table of new users with a total expense of 0
- Edit Existing User: This form takes required first and last name and updates the current user's first and last name
- Delete User: This will delete your selected user from the table

**Future Improvements**
- For editing a user, the inputs will be populated with selected user's first and last names allowing the user to have the ability to change just one name

### Expenses Table

**Functionality**
- Add New Expense: This form has a dropdown selection of existing users and categories as well as takes a description and cost adds to the table of expenses as well as adds to the expenses of the particular user selected
- Edit Existing Expense: This form allows the user to edit the category, description, and cost of an existing expense for that selected user
- Delete Expense: This will delete the selected expense from the selected user's expenses

**Future Improvements**
- For editing an expense, this user should be able to edit the user to which the expense was assigned.
- The current implementation does not account for the duplicate names, though the userData has unique Id's assigned to each user

### Category Expenses Table

**Functionality**
- Allows the user to view total expenses separated by expense category

