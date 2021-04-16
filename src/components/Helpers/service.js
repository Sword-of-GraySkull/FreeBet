import axios from 'axios';

export async function roll() {
    // const response = await fetch('http://localhost:3080/api/roll', {
    //     mode: "no-cors"
    // });
    // // console.log(response)
    // return await response;
    const response = axios.get('https://freebet-server.herokuapp.com/api/roll')
                    .then(res => {
                        return res.data.data;
                    })
    return await response;
}