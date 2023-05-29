import {useDark, useToggle} from "@vueuse/core";

export function useThemeToggle() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);

    return {
        isDark,
        toggleDark
    }
}
