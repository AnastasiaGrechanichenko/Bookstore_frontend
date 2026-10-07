import React from 'react'
import { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {useAuthStore} from '../../store/useAuthStore'
import './RegisterPage.css'

export default function RegisterPage() {
  const [agree,setAgree] = useState(false);
  const[login,setLogin]=useState('')
  const[password,setPassword]=useState('')
  const[name,setName]=useState('')
  const[age,setAge]=useState('')
  const[email,setEmail]=useState('')
  const[phone,setPhone]=useState('')

  const {register,isLoading,error,clearError} = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    clearError();

    if(!agree) {
      return;
    }

    try {
      await register ({
        login,
        password,
        name,
        age:Number(age),
        email:email.trim()||null,
        contact_number: phone.trim() || null,
      });
      navigate('/');
    } catch {
    }
  }

    const handlePhoneChange = (e) => {
      let value = e.target.value.replace(/\D/g, '');

      if (value.startsWith('7') || value.startsWith('8')) {
        value = value.slice(1);
      }

      let formatted = '+7';
      if (value.length > 0) formatted += ' (' + value.slice(0, 3);
      if (value.length >= 3) formatted += ') ' + value.slice(3, 6);
      if (value.length >= 6) formatted += '-' + value.slice(6, 8);
      if (value.length >= 8) formatted += '-' + value.slice(8, 10);

      setPhone(formatted);
  };


  return (
    <div className='register-wrapper'>
      <div className='register-page'>
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Логин</label>
            <input 
              type='text'
              value={login}
              onChange={(e)=>setLogin(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className='form-group'>
            <label>Пароль</label>
            <input 
              type='password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className='form-group'>
            <label>Имя</label>
            <input 
              type='text'
              value={name}
              onChange={(e)=>setName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className='form-group'>
            <label>Возраст</label>
            <input 
              type='number'
              value={age}
              onChange={(e)=>setAge(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className='form-group'>
            <label>Электронная почта(необязательно)</label>
            <input 
              type='text'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              disabled={isLoading}
              placeholder='example@mail.ru'
            />
          </div>

          <div  className='form-group'>
            <label>Номер телефона(необязательно)</label>
            <input
            type='tel'
            value={phone}
            onChange={handlePhoneChange}
            disabled={isLoading}
            placeholder='+7 (999) 999-99-99'
            />
          </div>

          <div className='form-group checkbox-group'>
            <label className='checkbox-label'>
              <input 
                type='checkbox'
                checked={agree}
                onChange={(e)=>setAgree(e.target.checked)}
                disabled={isLoading}
              />
              <span>
                Я согласен с <Link to='/privacy' target='_blank'>политикой конфиденциальности</Link> 
                и <Link to='/terms' target='_blank'>пользовательским соглашением</Link>
              </span>

            </label>
          </div>
        

          {error && <p className='error'>{error}</p>}
          <div
            className='submit-wrapper'
            title={!agree?'Поставьте галочку согласия':''}
          >
            <button type='submit' disabled={isLoading||!agree}>
              {isLoading? 'Регистрация...':'Зарегистрироваться'}
            </button>
          </div>
          </form>
          <p>
            Есть аккаунт?   <Link to='/login'>Войти</Link>
          </p>
      </div>
    </div>
  );
}

