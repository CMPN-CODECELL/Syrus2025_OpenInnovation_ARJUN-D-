# MentorNet: AI-Powered Career Mentorship with Blockchain Verification

MentorNet is an innovative platform that combines AI mentorship with blockchain verification to help students and professionals advance their careers. This project uses Next.js, TypeScript, and Tailwind CSS to create a modern, responsive user interface.

## Features

### Frontend Implementation (Completed)
- **Landing Page**: Informative landing page with a clear value proposition
- **Authentication Pages**: Sign up and login functionality
- **Dashboard**: Overview of learning progress, upcoming sessions, and personalized recommendations
- **AI Mentor Chat**: Interactive conversations with specialized AI mentors
- **Skills & NFTs**: Display of earned skills and certificates as NFTs
- **Projects**: Project management and showcase
- **Community**: Connect with peers and mentors
- **Wallet Integration**: Connect blockchain wallets to manage NFT credentials
- **Profile Settings**: Comprehensive profile management

### Backend Features (To Be Implemented)
- **API Implementation**: RESTful API for all platform functionality
- **Database Integration**: User profiles, learning history, and mentorship sessions
- **Blockchain Integration**: Minting and managing skill NFTs
- **AI Integration**: Connection to LLM for mentoring conversations
- **Authentication System**: Secure user authentication
- **Wallet Connection**: Blockchain wallet connectivity

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, shadcn/ui components
- **Design**: Custom theme colors for mentors and students
- **Planned Backend**: Node.js, Express, MongoDB, Ethereum/Polygon
- **AI Integration**: Deepseek and Gemini 2.0 Flash for mentoring conversations
- **Authentication**: NextAuth.js

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mentornet.git
cd mentornet
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
mentornet/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes
│   │   ├── dashboard/  # Dashboard pages
│   │   ├── auth/       # Authentication pages
│   ├── components/     # Reusable UI components
│   │   ├── ui/         # Base UI components
│   ├── lib/            # Utility functions
│   ├── styles/         # Global styles
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
```

## Future Development

- **Smart Contracts**: Develop and deploy smart contracts for skill verification
- **Mobile App**: React Native implementation for iOS and Android
- **AI Learning Path**: Personalized learning paths based on career goals
- **Community Features**: Forums, direct messaging, and group discussions
- **Career Marketplace**: Job opportunities matched to verified skills

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
