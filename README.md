![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-Backend-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-orange)
![License](https://img.shields.io/badge/License-MIT-green)








# AI Powered CRM CSV Import Assistant

An AI-powered CSV Import Assistant that intelligently maps CSV files from different sources into a standardized CRM format using Google Gemini AI.

> Instead of relying on fixed column names, the system understands the **meaning** of each column and automatically maps it to GrowEasy CRM fields.

---

## Problem Statement

Businesses often import leads into their CRM from multiple sources such as:

- Facebook Ads
- Google Ads
- LinkedIn
- Excel Sheets
- Other CRMs
- Marketing Tools

The problem is that every platform exports CSV files with different column names.

For example,

### CSV 1

| Full Name | Phone Number | Email Address |
|-----------|--------------|---------------|

### CSV 2

| Customer | Mobile | Mail ID |
|----------|---------|----------|

### CSV 3

| Lead Name | Contact | Primary Email |
|-----------|----------|---------------|

Although these columns represent the same information, their names are different.

Traditional CSV importers rely on exact column names, forcing users to manually rename and rearrange data before importing.

This process is:

-  Time consuming
-  Error-prone
-  Difficult for non-technical users

---

#  Solution

This project uses **Google Gemini AI** to understand the semantic meaning of uploaded CSV headers.

Instead of matching exact column names, AI understands that:

| CSV Header | CRM Field |
|------------|-----------|
| Full Name | name |
| Customer | name |
| Lead Name | name |
| Phone | mobile_without_country_code |
| Contact Number | mobile_without_country_code |
| Mobile | mobile_without_country_code |
| Remarks | crm_note |
| Comments | crm_note |
| Notes | crm_note |

The backend then converts every uploaded record into a standardized CRM format.

---

#  Features

-  Upload CSV files
-  Preview uploaded CSV
-  AI-powered intelligent column mapping
-  Automatic header analysis
-  Import summary generation
-  Row transformation without repeated AI calls
-  CSV validation
-  AI response validation
-  Scalable architecture
-  Clean REST APIs

---

#  System Architecture (Backend)

```text
                 Upload CSV
                      │
                      ▼
             Multer Middleware
                      │
                      ▼
              CSV Parser Service
                      │
                      ▼
          CSV Validation Service
                      │
                      ▼
         Header Analysis Service
                      │
                      ▼
         Prompt Builder Service
                      │
                      ▼
            Gemini AI Service
                      │
                      ▼
      AI Response Validator
                      │
                      ▼
         Row Mapping Service
                      │
                      ▼
      Import Summary Service
                      │
                      ▼
              JSON Response
```

---

#  Workflow

1. User uploads any valid CSV file.
2. Backend parses the CSV.
3. CSV is validated.
4. Header names and sample values are analyzed.
5. AI identifies the meaning of each column.
6. AI maps uploaded headers to GrowEasy CRM fields.
7. Backend validates AI response.
8. Backend transforms every row into CRM format.
9. Import summary is generated.
10. Frontend displays mapped records and statistics.

---

<img width="1292" height="860" alt="Screenshot 2026-07-10 171928" src="https://github.com/user-attachments/assets/d885cebe-e18d-4c40-a8dc-6309ba5d6d44" />

---

#  Edge Cases Handled

###  No File Uploaded

Returns

```json
{
    "success": false,
    "message": "CSV file is required."
}
```

###  Empty CSV

```json
{
    "success": false,
    "message": "CSV is empty."
}
```

###  Missing Cell Values

Missing values are converted to " " empty string  without crashing the import.

---

#  Technologies Used

## Frontend

- Next.js
- TypeScript
- Tailwind CSS

## Backend

- Node.js
- Express.js
- TypeScript
- Multer
- PapaParse
- Google Gemini API
- dotenv

---

#  Design Decisions

### Why AI is used only once?

Instead of calling AI for every row,

```
10000 rows

↓

10000 AI Calls 
```

The system performs

```
Header Mapping (AI)

↓

Local Row Mapping (TypeScript)
```

Benefits

- Faster
- Cheaper
- More Scalable
- Production Friendly

---

#  Live Demo

https://crmfrontend-vert.vercel.app/


---

#  API Documentation

Postman

https://documenter.getpostman.com/view/46688304/2sBY4LR2By

---


#  Getting Started

## Prerequisites

Make sure you have installed:

- Node.js (v18 or above)
- npm
- Git
- Google Gemini API Key

---

# 1. Clone the Repository

```bash
git clone https://github.com/shristi76/AI-Powered-CRM.git
```

Move into the project folder:

```bash
cd AI-Powered-CRM
```

---

# 2. Project Structure

```text
AI-Powered-CRM/
│
├── client/      # Next.js Frontend
└── server/      # Express Backend
```

---

# 3. Setup Backend

Move to backend

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Start development server

```bash
npm run dev
```

Backend will run at

```
http://localhost:5000
```

---

# 4. Setup Frontend

Open a new terminal

Move to frontend

```bash
cd client
```

Install dependencies

```bash
npm install
```

Create a `.env.local` file

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start frontend

```bash
npm run dev
```

Frontend will run at

```
http://localhost:3000
```

---




#  Author

**Shristi**.

Focused on building a scalable, AI-assisted CSV import system following clean architecture and production-ready backend practices.
