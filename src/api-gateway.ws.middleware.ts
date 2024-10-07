import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';

@Injectable()
export class WSProxyMiddleware implements NestMiddleware {
  private proxy: RequestHandler;

  constructor(private readonly config: ConfigService) {
    const router = this.config.get<Record<string, string>>('router.ws');

    this.proxy = createProxyMiddleware({
      changeOrigin: true,
      ws: true,
      router,
      pathRewrite: (path) => path.replace(/^\/signalR\/[^\/]+/, '/signalR'),
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.proxy(req, res, next);
  }
}
