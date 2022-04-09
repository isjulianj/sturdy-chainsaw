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

/**
* Identifies out of stock items
* @param {...args: string | string[]} ...args  a list of product Ids to verify whether they are in stock
* @returns {Promise} resolve/reject to out of stock products or error code
**/
function outOfStockChecker() {
  // simplify parameters into single array
  let idsToCheck;
  if (arguments.length > 1 ) {
    idsToCheck = removeDuplicateIds([...arguments])
  } else {
    idsToCheck = removeDuplicateIds(arguments[0])
  }

    console.log('idsToCheck', idsToCheck)

}


/**
 * Removes any duplicate ids
 * @param {string[]} idArray
 * @return {string[]}
 */
function removeDuplicateIds(idArray) {
    return Array.from(new Set(idArray))
}

module.exports = outOfStockChecker
