import React, { useState } from "react";

function Theme() {
  const [theme, setTheme] = useState(
    localStorage.getItem("hutech_theme") || "light"
  );
  return (
    <div className={`flex flex-column justifyt-center items-center ${theme}`}>
      <div
        style={{ height: "100%", width: "100%", position: "absolute" }}
        className="border-1  dark:bg-darktheme-primary"
      >
        <div className="flex flex-column justify-center items-center">
          <div className="m-4">
            <label className="dark:text-white">Dark Theme</label>
            <input
              className="border-2"
              type={"checkbox"}
              checked={theme === "dark"}
              onChange={() => {
                localStorage.setItem(
                  "hutech_theme",
                  theme === "dark" ? "light" : "dark"
                );
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            />
          </div>
          <div className="dark:text-white text-2xl p-13 font-bold">
            Name :KIRAN
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theme;
