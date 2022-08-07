import moment from "moment";
import Countdown from "react-countdown";
import { ProgressBar } from "./progress-bar";
import {  useAppDispatch, useAppSelector } from "features/config/hooks";

import { GetLatestUnexpiredRedeemState, resetGetLatestUnexpiredRedeem, selectGetLatestUnexpiredRedeem } from "../slices/get-latest-unexpired-redeem.slice";

export function CountdownTimerLatestRedeem(){

    const getLatestUnexpiredRedeemState = useAppSelector(selectGetLatestUnexpiredRedeem);
    const dispatch = useAppDispatch();

    if( getLatestUnexpiredRedeemState.status === GetLatestUnexpiredRedeemState.success 
        && getLatestUnexpiredRedeemState.data){
        var redeemDate : any = moment(getLatestUnexpiredRedeemState.data.date_redeemed);
        var expirationDate : any = moment(getLatestUnexpiredRedeemState.data.expiration);
        var expirationDateCountDown = new Date(getLatestUnexpiredRedeemState.data.expiration);
        
        const renderer = ({ hours, minutes, seconds, completed} : any) => {
            if(completed){
                dispatch(resetGetLatestUnexpiredRedeem());
            }else if (!completed) {
                var today = moment();
                let timeName = '';
                const percentage = Math.round((1 - (today.diff(redeemDate)) / (expirationDate.diff(redeemDate))) * 100);
                
                if(hours > 0){
                    if(hours === 1){
                        timeName = 'hour';
                    }else{
                        timeName = 'hours';
                    }
                } else if(minutes > 0){
                    if(minutes === 1){
                        timeName = 'minute';
                    }else{
                        timeName = 'minutes';
                    }
                } else if(seconds > 0){
                    if(seconds === 1){
                        timeName = 'second';
                    }else{
                        timeName = 'seconds';
                    }
                }

                return(
                    <>
                        <ProgressBar percentage={percentage}/>
                        {/* <div className="text-white flex items-center text-xl px-4 ">
                            <AiOutlineFieldTime className="text-4xl mr-2"/>
                            <div className="font-['Bebas_Neue'] tracking-[4px]">
                                <span className="mr-2">
                                    {pad(hours)}:{pad(minutes)}:{pad(seconds)} 
                                </span>
                                <span className="text-sm">{timeName} Remaining</span>
                            </div>
                        </div> */}
                    </>
                );
            }
        };
    
        return (
            <>
                <Countdown renderer={renderer} date={expirationDateCountDown}/>
            </>
        );
    }
    return null;
}