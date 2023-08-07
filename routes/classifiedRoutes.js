const { Router } = require("express")

const { AdModel } = require("../model/Ad.model")

const adRouter = Router()

adRouter.post("/clspost", async (req, res) => {
    try {
        const { name, description, category, image, location, date, price } = req.body
        const newAd = new AdModel({
            name,
            description,
            category,
            image,
            location,
            date,
            price,
        })
        await newAd.save()
        res.send({ msg: "Ad Created" })
    } catch (err) {
        console.log("Error in Posting the AD")
        console.log(err)
    }
})

adRouter.get("/clsbrowse", async (req, res) => {
    try {
        const { category, sortBy, search, page } = req.query
        const filter = {}
        const sort = {}


        if (category) filter.category = category;
        if (sortBy) sort[sortBy] = -1;
        if (search) filter.name = { $regex: search, $options: "i" }

        const pageSize = 4;
        const skip = (page - 1) * pageSize

        const total = await AdModel.countDocuments(filter)
        const ads = await AdModel.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(pageSize)

        res.status(200).json({
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / pageSize),
            ads,
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: "Error in Fetching ads" })
    }
})

adRouter.delete("/buy/:id", async (req, res) => {
    try {
        const adId = req.params.id
        await AdModel.findByIdAndDelete(adId)
        res.status(200).send({msg: "Ad deleted"})
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: "Error in deleting ads" })
    }
})



module.exports = {
    adRouter
}