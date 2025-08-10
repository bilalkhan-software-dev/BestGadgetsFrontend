# Best Gadgets - Product Showcase App

## Overview

This is a React-based web application that showcases a collection of products with social media integration and search functionality. The app serves as a platform for "Best G@dgets" to display their product offerings while earning commissions as an Amazon Associate.

## Features

- **Product Display**: Shows products in a responsive grid layout
- **Search Functionality**: Allows users to search products with debounce for performance
- **Social Media Integration**: Links to YouTube, Instagram, and Facebook profiles
- **Responsive Design**: Works on both mobile and desktop devices
- **Ad Placeholders**: Includes spaces for advertisements (mobile and desktop)
- **Loading States**: Shows loading indicators during data fetch
- **Error Handling**: Displays error messages when API calls fail

## Technical Details

### Dependencies

- React
- React Icons (for social media icons)
- Tailwind CSS (for styling)

### API Integration

The app communicates with a backend API to:
- Fetch all products (`/product/all`)
- Search products (`/product/search?query=...`)

### Key Components

1. **Header Section**: Contains the profile image and social links
2. **Search Bar**: With debounced search functionality
3. **Product Grid**: Responsive layout showing product images and names
4. **Footer**: With copyright information

### Performance Optimizations

- Debounced search to prevent excessive API calls
- Lazy loading of product images
- Conditional rendering of components based on state

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables (including `APP_BASE_URL`)
4. Run the development server: `npm start`

## Environment Variables

The app requires the following environment variable:

- `APP_BASE_URL`: The base URL for your backend API

## Project Structure

- `App.js`: Main application component
- `assets/`: Contains static assets like images
    - `constant.js`: Stores configuration constants
- Components are organized by feature/functionality

## Known Issues

- The commented-out ad sections need to be properly implemented
- Error handling could be more comprehensive
- No pagination implemented for large product sets

## Future Improvements

- Implement product categories/filtering
- Add user authentication for favorites/saved items
- Improve mobile ad integration
- Add analytics tracking
- Implement infinite scroll or pagination

## License

This project is proprietary software. All rights reserved © 2025 Best G@dgets.