import axios from 'axios';

var URL = window.location.hostname === "localhost" ? 'http://localhost:3080/api' : 'https://freebet-server.herokuapp.com/api';

export async function roll(clientSeed) {
    // const response = await fetch('http://localhost:3080/api/roll', {
    //     mode: "no-cors"
    // });
    // // console.log(response)
    // return await response;
    const data = {
        "clientSeed": clientSeed 
    }
    // const response = axios.post('https://freebet-server.herokuapp.com/api/roll', data)
    const response = axios.post(`${URL}/roll`, data)
                    .then(res => {
                        return res.data;
                    })
    console.log(await response)
    return await response;
}

export async function getClientSeed() {
    // const response = axios.get('https://freebet-server.herokuapp.com/api/getClientSeed')
    const response = axios.get(`${URL}/getClientSeed`)
                .then(res => {
                    return res;
                })
                    
    return await response;
}

export async function registerUser(registerData) {
    // const response = await axios.post('https://freebet-server.herokuapp.com/api/register', registerData);
    const response = await axios.post(`${URL}/register`, registerData);
    return response.data;
}

export async function loginUser(data) {
    // const response = await axios.post('https://freebet-server.herokuapp.com/api/login', data);
    const response = await axios.post(`${URL}/login`, data);

    return response;
}

export async function getUserName(userId) {
    const data = {
        id: userId
    }
    // const response = await axios.post('https://freebet-server.herokuapp.com/api/getUserName', data)
    const response = await axios.post(`${URL}/getUserName`, data)
    // console.log(response)
    return response
}

export async function getWalletData(userId) {
    const wallet = {id: userId}
    // const response = await axios.post('https://freebet-server.herokuapp.com/api/wallet', wallet)
    const response = await axios.post(`${URL}/wallet`, wallet)

    // console.log(response.data)
    return response;
}

export async function setWalletData(userId, wallet) {
    const data = {
        id: userId,
        wallet: wallet
    }
    // const response = await axios.post('https://freebet-server.herokuapp.com/api/setWallet', data)
    const response = await axios.post(`${URL}/setWallet`, data)

    return response;
}       

export async function pushRollHistory(userId, rollHistory) {
    const data = {
        id: userId,
        rollHistory: rollHistory
    }
    // await axios.post('https://freebet-server.herokuapp.com/api/pushRollHistory', data)
    await axios.post(`${URL}/pushRollHistory`, data)

}

export async function getRollHistory(userId) {
    const data = {
        id: userId
    }
    // const response = await axios.post('https://freebet-server.herokuapp.com/api/getRollHistory', data)
    const response = await axios.post(`${URL}/getRollHistory`, data)

    return response;
    // console.log(response)
}

export async function pushMultiplyBetRollHistory(userId, rollHistory) {
    const data = {
        id: userId,
        rollHistory: rollHistory
    }
    // await axios.post('https://freebet-server.herokuapp.com/api/pushMultiplyBetRollHistory', data)
    await axios.post(`${URL}/pushMultiplyBetRollHistory`, data)

}

export async function getMultiplyBetRollHistory(userId) {
    const data = {
        id: userId
    }

    // const response = await axios.post('https://freebet-server.herokuapp.com/api/getMultiplyBetRollHistory', data)
    const response = await axios.post(`${URL}/getMultiplyBetRollHistory`, data)

    return response;
}

export async function writeLottery(num, userId) {
    const data = {
        id: userId,
        num: num
    }

    // await axios.post('https://freebet-server.herokuapp.com/api/writeLottery', data)
    await axios.post(`${URL}/writeLottery`, data)
}

export async function getLotteryTickets(userId) {
    const data = {
        id: userId
    }

    // const response = await axios.post('https://freebet-server.herokuapp.com/api/getLotteryTickets', data)
    const response = await axios.post(`${URL}/getLotteryTickets`, data)
    
    return response;
}

export async function calcLotteryWinner() {
    // const response = await axios.get('https://freebet-server.herokuapp.com/api/calcLotteryWinner')
    const response = await axios.get(`${URL}/calcLotteryWinner`)
    // console.log(response)
    return response
}

// export async function getLotteryWinner() {
//    const response = await axios.get('http://localhost:3080/api/getLotteryWinner')
// //    console.log(response)
// }