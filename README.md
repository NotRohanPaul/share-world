# This is an Peer to Peer File Sharing Web App 

> [!NOTE]
> Currectly in development additional features to be added but main features is done.  
> Check the url and test the site. [Share World](https://share-world.onrender.com)



## Main Features
1. Authentication feature where you can sign up or login to use but also added a button to login as guest to share via id.
2. Made sure after logout the refresh token is blacklisted.
3. Online File Sharing but directly send to the receiver no server in between.
4. Made to use less RAM and send in chunks so the files sending does not require to be under the RAM limit.
5. Its also a PWA mean you can install or add as a shortcut in devices
6. Have a Responsive design which works in both desktop and mobile devices also you can use it in split view with other apps in mobile devices.

## Work in Progress
1. Option to add peer or friend using email or id and the share without id.
2. The receiver is currently receiving files in memory so once refresh the already received files is gone. Need to add storage feature to store the file in indexdb until the users download or clear it from the db.
3. Common logic for both backend and frontend like zod schemas to be moved in a common pakage folder in the root.
4. Use of redis instead on own memory.

## Technologies Used
### Common
1. Typescript
2. Socket IO
3. Zod

### Backend
1. MongoDB
2. ExpressJS
3. JWT & Bcrypt
4. NodeJS
5. Pino
6. Rollup

### Frontend
1. ReactJS
2. TailwindCSS
3. Redux
4. React Query
5. Motion
6. Axios
7. WebRTC
8. Vite

### API Devlopment & Testing
1. Vitest
2. React Testing Library
3. MSW
4. Supertest
5. Mongodb Memory Server
6. Rest Client

### Other Tech
1. VS Code
2. GIT
3. Github Actions
4. Render
5. Docker
6. Draw.io

## Preview

### Landing Page
!["Landin Page"](/docs/preview/landing-page.png)

### Login/Singup Page
!["Login/Singup Page"](/docs/preview/login-signup-page.png)

### Sender Page
!["Sender Page"](/docs/preview/sender-page.png)

### Receiver Page
!["Receiver Page"](/docs/preview/receiver-page.png)

### Sending Files
!["Sending Files"](/docs/preview/sending-files.png)

### Receiving Files
!["Receiving Files"](/docs/preview/receiving-files.png)