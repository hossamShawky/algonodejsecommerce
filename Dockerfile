FROM node:18-alpine
WORKDIR /app
RUN npm install -g npm@9
COPY package*.json .
# COPY themes ./themes
# COPY extensions ./extensions
# COPY public ./public
# COPY media ./media
# COPY config ./config
COPY translations ./translations
RUN npm install
RUN npm run build --verbose
# Set the PATH to include the local bin
# ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 80
CMD ["npm", "run", "start"]
