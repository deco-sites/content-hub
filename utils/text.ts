export function isEmptyText(text?: string) {
  if (!text) return true;

  return !!text?.trim().match(/^<\w+>\s*<\/\w+>$/) || !text;
}
