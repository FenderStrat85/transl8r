import { render, screen, fireEvent } from '@testing-library/react';
import apiService from '../../services/apiService';
import ImageForm from './ImageForm';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';

describe('Image form', () => {

  const credentials = {
    languageFromName: 'Spanish',
    languageToName: 'French',
    imageUrl: 'www.google.com/images',
    jobType: 'image',
    jobName: 'Image test',
    jobDescription: 'This is to test the image submission'
  }

  test('The form should render correctly', () => {
    render(<ImageForm jobType="image" />);
    screen.getByText(/Image Submission Form/);
    screen.getByPlaceholderText(/Give your job a name!/);
    screen.getByPlaceholderText(/Tell the translator about the job/);
    screen.getByText(/Select languages:/);
    screen.getByText(/language from/);
    screen.getByText(/language to/);
    screen.getByText(/Choose File/)
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
  test('The customer is able to select a language to', () => {
    render(<ImageForm jobType="image" />);
    const languageToSelect = screen.getByText(
      /language to/,
    ) as HTMLInputElement;
    //select the language and then check it is rendered in the DOM to confirm
    //selection has worked.
    selectEvent.select(screen.getByText(/language to/), 'English');
    expect(screen.getByText(/🇬🇧 English/));
  });

  // OnSubmit calls another function apart from the API, a mock function is needed
  // test('The user can create an image job', () => {
  //   const spyImageJobCreation = jest.spyOn(apiService, 'createJob')
  //   render(<ImageForm jobType='image' />);
  //   const jobNameInput = screen.getByPlaceholderText(/Give your job a name!/);
  //   const jobDescriptionInput = screen.getByPlaceholderText(/Tell the translator about the job/);
  //   const languageFromSelect = screen.getByText(
  //     /language from/,
  //   ) as HTMLInputElement;
  //   const languageToSelect = screen.getByText(
  //     /language to/,
  //   ) as HTMLInputElement;

  //   const submitButton = screen.getByRole('button', { name: 'Submit your job' });
  //   userEvent.type(jobNameInput, 'Image test');
  //   userEvent.type(jobDescriptionInput, 'This is to test the image submission');
  //   selectEvent.select(screen.getByText(/language from/), 'Spanish');
  //   selectEvent.select(screen.getByText(/language to/), 'French');

  //   userEvent.click(submitButton)

  //   expect(spyImageJobCreation).toHaveBeenCalledWith(credentials)
  // });


});
