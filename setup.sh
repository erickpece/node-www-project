#!/usr/bin/env bash

# Remove .git
rm -rf .git

# Set up project
npm init
git init

# Install standard dependencies
npm install --save axios body-parser cors dotenv express morgan sensible-logger
npm install --save-dev mocha nodemon nyc supertest
