"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDeep = void 0;
const merge = require("merge-deep");
function mergeDeep(target, sources) {
    return merge(target, sources);
}
exports.mergeDeep = mergeDeep;
//# sourceMappingURL=deep-merge.utils.js.map