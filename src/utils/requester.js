import $ from 'jquery';

let requester = (() => {
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "";
    const kinveyAppSecret = "";

    // Creates the authentication header
    function makeAuth(type) {
        if(type === 'guest'){
            return 'Basic ' + btoa('Guest:guest')
        }
        return type === 'basic'
            ?  'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
            :  'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    // Creates request object to kinvey
    function makeRequest(method, module, endpoint, auth, successFn) {
        if (successFn){
            return {
                method,
                url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
                headers: {
                    'Authorization': makeAuth(auth)
                },
                success: (()=>successFn())
            };
        }else{
            return {
                method,
                url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
                headers: {
                    'Authorization': makeAuth(auth)
                }
            };
        }

    }

    // Function to return GET promise
    function get (module, endpoint, auth, successFn) {
        return $.ajax(makeRequest('GET', module, endpoint, auth, successFn));
    }

    // Function to return POST promise
    function post (module, endpoint, auth, data,  successFn) {
        let req = makeRequest('POST', module, endpoint, auth,  successFn);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return PUT promise
    function update (module, endpoint, auth, data) {
        let req = makeRequest('PUT', module, endpoint, auth);
        req.data = data;
        return $.ajax(req);
    }

    // Function to return DELETE promise
    function remove (module, endpoint, auth, successFn) {
        return $.ajax(makeRequest('DELETE', module, endpoint, auth, successFn));
    }

    return {
        get,
        post,
        update,
        remove
    }
})()

export default requester;