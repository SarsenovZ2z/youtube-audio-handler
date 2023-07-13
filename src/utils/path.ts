export const root_dir = (path: string = ''): string => {
    return `${__dirname}/../../${path}`
}

export const public_dir = (path: string = ''): string => {
    return root_dir(`public/${path}`)
}

export const uploads_dir = (path: string = ''): string => {
    return root_dir(`uploads/${path}`)
}