// API Configuration Types
export interface ApiEndpoints {
  auth: string;
  users: string;
  payments: string;
  analytics: string;
  notifications: string;
}

export interface RegionConfig {
  region: string;
  name: string;
  endpoints: ApiEndpoints;
  features: string[];
}

export interface EnvironmentConfig {
  environment: 'development' | 'staging' | 'production';
  region: string;
  baseUrl: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
  enableLogging: boolean;
  enableAnalytics: boolean;
}

// Regional configurations
const REGION_CONFIGS: Record<string, RegionConfig> = {
  'us-east-1': {
    region: 'us-east-1',
    name: 'US East (N. Virginia)',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      payments: '/api/v1/payments',
      analytics: '/api/v1/analytics',
      notifications: '/api/v1/notifications'
    },
    features: ['payments', 'analytics', 'real-time-notifications']
  },
  'us-west-2': {
    region: 'us-west-2',
    name: 'US West (Oregon)',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      payments: '/api/v1/payments',
      analytics: '/api/v1/analytics',
      notifications: '/api/v1/notifications'
    },
    features: ['payments', 'analytics', 'real-time-notifications']
  },
  'eu-west-1': {
    region: 'eu-west-1',
    name: 'Europe (Ireland)',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      payments: '/api/v1/payments-eu',
      analytics: '/api/v1/analytics',
      notifications: '/api/v1/notifications'
    },
    features: ['payments', 'analytics', 'gdpr-compliance']
  },
  'ap-southeast-1': {
    region: 'ap-southeast-1',
    name: 'Asia Pacific (Singapore)',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      payments: '/api/v1/payments-asia',
      analytics: '/api/v1/analytics',
      notifications: '/api/v1/notifications'
    },
    features: ['payments', 'analytics', 'localization']
  }
};

// Environment-specific configurations
const ENVIRONMENT_CONFIGS: Record<string, EnvironmentConfig> = {
  development: {
    environment: 'development',
    region: import.meta.env.VITE_REGION || 'us-east-1',
    baseUrl: 'https://dev-api.yourapp.com',
    apiVersion: 'v1',
    timeout: 30000,
    retryAttempts: 3,
    enableLogging: true,
    enableAnalytics: false
  },
  staging: {
    environment: 'staging',
    region: import.meta.env.VITE_REGION || 'us-east-1',
    baseUrl: 'https://staging-api.yourapp.com',
    apiVersion: 'v1',
    timeout: 15000,
    retryAttempts: 3,
    enableLogging: true,
    enableAnalytics: true
  },
  production: {
    environment: 'production',
    region: import.meta.env.VITE_REGION || 'us-east-1',
    baseUrl: 'https://api.yourapp.com',
    apiVersion: 'v1',
    timeout: 10000,
    retryAttempts: 2,
    enableLogging: false,
    enableAnalytics: true
  }
};

// Configuration Service Class
class ConfigService {
  private currentEnvironment: string;
  private currentRegion: string;
  private environmentConfig: EnvironmentConfig;
  private regionConfig: RegionConfig;

  constructor() {
    this.currentEnvironment = import.meta.env.MODE || 'development';
    this.currentRegion = import.meta.env.VITE_REGION || 'us-east-1';
    
    this.environmentConfig = ENVIRONMENT_CONFIGS[this.currentEnvironment];
    this.regionConfig = REGION_CONFIGS[this.currentRegion];

    if (!this.environmentConfig) {
      throw new Error(`Invalid environment: ${this.currentEnvironment}`);
    }
    
    if (!this.regionConfig) {
      throw new Error(`Invalid region: ${this.currentRegion}`);
    }
  }

  // Get full API URL for specific endpoint
  getApiUrl(endpoint: keyof ApiEndpoints): string {
    const path = this.regionConfig.endpoints[endpoint];
    return `${this.environmentConfig.baseUrl}${path}`;
  }

  // Get base API URL
  getBaseUrl(): string {
    return this.environmentConfig.baseUrl;
  }

  // Get current environment
  getEnvironment(): string {
    return this.currentEnvironment;
  }

  // Get current region
  getRegion(): string {
    return this.currentRegion;
  }

  // Get region configuration
  getRegionConfig(): RegionConfig {
    return this.regionConfig;
  }

  // Get environment configuration
  getEnvironmentConfig(): EnvironmentConfig {
    return this.environmentConfig;
  }

  // Check if feature is enabled for current region
  isFeatureEnabled(feature: string): boolean {
    return this.regionConfig.features.includes(feature);
  }

  // Get request timeout
  getTimeout(): number {
    return this.environmentConfig.timeout;
  }

  // Get retry attempts
  getRetryAttempts(): number {
    return this.environmentConfig.retryAttempts;
  }

  // Check if logging is enabled
  isLoggingEnabled(): boolean {
    return this.environmentConfig.enableLogging;
  }

  // Check if analytics is enabled
  isAnalyticsEnabled(): boolean {
    return this.environmentConfig.enableAnalytics;
  }

  // Switch region (for multi-region apps)
  switchRegion(newRegion: string): void {
    if (!REGION_CONFIGS[newRegion]) {
      throw new Error(`Invalid region: ${newRegion}`);
    }
    
    this.currentRegion = newRegion;
    this.regionConfig = REGION_CONFIGS[newRegion];
  }

  // Get all available regions
  getAvailableRegions(): RegionConfig[] {
    return Object.values(REGION_CONFIGS);
  }

  // Debug information
  getDebugInfo() {
    return {
      environment: this.currentEnvironment,
      region: this.currentRegion,
      baseUrl: this.environmentConfig.baseUrl,
      features: this.regionConfig.features,
      endpoints: this.regionConfig.endpoints
    };
  }
}

// Create singleton instance
export const configService = new ConfigService();

// Export for easy access
export default configService;
