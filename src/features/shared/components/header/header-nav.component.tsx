import axios from "axios";
import { useAppDispatch, useAppSelector } from "features/config/hooks";
import { getSession, selectGetSession } from "features/popclub/presentation/slices/get-session.slice";
import { REACT_APP_DOMAIN_URL } from "features/shared/constants";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface HeaderNavProps {
    serviceReached: boolean,
    active: string,
    sticky?: boolean,
}


const TABS =[
    {
        name: 'HOME',
        url: '/',
    },
    {
        name: 'POPCLUB',
        url: '/popclub',
    },
    {
        name: 'SNACKSHOP',
        url: 'https://ilovetaters.com/shop',
    },
    {
        name: 'CATERING',
        url: 'https://ilovetaters.com/catering',
    },
    {
        name: 'BRANCHES',
        url: 'https://ilovetaters.com/branches',
    },
];

export function HeaderNav(props: HeaderNavProps){

    const getSessionState = useAppSelector(selectGetSession);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getSession());
    },[]);

    const loginToFacebook = () => {
        
        axios.get(`${REACT_APP_DOMAIN_URL}api/facebook/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        })
        .then(function (response: any) {
            const facebookURL = response.data.url;
            console.log(response.data);
            
            
            if (response.data.result === false) {
                axios.post(`${REACT_APP_DOMAIN_URL}api/facebook/login_point/`,{
                    fb_login_point: window.location.href
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                }).then(()=>{
                    window.location.href = facebookURL;
                });
            }
            
        })
    }
    
    

    return (
        <header className={`${props.sticky? 'sticky' : 'fixed'} w-full top-0 z-20 `}>
            <div className={` w-full ${props.serviceReached ? 'bg-primary shadow-2xl':''}`}>
                <nav className={`lg:flex hidden justify-between items-center container mx-auto px-3 py-2`}>
                    <img src={REACT_APP_DOMAIN_URL + "uploads/images/logo/taters-logo.png"} alt="Taters Logo" className="w-[150px] lg:w-[160px]"></img>

                    <div  className="justify-center items-center space-x-4 flex">
                        <ul className="flex text-white font-semibold items-stretch h-[40px] justify-center ">
                            {
                                TABS.map((tab: any, i)=>{
                                    return (
                                        <li key={i} className={props.active === tab.name ? `border-b-4  ease-in duration-200 border-white px-4 flex justify-center items-center font-bold tracking-wider` : 
                                        "px-4 pb-1 flex justify-center items-center tracking-wider"}>
                                            <Link to={tab.url}>{tab.name}</Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        {
                            
                        }
                        {
                            getSessionState.data?.userData ? 
                            <img src={getSessionState.data?.userData.picture} alt='Profile pic' className="rounded-full"></img> : 
                                getSessionState.data?.userData === null ? 
                                <button onClick={loginToFacebook} className="bg-red-600 text-white mb-1 h-[40px] px-4 rounded-full uppercase font-semibold tracking-lg flex justify-center items-center">SIGN IN</button>
                            : null
                        }
                    </div>
                </nav>
            </div>
        </header>
    );
}