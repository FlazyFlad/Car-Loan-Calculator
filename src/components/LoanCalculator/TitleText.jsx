




const TitleText = ({titleText, subTitleText}) => {
    return (
        /*Tailwind styles*/
        <div className='text-center font-bold'>
            <h3 className="text-2xl">{titleText}</h3>
            <p className="text-xs">{subTitleText}</p>
        </div>
    )
};

export default TitleText;