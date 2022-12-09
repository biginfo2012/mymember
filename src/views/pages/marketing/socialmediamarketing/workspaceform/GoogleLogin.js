import { Store } from '@material-ui/icons';
import { Card } from '@mui/material';
// import React from 'react';

import React, { useState, useEffect } from 'react';
import { gapi, loadAuth2 } from 'gapi-script'

import { GoogleLogin } from 'react-google-login';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';



const clientId =
    '408856332599-8r4ma20fg2l0bb5673er141mfrab5if3.apps.googleusercontent.com';

function GoogleAuthLogin() {
    // const refreshTokenSetup = (res) => {
    //     // Timing to renew access token
    //     let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    //     const refreshToken = async () => {
    //         const newAuthRes = await res.reloadAuthResponse();
    //         refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    //         console.log('newAuthRes:', newAuthRes);
    //         // saveUserToken(newAuthRes.access_token);  <-- save new token
    //         localStorage.setItem('authToken', newAuthRes.id_token);

    //         // Setup the other timer after the first one
    //         setTimeout(refreshToken, refreshTiming);
    //     };

    //     // Setup first refresh timer
    //     setTimeout(refreshToken, refreshTiming);

    // };
    // const onSuccess = (res) => {
    //     console.log('Login Success: currentUser:', res.profileObj);
    //     alert(
    //         `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    //     );
    //     refreshTokenSetup(res);
    // };
    // const onFailure = (res) => {
    //     console.log('Login failed: res:', res);
    //     alert(
    //         `Failed to login. 😢 Please ping this Ajay Udayan`
    //     );
    // };

    // return (
    //     <GoogleLogin
    //         clientId={clientId}
    //         buttonText="Login"
    //         render={renderProps => (
    //             // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>

    //             <div
    //                 className="responsive-square-inner"
    //                 onClick={renderProps.onClick}
    //                 disabled={renderProps.disabled}
    //             >
    //                 <div className="panel-dashed full-width">
    //                     <div className="social_icon d-flex justify-content-center">
    //                         <Store />
    //                     </div>
    //                     <div className="media-body">
    //                         Add Google <br /> Business Profile pages
    //                     </div>
    //                 </div>
    //             </div>
    //         )}
    //         onSuccess={onSuccess}
    //         onFailure={onFailure}
    //         cookiePolicy={"single_host_origin"}
    //         // style={{ marginTop: '100px' }}
    //         isSignedIn={true}
    //     />

    // );

    const [user, setUser] = useState(null);

    useEffect(() => {
        const setAuth2 = async () => {
            const auth2 = await loadAuth2(gapi, clientId, '')
            if (auth2.isSignedIn.get()) {
                updateUser(auth2.currentUser.get())
            } else {
                attachSignin(document.getElementById('customBtn'), auth2);
            }
        }
        setAuth2();
    }, []);

    useEffect(() => {
        if (!user) {
            const setAuth2 = async () => {
                const auth2 = await loadAuth2(gapi, clientId, '')
                attachSignin(document.getElementById('customBtn'), auth2);
            }
            setAuth2();
        }
    }, [user])

    const updateUser = (currentUser) => {
        const name = currentUser.getBasicProfile().getName();
        const profileImg = currentUser.getBasicProfile().getImageUrl();
        setUser({
            name: name,
            profileImg: profileImg,
        });
    };

    const attachSignin = (element, auth2) => {
        auth2.attachClickHandler(element, {},
            (googleUser) => {
                updateUser(googleUser);
            }, (error) => {
                console.log(JSON.stringify(error))
            });
    };

    const signOut = () => {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            setUser(null);
            console.log('User signed out.');
        });
    }

    if (user) {
        return (
            // <div className="container">
            //     {/* <UserCard user={user} /> */}
            //     <div>
            //         <h2>{user.name}</h2>
            //         <img src={user.profileImg} alt="user profile" />
            //     </div>
            //     <div id="" className="btn logout" onClick={signOut}>
            //         Logout
            //     </div>
            // </div>
            <div className="responsive-square-inner">

                <div className="panel-dashed full-width">
                    {console.log(user)}
                    <div>
                        <h2>{user.name}</h2>
                        <img src={user?.profileImg} alt="user profile" />
                    </div>
                    <div id="" className="btn logout" onClick={signOut}>
                        Logout
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="customBtn" className="responsive-square-inner btn login">
            {/* Login */}

            <div className="panel-dashed full-width">
                <div className="social_icon d-flex justify-content-center">
                    <Store />
                </div>
                <div className="media-body">
                    Add Google <br /> Business Profile pages
                </div>
            </div>
        </div>
    );
}

export default GoogleAuthLogin;