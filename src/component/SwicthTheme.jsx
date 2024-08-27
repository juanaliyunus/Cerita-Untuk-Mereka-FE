import { Switch } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { useTheme } from "next-themes";
import { SunIcon } from "../assets/SunIcon";
import { MoonIcon } from "../assets/MoonIcon";

const SwicthTheme = () => {
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, [setTheme]);

    const handleChange = (e) => {
        const newTheme = e.target.checked ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <Switch
        checked={theme === "dark"}
        onChange={handleChange}
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
