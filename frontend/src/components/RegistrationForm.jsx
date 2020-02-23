import React, {useState} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import '../css/RegistrationForm.css'
import { RECAPTCHA_CLIENT_KEY } from '../constants/configs'
import { registerUser } from '../utils/api'

const RegistrationForm = () => {
    const initialFormValue = { name: '', email: '', password: '', passwordrepeat: '' }
    const initialFormState = { 
        isLoading: false,
        message: '',
        isError: false,
        nameError: '',
        emailError: '',
        passwordError: '',
        passwordrepeatError: '',
    }
    const [captchaVisible, setCaptchaVisible] = useState(false)
    const [formState, setFormState] = useState({ ...initialFormState })
    const [formValues, setFormValues] = useState({ ...initialFormValue })

    const handleInputChange = e => {
        const {name, value} = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const nameValidation = () => {
        if ((/^(\w+\s?)*\s*.{3,}/).test(formValues.name)) {
            setFormState({ ...formState, nameError: '' })
            return true
        }
        setFormState({ ...formState, nameError: 'Please enter a valid name' })
    }
    
    const emailValidation = () => {
        if ((/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(formValues.email)) {
            setFormState({ ...formState, emailError: '' })
            return true
        }
        setFormState({ ...formState, emailError: 'Please enter a valid email' })
    }

    const passwordValidation = () => {
        if ((/(?=.{8,})/).test(formValues.password)) {
            setFormState({ ...formState, passwordError: '' })
            formValues.passwordrepeat && repeatpasswordValidation()
            return true
        }
        setFormState({ ...formState, passwordError: 'Password should be atleast 8 characters long' })
    }

    const repeatpasswordValidation = () => {
        if (!formValues.password || formState.passwordError) {
            return passwordValidation()
        }
        if (formValues.password === formValues.passwordrepeat) {
            setFormState({ ...formState, passwordrepeatError: '' })
            return true
        }
        setFormState({ ...formState, passwordrepeatError: 'Password does not match' })
    }

    const submitData = (e) => {
        e.preventDefault()
        formState.isLoading || postRegistrationData()
    }

    const postRegistrationData = async (captchaValue) => {
        if (
            !(
                nameValidation() && 
                emailValidation() && 
                passwordValidation() && 
                repeatpasswordValidation()
            )
        ) {
            captchaVisible && captchaVisible(false)
            return 
        }
        setFormState({ ...initialFormState,  isLoading: true })
        captchaVisible && setCaptchaVisible(false)
        const { name, email, password } = formValues
        const postData = {
            name, 
            email, 
            password,
            captchaValue,
        }
        const response = await registerUser(postData)
        if ([401, 429,].includes(response.status)) {
            setCaptchaVisible(true)
        }
        else if(!response.data.success) {
            setFormState({ isLoading: false, isError: true, message: response.data.message })
        }
        else {
            setFormValues({ ...initialFormValue })
            setFormState({ ...initialFormState, message: response.data.message })
        }
    }

    return (
        <form className="registration-form">
            <div className="container">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr/>
                <label htmlFor="name"><b>Name</b></label>
                <input 
                    type="text" 
                    placeholder="Enter Name" 
                    name="name" 
                    onChange={handleInputChange}
                    onBlur={nameValidation}
                    value={formValues.name}
                />
                <p className="error">
                    { formState.nameError }
                </p>
                <label htmlFor="email"><b>Email</b></label>
                <input 
                    type="text" 
                    placeholder="Enter Email" 
                    name="email" 
                    onChange={handleInputChange}
                    onBlur={emailValidation}
                    value={formValues.email}
                />
                <p className="error">
                    { formState.emailError }
                </p>
                <label htmlFor="password"><b>Password</b></label>
                <input 
                    type="password" 
                    placeholder="Enter Password" 
                    name="password" 
                    onChange={handleInputChange}
                    onBlur={passwordValidation}
                    value={formValues.password}
                />
                <p className="error">
                    { formState.passwordError }
                </p>
                <label htmlFor="passwordrepeat"><b>Repeat Password</b></label>
                <input 
                    type="password" 
                    placeholder="Repeat Password" 
                    name="passwordrepeat"
                    onChange={handleInputChange}
                    onBlur={repeatpasswordValidation}
                    value={formValues.passwordrepeat}
                />
                <p className="error">
                    { formState.passwordrepeatError }
                </p>
                <div className="clearfix">
                    <button 
                        type="submit" 
                        className="signupbtn" 
                        onClick={submitData}
                    >
                        { formState.isLoading ? 'Loading...' : 'Submit' }
                    </button>
                </div>
                <p className={formState.isError ? 'error' : 'success-msg'}>
                    { formState.message }
                </p>
                {
                    captchaVisible && (
                        <div className="captcha-container">
                            <ReCAPTCHA
                                sitekey={RECAPTCHA_CLIENT_KEY}
                                onChange={postRegistrationData}
                            />
                        </div>
                    )
                }
            </div>
        </form>
    )
}

export default RegistrationForm
