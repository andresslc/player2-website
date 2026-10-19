// Generates the styling layer from DESIGN.md. Run with `npm run tokens`.
//
// Outputs (both generated, never hand-edited):
//   app/tokens.css   Tailwind v4 @theme + type-* utilities
//   lib/tokens.json  colour hex values, for places CSS variables cannot reach (email HTML)
//
// Colours, radii and spacing come from the official exporter (@google/design.md, pinned).
// Typography is read from DESIGN.md front matter directly, because exporter v0.4.0 drops
// unitless lineHeight values from every output format.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const designPath = join(root, "DESIGN.md");
const cli = join(root, "node_modules", ".bin", "design.md");

const source = readFileSync(designPath, "utf8");
const frontMatter = source.match(/^---\n([\s\S]*?)\n---/);
if (!frontMatter) throw new Error("DESIGN.md has no front matter");
const tokens = YAML.parse(frontMatter[1]);

// Fallback stacks, per DESIGN.md Typography. Chunk is not committed, so its fallback must hold up.
const stacks = {
  Chunk: `"Chunk", "Arial Black", "Helvetica Neue", system-ui, sans-serif`,
  "Source Sans 3": `"Source Sans 3", system-ui, -apple-system, "Segoe UI", sans-serif`,
  "IBM Plex Mono": `"IBM Plex Mono", ui-monospace, Menlo, Consolas, monospace`,
};

// Phone-size multipliers from DESIGN.md Typography ("Scale"). hud-score is our assumption (build log).
const phoneFactor = {
  "headline-display": 0.6,
  "headline-lg": 0.7,
  "headline-md": 0.8,
  "headline-sm": 0.9,
  "title-md": 0.9,
  "hud-score": 0.75,
};
const fluidFrom = 390;
const fluidTo = 1280;

let css = execFileSync(cli, ["export", designPath, "--format", "css-tailwind"], { encoding: "utf8" });

// Token-only theme: drop Tailwind's default palette, radii and families so only DESIGN.md values exist.
css = css.replace("@theme {", "@theme {\n  --color-*: initial;\n  --radius-*: initial;\n  --font-*: initial;");
// Weights live inside the type-* utilities; as theme keys they would collide with font-family utilities.
css = css.replace(/^\s*--font-weight-[\w-]+:.*\n/gm, "");
css = css.replace(/^(\s*--font-[\w-]+:\s*)"([^"]+)";/gm, (line, prefix, family) => {
  if (!stacks[family]) throw new Error(`No fallback stack for font family "${family}"`);
  return `${prefix}${stacks[family]};`;
});

const px = (value) => Number(String(value).replace("px", ""));
const utilities = Object.entries(tokens.typography).map(([name, t]) => {
  const size = px(t.fontSize);
  const factor = phoneFactor[name];
  const fontSize = factor
    ? `clamp(${Math.round(size * factor)}px, calc(${Math.round(size * factor)}px + ${size - Math.round(size * factor)} * (100vw - ${fluidFrom}px) / ${fluidTo - fluidFrom}), ${size}px)`
    : `${size}px`;
  const lines = [
    `  font-family: var(--font-${name});`,
    `  font-size: ${fontSize};`,
    `  font-weight: ${t.fontWeight};`,
    `  line-height: ${t.lineHeight};`,
  ];
  if (t.letterSpacing) lines.push(`  letter-spacing: ${t.letterSpacing};`);
  // DESIGN.md: HUD text is uppercase.
  if (name.startsWith("hud-md")) lines.push(`  text-transform: uppercase;`);
  return `@utility type-${name} {\n${lines.join("\n")}\n}`;
});

const header = "/* GENERATED from DESIGN.md by scripts/tokens.mjs. Do not edit; run `npm run tokens`. */\n";
writeFileSync(join(root, "app", "tokens.css"), `${header}${css.trim()}\n\n${utilities.join("\n\n")}\n`);

const colors = Object.fromEntries(Object.entries(tokens.colors));
writeFileSync(join(root, "lib", "tokens.json"), `${JSON.stringify({ colors }, null, 2)}\n`);

console.log(`tokens: ${Object.keys(colors).length} colours, ${utilities.length} type utilities -> app/tokens.css, lib/tokens.json`);
