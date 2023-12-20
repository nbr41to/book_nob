import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";

export default [
  {
    files: ["src/server/**/*.js"],
    ignores: [],
    rules: {
      "no-console": "error",
    },
  },
  {
    files: ["src/app/**/*.js"],
    ignores: [],
    rules: {
      "no-console": "error",
    },
  },
];
