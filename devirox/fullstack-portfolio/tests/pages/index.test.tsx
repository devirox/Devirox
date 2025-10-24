import { render, screen } from '@testing-library/react';
import Home from '../../src/pages/index';

describe('Home Page', () => {
  test('renders the homepage correctly', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /welcome to my portfolio/i });
    expect(heading).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    const projectsLink = screen.getByRole('link', { name: /projects/i });
    expect(projectsLink).toBeInTheDocument();

    const contactLink = screen.getByRole('link', { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
  });
});