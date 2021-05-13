import axios from 'axios';

export async function roll() {
    // const response = await fetch('http://localhost:3080/api/roll', {
    //     mode: "no-cors"
    // });
    // // console.log(response)
    // return await response;
    const response = axios.get('https://freebet-server.herokuapp.com/api/roll')
    // const response = axios.get('http://localhost:3080/api/roll')
                    .then(res => {
                        return res.data.data;
                    })
    return await response;
}

export async function registerUser(registerData) {
    const response = await axios.post('https://freebet-server.herokuapp.com/api/register', registerData);
    // const response = await axios.post('http://localhost:3080/api/register', registerData);
    return response.data;
}

export async function loginUser(data) {
    const response = await axios.post('https://freebet-server.herokuapp.com/api/login', data);
    // const response = await axios.post('http://localhost:3080/api/login', data);

    return response;
}

export async function getWalletData(userId) {
    const wallet = {id: userId}
    const response = await axios.post('https://freebet-server.herokuapp.com/api/wallet', wallet)
    // const response = await axios.post('http://localhost:3080/api/wallet', wallet)

    // console.log(response.data)
    return response;
}

export async function setWalletData(userId, wallet) {
    const data = {
        id: userId,
        wallet: wallet
    }
    const response = await axios.post('https://freebet-server.herokuapp.com/api/setWallet', data)
    // const response = await axios.post('http://localhost:3080/api/setWallet', data)

    return response;
}       

export async function pushRollHistory(userId, rollHistory) {
    const data = {
        id: userId,
        rollHistory: rollHistory
    }
    await axios.post('https://freebet-server.herokuapp.com/api/pushRollHistory', data)
    // await axios.post('http://localhost:3080/api/pushRollHistory', data)

}

export async function getRollHistory(userId) {
    const data = {
        id: userId
    }
    const response = await axios.post('https://freebet-server.herokuapp.com/api/getRollHistory', data)
    // const response = await axios.post('http://localhost:3080/api/getRollHistory', data)

    return response;
    // console.log(response)
}

export async function pushMultiplyBetRollHistory(userId, rollHistory) {
    const data = {
        id: userId,
        rollHistory: rollHistory
    }
    await axios.post('https://freebet-server.herokuapp.com/api/pushMultiplyBetRollHistory', data)
    // await axios.post('http://localhost:3080/api/pushMultiplyBetRollHistory', data)

}

export async function getMultiplyBetRollHistory(userId) {
    const data = {
        id: userId
    }

    const response = await axios.post('https://freebet-server.herokuapp.com/api/getMultiplyBetRollHistory', data)
    // const response = await axios.post('http://localhost:3080/api/getMultiplyBetRollHistory', data)

    return response;
}