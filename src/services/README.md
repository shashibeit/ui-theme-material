# Services Layer Documentation

This directory contains the core services layer for handling API configuration, client management, and multi-region/environment support.

## 📁 Structure

```
src/services/
├── configService.ts    # Environment & region configuration management
├── apiClient.ts        # HTTP client with region switching & retry logic
└── README.md          # This documentation
```

## 🌍 Multi-Region & Environment System

### Overview

Our application supports multiple deployment environments (development, staging, production) across different geographical regions (US East, US West, EU, Asia Pacific). Each region may have different endpoints, features, and compliance requirements.

### Key Features

- 🔄 **Dynamic Region Switching**: Switch between regions at runtime
- 🛡️ **Environment Isolation**: Separate configs for dev/staging/prod
- 🎛️ **Feature Flags**: Region-specific feature enablement
- ⚡ **Smart Retry Logic**: Automatic request retries with exponential backoff
- 📊 **Request Interceptors**: Automatic headers, auth, and logging
- 🏥 **Health Monitoring**: Built-in API health checking
- 📁 **File Upload Support**: Multipart form data handling
- 🔐 **Authentication**: Automatic token management

## 🔧 Configuration Service (`configService.ts`)

### Purpose
Centralized configuration management for environments, regions, and feature flags.

### Key Components

#### Environment Configuration
```typescript
interface EnvironmentConfig {
  environment: 'development' | 'staging' | 'production';
  region: string;
  baseUrl: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
  enableLogging: boolean;
  enableAnalytics: boolean;
}
```

#### Region Configuration
```typescript
interface RegionConfig {
  region: string;
  name: string;
  endpoints: ApiEndpoints;
  features: string[];
}
```

#### Available Regions

| Region | Name | Special Features |
|--------|------|-----------------|
| `us-east-1` | US East (N. Virginia) | Full feature set |
| `us-west-2` | US West (Oregon) | Full feature set |
| `eu-west-1` | Europe (Ireland) | GDPR compliance |
| `ap-southeast-1` | Asia Pacific (Singapore) | Localization support |

### Usage Examples

```typescript
import configService from '../services/configService';

// Get current configuration
const environment = configService.getEnvironment(); // 'development'
const region = configService.getRegion(); // 'us-east-1'
const baseUrl = configService.getBaseUrl(); // 'https://dev-api.yourapp.com'

// Get specific endpoint URLs
const authUrl = configService.getApiUrl('auth'); // Full URL for auth endpoint
const usersUrl = configService.getApiUrl('users'); // Full URL for users endpoint

// Feature checking
if (configService.isFeatureEnabled('payments')) {
  // Show payment components
}

// Region switching
configService.switchRegion('eu-west-1');

// Get all available regions
const regions = configService.getAvailableRegions();
```

## 🌐 API Client (`apiClient.ts`)

### Purpose
HTTP client wrapper with built-in region support, retry logic, and interceptors.

### Key Features

#### Automatic Configuration
- Reads from `configService` for endpoints and timeouts
- Adds standard headers (region, environment, API version)
- Handles authentication tokens automatically

#### HTTP Methods
```typescript
// Basic HTTP operations
await apiClient.get<User[]>('/users');
await apiClient.post<User>('/users', userData);
await apiClient.put<User>(`/users/${id}`, updateData);
await apiClient.delete(`/users/${id}`);

// Cross-region requests
await apiClient.getFromRegion<User[]>('eu-west-1', 'users');

// File upload
await apiClient.uploadFile('/upload', file, { description: 'Profile photo' });
```

#### Request Options
```typescript
interface RequestOptions {
  timeout?: number;        // Override default timeout
  retries?: number;        // Override default retry attempts
  headers?: Record<string, string>; // Additional headers
  skipAuth?: boolean;      // Skip authentication token
}
```

### Usage Examples

#### Basic API Calls
```typescript
import apiClient from '../services/apiClient';

// GET request
const users = await apiClient.get<User[]>('/api/v1/users');

// POST request
const newUser = await apiClient.post<User>('/api/v1/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// Custom options
const data = await apiClient.get('/api/v1/data', {
  timeout: 30000,
  retries: 5,
  headers: { 'X-Custom': 'value' }
});
```

#### Region-Specific Requests
```typescript
// Get users from EU region (for GDPR-compliant data)
const euUsers = await apiClient.getFromRegion<User[]>('eu-west-1', 'users');

// Process payment in Asia Pacific region
configService.switchRegion('ap-southeast-1');
const payment = await apiClient.post(
  configService.getApiUrl('payments'),
  paymentData
);
```

#### File Upload
```typescript
const result = await apiClient.uploadFile(
  '/api/v1/upload',
  selectedFile,
  { 
    category: 'profile-photo',
    userId: currentUser.id 
  }
);
```

## 🎛️ Environment Configuration

### Setup

Create environment-specific files:

#### `.env.development`
```bash
VITE_API_BASE_URL=https://dev-api.yourapp.com
VITE_REGION=us-east-1
VITE_ENVIRONMENT=development
```

#### `.env.production`
```bash
VITE_API_BASE_URL=https://api.yourapp.com
VITE_REGION=us-east-1
VITE_ENVIRONMENT=production
```

### Environment-Specific Behaviors

| Environment | Timeout | Retries | Logging | Analytics |
|------------|---------|---------|---------|-----------|
| Development | 30s | 3 | ✅ | ❌ |
| Staging | 15s | 3 | ✅ | ✅ |
| Production | 10s | 2 | ❌ | ✅ |

## 🔧 Advanced Usage

### Request Interceptors
```typescript
// Add custom headers to all requests
apiClient.addRequestInterceptor((config) => {
  config.headers = {
    ...config.headers,
    'X-Custom-Header': 'value'
  };
  return config;
});
```

### Response Interceptors
```typescript
// Log all responses
apiClient.addResponseInterceptor((response) => {
  console.log(`Response: ${response.status} ${response.url}`);
  return response;
});
```

### Health Monitoring
```typescript
const isHealthy = await apiClient.healthCheck();
if (!isHealthy) {
  // Show maintenance message
}
```

### Feature-Based Rendering
```typescript
import configService from '../services/configService';

// Conditional component rendering based on region features
function PaymentSection() {
  if (!configService.isFeatureEnabled('payments')) {
    return <div>Payments not available in this region</div>;
  }
  
  return <PaymentForm />;
}

// GDPR compliance check
function DataExportButton() {
  if (!configService.isFeatureEnabled('gdpr-compliance')) {
    return null;
  }
  
  return <button onClick={exportUserData}>Export My Data</button>;
}
```

## 🚀 Implementation Guide

### 1. Basic Setup
```typescript
// In your component
import apiClient from '../services/apiClient';
import configService from '../services/configService';

function MyComponent() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    // Load users from current region
    apiClient.get(configService.getApiUrl('users'))
      .then(setUsers)
      .catch(console.error);
  }, []);
  
  return (
    <div>
      <h1>Users from {configService.getRegion()}</h1>
      {/* Render users */}
    </div>
  );
}
```

### 2. Region Switching
```typescript
function RegionSwitcher() {
  const [currentRegion, setCurrentRegion] = useState(configService.getRegion());
  
  const switchToRegion = (region: string) => {
    configService.switchRegion(region);
    setCurrentRegion(region);
    // Reload data for new region
  };
  
  return (
    <select onChange={(e) => switchToRegion(e.target.value)}>
      {configService.getAvailableRegions().map(region => (
        <option key={region.region} value={region.region}>
          {region.name}
        </option>
      ))}
    </select>
  );
}
```

### 3. Error Handling
```typescript
async function loadData() {
  try {
    const data = await apiClient.get('/api/v1/data');
    return data;
  } catch (error) {
    if (error.message.includes('404')) {
      // Handle not found
    } else if (error.message.includes('503')) {
      // Handle service unavailable
    }
    throw error;
  }
}
```

## 🛠️ Best Practices

### 1. Environment Variables
- Always use `VITE_` prefix for Vite environment variables
- Set region-specific endpoints in environment files
- Use different API keys per environment

### 2. Error Handling
- Implement proper error boundaries in React components
- Use try-catch blocks for async operations
- Show user-friendly error messages

### 3. Performance
- Use the built-in retry logic instead of implementing your own
- Leverage health checks before making critical requests
- Cache configuration data when possible

### 4. Security
- Never expose sensitive data in environment variables
- Use proper authentication tokens
- Validate region permissions before switching

## 📊 Monitoring & Debugging

### Debug Information
```typescript
// Get complete debug info
const debug = configService.getDebugInfo();
console.log('Current config:', debug);

// Check specific settings
console.log('Logging enabled:', configService.isLoggingEnabled());
console.log('Timeout:', configService.getTimeout());
console.log('Features:', configService.getRegionConfig().features);
```

### Request Logging
In development mode, all API requests are automatically logged with:
- Request URL and method
- Request/response timing
- Error details
- Retry attempts

## 🔄 Migration Guide

### From Direct Fetch to ApiClient
```typescript
// ❌ Before
const response = await fetch('/api/users');
const users = await response.json();

// ✅ After
const users = await apiClient.get('/api/users');
```

### From Hardcoded URLs to ConfigService
```typescript
// ❌ Before
const API_URL = 'https://api.example.com';

// ✅ After
const API_URL = configService.getBaseUrl();
```

## 📝 Contributing

When adding new features to the services layer:

1. **Add new endpoints** to `ApiEndpoints` interface in `configService.ts`
2. **Update region configs** if endpoints differ by region
3. **Add feature flags** for region-specific capabilities
4. **Update this documentation** with new usage examples
5. **Add tests** for new functionality

## 🚨 Troubleshooting

### Common Issues

**API requests failing**
- Check environment variables are set correctly
- Verify the region supports the requested endpoint
- Check network connectivity and firewall settings

**Wrong region data**
- Ensure region switching is working: `configService.getRegion()`
- Check if the feature is enabled: `configService.isFeatureEnabled('feature')`
- Verify environment configuration

**Timeout errors**
- Increase timeout in request options
- Check if the API endpoint is responsive
- Consider using health check before making requests

### Debug Commands
```typescript
// Check current configuration
console.log(configService.getDebugInfo());

// Test API health
console.log(await apiClient.healthCheck());

// Check available regions
console.log(configService.getAvailableRegions());
```

---

For more examples and advanced usage, check the demo page at `/config-examples` in the application.
