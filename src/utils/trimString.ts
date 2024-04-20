function trimString(string: string, maxSymbols: number): string {
  if (string.length > maxSymbols) {
    return string.slice(0, maxSymbols - 3) + "...";
  } else {
    return string;
  }
}

export default trimString;
