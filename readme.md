# Node Payment

Nodepayment is a simple mockup webshop. The products in this mockup shop shall be red wines. 

The stack used in this are **Node.js**, **Express.js** and **MongoDB**. Also, for payment, (for now), **PayPal** and **Stripe** are integrated into Nodepayment as a payment options for the users. To locally install Nodepayment successfully, the loader have an account in these services and respected parameters (e.g. app, API keys, etc.).

## 1. Cloning and installation

Use the following command to clone the repository:

```git clone https://github.com/JoonasHeinonen/nodepayment```

To install packages required in your local repository, use the following command:

```npm install```

## 2. Environment variables

Create an _.env_ file into your local repository. Then, in accordance with the following table, add the following envorinment variables with their respective values. For the session secret, the value can be randomly generated, others need their values from the respective providers.

| Environment variable   | Value |
| ---------------------- |:-----------------------------:|
| SESSION_SECRET         | _Any random value_            |
| STRIPE_PUBLIC_KEY      | _Your stripe public key_      |
| STRIPE_SECRET_KEY      | _Your stripe public key_      |
| PAYPAL_SANDBOX_ACCOUNT | _Your paypal sandbox account_ |
| PAYPAL_CLIENT_ID       | _Your paypal client ID_       |
| PAYPAL_CLIENT_SECRET   | _Your paypal client secret_   |

## 3. Running the application

Before coming to this part, ensure that you have both **MongoDB** and **Node.js** installed to your system. Preferrably, use **nodemon** to run the application.

To run the application, you can use the nodemon to run the application dynamically:

```nodemon server.js```

Or just use node.js to run the application:

```node server.js```

Congratulations, you have successfully installed and runned the application! 