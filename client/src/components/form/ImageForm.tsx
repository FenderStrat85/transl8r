//@ts-nocheck
import { useState, useContext, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from '../../services/apiService';
import { UserContext } from '../../context/Context';
import languageChoice from '../../constants/languageChoice';
import Select from 'react-select';
import { Language } from '../../interfaces/interfaces';
import DashboardButton from '../button/DashboardButton';

const ImageForm = (): JSX.Element => {
  const { user } = useContext(UserContext);
  const accessToken = localStorage.getItem('accessToken');
  const history = useHistory();
  const jobType = 'image';
  const options = languageChoice;
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFrom, setSelectedFrom] = useState<Language>();
  const [selectedTo, setSelectedTo] = useState<Language>();

  const initialState = {
    jobName: '',
    jobDescription: '',
  };

  const [formValue, setFormValue] = useState(initialState);

  const previewFile = (file: Blob): void => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as any);
      //console.log(imageUser);
    };
  };

  const handleFileInputChange = (event: any): void => {
    const file = event.target.files[0];
    const extension = file.name.split('.').reverse()[0].toLowerCase();
    const supportedExtensions = ['png', 'jpeg', 'heic', 'gif', 'jpg'];
    //TODO: add supported extensions
    if (supportedExtensions.includes(extension)) {
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(event.target.value);
    } else {
      //TODO: redirect to an error page
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
      if (!selectedFile) return;
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        uploadImage();
      };
      reader.onerror = () => {
        console.error('ERROR!!');
      };
    } catch (error) {
      console.log(error);
    }
  };

  const toSelectJob = (): void => {
    history.push(`/app/customer/selectjob`);
  };

  const uploadImage = async (): Promise<void> => {
    //TODO: It's better to use React's way of handing HTML elements (refs) instead of using the native DOM API (getElementById).
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
      console.log(languageFromName);
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="jobName"
              placeholder={'Give your job a name!'}
              onChange={(event) => handleInputChange(event)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="jobDescription"
              placeholder={'Tell the translator about the job'}
              onChange={(event) => handleInputChange(event)}
              required
            />
          </div>
          <h3>What language do you need translating from?</h3>
          {/* <pre>{JSON.stringify(selected)}</pre> */}
          <Select
            options={options}
            value={selectedFrom}
            onChange={setSelectedFrom}
            // labelledBy="Select"
          />
          <h3>What languages do you need translating to?</h3>
          {/* <pre>{JSON.stringify(selected)}</pre> */}
          <Select
            options={options}
            value={selectedTo}
            onChange={setSelectedTo}
            // labelledBy="Select"
          />

          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
          />
          <button type="submit">Submit your job</button>
        </div>
        {previewSource && (
          <img
            src={previewSource}
            id="user"
            crossOrigin="anonymous"
            alt="chosen"
          />
        )}
      </form>
      <button onClick={toSelectJob}>Submit a different job</button>
      <DashboardButton role={user.role} />
    </div>
  );
};

export default ImageForm;
