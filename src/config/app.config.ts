export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT),
  },
  router: {
    ['/api/auth']: 'http://127.0.0.1:8081',
    ['/api/accounts']: 'http://127.0.0.1:8082',
    ['/api/chat']: 'http://127.0.0.1:8083',
    ['/api/notifications']: 'http://127.0.0.1:8084',
    ['/api/ai']: 'http://127.0.0.1:8085',
  },
});

export interface AppConfig {
  port: number;
}

export interface Config {
  app: AppConfig;
  router: Record<string, string>;
}
