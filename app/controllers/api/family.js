/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const userDatamapper = require('../../models/user');
const familyDatamapper = require('../../models/family');
const roleDatamapper = require('../../models/role');
const memberDatamapper = require('../../models/memberdata');
const memberAllDatamapper = require('../../models/member');
const { ApiError } = require('../../helpers/errorHandler');

module.exports = {

    async allmemberAndFamily(req, res) {
        const familyId = req.params.id;
        const allMemberAndRoles = await familyDatamapper.allMembersByFamily(familyId);
        const familyDescript = await familyDatamapper.findOneId(familyId);
        if (!allMemberAndRoles) {
            throw new ApiError('family not found', { statusCode: 404 });
        }
        const newFamily = {
            famille_id: familyDescript.family_id,
            nom: familyDescript.family_name,
            description: familyDescript.family_description,
            allMemberAndRoles,
        };
        return res.json(newFamily);
    },



    async familyOne(req, res) {
        const familyId = req.params.id;
        const family = await familyDatamapper.findOneId(familyId);
        if (!family) {
            throw new ApiError('family not found', { statusCode: 404 });
        }
        const newFamily = {
            famille_id: family.family_id,
            nom: family.family_name,
            description: family.family_description,
        };
        return res.json(newFamily);
    },


    async familyAndOneMember(req, res) {
        const familyId = {
            familyId: req.params.idFamily,
            memberId: req.params.id,
        };
        const OneMember = await familyDatamapper.dataMemberByFamily(familyId);
        if (!OneMember) {
            throw new ApiError('member not found', { statusCode: 404 });
        }
        return res.json(OneMember);
    },


    async AddMemberOfFamily(req, res) {
        
        console.log(req.body)

        

        const {firstname, username, roleId, familyId, datebirth, password, confirmPassword, topsize, bottomsize,shoesize,size,school,hobbies,} = req.body; 

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

        const newUserName = await memberAllDatamapper.isUnique(username);

        if (newUserName) {
            res.status(401).json({ msg: 'Cet username est déjà utilisé !' });
            return;
        } 
        
        try {
            const hashPassword = await bcrypt.hash(password, 10);

            const newMember = await memberAllDatamapper.create({
                firstname,
                username,
                roleId,
                password: hashPassword,
            });
            
            const memberId = newMember.member_id;
            await memberDatamapper.create({
                datebirth,
                size,
                topsize,
                bottomsize,
                shoesize,
                school,
                hobbies,
                memberId,
            });

           
            await familyDatamapper.AddMemberOfFamily({
                familyId,
                memberId,
                roleId,
            });

            const viewsMember = await memberAllDatamapper.findByPk(memberId);

            res.json({
                msg: 'Ajout du nouveau membre !', viewsMember,
            });

        } catch (err) {
            res.json(err);
        }
    },



    async DeletefamilyAndOneMember(req, res) {
        const familyId = {
            familyId: req.params.idFamily,
            memberId: req.params.id,
        };
        const deleteMemberFamily = await familyDatamapper.deleteMemberByfamily(familyId);
        const OneMember = await familyDatamapper.membersByFamily('family_has_member_has_role_member_id', familyId.memberId);
        if (OneMember) {
            res.status(200).json({ msg: 'this member have an other family !' });
        } else {
            const deleteMember = await memberAllDatamapper.delete(familyId.memberId);
            res.status(200).json({ msg: 'This member has been deleted !', deleteMember });
        }
    },
    async update(req, res) {
        const {
            name,
            description,
        } = req.body;
        const familyId = req.params.id;
        const family = await familyDatamapper.allMembersByFamily(familyId);
        if (!family) {
            throw new ApiError('family not found', { statusCode: 404 });
        }
        const updateFamily = await familyDatamapper.update({
            familyId,
            name,
            description,
        });
        if (!updateFamily) {
            throw new ApiError('family not found', { statusCode: 404 });
        }
        return res.json({
            msg: 'Famille modifiée !', updateFamily,
        });
    },

};
