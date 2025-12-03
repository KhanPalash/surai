import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SurAIApp from '../App';

// Mocking fetch
global.fetch = vi.fn();

const createFetchResponse = (data) => {
  return { json: () => new Promise((resolve) => resolve(data)), ok: true };
};

describe('SurAIApp', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the login screen initially', () => {
    render(<SurAIApp />);
    expect(screen.getByText('SurAI')).toBeInTheDocument();
  });

  it('logs in a regular user and navigates to the home screen', () => {
    render(<SurAIApp />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@test.com' } });
    fireEvent.click(screen.getByText('Sign in (Mock)'));
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('FREE TIER')).toBeInTheDocument();
  });

  it('logs in a premium user and navigates to the home screen', () => {
    render(<SurAIApp />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'admin@surai.com' } });
    fireEvent.click(screen.getByText('Sign in (Mock)'));
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.getByText('VIP PRO')).toBeInTheDocument();
  });

  it('navigates to the generate screen', () => {
    render(<SurAIApp />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@test.com' } });
    fireEvent.click(screen.getByText('Sign in (Mock)'));
    fireEvent.click(screen.getByText('Create New Song'));
    expect(screen.getByText('Lyrics / Concept')).toBeInTheDocument();
  });

  it('updates the prompt and style prompt', () => {
    render(<SurAIApp />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@test.com' } });
    fireEvent.click(screen.getByText('Sign in (Mock)'));
    fireEvent.click(screen.getByText('Create New Song'));

    fireEvent.change(screen.getByPlaceholderText('Write lyrics or song idea...'), { target: { value: 'My new song lyrics' } });
    fireEvent.change(screen.getByPlaceholderText('E.g., Upbeat Pop, Female Vocals...'), { target: { value: 'Synthwave' } });

    expect(screen.getByDisplayValue('My new song lyrics')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Synthwave')).toBeInTheDocument();
  });

  it('shows the premium modal for non-premium users', async () => {
    fetch.mockResolvedValue(createFetchResponse({ candidates: [{ content: { parts: [{ text: 'some chords' }] } }] }));

    render(<SurAIApp />);
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@test.com' } });
    fireEvent.click(screen.getByText('Sign in (Mock)'));

    fireEvent.click(screen.getByText('Create New Song'));
    fireEvent.change(screen.getByPlaceholderText('E.g., Upbeat Pop, Female Vocals...'), { target: { value: 'Synthwave' } });
    fireEvent.click(screen.getByText('Generate & Open Studio'));

    await waitFor(() => {
        expect(screen.getByText('Project Untitled Project')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Export'));

    await waitFor(() => {
      expect(screen.getByText('Unlock Pro Studio')).toBeInTheDocument();
    });
  });
});
