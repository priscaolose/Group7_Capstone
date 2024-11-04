

export default async function handler(req, res) {
    const { method, query } = req;

    if(method === 'GET')
    {
        if(query.path === 'Register'){
            return res.send('../src/components/RegistrationF.js');
        }
    }
}