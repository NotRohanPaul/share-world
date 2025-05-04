# Folder Structure
- `.git/`
- `.vscode/`
  
- `api-endpoints-collection/`
  - `hoppscotch/`
    - `share-world-env.json`
    - `share-world.json`

- `backend/`
  - `dist/`
  - `node_modules/`
  - `src/`
    - `configs/`
      - `connect-DB.ts`
    - `constants/`
      - `env.ts`
      - `error-codes.ts`
    - `controllers/`
      - `auth-controllers/`
        - `index.ts`
        - `login-controller.ts`
        - `logout-controller.ts`
        - `signup-controller.ts`
    - `middleware/`
      - `error-handler.ts`
      - `unknown-handler.ts`
    - `models/`
      - `users.model.ts`
    - `routes/`
      - `auth-route-handler.ts`
      - `file-upload-router-handler.ts`
      - `routes.ts`
    - `schemas/`
      - `auth-schemas.ts`
    - `utils/`
      - `app-error.ts`
    - `index.ts`
  - `.env`
  - `.env.production`
  - `.gitignore`
  - `.nvmrc`
  - `.test.env`
  - `eslint.config.js`
  - `package-lock.json`
  - `package.json`
  - `start-mongo.ps1`
  - `tsconfig.json`

- `docs/`
  - `tree.md`

- `frontend/`
  - `.gitignore`

- `system-designs/`
  - `share-world.drawio`

- `.gitignore`
- `LICENSE`
- `README.md`
