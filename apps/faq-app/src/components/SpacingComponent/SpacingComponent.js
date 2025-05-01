
export const SpacingComponent = ({type, spacingType, setter, values}) =>{

    const setterHandler = (e, position) => {
        setter(prev => {
            const newValue = [...prev];
            newValue[position] = e.target.value;
            return newValue;
        });
    }

    return(
        <div className="p-rel">
            <div>
                <div className="spacing-center">
                    <input className="spacing-input"
                           type="number"
                           name={`${type}_${spacingType}_top`}
                           onChange={(e) =>{ setterHandler(e, 0) }}
                           value={values[0]} />
                </div>
                <div className="spacing-box-container">
                    <div>
                        <input className="spacing-input" type="number" name={`${type}_${spacingType}_left`}                            onChange={(e) =>{ setterHandler(e, 3) }}
                               value={values[3]} />
                    </div>
                    <div className="spacing-box"></div>
                    <div>
                        <input className="spacing-input" type="number" name={`${type}_${spacingType}_right`}                            onChange={(e) =>{ setterHandler(e, 1) }}
                               value={values[1]} />
                    </div>
                </div>
                <div className="spacing-center" >
                    <input className="spacing-input" type="number" name={`${type}_${spacingType}_bottom`}                            onChange={(e) =>{ setterHandler(e, 2) }}
                           value={values[2]} />
                </div>
            </div>
            <div className="spacing-legend" >value (px)</div>
        </div>
    )
}