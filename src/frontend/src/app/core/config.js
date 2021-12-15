
const prod = {
   API_URL: '',
};

 const dev = {
   API_URL: 'https://localhost:7027',
 };

 export const config = process.env.NODE_ENV === 'development' ? dev : prod;