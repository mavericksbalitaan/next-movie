import { useRef } from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export default function DownloadFile() {
  const list = useSelector((state: RootState) => state.favorites);
  const linkref = useRef<HTMLAnchorElement>(null);

  if (list.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const content = new Blob([JSON.stringify(list, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(content);

    if (linkref.current) {
      const a = document.createElement("a");
      a.href = url;
      a.download = "favorites.json";

      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }
  };

  return (
    <>
      <p className="text-white">
        Download list as{" "}
        <a
          href="#"
          ref={linkref}
          onClick={handleClick}
          className="text-blue-400 hover:underline"
        >
          📁JSON
        </a>
      </p>
    </>
  );
}
