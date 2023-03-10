import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google'
import ErrorLabel from '../components/errolLabel';
import styles from '../styles/login.module.css';
import logo from '../../public/images/Logo.png'
import { emailValidation, getRolName, intialBannerState } from '@/utils/utils';
import { BannerRenderType, LoginErrorMessages, LoginForm } from '@/utils/types';
import { EMAIL_ERROR_MESSAGE, INVALID_CREDENTIALS } from '@/utils/constants';
import { loginService, initDBService } from '@/service/login.service';
import Image from 'next/image';
import Banner from '@/components/banner';
import Router from 'next/router';



export default function Home() {

  const [errorMessage, setErrorMessage] = useState<LoginErrorMessages>({emailMessage: null, isReadyToSubmit: false});
  const [banner, setBanner] =useState<BannerRenderType>(intialBannerState);
  const [loginForm, setLoginForm] = useState<LoginForm>({email: '', password:''})

  /**
   * Create DB and load info
   */
  useEffect( () => {
    initDBService();
 },[]);


  const validateEmailFormat = (event : React.ChangeEvent<HTMLInputElement>):void => {
    setLoginForm({...loginForm, email: event.target.value});

    if(emailValidation.test(event.target.value)){

      setErrorMessage({
        emailMessage: null, 
        isReadyToSubmit: true
      });
    } else{
      setErrorMessage({
        emailMessage: EMAIL_ERROR_MESSAGE,
        isReadyToSubmit: false
      })
    } 
  }

  const callLoginService = () => {
  
      if(errorMessage.isReadyToSubmit){
      
       loginService(loginForm).then((user: any) => {
       if(user?.rol){
           localStorage.setItem('ROL',getRolName(user.rol));
           Router.push('/enterprises');
         } else {
          
          }
        }).catch(error => {
          setBanner({
            message: INVALID_CREDENTIALS,
            variant: 'danger',
            show: true
          })
        }
        );
        }
    } 
  
  return (
    <>
    <div className={banner.show? styles.loginContainerError:  styles.loginContainer}>
    {banner.show && <Banner message={banner?.message} variant={banner?.variant} /> }
      <div className={styles.logo}>
        <Image alt='' width="150" height="80" src={logo.src}></Image>
      </div>
      <div className={styles.input_container}>
        <input  data-testid='email-test' className={styles.input} placeholder="User" onChange={(event) => validateEmailFormat(event)} id={styles.input1}></input>
        <ErrorLabel errorMessage={errorMessage.emailMessage} />
        <input 
          className={styles.input} 
          placeholder="Password" 
          type="password" 
          id={styles.input2} 
          onChange={(event) => setLoginForm({...loginForm, password: event.target.value})}>
          </input>
        <button  data-testid='login-test-id' disabled={!errorMessage.isReadyToSubmit} className={styles.login_button} onClick={callLoginService}> Login
        </button>
      </div>
      <div className={styles.container_password}>
        <div className={styles.title}>Forgot Password</div>
      </div>
      <button className={styles.register_button}>
        Sing in
      </button>
    </div>
    </>
  )
};
