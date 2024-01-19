const {Order} = require('./../models/order')



exports.create = async(req, res)=>{
    try {
        req.body.user = req.profile
        const order = new Order({
            products : req.body.products,
            total_quatity : req.body.total_quatity,
            amount : req.body.amount,
            user : req.body.user._id ,
            date : req.body.date ,
            infoPayment_address : req.body.infoPayment.address  ,
            infoPayment_city : req.body.infoPayment.city  ,
            infoPayment_full_name : req.body.infoPayment.full_name  ,
            infoPayment_phone_number : parseInt(req.body.infoPayment.phone_number )
        })
        await order.save()
        res.json({data:order})
        
    } catch (error) {
        return res.status(400).json({error : error})
    }

    // console.log(req.body)
  
    
    // res.json({body : '==='})
    // res.json({message : 'hello',body :req.body,profile : req.profile})
    // res.json({body : req.body})
}