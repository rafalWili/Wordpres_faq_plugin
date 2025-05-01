
export const SettingElement = ({type, value, setValue, label, name, inputSize} ) =>{

  const onChangeValue = (e) => {
    setValue(e.target.value);
  }

    return(
         <div className="setting-grid">
                <label className='mr-3'>{label}:</label>
                <input
                  type={type}
                  value={value}
                  name={name}
                  onChange={onChangeValue}
                  style={{ width: inputSize === 'small' ? '50px' : undefined }}
                />
              </div>
    );
}