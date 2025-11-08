import configService, { type ApiEndpoints } from './configService';

// Request/Response Types
interface ApiResponse<T = any> {
  data: T;
  message: string;
  status: number;
  timestamp: string;
}

interface ApiError {
  message: string;
  code: string;
  details?: any;
  timestamp: string;
}

// Request Options
interface RequestOptions {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
  skipAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private requestInterceptors: Array<(config: RequestInit) => RequestInit> = [];
  private responseInterceptors: Array<(response: Response) => Response> = [];

  constructor() {
    this.baseUrl = configService.getBaseUrl();
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'X-API-Version': configService.getEnvironmentConfig().apiVersion,
      'X-Region': configService.getRegion(),
      'X-Environment': configService.getEnvironment()
    };

    if (configService.isLoggingEnabled()) {
      console.log('API Client initialized:', configService.getDebugInfo());
    }
  }

  // Add request interceptor
  addRequestInterceptor(interceptor: (config: RequestInit) => RequestInit): void {
    this.requestInterceptors.push(interceptor);
  }

  // Add response interceptor
  addResponseInterceptor(interceptor: (response: Response) => Response): void {
    this.responseInterceptors.push(interceptor);
  }

  // Get auth token (implement your auth logic)
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Prepare request configuration
  private prepareRequest(
    endpoint: string, 
    options: RequestOptions = {}
  ): { url: string; config: RequestInit } {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
    
    let config: RequestInit = {
      headers: { ...this.defaultHeaders }
    };

    // Add auth token if not skipped
    if (!options.skipAuth) {
      const token = this.getAuthToken();
      if (token) {
        (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
      }
    }

    // Add custom headers
    if (options.headers) {
      config.headers = { ...config.headers, ...options.headers };
    }

    // Apply request interceptors
    this.requestInterceptors.forEach(interceptor => {
      config = interceptor(config);
    });

    return { url, config };
  }

  // Handle response
  private async handleResponse<T>(response: Response): Promise<T> {
    // Apply response interceptors
    this.responseInterceptors.forEach(interceptor => {
      response = interceptor(response);
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: 'Network error occurred',
        code: 'NETWORK_ERROR',
        timestamp: new Date().toISOString()
      }));
      
      throw new Error(`API Error: ${errorData.message} (${response.status})`);
    }

    const data: ApiResponse<T> = await response.json();
    return data.data;
  }

  // Retry logic
  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    retries: number = configService.getRetryAttempts()
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        if (configService.isLoggingEnabled()) {
          console.warn(`Request failed, retrying... (${retries} attempts left)`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        return this.executeWithRetry(fn, retries - 1);
      }
      throw error;
    }
  }

  // HTTP Methods
  async get<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.executeWithRetry(async () => {
      const { url, config } = this.prepareRequest(endpoint, options);
      
      const response = await fetch(url, {
        ...config,
        method: 'GET',
        signal: AbortSignal.timeout(options.timeout || configService.getTimeout())
      });

      return this.handleResponse<T>(response);
    }, options.retries);
  }

  async post<T = any>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.executeWithRetry(async () => {
      const { url, config } = this.prepareRequest(endpoint, options);
      
      const response = await fetch(url, {
        ...config,
        method: 'POST',
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(options.timeout || configService.getTimeout())
      });

      return this.handleResponse<T>(response);
    }, options.retries);
  }

  async put<T = any>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    return this.executeWithRetry(async () => {
      const { url, config } = this.prepareRequest(endpoint, options);
      
      const response = await fetch(url, {
        ...config,
        method: 'PUT',
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(options.timeout || configService.getTimeout())
      });

      return this.handleResponse<T>(response);
    }, options.retries);
  }

  async delete<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.executeWithRetry(async () => {
      const { url, config } = this.prepareRequest(endpoint, options);
      
      const response = await fetch(url, {
        ...config,
        method: 'DELETE',
        signal: AbortSignal.timeout(options.timeout || configService.getTimeout())
      });

      return this.handleResponse<T>(response);
    }, options.retries);
  }

  // Region-specific methods
  async getFromRegion<T = any>(
    region: string, 
    endpoint: keyof ApiEndpoints, 
    options: RequestOptions = {}
  ): Promise<T> {
    const currentRegion = configService.getRegion();
    configService.switchRegion(region);
    
    try {
      const url = configService.getApiUrl(endpoint);
      return await this.get<T>(url, options);
    } finally {
      configService.switchRegion(currentRegion); // Switch back
    }
  }

  // Upload file
  async uploadFile<T = any>(
    endpoint: string, 
    file: File, 
    additionalData: Record<string, any> = {},
    options: RequestOptions = {}
  ): Promise<T> {
    const { url, config } = this.prepareRequest(endpoint, options);
    
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional form data
    Object.entries(additionalData).forEach(([key, value]) => {
      formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
    });

    // Remove Content-Type header to let browser set it with boundary
    const headers = { ...config.headers };
    delete (headers as any)['Content-Type'];

    const response = await fetch(url, {
      ...config,
      method: 'POST',
      headers,
      body: formData,
      signal: AbortSignal.timeout(options.timeout || configService.getTimeout())
    });

    return this.handleResponse<T>(response);
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.get('/health', { skipAuth: true, timeout: 5000, retries: 1 });
      return true;
    } catch {
      return false;
    }
  }

  // Update base URL (for region switching)
  updateBaseUrl(newBaseUrl: string): void {
    this.baseUrl = newBaseUrl;
    if (configService.isLoggingEnabled()) {
      console.log('API Client base URL updated to:', newBaseUrl);
    }
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

export default apiClient;
