


const InfoContainer = ({ data } : { data: { icon: React.JSX.Element, title: string, description: string } }) => {
    return (
        <div className="border border-neutral-700 rounded-lg p-4">
            <div className="flex justify-center items-center mb-3">
                {data.icon}
                <h3 className="ml-2">
                    {data.title}
                </h3>
            </div>
            <p>{data.description}</p>
        </div>
    )
}
export default InfoContainer;