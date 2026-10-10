import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import './LoginPage.css'
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const {login: doLogin,isLoading, error, clearError} = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    clearError();

    try {
      await doLogin(login,password);
      navigate('/');

    }catch {

    }
  };
  

  return (
  <div className='login-wrapper'>
    <div className='login-page'>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <div className='login-form'>
          <label>Логин</label>
          <input 
          type="text"
          value={login}
          onChange={(e)=>setLogin(e.target.value)}
          disabled={isLoading}
          required
          />
        </div>
        <div className='login-form'>
          <label>Пароль</label>
          <input 
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          disabled={isLoading}
          required
          />
        </div>

        {error&&<p className='error'>{error}</p>}

        <button type='submit' disabled={isLoading}>
          {isLoading?'Вход':'Войти'}
        </button>
      </form>

      <p>
        Нет аккаунта? <Link to ="/register">Зарегистрироваться</Link>
      </p>
      
    </div>
  </div>
  );
}
