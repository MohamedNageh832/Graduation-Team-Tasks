import * as esbuild from "esbuild";

try {
  await esbuild.build({
    mainFields: ["module", "main"], // Prioritize ESModule, then CommonJS
    entryPoints: ["src/index.ts"], // Entry point for your project
    bundle: true,
    sourcemap: false,
    minify: false,
    platform: "node", // Ensure it's for Node.js (not the browser)
    format: "cjs", // CommonJS format (for Node.js compatibility)
    packages: "external", // Exclude all packages from bundling
    target: ["es2020"], // Specify ECMAScript target version
    define: {
      "process.env.NODE_ENV": '"production"', // Set NODE_ENV to production
    },
    keepNames: true, // Keep function and variable names (for debugging)
    outfile: "dist/index.cjs", // Output bundled file location
  });

  console.log("Server bundled successfully for production!");
} catch (error) {
  console.error("An error occurred during bundling:", error);
  process.exit(1);
}
