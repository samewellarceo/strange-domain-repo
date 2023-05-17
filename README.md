## About

This project is a web-based application that provides functionality for registration requests and new IP requests. It includes a user-friendly interface for submitting requests and an API that allows the admin to read, update, and delete records in the database.

## System Specs

- PHP 8.2.0
- Laravel 10.8
- PostgreSQL 15.2
- Laravel Breeze 1.21
- Inertia.js/Laravel 0.6.3
- Inertia.js/React 1.0.0
- React 18.2.0
- Tailwindcss 3.2.1
- Secret Key and IP-based admin access control

## Deployment

To deploy the project, follow these steps:

1. Clone the repository: `git clone https://github.com/samewellarceo/strange-domain-repo.git`
2. Install dependencies: `composer install`
3. Set up the environment variables: Copy the `.env.example` file to `.env` and update the necessary configuration values.
4. Run database migrations: `php artisan migrate`
5. Start the development server: `php artisan serve` and `npm run dev`

## Testing

To run the tests, you can use this command:

- php artisan test --testsuite=Feature
