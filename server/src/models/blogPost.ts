/**
 * The shape of a Blog Post throughout the app.
 * @TODO - Move this to a place availabale globally (client and server)
 */
export interface BlogPost {
    id: string;
    content: string;
    date: string;
    img?: string;
}
