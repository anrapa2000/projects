# FishingBuddy

A comprehensive mobile application built with React Native and Expo for fishing enthusiasts. The app helps users track their fishing spots, catches, and provides various tools to enhance their fishing experience.

## Features

- Location-based fishing spot tracking
- Catch logging and statistics
- Weather integration
- Interactive maps
- Photo capture and storage
- User authentication
- Offline capabilities
- Real-time updates

## Tech Stack

- **Frontend Framework**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: React Context API
- **Database**: Supabase
- **Authentication**: Firebase
- **Maps**: React Native Maps
- **Testing**: Jest with React Native Testing Library
- **TypeScript**: For type safety and better development experience

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd FishingBuddy
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on specific platforms:
```bash
# For iOS
npm run ios
# or
yarn ios

# For Android
npm run android
# or
yarn android

# For web
npm run web
# or
yarn web
```

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/      # Reusable UI components
├── constants/       # App-wide constants
├── contexts/        # React Context providers
├── data/           # Data models and types
├── navigation/     # Navigation configuration
├── screens/        # Screen components
├── services/       # API and external service integrations
├── theme/          # Styling and theming
├── types/          # TypeScript type definitions
└── utils/          # Utility functions and helpers
```

## Testing

The project uses Jest and React Native Testing Library for testing. To run tests:

```bash
npm test
# or
yarn test

# For test coverage
npm run test:coverage
# or
yarn test:coverage
```