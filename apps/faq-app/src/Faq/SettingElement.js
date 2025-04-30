export const SettingElement = ({type, value, setValue, label, name} ) =>{

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
                />
              </div>
    );
}