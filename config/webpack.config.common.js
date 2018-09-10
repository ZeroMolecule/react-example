const path = require('path');

module.exports = {
  resolve: {
    alias: {
      api: path.resolve(__dirname, '../src/api/'),
      assets: path.resolve(__dirname, '../src/assets/'),
      components: path.resolve(__dirname, '../src/components/'),
      constants$: path.resolve(__dirname, '../src/constants.js'),
      icons: path.resolve(__dirname, '../src/assets/icons'),
      models: path.resolve(__dirname, '../src/models/'),
      routes$: path.resolve(__dirname, '../src/routes.js'),
      store: path.resolve(__dirname, '../src/store/'),
      strings: path.resolve(__dirname, '../src/assets/strings'),
      util: path.resolve(__dirname, '../src/util/'),
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
    }
  },
};
