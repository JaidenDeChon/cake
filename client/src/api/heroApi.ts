import axios from 'axios';

import type { IHero } from '@models/';

export async function fetchHero (): Promise<IHero> {
    let result;
    try { result = await axios.get('api/hero/get-hero'); }
    catch (e) { throw e; }
    return result.data;
}

export async function changeHero (newData: IHero): Promise<void> {
    try { await axios.post('api/hero/change-hero', newData); }
    catch (e) { throw e; }
}
