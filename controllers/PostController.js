import PostModel from '../models/Post.js'

export const create = async (req, res) => {
    try {


        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,

        })

        const post = await doc.save();
        res.json(post);


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалось створити статтю"
        })

    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("user").exec();
        res.json(posts)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалось отримати статті"
        })


    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndUpdate(
            { _id: postId }, { $inc: { viewsCount: 1 } }, { returnDocument: "After" })
            .then(doc => res.json(doc))
            .catch(err => res.status(500).json({ message: "Не вдалось отримати статтю." }))


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалось отримати статтю."
        })


    }
}

export const remove = (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndDelete(
            { _id: postId })
            .then(doc => res.json({ success: true }))
            .catch(err => res.status(500).json({ message: "Не вдалось видалити статтю." }))

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалось знайти статтю."
        })


    }
}

export const update = (req, res) => {
    console.log(req.body);

    try {
        const postId = req.params.id;
        PostModel.updateOne(
            { _id: postId },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            }).then(doc => {
                res.json({ success: true })
            }).catch(err => res.status(500).json({ message: "Не вдалось оновити статтю." }))


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалось отримати статтю."
        })


    }

}

