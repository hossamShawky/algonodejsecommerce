FROM node:18-alpine
WORKDIR /app
RUN npm install -g npm@9
COPY package.json .
COPY translations ./translations

RUN mkdir packages 
COPY  packages/ packages/
# COPY themes ./themes
# COPY extensions ./extensions
# COPY public ./public
# COPY media ./media
# COPY config ./config
RUN npm install @evershop/evershop
#&& install @evershop/postgres-query-builder
RUN npm install
# RUN pwd && ls  -l /app/  && cd ..
RUN npm run build 
# Set environment variables
ENV NODE_ENV=development
ENV SUPPRESS_NO_CONFIG_WARNING=true
EXPOSE 3000
CMD ["npm", "run", "start"]
