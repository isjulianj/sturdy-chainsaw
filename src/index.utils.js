const ID_REGEX = /^[0-9-]{19}$/

const ERROR_ENUM = {
    "invalid-format": "invalid-format",
    "internal-server-error": "internal-server-error",
    "internal_system_error": "internal_system_error"
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
 * Checks for invalid ids within an array
 * all Ids should match the format "XXXX-XXXX-XXXX-XXXX" where X is any integer value.
 * @param { string[] } idArray
 */
function getInvalidIds(idArray) {
    return idArray.filter(id => ID_REGEX.exec(id) === null);
}


exports.ERROR_ENUM = ERROR_ENUM
exports.removeDuplicateIds = removeDuplicateIds
exports.getInvalidIds = getInvalidIds
