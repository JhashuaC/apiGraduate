const { Graduate, PreferenceOption, GraduatePreference, User } = require('../models');


const getAllGraduatePreferences = async (req, res) => {
  try {
    const data = await GraduatePreference.findAll({
      include: [Graduate, PreferenceOption],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener preferencias de graduados' });
  }
};


const getAllGraduatePreferencesById = async (req, res) => {
  const { id_graduate } = req.params;
  console.log(`Buscando preferencias del graduado con ID: ${id_graduate}`);

  try {
    const data = await GraduatePreference.findAll({
      where: { id_graduate },
      include: [
        {
          model: Graduate,
          include: [
            {
              model: User,
              attributes: ['first_name', 'email']
            }
          ]
        },
        {
          model: PreferenceOption,
          attributes: ['id_option', 'name']
        }
      ]
    });

    if (!data || data.length === 0) {
      console.log('No se encontraron preferencias asociadas');
      return res.status(404).json({ message: 'Relación no encontrada' });
    }

    console.log(`Se encontraron ${data.length} preferencias para el graduado ${id_graduate}`);
    res.json(data);
  } catch (err) {
    console.error('Error al buscar relación:', err);
    res.status(500).json({ message: 'Error al buscar relación' });
  }
};




const getGraduatePreference = async (req, res) => {
  const { id_graduate, id_option } = req.params;
  try {
    const data = await GraduatePreference.findOne({
      where: { id_graduate, id_option },
      include: [Graduate, PreferenceOption],
    });
    if (!data) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar relación' });
  }
};

const assignPreferenceToGraduate = async (req, res) => {
  const { id_graduate, id_option } = req.body;
  try {
    const created = await GraduatePreference.create({ id_graduate, id_option });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Error al asignar preferencia' });
  }
};

const removePreferenceFromGraduate = async (req, res) => {
  const { id_graduate, id_option } = req.params;
  try {
    const deleted = await GraduatePreference.destroy({ where: { id_graduate, id_option } });
    if (!deleted) return res.status(404).json({ message: 'Relación no encontrada' });
    res.json({ message: 'Preferencia removida del graduado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar relación' });
  }
};

module.exports = {
  getAllGraduatePreferences,
  getGraduatePreference,
  assignPreferenceToGraduate,
  removePreferenceFromGraduate,
  getAllGraduatePreferencesById
};
