import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';

const LoginPage = () => {
    const { loading, login } = useLogin();

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const handelSubmit = async (e) => {
        e.preventDefault();
        await login(inputs);
    }

    return (
        <div className='flex flex-col justify-center items-center min-w-96 mx-auto'>
            <div className='p-4 w-96 bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-blue-500'> ChatApp</span>
                </h1>
                <form onSubmit={handelSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            value={inputs.username}
                            onChange={e => setInputs({ ...inputs, username: e.target.value })}
                            type="text"
                            placeholder="username"
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            value={inputs.password}
                            onChange={e => setInputs({ ...inputs, password: e.target.value })}
                            type="password"
                            placeholder='password'
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <Link to={'/signup'} className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button className='btn btn-primary btn-sm mt-2 btn-block'>
                            {loading ? <span className="loading loading-bars loading-xs"></span> : "Login"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default LoginPage;