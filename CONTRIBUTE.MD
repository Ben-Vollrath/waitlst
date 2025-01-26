# Contribution Guide

Thank you for your interest in contributing to **Waitlst**! Follow the steps below to get started:

## Getting Started

1. **Fork the Repository**:
   - Click the `Fork` button on the top-right corner of the repository page to create your copy.

2. **Clone the Repository**:
   - Clone your forked repository to your local machine using:
     ```bash
     git clone https://github.com/your-username/waitlst.git
     ```

3. **Set Up Upstream Remote**:
   - Add the original repository as an upstream remote:
     ```bash
     git remote add upstream https://github.com/original-repo/waitlst.git
     ```

4. **Sync with Upstream**:
   - Ensure your fork is up to date by fetching and merging changes from upstream:
     ```bash
     git fetch upstream
     git merge upstream/main
     ```

## Installation

### Backend

1. **Install the Supabase CLI**:
   - Follow the [official guide](https://supabase.com/docs/guides/cli) to install the Supabase CLI.

2. **Navigate to the Backend Directory**:
   - Move to the backend directory:
     ```bash
     cd backend
     ```

3. **Start Supabase**:
   - Run the following command (ensure Docker is installed and running):
     ```bash
     supabase start
     ```

### Frontend

1. **Navigate to the Frontend Directory**:
   - Move to the frontend directory:
     ```bash
     cd waitlst
     ```

2. **Install Dependencies**:
   - Install all required npm packages:
     ```bash
     npm install
     ```

3. **Run the Development Server**:
   - Start the development server:
     ```bash
     npm run dev
     ```

## Submitting Changes

1. **Create a New Branch**:
   - Always create a new branch for your changes:
     ```bash
     git checkout -b feature/your-feature-name
     ```

2. **Make Changes**:
   - Add your code and ensure everything works as expected.

3. **Commit Your Changes**:
   - Write clear and concise commit messages:
     ```bash
     git commit -m "Add description of your changes"
     ```

4. **Push Your Branch**:
   - Push your branch to your forked repository:
     ```bash
     git push origin feat/your-feature-name
     ```
     or
     ```bash
     git push origin fix/your-fix-name
     ``` 

5. **Open a Pull Request**:
   - Go to the original repository and open a pull request from your branch.

---

Thank you for contributing to Waitlst! Your efforts help make this project better for everyone.

