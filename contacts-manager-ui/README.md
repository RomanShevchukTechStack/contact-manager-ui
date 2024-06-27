# Contacts Manager UI

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/download/) (version 12.x or later)
- [Angular CLI](https://angular.io/cli) (version 12.x or later)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/contacts-manager-ui.git
    ```

2. Navigate to the project directory:
    ```bash
    cd contacts-manager-ui
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

## How to Run the Application
ng serve

### Prod conf
update in environment.prod.ts you API url and build for prod


## Architecture
app.module.ts -- base module of app, all modules declarations
shared folder -- all shared things, DTOs, models, services.
contacts folder -- all component are here, in case adding dunctionality create new module
