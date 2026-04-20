// Define the fallback chain from highest tier to lowest (latest models first)
export const FALLBACK_MODELS = [
  "gemini-3.1-pro-preview",      // Current top-tier reasoning model
  "gemini-3-flash-preview",      // Frontier performance + speed
  "gemini-3.1-flash-lite-preview", // Most cost-efficient high-volume model
  "gemini-2.5-flash",            // Reliable previous generation
  "gemma-4-31b-it",              // Latest Gemma 4 dense model (strong open fallback)
  "gemma-4-26b-a4b-it"           // Gemma 4 MoE variant (efficient & capable)
];
