FROM node:18-alpine
WORKDIR /app
RUN npm install -g npm@9
COPY package*.json .
COPY  packages .
# COPY themes ./themes
# COPY extensions ./extensions
# COPY public ./public
# COPY media ./media
# COPY config ./config
COPY translations ./translations
RUN npm install @evershop/evershop
#&& install @evershop/postgres-query-builder
RUN npm install
RUN pwd && ls  -l /app/ 
RUN npm run build 
# Set the PATH to include the local bin
# ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 80
CMD ["npm", "run", "start"]
