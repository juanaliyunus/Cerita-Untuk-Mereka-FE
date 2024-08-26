import { Switch } from '@nextui-org/react';
import React from 'react';
import { useTheme } from "next-themes";
import { SunIcon } from "../assets/SunIcon";
import { MoonIcon } from "../assets/MoonIcon";

const SwicthTheme = () => {
    const { theme, setTheme } = useTheme();
    return (
        <Switch
        checked={theme === "dark"}
        onChange={e => setTheme(e.target.checked ? "dark" : "light")}
        size="lg"
        color="primary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <MoonIcon className={className} />
          ) : (
            <SunIcon className={className} />
          )
        }
      />
    );
}

export default SwicthTheme;
