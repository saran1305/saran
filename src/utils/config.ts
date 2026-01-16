export const BASE_PATH = '/saran';

export const getAssetPath = (path: string) => {
    // Remove leading slash if present to avoid double slashes if we were joining with a slash
    // But BASE_PATH has no trailing slash, so we want the leading slash of path.
    // Actually, simply concatenating is fine as long as consistent.
    // path '/img.png' -> '/saran/img.png'
    return `${BASE_PATH}${path}`;
};
