import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKey } from 'react-icons/md';
import { MdEmail } from 'react-icons/md';

import { InputEmail, InputPassword } from '../../common/ALLINPUTS/AllInputs';
import Loader from '../../Loader/Loader';
import { useStateContext } from '../../Contexts/StateContext';
import { useFunctionContext } from '../../Contexts/FunctionContext';

import Joi from 'joi';
import { toastOptions } from '../../../Utils/FakeRoutes';
import { useThemeContext } from '../../Contexts/ThemesContext';
import { publicIpv4 } from 'public-ip';
import { fullBrowserVersion } from 'react-device-detect';
import { backEndCallObjNoEnc } from '../../../services/mainService';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loadingTerm, setLoadingTerm, loading, setLoading } =
    useStateContext();
  const { applicationColor } = useThemeContext();
  const [isValid, setIsValid] = useState({ email: false, password: false });
  const employeeLoginSchema = {
    email: Joi.string()
      .min(10)
      .max(25)
      .email({ tlds: { allow: ['com', 'net', 'org'] } })
      .required()
      .label('Email'),

    fcm_token: Joi.string(),
  };

  const { checkErrors } = useFunctionContext();

  // navigation hook
  const navigate = useNavigate();

  const EmployeeLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoadingTerm('login');
      setLoading(true);
      await checkErrors(employeeLoginSchema, formData);

      formData.last_ip = await publicIpv4();
      formData.device_id = fullBrowserVersion;
      formData.fcm_token = 'staging';
      console.log(formData, 'fjnj');

      const response = await backEndCallObjNoEnc(
        '/user/login',
        formData,
        'loginEmployee'
      );
      console.log(response, 'responer');
      // settingTokens.settingEmployeeToken(response.detail);
      // setLoadingTerm('');
      // if (
      //   Object.keys(employeeDetails).length > 0 ||
      //   localStorage.getItem('zohoEmployeeToken')
      // ) {
      //   setTimeout(() => {
      //     window.location.href = '/';
      //   }, 0);
      // }

      toastOptions.success('Successfully Login');
    } catch (error) {
      setLoading(false);

      toastOptions.error(error?.response?.data || 'SomeThing Got Wrong');
      setLoadingTerm('');
    } finally {
      setLoading(false);
      setLoadingTerm('');
    }
  };
  const validateField = (name, value) => {
    const schema = Joi.object(employeeLoginSchema);
    const { error } = schema.extract(name).validate(value);
    return !error;
  };

  useEffect(() => {
    const emailValid = validateField('email', formData.email);
    const passwordValid = validateField('password', formData.password);
    setTimeout(() => {
      setIsValid({ email: emailValid, password: passwordValid });
    }, 0);
  }, [formData]);

  return (
    <>
      <form className='employee-login-form' onSubmit={EmployeeLoginSubmit}>
        <div className='greetings mb-3'>
          <h2 className='welcome mb-2'>Welcome Back</h2>
          <h4 className='details mb-2'>Please enter your account details</h4>
        </div>
        {/* <div className="comapany-logo">
          <img src={cglogo} alt="logo" />
        </div> */}
        <InputEmail
          type={'email'}
          placeholder={'Email'}
          name={'email'}
          value={formData['email']}
          setForm={setFormData}
          schema={employeeLoginSchema.email}
          imp
          icon={<MdEmail />}
        />
        <InputPassword
          type={'password'}
          placeholder={'Password'}
          name={'password'}
          value={formData['password']}
          setForm={setFormData}
          id={'password'}
          schema={employeeLoginSchema.password}
          imp
          icon={<MdOutlineKey />}
        />

        <h5
          className='forgot-password'
          onClick={() => navigate('/resetpassword')}
        >
          <span>Set Password</span>
        </h5>

        <div className='employee-button'>
          <button
            className='employee-form-button'
            style={{
              background: applicationColor.tabColor,
            }}
            disabled={!isValid.email || !isValid.password || loading}
          >
            {' '}
            {loading && loadingTerm === 'login' ? <Loader /> : 'Sign in'}{' '}
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
