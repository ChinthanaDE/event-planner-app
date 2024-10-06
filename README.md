# Event Planner App

Event Planner App is a React Native application that allows users to manage events effectively. It includes features like user authentication, displaying event information, a list of organizers, and detailed post views. The app integrates Firebase services such as authentication, cloud messaging for push notifications, and user profile management.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Environment Setup](#environment-setup)
  - [Firebase Setup](#firebase-setup)
  - [Installing Dependencies](#installing-dependencies)
  - [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication** (sign-up, login, logout) with **Firebase Authentication**.
- **Event Home Page**:
  - Top image slider with the first 10 images from the API.
  - List of event organizers fetched from the API.
  - Horizontal image list with descriptions.
  - Total number of posts, with navigation to the post list page.
- **User Profile Page**:
  - Edit user details.
  - View and edit profile information.
- **Drawer Navigation** with a logout button.
- **Firebase Cloud Messaging (FCM)** for scheduled push notifications.
- **Redux Toolkit** for state management.

## Prerequisites

Before setting up the project, ensure you have the following:

- **Node.js**: >= 12.x.x
- **npm** or **yarn**: Latest version
- **React Native CLI**: Install globally via `npm install -g react-native-cli`
- **Android Studio** or **Xcode**: Required for emulators/simulators.
- **Firebase Account**: To use Firebase services like authentication and messaging.

## Getting Started

Follow these instructions to set up the project on your local machine.

### 1. Clone the Repository

Clone the project from the repository URL:

```sh
git clone <repository-url>
cd EventPlannerApp

# Usage and Practices

This monorepository contains tools and helpers for React Native projects in form of a Command Line Tool (or CLI). This CLI is used directly by the react-native package and is not intended for use directly. We update it independently of React Native itself.

- [React Native Community CLI](https://github.com/react-native-community/cli)

- [Blog](https://github.com/GoldenbergLab/naming-and-documentation-conventions) - Repository Naming and Documentation Conventions **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.