# Step 1: Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application code
COPY . .

# Step 6: Build the NestJS application
RUN npm run build

# Step 7: Expose the port your app runs on (usually 3000)
EXPOSE 3000

# Step 8: Define the command to run your app
CMD ["npm", "run", "start:prod"]