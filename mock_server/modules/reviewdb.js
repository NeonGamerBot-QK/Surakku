// default template 
module.exports = (router, db) => {
    router.get('/review/:userID', async (req,res) => {
     if(await db.get(`optout_${req.params.userID}`)){
        res.status(403).json({
            message: "OPTOUT",
            reviews: []
        })
        return
     }
        const userID = req.params.userID
        const reviews =await db.get('reviews_'+userID) || []
        res.json({
            message: "OK",
            reviews 
        })
    })
    router.post('/review/:userID', async (req,res) => {
        const userID = req.params.userID
        if(await db.get(`optout_${userID}`)){
            res.status(403).json({
                message: "OPTOUT"
            })
            return
        }
        const reviews = await db.get('reviews_'+userID) || []
        reviews.push({
            reviewer: {
                name: req.body.name,
                avatar: req.body.avatar
            },
            comment: req.body.comment,
            created_at: Date.now()
            })
            await db.set('reviews_'+userID, reviews)
            res.json({
                message: "OK",
                reviews 
            })
    })
    router.get('/optout/:userID', async (req,res) => {
        //todo some auth or whatever
    })
}