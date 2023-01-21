import PostModel from '../models/Post.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();
        const tags = posts.map(obj => obj.tags).flat().slice(0, 5);
        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get tags',
        });
    }
}

export const showAllByTag = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        const tagName = req.params.tag;
        //const postsWithTag = posts.tags.includes(tagName);
        //const postsWithTag = posts.map(obj => obj.tags.includes(tagName));
        const postsWithTag = posts.filter(obj => obj.tags.includes(tagName));

        res.json(postsWithTag);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get the posts by the tag provided',
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get posts',
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate({
            _id: postId,
        }, {
            $inc: {viewsCount: 1},
        },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Failed to get the post',
                });
            }

            if (!doc) {
                return res.status(404).json({
                    message: 'The post is not found',
                })
            }

            res.json(doc);

            },
            ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get the post',
        });
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        PostModel.findOneAndDelete({
            _id: postId
        },
            (err, doc) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Failed to delete the post',
                });
            }
            if (!doc) {
                console.log(err);
                return res.status(404).json({
                    message: 'The post has not been found',
                });
            }

            res.json({
                success: true,
            });

            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get the post',
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        });

        const post = await doc.save();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create the post',
        });
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to update the post',
        });
    }
}