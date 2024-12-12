# E-Commerce React Native App

## Overview
This is an e-commerce React Native app built with TypeScript that uses the FakeStoreAPI. The app includes a bottom tab navigator, a drawer navigator, and utilizes context providers and async storage for state management and persistence.

## Features
- **Bottom Tab Navigator**:
  - **Home Screen**: Displays a list of items fetched from FakeStoreAPI. Each item has an "Add To Cart" button.
  - **Search Screen**: Allows users to search for items.
  - **Profile Screen**: Contains user settings, a dark mode toggle, and a sign-out button.
  - **Cart Screen**: Displays items added to the cart.
- **Drawer Navigator**:
  - **Profile Screen**: Same as the profile screen in the bottom tab navigator.
  - **Home Screen**: Same as the home screen in the bottom tab navigator.
  - **Settings Screen**: Contains additional app settings.
- **Context Providers**: Manages global state, including user authentication and theme settings.
- **Async Storage**: Persists user data and authentication tokens across app sessions.

## Screens

### Home Screen
- **Functionality**: Renders a list of items from FakeStoreAPI.
- **Components**: 
  - Item List: Displays items with an "Add To Cart" button for each item.
  - Add To Cart Button: Adds the selected item to the cart.

### Profile Screen
- **Functionality**: 
  - Displays user settings.
  - Provides a toggle for dark mode.
  - Includes a sign-out button.
- **Components**: 
  - Dark Mode Toggle: Switches between light and dark themes.
  - Sign Out Button: Logs the user out and clears user data from async storage.

### Search Screen
- **Functionality**: Allows users to search for items in the store.
- **Components**: 
  - Search Bar: Input field for entering search queries.
  - Search Results: Displays items matching the search query.

### Cart Screen
- **Functionality**: Displays items added to the cart.
- **Components**: 
  - Cart Item List: Shows items with their details and quantities.
  - Checkout Button: Proceeds to the checkout process.

## Authentication
- **Login**: 
  - Makes a call to FakeStoreAPI to authenticate the user.
  - Saves the user data and token in async storage.
- **Sign Out**: 
  - Clears user data and token from async storage.

## API Integration
- **FakeStoreAPI**: Used to fetch items and authenticate users.

## File Structure
- **App.tsx**: Entry point of the application.
- **navigation/**: Contains navigation-related files.
  - `BottomTabNavigator.tsx`: Defines the bottom tab navigator.
  - `AuthNavigator.tsx`: Defines the drawer navigator.
- **screens/**: Contains screen components.
  - `HomeScreen.tsx`: Home screen component.
  - `ProfileScreen.tsx`: Profile screen component.
  - `SearchScreen.tsx`: Search screen component.
  - `CartScreen.tsx`: Cart screen component.
- **context/**: Contains context providers.
  - `AuthContext.tsx`: Authentication context.
  - `ThemeContext.tsx`: Theme context.
- **storage/**: Contains async storage utility functions.
  - `AsyncStorage.ts`: Utility functions for async storage operations.

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- React Native CLI

### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Install dependencies:
   ```sh
   cd <repository-directory>
   npm install
   # or
   yarn install
   ```

### Running the App
1. Start the Metro bundler:
   ```sh
   npm start
   # or
   yarn start
   ```
2. Run the app on an emulator or physical device:
   ```sh
   npm run android
   # or
   npm run ios
   # or
   yarn android
   # or
   yarn ios
   ```

## Testing
To run the tests, use the following command:
```sh
npm test
# or
yarn test
```

## License
This project is licensed under the MIT License.
