### Backup documentation

```
{
    "name": "MICHAEL-LOCK-WEBSITE-REACT-NODE-EXPRESS",
    "version": "1.0.0",
    "description": "",
    "engines": {
    "npm": "7.9.0",
    "node": "v12.18.3"
  },
    "main": "index.js",
    "scripts": {
    "postinstall": "tsc",
    "heroku-postbuild": "cd client && npm install && npm install --only=dev --no-shrinkwrap && npm run build",
    "start": "node build/index.js",
    // "watch": "npx tsc && node build/index.js", // BACKUP
    "watch": "nodemon index.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
    "@types/express": "^4.17.13",
    "@types/node": "^16.11.7",
    "cors": "^2.8.5",
    "dotenv": "^8.6.0",
    "express": "^4.17.1",
    "typescript": "^4.4.4"
  },
    "devDependencies": {
    "@types/cors": "^2.8.12",
    "@types/express": "^4.17.13",
    "@types/node": "^16.11.7",
    "nodemon": "^2.0.15",
    "ts-node": "^10.4.0",
    "typescript": "^4.4.4"
    }
}
```

### Problems and how I solved

## Problem 1: babel-jest version incompatibility between TS React App and TS Node JS

Solution: I created '.env' file in client folder and added the following line:

```
SKIP_PREFLIGHT_CHECK=true
```
