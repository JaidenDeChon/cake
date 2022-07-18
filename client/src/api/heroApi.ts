import axios from 'axios';

import type { IHero } from '@models/';

export async function fetchHero (): Promise<IHero> {
    const result = await axios.get('api/hero/get-hero');
    return result.data;
}

export async function changeHero (newData: IHero): Promise<void> {
    await axios.post('api/hero/change-hero', newData);
}
