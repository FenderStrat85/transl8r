import { useState, useContext, SetStateAction, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import apiService from '../../services/Api.Service';
import { UserContext } from '../../services/Context';
import languageChoice from '../../assets/languageChoice';
import Select from 'react-select';

const ImageJobForm = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const accessToken = user.token;
  const jobType = 'image';
  const options = languageChoice;
  const [selectedTo, setSelectedTo] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState([]);
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [imageUser, setImageUser] = useState(['']);

  const initialState = {
    jobName: '',
    languageFromName: '',
    languageToName: '',
    jobDescription: '',
    imageUrl: '',
  };

  const [formValue, setFormValue] = useState(initialState);

  const previewFile = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      //console.log(imageUser);
    };
  };

  const handleFileInputChange = (e: {
    target: { files: any[]; value: SetStateAction<string> };
  }) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(selectedTo);
    // formValue.languageFromName = selectedFrom.value.toString();
    // formValue.languageToName = selectedTo.value.toString();
    console.log(formValue);
    // try {
    //   const res = await apiService.createJob(formValue, jobType, accessToken);
    //   if (res.error) {
    //     alert(`${res.message}`);
    //     setFormValue(initialState);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    event.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage();
    };
    reader.onerror = () => {
      console.error('ERROR!!');
    };
  };

  const uploadImage = async () => {
    const imgToUpload = (document.getElementById('user') as HTMLInputElement)
      .src;
    const data = new FormData();
    data.append('file', imgToUpload);
    data.append('upload_preset', 'transl8r');

    // call to the api cloudinary need to be setup
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/uro00/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );

    const img = await res.json();
    console.log(typeof img.secure_url);
    const imgsec = img.secure_url;

    setFormValue((prevState) => {
      return {
        ...prevState,
        imageUrl: imgsec,
      };
    });
  };

  return (
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
          <input
            className="form-control"
            type="text"
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
  );
};

export default ImageJobForm;
