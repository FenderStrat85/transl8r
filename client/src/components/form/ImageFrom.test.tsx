import { render, screen, fireEvent } from '@testing-library/react';
import apiService from '../../services/apiService';
import ImageForm from './ImageForm';
import userEvent from '@testing-library/user-event';

describe('Image form', () => {
  test('The form should render correctly', () => {
    render(<ImageForm jobType="image" />);
    screen.getByText(/Image Submission Form/);
    screen.getByPlaceholderText(/Give your job a name!/);
    screen.getByPlaceholderText(/Tell the translator about the job/);
    screen.getByText(/Select languages:/);
    screen.getByText(/language from/);
    screen.getByText(/language to/);
  });
});
