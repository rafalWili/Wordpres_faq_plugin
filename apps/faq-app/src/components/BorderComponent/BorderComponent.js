import {SettingElement} from "../../Faq/SettingElement";
import React from "react";

export const BorderComponent = ({type,  setter, border, borderSelected, setBorderSelected,borderWidth,
                                    setBorderWidth,borderColor,   setBorderColor,borderRadius, setBorderRadius}) =>{

    const setterHandler = (e, position) => {
        setter(prev => {
            const newValue = [...prev];
            newValue[position] = e.target.checked;
            return newValue;
        });
    }
    const radiusHandler = (e, position) => {
        setBorderRadius(prev => {
            const newValue = [...prev];
            newValue[position] = e.target.value;
            return newValue;
        });
    }

    return(
        <div className="p-rel" style={{fontSize: '13px'}}>
            {/*border true/false */}
            <div>
                <div style={{ display: 'flex', gap: '1rem' }} className="mb-2" >
                    <label  style={{ display: 'flex',alignItems: 'center' }}>
                        <input
                            type="radio"
                            name={`${type}_border_option`}
                            value="True"
                            checked={borderSelected}
                            onChange={(e) => setBorderSelected(true)}
                        />
                        Tak
                    </label>
                    <label  style={{ display: 'flex',alignItems: 'center' }}>
                        <input
                            type="radio"
                            name={`${type}_border_option`}
                            value="False"
                            checked={!borderSelected}
                            onChange={(e) => setBorderSelected(false)}
                        />
                        Nie
                    </label>
                </div>
            </div>
            {/*border true/false end */}

            {/*border width */}
            {borderSelected && ( <> <div className="d-flex mb-2 justify-content-between" >
                <label htmlFor={`${type}_border_width`}>Border grubość: </label>
                <div>
                    <input
                    id={`${type}_border_width`}
                    type="number"
                    style={{width:'50px'}}
                    name={`${type}_border_width`}
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(e.target.value) }
                    /> px
                </div>
            </div>
            {/*border width end */}

            {/*border checkboxes */}
            <div className="d-flex mb-2 justify-content-between">
                <div className="d-flex">
                    <input type="checkbox"
                           id={`${type}_border_top`}
                           name={`${type}_border_top`}
                           checked={border[0]}
                           onChange={(e) =>{ setterHandler(e, 0) }}
                           style={{marginLeft: 0}}
                           />
                    <label htmlFor={`${type}_border_top`}>Top</label>
                </div>
                <div className="d-flex">
                    <input type="checkbox"
                           id={`${type}_border_right`}
                           name={`${type}_border_right`}
                           checked={border[1]}
                           onChange={(e) =>{ setterHandler(e, 1) }}
                    />
                    <label htmlFor={`${type}_border_right`}>Right</label>
                </div>
                <div className="d-flex">
                    <input type="checkbox"
                           id={`${type}_border_bottom`}
                           name={`${type}_border_bottom`}
                           checked={border[2]}
                           onChange={(e) =>{ setterHandler(e, 2) }}
                    />
                    <label htmlFor={`${type}_border_bottom`}>Bottom</label>
                </div>
                <div className="d-flex">
                    <input type="checkbox"
                           id={`${type}_border_left`}
                           name={`${type}_border_left`}
                           checked={border[3]}
                           onChange={(e) =>{ setterHandler(e, 3) }}
                    />
                    <label htmlFor={`${type}_border_left`}>Left</label>
                </div>

            </div>
            {/*border checkboxes end */}

            <SettingElement name="question-border-color" type="color" value={borderColor} setValue={setBorderColor} label="Kolor" />


            {/*border radius  */}
            <div>
                <label htmlFor={`${type}_border_radius`}>Border radius:</label>
                <div className="mt-2" style={{gap: '1rem'}}> 
                    <div className="d-flex justify-content-between">
                        <div>
                        <label className="d-block" htmlFor={`${type}_border_radius_top_left`}>top-left:</label> 
                        <input 
                        type="number" 
                        id={`${type}_border_radius_top_left`}
                        name={`${type}_border_radius_top_left`}                    
                        style={{width:'50px'}}
                        value={borderRadius[1]}
                        onChange={(e) =>{ radiusHandler(e, 1) }}
                        />
                        </div>
                        <div className="endCorner">
                        <label className="d-block" htmlFor={`${type}_border_radius_top_right`}>top-right:</label>
                        <input 
                        type="number" 
                        id={`${type}_border_radius_top_right`}
                        name={`${type}_border_radius_top_right`}                    
                        style={{width:'50px'}}
                        value={borderRadius[2]}
                        onChange={(e) =>{ radiusHandler(e, 2) }}
                        />
                        </div>
                    </div>

                    <div className="d-flex mt-3 justify-content-between">
                    <div>
                        <label className="d-block" htmlFor={`${type}_border_radius_bottom_left`}>bottom-left:</label>
                        <input 
                        type="number" 
                        id={`${type}_border_radius_bottom_left`}
                        name={`${type}_border_radius_bottom_left`}                    
                        style={{width:'50px'}}
                        value={borderRadius[3]}
                        onChange={(e) =>{ radiusHandler(e, 3) }}
                        />
                        </div>

                        <div className="endCorner">
                        <label className="d-block" htmlFor={`${type}_border_radius_bottom_right`}>bottom-right:</label>
                        <input 
                        type="number" 
                        id={`${type}_border_radius_bottom_right`}
                        name={`${type}_border_radius_bottom_right`}                    
                        style={{width:'50px'}}
                        value={borderRadius[0]}
                        onChange={(e) =>{ radiusHandler(e, 0) }}
                        />
                        </div>

                        
                    </div>

                </div>
            </div>
            {/*border radius end */}

        </>)}



        </div>
    )
}