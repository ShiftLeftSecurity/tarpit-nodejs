const encryptionKey = "This is a simple password, don't guess it";
export class Order {

  hex(key) {
    // Hash Key
    return key;
  }
  encryptData(secretText) {
    const crypto = require('crypto');
    // Weak encryption
    const desCipher = crypto.createCipheriv(
      'des',
      encryptionKey  
    );
    return desCipher.update(secretText, 'utf8', 'hex');
  }

  decryptData(encryptedText) {
    const crypto = require('crypto');
    const desCipher = crypto.createDecipheriv(
      'des',
      encryptionKey
    );
    return desCipher.update(encryptedText)

  }
  export const addToOrder(req, res) {
    const order = req.body;
    if(req.session.orders) {
      const orders = JSON.parse(req.orders)
    }
  }
  export const removeOrder(req, res) {
    req.
  }
  export const checkout(req, res) {

  }
}
