import { render, screen, fireEvent } from '@testing-library/react';
import apiService from '../../services/apiService';
import ChatAndVideoForm from './ChatAndVideoForm';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';
import { ILanguage } from '../../interfaces/interfaces';
import languageChoice from '../../constants/languageChoice';

const jobCredentials = {
  jobName: 'Video example job',
  jobDescription: 'Testing the video job creation form',
  languageFrom: 'English',
  languageTo: 'Chinese',
};

const jobType = 'chat';
const accessToken = '1234abcd';
const options: ILanguage[] = languageChoice;

describe('Video form', () => {
  test('The form should render correctly', () => {
    render(<ChatAndVideoForm jobType="video" />);
    screen.getByText(/Join a video/);
    screen.getByPlaceholderText(/Give a short name to your request/);
    screen.getByPlaceholderText(/Tell the translator about the request/);
    screen.getByText(/Select languages:/);
    screen.getByText(/language from/);
    screen.getByText(/language to/);
  });
  test('The customer is able to select a language from', () => {
    //select the language and then check it is rendered in the DOM to confirm
    //selection has worked.
    render(<ChatAndVideoForm jobType="video" />);
    const languageFromSelect = screen.getByText(
      /language from/,
    ) as HTMLInputElement;
    selectEvent.select(languageFromSelect, '🇬🇧 English');
    expect(screen.getByText(/🇬🇧 English/));
  });

  test('The customer is able to select a language to', () => {
    render(<ChatAndVideoForm jobType="video" />);
    const languageToSelect = screen.getByText(
      /language to/,
    ) as HTMLInputElement;
    //select the language and then check it is rendered in the DOM to confirm
    //selection has worked.
    selectEvent.select(languageToSelect, '🇬🇧 English');
    expect(screen.getByText(/🇬🇧 English/));
  });

  test('Upon submission of the form, the createJob function is not called, unless languages are selected', () => {
    const spyChatJobCreation = jest.spyOn(apiService, 'createJob');
    render(<ChatAndVideoForm jobType="video" />);
    const jobNameInput = screen.getByPlaceholderText(
      /Give a short name to your request/,
    );
    const jobDescriptionInput = screen.getByPlaceholderText(
      /Tell the translator about the request/,
    );
    const submitButton = screen.getByRole('button', { name: 'Submit request' });

    userEvent.type(jobNameInput, 'Video example job');
    userEvent.type(jobDescriptionInput, 'Video the chat job creation form');
    selectEvent.select(screen.getByText(/language from/), '🇬🇧 English');
    selectEvent.select(screen.getByText(/language to/), '🇨🇳 Chinese');

    userEvent.click(submitButton);
    expect(spyChatJobCreation).toHaveBeenCalledTimes(0);
    screen.getByText(/Please select languages/);
  });
});
