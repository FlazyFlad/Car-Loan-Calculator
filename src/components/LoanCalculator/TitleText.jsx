
const TitleText = ({titleText, subTitleText}) => {
    return (
        <div className='text-center font-bold sm:text-left'>
            <h3 className="text-2xl">{titleText}</h3>
            <p className="text-xs">{subTitleText}</p>
        </div>
    )
};

export default TitleText;