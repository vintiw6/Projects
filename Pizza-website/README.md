# Dough & Co. - E-commerce Website 🍕

A modern e-commerce website built using **Next.js** where users can browse a menu, add items to their cart, and place orders. The application features user authentication, cart management, and an admin dashboard for managing orders, users, and menu items.

## 🚀 **Tech Stack**
- **Frontend**: 
  - **Next.js 13** – React framework for building the app.
  - **React** – For building reusable components and managing UI state.
  - **Tailwind CSS** – Utility-first CSS framework for styling.
  
- **Backend**:
  - **NextAuth.js** – Authentication for user login via email/password.
  - **Prisma** – ORM for managing the database (PostgreSQL).
  - **bcrypt** – Password hashing for secure authentication.
  - **PostgreSQL** – Database for storing user and order data.
  - **Amazon Web Services (AWS) S3** - Image storage to handle file uploads securely to the cloud.

- **Deployment**: 
  - **Vercel** – For hosting the Next.js application.

## 🔑 **Features**
- **User Authentication**: Register, log in, and securely manage user sessions.
- **Menu & Cart**: Browse menu items and add them to the cart for checkout.
- **Admin Dashboard**: Manage users, view orders, and edit menu items.

## 📦 **Installation & Setup**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dough-and-co.git
   cd dough-and-co
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:<br>
   Create a `.env `file in the root of the project and add
   ```bash
     DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
     SECRET=your_secret
     MY_AWS_ACCESS_KEY=your_aws_access_key
     MY_AWS_SECRET_KEY=your_aws_secret_key
   ```
4. Run the app in development mode:
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:3000

## 🌍 **Deployment**

The application is deployed on Vercel and can be accessed via the following URL: https://doughandco-pizza-seko.vercel.app/
  
To deploy your own version, follow these steps:
1. Fork or clone the repository.
2. Push the project to your own Github repository.
3. Connect the repository to Vercel and set up environment variables.

