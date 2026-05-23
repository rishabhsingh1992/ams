import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ams',
  webDir: 'www',
  ios: {
    // Transparent webview required for camera-preview toBack:true
    backgroundColor: '#00000000',
  },
};

export default config;
