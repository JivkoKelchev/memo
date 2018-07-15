/**
 * Created by Jivko on 13.7.2018 г..
 */
import requester from './requester';

// const isUserLogged = () => {
//     console.log(sessionStorage);
//     if (sessionStorage.getItem('authtoken')) {
//         this.isAdmin();
//         //if (!this.state.isUserLogged){ this.setState({isUserLogged : true}) }
//         return true;
//     }else{
//         return false;
//     }
//
//
// };

const isAdmin = (userId) => {
    let roles;
    requester.get('user', userId +'/roles', 'kinvey').then(
        (r)=>(roles = r)
    )

     console.log(roles);
    // if(resposne.responseJSON.length === 1){
    //     return true;
    // }else{
    //     return false;
    // }
};

export default isAdmin;