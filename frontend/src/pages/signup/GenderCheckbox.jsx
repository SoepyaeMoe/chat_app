const GenderCheckbox = ({ onCheckBoxChange, selectedGender }) => {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer`} >
                    <input
                        checked={selectedGender === 'male'}
                        onChange={() => onCheckBoxChange('male')}
                        type='checkbox'
                        className='checkbox border-slate-900 checkbox-xs' />
                    <span className='label-text'>Male</span>
                </label>
            </div>
            <div className='form-control'>
                <label className={`label gap-2 cursor-pointer`}>
                    <input
                        checked={selectedGender === 'female'}
                        onChange={() => onCheckBoxChange('female')}
                        type='checkbox'
                        className='checkbox checkbox-xs border-slate-900' />
                    <span className='label-text'>Female</span>
                </label>
            </div>
        </div>
    )
}

export default GenderCheckbox;