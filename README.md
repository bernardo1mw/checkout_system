## 📋 Overview

The project implements a complete checkout system following **Clean Architecture** and **Domain-Driven Design (DDD)** principles, with clear separation of responsibilities and high testability.

### 🎯 Main Features

- **Authentication System** - User login, registration and verification
- **Product Catalog** - Product management and queries
- **Complete Checkout** - Order processing with validations
- **Freight Calculation** - Intelligent system based on dimensions and weight
- **Stock Management** - Product input and output control
- **Coupon System** - Discount application with expiration validation
- **Vue.js Frontend** - Modern and responsive interface
- **Queue System** - Asynchronous processing with RabbitMQ

## 🏛️ Architecture

The project follows **Clean Architecture** principles with the following layers:

```
┌─────────────────────────────────────┐
│           Frontend (Vue.js)          │
├─────────────────────────────────────┤
│         Backend Services            │
│  ┌─────────┬─────────┬─────────┐    │
│  │  Auth   │Catalog │Checkout │    │
│  │         │        │         │    │
│  └─────────┴─────────┴─────────┘    │
│  ┌─────────┬─────────┬─────────┐    │
│  │Freight  │ Stock  │Currency │    │
│  │         │        │         │    │
│  └─────────┴─────────┴─────────┘    │
├─────────────────────────────────────┤
│         Infrastructure              │
│  ┌─────────┬─────────┬─────────┐    │
│  │Database │   HTTP  │  Queue  │    │
│  │(Postgres│(Express)│(RabbitMQ│    │
│  │         │         │         │    │
│  └─────────┴─────────┴─────────┘    │
└─────────────────────────────────────┘
```

### 📁 Project Structure

```
Curso_Branas/
├── backend/                    # Backend services
│   ├── auth/                   # Authentication and authorization
│   ├── catalog/               # Product catalog
│   ├── checkout/              # Order processing
│   ├── freight/               # Freight calculation
│   ├── stock/                 # Stock management
│   └── currency/              # Currency conversion
├── frontend/                   # Vue.js interface
├── queue/                     # Queue system
└── README.md
```

## 🚀 Technologies Used

### Backend
- **Node.js** + **TypeScript**
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Jest** - Unit and integration tests
- **RabbitMQ** - Message system
- **Axios** - HTTP client

### Frontend
- **Vue.js 3** - Frontend framework
- **TypeScript** - Static typing
- **Vite** - Build tool
- **Vitest** - Unit tests

### Infrastructure
- **Docker** (implicit for RabbitMQ)
- **PostgreSQL** - Data persistence
- **RabbitMQ** - Asynchronous processing

## 🛠️ Installation and Setup

### Prerequisites
- Node.js 18+
- PostgreSQL
- RabbitMQ
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd Curso_Branas
```

### 2. Install backend dependencies
```bash
cd backend/auth && npm install
cd ../catalog && npm install
cd ../checkout && npm install
cd ../freight && npm install
cd ../stock && npm install
cd ../currency && npm install
```

### 3. Install frontend dependencies
```bash
cd frontend && npm install
```

### 4. Install queue system dependencies
```bash
cd queue && npm install
```

### 5. Setup the database
Execute the SQL scripts in each service:
```bash
# For each service (auth, catalog, checkout, freight, stock)
psql -U postgres -d database_name -f create.sql
```

### 6. Configure environment variables
Create `.env` files in each service as needed.

## 🧪 Running Tests

### Backend
```bash
# In each service
npm test                    # Unit tests
npm run test:integration    # Integration tests
```

### Frontend
```bash
cd frontend
npm test
```

## 🏃‍♂️ Running the Application

### Backend Services
```bash
# Auth Service
cd backend/auth && npm run dev

# Catalog Service  
cd backend/catalog && npm run dev

# Checkout Service
cd backend/checkout && npm run dev

# Freight Service
cd backend/freight && npm run dev

# Stock Service
cd backend/stock && npm run dev

# Currency Service
cd backend/currency && npm run dev
```

### Frontend
```bash
cd frontend && npm run dev
```

### Queue System
```bash
cd queue
# Producer
npm run producer

# Consumer  
npm run consumer
```

## 📊 Detailed Features

### 🛒 Checkout System
- CPF validation
- Automatic total calculation
- Coupon discount application
- Freight calculation based on dimensions
- Automatic stock management

### 🚚 Freight Calculation
Implemented formula:
```
Freight Value = distance (km) × volume (m³) × (density/100)
```

**Examples:**
- Camera: 20×15×10 cm = $10.00 (minimum value)
- Guitar: 100×30×10 cm = $30.00
- Refrigerator: 200×100×50 cm = $400.00

### 🔐 Authentication System
- User registration
- JWT login
- Token validation
- Authentication middleware

### 📦 Stock Management
- Input and output control
- Automatic availability calculation
- Asynchronous processing via queues
- Domain events

## 🧩 Architectural Patterns

### Clean Architecture
- **Domain**: Entities, Value Objects, Business rules
- **Application**: Use Cases, Repository interfaces
- **Infrastructure**: Concrete implementations, adapters
- **Interface**: HTTP Controllers, CLI

### Domain-Driven Design
- **Entities**: Order, Product, User, Coupon
- **Value Objects**: CPF, Email, Password, Username
- **Aggregates**: Order as main aggregate
- **Events**: OrderPlaced for communication between bounded contexts

### SOLID Principles
- **S**ingle Responsibility: Each class has one responsibility
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Implementation substitution
- **I**nterface Segregation: Specific interfaces
- **D**ependency Inversion: Dependency on abstractions

## 🧪 Testing Strategy

### Test Pyramid
- **Unit Tests**: Entities, Value Objects, Use Cases
- **Integration Tests**: APIs, Repositories, Gateways
- **E2E Tests**: Complete flows (implicit)

### Coverage
- CPF validation
- Freight calculation
- Coupon application
- Order processing
- Authentication and authorization

## 📚 Demonstrated Concepts

### Clean Code
- Descriptive names
- Small and focused functions
- Comments only when necessary
- Consistent formatting

### Design Patterns
- **Repository Pattern**: Persistence abstraction
- **Gateway Pattern**: External service integration
- **Adapter Pattern**: Interface adaptation
- **Decorator Pattern**: Authentication middleware
- **Factory Pattern**: Complex object creation

### Test-Driven Development (TDD)
- Red-Green-Refactor cycle
- Tests as specification
- Test-oriented code

## 🔗 Service Integration

The system uses HTTP communication between services and queues for asynchronous processing:

```
Frontend → Checkout Service → [Auth, Catalog, Freight, Stock, Currency]
                ↓
            RabbitMQ Queue → Stock Service (automatic decrement)
```

## 📖 Additional Resources

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design - Eric Evans](https://domainlanguage.com/ddd/)
- [Branas.io Course](https://app.branas.io/clean-code-e-clean-architecture)

## 🤝 Contributing

This is an educational project from the Branas.io course. For questions about implementation or concepts, please refer to the course material.

## 📄 License

MIT License - See the LICENSE file for details.

---

**Developed as part of the Clean Code and Clean Architecture course from Branas.io**
