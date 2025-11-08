import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import configService, { type RegionConfig } from '../services/configService';

// Types for our examples
interface User {
  id: string;
  name: string;
  email: string;
  region: string;
}

interface PaymentData {
  amount: number;
  currency: string;
  description: string;
}

export const ConfigExamplePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentRegion, setCurrentRegion] = useState(configService.getRegion());
  const [isLoading, setIsLoading] = useState(false);
  const [healthStatus, setHealthStatus] = useState<boolean | null>(null);

  // Load users from current region
  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const userData = await apiClient.get<User[]>(configService.getApiUrl('users'));
      setUsers(userData);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load users from specific region
  const loadUsersFromRegion = async (region: string) => {
    setIsLoading(true);
    try {
      const userData = await apiClient.getFromRegion<User[]>(region, 'users');
      setUsers(userData);
      setCurrentRegion(region);
    } catch (error) {
      console.error(`Failed to load users from ${region}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check API health
  const checkHealth = async () => {
    const isHealthy = await apiClient.healthCheck();
    setHealthStatus(isHealthy);
  };

  // Process payment (region-specific)
  const processPayment = async (paymentData: PaymentData) => {
    try {
      const result = await apiClient.post(
        configService.getApiUrl('payments'),
        paymentData
      );
      console.log('Payment processed:', result);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  // Example: Feature-based rendering
  const canShowPayments = configService.isFeatureEnabled('payments');

  useEffect(() => {
    loadUsers();
    checkHealth();
  }, []);

  return (
    <div style={{ maxWidth: '100%', width: '100%', padding: '20px' }}>
      <h1 style={{ color: '#313C97', marginBottom: '20px' }}>
        API Configuration Examples
      </h1>

      {/* Environment Info */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ color: '#313C97', marginBottom: '16px' }}>Current Configuration</h3>
        <div style={{ fontSize: '14px' }}>
          <p><strong>Environment:</strong> {configService.getEnvironment()}</p>
          <p><strong>Region:</strong> {configService.getRegion()}</p>
          <p><strong>Base URL:</strong> {configService.getBaseUrl()}</p>
          <p><strong>API Health:</strong> 
            <span style={{ 
              color: healthStatus ? '#28a745' : '#dc3545',
              marginLeft: '8px'
            }}>
              {healthStatus === null ? 'Checking...' : healthStatus ? 'Healthy' : 'Unhealthy'}
            </span>
          </p>
        </div>
      </div>

      {/* Region Switcher */}
      <div style={{
        backgroundColor: '#e7f3ff',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        border: '1px solid #b3d9ff'
      }}>
        <h3 style={{ color: '#0056b3', marginBottom: '16px' }}>Region Switcher</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {configService.getAvailableRegions().map((region: any) => (
            <button
              key={region.region}
              onClick={() => loadUsersFromRegion(region.region)}
              style={{
                backgroundColor: currentRegion === region.region ? '#313C97' : '#f8f9fa',
                color: currentRegion === region.region ? 'white' : '#333',
                border: '1px solid #313C97',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {region.name}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Toggles */}
      <div style={{
        backgroundColor: '#fff3cd',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        border: '1px solid #ffeaa7'
      }}>
        <h3 style={{ color: '#856404', marginBottom: '16px' }}>Available Features</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {configService.getRegionConfig().features.map((feature: string) => (
            <span
              key={feature}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* API Examples */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ color: '#313C97', marginBottom: '16px' }}>API Usage Examples</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>1. Basic GET Request</h4>
          <pre style={{
            backgroundColor: '#f1f3f4',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '14px',
            overflow: 'auto'
          }}>
{`// Get users from current region
const users = await apiClient.get<User[]>(
  configService.getApiUrl('users')
);`}
          </pre>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4>2. Cross-Region Request</h4>
          <pre style={{
            backgroundColor: '#f1f3f4',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '14px',
            overflow: 'auto'
          }}>
{`// Get users from EU region specifically
const euUsers = await apiClient.getFromRegion<User[]>(
  'eu-west-1', 
  'users'
);`}
          </pre>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4>3. Feature-Based Rendering</h4>
          <pre style={{
            backgroundColor: '#f1f3f4',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '14px',
            overflow: 'auto'
          }}>
{`// Only show payments if supported in current region
{configService.isFeatureEnabled('payments') && (
  <PaymentComponent />
)}`}
          </pre>
        </div>

        {canShowPayments && (
          <div style={{ marginBottom: '20px' }}>
            <h4>4. Region-Specific Payment</h4>
            <button
              onClick={() => processPayment({
                amount: 100,
                currency: 'USD',
                description: 'Test payment'
              })}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Process Payment
            </button>
          </div>
        )}
      </div>

      {/* Users List */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h3 style={{ color: '#313C97', marginBottom: '16px' }}>
          Users from {currentRegion} {isLoading && '(Loading...)'}
        </h3>
        
        {isLoading ? (
          <div>Loading users...</div>
        ) : (
          <div>
            {users.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {users.map(user => (
                  <li key={user.id} style={{
                    padding: '10px',
                    marginBottom: '8px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    border: '1px solid #e9ecef'
                  }}>
                    <strong>{user.name}</strong> ({user.email}) - Region: {user.region}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#6c757d' }}>No users found</p>
            )}
          </div>
        )}
      </div>

      {/* Debug Info */}
      {configService.isLoggingEnabled() && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '30px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ color: '#313C97', marginBottom: '16px' }}>Debug Information</h3>
          <pre style={{
            backgroundColor: '#f1f3f4',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto'
          }}>
            {JSON.stringify(configService.getDebugInfo(), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
