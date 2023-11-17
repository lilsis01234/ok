const router = require('express').Router();
const 

router.get('/evenementCountdown', async(req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const response = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/${currentYear}/MG`)
    } catch (error) {
        
    }
})