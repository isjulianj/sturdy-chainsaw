const {ERROR_ENUM, getInvalidIds, removeDuplicateIds} = require("./index.utils");

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
                reject({id, code: 'internal-server-error'})
            } else {
                resolve({id, outOfStock: firstCharacter === '8'})
            }
        }, 200)
    })
}

/**
 * END DO NOT MODIFY
 **/

/**
 * Identifies out of stock items
 * @param {...args: string | string[]} ...args  a list of product Ids to verify whether they are in stock
 * @returns {Promise<Record<string, string[]>> | Promise<{error: {code: string, products: string[]}}>} resolve/reject to out of stock products or error code
 **/
function outOfStockChecker() {
    // simplify parameters into single array and remove duplicates
    let idsToCheck;
    if (arguments.length > 1) {
        idsToCheck = removeDuplicateIds([...arguments])
    } else {
        idsToCheck = removeDuplicateIds(arguments[0])
    }

    // Check for any of the ids are invalid and return error.
    const invalidIds = getInvalidIds(idsToCheck),
        hasInvalidIds = invalidIds.length > 0;

    if (hasInvalidIds) {
        return Promise.resolve({"error": {"code": ERROR_ENUM['invalid-format'], "products": [...invalidIds]}})
    }


    // create an array of promises
    const stockPromises = [];
    for (const id of idsToCheck) {
        stockPromises.push(stockCheck(id))
    }

    let outOfStockResponse;

    return Promise.all(stockPromises).then(values => {
        const outOfStockItems = values.filter(value => value.outOfStock === true).map(item => item.id);

        if (outOfStockItems.length > 0) {
            outOfStockResponse = {outOfStock: [...outOfStockItems]}
        }
        return outOfStockResponse
    }).catch(e => {
        let errorCode = ERROR_ENUM[e.code];

        if (e.code === undefined || ERROR_ENUM[e.code] === undefined) {
            errorCode = ERROR_ENUM['internal_system_error']
        }
        throw {error: {id: e.id, code: errorCode}}
    })

}


module.exports = outOfStockChecker;
