import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiGatewayService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  private getServiceUrl(serviceName: string): string {
    const serviceConfig = this.configService.get(`services.${serviceName}`);
    return `http://${serviceConfig.host}:${serviceConfig.port}/api`;
  }

  public proxyGetRequest(serviceName: string, endpoint: string): Observable<any> {
    const url = `${this.getServiceUrl(serviceName)}${endpoint}`;
    return this.httpService.get(url).pipe(map((response) => response.data));
  }

  public proxyPostRequest(serviceName: string, endpoint: string, data: any): Observable<any> {
    const url = `${this.getServiceUrl(serviceName)}${endpoint}`;
    return this.httpService.post(url, data).pipe(map((response) => response.data));
  }
}