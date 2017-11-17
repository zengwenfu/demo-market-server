module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    // "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
          "experimentalObjectRestSpread": true
        }
    },
    "plugins": [
        "babel"
    ],
    "parser": "babel-eslint",
    "rules": {
        "indent": [
            "error",
            2
        ],
        // "linebreak-style": [
        //     "error",
        //     "unix"
        // ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "generator-star-spacing": 0
    }
};
