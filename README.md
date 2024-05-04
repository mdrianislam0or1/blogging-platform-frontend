# Simple Blogging Platform

This is a simple blogging platform built using PHP with the Laravel framework. It allows users to perform CRUD (Create, Read, Update, Delete) operations on blog posts and comments. Users can register, log in, and log out.

## Features

### Authentication

- Users can register, login, and logout.
- Only logged-in users can create, update, and delete blog posts and comments.

### Blog Posts

- Users can create, update, delete, and view blog posts.
- Each blog post has a title, content, and an author.
- Posts are listed with the most recent ones first.

### Comments

- Users can add comments to blog posts.
- Comments have a text, author, and date.
- Users can edit and delete their own comments.

### Validation

- Proper validation is applied to all input fields (e.g., required fields, max length).
- Validation errors are handled, and appropriate messages are displayed to users.

### Design and UI

- The UI is clean and responsive.
- Appropriate CSS is used for styling.
- Frontend frameworks like Bootstrap can be used if necessary.

### Database

- MySQL or SQLite database is used to store users, blog posts, and comments.
- Appropriate relationships between models are defined.
- Migrations and seeders are used for setting up the database.

## Setup

1. Clone the repository.
2. Install Composer dependencies: `composer install`
3. Install NPM dependencies: `npm install`
4. Create a copy of the `.env.example` file and rename it to `.env`.
5. Generate an application key: `php artisan key:generate`
6. Configure the database connection in the `.env` file.
7. Run migrations to create the database schema: `php artisan migrate`
8. (Optional) Run seeders to populate the database with dummy data: `php artisan db:seed`
9. Start the development server: `php artisan serve`
10. Access the application in your web browser: `http://localhost:8000`

## Usage

- Register a new user account or log in with existing credentials.
- Create, update, delete, and view blog posts.
- Add, edit, and delete comments on blog posts.
- Log out when finished.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
