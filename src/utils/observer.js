/**
 * Created by Jivko on 8.7.2018 г..
 */
let  subscriptions = {
    notifications : [],
    userIsLogged : [],
    userIsLoggedOut : []
};

export default {
    events : {
        notifications : 'notifications',
        userIsLogged : 'userIsLogged',
        userIsLoggedOut : 'userIsLoggedOut'
    },
    subscribe : ( eventName, fn ) => subscriptions[eventName].push(fn),
    trigger : (eventName, data ) => subscriptions[eventName].forEach(fn => fn(data))
}