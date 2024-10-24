# Submito Project

## Overview

Submito is a web application designed to manage form submissions efficiently. It provides users with the ability to generate unique endpoints for form submissions, view recent submissions, and test demo forms. The project utilizes Vue.js for the frontend, Pinia for state management, and TypeScript for type safety.

## Project Structure

```
submito-app/
├── src/
│   ├── stores/
│   │   ├── auth.ts
│   │   └── submissions.ts
│   ├── views/
│   │   ├── Dashboard.vue
│   │   └── Login.vue
│   ├── components/
│   │   └── SubmissionTable.vue
│   ├── App.vue
│   └── main.ts
├── public/
└── package.json
```

## Features

1. **Endpoint Generation**: Users can generate unique endpoints for form submissions.
2. **Submission Management**: View recent form submissions in a table format.
3. **Demo Form Testing**: Test form submissions using a demo form interface.
4. **Authentication**: User authentication system for secure access.
5. **TypeScript Support**: Enhanced type checking for improved code quality.
6. **Responsive Design**: Mobile-friendly UI using Tailwind CSS.

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/kostastepetes/submito.git
   cd submito-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run serve
   ```

4. Build for production:
   ```
   npm run build
   ```

## Development Environment

- Node.js version: 16.x or later
- npm version: 8.x or later
- Vue CLI version: 5.x or later

## Technologies Used

- Frontend: Vue.js 3, TypeScript
- State Management: Pinia
- Styling: Tailwind CSS
- HTTP Client: Axios
- Authentication: JWT-based authentication

## API Documentation

The project interacts with a backend API located at `http://localhost:3000/api`. The following endpoints are used:

1. `/endpoints`: Generate new endpoint
   - Method: POST
   - Headers: Authorization Bearer token required

2. `/submissions`: Fetch recent submissions
   - Method: GET
   - Headers: Authorization Bearer token required

3. `/submit/{endpoint}`: Submit form data
   - Method: POST
   - Body: FormData

## Contributing

Contributions are welcome! Please submit pull requests with clear descriptions of changes made.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Vue.js team for creating an excellent frontend framework
- Pinia team for providing a lightweight state management solution
- Tailwind CSS team for their utility-first CSS framework

## Known Issues

- [List any known issues here]

## Future Development

- Implement real-time submission updates
- Add filtering and sorting capabilities to the submissions table
- Enhance security features, including CSRF protection
- Implement dark mode toggle

By following this README, you should be able to set up and run the Submito project locally. Remember to configure your backend API accordingly to match the frontend expectations.
