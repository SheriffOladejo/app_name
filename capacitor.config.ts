import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nicholas.app',
  appName: 'Nicholas_App',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
