import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import UserForm from '../components/UserForm';
import SubscriptionForm from '../components/SubscriptionForm';
import AddressForm from '../components/AddressForm';
import { motion, AnimatePresence } from 'framer-motion';

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

  const variants = {
    hidden: { opacity: 0, x: '10vw', transition: { duration: 0.6, ease: "anticipate" } },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, x: '-10vw', transition: { duration: 0.5, ease: "easeInOut" } },
  }
  
  return (
    <div className='bg-gray-100 flex items-center justify-center h-screen'>
      <Link to='/'>
        <img src={logo} alt='logo'className='absolute left-8 top-8 w-32 md:w-36 lg:w-40 h-auto' />
      </Link>
      
      <AnimatePresence mode='wait' initial={false}>
        {step === 1 && (
          <motion.div
            key="userForm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <UserForm setUserInfo={setUserInfo} setStep={setStep} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="subscriptionForm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <SubscriptionForm setSubscription={setSubscription} setStep={setStep} />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="addressForm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            <AddressForm setUserInfo={setUserInfo} setStep={setStep} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SignUp