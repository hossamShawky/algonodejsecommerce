FROM node:18-alpine
WORKDIR /app
RUN npm install -g npm@9
COPY package*.json .
COPY translations ./translations

RUN mkdir packages && cd  packages
# COPY themes ./themes
# COPY extensions ./extensions
# COPY public ./public
# COPY media ./media
# COPY config ./config
RUN npm install @evershop/evershop
#&& install @evershop/postgres-query-builder
RUN npm install
RUN pwd && ls  -l /app/ 
RUN cd ..
RUN npm run build 
# Set the PATH to include the local bin
# ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 80
CMD ["npm", "run", "start"]
