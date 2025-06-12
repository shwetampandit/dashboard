// Tests for the ECUTable component
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ECUTable from '../ECUTable';

// Sample ECU data for testing
const mockECUs = [
  {
    id: '1',
    name: 'ECU A',
    vulnerabilityCount: 5,
    securityStatus: 'Low',
  },
  {
    id: '2',
    name: 'ECU B',
    vulnerabilityCount: 3,
    securityStatus: 'Medium',
  },
];

// Group of tests for ECUTable
describe('ECUTable Component', () => {
  // Test: Shows loading spinner when loading
  test('renders loading state correctly', () => {
    render(<ECUTable ecus={[]} isLoading={true} error={null} onEcuSelect={() => {}} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  // Test: Shows error message when there is an error
  test('renders error state correctly', () => {
    render(<ECUTable ecus={[]} isLoading={false} error={{ message: 'Failed to load' }} onEcuSelect={() => {}} />);
    expect(screen.getByText(/Failed to load/i)).toBeInTheDocument();
  });

  // Test: Displays ECU data in the table
  test('renders table with ECU data', () => {
    render(<ECUTable ecus={mockECUs} isLoading={false} error={null} onEcuSelect={() => {}} />);

    expect(screen.getByText('ECU A')).toBeInTheDocument();
    expect(screen.getByText('ECU B')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  // Test: Calls the select function when a row is clicked
  test('calls onEcuSelect when a row is clicked', () => {
    const handleSelect = jest.fn();
    render(<ECUTable ecus={mockECUs} isLoading={false} error={null} onEcuSelect={handleSelect} />);

    const row = screen.getByText('ECU A');
    fireEvent.click(row);

    expect(handleSelect).toHaveBeenCalledWith('1');
  });
});
