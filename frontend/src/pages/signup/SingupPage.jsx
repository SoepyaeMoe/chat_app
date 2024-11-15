import { useState } from 'react';
import { Link } from 'react-router-dom';
import GenderCheckbox from './GenderCheckbox';
import { useSingUp } from '../../hooks/useSignUp';

const SingupPage = () => {

    const { loading, signup } = useSingUp();

    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });

    const handelSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }

    const handelCheckBoxChange = (gender) => {
        setInputs({ ...inputs, gender: gender });
    }

    return (
        <div className='flex flex-col justify-center items-center min-w-96 mx-auto'>
            <div className='p-4 w-96 bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up
                    <span className='text-blue-500'> ChatApp</span>
                </h1>
                <form onSubmit={handelSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full Name</span>
                        </label>
                        <input
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                            type="text"
                            placeholder="full name"
                            className="input input-bordered w-full max-w-xs" />
                    </div>
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
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input
                            value={inputs.confirmPassword}
                            onChange={e => setInputs({ ...inputs, confirmPassword: e.target.value })}
                            type="password"
                            placeholder='confirm password'
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div>
                        <GenderCheckbox onCheckBoxChange={handelCheckBoxChange} selectedGender={inputs.gender} />
                    </div>
                    <Link to={'/login'} className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                        Already have an account?
                    </Link>

                    <div>
                        <button className='btn btn-primary btn-sm mt-2 btn-block'>
                            {loading ? (<span className="loading loading-bars loading-xs"></span>) : 'Sign Up'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default SingupPage