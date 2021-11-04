import { render, screen, fireEvent } from '@testing-library/react';
import apiService from '../../services/apiService';
import ChatAndVideoForm from './ChatAndVideoForm';
import userEvent from '@testing-library/user-event';
import selectEvent from 'react-select-event';

const jobCredentials = {
  jobName: 'Video example job',
  jobDescription: 'Testing the video job creation form',
  languageFrom: 'English',
  languageTo: 'Chinese'
}
describe('Video form', () => {

  test('The form should render correctly', () => {
    render(<ChatAndVideoForm jobType='video' />)
    screen.getByText(/Join a video/);
    screen.getByPlaceholderText(/Give a short name to your request/);
    screen.getByPlaceholderText(/Tell the translator about the request/);
    screen.getByText(/Select languages:/);
    screen.getByText(/language from/);
    screen.getByText(/language to/);
  });
  test('The customer is able to select a language from', () => {
    render(<ChatAndVideoForm jobType="video" />);
    const languageFromSelect = screen.getByText(
      /language from/,
    ) as HTMLInputElement;
    //select the language and then check it is rendered in the DOM to confirm
    //selection has worked.
    selectEvent.select(screen.getByText(/language from/), 'English');
    expect(screen.getByText(/🇬🇧 English/));
  });
  test('The customer is able to select a language to', () => {
    render(<ChatAndVideoForm jobType="video" />);
    const languageToSelect = screen.getByText(
      /language to/,
    ) as HTMLInputElement;
    //select the language and then check it is rendered in the DOM to confirm
    //selection has worked.
    selectEvent.select(screen.getByText(/language to/), 'English');
    expect(screen.getByText(/🇬🇧 English/));
  });



})