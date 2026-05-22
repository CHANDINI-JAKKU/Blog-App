import exp from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { ArticleModel } from '../models/ArticleModel.js'
import { UserModel } from '../models/UserModel.js'
export const userApp=exp.Router()

// PUBLIC: search, filter, and sort articles (no authentication required)
userApp.get("/articles",async(req,res)=>{
    const { search, category, tag, sort } = req.query
    const filters = { isArticleActive: true }

    if (category) filters.category = category
    if (tag) filters.tags = tag

    const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let query = ArticleModel.find(filters)

    if (search) {
        const regex = new RegExp(escapeRegex(search.trim()), "i");
        query = ArticleModel.find({
            ...filters,
            $or: [
                { title: regex },
                { content: regex },
                { tags: regex },
            ],
        })
    }

    if (sort === "popular") {
        query = query.sort({ likes: -1, views: -1, createdAt: -1 })
    } else {
        query = query.sort({ createdAt: -1 })
    }

    const articleList = await query
    res.status(200).json({ message: "articles", payload: articleList })
})

// search, filter, and sort articles (authenticated - kept for backward compatibility)
userApp.get("/articles-auth",verifyToken("USER","AUTHOR","ADMIN"),async(req,res)=>{
    const { search, category, tag, sort } = req.query
    const filters = { isArticleActive: true }

    if (category) filters.category = category
    if (tag) filters.tags = tag

    const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let query = ArticleModel.find(filters)

    if (search) {
        const regex = new RegExp(escapeRegex(search.trim()), "i");
        query = ArticleModel.find({
            ...filters,
            $or: [
                { title: regex },
                { content: regex },
                { tags: regex },
            ],
        })
    }

    if (sort === "popular") {
        query = query.sort({ likes: -1, views: -1, createdAt: -1 })
    } else {
        query = query.sort({ createdAt: -1 })
    }

    const articleList = await query
    res.status(200).json({ message: "articles", payload: articleList })
})

//PUBLIC: read a single article by id and count view
userApp.get("/article/:id",async(req,res)=>{
    const { id } = req.params
    const userId = req.user?.id // userId will be undefined if not authenticated

    const article = await ArticleModel.findOneAndUpdate(
        { _id: id, isArticleActive: true },
        { $inc: { views: 1 } },
        { new: true }
    )

    if(!article){
        return res.status(404).json({message:"article not found"})
    }

    const isLiked = userId ? article.likedBy.some((item) => item.toString() === userId) : false
    const payload = { ...article.toObject(), isLiked }

    res.status(200).json({message:"article",payload})
})

// read a single article authenticated (kept for backward compatibility)
userApp.get("/article-auth/:id",verifyToken("USER","AUTHOR","ADMIN"),async(req,res)=>{
    const { id } = req.params
    const userId = req.user?.id

    const article = await ArticleModel.findOneAndUpdate(
        { _id: id, isArticleActive: true },
        { $inc: { views: 1 } },
        { new: true }
    )

    if(!article){
        return res.status(404).json({message:"article not found"})
    }

    const isLiked = article.likedBy.some((item) => item.toString() === userId)
    const payload = { ...article.toObject(), isLiked }

    res.status(200).json({message:"article",payload})
})

// PUBLIC: recommended articles by category, tags, or author
userApp.get("/articles/recommended/:id",async(req,res)=>{
    const { id } = req.params
    const currentArticle = await ArticleModel.findOne({_id:id,isArticleActive:true})
    if(!currentArticle){
        return res.status(404).json({message:"article not found"})
    }

    const query = {
        _id: { $ne: id },
        isArticleActive: true,
        $or: [
            { author: currentArticle.author },
            { category: currentArticle.category },
        ],
    }

    if (Array.isArray(currentArticle.tags) && currentArticle.tags.length > 0) {
        query.$or.push({ tags: { $in: currentArticle.tags } })
    }

    const recommendations = await ArticleModel.find(query)
        .sort({ likes: -1, createdAt: -1 })
        .limit(4)

    res.status(200).json({ message: "recommended articles", payload: recommendations })
})

// like or unlike an article
userApp.post("/articles/like",verifyToken("USER","AUTHOR","ADMIN"),async(req,res)=>{
    const { articleId } = req.body
    const userId = req.user?.id

    const article = await ArticleModel.findOne({_id:articleId,isArticleActive:true})
    if(!article){
        return res.status(404).json({message:"article not found"})
    }

    const alreadyLiked = article.likedBy.some((item) => item.toString() === userId)

    if (alreadyLiked) {
        article.likes = Math.max(0, article.likes - 1)
        article.likedBy = article.likedBy.filter((item) => item.toString() !== userId)
    } else {
        article.likes += 1
        article.likedBy.push(userId)
    }

    await article.save()
    res.status(200).json({
        message: alreadyLiked ? "Article unliked" : "Article liked",
        payload: {
            ...article.toObject(),
            isLiked: !alreadyLiked,
        },
    })
})

//add comments to an article
userApp.put("/articles",verifyToken("USER"),async(req,res)=>{
    //get body from req
    const {articleId,comment}=req.body
    //check article
    const articleDocument=await ArticleModel.findOne({_id:articleId,isArticleActive:true})
    //if article not found
    if(!articleDocument){
        return res.status(404).json({message:"article not found"})
    }
    //get user id
    const userId=req.user?.id
    //add comment to comments array of articleDocument
    articleDocument.comments.push({user:userId,comment:comment})
    //save
    await articleDocument.save()
    //send res
    res.status(200).json({message:"comment added successfully",payload:articleDocument})
})

// get saved articles for user
userApp.get("/saved-articles",verifyToken("USER"),async(req,res)=>{
    const userId=req.user?.id
    const user = await UserModel.findById(userId).populate({
        path: "savedArticles",
        match: { isArticleActive: true },
        select: "title category content courseImage createdAt isArticleActive",
    })
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({message:"saved articles",payload:user.savedArticles})
})

// save an article for later
userApp.post("/saved-articles",verifyToken("USER"),async(req,res)=>{
    const { articleId } = req.body
    const userId=req.user?.id
    const article = await ArticleModel.findOne({_id:articleId,isArticleActive:true})
    if(!article){
        return res.status(404).json({message:"Article not found or unavailable"})
    }
    const user = await UserModel.findById(userId)
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    if(user.savedArticles.includes(articleId)){
        return res.status(200).json({message:"Article already saved",payload:user.savedArticles})
    }
    user.savedArticles.push(articleId)
    await user.save()
    res.status(200).json({message:"Article saved",payload:user.savedArticles})
})

// remove saved article
userApp.delete("/saved-articles/:articleId",verifyToken("USER"),async(req,res)=>{
    const userId=req.user?.id
    const { articleId } = req.params
    const user = await UserModel.findById(userId)
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    user.savedArticles = user.savedArticles.filter(
        (savedId) => savedId.toString() !== articleId
    )
    await user.save()
    res.status(200).json({message:"Article removed from saved list",payload:user.savedArticles})
})
