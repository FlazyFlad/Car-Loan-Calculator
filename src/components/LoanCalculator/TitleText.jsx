import React, { useContext } from "react";
import { ThemeContext } from "../../Context";





const TitleText = ({titleText, subTitleText}) => {
    const { theme } = useContext(ThemeContext);

    return (
        /*Tailwind styles*/
        <div className={`text-center font-bold ${theme ? 'dark-text-color' : 'light-color-text'}`}>
            <h3 className="text-2xl">{titleText}</h3>
            <p className="text-xs">{subTitleText}</p>
        </div>
    )
};

export default TitleText;