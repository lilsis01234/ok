const express = require('express');
const router = express.Router();
const multer = require('multer');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const path = require('path');
const fs = require('fs');


const Collaborateur = require('../../Modele/CollabModel/Collab');
const DiscussionFormation = require('../../Modele/formation/DiscussionFormation');
const Module = require('../../Modele/formation/Module');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads2/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });


router.get('/all_discussions/:idformation', async (req, res) => {
    const formationId = req.params.idformation;
    try {
        const discussionFormation = await DiscussionFormation.findAll({
            include: [
                {
                    model: Collaborateur,
                    attributes: ['nom', 'prenom']
                },
                {
                    model: Module,
                    attributes: ['id', 'titreModule']
                },
            ],
            where: {
                formation: formationId,
            },
        });
        res.status(200).json(discussionFormation);
    } catch (error) {
        console.error('Erreur lors de la récupération des discussions sur la formation :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des discussions sur la formation' });
    }
});

router.get('/temporary-link/:filename', (req, res) => {
    const filePath = path.join(__dirname,'../../', 'uploads2', req.params.filename);
    res.download(filePath);
});


router.get('/view/:filename', (req, res) => {
    const filePath = path.join(__dirname, '../../', 'uploads2', req.params.filename);
    // Set appropriate content type based on file extension
    const fileExtension = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    if (fileExtension === '.docx') {
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (fileExtension === '.pdf') {
        contentType = 'application/pdf';
    } // Add more content types for other file formats if needed

    // Set response headers
    res.setHeader('Content-Type', contentType);

    // Create a readable stream from the file and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});


router.get('/downloaded/:filename', (req, res) => {
    const filePath = path.join(__dirname,'../../', 'uploads2', req.params.filename);

    // Set appropriate content type based on file extension
    const fileExtension = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    if (fileExtension === '.docx') {
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (fileExtension === '.pdf') {
        contentType = 'application/pdf';
    } // Add more content types for other file formats if needed

    // Set response headers
    res.setHeader('Content-Type', contentType);

    // Create a readable stream from the file and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});

router.post('/nouveauDiscussion', upload.array('pieceJointes', 5), async (req, res) => {
    const pieceJointes = [];
    req.files.forEach((file) => {
        pieceJointes.push(file.path);
    });
    try {
        const newDiscussion = await DiscussionFormation.create({
            sujet: req.body.sujet,
            contenu: req.body.contenu,
            formation: req.body.formationId,
            collaborateur: req.body.collaborateur,
            module: req.body.modulechoosen,
            fichier: pieceJointes.join(', ')
        });
        const newdiscussion = await newDiscussion.save();
        res.status(201).json(newdiscussion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la création de la discussion' });
    }
});

router.delete('/:id/deleteDiscussion', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDiscussion = await DiscussionFormation.findByPk(id);
        if (!deletedDiscussion) {
            return res.status(404).json({ error: 'discussion introuvable' });
        }
        await deletedDiscussion.destroy();
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Erreur lors de la suppression du poste :', error)
        res.status(500).json({ message: 'Erreur lors de la suppression du poste' })
    }
})
module.exports = router;
