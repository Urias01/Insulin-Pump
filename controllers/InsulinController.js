const Notes = require('../models/Notes');
const User = require('../models/User');

module.exports = class InsulinController {

  static insulin(req, res) {
    res.render('insulin_pump/insulin');
  }

  static async notes(req, res) {

    if (!req.session.userid) {
      req.flash('message', 'Please, login!');
      return res.render('auth/login', {
        error: 'Please, login!'
      });
    }

    const id = req.session.userid

    const notesData = await Notes.findAll({ where: { userId: id } })

    const notes = notesData.map((result) => result.get({ plain: true }));

    res.render('insulin_pump/notes', { notes });
  }

  static async notesPost(req, res) {
    const notes = req.body.notes;
    const id = req.session.userid;

    const user = await User.findOne({ where: { id: id } });

    /* Validations */
    if (!notes) {
      req.flash('message', 'Please fill in all the fields!');
      return res.render('insulin_pump/notes', {
        error: 'Please fill in all the fields!'
      });
    }

    if (!user) {
      req.flash('message', 'User Not Found!');
      return res.render('insulin_pump/notes', {
        error: 'User Not Found!'
      });
    }

    const finalNotes = {
      notes: notes,
      userId: user.id
    }

    try {
      await Notes.create(finalNotes);
      req.flash('message', 'Notes created successfully');
      res.redirect('/insulin_pump/notes');
    } catch (err) {
      req.flash('message', 'Error to register notes!');
      res.render('insulin_pump/notes', {
        error: 'Error to register notes!'
      });
    }
  }

  static async notesDelete(req, res) {
    const id = req.params.id;

    try {
      await Notes.destroy({ where: { id: id } });
      req.flash('message', 'Notes deleted successfully');
      res.redirect('/insulin_pump/notes');
    } catch (err) {
      req.flash('message', 'Error to delete notes!');
      res.render('insulin_pump/notes', {
        error: 'Error to delete notes!'
      });
    }

  }

}