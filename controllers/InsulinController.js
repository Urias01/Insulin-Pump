
module.exports = class InsulinController {

  static insulin(req, res) {
    res.render('insulin_pump/insulin');
  }

  static async notes(req, res) {
    res.render('insulin_pump/notes');
  }
}