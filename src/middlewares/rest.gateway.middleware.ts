import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';
import { ClientRequest } from 'http';

@Injectable()
export class RestProxyMiddleware implements NestMiddleware {
  private proxy: RequestHandler;

  constructor(private readonly config: ConfigService) {
    const router = this.config.get<Record<string, string>>('router.api');

    console.log('router', router);

    this.proxy = createProxyMiddleware({
      changeOrigin: true,
      router,
      pathRewrite: (path) => path.replace(/^\/api\/[^\/]+/, '/api'),
      on: {
        proxyReq: (proxyReq: ClientRequest, req: Request) => {
          if (req.body) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
            proxyReq.end();
          }
        },
      },
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.proxy(req, res, next);
  }
}
