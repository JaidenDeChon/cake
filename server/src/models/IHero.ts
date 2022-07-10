/**
 * The different options for justifying the hero content.
 */
export enum JustifyOptions {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

/**
 * The shape of a Hero configuration throughout the app.
 */
export interface IHero {
    id?: string;
    primaryText?: string;
    secondaryText?: string;
    primaryCallToAction?: string;
    secondaryCallToAction?: string;
    justify?: JustifyOptions;
    img?: string;
}