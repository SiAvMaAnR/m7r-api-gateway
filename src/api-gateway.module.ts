import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/app.config';
import { RestProxyMiddleware } from './api-gateway.rest.middleware';
import { WSProxyMiddleware } from './api-gateway.ws.middleware';
import { TimerMiddleware } from './middlewares/timer.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TimerMiddleware)
      .forRoutes('*')
      .apply(RestProxyMiddleware)
      .forRoutes({ path: '/api/*', method: RequestMethod.ALL })
      .apply(WSProxyMiddleware)
      .forRoutes({ path: '/signalR/*', method: RequestMethod.ALL });
  }
}