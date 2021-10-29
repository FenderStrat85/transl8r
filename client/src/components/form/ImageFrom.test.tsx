import { render, screen, fireEvent } from '@testing-library/react';
import apiService from '../../services/apiService';
import ImageForm from './ImageForm';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';

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
  test('The customer is able to select a language from', () => {
    render(<ImageForm jobType="image" />);
    const languageFromSelect = screen.getByText(
      /language from/,
    ) as HTMLInputElement;
    //select the language and then check it is rendered in the DOM to confirm
    //selection has worked.
    selectEvent.select(screen.getByText(/language from/), 'English');
    expect(screen.getByText(/🇬🇧 English/));
  });
});
