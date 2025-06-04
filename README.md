# Xeno Mini CRM – SDE Internship Assignment 2025

This is a scalable and intelligent mini-CRM application built as part of the Xeno SDE Internship Assignment – 2025.

---

## 📌 Problem Statement

Build a scalable mini CRM that enables:
- Customer & order data ingestion
- Campaign creation using flexible audience rules
- Delivery logging
- Google OAuth 2.0 authentication
- AI-powered rule generation from natural language

---

## 💡 Solution Overview

This CRM is designed with:
- A pub-sub architecture for ingestion using **Redis Streams**
- A robust backend in **Express.js** and **MongoDB**
- An interactive frontend in **React.js + Tailwind CSS**
- AI features using **OpenAI GPT-4 API**
- Secure login with **Google OAuth 2.0**

---

## 🔁 Architecture

### Data Ingestion
- `/api/data/customers` and `/api/data/orders` accept data via POST
- Data is pushed to Redis Streams (`customers_stream`, `orders_stream`)
- A Redis consumer service listens and stores it in MongoDB asynchronously

### Campaign Creation
- Frontend lets users define rules with AND/OR logic
- `/api/campaigns` saves the campaign, logs delivery messages

### Delivery Logging
- Dummy vendor API simulates 90% sent, 10% failed delivery
- `/api/delivery/receipt` logs delivery results in MongoDB

### AI Integration
- Users input natural language (e.g., "High spenders who visited twice")
- `/api/ai/segment-rules` calls OpenAI API and returns structured rules

### Auth Flow
- Login via Google OAuth
- JWT is issued and stored in secure cookies
- All APIs are protected using middleware (`authMiddleware`)

---

## 🔐 Authentication

- OAuth 2.0 using Google
- JWT-based session protection
- `/api/auth/me` returns authenticated user
- `/api/auth/logout` clears session

---

## 🧠 AI Integration

Powered by OpenAI GPT-4:
- Converts marketing prompts into logical audience rules
- Used in campaign builder UI for rule generation

---

## 🛠️ Tech Stack

| Layer        | Stack                             |
|--------------|------------------------------------|
| Frontend     | React.js, Tailwind CSS, Axios      |
| Backend      | Express.js, MongoDB, Redis         |
| AI           | OpenAI GPT-4                       |
| Auth         | Google OAuth 2.0, Passport.js      |
| Messaging    | Redis Streams                      |


