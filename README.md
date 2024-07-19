# Payment Gateway Service

A scalable and secure payment gateway service to handle different types of transactions (e.g., credit card, debit card, digital wallets). This service supports basic CRUD operations related to payments and includes endpoints for creating, processing, retrieving the status of payments, and handling refunds. The project also integrates Swagger for API documentation, containerization with Docker, and a CI/CD pipeline for deployment.


## Features

- Create, process, and retrieve the status of payments.
- Handle refunds.
- Rate limiting to prevent abuse.
- Logging and monitoring with `winston` and `express-prometheus-middleware`.
- Swagger API documentation.
- Dockerized application.
- CI/CD pipeline for deployment.

## Architecture

### Database Schema

- **User**
  - `id`: String (Primary Key)
  - `name`: String
  - `email`: String
  - `password`: String (Hashed)

- **Payment**
  - `id`: String (Primary Key)
  - `user_id`: String (Foreign Key)
  - `amount`: Number
  - `status`: String (e.g., pending, completed, refunded)
  - `payment_method`: String (e.g., credit_card, debit_card, digital_wallet)
  - `details`: JSON

### API Design

| Endpoint                   | Method | Description                      |
|----------------------------|--------|----------------------------------|
| `/api/auth/register`       | POST   | Register a new user              |
| `/api/auth/login`          | POST   | Authenticate a user              |
| `/api/auth/profile`        | GET    | Get authenticated user's profile |
| `/api/payments`            | POST   | Create a new payment             |
| `/api/payments/process`    | POST   | Process a payment                |
| `/api/payments/:id/status` | GET    | Get payment status               |
| `/api/payments/:id/refund` | POST   | Handle a refund for a payment    |
| `/api/transactions`        | GET    | Get a list of user transactions  |

### Data Flow and Interaction

1. **User Registration/Login**: Users register and log in to get a JWT token for authenticated requests.
2. **Create Payment**: Users create a payment, which is stored in the database with a pending status.
3. **Process Payment**: Users can process a payment, changing its status to completed or failed.
4. **Retrieve Payment Status**: Users can check the status of a specific payment.
5. **Handle Refund**: Users can request a refund for a payment, changing its status to refunded.

### Security Measures

- Data encryption (e.g., passwords are hashed).
- Authentication and authorization using JWT.
- Rate limiting to prevent abuse.
- HTTPS for secure communication.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20.10.0)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [Stripe API Key](https://stripe.com/)

### Setup


1. **Clone the repository**
   ```bash
   git clone https://github.com/maaz64/payment-gateway-service.git
2. **Navigate to root folder**
   ```bash
   cd payment-gateway-service
3. **create a .env file in root directory define below environment variable**
   ```bash
   - MONGO_URL = mongodb+srv://<>username:<password>@cluster.y6zzpx3.mongodb.net/?retryWrites=true&w=majority
4. **Install package dependencies**
   ```bash
   npm install
5. **Run the development server**
   ```bash
   npm start

### API Documentation
API documentation is available at /docs endpoint. You can access it in your browser at:
`http://localhost:3000/docs`

### Rate Limiting
Rate limiting is applied globally to all requests to prevent abuse. Each IP is limited to 100 requests per 15 minutes.

### Logging and Monitoring

- Logging: Application logs are managed using winston.
- HTTP Request Logging: Managed using morgan and integrated with winston.
- Monitoring: Prometheus metrics are exposed at /metrics.

### CI/CD Pipeline
A CI/CD pipeline can be set up using tools like GitHub Actions, GitLab CI, or Jenkins. Ensure to include steps for:

- Installing dependencies
- Running tests
- Building Docker image
- Pushing Docker image to a registry
- Deploying to a cloud provider (AWS)

