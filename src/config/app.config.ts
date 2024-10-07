export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT),
  },
  router: {
    api: {
      ['/api/auth']: process.env.AUTH_SERVICE_API_URL,
      ['/api/accounts']: process.env.ACCOUNTS_SERVICE_API_URL,
      ['/api/chat']: process.env.CHAT_SERVICE_API_URL,
      ['/api/notifications']: process.env.NOTIFICATIONS_SERVICE_API_URL,
      ['/api/ai']: process.env.AI_SERVICE_API_URL,
    },
    ws: {
      ['/signalR/chat']: process.env.CHAT_SERVICE_WS_URL,
    },
  },
});

export interface AppConfig {
  port: number;
}

export interface RouterConfig {
  api: Record<string, string>;
  ws: Record<string, string>;
}

export interface Config {
  app: AppConfig;
  router: RouterConfig;
}
