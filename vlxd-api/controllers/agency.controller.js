const Agency = require('../models/agency.model');

module.exports = {
  getAgencies: async (req, res) => {
    const { is_delete = false } = req.query;
    const agencies = await Agency.find({ is_delete }).sort({
      createdAt: -1,
    });
    return res.status(200).json(agencies);
  },
  createAgency: async (req, res) => {
    const body = req.body;
    const newAgency = await Agency.create(body);
    return res.status(201).json(newAgency);
  },
  updateAgency: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const updatedAgency = await Agency.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updatedAgency);
  },
  deleteAgency: async (req, res) => {
    const id = req.params.id;
    const deletedAgency = await Agency.findByIdAndUpdate(id, {
      is_delete: true,
    });
    return res.status(200).json(deletedAgency);
  },
};
