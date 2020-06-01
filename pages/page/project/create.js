import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CreateProject = () => {
  const [tags, setTag] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      name: '',
      description: '',
      beneficiary: '',
      period: 'mon',
      duration: 0,
      executionPlan: ''
    }
  });
  const onSubmitHandler = async (data) => {
    const project = { ...data, tags, createdBy: '5ec5248ce52d3c222ceb84b9' };
    try {
      const response = await axios.post('/api/project', project);
      const responseData = response.data;
      reset();
      setSuccessMessage('Succesfully created project.');
      setTimeout(() => {
        window.location.assign(`/page/project/${responseData.id}`);
      }, 1000);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div>
      <Head>
        <link href="/style.css" rel="stylesheet" />
      </Head>
      <div
        className="alert-box"
        style={{
          background: errorMessage ? '#ff0000ad' : '#32cd32a1',
          display: errorMessage || successMessage ? 'block' : 'none'
        }}
      >
        {errorMessage ? (
          <div className="error">
            <span>{errorMessage}</span>
          </div>
        ) : null}
        {successMessage ? (
          <div className="success">
            <span>{successMessage}</span>
          </div>
        ) : null}
      </div>
      <form name="createProjectForm" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <legend className="header">
          <span>Create a project</span>
        </legend>
        <fieldset className="form-items">
          <div className="input-item">
            <label>
              Name <br />
              <input placeholder="Project name" name="name" ref={register({ required: true, minLength: 3 })} />
              <br />
              <span className="validation-errors">
                {errors.name && 'Field is required and must be greater than 3 characters'}
              </span>
            </label>
          </div>
          <div className="input-item">
            <label>
              Beneficiary
              <br />
              <input placeholder="Enter item" name="beneficiary" ref={register({ required: true })} />
              <br />
              <span className="validation-errors">{errors.beneficiary && 'Field is required.'}</span>
            </label>
          </div>

          <div className="input-item" style={{ display: 'inline-flex' }}>
            <label>
              Budget/Cost
              <br />
              <input
                placeholder="1"
                type="number"
                style={{ width: '90%' }}
                name="cost"
                ref={register({ required: true, min: 1 })}
              />{' '}
              <br />
              <span className="validation-errors">
                {errors.cost && 'Field is required and must be greater than 0.'}
              </span>
            </label>
            <label>
              <br />
              <select style={{ width: '100%' }} defaultValue="XAF" name="currency" ref={register()}>
                <option value="XAF"> FCFA </option>
                <option value="USD"> USD </option>
              </select>
            </label>
          </div>
          <div className="input-item" style={{ display: 'inline-flex' }}>
            <label>
              Execution period
              <br />
              <input
                placeholder="1"
                type="number"
                style={{ width: '90%' }}
                name="duration"
                ref={register({ required: true, min: 1 })}
              />{' '}
              <br />
              <span className="validation-errors">
                {errors.duration && 'Field is required and must be greater than 0.'}
              </span>
            </label>
            <label>
              <br />
              <select style={{ width: '100%' }} defaultValue="mon" name="period" ref={register()}>
                <option value="wks"> Weeks </option>
                <option value="mon"> Months </option>
                <option value="yrs"> Years </option>
              </select>
            </label>
          </div>
          <div className="input-item">
            <label>
              Description <br />
              <textarea
                cols="30"
                rows="5"
                name="description"
                className="project-details"
                placeholder="Project details"
                ref={register({ required: true, minLength: 1 })}
              ></textarea>{' '}
              <br />
              <span className="validation-errors">
                {errors.description && 'Field is required and must be greater than 100 characters'}
              </span>
            </label>
          </div>

          <div className="input-item">
            <label>
              Execution plan
              <br />
              <textarea
                cols="30"
                rows="5"
                name="executionPlan"
                className="project-plan"
                placeholder="Project details"
                ref={register({ required: true, minLength: 1 })}
              ></textarea>
              <br />
              <span className="validation-errors">
                {errors.executionPlan && 'Field is required and must be greater than 100 characters'}
              </span>
            </label>
          </div>
          <div className="input-item">
            <label>
              Tags
              <br />
              <input
                placeholder="Enter item"
                name="tags"
                onKeyUp={({ keyCode, currentTarget }) => {
                  if (keyCode === 13 || keyCode === 188) {
                    const newTag = currentTarget.value.replace(',', '');
                    setTag(tags.concat(newTag));
                    currentTarget.value = '';
                  }
                }}
              />
            </label>
            <div className="tags">
              {tags.map((tag, i) => (
                <div className="tag" key={`tags${i}`}>
                  <span>{tag}</span>
                  <span className="close"></span>
                </div>
              ))}
            </div>
          </div>
        </fieldset>
        <fieldset className="form-actions">
          <button className="button-primary" type="submit">
            Update
          </button>
          <button className="button-default" type="reset">
            Cancel
          </button>
        </fieldset>
      </form>
    </div>
  );
};
export default CreateProject;
