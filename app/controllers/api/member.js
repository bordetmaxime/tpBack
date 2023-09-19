const bcrypt = require('bcrypt');
const memberDataMapper = require('../../models/member');
const memberData = require('../../models/memberdata');
const familyDatamapper = require('../../models/family');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {
    async getAll(_, res) {
        const members = await memberDataMapper.findAll();
        return res.json(members);
    },
    async getOne(req, res) {
        const member = await memberDataMapper.findByPk(req.params.id);
        if (!member) {
            throw new ApiError('member not found', { statusCode: 404 });
        }
        return res.json(member);
    },
    async create(req, res) {
        const {
            familyId,
            firstname,
            username,
            roleId,
            datebirth,
            password,
            confirmPassword,
            topsize,
            bottomsize,
            shoesize,
            size,
            school,
            hobbies,
        } = req.body;
        if (!firstname
        || !datebirth
        || !username
        || !roleId
        || !password
        || !confirmPassword
        ) {
            throw new ApiError('tous les champs sont requis', { statusCode: 400 });
        }

        if (password !== confirmPassword) {
            res.status(401).json({ msg: 'les mots de passe ne sont pas identiques !' });
            return;
        }
        if (!familyId) {
            throw new ApiError('This family does not exits', { statusCode: 404 });
        }
        const newUserName = await memberDataMapper.isUnique(username);
        if (newUserName) {
            res.status(401).json({ msg: 'Cet username est déjà utilisé !' });
            return;
        } try {
            const hashPassword = await bcrypt.hash(password, 10);
        
            // Créez d'abord le membre dans la table "member"
            const newMember = await memberDataMapper.create({
                firstname,
                username,
                roleId,
                password: hashPassword,
            });
    
        const memberId = newMember.member_id;
        
        const retour = await familyDatamapper.AddMemberOfFamily({
                memberId,
                familyId,
                roleId,
            });
         
            await memberData.create({
                datebirth,
                size,
                topsize,
                bottomsize,
                shoesize,
                school,
                hobbies,
                memberId,
            });
            
        
            const viewsMember = await memberDataMapper.findByPk(memberId);
        
            res.json({
                msg: 'Ajout du nouveau membre !',
                viewsMember,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Une erreur est survenue lors de la création du membre.' });
        }
    },
    async update(req, res) {
    
        const
            {
                firstname,
                email,
                datebirth,
                topsize,
                bottomsize,
                shoesize,
                size,
                school,
                hobbies,
            } = req.body;
        const { id } = req.params;
        const updateMemberData = await memberData.update({
            id,
            datebirth,
            topsize,
            bottomsize,
            shoesize,
            size,
            school,
            hobbies,
        });
        const updateMember = await memberDataMapper.update({
            id,
            email,
            firstname,
        });
        return res.json({
            msg: 'Le membre a bien été modifié !', updateMemberData, updateMember,
        });
    },
};
