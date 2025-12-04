/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: theme("colors.slate.900"),
              color: theme("colors.slate.100"),
              borderRadius: theme("borderRadius.xl"),
              padding: theme("spacing.4"),
              fontSize: theme("fontSize.sm")[0],
              overflowX: "auto",
              border: `1px solid ${theme("colors.slate.800")}`,
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: 0,
              borderRadius: theme("borderRadius.none"),
              fontSize: "inherit",
            },
            code: {
              backgroundColor: theme("colors.slate.100"),
              color: theme("colors.slate.800"),
              padding: "0.15rem 0.35rem",
              borderRadius: theme("borderRadius.md"),
              fontSize: theme("fontSize.sm")[0],
            },
          },
        },
        slate: {
          css: {
            pre: {
              backgroundColor: theme("colors.slate.900"),
              color: theme("colors.slate.100"),
              borderRadius: theme("borderRadius.xl"),
              padding: theme("spacing.4"),
              fontSize: theme("fontSize.sm")[0],
              overflowX: "auto",
              border: `1px solid ${theme("colors.slate.800")}`,
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: 0,
              borderRadius: theme("borderRadius.none"),
              fontSize: "inherit",
            },
            code: {
              backgroundColor: theme("colors.slate.100"),
              color: theme("colors.slate.800"),
              padding: "0.15rem 0.35rem",
              borderRadius: theme("borderRadius.md"),
              fontSize: theme("fontSize.sm")[0],
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
