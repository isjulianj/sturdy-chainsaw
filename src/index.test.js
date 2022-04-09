const outOfStockChecker = require('.')
const {getInvalidIds, removeDuplicateIds} = require("./index.utils");

describe('Suite of tests on outOfStockChecker', () => {
    it('should return invalid products when productId passed as separate args', async () => {
        const args = ["1111-2222-3333-4444", "1111-2222-3333-XXXX"]
        const expected = {"error": {"code": "invalid-format", "products": ["1111-2222-3333-XXXX"]}}

        expect(await outOfStockChecker(...args)).toMatchObject(expected)
    })

    it('should return invalid products when productId passed in single array', async () => {
        const args = [["1111-2222-3333-4444", "1111-2222-3333-XXXX"]]
        const expected = {"error": {"code": "invalid-format", "products": ["1111-2222-3333-XXXX"]}}

        expect(await outOfStockChecker(...args)).toMatchObject(expected)
    })

    it('should return out-of-stock item without duplicates', async () => {
        const args = ["1111-2222-3333-4444", "2222-3333-4444-5555", "8888-2222-3333-4444", "8888-2222-3333-4444"]
        const expected = {"outOfStock": ["8888-2222-3333-4444"]}

        expect(await outOfStockChecker(...args)).toMatchObject(expected)
    })

    it('should return error when "stockCheck" fails', async () => {
        const args = ["1111-2222-3333-4444", "2222-3333-4444-5555", "9999-2222-3333-4444", "8888-3333-4444-5555"]
        const expected = {"error": {"code": "internal-server-error", "id": "9999-2222-3333-4444"}}

        try {
            await outOfStockChecker(...args)

            expect(true).toBe(false)
        } catch (e) {
            expect(e).toMatchObject(expected)
        }
    })
    it('should return an array without duplicates', function () {
        const args = [1, 1, 2, 3, 3, 4, 5, 6, 7, 8, 3, 'test', 'test']
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 'test']

        expect(removeDuplicateIds(args)).toMatchObject(expected)
    });
    it('should return an array with invalid strings', function () {
        const args = ["1222-3333-4444", "2222-3333-4444-5555", "9999-2222-3333-4444", "8888-3333-4444-5555", "-1222-3333-4444-8888", "111-222-222-222"]
        const expected = ["1222-3333-4444", "-1222-3333-4444-8888", "111-222-222-222"]

        expect(getInvalidIds(args)).toMatchObject(expected)
    });


})
