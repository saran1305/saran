const BASE_PATH = process.env.NODE_ENV === 'production' ? '/saran' : '';

export const getAssetPath = (path: string) => {
    // In production (GitHub Pages), prepend /saran base path.
    // In development (localhost:3000), no prefix needed.
    return `${BASE_PATH}${path}`;
};
