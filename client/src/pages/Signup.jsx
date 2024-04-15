import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import UserForm from '../components/UserForm';
import SubscriptionForm from '../components/SubscriptionForm';
import AddressForm from '../components/AddressForm';

function SignUp() {

  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    addressLine: '',
    city: '',
  });

  const [subscription, setSubscription] = useState({
    username: userInfo.username,
    quota: '',
    subType: '',
    price: '',
  });

  const [step, setStep] = useState(1);
  
  const navigate = useNavigate();
  
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <Link to='/'>
        <img src={logo} alt='logo'className='absolute left-8 top-8 w-32 md:w-36 lg:w-40 h-auto' />
      </Link>
      {step === 1 && <UserForm setUserInfo={setUserInfo} setStep={setStep}/>}
      {step === 2 && <SubscriptionForm setSubscription={setSubscription} setStep={setStep}/>}
      {step === 3 && <AddressForm setUserInfo={setUserInfo} setStep={setStep}/>}
    </div>
  )
}

export default SignUp