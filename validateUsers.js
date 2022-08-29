const validateUser = (req, res, next) => {
    const { firstname, lastname, email, city, language } = req.body;
     const errors = [];
 
     if (!firstname) {
         errors.push( { field: "firstname", message: "The field is required"})
     } else if (firstname.length >= 255) {
         errors.push({ field: "firstname", message: "Should contain than 255 characters" })
     }
     if (!lastname) {
         errors.push( { field: "lastname", message: "The field is required"})
     } else if (lastname.length >= 255) {
         errors.push({ field: "lastname", message: "Should contain than 255 characters" })
     }
     if (!email) {
         errors.push( { field: "email", message: "The field is required"})
     } else if (email.length >= 255) {
         errors.push({ field: "email", message: "Should contain than 255 characters" })
     }
     if (!city) {
         errors.push( { field: "city", message: "The field is required"})
     } else if (city.length >= 255) {
         errors.push({ field: "city", message: "Should contain than 255 characters" })
     }
     if (!language) {
         errors.push( { field: "language", message: "The field is required"})
     } else if (language.length >= 255) {
         errors.push({ field: "language", message: "Should contain than 255 characters" })
     }
     if (errors.length) {
         res.status(422).json({ validationError: errors })
     } else {
         next();
     }
 };
 module.exports = {
    validateUser,
}; 