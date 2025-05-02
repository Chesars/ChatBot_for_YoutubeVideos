# App AI for YouTube Videos

<p align="center">
<!--   <img src="front/video-insight/public/globe.svg" alt="App Logo" width="150" /> -->
</p>

<p align="center">
  <b>A chatbot application to interact with YouTube video transcriptions.</b>
</p>

<p align="center">
<!--   <img src="https://img.shields.io/badge/License-MIT-green" alt="License Badge" /> -->
<!--   <img src="https://img.shields.io/badge/Frontend-Next.js-blue" alt="Frontend Badge" / -->
<!--   <img src="https://img.shields.io/badge/Backend-Python-yellow" alt="Backend Badge" /> -->
</p>

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Setup](#setup)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## Overview
This project is a chatbot application that allows users to paste YouTube links and interact with the video transcription. It combines a Python-based API for transcript retrieval and a Next.js-based frontend for user interaction.

---

## Features
- Paste YouTube links to extract video transcripts.
- Ask AI-powered questions about video content.
- Translate subtitles into different languages.
- Export transcripts in various formats (e.g., JSON, SRT).
- Responsive design for seamless user experience.

---

## Screenshots

### Chatbot Interface
<p align="center">
  <img src="front/video-insight/public/window.svg" alt="Chatbot Interface" width="600" />
</p>

### Transcript Export
<p align="center">
  <img src="front/video-insight/public/file.svg" alt="Transcript Export" width="600" />
</p>

---

## Project Structure

### 1. API (Backend)
A Python-based API for retrieving YouTube video transcripts and managing related functionalities.

### 2. Frontend (Video Insight)
A Next.js-based frontend application for interacting with the API and providing a user-friendly interface.

---

## Setup

### Backend
1. Navigate to the `Api/` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the API:
   ```bash
   python main.py
   ```
4. Create a `.env` file in the `Api/` directory with the following content:
   ```env
   API_KEY=your_api_key_here
   ```

### Frontend
1. Navigate to the `front/video-insight/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How It Works
1. Paste a YouTube link into the chatbot interface.
2. The backend API retrieves the video transcript.
3. Interact with the chatbot to ask questions or analyze the video content.

---

## Contributing
To contribute to the project, follow these steps:
1. Clone the repository.
2. Set up the backend and frontend as described above.
3. Make your changes and ensure all tests pass.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Support
For questions or support, please refer to the project documentation or community channels.