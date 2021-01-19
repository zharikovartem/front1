// const baseURL = 'http://127.0.0.1:8000/api/'
const baseURL = 'http://81.90.181.175/api/'

const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(state)
}

const getOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(state)
}

export const taskAPI = {
    getTaskList() {
        
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
        };
        
        fetch('http://81.90.181.175/api/tasks', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(() => console.log("Can’t access  response. Blocked by browser?"))
          
    },

    newTask(data) {
        console.log('data in api',data)
        postOptions.body = JSON.stringify(data)
        console.log('postOptions',postOptions)
        fetch(baseURL, postOptions)
            .then((response) => {
                console.log(response.json());
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
    },
}
