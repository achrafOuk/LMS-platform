import { useState } from "react";

const DEFAULT_MAX_LENGTH = 100;

export function useCourseDescription(description: string | null | undefined, maxLength = DEFAULT_MAX_LENGTH) {
    const [isOpen, setIsOpen] = useState(false);
    const descriptionLength = description?.length ?? 0;
    const canExpand = descriptionLength > maxLength;
    const displayDescription =
        canExpand && !isOpen ? `${description?.slice(0, maxLength)}...` : description;

    return {
        displayDescription,
        canExpand,
        isOpen,
        toggle: () => setIsOpen((open) => !open),
    };
}
