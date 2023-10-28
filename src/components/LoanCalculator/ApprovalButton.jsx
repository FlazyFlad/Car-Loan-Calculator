import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/solid';

const ApprovalButton = ({handleLogs}) => {
    return (
        <div
            onClick={handleLogs}
            className="bg-yellow-500 p-4 rounded-xl flex justify-between items-center gap-4
        cursor-pointer transition duration-300 ease-in-out hover:bg-yellow-600">
            <div>
                <div className="text-white font-semibold text-lg">Get Approval</div>
                <div className="text-white text-xs">Get approval for a loan in 5 minutes</div>
            </div>
            <div className="bg-white p-2 rounded-full">
                <ArrowRightIcon className="h-6 w-6 text-yellow-500" />
            </div>
        </div>
    );
}

export default ApprovalButton;
