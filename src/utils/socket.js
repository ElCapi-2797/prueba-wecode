import io from 'socket.io-client';

const url = `${process.env.REACT_APP_BANK_HEROKU}`;
console.log(url);

export default io(url);