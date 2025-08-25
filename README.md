# Resumax AI
A modern web application built with **Next.js** that analyzes resumes using Google's Gemini AI to provide ATS scores and improvement suggestions.  
The application features a complete authentication system, responsive design, and a seamless user experience.

### [Project Live Link](https://resumax.vercel.app/)

## Features
- **Resume Analysis** - Upload PDF resumes and get detailed ATS scoring and feedback
- **AI-Powered Insights** - Utilizes Google Gemini AI for intelligent resume analysis
- **Authentication**: Secure login with credentials and Google OAuth via Auth.js
- **PDF Processing** - Extracts text from PDFs and converts them to images
- **Responsive Design** - Beautiful UI built with Tailwind CSS that works on all devices
- **Performance** - Redis caching for fast response time

## Tech Stack
- **Framework** - Next.js with TypeScript
- **Styling** - Tailwind CSS
- **Authentication** - Auth.js with Prisma adapter
- **Database** - PostgreSQL with Prisma
- **AI Integration** - Google Gemini AI API
- **PDF Processing** - pdf-parse and pdfjs-dist
- **Caching** - Redis via ioredis


## Getting Started
### Prerequisites
- Node.js 18+ installed on your machine
- PostgreSQL (or your preferred database)
- Google OAuth credentials
- Google Gemini API enabled
- Redis server

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/iankitkd/resumax.git
   ```
   ```sh
   cd resumax
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```env
    AUTH_SECRET=your_auth_secret  
    AUTH_GOOGLE_ID=your_google_oauth_id  
    AUTH_GOOGLE_SECRET=your_google_oauth_secret
    DATABASE_URL=your_postgresql_db_url  
    GEMINI_API_KEY=your_gemini_api_key  
    REDIS_URL=your_redis_url  
   ```
4. Set up the database:
   ```sh
   npx prisma generate
   npx prisma db push
   ```
5. Run the development server:
   ```sh
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.