import en from "./locales/en.js";
import de from "./locales/de.js";
import ja from "./locales/ja.js";
import tr from "./locales/tr.js";
import hy from "./locales/hy.js";
import { germanCommands } from "./command-names.js";
export const locales = { en, de, ja, tr, hy };
export function preparedCode(example, variant, locale, language) {
  const content = locales[locale].activities[example.id];
  let source = example[variant];
  // Only curated sources pass this boundary. A child's editor buffer is never translated.
  source = source.replace(
    /^\/\/[^\n]*$/m,
    `// ${variant === "solution" ? locales[locale].loadSolution + ": " : ""}${content.steps[1]}`,
  );
  source = source
    .replace(
      /"Keep going!"/g,
      JSON.stringify(locales[locale].canvasEncouragement),
    )
    .replace(/"HELLO"/g, JSON.stringify(locales[locale].canvasGreeting));
  return commandCode(source, language);
}

// Used only for our prepared exercises/reference, never a child's editor buffer.
export function commandCode(source, language) {
  if (language === "de") {
    // Match function-call tokens only; comments, string values and custom identifiers stay intact.
    source = source.replace(
      /(\/\*[\s\S]*?\*\/|`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/[^\n]*|\b([A-Za-z_$][\w$]*)(?=\s*\())/g,
      (whole, token, name) =>
        name && germanCommands[name] ? germanCommands[name] : whole,
    );
  }
  return source;
}
