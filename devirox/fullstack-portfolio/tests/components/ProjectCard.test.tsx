import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from '../../src/components/ProjectCard';

describe('ProjectCard', () => {
  const project = {
    title: 'Test Project',
    description: 'This is a test project description.',
    link: 'https://example.com',
  };

  it('renders the project title', () => {
    render(<ProjectCard project={project} />);
    const titleElement = screen.getByText(/Test Project/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the project description', () => {
    render(<ProjectCard project={project} />);
    const descriptionElement = screen.getByText(/This is a test project description./i);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders a link to the project', () => {
    render(<ProjectCard project={project} />);
    const linkElement = screen.getByRole('link', { name: /Test Project/i });
    expect(linkElement).toHaveAttribute('href', project.link);
  });
});