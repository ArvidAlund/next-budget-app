const ProgressBar = ({start = 0, end, current} : {start: number, end: number, current: number}) => {
    
    if (end === start) {
        return (
            <div className="w-full bg-white/30 rounded-full h-4 dark:bg-gray-700">
                <div className="bg-[#0B0748] h-4 rounded-full transition-all duration-500" style={{width: '100%'}}></div>
            </div>
        );
    }

    const percentage = Math.max(0, Math.min(100, ((current - start) / (end - start)) * 100));

    return (
        <div className="w-full bg-white/30 rounded-full h-4 dark:bg-gray-700">
            <div className="bg-[#0B0748] h-4 rounded-full transition-all duration-500" style={{width: `${percentage}%`}}></div>
        </div>
    );
}
export default ProgressBar;