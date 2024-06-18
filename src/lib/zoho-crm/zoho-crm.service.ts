import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ZohoCrmAccessTokenResponse } from './zoho-crm.interfaces';

@Injectable()
export class ZohoCrmService {
  private readonly logger = new Logger(ZohoCrmService.name);
  private readonly apiUrl = 'https://www.zohoapis.com/crm/v2';
  private accessToken: string;

  constructor(private configService: ConfigService) {
    void this.refreshToken();
  }

  public async getLeads() {
    try {
      const headers = await this.getRequestHeaders();
      const response = await axios.get(`${this.apiUrl}/leands`, { headers });
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching leads', error.message);
      throw new InternalServerErrorException('Error fetching leads');
    }
  }

  public createLead() {
    //
  }

  private async refreshToken(): Promise<void | never> {
    const headers = this.getRefreshTokenHeaders();

    try {
      const response = await axios.post<ZohoCrmAccessTokenResponse>(
        this.apiUrl,
        null,
        headers,
      );

      this.accessToken = response.data.access_token;
      this.logger.log('Access token refreshed successfully.');
    } catch (error) {
      this.logger.error('Error refreshing access token', error.message);
      throw new InternalServerErrorException('Error refreshing access token');
    }
  }

  private getRefreshTokenHeaders() {
    const clientId = this.configService.get<string>('ZOHO_CLIENT_ID');
    const refreshToken = this.configService.get<string>('ZOHO_REFRESH_TOKEN');
    const clientSecret = this.configService.get<string>('ZOHO_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('ZOHO_REDIRECT_URI');

    return {
      params: {
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'refresh_token',
      },
    };
  }

  private async getRequestHeaders() {
    if (!this.accessToken) {
      await this.refreshToken();
    }

    return {
      Authorization: `Zoho-oauthtoken ${this.accessToken}`,
    };
  }
}
