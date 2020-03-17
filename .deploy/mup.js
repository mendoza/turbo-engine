module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: "18.209.157.164",
      username: "ubuntu",
      pem: "../turbo.pem",
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    },
  },

  proxy: {
    domains: "turboengine.tk",
    ssl: {
      forceSSL: true,
      letsEncryptEmail: "ingenieria@ingenieria.com",
    },
  },

  app: {
    // TODO: change app name and path
    name: "app",
    path: "../",

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: "https://turboengine.tk",
      MONGO_URL: "mongodb://mongodb/meteor",
      MONGO_OPLOG_URL: "mongodb://mongodb/local",
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: "abernix/meteord:node-12-base",
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true,
  },

  mongo: {
    version: "3.4.1",
    servers: {
      one: {},
    },
  },
};
