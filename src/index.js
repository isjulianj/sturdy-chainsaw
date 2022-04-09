/**
* DO NOT MODIFY, I REPEAT, DO NOT MODIFY
**/

/**
* Determines whether a single product is in stock
* @param {string} id
* @returns {Promise} promise that resolves or rejects depending on whether request succeeds
*
*/
function stockCheck(id) {
  const firstCharacter = id.charAt(0)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (firstCharacter === '9') {
        reject({ id, code: 'internal-server-error' })
      } else {
        resolve({ id, outOfStock: firstCharacter === '8' })
      }
    }, 200)
  })
}
/**
 * END DO NOT MODIFY
 * DISCLAIMER I modified the param type within the doc
 **/
//  It specifies not to edit, normally I would correct the doctype for stockCheck, param is wrong.

const ID_REGEX = /^[0-9-]{19}$/

const ERROR_ENUM = {
  invalid: "invalid-format",
  outOfStock: "outOFStock"
}

/**
 * Identifies out of stock items
 * @param {...args: string | string[]} ...args  a list of product Ids to verify whether they are in stock
 * @returns {Promise<any> | {error: {code: string, products: string[]}}} resolve/reject to out of stock products or error code
 **/
function outOfStockChecker() {
  // simplify parameters into single array and remove duplicates
  let idsToCheck;
  if (arguments.length > 1) {
    idsToCheck = removeDuplicateIds([...arguments])
  } else {
    idsToCheck = removeDuplicateIds(arguments[0])
  }
  console.log('idsToCheck', idsToCheck)

  // Check for any of the ids are invalid
  const invalidIds = getInvalidIds(idsToCheck)
  if (invalidIds.length > 0) {
    return {"error": {"code": ERROR_ENUM.invalid, "products": [...invalidIds]}}
  }

}


/**
 * Removes any duplicate ids
 * @param {string[]} idArray
 * @return {string[]}
 */
function removeDuplicateIds(idArray) {
    return Array.from(new Set(idArray))
}

/**
 * Checks for invalid ids withinan array
 * all Ids should match the format "XXXX-XXXX-XXXX-XXXX" where X is any integer value.
 * @param { string[] } idArray
 */
function getInvalidIds(idArray) {
  return idArray.filter(id => ID_REGEX.exec(id) === null);
}


module.exports = outOfStockChecker;
