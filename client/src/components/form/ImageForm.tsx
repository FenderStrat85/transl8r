import { useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from '../../services/apiService';
import languageChoice from '../../constants/languageChoice';
import Select from 'react-select';
import { ILanguage } from '../../interfaces/interfaces';
import BackButton from '../button/BackButton';
import ErrorMessageComponent from '../../utils/ErrorMessageComponent';

const ImageForm = (props: { jobType: string }): JSX.Element => {
  const history = useHistory<History>();
  const accessToken = localStorage.getItem('accessToken');
  const options = languageChoice;
  const { jobType } = props;

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFrom, setSelectedFrom] = useState<ILanguage>();
  const [selectedTo, setSelectedTo] = useState<ILanguage>();
  const [myError, setMyError] = useState('');

  const initialState = {
    jobName: '',
    jobDescription: '',
  };
  const [formValue, setFormValue] = useState(initialState);

  const handleSelectedFrom = (event: any): void => {
    setMyError('');
    setSelectedFrom(event);
  };

  const handleSelectedTo = (event: any): void => {
    setMyError('');
    setSelectedTo(event);
  };

  const previewFile = (file: Blob): void => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  const handleFileInputChange = (event: any): void => {
    const file = event.target.files[0];
    const extension = file.name.split('.').reverse()[0].toLowerCase();
    const supportedExtensions = ['png', 'jpeg', 'heic', 'gif', 'jpg'];
    if (supportedExtensions.includes(extension)) {
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(event.target.value);
    } else {
      alert('This image is not an image');
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      if (!selectedFrom || !selectedTo) {
        setMyError('PLEASE SELECT LANGUAGES');
        return;
      } else if (selectedFrom?.value === selectedTo?.value) {
        setMyError('selected Languages must be different');
        return;
      } else {
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
          uploadImage();
        };
        reader.onerror = () => {
          console.error('ERROR!!');
        };
      }
    } catch (error) {
      console.log(error);
    }
    console.log('uploaded!');
  };

  const uploadImage = async (): Promise<void> => {
    const imgToUpload = (document.getElementById('user') as HTMLInputElement)
      .src;
    const data = new FormData();
    data.append('file', imgToUpload);
    data.append('upload_preset', 'transl8r');

    // call to the api cloudinary need to be setup
    const res = await fetch(`${process.env.REACT_APP_CLOUDINARY_API_KEY}`, {
      method: 'POST',
      body: data,
    });
    const { secure_url } = await res.json();

    try {
      let languageFromName = selectedFrom?.value;
      let languageToName = selectedTo?.value;
      const objToSendBackToTheDb = {
        ...formValue,
        languageFromName,
        languageToName,
        imageUrl: secure_url,
      };
      const res = await apiService.createJob(
        objToSendBackToTheDb,
        jobType,
        accessToken,
      );
      if (res.error) {
        alert(`${res.message}`);
        setFormValue(initialState);
      }
      history.push(`/app/customer/dashboard`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="image-form">
        <h1 className="image-form__header">Image Submission Form</h1>
        <form className="image-form__form" onSubmit={handleSubmit}>
          <input
            className="image-form__input"
            type="text"
            name="jobName"
            placeholder={'Give your job a name!'}
            onChange={(event) => handleInputChange(event)}
            required
          />
          <textarea
            className="image-form__text-area"
            name="jobDescription"
            placeholder={'Tell the translator about the job'}
            onChange={(event) => handleInputChange(event)}
            required
          />
          {myError ? <ErrorMessageComponent message={myError} /> : null}
          <h3>Select languages:</h3>
          <Select
            data-testid="language-from-select"
            className="image-form__select"
            options={options}
            value={selectedFrom}
            placeholder={'language from'}
            onChange={(event) => handleSelectedFrom(event)}
          />
          <Select
            className="image-form__select"
            options={options}
            value={selectedTo}
            placeholder={'language to'}
            onChange={(event) => handleSelectedTo(event)}
          />
          <label className="image-form__choose-button" htmlFor="fileInput">
            Choose File
          </label>
          <input
            className="image-form__image-select"
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
            required
            style={{ display: 'none' }}
          />
          {previewSource && (
            <img
              className="image-form__image-preview"
              src={previewSource}
              id="user"
              crossOrigin="anonymous"
              alt="chosen"
            />
          )}
          <button className="image-form__button" type="submit">
            Submit your job
          </button>
        </form>
        <BackButton />
      </div>
    </>
  );
};

export default ImageForm;
