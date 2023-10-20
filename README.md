# Restaurant-Management-App
CS-571 Mobile Application Development, Student Projects Fullstack (React Native, Express, Mongodb)
# Final Project
## Application specifications and requirements
* You will create a mobile application to help restaurant owners manage their food.
* The owners must sign up for a new account (using a unique email, phone number, full name, password, and address). When they log in successfully, the application will display three tabs:
1. List of Foods
* List of Food. Each food item has a name and price.
* Owners can add/edit/delete/view foods
* A food detail contains name, price, date, and image link. For example, Food = {name: 'Noodle', Origin: 'Vietnam', price: 10, date: new Date(), image: <uri>}
* There is a live search bar to search foods by name
2. Daily Notes
* List of notes, but each item only contains header and date.
* Owner can add/view notes
* A note detail has a header, date, and comment. For example, note = {date: new Date(), header: 'Noodle', comment: 'Need to have more noodles next week'}
3. Personal profile
* This screen shows the owner's information (email, phone number, full name, password, address)
* Owners can change their phone number, password, full name, and address on the screen, but not email.
* Owners can log out of the application
## Hint: Suggested database design. You can have a single collection 'users' as below.
{
    _id: ObjectId(),
    name, phone....
    foods:[
        ...
    ],
    notes: [
        ...
    ],
    orders: [
	...
    ]
}

## Your project must include the following:
* Frontend: Use Expo App with React Native components at https://reactnative.dev/docs/components-and-apis. Persist the app state in AsyncStorage, so users don't need to log in every time they start the app. 
* Backend: Use NodeJS Express/MongoDB for supportive backend REST API. You should protect routes from public access by JWT (except sign-up and sign-in routes).
* Implement an Auth system using JSON Web Token (JWT).
* Password should be hashed before saving to database

## (Optional) Implement the Order feature
* Users can add foods to a cart
* Users can check out the cart and save it as an order in the user. The cart should be empty if it is checking out successfully.
  
## Remember to respect the code honor submission policy. All written code must be original. Presenting something as one's work when it came from another source is plagiarism and is forbidden. Plagiarism is shameful in all American academic institutions and is guarded vigilantly by every professor.    

## Submission Requirements:
Please push the final version to GitHub by 10:00 PM CST this Monday.
Each group will have 20 minutes to present this Tuesday. I will send an email with the schedule later.

**Good luck and happy coding!**
