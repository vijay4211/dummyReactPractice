import { useEffect, useState } from "react";

export default function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList = dark ? "dark" : "";
  }, [dark]);
  return [dark, () => setDark(!dark)];
}
